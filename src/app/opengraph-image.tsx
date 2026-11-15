import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Code Relay 5.0: national student hackathon by WebnD, IIT Bhubaneswar. Web2 × Web3, ₹2.5 lakh+ prizes, registrations open on Unstop.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#15060b";
const CREAM = "#f6f0e8";
const CRIMSON = "#991b3d";
const SUN = "#f5b000";

/** The share card used by every page (WhatsApp, LinkedIn, X, Discord, Google). */
export default async function Image() {
  const dir = join(process.cwd(), "src/app/_og");
  const [unbounded, mono, grotesk, mascot, logo] = await Promise.all([
    readFile(join(dir, "unbounded-900.ttf")),
    readFile(join(dir, "jetbrains-700.ttf")),
    readFile(join(dir, "grotesk-500.ttf")),
    readFile(join(process.cwd(), "public/brand/webnd-mascot.png")),
    readFile(join(process.cwd(), "public/brand/cr-logo-128.png")),
  ]);
  const src = (b: Buffer) => `data:image/png;base64,${b.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: CREAM, color: INK, padding: "56px 64px", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src(logo)} width={52} height={52} alt="" />
            <span style={{ fontFamily: "Mono", fontSize: 20, letterSpacing: 4, opacity: 0.7 }}>WEBND · IIT BHUBANESWAR</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginTop: 34, fontFamily: "Unbounded", lineHeight: 0.9 }}>
            <span style={{ fontSize: 136 }}>CODE</span>
            <span style={{ fontSize: 136, color: CRIMSON }}>RELAY</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 30 }}>
            <span
              style={{ fontFamily: "Unbounded", fontSize: 34, background: CRIMSON, color: CREAM, borderRadius: 999, padding: "8px 26px", border: `4px solid ${INK}` }}
            >
              5.0
            </span>
            <span style={{ fontFamily: "Grotesk", fontSize: 30, whiteSpace: "nowrap" }}>National hackathon · Web2 × Web3</span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginTop: "auto" }}>
            {["2.5 LAKH+ PRIZES", "4 TRACKS", "30-HR FINALE", "ROUND 1 FREE"].map((t, i) => (
              <span
                key={t}
                style={{
                  fontFamily: "Mono",
                  fontSize: 16,
                  letterSpacing: 1.5,
                  padding: "9px 15px",
                  whiteSpace: "nowrap",
                  borderRadius: 999,
                  border: `3px solid ${INK}`,
                  background: i === 0 ? SUN : "transparent",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 360 }}>
          <div style={{ display: "flex", width: 330, height: 330, borderRadius: 999, background: CRIMSON, border: `5px solid ${INK}`, alignItems: "center", justifyContent: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src(mascot)} width={250} height={261} alt="" />
          </div>
          <span style={{ fontFamily: "Mono", fontSize: 20, letterSpacing: 3, marginTop: 26, background: INK, color: CREAM, padding: "10px 20px", borderRadius: 999 }}>
            REGISTRATIONS OPEN
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Unbounded", data: unbounded, weight: 900, style: "normal" },
        { name: "Mono", data: mono, weight: 700, style: "normal" },
        { name: "Grotesk", data: grotesk, weight: 500, style: "normal" },
      ],
    }
  );
}
