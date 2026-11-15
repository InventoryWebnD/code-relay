"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import SectionHead from "@/components/world/SectionHead";
import { prefersReduced } from "@/components/world/motion";
import { GALLERY, GalleryItem } from "@/data/cr5";
import { useLenis } from "@/components/world/SmoothScroll";

/* Dome geometry (large screens). Tiles are sized first, then rows are spaced
   from the tile height so neighbouring rows can never intersect. */
const COLS = 12;
const ROW_COUNT = 3;
const MAX_TILE_W = 290;
const TILE_ASPECT = 0.68;
const GAP_X = 36; // min horizontal breathing room between tiles (px, at the front)
const GAP_Y = 44; // vertical breathing room between rows (px, at the front)
const CULL = 72; // degrees from the front beyond which tiles are hidden (they warp at the edges)

function Tile({ item, fit = "cover" }: { item: GalleryItem; fit?: "cover" | "contain" }) {
  if (item.src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={item.src}
        alt={item.caption}
        draggable={false}
        decoding="async"
        className={`h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
      />
    );
  }
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 p-3 text-center" style={{ background: item.tone }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/webnd-mascot-stand.webp" alt="" draggable={false} className="h-[45%] w-auto opacity-90" />
      <span className="label text-[9px] text-[var(--cream)]/80">Photo slot</span>
    </div>
  );
}

/** Phones + tablets: a masonry wall at each photo's natural shape — nothing cropped, nothing warped. */
function PhotoWall({ items, onOpen }: { items: GalleryItem[]; onOpen: (item: GalleryItem) => void }) {
  return (
    <div className="mx-auto mt-10 max-w-[1500px] columns-2 gap-3 px-5 sm:columns-3 sm:gap-4 sm:px-10 lg:hidden">
      {items.map((item, i) => (
        <button
          key={`${item.src ?? item.caption}-${i}`}
          type="button"
          onClick={() => onOpen(item)}
          className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-[var(--ink)] text-left ring-1 ring-white/10 sm:mb-4"
        >
          {item.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.src}
              alt={item.caption}
              width={item.w}
              height={item.h}
              loading="lazy"
              decoding="async"
              style={item.w && item.h ? { aspectRatio: `${item.w} / ${item.h}` } : undefined}
              className="block h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.03]"
            />
          ) : (
            <div className="aspect-[4/3]">
              <Tile item={item} />
            </div>
          )}
          <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#06102e]/80 to-transparent px-3 pb-2 pt-6">
            <span className="block truncate text-[11px] font-medium text-[var(--cream)]/90">{item.caption}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

export default function DomeGallery({
  items = GALLERY,
  title = "Scenes from\nthe relay",
  label = "Gallery",
}: {
  items?: GalleryItem[];
  title?: string;
  label?: string;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const sphere = useRef<HTMLDivElement>(null);
  const rot = useRef({ x: -2, y: 0, vx: 0, vy: 0 });
  const [radius, setRadius] = useState(720);
  const [open, setOpen] = useState<GalleryItem | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const tileW = Math.min(MAX_TILE_W, (2 * Math.PI * radius) / COLS - GAP_X);
  const tileH = tileW * TILE_ASPECT;
  const rowStep = ((tileH + GAP_Y) / radius) * (180 / Math.PI);
  const stageH = ROW_COUNT * tileH + (ROW_COUNT - 1) * GAP_Y + 150;

  const tiles = useMemo(() => {
    const out: { item: GalleryItem; ry: number; rx: number; key: string }[] = [];
    let n = 0;
    for (let ri = 0; ri < ROW_COUNT; ri++) {
      const rx = (ri - (ROW_COUNT - 1) / 2) * rowStep;
      for (let c = 0; c < COLS; c++) {
        const offset = ri % 2 ? 360 / COLS / 2 : 0;
        out.push({ item: items[n % items.length], ry: (c * 360) / COLS + offset, rx, key: `${ri}-${c}` });
        n++;
      }
    }
    return out;
  }, [items, rowStep]);

  useEffect(() => {
    const upd = () => setRadius(Math.max(560, Math.min(900, window.innerWidth * 0.5)));
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  /* drag + inertia + idle drift */
  useEffect(() => {
    const st = stage.current;
    const sp = sphere.current;
    if (!st || !sp) return;
    const reduced = prefersReduced();
    let raf = 0;
    let dragging = false;
    let moved = 0;
    let lx = 0;
    let ly = 0;
    let visible = false;

    // also false while the dome is display:none (phones), so the loop idles there
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(st);

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const r = rot.current;
      if (!dragging) {
        r.vy *= 0.94;
        r.vx *= 0.9;
        r.y += r.vy + (reduced ? 0 : 0.035);
        r.x += r.vx;
        r.x += (-2 - r.x) * 0.03;
      }
      r.x = Math.max(-6, Math.min(6, r.x));
      sp.style.transform = `translateZ(${radius}px) rotateX(${r.x}deg) rotateY(${r.y}deg)`;
      // hide tiles that swing toward the edges, where perspective warps them
      const els = sp.children as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < els.length; i++) {
        const a = ((((tiles[i].ry + r.y) % 360) + 540) % 360) - 180;
        const show = Math.abs(a) < CULL;
        if (els[i].dataset.on !== String(show)) {
          els[i].dataset.on = String(show);
          els[i].style.visibility = show ? "visible" : "hidden";
        }
      }
    };
    raf = requestAnimationFrame(loop);

    const down = (e: PointerEvent) => {
      dragging = true;
      moved = 0;
      lx = e.clientX;
      ly = e.clientY;
      st.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lx;
      const dy = e.clientY - ly;
      lx = e.clientX;
      ly = e.clientY;
      moved += Math.abs(dx) + Math.abs(dy);
      rot.current.y -= dx * 0.1;
      rot.current.x += dy * 0.04;
      rot.current.vy = -dx * 0.1;
      rot.current.vx = dy * 0.03;
    };
    const up = (e: PointerEvent) => {
      dragging = false;
      if (moved < 6) {
        const el = document.elementFromPoint(e.clientX, e.clientY)?.closest<HTMLElement>("[data-tile]");
        if (el) {
          const idx = Number(el.dataset.tile);
          setOpen(tiles[idx].item);
        }
      }
    };
    st.addEventListener("pointerdown", down);
    st.addEventListener("pointermove", move);
    st.addEventListener("pointerup", up);
    st.addEventListener("pointercancel", () => (dragging = false));
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      st.removeEventListener("pointerdown", down);
      st.removeEventListener("pointermove", move);
      st.removeEventListener("pointerup", up);
    };
  }, [radius, tiles]);

  /* lightbox animation */
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const b = box.current;
    if (b) gsap.fromTo(b, { scale: 0.92, y: 16, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", esc);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", esc);
    };
  }, [open, lenis]);

  return (
    <section data-world="scatter" className="relative overflow-hidden rounded-t-[48px] bg-[var(--navy)] py-24 sm:py-28 text-[var(--cream)]">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10 lg:px-16">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHead dark label={label} title={title} />
          <p className="label max-w-xs text-[var(--cream)]/70">
            <span className="lg:hidden">Tap a photo to open it</span>
            <span className="hidden lg:inline">Drag to spin the dome · Click a photo to open it</span>
          </p>
        </div>
      </div>

      <PhotoWall items={items} onOpen={setOpen} />

      {/* the dome: large screens only, clipped so it never rides over the heading */}
      <div
        ref={stage}
        className="relative mt-16 hidden w-full cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing lg:block"
        style={{ height: stageH, perspective: `${radius * 2}px` }}
        data-cursor="Drag"
      >
        <div className="absolute left-1/2 top-1/2 h-0 w-0">
          <div ref={sphere} className="preserve-3d absolute left-0 top-0" style={{ transform: `translateZ(${radius}px)` }}>
            {tiles.map((t, i) => (
              <div
                key={t.key}
                data-tile={i}
                className="backface-hidden absolute overflow-hidden rounded-[22px] bg-[var(--ink)] shadow-[0_18px_50px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-[filter] duration-300 hover:brightness-110"
                style={{
                  width: tileW,
                  height: tileH,
                  left: -tileW / 2,
                  top: -tileH / 2,
                  transform: `rotateY(${t.ry}deg) rotateX(${t.rx}deg) translateZ(${-radius}px)`,
                }}
              >
                <Tile item={t.item} />
              </div>
            ))}
          </div>
        </div>
        {/* soft fade at the sides only, so top and bottom rows stay fully lit */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--navy)_0%,transparent_16%,transparent_84%,var(--navy)_100%)]" />
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[180] grid place-items-center bg-[var(--ink)]/80 p-5 backdrop-blur-sm"
          onClick={() => setOpen(null)}
          data-cursor="Close"
        >
          <div ref={box} className="w-full max-w-3xl overflow-hidden rounded-[32px] bg-[var(--paper)] text-[var(--ink)]" onClick={(e) => e.stopPropagation()}>
            {/* the whole photo, letterboxed: portrait shots (banners) must not be cropped */}
            <div className="aspect-[16/10] max-h-[70vh] w-full overflow-hidden bg-[var(--ink)]">
              <Tile item={open} fit="contain" />
            </div>
            <div className="flex items-center justify-between gap-4 p-5">
              <span className="font-display text-lg !normal-case">{open.caption}</span>
              <button onClick={() => setOpen(null)} className="btn-chunky bg-[var(--sun)] !py-2 !px-4 text-[var(--ink)]">
                Close ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
