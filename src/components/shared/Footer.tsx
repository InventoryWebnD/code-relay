"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Marquee, Reveal } from "@/components/world/motion";
import { EVENT } from "@/data/cr5";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/event", label: "The Event" },
  { href: "/past-editions", label: "Past Editions" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/problem-statements", label: "PS Vault" },
  { href: "/register", label: "Register" },
];

export default function Footer() {
  const pathname = usePathname();
  const word = "CODE RELAY";

  return (
    <footer className="relative mt-auto overflow-hidden border-t-[3px] border-[var(--ink)] bg-[var(--ink)] text-[var(--cream)]">
      <div className="border-b-[3px] border-[var(--ink)] bg-[var(--sun)] py-3 text-[var(--ink)]">
        <Marquee speed={22}>
          {["Sprint to innovation", "Pass the baton", "30 hours", "Web2 × Web3", "IIT Bhubaneswar", "Edition 5.0"].map((t) => (
            <span key={t} className="mx-6 flex items-center gap-6 font-display text-xl sm:text-2xl">
              {t}
              <span className="inline-block h-4 w-4 rotate-45 bg-[var(--ink)]" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="grid-bg-dark relative px-5 sm:px-10 lg:px-16 pt-16 sm:pt-24 pb-8">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-6">
              <p className="label text-[var(--sun)]">Ready to run?</p>
              <h3 className="mt-4 font-display text-[clamp(36px,5.5vw,84px)]">
                Grab the baton.
                <br />
                <span className="text-outline-cream">Ship the future.</span>
              </h3>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/register" className="btn-chunky bg-[var(--crimson)] text-[var(--cream)] border-[var(--cream)]" data-cursor="Go!">
                  Register now ↗
                </Link>
                <Link href="/sponsors" className="btn-chunky bg-[var(--cream)] text-[var(--ink)]">
                  Partner with us
                </Link>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-3" delay={0.1}>
              <p className="label text-[var(--teal)] mb-4">Explore</p>
              <ul className="space-y-2">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={`group inline-flex items-center gap-2 text-lg font-bold ${pathname === l.href ? "text-[var(--sun)]" : ""}`}
                    >
                      <span className="inline-block w-0 overflow-hidden transition-all duration-300 group-hover:w-5">→</span>
                      <span className="transition-colors group-hover:text-[var(--blush)]">{l.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="lg:col-span-3" delay={0.2}>
              <p className="label text-[var(--teal)] mb-4">Talk to us</p>
              <ul className="space-y-3 text-[15px]">
                <li>
                  <span className="block label text-[var(--cream)]/50">Contact</span>
                  {EVENT.contact.name}
                </li>
                <li>
                  <a href={`mailto:${EVENT.contact.email}`} className="underline decoration-[var(--crimson-hot)] decoration-2 underline-offset-4 hover:text-[var(--blush)] break-all">
                    {EVENT.contact.email}
                  </a>
                </li>
                <li>
                  <a href={EVENT.contact.phoneHref} className="hover:text-[var(--blush)]">
                    {EVENT.contact.phone}
                  </a>
                </li>
                <li className="flex flex-wrap gap-2 pt-1">
                  <a href={EVENT.contact.instagramUrl} target="_blank" rel="noreferrer" className="label rounded-full border-2 border-[var(--cream)] px-3 py-1.5 hover:bg-[var(--cream)] hover:text-[var(--ink)] transition-colors">
                    {EVENT.contact.instagram}
                  </a>
                  <a href={EVENT.contact.linkedinUrl} target="_blank" rel="noreferrer" className="label rounded-full border-2 border-[var(--cream)] px-3 py-1.5 hover:bg-[var(--cream)] hover:text-[var(--ink)] transition-colors">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>

          {/* giant interactive wordmark */}
          <div className="relative mt-20 sm:mt-28 select-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/webnd-mascot-stand.webp"
              alt="WebnD mascot"
              className="pointer-events-none absolute -top-[18%] right-[3%] w-[clamp(70px,11vw,170px)] -rotate-6 bob"
            />
            <div className="flex justify-between font-display text-[clamp(52px,14.2vw,250px)] leading-[0.8]" aria-label={word}>
              {Array.from(word).map((c, i) => (
                <span
                  key={i}
                  className="inline-block transition-[transform,color] duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-[18%] hover:-rotate-6 hover:text-[var(--crimson-hot)]"
                  aria-hidden
                >
                  {c === " " ? " " : c}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-4 border-t-2 border-[var(--cream)]/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="label text-[var(--cream)]/60">
              © 2026 {EVENT.org} · {EVENT.institute}
            </p>
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/webnd-mark.png" alt="WebnD" className="h-6 w-auto" />
              <span className="label text-[var(--cream)]/60">Built by WebnD with way too much caffeine</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
