"use client";
/* eslint-disable react-hooks/immutability -- three.js objects are mutated per frame by design */

import { Suspense, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Outlines, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { CHAPTERS, MARK, PAL, range, story } from "./store";
import { at, frameAt, makeFrame, TRACK_W, yawAt } from "./track";
import { glow, rng, toon } from "./toon";
import { atmos } from "./Environment";

const chapter = (id: string) => CHAPTERS.find((c) => c.id === id)!;
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const WEB_LAT = 12;

/* -------------------------------------------------------------------------- */
/* 01 · Ideas rise from the cities below and pour into the baton               */
/* -------------------------------------------------------------------------- */
export function Ideas() {
  const { size } = useThree();
  const { geo, mat } = useMemo(() => {
    const r = rng(11);
    const n = 1400;
    const start = new Float32Array(n * 3);
    const delay = new Float32Array(n);
    const seed = new Float32Array(n);
    const col = new Float32Array(n * 3);
    const center = at(0.14, 0, 0);
    const palette = [new THREE.Color(PAL.sun), new THREE.Color("#ff8fae"), new THREE.Color(PAL.teal), new THREE.Color("#ffe7b0")];
    for (let i = 0; i < n; i++) {
      const a = r() * Math.PI * 2;
      const d = 30 + Math.pow(r(), 0.6) * 220;
      start.set([center.x + Math.cos(a) * d, -46, center.z + Math.sin(a) * d * 1.2], i * 3);
      delay[i] = r();
      seed[i] = r();
      const c = palette[Math.floor(r() * palette.length)];
      col.set([c.r, c.g, c.b], i * 3);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(start, 3));
    geo.setAttribute("aDelay", new THREE.BufferAttribute(delay, 1));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    geo.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uT: { value: 0 }, uTarget: { value: new THREE.Vector3() }, uTime: { value: 0 }, uPx: { value: 1 } },
      vertexShader: /* glsl */ `
        attribute float aDelay; attribute float aSeed; attribute vec3 aColor;
        uniform float uT, uTime, uPx; uniform vec3 uTarget;
        varying vec3 vColor; varying float vA;
        void main() {
          float t = clamp(uT * 1.6 - aDelay * 0.6, 0.0, 1.0);
          float e = t * t * (3.0 - 2.0 * t);
          vec3 a = position;
          vec3 b = uTarget + vec3(sin(aSeed * 40.0 + uTime * 3.0), cos(aSeed * 31.0 + uTime * 2.0), sin(aSeed * 17.0)) * (1.0 - e) * 0.6;
          vec3 mid = mix(a, b, 0.5) + vec3((aSeed - 0.5) * 30.0, 38.0 + aSeed * 22.0, 0.0);
          vec3 p = mix(mix(a, mid, e), mix(mid, b, e), e);
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          float arrive = smoothstep(0.92, 1.0, t);
          float rising = step(0.001, t);
          vA = (1.0 - arrive) * mix(0.0, 1.0, rising);
          vColor = aColor;
          gl_PointSize = min((1.0 + aSeed * 2.2) * uPx * (55.0 / -mv.z) * (0.6 + 0.4 * rising), 14.0 * uPx);
        }`,
      fragmentShader: /* glsl */ `
        varying vec3 vColor; varying float vA;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vColor * 2.6, a * vA);
        }`,
    });
    return { geo, mat };
  }, []);
  const c = chapter("idea");
  useFrame(({ clock }) => {
    mat.uniforms.uT.value = range(story.p, c.from - 0.02, c.to - 0.03);
    mat.uniforms.uTarget.value.copy(story.baton);
    mat.uniforms.uTime.value = clock.elapsedTime;
    mat.uniforms.uPx.value = Math.min(window.devicePixelRatio, 1.75) * (size.height / 900);
  });
  return <points geometry={geo} material={mat} frustumCulled={false} />;
}

