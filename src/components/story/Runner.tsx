"use client";
/* eslint-disable react-hooks/immutability -- three.js objects are mutated per frame by design */

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Outlines } from "@react-three/drei";
import * as THREE from "three";
import { rng, toon } from "./toon";
import { PAL, story } from "./store";

export type Hair = "spiky" | "bun" | "cap" | "puff";

export type Look = {
  suit: string;
  cape: string;
  hair: Hair;
  hairColor?: string;
  eye?: string;
};

/** What the director asks a runner to do this frame. */
export type Pose = {
  /** 0 idle → 1 full sprint */
  run: number;
  /** distance moved this frame (drives the stride so feet never skate) */
  stride: number;
  cheer: number;
  wave: number;
  /** extra height (jumps) */
  lift: number;
  /** head turn toward the viewer's pointer, 0..1 */
  look: number;
};

export type Rig = {
  root: THREE.Group;
  hand: THREE.Object3D;
  pose: Pose;
};

const OUT = 0.022;
const INK = PAL.ink;

const tmpPos = new THREE.Vector3();

function Part({
  geo,
  mat,
  outline = true,
  ...rest
}: { geo: THREE.BufferGeometry; mat: THREE.Material; outline?: boolean } & Omit<React.ComponentProps<"mesh">, "geometry" | "material">) {
  return (
    <mesh geometry={geo} material={mat} {...rest}>
      {outline && <Outlines thickness={OUT} color={INK} />}
    </mesh>
  );
}

/** angular, slanted "hero" eye (left side; mirrored for the right) */
function eyeGeometry() {
  const s = new THREE.Shape();
  s.moveTo(-0.215, 0.07);
  s.lineTo(-0.035, -0.015);
  s.quadraticCurveTo(-0.03, -0.075, -0.075, -0.085);
  s.lineTo(-0.175, -0.07);
  s.quadraticCurveTo(-0.225, -0.05, -0.215, 0.07);
  const geo = new THREE.ShapeGeometry(s, 6);
  geo.translate(0.125, 0, 0); // centre it so it can sit tangent to the head
  return geo;
}

// eyes sit tangent to the head sphere, a hair above its surface
const EYE_DIR = new THREE.Vector3(-0.31, -0.03, 0.95).normalize().multiplyScalar(0.415);
const EYE_YAW = Math.atan2(EYE_DIR.x, EYE_DIR.z);

let shadowTex: THREE.Texture | null = null;
function blobShadow() {
  if (shadowTex) return shadowTex;
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, "rgba(10,2,6,0.55)");
  grd.addColorStop(0.6, "rgba(10,2,6,0.25)");
  grd.addColorStop(1, "rgba(10,2,6,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  shadowTex = new THREE.CanvasTexture(c);
  return shadowTex;
}

