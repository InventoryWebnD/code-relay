"use client";
/* eslint-disable react-hooks/immutability -- three.js objects are mutated per frame by design */

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { keyed, MARK, PAL, story } from "./store";
import { at, buildTrackGeometry, frameAt, LEN, makeFrame, TRACK_W, yawAt } from "./track";
import { rimUniforms, rng, toon } from "./toon";

/* -------------------------------------------------------------------------- */
/* Atmosphere: sunset → night → sunrise, keyed to the story                    */
/* -------------------------------------------------------------------------- */

type SkyKey = [number, string, string, string, string, string];
// p, zenith, horizon, below-horizon, sun, rim
const SKY: SkyKey[] = [
  [0.0, "#0e0824", "#6e1838", "#12061a", "#ff6a3d", "#ff5a7a"],
  [0.18, "#0b0a26", "#45123a", "#0a0614", "#ff6a3d", "#ff5a7a"],
  [0.38, "#060a24", "#16225e", "#05060f", "#ff6a3d", "#7fd6e0"],
  [0.6, "#08071c", "#2c1346", "#06040d", "#ff6a3d", "#ff7a9a"],
  [0.76, "#0d0b2e", "#5a1a4e", "#0a0514", "#ff8a4a", "#ff8a6a"],
  [0.88, "#1d2c70", "#e45a6a", "#2a0f2a", "#ffb04a", "#ffb36a"],
  [1.0, "#3556b0", "#ffbf72", "#4a2040", "#fff1c8", "#ffd08a"],
];

export const atmos = {
  top: new THREE.Color(),
  horizon: new THREE.Color(),
  bottom: new THREE.Color(),
  sun: new THREE.Color(),
  sunDir: new THREE.Vector3(0, 0, 1),
  moonDir: new THREE.Vector3(-0.5, 0.55, -0.6).normalize(),
  night: 1,
  dawn: 0,
};

const ca = new THREE.Color();
const cb = new THREE.Color();
function lerpSky(p: number) {
  let i = 0;
  while (i < SKY.length - 2 && p > SKY[i + 1][0]) i++;
  const a = SKY[i];
  const b = SKY[i + 1];
  const t = THREE.MathUtils.smoothstep(p, a[0], b[0]);
  const set = (out: THREE.Color, k: number) => out.copy(ca.set(a[k] as string)).lerp(cb.set(b[k] as string), t);
  set(atmos.top, 1);
  set(atmos.horizon, 2);
  set(atmos.bottom, 3);
  set(atmos.sun, 4);
  set(rimUniforms.uRimColor.value, 5);
  // sun: sets behind the start, rises ahead at the finish
  const elev = keyed([[0, -0.012], [0.12, -0.2], [0.8, -0.2], [0.9, 0.0], [1, 0.1]], p);
  const z = p < 0.5 ? 1 : -1;
  atmos.sunDir.set(z > 0 ? 0.15 : 0.2, elev, z).normalize();
  atmos.dawn = THREE.MathUtils.smoothstep(p, 0.82, 1);
  atmos.night = 1 - atmos.dawn;
}

