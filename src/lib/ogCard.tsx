import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";
import type { ReactElement, ReactNode } from "react";
import { profile } from "./agentProfile";
import { BLOB_RING_1, BLOB_RING_2, BLOB_SHAPE } from "./blob";
import { testimonials } from "./Data";
import { dateKey, formatDate } from "./dates";
import { LOGO_DATA_URI } from "./og-logo";
import { BG_DATA_URI } from "./og-bg";
import { data as projectDetail } from "./projectId";
import { featuredProjects } from "./Projects";
import resumeData from "./resume_data.json";
import { SITE_URL } from "./siteUrl";

/**
 * OpenGraph cards. Each opengraph-image route calls one of the builders at the
 * bottom of this file, and all copy comes from resume_data.json and
 * projectId.ts rather than being typed in per page.
 *
 * Every card is the site's rounded bg-shaad-200 panel on a dark backdrop, with
 * a red line above a white display title and labelled facts below. Only the
 * home card glows, as the home hero does; the rest use the panels' plain
 * shadow, matching the site's no-glow rule.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * The last part of every preview image's URL. It changes whenever anything a
 * card is drawn from changes (see ogVersion in next.config.ts), so sites that
 * cache link previews by image URL fetch the new card.
 */
export const OG_ID = `v-${process.env.OG_VERSION ?? "dev"}`;

/** generateImageMetadata for an opengraph-image route with one card. */
export const ogImageMetadata = (alt: string) => [{ id: OG_ID, alt, size: OG_SIZE, contentType: OG_CONTENT_TYPE }];
const { width: W, height: H } = OG_SIZE;

// Straight from globals.css @theme.
const BG = "#181429"; // --color-shaad-400, page background
const CARD = "#201b35"; // --color-shaad-300, cards and chips inside a panel
const PANEL = "#292342"; // --color-shaad-200, panels
const RED = "#ed6169"; // --color-shaad-500, accent 2
const ACCENT = "#d84b54"; // --color-shaad-600, accent 1
const GLOW = "#ec5f6866"; // --color-shaad-550, the home hero's glow
const INK = "#e8e5f1"; // --color-shaad-ink, long-form text
const INK_2 = "#cfcbe0"; // --color-shaad-ink-2, secondary text
const INK_3 = "#a19cba"; // --color-shaad-ink-3, labels
const TEXT = "#ffffff";
// shadow-2xl, the panels' shadow, and shadow-md, the cards'.
const SHADOW_2XL = "0 25px 50px -12px #00000080";
const SHADOW_MD = "0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a";

// Satori needs real font binaries. The site loads Space Grotesk, IBM Plex Sans
// and IBM Plex Mono via next/font/google, so the same faces are vendored here
// (Fontsource latin WOFF files, OFL licensed) to keep the cards on-brand.
const fontDir = join(process.cwd(), "src/lib/og-fonts");
const font = (file: string) => readFileSync(join(fontDir, file));

const DISPLAY = "Space Grotesk";
const BODY = "IBM Plex Sans";
const LABEL = "IBM Plex Mono";

const fonts = [
  { name: DISPLAY, data: font("SpaceGrotesk-500.woff"), weight: 500 as const, style: "normal" as const },
  { name: DISPLAY, data: font("SpaceGrotesk-700.woff"), weight: 700 as const, style: "normal" as const },
  { name: BODY, data: font("IBMPlexSans-400.woff"), weight: 400 as const, style: "normal" as const },
  { name: BODY, data: font("IBMPlexSans-600.woff"), weight: 600 as const, style: "normal" as const },
  { name: LABEL, data: font("IBMPlexMono-500.woff"), weight: 500 as const, style: "normal" as const },
];

// "https://www.shaadqrsh.com" -> "shaadqrsh.com", shown beside the logo.
const DOMAIN = SITE_URL.replace(/^https?:\/\//, "").replace(/^www\./, "");

/** Trim a long paragraph to something that fits a card. */
export const clampText = (text: string, max = 150) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const stop = cut.lastIndexOf(" ");
  return `${cut.slice(0, stop > 0 ? stop : max).trimEnd()}…`;
};

// ---- images ----------------------------------------------------------------

type ImageOpts = {
  /** Output height. With it the image is resized to exactly width x h. */
  h?: number;
  fit?: "cover" | "contain";
  /** Fill behind a "contain" image. */
  background?: string;
  /** Rounded corners in output px. */
  radius?: number;
  /** Keep only part of the source first, as fractions of its height. */
  crop?: { top: number; height: number };
  blur?: number;
  brightness?: number;
};

