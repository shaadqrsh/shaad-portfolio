import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";
import { profile } from "./agentProfile";
import { LOGO_DATA_URI } from "./og-logo";
import { BG_DATA_URI } from "./og-bg";

/**
 * Shared renderer for OpenGraph cards. Every opengraph-image route calls this,
 * so link previews stay consistent and all copy keeps coming from
 * resume_data.json rather than being typed in per page.
 *
 * The layout mirrors the real site: a bg-shaad-300 panel with rounded-4xl
 * corners and a red accent sitting on the bg-shaad-400 page background, the
 * same shape ProjectsCard and ui/Card render.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Straight from globals.css @theme.
const BG = "#181429"; // --color-shaad-400, page background
const PANEL = "#201b35"; // --color-shaad-300, card surface
const NAV = "#292342"; // --color-shaad-200, chips
const MUTED = "#787391"; // --color-shaad-100
const ACCENT = "#d84b54"; // --color-shaad-600, accent 1
const GLOW = "#ec5f6866"; // --color-shaad-550, the homepage card's glow color
const SHADOW = "#0d0a18cc"; // dark purple, a shade under shaad-400
const TEXT = "#ffffff";

// Satori needs real font binaries. The site loads Inter via next/font/google,
// so the same family is vendored here to keep the cards on-brand.
const fontDir = join(process.cwd(), "src/lib/og-fonts");
const inter = (weight: 400 | 600 | 800) =>
  readFileSync(join(fontDir, `Inter-${weight}.ttf`));

const fonts = [
  { name: "Inter", data: inter(400), weight: 400 as const, style: "normal" as const },
  { name: "Inter", data: inter(600), weight: 600 as const, style: "normal" as const },
  { name: "Inter", data: inter(800), weight: 800 as const, style: "normal" as const },
];

type CardProps = {
  /** Small line above the title, e.g. "Game Project". */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Short chips along the bottom, e.g. a tech stack. */
  tags?: string[];
};

export const ogCard = ({ eyebrow, title, subtitle, tags }: CardProps) => {
  const titleSize = title.length > 46 ? 60 : title.length > 28 ? 74 : 88;
  const shownTags = (tags ?? []).slice(0, 6);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: BG,
          // Generous margin so the blurred homepage pattern and the card's red
          // glow both have room to read around the panel.
          padding: 62,
          fontFamily: "Inter",
          position: "relative",
        }}
      >
        {/* The homepage's tiled icon pattern, pre-blurred and dimmed. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BG_DATA_URI}
          width={OG_SIZE.width}
          height={OG_SIZE.height}
          alt=""
          style={{ position: "absolute", top: 0, left: 0 }}
        />

        {/* The card surface, matching rounded-4xl + bg-shaad-300 + the
            homepage card's pulsing shaad-550 red glow (captured mid-pulse). */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: PANEL,
            borderRadius: 32,
            border: `1px solid ${NAV}`,
            padding: "48px 56px",
            position: "relative",
            boxShadow: `0 0 35px 4px ${GLOW}`,
          }}
        >
          {/* Accent bar along the top edge, like the site's red highlights. */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 48,
              width: 180,
              height: 6,
              background: ACCENT,
              borderRadius: 6,
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              {/* The mark is 1.3:1, not square, so size it to that aspect to
                  avoid squashing. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={LOGO_DATA_URI} width={86} height={66} alt="" />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 29, fontWeight: 600, color: TEXT }}>
                  {profile.fullName}
                </div>
                <div style={{ fontSize: 21, color: MUTED }}>{profile.headline}</div>
              </div>
            </div>

            {eyebrow ? (
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: ACCENT,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  background: NAV,
                  borderRadius: 999,
                  padding: "10px 24px",
                  boxShadow: `0 4px 10px ${SHADOW}`,
                }}
              >
                {eyebrow}
              </div>
            ) : null}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Project titles are text-shaad-600 on the real cards. */}
            <div
              style={{
                fontSize: titleSize,
                fontWeight: 800,
                color: ACCENT,
                lineHeight: 1.05,
                letterSpacing: -2,
              }}
            >
              {title}
            </div>

            {subtitle ? (
              <div
                style={{
                  fontSize: 26,
                  color: TEXT,
                  opacity: 0.86,
                  lineHeight: 1.45,
                  maxWidth: 980,
                }}
              >
                {subtitle}
              </div>
            ) : null}
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 12, minWidth: 0, flexShrink: 1, overflow: "hidden" }}>
              {shownTags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    fontSize: 21,
                    color: TEXT,
                    background: NAV,
                    borderRadius: 999,
                    padding: "10px 22px",
                    // Dark purple drop shadow, lifting the pills off the panel.
                    boxShadow: `0 4px 10px ${SHADOW}`,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts }
  );
};

/** Trim a long paragraph to something that fits the card's subtitle slot. */
export const clampText = (text: string, max = 150) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const stop = cut.lastIndexOf(" ");
  return `${cut.slice(0, stop > 0 ? stop : max).trimEnd()}…`;
};
