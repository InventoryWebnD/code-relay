"use client";

import { Reveal, SplitText } from "./motion";

export default function SectionHead({
  label,
  title,
  sub,
  dark = false,
  align = "left",
  labelColor,
}: {
  label: string;
  title: string;
  sub?: string;
  dark?: boolean;
  align?: "left" | "center";
  labelColor?: string;
}) {
  const center = align === "center";
  return (
    <div className={`flex flex-col ${center ? "items-center text-center" : "items-start"} gap-5`}>
      <Reveal variant="pop">
        <span
          className={`label inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 ${
            dark ? "bg-[var(--cream)]/10 text-[var(--cream)] ring-1 ring-[var(--cream)]/30" : "glass ring-1 ring-[var(--ink)]/15"
          }`}
          style={labelColor ? { background: labelColor, color: "var(--ink)" } : undefined}
        >
          <span className="h-2 w-2 rounded-full bg-[var(--crimson)] pulse-dot" />
          {label}
        </span>
      </Reveal>
      <SplitText
        text={title}
        className={`font-display text-[clamp(40px,7vw,112px)] ${dark ? "text-[var(--cream)]" : "text-[var(--ink)]"}`}
      />
      {sub && (
        <Reveal delay={0.15}>
          <p
            className={`max-w-2xl text-base sm:text-lg leading-relaxed ${
              dark ? "text-[var(--cream)]/75" : "text-[var(--ink)]/75"
            } ${center ? "mx-auto" : ""}`}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