function HairPiece({ hair, color }: { hair: Hair; color: string }) {
  const mat = toon(color);
  const parts = useMemo(() => {
    const out: { geo: THREE.BufferGeometry; pos: THREE.Vector3; quat: THREE.Quaternion; scale?: THREE.Vector3 }[] = [];
    const up = new THREE.Vector3(0, 1, 0);
    if (hair === "spiky") {
      // jagged spikes radiating from the crown, mostly up and back
      const spikes: [number, number, number][] = [
        [0, 1.35, 0.55],
        [0.9, 1.0, 0.5],
        [-0.9, 1.0, 0.5],
        [1.6, 0.55, 0.48],
        [-1.6, 0.55, 0.48],
        [2.3, 0.75, 0.46],
        [-2.3, 0.75, 0.46],
        [3.14, 0.9, 0.5],
        [2.8, 0.35, 0.4],
        [-2.8, 0.35, 0.4],
        [0.45, 1.25, 0.48],
        [-0.45, 1.25, 0.48],
      ];
      const geo = new THREE.ConeGeometry(0.11, 1, 4);
      geo.translate(0, 0.5, 0);
      for (const [az, el, len] of spikes) {
        const dir = new THREE.Vector3(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el) - 0.35).normalize();
        out.push({
          geo,
          pos: dir.clone().multiplyScalar(0.33),
          quat: new THREE.Quaternion().setFromUnitVectors(up, dir),
          scale: new THREE.Vector3(1, len, 1),
        });
      }
    } else if (hair === "bun") {
      out.push({ geo: new THREE.SphereGeometry(0.43, 20, 12, 0, Math.PI * 2, 0, 1.25), pos: new THREE.Vector3(0, 0.0, -0.03), quat: new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.35, 0, 0)) });
      out.push({ geo: new THREE.SphereGeometry(0.17, 14, 10), pos: new THREE.Vector3(0, 0.38, -0.22), quat: new THREE.Quaternion() });
    } else if (hair === "cap") {
      out.push({ geo: new THREE.SphereGeometry(0.43, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2.1), pos: new THREE.Vector3(0, 0.04, 0), quat: new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.12, 0, 0)) });
      const brim = new THREE.CylinderGeometry(0.3, 0.3, 0.035, 20, 1, false, -Math.PI / 2, Math.PI);
      out.push({ geo: brim, pos: new THREE.Vector3(0, 0.12, 0.3), quat: new THREE.Quaternion().setFromEuler(new THREE.Euler(0.12, 0, 0)), scale: new THREE.Vector3(1, 1, 0.9) });
    } else {
      const g = new THREE.SphereGeometry(0.2, 12, 10);
      const pts: [number, number, number][] = [
        [0, 0.36, 0],
        [0.24, 0.3, -0.05],
        [-0.24, 0.3, -0.05],
        [0.12, 0.3, -0.25],
        [-0.12, 0.3, -0.25],
        [0.3, 0.1, -0.18],
        [-0.3, 0.1, -0.18],
        [0, 0.2, -0.33],
        [0.16, 0.4, 0.14],
        [-0.16, 0.4, 0.14],
      ];
      for (const p of pts) out.push({ geo: g, pos: new THREE.Vector3(...p), quat: new THREE.Quaternion() });
    }
    return out;
  }, [hair]);

  return (
    <>
      {parts.map((p, i) => (
        <mesh key={i} geometry={p.geo} material={mat} position={p.pos} quaternion={p.quat} scale={p.scale ?? [1, 1, 1]}>
          <Outlines thickness={OUT} color={INK} />
        </mesh>
      ))}
    </>
  );
}

/**
 * A relay runner: chibi, toon-shaded, ink-outlined, with a cape that reacts
 * to speed. The hero wears the WebnD look (black suit, teal cape, spiky hair).
 */
