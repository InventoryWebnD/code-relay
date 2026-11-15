"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Marquee, Reveal } from "@/components/world/motion";
import { useLenis } from "@/components/world/SmoothScroll";
import { EVENT, ROUNDS } from "@/data/cr5";

/** Same destinations, same order as the navbar and the mobile menu. */
const EXPLORE = [
  { href: "/", label: "Home" },
  { href: "/event", label: "The Event" },
  { href: "/past-editions", label: "Past Editions" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/problem-statements", label: "PS Vault" },
  { href: "/register", label: "Register" },
];

const r1 = ROUNDS.find((r) => r.id === "r1")!;
const r2 = ROUNDS.find((r) => r.id === "r2")!;

function Heading({ children }: { children: React.ReactNode }) {
  return <p className="label mb-5 text-[10px] text-[var(--cream)]/45">{children}</p>;
}

const linkCls =
  "relative inline-block text-[15px] text-[var(--cream)]/80 transition-colors duration-300 hover:text-[var(--cream)] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:origin-left hover:after:scale-x-100";

export default function Footer() {
  const pathname = usePathname();
  const lenis = useLenis();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const toTop = () => (lenis ? lenis.scrollTo(0, { duration: 1.4 }) : window.scrollTo({ top: 0, behavior: "smooth" }));

  return (
    <footer className="relative mt-auto overflow-hidden bg-[var(--ink)] text-[var(--cream)]">
      <div className="border-y-2 border-[var(--ink)] bg-[var(--sun)] py-2.5 text-[var(--ink)]">
        <Marquee speed={26}>
          {["Sprint to innovation", "Pass the baton", `${EVENT.hackHours} hours`, "Web2 × Web3", EVENT.institute, `Edition ${EVENT.edition}`].map((t) => (
            <span key={t} className="mx-5 flex items-center gap-5 font-display text-base sm:text-lg">
              {t}
              <span className="inline-block h-2.5 w-2.5 rotate-45 bg-[var(--ink)]" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="grid-bg-dark relative px-5 pb-8 pt-16 sm:px-10 sm:pt-20 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            {/* closing call */}
            <Reveal className="lg:col-span-5">
              <p className="label text-[10px] text-[var(--sun)]">Ready to run?</p>
              <h3 className="mt-4 font-display text-[clamp(34px,4.4vw,64px)] leading-[0.95]">
                Grab the baton.
                <br />
                <span className="text-[var(--sun)]">Ship the future.</span>
              </h3>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[var(--cream)]/65">
                {EVENT.name} {EVENT.edition} by the {EVENT.org}, {EVENT.institute}. Free to enter, teams of {EVENT.teamSize}.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/register" className="btn-chunky border-[var(--crimson)] bg-[var(--crimson)] text-[var(--cream)]">
                  Register now ↗
                </Link>
                <Link href="/sponsors" className="btn-chunky !border-[var(--cream)]/35 bg-transparent text-[var(--cream)] before:!bg-[var(--cream)] hover:!text-[var(--ink)]">
                  Partner with us
                </Link>
              </div>
            </Reveal>

            {/* link columns */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:col-span-7 lg:pl-10">
              <Reveal delay={0.05}>
                <Heading>Explore</Heading>
                <ul className="space-y-3">
                  {EXPLORE.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} aria-current={isActive(l.href) ? "page" : undefined} className={`${linkCls} ${isActive(l.href) ? "!text-[var(--sun)]" : ""}`}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.1}>
                <Heading>The event</Heading>
                <ul className="space-y-4 text-[15px]">
                  <li>
                    <span className="block text-[var(--cream)]/80">{r1.label} · Online</span>
                    <span className="label text-[10px] text-[var(--cream)]/45">{r1.when}</span>
                  </li>
                  <li>
                    <span className="block text-[var(--cream)]/80">Finale · {EVENT.hackHours} hours</span>
                    <span className="label text-[10px] text-[var(--cream)]/45">{r2.when}</span>
                  </li>
                  <li className="space-y-3 pt-1">
                    <a href={EVENT.brochures.sponsorship} target="_blank" rel="noreferrer" className={linkCls}>
                      Sponsorship brochure&nbsp;↗
                    </a>
                    <br />
                    <a href={EVENT.brochures.food} target="_blank" rel="noreferrer" className={linkCls}>
                      F&amp;B brochure&nbsp;↗
                    </a>
                  </li>
                </ul>
              </Reveal>

              <Reveal delay={0.15} className="col-span-2 sm:col-span-1">
                <Heading>Contact</Heading>
                <ul className="space-y-3 text-[15px]">
                  <li className="text-[var(--cream)]/80">{EVENT.contact.name}</li>
                  <li>
                    <a href={`mailto:${EVENT.contact.email}`} className={`${linkCls} break-all`}>
                      {EVENT.contact.email}
                    </a>
                  </li>
                  <li>
                    <a href={EVENT.contact.phoneHref} className={linkCls}>
                      {EVENT.contact.phone}
                    </a>
                  </li>
                  <li className="flex flex-wrap gap-2 pt-2">
                    {[
                      { href: EVENT.contact.instagramUrl, label: "Instagram" },
                      { href: EVENT.contact.linkedinUrl, label: "LinkedIn" },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="label rounded-full border border-[var(--cream)]/25 px-3 py-1.5 text-[10px] text-[var(--cream)]/80 transition-colors duration-300 hover:border-[var(--cream)] hover:bg-[var(--cream)] hover:text-[var(--ink)]"
                      >
                        {s.label}
                      </a>
                    ))}
                  </li>
                </ul>
              </Reveal>
            </div>
          </div>

          {/* wordmark: sized in container units, so it always spans the column exactly */}
          <div className="relative mt-20 select-none [container-type:inline-size] sm:mt-24" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/webnd-mascot-stand.webp"
              alt=""
              className="pointer-events-none absolute bottom-[calc(100%-2cqw)] right-[1cqw] w-[11cqw] min-w-[56px] bob"
            />
            <div className="flex justify-between font-display text-[12.6cqw] leading-[0.78] text-[var(--cream)]">
              {Array.from("CODE RELAY").map((c, i) =>
                c === " " ? (
                  <span key={i} className="w-[2cqw]" />
                ) : (
                  <span
                    key={i}
                    className="inline-block transition-[transform,color] duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-[18%] hover:-rotate-6 hover:text-[var(--crimson-hot)]"
                  >
                    {c}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-5 border-t border-[var(--cream)]/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/webnd-mark.png" alt="WebnD" className="h-5 w-auto opacity-80" />
              <p className="label text-[10px] text-[var(--cream)]/50">
                © 2026 {EVENT.org} · {EVENT.institute}
              </p>
            </div>
            <button
              type="button"
              onClick={toTop}
              className="label group inline-flex items-center gap-2 self-start text-[10px] text-[var(--cream)]/60 transition-colors hover:text-[var(--cream)] sm:self-auto"
            >
              Back to top
              <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