/**
 * An image from public/ as a PNG data URI. Satori can't load files by path,
 * can't blur, and doesn't clip images to a rounded parent, so sizing, blur
 * and rounded corners are all done here with sharp. `base` is the path
 * without its extension; .png, .jpg and .jpeg are all tried. Returns null if
 * no file exists. Without sharp, the file comes back untouched.
 */
const publicImage = async (base: string, width: number, o: ImageOpts = {}) => {
  const file = ["png", "jpg", "jpeg"].map((ext) => join(process.cwd(), "public", `${base}.${ext}`)).find(existsSync);
  if (!file) return null;
  const raw = readFileSync(file);
  try {
    const sharp = (await import("sharp")).default;
    let buf: Buffer = raw;
    if (o.crop) {
      const meta = await sharp(buf).metadata();
      buf = await sharp(buf)
        .extract({
          left: 0,
          top: Math.round(meta.height! * o.crop.top),
          width: meta.width!,
          height: Math.round(meta.height! * o.crop.height),
        })
        .toBuffer();
    }
    let img = o.h
      ? sharp(buf).resize({ width, height: o.h, fit: o.fit ?? "cover", background: o.background ?? { r: 0, g: 0, b: 0, alpha: 0 } })
      : sharp(buf).resize({ width, withoutEnlargement: true });
    if (o.background) img = img.flatten({ background: o.background });
    if (o.blur) img = img.blur(o.blur);
    if (o.brightness) img = img.modulate({ brightness: o.brightness });
    buf = await img.png().toBuffer();
    if (o.radius) {
      const { width: w, height: h } = await sharp(buf).metadata();
      const mask = Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${o.radius}" ry="${o.radius}"/></svg>`
      );
      buf = await sharp(buf).ensureAlpha().composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
    }
    return `data:image/png;base64,${buf.toString("base64")}`;
  } catch {
    const type = file.endsWith(".png") ? "png" : "jpeg";
    return `data:image/${type};base64,${raw.toString("base64")}`;
  }
};

/** A white tool icon from public/skills, inlined. */
const skillIcon = (file: string) => {
  const path = join(process.cwd(), "public/skills", file);
  return existsSync(path) ? `data:image/svg+xml;base64,${readFileSync(path).toString("base64")}` : null;
};

// The home photo blob, drawn BLOB px wide. The rings and glow reach past the
// blob's 0 to 1 box, so the image has a margin of BLOB_PAD on every side.
const BLOB = 460;
const BLOB_PAD = 0.08;

/**
 * The home page's photo blob, held still: the red blob with the photo cut to
 * its shape, the two red rings and the soft red glow behind. Satori can't clip
 * images, so the whole thing is one SVG, turned into a PNG with sharp when
 * it's available. Returns null without the photo.
 */