export default function Runner({ look, rigRef }: { look: Look; rigRef: React.RefObject<Rig | null> }) {
  const root = useRef<THREE.Group>(null);
  const hips = useRef<THREE.Group>(null);
  const torso = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const foreL = useRef<THREE.Group>(null);
  const foreR = useRef<THREE.Group>(null);
  const legL = useRef<THREE.Group>(null);
  const legR = useRef<THREE.Group>(null);
  const shinL = useRef<THREE.Group>(null);
  const shinR = useRef<THREE.Group>(null);
  const hand = useRef<THREE.Object3D>(null);
  const cape = useRef<THREE.Mesh>(null);
  const shadow = useRef<THREE.Mesh>(null);

  const g = useMemo(() => {
    const capsule = (r: number, l: number) => {
      const c = new THREE.CapsuleGeometry(r, l, 4, 12);
      c.translate(0, -l / 2 - r * 0.4, 0);
      return c;
    };
    const capeGeo = new THREE.PlaneGeometry(1, 1, 6, 10);
    const base = Float32Array.from(capeGeo.attributes.position.array);
    return {
      torso: new THREE.CapsuleGeometry(0.27, 0.34, 4, 14),
      head: new THREE.SphereGeometry(0.4, 28, 20),
      scarf: new THREE.TorusGeometry(0.2, 0.075, 8, 20),
      upper: capsule(0.085, 0.24),
      fore: capsule(0.08, 0.2),
      handG: new THREE.SphereGeometry(0.105, 12, 10),
      thigh: capsule(0.11, 0.22),
      shin: capsule(0.1, 0.22),
      foot: new THREE.SphereGeometry(0.12, 12, 10),
      eye: eyeGeometry(),
      cape: capeGeo,
      capeBase: base,
      shadow: new THREE.CircleGeometry(0.6, 24),
    };
  }, []);

  const suit = toon(look.suit);
  const capeMat = toon(look.cape, { side: THREE.DoubleSide });
  const eyeMat = useMemo(() => new THREE.MeshBasicMaterial({ color: new THREE.Color(look.eye ?? "#ffffff").multiplyScalar(1.6), toneMapped: false, side: THREE.DoubleSide }), [look.eye]);
  const shadowMat = useMemo(() => new THREE.MeshBasicMaterial({ map: blobShadow(), transparent: true, depthWrite: false }), []);

  const seed = look.suit.charCodeAt(1) * 31 + look.hair.length;
  const sim = useRef({ phase: rng(seed)() * 6, run: 0, cheer: 0, wave: 0, look: 0, blink: 2 + rng(seed + 1)() * 3, lastStep: 0, wind: 0 });

  // register the rig with the director
  const ensureRig = () => {
    if (root.current && hand.current && rigRef.current?.root !== root.current) {
      (rigRef as React.RefObject<Rig | null>).current = {
        root: root.current,
        hand: hand.current,
        pose: { run: 0, stride: 0, cheer: 0, wave: 0, lift: 0, look: 1 },
      };
    }
  };

  useFrame(({ clock }, dtRaw) => {
    ensureRig();
    const rig = rigRef.current;
    if (!rig || !hips.current) return;
    const dt = Math.min(dtRaw, 0.05);
    const t = clock.elapsedTime;
    const s = sim.current;
    const P = rig.pose;
    const k = 1 - Math.exp(-dt * 6);

    s.run += (P.run - s.run) * k;
    s.cheer += (P.cheer - s.cheer) * k;
    s.wave += (P.wave - s.wave) * k;
    s.look += (P.look - s.look) * k;
    s.wind += (P.run - s.wind) * (1 - Math.exp(-dt * 2));
    // stride: ~1 full cycle per 1.9 units travelled
    s.phase += P.stride * 3.3 + dt * 0.4 * s.cheer * 8;
    const ph = s.phase;
    const run = s.run;
    const idle = 1 - Math.max(run, s.cheer);

    // footsteps
    const step = Math.floor(ph / Math.PI);
    if (step !== s.lastStep) {
      s.lastStep = step;
      if (run > 0.4) story.steps++;
    }

    // body
    const breathe = Math.sin(t * 2.2) * 0.012;
    const hop = s.cheer * Math.abs(Math.sin(t * 6.5)) * 0.35;
    hips.current.position.y = 0.84 + Math.abs(Math.sin(ph)) * 0.09 * run - 0.05 * run + breathe * idle + hop + P.lift;
    hips.current.rotation.y = Math.sin(ph) * 0.18 * run;
    torso.current!.rotation.x = 0.28 * run - 0.08 * s.cheer;
    torso.current!.rotation.z = Math.sin(ph) * 0.05 * run;

    // head: look at the pointer when calm, at the road when running
    const lx = story.pointer.x * 0.7 * s.look * (1 - run * 0.8);
    const ly = story.pointer.y * 0.35 * s.look * (1 - run * 0.8);
    head.current!.rotation.y += (lx - Math.sin(ph) * 0.15 * run - head.current!.rotation.y) * k;
    head.current!.rotation.x += (-ly - 0.18 * run + s.cheer * -0.2 - head.current!.rotation.x) * k;
    head.current!.position.y = 1.06 + Math.sin(ph * 2) * 0.015 * run;

    // blink
    s.blink -= dt;
    const blinkAmt = s.blink < 0.12 ? 0.1 : 1;
    if (s.blink < 0) s.blink = 2 + ((t * 7.31) % 1) * 4;
    eyes.current!.scale.y += (blinkAmt - eyes.current!.scale.y) * 0.6;

    // legs
    const legA = 0.95 * run;
    legL.current!.rotation.x = -Math.sin(ph) * legA - 0.25 * s.cheer * Math.abs(Math.sin(t * 6.5));
    legR.current!.rotation.x = Math.sin(ph) * legA - 0.25 * s.cheer * Math.abs(Math.sin(t * 6.5));
    shinL.current!.rotation.x = run * (0.2 + 1.35 * Math.max(0, Math.cos(ph))) + s.cheer * 0.4 * Math.abs(Math.sin(t * 6.5));
    shinR.current!.rotation.x = run * (0.2 + 1.35 * Math.max(0, -Math.cos(ph))) + s.cheer * 0.4 * Math.abs(Math.sin(t * 6.5));

    // arms: idle hang → sprint pump → cheer overhead → wave
    const pump = 1.0 * run;
    const cheerUp = -2.75 + Math.sin(t * 6.5) * 0.15;
    armL.current!.rotation.x = Math.sin(ph) * pump * (1 - s.cheer) + cheerUp * s.cheer;
    armL.current!.rotation.z = 0.14 * idle + 0.25 * s.cheer + 0.05 * run;
    armR.current!.rotation.x = -Math.sin(ph) * pump * (1 - s.cheer) * (1 - s.wave) + (cheerUp * s.cheer + -2.6 * s.wave) * 1;
    armR.current!.rotation.z = -0.14 * idle - 0.25 * s.cheer - 0.05 * run - s.wave * (0.45 + Math.sin(t * 9) * 0.35);
    foreL.current!.rotation.x = -0.25 * idle - 1.3 * run - 0.2 * s.cheer;
    foreR.current!.rotation.x = -0.25 * idle - 1.3 * run * (1 - s.wave) - 0.2 * s.cheer - 0.3 * s.wave;

    // cape: hangs when idle, streams back when sprinting
    const pos = g.cape.attributes.position as THREE.BufferAttribute;
    const b = g.capeBase;
    const lift = 0.2 + s.wind * 1.05 + s.cheer * 0.25;
    for (let i = 0; i < pos.count; i++) {
      const bx = b[i * 3];
      const v = 0.5 - b[i * 3 + 1]; // 0 top → 1 bottom
      const width = 0.42 + v * 0.42;
      const wave = Math.sin(t * (4 + s.wind * 8) - v * 5 + bx * 3) * (0.05 + 0.14 * s.wind) * v;
      const ang = lift * (0.6 + v * 0.6) + wave;
      const d = v * 1.02;
      pos.setXYZ(i, bx * width * 2 * 0.5 + Math.sin(t * 3 + v * 4) * 0.03 * v, -Math.cos(ang) * d, -Math.sin(ang) * d - v * 0.05);
    }
    pos.needsUpdate = true;
    g.cape.computeVertexNormals();

    // contact shadow
    if (shadow.current) {
      const h = hips.current.position.y - 0.84;
      const sc = 1 / (1 + Math.max(h, 0) * 1.6);
      shadow.current.scale.setScalar(sc);
    }

    // keep hand world position fresh for the baton
    hand.current!.getWorldPosition(tmpPos);
  });

  const hc = look.hairColor ?? INK;

  return (
    <group ref={root}>
      <mesh ref={shadow} geometry={g.shadow} material={shadowMat} rotation-x={-Math.PI / 2} position-y={0.03} renderOrder={1} />
      <group ref={hips} position-y={0.84}>
        {/* legs */}
        <group ref={legL} position={[0.14, 0.02, 0]}>
          <Part geo={g.thigh} mat={suit} />
          <group ref={shinL} position-y={-0.42}>
            <Part geo={g.shin} mat={suit} />
            <Part geo={g.foot} mat={suit} position={[0, -0.39, 0.06]} scale={[1, 0.7, 1.45]} />
          </group>
        </group>
        <group ref={legR} position={[-0.14, 0.02, 0]}>
          <Part geo={g.thigh} mat={suit} />
          <group ref={shinR} position-y={-0.42}>
            <Part geo={g.shin} mat={suit} />
            <Part geo={g.foot} mat={suit} position={[0, -0.39, 0.06]} scale={[1, 0.7, 1.45]} />
          </group>
        </group>

        {/* upper body */}
        <group ref={torso}>
          <Part geo={g.torso} mat={suit} position-y={0.36} scale={[1, 1, 0.86]} />
          <Part geo={g.scarf} mat={capeMat} position-y={0.69} rotation-x={Math.PI / 2 + 0.15} scale={[1.15, 1, 1]} />
          <mesh ref={cape} geometry={g.cape} material={capeMat} position={[0, 0.7, -0.2]} />

          <group ref={armL} position={[0.36, 0.6, 0]}>
            <Part geo={g.upper} mat={suit} />
            <group ref={foreL} position-y={-0.36}>
              <Part geo={g.fore} mat={suit} />
              <Part geo={g.handG} mat={suit} position-y={-0.34} />
            </group>
          </group>
          <group ref={armR} position={[-0.36, 0.6, 0]}>
            <Part geo={g.upper} mat={suit} />
            <group ref={foreR} position-y={-0.36}>
              <Part geo={g.fore} mat={suit} />
              <Part geo={g.handG} mat={suit} position-y={-0.34} />
              <object3D ref={hand} position={[0, -0.36, 0.04]} />
            </group>
          </group>

          <group ref={head} position-y={1.06}>
            <Part geo={g.head} mat={suit} />
            <group ref={eyes} position={[0, -0.02, 0]}>
              <mesh geometry={g.eye} material={eyeMat} position={[EYE_DIR.x, EYE_DIR.y, EYE_DIR.z]} rotation={[0.03, EYE_YAW, 0]} />
              <mesh geometry={g.eye} material={eyeMat} position={[-EYE_DIR.x, EYE_DIR.y, EYE_DIR.z]} rotation={[0.03, -EYE_YAW, 0]} scale={[-1, 1, 1]} />
            </group>
            <HairPiece hair={look.hair} color={hc} />
          </group>
        </group>
      </group>
    </group>
  );
}
