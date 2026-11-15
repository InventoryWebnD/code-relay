"use client";
/* eslint-disable react-hooks/immutability -- three.js objects are mutated per frame by design */

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Trail } from "@react-three/drei";
import * as THREE from "three";
import Runner, { type Look, type Rig } from "./Runner";
import { CHAPTERS, clamp, keyed, MARK, PAL, range, story, TEAM_U } from "./store";
import { frameAt, LEN, makeFrame } from "./track";
import { trackUniforms } from "./Environment";

/* The cast ----------------------------------------------------------------- */
export const CAST: { name: string; role: string; look: Look }[] = [
  { name: "Webby", role: "The opener", look: { suit: "#2b2f33", cape: PAL.teal, hair: "spiky", hairColor: "#202326" } },
  { name: "Rubi", role: "The anchor", look: { suit: PAL.crimson, cape: PAL.sun, hair: "bun", hairColor: "#2a0a14" } },
  { name: "Kit", role: "The builder", look: { suit: PAL.cream, cape: PAL.crimsonHot, hair: "cap", hairColor: PAL.navy, eye: "#2a0a14" } },
  { name: "Nova", role: "The designer", look: { suit: PAL.navySoft, cape: PAL.blush, hair: "puff", hairColor: "#140c22" } },
];

// lanes across the 3.4-wide road
const LANE_AFTER = [-0.42, 0.42, -1.22, 1.22];
// where the team waits for the opener (u), and how far each runs ahead of the pack
const WAIT = [0, MARK.pass + 0.002, MARK.pass + 0.0005, MARK.pass + 0.0035];
const LEAD = [-0.0012, 0.0016, -0.0004, 0.0004];

const pass = CHAPTERS.find((c) => c.id === "pass")!;
const idea = CHAPTERS.find((c) => c.id === "idea")!;
const HANDOFF: [number, number] = [0.578, 0.594];

/* Camera shots: [p, fwd, up, right, lookFwd, lookUp, lookRight, fov] ------- */
type Shot = [number, number, number, number, number, number, number, number];
const SHOTS: Shot[] = [
  [0.0, 8.2, 1.7, 2.6, 0, 1.45, 2.9, 34],
  [0.06, 8.8, 2.2, 3.6, 0, 1.35, 2.6, 38],
  [0.11, -6.2, 2.4, 2.4, 4, 1.0, -1.6, 42],
  [0.18, -7.5, 3.4, -3.2, 5, 1.0, -1.8, 46],
  [0.245, 15, 11, -15, -2, 5, 0, 48],
  [0.3, -9, 5.5, 0, 14, 3.5, 0, 52],
  [0.36, -8.5, 4.5, 0, 14, 4, 0, 56],
  [0.425, 12, 5, 1, -4, 3, 0, 54],
  [0.47, 6, 2.6, 4.6, 0, 1.4, 1.6, 42],
  [0.525, 11, 13, 15, -5, 0, 0, 50],
  [0.565, 3.4, 1.9, 5.4, 2.4, 1.3, 0, 38],
  [0.6, 2.2, 1.9, 5.2, 2.2, 1.3, 0, 40],
  [0.635, -7.5, 3.2, 3, 5, 1.2, -1.6, 44],
  [0.7, -6, 1.1, 1.8, 10, 6, 0, 54],
  [0.75, -2, 8, -32, 2, 5, 0, 44],
  [0.8, 9, 3.2, 4.5, -3, 2.2, 0, 48],
  [0.86, -7, 3, -3, 4, 1.3, -1.6, 42],
  [0.915, 6.2, 1.25, 1.6, 0, 1.8, 2.0, 40],
  [0.955, 9.5, 3.0, 6.0, -3, 4.6, 3.4, 50],
  [0.985, 16, 12, 12, -6, 3, 0, 50],
  [1.0, 24, 28, 20, -30, 0, 0, 52],
];

function shotAt(p: number, k: number) {
  return keyed(
    SHOTS.map((s) => [s[0], s[k]] as [number, number]),
    p
  );
}

const tmpA = new THREE.Vector3();
const tmpB = new THREE.Vector3();
const qA = new THREE.Quaternion();
const qB = new THREE.Quaternion();
const f = makeFrame();