function Sky() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
        uniforms: {
          uTop: { value: atmos.top },
          uHor: { value: atmos.horizon },
          uBot: { value: atmos.bottom },
          uSun: { value: atmos.sun },
          uSunDir: { value: atmos.sunDir },
          uMoonDir: { value: atmos.moonDir },
          uNight: { value: 1 },
        },
        vertexShader: /* glsl */ `
          varying vec3 vDir;
          void main() {
            vDir = normalize(position);
            vec4 p = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * p;
            gl_Position.z = gl_Position.w; // pin to the far plane
          }`,
        fragmentShader: /* glsl */ `
          uniform vec3 uTop, uHor, uBot, uSun, uSunDir, uMoonDir;
          uniform float uNight;
          varying vec3 vDir;
          void main() {
            vec3 d = normalize(vDir);
            float h = d.y;
            vec3 col = h > 0.0 ? mix(uHor, uTop, pow(smoothstep(0.0, 0.65, h), 0.7)) : mix(uHor, uBot, smoothstep(0.0, -0.25, h));
            float s = max(dot(d, normalize(uSunDir)), 0.0);
            col += uSun * (pow(s, 5.0) * 0.28 + pow(s, 80.0) * 0.6);
            col += uSun * smoothstep(0.99955, 0.9998, s) * 2.2;
            float m = max(dot(d, normalize(uMoonDir)), 0.0);
            col += vec3(1.0, 0.95, 0.85) * smoothstep(0.99935, 0.9996, m) * 2.2 * uNight;
            col += vec3(0.6, 0.55, 0.8) * pow(m, 200.0) * 0.35 * uNight;
            gl_FragColor = vec4(col, 1.0);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }`,
      }),
    []
  );
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ camera }) => {
    ref.current?.position.copy(camera.position);
    mat.uniforms.uNight.value = atmos.night;
  });
  return (
    <mesh ref={ref} material={mat} renderOrder={-10} frustumCulled={false}>
      <sphereGeometry args={[800, 48, 24]} />
    </mesh>
  );
}

function Stars() {
  const { geo, mat } = useMemo(() => {
    const r = rng(7);
    const n = 1800;
    const pos = new Float32Array(n * 3);
    const size = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const th = r() * Math.PI * 2;
      const y = 0.04 + Math.pow(r(), 0.8) * 0.96;
      const rr = Math.sqrt(1 - y * y);
      pos.set([Math.cos(th) * rr * 600, y * 600, Math.sin(th) * rr * 600], i * 3);
      size[i] = 0.6 + Math.pow(r(), 6) * 3.4;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      fog: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uOpacity: { value: 1 }, uTime: { value: 0 }, uPx: { value: 1 } },
      vertexShader: /* glsl */ `
        attribute float aSize; uniform float uTime; uniform float uPx; varying float vTw;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          vTw = 0.6 + 0.4 * sin(uTime * 2.0 + position.x * 0.13 + position.z * 0.07);
          gl_PointSize = aSize * uPx * 1.6;
        }`,
      fragmentShader: /* glsl */ `
        uniform float uOpacity; varying float vTw;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vec3(1.0, 0.95, 0.9) * 1.4, a * uOpacity * vTw);
        }`,
    });
    return { geo, mat };
  }, []);
  const ref = useRef<THREE.Points>(null);
  const dpr = useThree((s) => s.viewport.dpr);
  useFrame(({ camera, clock }) => {
    ref.current?.position.copy(camera.position);
    mat.uniforms.uOpacity.value = Math.pow(atmos.night, 2);
    mat.uniforms.uTime.value = clock.elapsedTime;
    mat.uniforms.uPx.value = dpr;
  });
  return <points ref={ref} geometry={geo} material={mat} frustumCulled={false} renderOrder={-9} />;
}

