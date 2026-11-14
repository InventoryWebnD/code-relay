/**
 * Cube-world formations. Every formation places the same N cubes somewhere
 * new; the world morphs between them as you scroll through sections that
 * declare `data-world="<formation>"`.
 */
export const N = 216; // 6 × 6 × 6

export type FormationName =
  | "cube"
  | "scatter"
  | "towers"
  | "path"
  | "podium"
  | "ring"
  | "helix"
  | "stairs"
  | "cr"
  | "floor";

export type Formation = {
  pos: Float32Array; // xyz
  rot: Float32Array; // euler xyz
  scale: Float32Array;
  color: string[];
  /** radians / second around Y for the whole formation */
  spin: number;
  /** per-cube tumble speed multiplier */
  tumble: number;
  camera: { pos: [number, number, number]; look: [number, number, number] };
};

export const C = {
  ink: "#15060B",
  cream: "#F6F0E8",
  paper: "#FFFBF5",
  crimson: "#991B3D",
  crimsonHot: "#C2264F",
  wine: "#620821",
  navy: "#0B1B4D",
  navySoft: "#24398A",
  teal: "#5AA7A7",
  sun: "#F5B000",
  blush: "#F2B8C6",
};

export function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(r: () => number, weighted: [T, number][]) {
  const total = weighted.reduce((a, [, w]) => a + w, 0);
  let x = r() * total;
  for (const [v, w] of weighted) {
    if ((x -= w) <= 0) return v;
  }
  return weighted[0][0];
}

const BRAND_MIX: [string, number][] = [
  [C.crimson, 34],
  [C.cream, 26],
  [C.navy, 20],
  [C.wine, 10],
  [C.sun, 6],
  [C.teal, 4],
];

function blank(): Formation {
  return {
    pos: new Float32Array(N * 3),
    rot: new Float32Array(N * 3),
    scale: new Float32Array(N),
    color: new Array(N).fill(C.cream),
    spin: 0,
    tumble: 0,
    camera: { pos: [0, 0, 16], look: [0, 0, 0] },
  };
}

/** leftover cubes become small floating confetti around the formation */
function confetti(f: Formation, from: number, r: () => number, spread = [16, 9, 10], zBias = -4) {
  for (let i = from; i < N; i++) {
    f.pos[i * 3] = (r() - 0.5) * spread[0] * 2;
    f.pos[i * 3 + 1] = (r() - 0.5) * spread[1] * 2;
    f.pos[i * 3 + 2] = (r() - 0.5) * spread[2] * 2 + zBias;
    f.rot[i * 3] = r() * 6;
    f.rot[i * 3 + 1] = r() * 6;
    f.scale[i] = 0.18 + r() * 0.3;
    f.color[i] = pick(r, BRAND_MIX);
  }
}

