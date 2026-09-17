import { ImageResponse } from "next/og";
import { profile } from "./agentProfile";

/**
 * Shared renderer for OpenGraph cards. Every opengraph-image route in the app
 * calls this, so link previews stay visually consistent and all of the copy
 * keeps coming from resume_data.json rather than being typed in per page.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Pulled from globals.css so the cards match the live site.
const BG = "#181429";
const PANEL = "#201b35";
const ACCENT = "#d84b54";
const TEXT = "#ffffff";
const MUTED = "#a09bb5";

/** The SQ monogram, drawn as the same plate used for the favicon. */
const Monogram = ({ size = 76 }: { size?: number }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.2,
      background: ACCENT,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size * 0.42,
      fontWeight: 700,
      color: TEXT,
      letterSpacing: -1,
    }}
  >
    SQ
  </div>
);

type CardProps = {
  /** Small line above the title, e.g. "Game Project". */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Short chips along the bottom, e.g. a tech stack. */
  tags?: string[];
  /** Bottom-right call to action. Defaults to the site domain. */
  footer?: string;
};

export const ogCard = ({ eyebrow, title, subtitle, tags, footer }: CardProps) => {
  // Long project titles need to step down a size or two to avoid wrapping to
  // three lines and crowding the tags.
  const titleSize = title.length > 46 ? 58 : title.length > 28 ? 72 : 86;
  const shownTags = (tags ?? []).slice(0, 6);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: "64px 72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Accent glow, echoing the site's dark-purple-with-red-accent look. */}
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -200,
            width: 620,
            height: 620,
            borderRadius: 620,
            background: ACCENT,
            opacity: 0.16,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <Monogram />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 600, color: TEXT }}>
              {profile.fullName}
            </div>
            <div style={{ fontSize: 22, color: MUTED }}>{profile.headline}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {eyebrow ? (
            <div
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: ACCENT,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              {eyebrow}
            </div>
          ) : null}

          <div
            style={{
              fontSize: titleSize,
              fontWeight: 800,
              color: TEXT,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {title}
          </div>

          {/* Accent rule under the title. */}
          <div style={{ width: 96, height: 7, borderRadius: 7, background: ACCENT }} />

          {subtitle ? (
            <div
              style={{
                fontSize: 27,
                color: MUTED,
                lineHeight: 1.4,
                // Keep the summary to roughly two lines.
                maxWidth: 950,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {shownTags.map((tag) => (
              <div
                key={tag}
                style={{
                  fontSize: 22,
                  color: TEXT,
                  background: PANEL,
                  border: `1px solid ${ACCENT}55`,
                  borderRadius: 999,
                  padding: "10px 22px",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 24, color: MUTED }}>
            {footer ?? profile.url.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    OG_SIZE
  );
};

/** Trim a long paragraph to something that fits the card's subtitle slot. */
export const clampText = (text: string, max = 150) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const stop = cut.lastIndexOf(" ");
  return `${cut.slice(0, stop > 0 ? stop : max).trimEnd()}…`;
};