const blobImage = async () => {
  const photo = await publicImage("img_home", BLOB * 2);
  if (!photo) return null;
  const box = 1 + BLOB_PAD * 2;
  const px = Math.round(BLOB * box);
  // Drawn at 2x so it stays sharp when Satori scales it down.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${px * 2}" height="${px * 2}" viewBox="${-BLOB_PAD} ${-BLOB_PAD} ${box} ${box}">
<defs>
<radialGradient id="glow"><stop offset="0.6" stop-color="${ACCENT}" stop-opacity="0.75"/><stop offset="1" stop-color="${ACCENT}" stop-opacity="0"/></radialGradient>
<clipPath id="cut"><path d="${BLOB_SHAPE}"/></clipPath>
</defs>
<circle cx="0.5" cy="0.5" r="${0.5 + BLOB_PAD}" fill="url(#glow)"/>
<path d="${BLOB_SHAPE}" fill="${ACCENT}"/>
<path d="${BLOB_RING_1}" fill="none" stroke="${RED}" stroke-width="0.012" opacity="0.9"/>
<path d="${BLOB_RING_2}" fill="none" stroke="${RED}" stroke-width="0.006" opacity="0.5"/>
<image href="${photo}" xlink:href="${photo}" x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMin slice" clip-path="url(#cut)"/>
</svg>`;
  try {
    const sharp = (await import("sharp")).default;
    const out = await sharp(Buffer.from(svg)).png().toBuffer();
    return { src: `data:image/png;base64,${out.toString("base64")}`, px };
  } catch {
    return { src: `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`, px };
  }
};

// ---- building blocks -------------------------------------------------------

/* eslint-disable @next/next/no-img-element -- Satori renders plain <img> only */

/** The 1200x630 frame: a full-bleed backdrop (the home icon pattern by default) with the card on top. */
const Canvas = ({ children, backdrop = BG_DATA_URI, center }: { children: ReactNode; backdrop?: string; center?: boolean }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: center ? "center" : "flex-start",
      gap: 40,
      background: BG,
      padding: 48,
      fontFamily: BODY,
      position: "relative",
    }}
  >
    <img src={backdrop} width={W} height={H} alt="" style={{ position: "absolute", top: 0, left: 0, objectFit: "cover" }} />
    {children}
  </div>
);

/** rounded-4xl bg-shaad-200 with shadow-2xl; the home card adds the hero's red glow. */
const panel = (glow = false) => ({
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-between",
  background: PANEL,
  borderRadius: 32,
  padding: "40px 52px 38px",
  boxShadow: glow ? `0 0 30px ${GLOW}, ${SHADOW_2XL}` : SHADOW_2XL,
});

const Brand = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
    {/* The mark is 1.3:1, not square, so size it to that aspect. */}
    <img src={LOGO_DATA_URI} width={57} height={44} alt="" />
    <div style={{ fontFamily: LABEL, fontSize: 21, fontWeight: 500, color: INK_3, letterSpacing: 0.5 }}>{DOMAIN}</div>
  </div>
);

/** The red line above a title, like the home page's role line. */
const Kicker = ({ children }: { children: string }) => <div style={{ fontSize: 26, fontWeight: 600, color: RED }}>{children}</div>;

const Title = ({ children, size, color = TEXT }: { children: string; size: number; color?: string }) => (
  <div style={{ fontFamily: DISPLAY, fontSize: size, fontWeight: 700, color, lineHeight: 1.04, letterSpacing: -0.5 }}>{children}</div>
);

const Body = ({ children, size = 21 }: { children: string; size?: number }) => (
  <div style={{ fontSize: size, color: INK, lineHeight: 1.55 }}>{children}</div>
);

/** Small uppercase Plex Mono label, like the site's Label. */
const Label = ({ children }: { children: string }) => (
  <div style={{ fontFamily: LABEL, fontSize: 15, fontWeight: 500, color: INK_3, letterSpacing: 1, textTransform: "uppercase" }}>
    {children}
  </div>
);

/** A label above its value, like the site's Meta. */
const Fact = ({ label, value, size = 26 }: { label: string; value: string; size?: number }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
    <Label>{label}</Label>
    <div style={{ fontSize: size, fontWeight: 600, color: TEXT }}>{value}</div>
  </div>
);

/** A footer row under a thin white/10 rule, as on the project cards. */
const Footer = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 24,
      borderTop: "1px solid rgba(255,255,255,0.1)",
      paddingTop: 22,
    }}
  >
    {children}
  </div>
);

/** The red pill button. */
const Button = ({ children }: { children: string }) => (
  <div
    style={{
      display: "flex",
      flexShrink: 0,
      fontSize: 21,
      fontWeight: 600,
      color: TEXT,
      background: ACCENT,
      borderRadius: 999,
      padding: "12px 28px",
    }}
  >
    {children}
  </div>
);

/** ProjectsCard's tech tile: a dark rounded square with a white icon. */
const ToolTile = ({ icon, size = 44, background = CARD }: { icon: string; size?: number; background?: string }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      borderRadius: Math.round(size * 0.27),
      background,
      // Big tiles stand on the backdrop like panels; small ones sit flat in one.
      ...(size > 60 ? { boxShadow: SHADOW_2XL } : {}),
    }}
  >
    <img src={icon} width={Math.round(size * 0.58)} height={Math.round(size * 0.58)} alt="" />
  </div>
);

/**
 * A plain 1200x630 copy of the home card, served whenever a card fails to
 * draw, so a share never ends up with no image. Rebuild it after a redesign
 * by saving a fresh home card over it.
 */
const FALLBACK = join(process.cwd(), "src/lib/og-fallback.png");

export const fallbackCard = () =>
  new Response(readFileSync(FALLBACK), {
    headers: { "Content-Type": OG_CONTENT_TYPE, "Cache-Control": "public, max-age=0, must-revalidate" },
  });

/**
 * Draws a card. ImageResponse only renders once its body is read, so the body
 * is read here, where a failure can still be caught and swapped for the fallback.
 */
const render = async (card: ReactElement) => {
  try {
    const res = new ImageResponse(card, { ...OG_SIZE, fonts });
    const png = await res.arrayBuffer();
    return new Response(png, { headers: res.headers });
  } catch (err) {
    console.warn("Preview card failed to render; serving the static fallback.", err);
    return fallbackCard();
  }
};

/** Wraps a card builder so a failure while gathering its data also falls back. */
const guarded =
  <A extends unknown[]>(build: (...args: A) => Promise<Response>) =>
  async (...args: A) => {
    try {
      return await build(...args);
    } catch (err) {
      console.warn("Preview card failed to build; serving the static fallback.", err);
      return fallbackCard();
    }
  };

// ---- data ------------------------------------------------------------------

const currentRole = resumeData.experience.find((e) => "inProgress" in e && e.inProgress) ?? resumeData.experience[0];
const latestProject = [...resumeData.projects].sort((a, b) => dateKey(b.date) - dateKey(a.date))[0];

/** Unique tool icons for a project, in the order projectId.ts lists them. */
const projectIcons = (slug: string) =>
  Array.from(new Set((projectDetail[slug]?.technologies ?? []).map((t) => t.icon).filter(Boolean)))
    .map(skillIcon)
    .filter((i): i is string => !!i);

/** "/about/img_neu.png" -> "about/img_neu", the form publicImage takes. */
const baseOf = (path: string) => path.replace(/^\//, "").replace(/\.\w+$/, "");

// ---- cards -----------------------------------------------------------------

/**
 * Home, and the site-wide default: the intro panel beside the photo blob, as
 * on the home page. The one card allowed the red glow.
 */
export const homeCard = guarded(async () => {
  const blob = await blobImage();
  return render(
    <Canvas>
      <div style={{ ...panel(true), flex: 1, alignSelf: "stretch" }}>
        <Brand />
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Kicker>{profile.headline}</Kicker>
          <Title size={64}>{profile.name}</Title>
          <Body size={22}>{clampText(profile.summary, 125)}</Body>
        </div>
        <Footer>
          <div style={{ display: "flex", gap: 36 }}>
            {testimonials.slice(0, 4).map((t) => (
              <Fact key={t.label} label={t.label} value={t.count} />
            ))}
          </div>
        </Footer>
      </div>
      {blob ? (
        <div style={{ display: "flex", width: BLOB, height: BLOB, flexShrink: 0, position: "relative" }}>
          <img
            src={blob.src}
            width={blob.px}
            height={blob.px}
            alt=""
            style={{ position: "absolute", top: -BLOB * BLOB_PAD, left: -BLOB * BLOB_PAD }}
          />
        </div>
      ) : null}
    </Canvas>
  );
});

/** About: the bio panel beside a 3x3 wall of the tools listed first in Skills. */
export const aboutCard = guarded(async () => {
  const tools = Array.from(new Set([...resumeData.skills.top3, ...resumeData.skills.main].map((s) => s.icon)))
    .map(skillIcon)
    .filter((i): i is string => !!i)
    .slice(0, 9);
  return render(
    <Canvas>
      <div style={{ ...panel(), flex: 1, alignSelf: "stretch" }}>
        <Brand />
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Kicker>About</Kicker>
          <Title size={64}>{profile.name}</Title>
          <Body>{clampText(profile.about, 135)}</Body>
        </div>
        <Footer>
          <Fact label="Based in" value={profile.location} size={23} />
          <Fact label="Working as" value={currentRole.title} size={23} />
        </Footer>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", width: 420, gap: 18, flexShrink: 0 }}>
        {tools.map((icon) => (
          <ToolTile key={icon} icon={icon} size={128} background={PANEL} />
        ))}
      </div>
    </Canvas>
  );
});

/** Projects: like the home page's Featured Projects section, with a count pill. */
export const projectsCard = guarded(async () => {
  const featured = featuredProjects.slice(0, 3);
  const covers = await Promise.all(featured.map((p) => publicImage(`project_${p.url}/cover`, 608, { h: 400, radius: 20 })));
  return render(
    <Canvas>
      <div style={{ ...panel(), flex: 1, alignSelf: "stretch" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Brand />
          {/* Section's count pill. */}
          <div style={{ display: "flex", fontFamily: LABEL, fontSize: 18, fontWeight: 500, color: INK_3, background: CARD, borderRadius: 999, padding: "6px 16px" }}>
            {`${resumeData.projects.length} projects`}
          </div>
        </div>
        {/* Section titles are text-shaad-600. */}
        <Title size={56} color={ACCENT}>
          Projects
        </Title>
        <div style={{ display: "flex", gap: 18 }}>
          {featured.map((p, i) => (
            <div
              key={p.url}
              style={{ display: "flex", flexDirection: "column", flex: 1, gap: 10, background: CARD, borderRadius: 14, padding: 10, boxShadow: SHADOW_MD }}
            >
              {covers[i] ? <img src={covers[i]!} width={304} height={200} alt="" /> : null}
              <div style={{ fontFamily: DISPLAY, fontSize: 23, fontWeight: 700, color: TEXT, padding: "0 6px 4px" }}>{p.title}</div>
            </div>
          ))}
        </div>
      </div>
    </Canvas>
  );
});

/**
 * Resume: what I'm doing now and what I shipped last, as two cards, on the
 * resume page itself, blurred and dimmed. Both come from resume_data.json, so
 * the card keeps up without edits.
 */
export const resumeCard = guarded(async () => {
  const [paper, org, cover] = await Promise.all([
    publicImage("resume", W, { h: H, crop: { top: 0.05, height: 0.6 }, blur: 6, brightness: 0.35 }),
    publicImage(baseOf(currentRole.image), 192, { h: 192, fit: "contain", background: "#ffffff", radius: 24 }),
    publicImage(`project_${latestProject.url}/cover`, 264, { h: 192, radius: 24 }),
  ]);
  const Item = ({ label, pic, picW, title, sub }: { label: string; pic: string | null; picW: number; title: string; sub: string }) => (
    <div style={{ display: "flex", flex: 1, alignItems: "center", gap: 20, background: CARD, borderRadius: 16, padding: 18, boxShadow: SHADOW_MD }}>
      {pic ? <img src={pic} width={picW} height={96} alt="" /> : null}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        <Label>{label}</Label>
        <div style={{ fontFamily: DISPLAY, fontSize: 26, fontWeight: 700, color: TEXT, lineHeight: 1.1 }}>{title}</div>
        <div style={{ fontSize: 18, color: INK_2 }}>{sub}</div>
      </div>
    </div>
  );
  return render(
    <Canvas backdrop={paper ?? BG_DATA_URI} center>
      <div style={{ ...panel(), width: 1030, height: 520 }}>
        <Brand />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Kicker>Resume</Kicker>
          <Title size={72}>{profile.name}</Title>
        </div>
        <div style={{ display: "flex", gap: 18 }}>
          <Item label="Working as" pic={org} picW={96} title={currentRole.title} sub={currentRole.location.split(",")[0]} />
          <Item
            label="Latest project"
            pic={cover}
            picW={132}
            title={latestProject.title}
            sub={`Released ${formatDate(latestProject.date)}`}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 22, color: INK_2 }}>{`${profile.headline} in ${profile.location}`}</div>
          <Button>Download PDF</Button>
        </div>
      </div>
    </Canvas>
  );
});

/**
 * A project: its cover fills the card, as on the project page, darkened on
 * the left where the panel sits. The panel carries the icon, the title and
 * summary, the release date and the tech tiles. Falls back to the home card
 * for an unknown slug.
 */
export const projectCard = guarded(async (slug: string) => {
  const proj = resumeData.projects.find((p) => p.url === slug);
  if (!proj) return homeCard();
  const [cover, icon] = await Promise.all([
    publicImage(`project_${slug}/cover`, W, { h: H }),
    publicImage(`project_${slug}/icon`, 168, { h: 168, radius: 44 }),
  ]);
  const kind = projectDetail[slug]?.game ? "Game Project" : "Software Project";
  const long = proj.title.length > 24;
  return render(
    <Canvas backdrop={cover ?? BG_DATA_URI}>
      {/* The hero's fade, run left to right so the cover stays clear beside the panel. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: W,
          height: H,
          display: "flex",
          backgroundImage: "linear-gradient(to right, rgba(24,20,41,0.85) 35%, rgba(24,20,41,0.15))",
        }}
      />
      <div style={{ ...panel(), width: 660, alignSelf: "stretch" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {icon ? <img src={icon} width={84} height={84} alt="" /> : <div style={{ display: "flex" }} />}
          <Brand />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Kicker>{kind}</Kicker>
          {/* Up to 13 characters fit on one line at full size and 24 at the middle
              size; longer titles take two lines, so the summary gets shorter. */}
          <Title size={long ? 46 : proj.title.length > 13 ? 54 : 66}>{proj.title}</Title>
          <Body>{clampText(proj.desc, long ? 85 : 120)}</Body>
        </div>
        <Footer>
          <Fact label="Released" value={formatDate(proj.date)} />
          <div style={{ display: "flex", gap: 8 }}>
            {projectIcons(slug)
              .slice(0, 5)
              .map((i) => (
                <ToolTile key={i} icon={i} />
              ))}
          </div>
        </Footer>
      </div>
    </Canvas>
  );
});