const builders: Record<FormationName, () => Formation> = {
  cube() {
    const f = blank();
    const r = rng(7);
    let i = 0;
    for (let x = 0; x < 6; x++)
      for (let y = 0; y < 6; y++)
        for (let z = 0; z < 6; z++) {
          f.pos.set([(x - 2.5) * 1.02, (y - 2.5) * 1.02, (z - 2.5) * 1.02], i * 3);
          f.scale[i] = 0.98;
          f.color[i] = pick(r, BRAND_MIX);
          i++;
        }
    f.spin = 0.18;
    f.camera = { pos: [0, 4.2, 17], look: [0, 0, 0] };
    return f;
  },

  scatter() {
    const f = blank();
    const r = rng(11);
    for (let i = 0; i < N; i++) {
      // keep a clear reading column in the middle of the screen
      const side = i % 3 ? 1 : -1;
      const x = side > 0 ? 3.5 + r() * 17 : -(14 + r() * 9);
      f.pos.set([x, (r() - 0.5) * 18, -4 - r() * 22], i * 3);
      f.rot.set([r() * 6, r() * 6, r() * 6], i * 3);
      f.scale[i] = 0.3 + r() * 1.1;
      f.color[i] = pick(r, BRAND_MIX);
    }
    f.spin = 0.04;
    f.tumble = 0.4;
    f.camera = { pos: [0, 0, 12], look: [0, 0, -10] };
    return f;
  },

  towers() {
    const f = blank();
    const r = rng(23);
    let i = 0;
    for (const side of [-1, 1]) {
      for (let h = 0; h < 12; h++)
        for (let a = 0; a < 3; a++)
          for (let b = 0; b < 3; b++) {
            const twist = h * 0.12 * side;
            const lx = (a - 1) * 1.02;
            const lz = (b - 1) * 1.02;
            const x = lx * Math.cos(twist) - lz * Math.sin(twist);
            const z = lx * Math.sin(twist) + lz * Math.cos(twist);
            f.pos.set([side * 10.5 + x, (h - 5.5) * 1.02, z - 4], i * 3);
            f.rot[i * 3 + 1] = twist;
            f.scale[i] = 0.98;
            f.color[i] =
              side < 0
                ? pick(r, [[C.crimson, 6], [C.wine, 3], [C.cream, 2], [C.blush, 1]])
                : pick(r, [[C.navy, 6], [C.navySoft, 3], [C.cream, 2], [C.teal, 1]]);
            i++;
          }
    }
    f.camera = { pos: [0, 1, 20], look: [0, 0, -4] };
    return f;
  },

  path() {
    const f = blank();
    const r = rng(31);
    let i = 0;
    for (let k = 0; k < 64; k++) {
      const t = k * 0.55;
      const x = Math.sin(t * 0.35) * 5;
      const z = 6 - t * 1.6;
      const y = -3.2 + Math.floor(k / 8) * 0.5;
      for (const w of [-0.55, 0.55]) {
        if (i >= 128) break;
        f.pos.set([x + w, y, z], i * 3);
        f.scale[i] = 1;
        f.color[i] = k % 2 === 0 ? C.crimson : C.cream;
        i++;
      }
    }
    confetti(f, i, r, [18, 8, 18], -12);
    f.camera = { pos: [0, 2.6, 12], look: [0, -1, -10] };
    return f;
  },

  podium() {
    const f = blank();
    const r = rng(41);
    let i = 0;
    const blocks: [number, number, string][] = [
      [0, 6, C.sun],
      [-4.2, 4, C.cream],
      [4.2, 3, C.crimsonHot],
    ];
    for (const [cx, h, col] of blocks) {
      for (let y = 0; y < h; y++)
        for (let a = 0; a < 4; a++)
          for (let b = 0; b < 4; b++) {
            if (i >= N) break;
            f.pos.set([cx + (a - 1.5) * 1.02, -5 + y * 1.02, (b - 1.5) * 1.02 - 2], i * 3);
            f.scale[i] = 0.98;
            f.color[i] = y === h - 1 ? col : pick(r, [[C.wine, 2], [C.crimson, 3], [C.navy, 1]]);
            i++;
          }
    }
    confetti(f, i, r, [14, 8, 8], -3);
    for (let k = i; k < N; k++) f.pos[k * 3 + 1] = Math.abs(f.pos[k * 3 + 1]) + 1;
    f.tumble = 0.6;
    f.camera = { pos: [0, 2.5, 20], look: [0, -1.5, -2] };
    return f;
  },

  ring() {
    const f = blank();
    const r = rng(53);
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2 * 3;
      const lane = i % 3;
      const rad = 8 + lane * 1.2;
      f.pos.set([Math.cos(a / 3 + lane) * rad, Math.sin(a * 2) * 0.6 + (lane - 1) * 0.9, Math.sin(a / 3 + lane) * rad - 3], i * 3);
      f.rot.set([r() * 6, r() * 6, 0], i * 3);
      f.scale[i] = 0.45 + r() * 0.4;
      f.color[i] = pick(r, BRAND_MIX);
    }
    f.spin = 0.12;
    f.tumble = 0.5;
    f.camera = { pos: [0, 7, 17], look: [0, 0, -3] };
    return f;
  },

  helix() {
    const f = blank();
    const r = rng(61);
    for (let i = 0; i < N; i++) {
      const strand = i % 2;
      const t = Math.floor(i / 2) * 0.22;
      const a = t * 1.3 + strand * Math.PI;
      f.pos.set([Math.cos(a) * 3.2, (t - 11.8) * 0.85, Math.sin(a) * 3.2 - 2], i * 3);
      f.rot[i * 3 + 1] = -a;
      f.scale[i] = 0.7;
      f.color[i] = strand ? pick(r, [[C.crimson, 3], [C.blush, 1]]) : pick(r, [[C.navy, 3], [C.teal, 1]]);
    }
    f.spin = 0.25;
    f.camera = { pos: [0, 0, 19], look: [0, 0, -2] };
    return f;
  },

  stairs() {
    const f = blank();
    const r = rng(71);
    let i = 0;
    for (let s = 0; s < 12 && i < N; s++)
      for (let w = 0; w < 4 && i < N; w++)
        for (let h = 0; h <= s % 6 && i < N; h++) {
          f.pos.set([(s - 5.5) * 1.3, -5 + h * 1.02 + Math.floor(s / 6) * 0, (w - 1.5) * 1.02 - 3 - Math.floor(s / 6) * 0], i * 3);
          f.scale[i] = 0.98;
          f.color[i] = h === s % 6 ? (s % 2 ? C.sun : C.teal) : pick(r, [[C.cream, 3], [C.crimson, 2], [C.navy, 1]]);
          i++;
        }
    confetti(f, i, r, [14, 6, 6], -4);
    f.camera = { pos: [0, 3, 19], look: [0, -1.5, -3] };
    return f;
  },

  cr() {
    const f = blank();
    const r = rng(83);
    const glyphC = [".###.", "#...#", "#....", "#....", "#....", "#...#", ".###."];
    const glyphR = ["####.", "#...#", "#...#", "####.", "#.#..", "#..#.", "#...#"];
    let i = 0;
    const put = (g: string[], ox: number, col: string, side: string) => {
      g.forEach((row, y) =>
        Array.from(row).forEach((ch, x) => {
          if (ch !== "#") return;
          for (let d = 0; d < 3 && i < N; d++) {
            f.pos.set([ox + x * 1.02, (3 - y) * 1.02, -d * 1.02], i * 3);
            f.scale[i] = 0.98;
            f.color[i] = d === 0 ? col : side;
            i++;
          }
        })
      );
    };
    put(glyphC, -5.6, C.crimson, C.wine);
    put(glyphR, 0.6, C.navy, C.navySoft);
    confetti(f, i, r, [15, 8, 6], -5);
    f.spin = 0;
    f.tumble = 0.5;
    f.camera = { pos: [0, 0, 19], look: [0, 0, -1] };
    return f;
  },

  floor() {
    const f = blank();
    let i = 0;
    for (let x = 0; x < 18; x++)
      for (let z = 0; z < 12; z++) {
        if (i >= N) break;
        f.pos.set([(x - 8.5) * 1.6, -6, -z * 1.6 + 2], i * 3);
        f.scale[i] = 1.2;
        f.color[i] = (x + z) % 2 ? C.cream : C.blush;
        i++;
      }
    f.camera = { pos: [0, 3, 14], look: [0, -2, -8] };
    return f;
  },
};

const cache = new Map<FormationName, Formation>();
export function formation(name: FormationName): Formation {
  let f = cache.get(name);
  if (!f) {
    f = (builders[name] ?? builders.scatter)();
    cache.set(name, f);
  }
  return f;
}

export const FORMATION_NAMES = Object.keys(builders) as FormationName[];