/* -------------------------------------------------------------------------- */
/* 02 · The fork: Web2 (a thinking network) and Web3 (a chain of blocks)       */
/* -------------------------------------------------------------------------- */
function useAppear(from: number, to: number) {
  return () => ease(range(story.p, from, to));
}

function Web2Brain() {
  const u = MARK.fork;
  const pos = at(u, -WEB_LAT, 6);
  const nodes = useRef<THREE.InstancedMesh>(null);
  const group = useRef<THREE.Group>(null);
  const layers = [4, 7, 7, 5, 2];
  const { pts, lineGeo, pulseGeo, edges } = useMemo(() => {
    const r = rng(5);
    const pts: THREE.Vector3[] = [];
    const byLayer: THREE.Vector3[][] = [];
    layers.forEach((n, li) => {
      const arr: THREE.Vector3[] = [];
      for (let i = 0; i < n; i++) {
        const v = new THREE.Vector3((li - (layers.length - 1) / 2) * 3.6, (i - (n - 1) / 2) * 1.55 + (r() - 0.5) * 0.4, (r() - 0.5) * 2.4);
        arr.push(v);
        pts.push(v);
      }
      byLayer.push(arr);
    });
    const seg: number[] = [];
    const edges: [THREE.Vector3, THREE.Vector3][] = [];
    for (let l = 0; l < byLayer.length - 1; l++)
      for (const a of byLayer[l])
        for (const b of byLayer[l + 1])
          if (r() < 0.7) {
            seg.push(a.x, a.y, a.z, b.x, b.y, b.z);
            edges.push([a, b]);
          }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(seg, 3));
    const pulseGeo = new THREE.BufferGeometry();
    pulseGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(60 * 3), 3));
    return { pts, lineGeo, pulseGeo, edges };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const lineMat = useMemo(() => new THREE.LineBasicMaterial({ color: new THREE.Color(PAL.crimsonHot).multiplyScalar(1.4), transparent: true, opacity: 0, toneMapped: false, blending: THREE.AdditiveBlending, depthWrite: false }), []);
  const pulseMat = useMemo(() => new THREE.PointsMaterial({ color: new THREE.Color("#ffd0dc").multiplyScalar(3), size: 0.35, transparent: true, opacity: 0, toneMapped: false, depthWrite: false, blending: THREE.AdditiveBlending }), []);
  const o = useMemo(() => new THREE.Object3D(), []);
  const c = chapter("tracks");
  const appear = useAppear(c.from - 0.05, c.from + 0.05);
  const pulses = useMemo(() => {
    const r = rng(9);
    return Array.from({ length: 60 }, (_, i) => ({ e: i % edges.length, o: r() }));
  }, [edges.length]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const a = appear();
    const m = nodes.current;
    if (!m || !group.current) return;
    group.current.visible = a > 0.001;
    if (!group.current.visible) return;
    pts.forEach((p, i) => {
      o.position.copy(p);
      o.position.y += Math.sin(t * 1.3 + i) * 0.12;
      const beat = 1 + Math.max(0, Math.sin(t * 3 - p.x * 0.6)) * 0.25;
      o.scale.setScalar(ease(Math.min(Math.max(a * 1.8 - (i / pts.length) * 0.8, 0), 1)) * beat);
      o.updateMatrix();
      m.setMatrixAt(i, o.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
    lineMat.opacity = a * 0.55;
    pulseMat.opacity = a;
    const arr = pulseGeo.attributes.position as THREE.BufferAttribute;
    pulses.forEach((pp, i) => {
      const [p0, p1] = edges[pp.e];
      let f = (t * 0.6 + pp.o) % 1;
      if (f < 0.02) pp.e = (pp.e + 7) % edges.length;
      f = f * f;
      arr.setXYZ(i, p0.x + (p1.x - p0.x) * f, p0.y + (p1.y - p0.y) * f, p0.z + (p1.z - p0.z) * f);
    });
    arr.needsUpdate = true;
    group.current.rotation.y = yawAt(u) + Math.PI / 2 + Math.sin(t * 0.3) * 0.15;
  });

  return (
    <group ref={group} position={pos}>
      <instancedMesh ref={nodes} args={[undefined, glow(PAL.crimsonHot, 2.4), pts.length]}>
        <icosahedronGeometry args={[0.32, 1]} />
      </instancedMesh>
      <lineSegments geometry={lineGeo} material={lineMat} />
      <points geometry={pulseGeo} material={pulseMat} />
    </group>
  );
}

function Web3Chain() {
  const u = MARK.fork + 0.012;
  const pos = at(u, WEB_LAT, 5.5);
  const group = useRef<THREE.Group>(null);
  const coins = useRef<(THREE.Group | null)[]>([]);
  const n = 7;
  const c = chapter("tracks");
  const appear = useAppear(c.from - 0.03, c.from + 0.08);
  const rimTeal = useMemo(() => new THREE.Color(PAL.teal).multiplyScalar(2.6), []);
  const linkMat = glow(PAL.sun, 2.2);
  const faceMat = glow(PAL.teal, 1.8);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const a = appear();
    if (!group.current) return;
    group.current.visible = a > 0.001;
    if (!group.current.visible) return;
    group.current.rotation.y = yawAt(u) - Math.PI / 2 + Math.sin(t * 0.25) * 0.12;
    coins.current.forEach((g, i) => {
      if (!g) return;
      const k = ease(Math.min(Math.max(a * 1.7 - (i / n) * 0.7, 0), 1));
      g.scale.setScalar(k);
      g.position.set((i - (n - 1) / 2) * 2.5, Math.sin(i * 0.9 + t * 0.8) * 0.9, 0);
      g.rotation.z = t * 0.6 + i * 0.5;
    });
  });

  return (
    <group ref={group} position={pos}>
      {Array.from({ length: n }).map((_, i) => (
        <group key={i} ref={(el) => void (coins.current[i] = el)}>
          <mesh material={toon(PAL.navySoft)} rotation-x={Math.PI / 2}>
            <cylinderGeometry args={[0.95, 0.95, 0.34, 6]} />
            <Outlines thickness={0.05} color={rimTeal} toneMapped={false} />
          </mesh>
          <mesh material={faceMat} position-z={0.18} rotation-x={Math.PI / 2}>
            <cylinderGeometry args={[0.42, 0.42, 0.02, 6]} />
          </mesh>
          <mesh material={faceMat} position-z={-0.18} rotation-x={Math.PI / 2}>
            <cylinderGeometry args={[0.42, 0.42, 0.02, 6]} />
          </mesh>
          {i < n - 1 && (
            <mesh material={linkMat} position-x={1.25} rotation-y={Math.PI / 2}>
              <torusGeometry args={[0.32, 0.07, 8, 18]} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

/** two glowing paths peel off the road, one to each track */
function ForkLanes() {
  const tubes = useMemo(() => {
    const mk = (side: number, target: THREE.Vector3) => {
      const a = at(MARK.fork - 0.055, side * (TRACK_W / 2), 0.05);
      const b = at(MARK.fork - 0.03, side * 6, 1.2);
      const c = target.clone().add(new THREE.Vector3(0, -2.5, 0));
      return new THREE.TubeGeometry(new THREE.CatmullRomCurve3([a, b, c]), 60, 0.07, 6, false);
    };
    return [mk(-1, at(MARK.fork, -WEB_LAT, 6)), mk(1, at(MARK.fork + 0.012, WEB_LAT, 5.5))];
  }, []);
  const mats = useMemo(
    () => [PAL.crimsonHot, PAL.teal].map((c) => new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(2.4), toneMapped: false, transparent: true, opacity: 0 })),
    []
  );
  const c = chapter("tracks");
  useFrame(() => {
    const a = range(story.p, c.from - 0.06, c.from + 0.02);
    mats.forEach((m) => (m.opacity = a));
    tubes.forEach((g) => g.setDrawRange(0, Math.floor(g.index!.count * a / 6) * 6));
  });
  return (
    <>
      <mesh geometry={tubes[0]} material={mats[0]} />
      <mesh geometry={tubes[1]} material={mats[1]} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* 03 · The shortlist: a plaza of hopefuls; 150 keep their light               */
/* -------------------------------------------------------------------------- */
function Crowd() {
  const total = 560;
  const chosenN = 150;
  const chosen = useRef<THREE.InstancedMesh>(null);
  const rest = useRef<THREE.InstancedMesh>(null);
  const geo = useMemo(() => {
    const body = new THREE.CapsuleGeometry(0.2, 0.36, 3, 8);
    body.translate(0, 0.42, 0);
    const head = new THREE.SphereGeometry(0.2, 10, 8);
    head.translate(0, 0.98, 0);
    const merged = new THREE.BufferGeometry();
    // manual merge (two indexed geometries)
    const parts = [body.toNonIndexed(), head.toNonIndexed()];
    const pos = new Float32Array(parts.reduce((a, g) => a + g.attributes.position.array.length, 0));
    const nor = new Float32Array(pos.length);
    let off = 0;
    for (const g of parts) {
      pos.set(g.attributes.position.array as Float32Array, off);
      nor.set(g.attributes.normal.array as Float32Array, off);
      off += g.attributes.position.array.length;
    }
    merged.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    merged.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
    return merged;
  }, []);
  const people = useMemo(() => {
    const r = rng(23);
    const f = makeFrame();
    const all: { p: THREE.Vector3; yaw: number; ph: number; d: number }[] = [];
    while (all.length < total) {
      const u = MARK.pass - 0.085 + r() * 0.06;
      frameAt(u, f);
      const side = r() < 0.5 ? -1 : 1;
      const lat = side * (3.2 + Math.pow(r(), 0.8) * 12);
      const p = f.pos.clone().addScaledVector(f.right, lat);
      const center = at(MARK.pass - 0.035, 0, 0);
      if (Math.hypot(p.x - center.x, p.z - center.z) > 17) continue;
      p.y = center.y - 0.55;
      all.push({ p, yaw: Math.atan2(-side * f.right.x, -side * f.right.z), ph: r() * 6, d: r() });
    }
    return all;
  }, []);
  // its own cache key, so animating the glow touches nothing else
  const chosenMat = useMemo(() => toon(PAL.sun, { emissive: PAL.sun, glow: 0.0001 }) as THREE.MeshToonMaterial, []);
  const restMat = useMemo(() => toon("#8a6f7a"), []);
  const o = useMemo(() => new THREE.Object3D(), []);
  const c = chapter("pass");
  const idle = useRef(false);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const vis = range(story.p, c.from - 0.08, c.from - 0.02);
    // 560 matrices a frame is real work on phones: skip it while the plaza is
    // hidden (before) or far behind the camera (after)
    const off = vis === 0 || story.p > c.to + 0.06;
    if (off && idle.current) return;
    idle.current = off;
    const cut = range(story.p, c.from + 0.01, c.from + 0.08);
    const cheer = range(story.p, c.from + 0.06, c.from + 0.1);
    chosenMat.emissiveIntensity = cheer * 1.6;
    const a = chosen.current;
    const b = rest.current;
    if (!a || !b) return;
    people.forEach((pp, i) => {
      const isChosen = i < chosenN;
      const sink = isChosen ? 0 : ease(Math.min(Math.max(cut * 1.6 - pp.d * 0.6, 0), 1));
      const jump = isChosen ? Math.abs(Math.sin(t * 5 + pp.ph)) * 0.35 * cheer : Math.abs(Math.sin(t * 3 + pp.ph)) * 0.08;
      o.position.copy(pp.p);
      o.position.y += jump - sink * 1.2;
      o.rotation.set(0, pp.yaw, 0);
      o.scale.setScalar(Math.max(ease(vis) * (1 - sink), 0.0001));
      o.updateMatrix();
      if (isChosen) a.setMatrixAt(i, o.matrix);
      else b.setMatrixAt(i - chosenN, o.matrix);
    });
    a.instanceMatrix.needsUpdate = true;
    b.instanceMatrix.needsUpdate = true;
  });
  return (
    <>
      <instancedMesh ref={chosen} args={[geo, chosenMat, chosenN]} frustumCulled={false} />
      <instancedMesh ref={rest} args={[geo, restMat, total - chosenN]} frustumCulled={false} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* 04 · The 30-hour arena: a clock-gate with screens of code orbiting it       */
/* -------------------------------------------------------------------------- */
function codeTexture(seed: number) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 160;
  const g = c.getContext("2d")!;
  g.fillStyle = "#0d0a1c";
  g.fillRect(0, 0, 256, 160);
  g.fillStyle = "#1c1636";
  g.fillRect(0, 0, 256, 16);
  ["#ff5f57", "#febc2e", "#28c840"].forEach((col, i) => {
    g.fillStyle = col;
    g.beginPath();
    g.arc(10 + i * 12, 8, 3.5, 0, 7);
    g.fill();
  });
  const r = rng(seed);
  const cols = ["#ff6b8b", "#f5b000", "#5aa7a7", "#f6f0e8", "#9b8cff"];
  for (let y = 26; y < 154; y += 11) {
    let x = 10 + Math.floor(r() * 4) * 12;
    const words = 1 + Math.floor(r() * 4);
    for (let w = 0; w < words && x < 240; w++) {
      const len = 14 + r() * 50;
      g.fillStyle = cols[Math.floor(r() * cols.length)];
      g.globalAlpha = 0.85;
      g.fillRect(x, y, len, 5);
      x += len + 7;
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function Arena() {
  const u = MARK.arena;
  const base = at(u, 0, 0);
  const R = 7.2;
  const ticks = useRef<THREE.InstancedMesh>(null);
  const hourHand = useRef<THREE.Group>(null);
  const minHand = useRef<THREE.Group>(null);
  const screens = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const c = chapter("sprint");
  const screenMats = useMemo(() => Array.from({ length: 6 }, (_, i) => new THREE.MeshBasicMaterial({ map: codeTexture(i + 3), toneMapped: false, side: THREE.DoubleSide, color: new THREE.Color(1.3, 1.3, 1.3) })), []);
  const tickOn = useMemo(() => new THREE.Color(PAL.sun).multiplyScalar(3), []);
  const tickOff = useMemo(() => new THREE.Color("#3a2440"), []);
  const ringMat = useMemo(() => new THREE.MeshBasicMaterial({ color: new THREE.Color(PAL.crimsonHot).multiplyScalar(2), toneMapped: false }), []);
  const o = useMemo(() => new THREE.Object3D(), []);
  const lit = useRef(-1);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const h = range(story.p, c.from + 0.01, c.to - 0.01) * 30; // hours elapsed
    const m = ticks.current;
    if (m) {
      const n = Math.floor(h + 0.001);
      if (n !== lit.current) {
        for (let i = 0; i < 30; i++) {
          if (lit.current === -1) {
            const a = (i / 30) * Math.PI * 2;
            o.position.set(Math.sin(a) * (R - 0.75), Math.cos(a) * (R - 0.75), 0);
            o.rotation.set(0, 0, -a);
            o.scale.set(1, i % 5 === 0 ? 1.7 : 1, 1);
            o.updateMatrix();
            m.setMatrixAt(i, o.matrix);
          }
          m.setColorAt(i, i < n ? tickOn : tickOff);
        }
        m.instanceMatrix.needsUpdate = true;
        if (m.instanceColor) m.instanceColor.needsUpdate = true;
        lit.current = n;
      }
    }
    if (hourHand.current) hourHand.current.rotation.z = -(h / 12) * Math.PI * 2;
    if (minHand.current) minHand.current.rotation.z = -h * Math.PI * 2;
    if (screens.current) screens.current.rotation.y = t * 0.12;
    if (ring.current) ringMat.color.set(PAL.crimsonHot).lerp(tmpC.set(PAL.sun), h / 30).multiplyScalar(2 + Math.sin(t * 3) * 0.3);
  });

  return (
    <group position={base} rotation-y={yawAt(u)}>
      {/* the gate */}
      <group position-y={R + 0.2}>
        <mesh ref={ring} material={ringMat}>
          <torusGeometry args={[R, 0.28, 12, 96]} />
        </mesh>
        <mesh material={toon("#1d1238")}>
          <torusGeometry args={[R + 0.55, 0.32, 10, 96]} />
          <Outlines thickness={0.04} color={PAL.ink} />
        </mesh>
        <instancedMesh ref={ticks} args={[undefined, new THREE.MeshBasicMaterial({ toneMapped: false }), 30]}>
          <boxGeometry args={[0.16, 0.7, 0.16]} />
        </instancedMesh>
        <group ref={hourHand}>
          <mesh material={glow(PAL.cream, 1.6)} position-y={1.9}>
            <boxGeometry args={[0.22, 3.8, 0.12]} />
          </mesh>
        </group>
        <group ref={minHand}>
          <mesh material={glow(PAL.sun, 2.4)} position-y={2.6}>
            <boxGeometry args={[0.12, 5.2, 0.1]} />
          </mesh>
        </group>
        <mesh material={glow(PAL.sun, 3)}>
          <sphereGeometry args={[0.4, 16, 12]} />
        </mesh>
      </group>
      {/* screens of code orbiting the gate */}
      <group ref={screens} position-y={5}>
        {Array.from({ length: 14 }).map((_, i) => {
          const a = (i / 14) * Math.PI * 2;
          const rr = 13 + (i % 3) * 2.5;
          return (
            <group key={i} position={[Math.cos(a) * rr, Math.sin(i * 1.7) * 3.2, Math.sin(a) * rr]} rotation-y={-a + Math.PI / 2}>
              <mesh material={screenMats[i % screenMats.length]}>
                <planeGeometry args={[3.2, 2]} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}
const tmpC = new THREE.Color();

/* -------------------------------------------------------------------------- */
/* 05 · The finish: arch, trophy, the WebnD mascot and a sky full of confetti     */
/* -------------------------------------------------------------------------- */
function checkerTexture() {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 32;
  const g = c.getContext("2d")!;
  for (let x = 0; x < 16; x++)
    for (let y = 0; y < 4; y++) {
      g.fillStyle = (x + y) % 2 ? "#15060b" : "#fffbf5";
      g.fillRect(x * 8, y * 8, 8, 8);
    }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.magFilter = THREE.NearestFilter;
  return t;
}

function Mascot({ position }: { position: THREE.Vector3 }) {
  const tex = useTexture("/brand/webnd-mascot-stand.webp");
  const ref = useRef<THREE.Group>(null);
  const c = chapter("finish");
  const aspect = useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    const img = tex.image as { width: number; height: number };
    return img.height / img.width;
  }, [tex]);
  useFrame(({ camera, clock }) => {
    const g = ref.current;
    if (!g) return;
    const a = ease(range(story.p, c.from + 0.02, c.from + 0.09));
    g.scale.setScalar(Math.max(a, 0.0001));
    g.position.copy(position);
    g.position.y += Math.sin(clock.elapsedTime * 2) * 0.25 + (1 - a) * -4;
    g.quaternion.copy(camera.quaternion);
  });
  const w = 5;
  return (
    <group ref={ref}>
      <mesh position={[0.2, -0.2, -0.05]}>
        <planeGeometry args={[w * 1.04, w * aspect * 1.04]} />
        <meshBasicMaterial map={tex} color="#000000" transparent opacity={0.35} depthWrite={false} />
      </mesh>
      <mesh>
        <planeGeometry args={[w, w * aspect]} />
        <meshBasicMaterial map={tex} transparent alphaTest={0.05} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Trophy() {
  const geo = useMemo(() => {
    const pts = [
      [0, 0],
      [0.9, 0],
      [0.9, 0.25],
      [0.35, 0.35],
      [0.22, 0.9],
      [0.3, 1.2],
      [0.95, 1.6],
      [1.05, 2.6],
      [0.95, 2.62],
      [0, 2.62],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(pts, 24);
  }, []);
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.6;
  });
  return (
    <group ref={ref}>
      <mesh geometry={geo} material={toon(PAL.sun, { emissive: PAL.sun, glow: 0.35 })}>
        <Outlines thickness={0.05} color={PAL.ink} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 1.15, 2.0, 0]} rotation-y={s > 0 ? 0 : Math.PI} material={toon(PAL.sun, { emissive: PAL.sun, glow: 0.35 })}>
          <torusGeometry args={[0.38, 0.09, 8, 16, Math.PI * 1.2]} />
          <Outlines thickness={0.04} color={PAL.ink} />
        </mesh>
      ))}
      <mesh material={glow("#fff3c4", 3)} position-y={2.95}>
        <octahedronGeometry args={[0.32, 0]} />
      </mesh>
    </group>
  );
}

function Confetti() {
  const n = 420;
  const ref = useRef<THREE.InstancedMesh>(null);
  const items = useMemo(() => {
    const r = rng(77);
    const cols = [PAL.sun, PAL.crimsonHot, PAL.teal, PAL.cream, PAL.blush, PAL.navySoft].map((c) => new THREE.Color(c).multiplyScalar(1.6));
    return Array.from({ length: n }, () => ({
      v: new THREE.Vector3((r() - 0.5) * 22, 10 + r() * 16, (r() - 0.5) * 22),
      spin: new THREE.Vector3(r() * 8, r() * 8, r() * 8),
      c: cols[Math.floor(r() * cols.length)],
      d: r(),
    }));
  }, []);
  const origin = useMemo(() => at(MARK.finish, 0, 6), []);
  const o = useMemo(() => new THREE.Object3D(), []);
  const colored = useRef(false);
  const idle = useRef(false);
  const c = chapter("finish");
  useFrame(({ clock }) => {
    const m = ref.current;
    if (!m) return;
    // time since the burst, driven by scroll so it replays when you scroll back
    const T = range(story.p, c.from + 0.07, c.to) * 9;
    if (T === 0 && idle.current) return; // not fired yet: nothing to move
    idle.current = T === 0;
    const t = clock.elapsedTime;
    items.forEach((it, i) => {
      const tt = Math.max(T - it.d * 0.5, 0);
      const drag = 1 - Math.exp(-tt * 1.4);
      o.position.set(origin.x + (it.v.x / 1.4) * drag, origin.y + (it.v.y / 1.4) * drag - 1.6 * tt * tt * 0.5 + Math.sin(t * 3 + i) * 0.1 * tt, origin.z + (it.v.z / 1.4) * drag);
      o.rotation.set(it.spin.x * t, it.spin.y * t, it.spin.z * t);
      o.scale.setScalar(tt > 0 && tt < 8.5 ? 1 : 0.0001);
      o.updateMatrix();
      m.setMatrixAt(i, o.matrix);
      if (!colored.current) m.setColorAt(i, it.c);
    });
    colored.current = true;
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[undefined, new THREE.MeshBasicMaterial({ toneMapped: false, side: THREE.DoubleSide }), n]} frustumCulled={false}>
      <planeGeometry args={[0.22, 0.34]} />
    </instancedMesh>
  );
}

function Finish() {
  const u = MARK.finish;
  const base = at(u, 0, 0);
  const checker = useMemo(() => checkerTexture(), []);
  const bannerMat = useMemo(() => new THREE.MeshBasicMaterial({ map: checker }), [checker]);
  const lineMat = useMemo(() => new THREE.MeshBasicMaterial({ map: checker, polygonOffset: true, polygonOffsetFactor: -2 }), [checker]);
  const mascotPos = useMemo(() => at(u - 0.002, 0, 7.9), [u]);
  const trophyPos = useMemo(() => at(u + 0.004, -4.4, -0.2), [u]);
  return (
    <>
      <group position={base} rotation-y={yawAt(u)}>
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * 2.3, 2.6, 0]} material={toon(PAL.crimson)}>
            <cylinderGeometry args={[0.24, 0.3, 5.2, 10]} />
            <Outlines thickness={0.04} color={PAL.ink} />
          </mesh>
        ))}
        <mesh position={[0, 5.0, 0]} material={bannerMat}>
          <boxGeometry args={[5.4, 0.9, 0.25]} />
          <Outlines thickness={0.04} color={PAL.ink} />
        </mesh>
        <mesh position={[0, 5.55, 0]} material={glow(PAL.sun, 2.8)}>
          <boxGeometry args={[5.6, 0.08, 0.3]} />
        </mesh>
        <mesh position={[0, 4.45, 0]} material={glow(PAL.sun, 2.8)}>
          <boxGeometry args={[5.6, 0.08, 0.3]} />
        </mesh>
        <mesh rotation-x={-Math.PI / 2} position-y={0.02} material={lineMat}>
          <planeGeometry args={[TRACK_W, 0.8]} />
        </mesh>
      </group>
      <group position={trophyPos}>
        <mesh material={toon("#2a1118")} position-y={0.5}>
          <cylinderGeometry args={[1.2, 1.4, 1, 8]} />
          <Outlines thickness={0.04} color={PAL.ink} />
        </mesh>
        <group position-y={1}>
          <Trophy />
        </group>
      </group>
      <Suspense fallback={null}>
        <Mascot position={mascotPos} />
      </Suspense>
      <Confetti />
    </>
  );
}

