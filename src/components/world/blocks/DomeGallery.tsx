"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import SectionHead from "@/components/world/SectionHead";
import { prefersReduced } from "@/components/world/motion";
import { GALLERY, GalleryItem } from "@/data/cr5";
import { useLenis } from "@/components/world/SmoothScroll";

const COLS = 14;
const ROWS = [-26, 0, 26];

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
      <img src="/brand/cr-mascot.png" alt="" draggable={false} className="h-[45%] w-auto opacity-90" />
      <span className="label text-[9px] text-[var(--cream)]/80">Photo slot</span>
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
  const rot = useRef({ x: -4, y: 0, vx: 0, vy: 0 });
  const [radius, setRadius] = useState(720);
  const [open, setOpen] = useState<GalleryItem | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const tiles = useMemo(() => {
    const out: { item: GalleryItem; ry: number; rx: number; key: string }[] = [];
    let n = 0;
    ROWS.forEach((rx, ri) => {
      for (let c = 0; c < COLS; c++) {
        const offset = ri % 2 ? 360 / COLS / 2 : 0;
        out.push({ item: items[n % items.length], ry: (c * 360) / COLS + offset, rx, key: `${ri}-${c}` });
        n++;
      }
    });
    return out;
  }, [items]);

  useEffect(() => {
    const upd = () => setRadius(Math.max(420, Math.min(820, window.innerWidth * 0.55)));
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
    let visible = true;

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(st);

    const loop = () => {
      const r = rot.current;
      if (!dragging) {
        r.vy *= 0.94;
        r.vx *= 0.9;
        r.y += r.vy + (reduced ? 0 : 0.04);
        r.x += r.vx;
        r.x += (-4 - r.x) * 0.02;
      }
      r.x = Math.max(-14, Math.min(14, r.x));
      if (visible) {
        sp.style.transform = `translateZ(${radius}px) rotateX(${r.x}deg) rotateY(${r.y}deg)`;
        // cull tiles that swing behind the viewer
        const els = sp.children as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < els.length; i++) {
          const a = ((((tiles[i].ry + r.y) % 360) + 540) % 360) - 180;
          const show = Math.abs(a) < 88;
          if (els[i].dataset.on !== String(show)) {
            els[i].dataset.on = String(show);
            els[i].style.visibility = show ? "visible" : "hidden";
          }
        }
      }
      raf = requestAnimationFrame(loop);
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
      rot.current.y -= dx * 0.12;
      rot.current.x += dy * 0.08;
      rot.current.vy = -dx * 0.12;
      rot.current.vx = dy * 0.05;
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
    if (b) gsap.fromTo(b, { scale: 0.5, rotate: -10, opacity: 0 }, { scale: 1, rotate: -2, opacity: 1, duration: 0.6, ease: "back.out(1.7)" });
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", esc);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", esc);
    };
  }, [open, lenis]);

  const tileW = (2 * Math.PI * radius) / COLS - 18;
  const tileH = tileW * 0.72;

  return (
    <section data-world="scatter" className="relative overflow-hidden rounded-t-[48px] bg-[var(--navy)] py-24 sm:py-28 text-[var(--cream)]">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10 lg:px-16">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHead dark label={label} title={title} />
          <p className="label max-w-xs text-[var(--cream)]/70">Drag to spin the dome · Click a photo to open it</p>
        </div>
      </div>

      <div
        ref={stage}
        className="relative mt-10 h-[min(78vh,720px)] w-full cursor-grab touch-pan-y select-none active:cursor-grabbing"
        style={{ perspective: `${radius * 1.15}px` }}
        data-cursor="Drag"
      >
        <div className="absolute left-1/2 top-1/2 h-0 w-0">
          <div ref={sphere} className="preserve-3d absolute left-0 top-0" style={{ transform: `translateZ(${radius}px)` }}>
            {tiles.map((t, i) => (
              <div
                key={t.key}
                data-tile={i}
                className="backface-hidden absolute overflow-hidden rounded-[28px] bg-[var(--ink)] ring-1 ring-white/10 transition-[filter] duration-300 hover:brightness-110"
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
        {/* edge vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,var(--navy)_88%)]" />
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