/** far below: the country at night, a carpet of city lights */
function CityLights() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        fog: false,
        uniforms: {
          uBase: { value: new THREE.Color() },
          uHor: { value: atmos.horizon },
          uLights: { value: 1 },
          uTime: { value: 0 },
        },
        vertexShader: /* glsl */ `
          varying vec3 vW; varying float vDist;
          void main() {
            vec4 w = modelMatrix * vec4(position, 1.0);
            vW = w.xyz;
            vDist = length(w.xz - cameraPosition.xz);
            gl_Position = projectionMatrix * viewMatrix * w;
          }`,
        fragmentShader: /* glsl */ `
          uniform vec3 uBase, uHor; uniform float uLights, uTime;
          varying vec3 vW; varying float vDist;
          float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
          float noise(vec2 p) {
            vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
            return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
          }
          void main() {
            vec2 p = vW.xz;
            float cluster = smoothstep(0.45, 0.85, noise(p * 0.012) * 0.7 + noise(p * 0.04) * 0.3);
            vec2 cell = floor(p / 3.0);
            vec2 f = fract(p / 3.0) - 0.5;
            float h = hash(cell);
            vec2 o = vec2(hash(cell + 3.1), hash(cell + 7.7)) - 0.5;
            float d = length(f - o * 0.6);
            float on = step(1.0 - cluster * 0.85 - 0.02, h);
            float tw = 0.7 + 0.3 * sin(uTime * (1.0 + h * 3.0) + h * 40.0);
            float dot1 = smoothstep(0.16, 0.0, d) * on * tw;
            vec3 lc = mix(vec3(1.0, 0.62, 0.2), vec3(1.0, 0.45, 0.6), hash(cell + 1.3));
            vec3 col = uBase + lc * dot1 * 2.4 * uLights + lc * cluster * 0.05 * uLights;
            float fog = smoothstep(80.0, 520.0, vDist);
            col = mix(col, uHor, fog);
            gl_FragColor = vec4(col, 1.0);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }`,
      }),
    []
  );
  useFrame(({ clock }) => {
    mat.uniforms.uBase.value.copy(atmos.bottom).multiplyScalar(0.7);
    mat.uniforms.uLights.value = 0.25 + atmos.night * 0.75;
    mat.uniforms.uTime.value = clock.elapsedTime;
  });
  return (
    <mesh material={mat} rotation-x={-Math.PI / 2} position={[0, -48, -140]}>
      <planeGeometry args={[2400, 2400]} />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/* The road                                                                    */
/* -------------------------------------------------------------------------- */

export const trackUniforms = {
  uLit: { value: 0 },
  uTime: { value: 0 },
  uFogColor: { value: atmos.horizon },
  uFogNear: { value: 70 },
  uFogFar: { value: 300 },
};

function Track() {
  const geo = useMemo(() => buildTrackGeometry(), []);
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        uniforms: trackUniforms,
        extensions: { derivatives: true } as never,
        vertexShader: /* glsl */ `
          attribute float aU; attribute float aSide;
          varying vec2 vUv; varying float vU; varying float vSide; varying float vDepth;
          void main() {
            vUv = uv; vU = aU; vSide = aSide;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vDepth = -mv.z;
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: /* glsl */ `
          uniform float uLit, uTime, uFogNear, uFogFar; uniform vec3 uFogColor;
          varying vec2 vUv; varying float vU; varying float vSide; varying float vDepth;
          void main() {
            float x = vUv.x;
            float behind = smoothstep(uLit + 0.0015, uLit - 0.002, vU);
            float near = exp(-abs(vU - uLit) * 90.0);
            float lit = clamp(behind * 0.75 + near * 0.6, 0.0, 1.0);
            vec3 crimson = vec3(0.32, 0.012, 0.045);
            vec3 hot = vec3(1.6, 0.18, 0.36);
            vec3 sun = vec3(2.6, 1.3, 0.05);

            vec3 top = mix(vec3(0.045, 0.012, 0.03), crimson, 0.25 + lit * 0.75);
            float fw = fwidth(x) * 1.5;
            float lanes = 0.0;
            for (int i = 1; i < 4; i++) {
              float c = float(i) * 0.25;
              lanes += 1.0 - smoothstep(0.006, 0.006 + fw, abs(x - c));
            }
            float dash = step(0.4, fract(vUv.y * 0.22));
            lanes *= dash;
            float edge = 1.0 - smoothstep(0.03, 0.03 + fw, min(x, 1.0 - x));
            float pulse = smoothstep(0.92, 1.0, fract(vUv.y * 0.035 - uTime * 0.5)) * behind;
            vec3 col = top;
            col += lanes * mix(vec3(0.18, 0.1, 0.12), sun * 0.8, lit);
            col += edge * mix(vec3(0.35, 0.03, 0.09), hot, lit);
            col += pulse * hot * 0.35;

            // skirts: dark with a hairline glow at the lip
            vec3 skirt = vec3(0.02, 0.005, 0.012);
            float lip = 1.0 - smoothstep(0.0, 0.08, min(x, 1.0 - x));
            skirt += lip * mix(vec3(0.15, 0.02, 0.05), hot * 0.8, lit);
            col = mix(col, skirt, vSide);

            float f = smoothstep(uFogNear, uFogFar, vDepth);
            col = mix(col, uFogColor, f);
            gl_FragColor = vec4(col, 1.0);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }`,
      }),
    []
  );
  return <mesh geometry={geo} material={mat} />;
}

/** lamp posts that switch on as the baton passes them */
function Lamps() {
  const n = Math.floor(LEN / 8);
  const posts = useRef<THREE.InstancedMesh>(null);
  const bulbs = useRef<THREE.InstancedMesh>(null);
  const data = useMemo(() => {
    const items: { u: number; m: THREE.Matrix4; mb: THREE.Matrix4 }[] = [];
    const o = new THREE.Object3D();
    for (let i = 1; i < n; i++) {
      const u = i / n;
      for (const s of [-1, 1]) {
        const p = at(u, s * (TRACK_W / 2 + 0.45), 0);
        o.position.copy(p);
        o.rotation.set(0, yawAt(u), 0);
        o.scale.set(1, 1, 1);
        o.updateMatrix();
        const m = o.matrix.clone();
        o.position.y += 1.55;
        o.updateMatrix();
        items.push({ u, m, mb: o.matrix.clone() });
      }
    }
    return items;
  }, [n]);
  const postGeo = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.045, 0.07, 1.5, 6);
    g.translate(0, 0.75, 0);
    return g;
  }, []);
  const bulbMat = useMemo(() => new THREE.MeshBasicMaterial({ toneMapped: false }), []);
  const lit = useMemo(() => new Uint8Array(data.length).fill(2), [data]);
  const on = useMemo(() => new THREE.Color(PAL.sun).multiplyScalar(3.2), []);
  const off = useMemo(() => new THREE.Color("#3a1622"), []);

  useFrame(() => {
    const p = posts.current;
    const b = bulbs.current;
    if (!p || !b) return;
    if (lit[0] === 2) {
      data.forEach((d, i) => {
        p.setMatrixAt(i, d.m);
        b.setMatrixAt(i, d.mb);
      });
      p.instanceMatrix.needsUpdate = true;
      b.instanceMatrix.needsUpdate = true;
    }
    let dirty = false;
    const u = trackUniforms.uLit.value;
    data.forEach((d, i) => {
      const s = d.u < u + 0.012 ? 1 : 0;
      if (lit[i] !== s) {
        lit[i] = s;
        b.setColorAt(i, s ? on : off);
        dirty = true;
      }
    });
    if (dirty && b.instanceColor) b.instanceColor.needsUpdate = true;
  });
  return (
    <>
      <instancedMesh ref={posts} args={[postGeo, toon("#2a1118", { rim: false }), data.length]} />
      <instancedMesh ref={bulbs} args={[undefined, bulbMat, data.length]}>
        <sphereGeometry args={[0.13, 10, 8]} />
      </instancedMesh>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Floating rock: islands under the key moments + debris all around            */
/* -------------------------------------------------------------------------- */

function Island({ u, r, depth = 0.9, lateral = 0, color = "#3b1020" }: { u: number; r: number; depth?: number; lateral?: number; color?: string }) {
  const mats = useMemo(() => ({ top: toon(color, { rim: false }), rock: toon("#3a1428", { rim: false }) }), [color]);
  const geo = useMemo(() => {
    const cone = new THREE.ConeGeometry(r, r * 1.5, 9, 3);
    const pos = cone.attributes.position as THREE.BufferAttribute;
    const rr = rng(Math.round(r * 100 + u * 1000));
    for (let i = 0; i < pos.count; i++) {
      if (pos.getY(i) < r * 0.7) {
        pos.setX(i, pos.getX(i) * (0.85 + rr() * 0.3));
        pos.setZ(i, pos.getZ(i) * (0.85 + rr() * 0.3));
      }
    }
    const faceted = cone.toNonIndexed();
    faceted.computeVertexNormals();
    return faceted;
  }, [r, u]);
  const p = at(u, lateral, -depth - 0.35);
  return (
    <group position={p} rotation-y={yawAt(u)}>
      <mesh material={mats.top} position-y={0}>
        <cylinderGeometry args={[r, r * 0.98, 0.7, 9]} />
      </mesh>
      <mesh geometry={geo} material={mats.rock} position-y={-0.35 - r * 0.75} rotation-x={Math.PI} />
    </group>
  );
}

function Debris() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const items = useMemo(() => {
    const r = rng(42);
    const out: { p: THREE.Vector3; s: number; rot: THREE.Euler; spin: number; ph: number; c: THREE.Color }[] = [];
    const cols = ["#5a1a33", "#3d1a3d", "#2a3672", "#6a2040"];
    const f = makeFrame();
    for (let i = 0; i < 170; i++) {
      const u = r();
      frameAt(u, f);
      const side = r() < 0.5 ? -1 : 1;
      const lat = side * (7 + Math.pow(r(), 0.7) * 55);
      const p = f.pos.clone().addScaledVector(f.right, lat).add(new THREE.Vector3(0, -4 - r() * 26, (r() - 0.5) * 10));
      out.push({ p, s: 0.35 + Math.pow(r(), 2.2) * 3.6, rot: new THREE.Euler(r() * 6, r() * 6, r() * 6), spin: (r() - 0.5) * 0.3, ph: r() * 6, c: new THREE.Color(cols[Math.floor(r() * cols.length)]) });
    }
    return out;
  }, []);
  const mat = useMemo(() => toon("#ffffff", { rim: false }), []);
  const o = useMemo(() => new THREE.Object3D(), []);
  const colored = useRef(false);
  useFrame(({ clock }) => {
    const m = ref.current;
    if (!m) return;
    const t = clock.elapsedTime;
    items.forEach((it, i) => {
      o.position.copy(it.p);
      o.position.y += Math.sin(t * 0.5 + it.ph) * 0.5;
      o.rotation.set(it.rot.x + t * it.spin, it.rot.y + t * it.spin * 0.7, it.rot.z);
      o.scale.setScalar(it.s);
      o.updateMatrix();
      m.setMatrixAt(i, o.matrix);
      if (!colored.current) m.setColorAt(i, it.c);
    });
    colored.current = true;
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[undefined, mat, items.length]} frustumCulled={false}>
      <dodecahedronGeometry args={[1, 0]} />
    </instancedMesh>
  );
}

/* -------------------------------------------------------------------------- */

export default function Environment() {
  const scene = useThree((s) => s.scene);
  const hemi = useRef<THREE.HemisphereLight>(null);
  const key = useRef<THREE.DirectionalLight>(null);
  const fog = useMemo(() => new THREE.Fog("#000", 70, 300), []);

  useFrame(({ clock }) => {
    lerpSky(story.p);
    scene.fog = fog;
    fog.color.copy(atmos.horizon);
    trackUniforms.uTime.value = clock.elapsedTime;
    if (hemi.current) {
      hemi.current.color.copy(atmos.top).lerp(atmos.horizon, 0.5).offsetHSL(0, 0, 0.25);
      hemi.current.groundColor.copy(atmos.bottom).offsetHSL(0, 0, 0.05);
      hemi.current.intensity = 1.5 + atmos.dawn * 0.8;
    }
    if (key.current) {
      key.current.color.set("#cfd8ff").lerp(atmos.sun, atmos.dawn);
      key.current.intensity = 1.6 + atmos.dawn * 1.4;
      // light rides with the camera focus so it always lands on the team
      key.current.position.copy(story.focus).add(atmos.dawn > 0.3 ? tmpL.set(10, 14, -18) : tmpL.set(-12, 18, 8));
      key.current.target.position.copy(story.focus);
      key.current.target.updateMatrixWorld();
    }
  });

  return (
    <>
      <hemisphereLight ref={hemi} intensity={1.6} />
      <directionalLight ref={key} intensity={1.6} />
      <Sky />
      <Stars />
      <CityLights />
      <Track />
      <Lamps />
      <Debris />
      <Island u={0.012} r={6.5} />
      <Island u={MARK.pass - 0.035} r={18} color="#2c0c1a" depth={0.6} />
      <Island u={MARK.arena} r={11} color="#251036" />
      <Island u={MARK.finish + 0.012} r={11} color="#4a1428" />
    </>
  );
}

const tmpL = new THREE.Vector3();
