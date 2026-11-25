import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { candidate, slogans } from "@/config/site";
import { resolveSlot } from "@/lib/photos";
import { locales } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${candidate.short} — Governor · Bomet 2027`;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const font = (f: string) => fs.readFileSync(path.join(process.cwd(), "assets", "fonts", f));

export default async function OG() {
  const r = resolveSlot("og");
  const portrait =
    r.kind === "photo" && r.photo.kind === "him"
      ? `data:image/jpeg;base64,${fs.readFileSync(path.join(process.cwd(), "public", r.photo.src)).toString("base64")}`
      : null;
  const fx = r.kind === "photo" ? r.photo.focalX : 50;
  const fy = r.kind === "photo" ? r.photo.focalY : 30;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#06401F", fontFamily: "Inter" }}>
        <div style={{ width: 470, height: "100%", display: "flex", position: "relative", background: "#0B7A3B" }}>
          {portrait ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={portrait} alt="" width={470} height={630} style={{ width: 470, height: 630, objectFit: "cover", objectPosition: `${fx}% ${fy}%` }} />
          ) : (
            <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 260, height: 260, borderRadius: 260, border: "4px solid #FFC20E", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Playfair", fontSize: 110, color: "#FFC20E" }}>IR</div>
            </div>
          )}
          <div style={{ position: "absolute", top: 18, left: 18, right: 18, bottom: 18, border: "1.5px solid #FFC20E", display: "flex" }} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 64px", color: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 20, letterSpacing: 3, color: "#FFC20E", textTransform: "uppercase" }}>
            <div style={{ width: 44, height: 3, background: "#FFC20E", marginRight: 16 }} />
            {"Bomet's founding Governor"}
          </div>
          <div style={{ fontFamily: "Playfair", fontSize: 96, lineHeight: 1, marginTop: 22 }}>{candidate.first}</div>
          <div style={{ fontFamily: "Playfair", fontSize: 96, lineHeight: 1 }}>{candidate.last}</div>
          <div style={{ fontSize: 32, marginTop: 28, color: "#fff" }}>Governor · Bomet 2027</div>
          <div style={{ fontFamily: "Playfair", fontSize: 26, marginTop: 18, color: "rgba(255,255,255,.85)" }}>{`“${slogans.main.en}”`}</div>
          <div style={{ display: "flex", marginTop: 36, alignSelf: "flex-start", background: "#FFC20E", color: "#06401F", fontSize: 22, padding: "10px 20px", borderRadius: 4 }}>
            {`${candidate.party} · Pledge your vote`}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Playfair", data: font("PlayfairDisplay-SemiBold.ttf"), weight: 600, style: "normal" },
        { name: "Inter", data: font("Inter-SemiBold.ttf"), weight: 600, style: "normal" },
      ],
    },
  );
}