function dampAngle(a: number, b: number, k: number) {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d * k;
}

export default function Director() {
  const rigs = [useRef<Rig | null>(null), useRef<Rig | null>(null), useRef<Rig | null>(null), useRef<Rig | null>(null)];
  const baton = useRef<THREE.Group>(null);
  const batonLight = useRef<THREE.PointLight>(null);
  const batonMat = useMemo(() => new THREE.MeshBasicMaterial({ color: new THREE.Color(PAL.sun), toneMapped: false }), []);
  const capMat = useMemo(() => new THREE.MeshBasicMaterial({ color: new THREE.Color(PAL.cream), toneMapped: false }), []);
  const { camera, size } = useThree();
  const cam = useMemo(() => ({ pos: new THREE.Vector3(5, 2, 12), look: new THREE.Vector3(0, 1.2, 0), init: false, fov: 34, lift: -1 }), []);
  const sim = useMemo(() => ({ u: [0, WAIT[1], WAIT[2], WAIT[3]], yaw: [0, 0, 0, 0], lane: [0, LANE_AFTER[1], LANE_AFTER[2], LANE_AFTER[3]] }), []);

  useFrame((_, dtRaw) => {
    const dt = Math.max(Math.min(dtRaw, 0.05), 1e-4);
    // ease the scroll so the world glides instead of jumping
    story.p += (story.target - story.p) * (1 - Math.exp(-dt * 3.2));
    if (Math.abs(story.target - story.p) < 1e-5) story.p = story.target;
    const p = story.p;
    const teamU = keyed(TEAM_U, p);
    trackUniforms.uLit.value = teamU;
    const now = performance.now() / 1000;

    const cheer = range(p, 0.93, 0.95);
    const passK = range(p, pass.from + 0.06, pass.from + 0.13);

    for (let i = 0; i < 4; i++) {
      const rig = rigs[i].current;
      if (!rig) continue;
      let u: number;
      let lane: number;
      let wantYaw: number;
      let wave = 0;
      if (i === 0) {
        u = teamU + LEAD[0] * passK;
        lane = LANE_AFTER[0] * passK;
      } else {
        u = Math.max(WAIT[i], teamU + LEAD[i]);
        lane = LANE_AFTER[i];
      }
      const du = u - sim.u[i];
      sim.u[i] = u;
      const dist = Math.abs(du) * LEN;
      const speed = dist / dt;
      const moving = clamp((speed - 0.4) / 3);
      frameAt(u, f);
      const forwardYaw = Math.atan2(f.fwd.x, f.fwd.z);
      if (i > 0 && u <= WAIT[i] + 1e-6) {
        // waiting at the exchange zone: face the opener, wave them in
        const gap = WAIT[i] - teamU;
        const turn = gap < 0.01 ? 0 : 1;
        wantYaw = forwardYaw + Math.PI * turn;
        wave = i === 1 ? clamp(1 - gap / 0.05) * (gap > 0.004 ? 1 : 0) : 0;
      } else {
        wantYaw = du < 0 ? forwardYaw + Math.PI : forwardYaw;
      }
      sim.yaw[i] = dampAngle(sim.yaw[i], wantYaw, 1 - Math.exp(-dt * 8));
      sim.lane[i] += (lane - sim.lane[i]) * (1 - Math.exp(-dt * 4));

      // hero hops when you click the stage
      let lift = 0;
      if (i === 0) {
        const j = (now - story.jumpAt) / 0.62;
        if (j >= 0 && j <= 1) lift = 4 * 0.75 * j * (1 - j);
      }

      rig.root.position.copy(f.pos).addScaledVector(f.right, sim.lane[i]);
      rig.root.position.y += lift;
      rig.root.rotation.y = sim.yaw[i];
      rig.pose.run = moving * (1 - cheer);
      rig.pose.stride = dist;
      rig.pose.cheer = cheer;
      rig.pose.wave = wave;
      rig.pose.lift = 0;
      rig.pose.look = i === 0 ? 1 : 0.4;
      rig.root.visible = i === 0 || p > pass.from - 0.1;
    }

    // baton: hero's hand → handoff → anchor's hand
    const h0 = rigs[0].current;
    const h1 = rigs[1].current;
    if (h0 && h1 && baton.current) {
      h0.root.updateMatrixWorld(true);
      h1.root.updateMatrixWorld(true);
      h0.hand.getWorldPosition(tmpA);
      h1.hand.getWorldPosition(tmpB);
      h0.hand.getWorldQuaternion(qA);
      h1.hand.getWorldQuaternion(qB);
      const x = range(p, HANDOFF[0], HANDOFF[1]);
      const e = x * x * (3 - 2 * x);
      baton.current.position.lerpVectors(tmpA, tmpB, e);
      baton.current.position.y += Math.sin(e * Math.PI) * 0.35;
      baton.current.quaternion.slerpQuaternions(qA, qB, e);
      story.baton.copy(baton.current.position);
      const charge = range(p, idea.from, idea.to - 0.03);
      const pulse = 1 + Math.sin(now * 6) * 0.08 * charge;
      batonMat.color.set(PAL.sun).multiplyScalar((0.35 + charge * 3.2) * pulse);
      if (batonLight.current) batonLight.current.intensity = (1.2 + charge * 9) * pulse;
    }

    // camera rides the team
    const focusU = teamU;
    frameAt(focusU, f);
    story.focus.copy(f.pos);
    // phones and any portrait viewport (tablets upright, split-screen windows)
    const narrow = size.width < 820 || size.width / size.height < 0.85;
    const zoom = narrow ? 1.15 : 1;
    const pf = shotAt(p, 1) * zoom;
    const pu = shotAt(p, 2) * (narrow ? 1.2 : 1);
    const pr = shotAt(p, 3) * zoom;
    tmpA.copy(f.pos).addScaledVector(f.fwd, pf).addScaledVector(f.up, pu).addScaledVector(f.right, pr);
    tmpA.addScaledVector(f.right, story.pointer.x * -0.5).addScaledVector(f.up, story.pointer.y * 0.3);
    tmpB.copy(f.pos)
      .addScaledVector(f.fwd, shotAt(p, 4))
      .addScaledVector(f.up, shotAt(p, 5))
      .addScaledVector(f.right, shotAt(p, 6) * (narrow ? 0 : 1));
    if (story.snap) {
      story.p = story.target;
      cam.init = false;
      story.snap = false;
    }
    if (!cam.init) {
      cam.pos.copy(tmpA);
      cam.look.copy(tmpB);
      cam.init = true;
    }
    const kc = 1 - Math.exp(-dt * 3);
    cam.pos.lerp(tmpA, kc);
    cam.look.lerp(tmpB, kc);
    camera.position.copy(cam.pos);
    camera.lookAt(cam.look);
    const pc = camera as THREE.PerspectiveCamera;
    // phones: the copy fills the lower half, so lift the whole picture up
    const lift = narrow ? Math.round(size.height * 0.14) : 0;
    const liftKey = lift * 100000 + size.width;
    if (liftKey !== cam.lift) {
      cam.lift = liftKey;
      if (lift) pc.setViewOffset(size.width, size.height, 0, lift, size.width, size.height);
      else pc.clearViewOffset();
    }
    const fov = shotAt(p, 7) + (narrow ? 12 : 0);
    if (Math.abs(pc.fov - fov) > 0.01) {
      pc.fov += (fov - pc.fov) * kc;
      pc.updateProjectionMatrix();
    }
  });

  return (
    <>
      {CAST.map((c, i) => (
        <Runner key={c.name} look={c.look} rigRef={rigs[i]} />
      ))}
      <group ref={baton}>
        <Trail width={0.9} length={4.5} decay={1.5} color={new THREE.Color(PAL.sun).multiplyScalar(2.2)} attenuation={(w) => w * w}>
          <mesh material={batonMat} position-y={0}>
            <cylinderGeometry args={[0.07, 0.07, 0.6, 12]} />
          </mesh>
        </Trail>
        <mesh material={capMat} position-y={0.31}>
          <sphereGeometry args={[0.075, 10, 8]} />
        </mesh>
        <mesh material={capMat} position-y={-0.31}>
          <sphereGeometry args={[0.075, 10, 8]} />
        </mesh>
        <pointLight ref={batonLight} color={PAL.sun} distance={8} decay={1.6} intensity={2} />
      </group>
    </>
  );
}
