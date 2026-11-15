"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Marquee, Reveal } from "@/components/world/motion";
import { useLenis } from "@/components/world/SmoothScroll";
import { EVENT, ROUNDS } from "@/data/cr5";
import { PRIZES } from "@/data/eventData";
import RegisterLink from "@/components/world/RegisterLink";

/** Same destinations, same order as the navbar and the mobile menu. */
const EXPLORE = [
  { href: "/", label: "Home" },
  { href: "/event", label: "The Event" },
  { href: "/past-editions", label: "Past Editions" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/problem-statements", label: "PS Vault" },
];

const r1 = ROUNDS.find((r) => r.id === "r1")!;
const r2 = ROUNDS.find((r) => r.id === "r2")!;
const POOL = PRIZES[PRIZES.length - 1]?.amount ?? "";

/** the event at a glance, each figure in its own brand colour */
const FACTS = [
  { value: r1.when.replace(/\s*·\s*/, " "), label: "Round 01 · online", color: "var(--sun)" },
  { value: r2.when.replace(/\s*·\s*/, " "), label: `Finale · ${EVENT.institute}`, color: "var(--teal)" },
  { value: `${EVENT.hackHours} hours`, label: "of building on campus", color: "var(--blush)" },
  { value: POOL, label: "prize pool", color: "var(--crimson-hot)" },
];

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

      <div className="grid-bg-dark relative px-5 pb-8 pt-14 sm:px-10 sm:pt-20 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          {/* the closing call: a crimson stage with Webby cheering you on */}
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] border-2 border-[var(--cream)]/10 bg-[var(--crimson)] px-6 py-10 sm:px-12 sm:py-14">
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--crimson-hot)]/40 blur-3xl" />
              <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
                <div>
                  <p className="label text-[10px] text-[var(--sun)]">Ready to run?</p>
                  <h3 className="mt-4 font-display text-[clamp(36px,5vw,76px)] leading-[0.92]">
                    Grab the baton.
                    <br />
                    <span className="text-[var(--sun)]">Ship the future.</span>
                  </h3>
                  <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[var(--cream)]/80">
                    {EVENT.name} {EVENT.edition} by the {EVENT.org}, {EVENT.institute}. Round 01 is free, teams of {EVENT.teamSize}.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <RegisterLink className="btn-chunky !border-[var(--ink)] bg-[var(--sun)] text-[var(--ink)]">Register now ↗</RegisterLink>
                    <Link href="/sponsors" className="btn-chunky !border-[var(--cream)]/50 bg-transparent text-[var(--cream)] before:!bg-[var(--cream)] hover:!text-[var(--ink)]">
                      Partner with us
                    </Link>
                    <a href={EVENT.contact.discordUrl} target="_blank" rel="noreferrer" className="btn-ghost text-[var(--cream)]">
                      Join the Discord
                    </a>
                  </div>
                </div>

                <div className="relative mx-auto flex w-full max-w-[300px] flex-col items-center lg:max-w-[340px]">
                  <div className="relative mb-3 self-start rounded-2xl bg-[var(--cream)] px-4 py-2.5 font-display text-sm text-[var(--ink)] shadow-[4px_4px_0_var(--ink)] sm:text-base">
                    See you at the finish line!
                    <span className="absolute -bottom-2 left-10 h-4 w-4 rotate-45 bg-[var(--cream)]" />
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/brand/webnd-mascot-stand.webp" alt="Webby, the WebnD mascot" className="w-[min(70%,220px)] bob" />
                  <span className="label mt-2 text-[10px] text-[var(--cream)]/70">— Webby</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* at a glance */}
          <Reveal group stagger={0.06} className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {FACTS.map((f) => (
              <div key={f.label} className="rounded-2xl border border-[var(--cream)]/12 bg-[var(--cream)]/[0.03] px-5 py-5">
                <div className="font-display text-[clamp(18px,2vw,28px)] leading-tight" style={{ color: f.color }}>
                  {f.value}
                </div>
                <div className="label mt-2 text-[10px] text-[var(--cream)]/55">{f.label}</div>
              </div>
            ))}
          </Reveal>

          {/* links */}
          <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-[var(--cream)]/12 pt-12 sm:grid-cols-3">
            <Reveal>
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

            <Reveal delay={0.05}>
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
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="col-span-2 sm:col-span-1">
              <Heading>Follow the relay</Heading>
              <div className="flex flex-wrap gap-2">
                {[
                  { href: EVENT.contact.discordUrl, label: "Discord" },
                  { href: EVENT.contact.instagramUrl, label: EVENT.contact.instagram },
                  { href: EVENT.contact.webndInstagram, label: "@webnd.iitbbs" },
                  { href: EVENT.contact.linkedinUrl, label: "LinkedIn" },
                ].map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="label rounded-full border border-[var(--cream)]/25 px-3 py-1.5 text-[10px] text-[var(--cream)]/80 transition-colors duration-300 hover:border-[var(--cream)] hover:bg-[var(--cream)] hover:text-[var(--ink)]"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* wordmark: sized in container units, so it always spans the column exactly */}
          <div className="relative mt-20 select-none [container-type:inline-size] sm:mt-24" aria-hidden>
            <div className="flex justify-between font-display text-[12.6cqw] leading-[0.78]">
              {Array.from("CODE RELAY").map((c, i) =>
                c === " " ? (
                  <span key={i} className="w-[2cqw]" />
                ) : (
                  <span
                    key={i}
                    className={`inline-block transition-[transform,color] duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-[18%] hover:-rotate-6 hover:text-[var(--sun)] ${
                      i > 4 ? "text-[var(--crimson-hot)]" : "text-[var(--cream)]"
                    }`}
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
