import * as THREE from "three";

/** The relay track: one winding road through the sky. */
const PTS: [number, number, number][] = [
  [0, 0, 8],
  [0, 0, -14],
  [6, 0.5, -38],
  [14, 1.5, -62],
  [8, 2, -86],
  [-6, 2, -106],
  [-14, 1.5, -128],
  [-6, 1, -152],
  [8, 1.5, -174],
  [12, 2, -198],
  [2, 2.5, -222],
  [-6, 2, -244],
  [0, 2, -266],
  [0, 2, -290],
];

export const curve = new THREE.CatmullRomCurve3(
  PTS.map((p) => new THREE.Vector3(...p)),
  false,
  "centripetal"
);
export const LEN = curve.getLength();
export const TRACK_W = 3.4;

const N = 1600;
const P = new Float32Array((N + 1) * 3);
const T = new Float32Array((N + 1) * 3);
{
  const v = new THREE.Vector3();
  for (let i = 0; i <= N; i++) {
    curve.getPointAt(i / N, v);
    P.set([v.x, v.y, v.z], i * 3);
    curve.getTangentAt(i / N, v);
    T.set([v.x, v.y, v.z], i * 3);
  }
}

export type Frame = { pos: THREE.Vector3; fwd: THREE.Vector3; right: THREE.Vector3; up: THREE.Vector3 };

export function makeFrame(): Frame {
  return { pos: new THREE.Vector3(), fwd: new THREE.Vector3(), right: new THREE.Vector3(), up: new THREE.Vector3(0, 1, 0) };
}

const WORLD_UP = new THREE.Vector3(0, 1, 0);

/** position + flat (yaw-only) basis at curve parameter u */
export function frameAt(u: number, out: Frame = makeFrame()) {
  const x = Math.min(Math.max(u, 0), 1) * N;
  const i = Math.min(Math.floor(x), N - 1);
  const f = x - i;
  const a = i * 3;
  const b = a + 3;
  out.pos.set(P[a] + (P[b] - P[a]) * f, P[a + 1] + (P[b + 1] - P[a + 1]) * f, P[a + 2] + (P[b + 2] - P[a + 2]) * f);
  out.fwd.set(T[a] + (T[b] - T[a]) * f, 0, T[a + 2] + (T[b + 2] - T[a + 2]) * f).normalize();
  out.right.crossVectors(out.fwd, WORLD_UP).normalize();
  out.up.copy(WORLD_UP);
  return out;
}

/** world point at (u, lateral, height) */
export function at(u: number, lateral = 0, height = 0, out = new THREE.Vector3()) {
  const f = frameAt(u, tmpFrame);
  return out.copy(f.pos).addScaledVector(f.right, lateral).addScaledVector(f.up, height);
}
const tmpFrame = makeFrame();

/** yaw (rotation.y) that makes local +Z face along the track at u */
export function yawAt(u: number) {
  const f = frameAt(u, tmpFrame);
  return Math.atan2(f.fwd.x, f.fwd.z);
}

/**
 * Ribbon geometry for the road: a top face plus two side skirts.
 * Attributes: uv.x across (0..1), uv.y along in world units, aU = curve u,
 * aSide = 0 top / 1 skirt.
 */
export function buildTrackGeometry(segments = 900, depth = 0.7) {
  const pos: number[] = [];
  const uv: number[] = [];
  const au: number[] = [];
  const side: number[] = [];
  const idx: number[] = [];
  const f = makeFrame();
  const hw = TRACK_W / 2;
  const L = new THREE.Vector3();
  const R = new THREE.Vector3();
  const strips: [number, number, number, number, number][] = [
    // [lateralA, heightA, lateralB, heightB, side]
    [-hw, 0, hw, 0, 0],
    [hw, 0, hw, -depth, 1],
    [-hw, -depth, -hw, 0, 1],
  ];
  for (const [la, ha, lb, hb, s] of strips) {
    const base = pos.length / 3;
    for (let i = 0; i <= segments; i++) {
      const u = i / segments;
      frameAt(u, f);
      L.copy(f.pos).addScaledVector(f.right, la).addScaledVector(f.up, ha);
      R.copy(f.pos).addScaledVector(f.right, lb).addScaledVector(f.up, hb);
      pos.push(L.x, L.y, L.z, R.x, R.y, R.z);
      uv.push(0, u * LEN, 1, u * LEN);
      au.push(u, u);
      side.push(s, s);
      if (i < segments) {
        const a = base + i * 2;
        idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
      }
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute("aU", new THREE.Float32BufferAttribute(au, 1));
  g.setAttribute("aSide", new THREE.Float32BufferAttribute(side, 1));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}