function StartLine() {
  const u = MARK.start + 0.008;
  return (
    <group position={at(u, 0, 0)} rotation-y={yawAt(u)}>
      <mesh rotation-x={-Math.PI / 2} position-y={0.02}>
        <planeGeometry args={[TRACK_W, 0.22]} />
        <meshBasicMaterial color={new THREE.Color(PAL.cream).multiplyScalar(1.5)} toneMapped={false} polygonOffset polygonOffsetFactor={-2} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 2.3, 1.3, 0]} material={toon(PAL.cream)}>
          <cylinderGeometry args={[0.12, 0.16, 2.6, 8]} />
          <Outlines thickness={0.035} color={PAL.ink} />
        </mesh>
      ))}
      <mesh position={[0, 2.62, 0]} material={glow(PAL.crimsonHot, 2.2)}>
        <boxGeometry args={[4.75, 0.12, 0.12]} />
      </mesh>
    </group>
  );
}

export default function SetPieces() {
  // a little warmth from the sunrise on the finish island
  const light = useRef<THREE.PointLight>(null);
  useFrame(() => {
    if (light.current) light.current.intensity = 40 * atmos.dawn;
  });
  return (
    <>
      <StartLine />
      <Ideas />
      <ForkLanes />
      <Web2Brain />
      <Web3Chain />
      <Crowd />
      <Arena />
      <Finish />
      <pointLight ref={light} position={at(MARK.finish + 0.02, 0, 5)} color={PAL.sun} distance={30} />
    </>
  );
}
