import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Img, Interactive, random, staticFile } from "remotion";
import { brand, geist } from "../../brand";
import { Logo } from "../../Logo";
import { ADDRESS, Headline, Lead, POST } from "../shared";

/*
 * Thu 24 Dec and Wed 30 Dec: the two greeting cards. Unlike the other posts they are full-bleed
 * (crimson for Christmas, a night sky for New Year) with the light logo on top instead of the
 * white page's footer. Every decoration is drawn here in SVG, in the brand's crimson, pink and white.
 */

const PINK = "#f7c9d6";
const PINK_LIGHT = "#ffd3df";
const DEEP = "#6e0d29";
const INK = "#151515";

/** Centered logo, headline and lead, shared by both cards. */
const Greeting = ({
  top,
  headline,
  size,
  lead,
}: {
  readonly top: number;
  readonly headline: ReactNode;
  readonly size: number;
  readonly lead: ReactNode;
}) => (
  <div
    style={{
      position: "absolute",
      top: 84,
      left: 0,
      right: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    }}
  >
    <Interactive.Div name="Logo">
      <Logo height={104} tone="onDark" />
    </Interactive.Div>
    <Headline
      size={size}
      style={{ marginTop: top, color: brand.white, lineHeight: 0.98 }}
    >
      {headline}
    </Headline>
    <Lead
      style={{
        marginTop: 36,
        maxWidth: 860,
        fontSize: 44,
        color: "rgba(255,255,255,0.88)",
      }}
    >
      {lead}
    </Lead>
  </div>
);

/** A full-frame SVG layer in the post's coordinates. */
const Layer = ({
  children,
  style,
}: {
  readonly children: ReactNode;
  readonly style?: CSSProperties;
}) => (
  <svg
    width={POST.width}
    height={POST.height}
    viewBox={`0 0 ${POST.width} ${POST.height}`}
    style={{ position: "absolute", inset: 0, ...style }}
  >
    {children}
  </svg>
);

/* ---------- Christmas ---------- */

/** Six arms with two V-shaped branches each, 100 units across at scale 1. */
const Snowflake = ({
  x,
  y,
  size,
  rotate,
  opacity,
}: {
  readonly x: number;
  readonly y: number;
  readonly size: number;
  readonly rotate: number;
  readonly opacity: number;
}) => (
  <g
    transform={`translate(${x} ${y}) rotate(${rotate}) scale(${size / 100})`}
    opacity={opacity}
    stroke={brand.white}
    strokeWidth={7}
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
  >
    {[0, 60, 120, 180, 240, 300].map((angle) => (
      <g key={angle} transform={`rotate(${angle})`}>
        <line x1={0} y1={0} x2={0} y2={-50} />
        <polyline points="-15,-42 0,-30 15,-42" />
        <polyline points="-10,-22 0,-14 10,-22" />
      </g>
    ))}
  </g>
);

/** Snowflakes and soft flakes, placed by seed so every render is the same. */
const Snow = () => (
  <Layer>
    {Array.from({ length: 70 }, (_, i) => (
      <circle
        key={`dot-${i}`}
        cx={random(`dot-x-${i}`) * POST.width}
        cy={random(`dot-y-${i}`) * 1180}
        r={3 + random(`dot-r-${i}`) * 6}
        fill={brand.white}
        opacity={0.25 + random(`dot-o-${i}`) * 0.4}
      />
    ))}
    {SNOWFLAKES.map((flake) => (
      <Snowflake key={`${flake.x}-${flake.y}`} {...flake} />
    ))}
  </Layer>
);

/** Kept off the logo and the middle of the headline. */
const SNOWFLAKES = [
  { x: 300, y: 70, size: 54, rotate: 10, opacity: 0.32 },
  { x: 780, y: 60, size: 40, rotate: 25, opacity: 0.28 },
  { x: 60, y: 520, size: 70, rotate: 5, opacity: 0.3 },
  { x: 1010, y: 470, size: 84, rotate: 18, opacity: 0.3 },
  { x: 150, y: 760, size: 46, rotate: 30, opacity: 0.26 },
  { x: 950, y: 760, size: 52, rotate: 0, opacity: 0.26 },
  { x: 250, y: 470, size: 30, rotate: 12, opacity: 0.22 },
  { x: 860, y: 610, size: 34, rotate: 40, opacity: 0.22 },
  { x: 540, y: 815, size: 28, rotate: 15, opacity: 0.2 },
];

/** A bauble on a string from the top edge, with a contrasting band and a highlight. */
const Ornament = ({
  x,
  length,
  r,
  color,
  band,
}: {
  readonly x: number;
  readonly length: number;
  readonly r: number;
  readonly color: string;
  readonly band: string;
}) => {
  const cy = length + 16 + r;
  const id = `bauble-${x}`;

  return (
    <g>
      <line
        x1={x}
        y1={0}
        x2={x}
        y2={length}
        stroke="rgba(255,255,255,0.7)"
        strokeWidth={3}
      />
      <clipPath id={id}>
        <circle cx={x} cy={cy} r={r} />
      </clipPath>
      <circle cx={x} cy={cy} r={r} fill={color} />
      <g clipPath={`url(#${id})`}>
        <rect
          x={x - r}
          y={cy - r * 0.16}
          width={r * 2}
          height={r * 0.32}
          fill={band}
        />
        <rect
          x={x - r}
          y={cy - r * 0.42}
          width={r * 2}
          height={r * 0.07}
          fill={band}
        />
        <rect
          x={x - r}
          y={cy + r * 0.35}
          width={r * 2}
          height={r * 0.07}
          fill={band}
        />
        <circle cx={x + r * 0.35} cy={cy + r * 0.4} r={r} fill="rgba(0,0,0,0.12)" />
      </g>
      <ellipse
        cx={x - r * 0.38}
        cy={cy - r * 0.42}
        rx={r * 0.22}
        ry={r * 0.13}
        transform={`rotate(-35 ${x - r * 0.38} ${cy - r * 0.42})`}
        fill="rgba(255,255,255,0.75)"
      />
      <rect
        x={x - 12}
        y={length}
        width={24}
        height={20}
        rx={4}
        fill="#d4d4d4"
      />
    </g>
  );
};

const ORNAMENTS = [
  { x: 84, length: 130, r: 44, color: brand.white, band: brand.primary },
  { x: 196, length: 300, r: 32, color: INK, band: PINK },
  { x: 884, length: 250, r: 38, color: PINK, band: brand.white },
  { x: 996, length: 120, r: 48, color: brand.white, band: DEEP },
];

type Gift = {
  readonly x: number;
  readonly w: number;
  readonly h: number;
  readonly body: string;
  readonly ribbon: string;
  /** A second ribbon across the front. */
  readonly cross?: boolean;
  readonly pattern?: { readonly kind: "dots" | "stripes"; readonly color: string };
};

/** Where the presents stand, in the pile's own coordinates (1080 × 560, bottom of the post). */
const GROUND = 470;
const PILE_TOP = POST.height - 560;

/** Two loops, a knot and two tails, 200 units across at scale 1, centered on the knot. */
const Bow = ({
  x,
  y,
  scale,
  color,
}: {
  readonly x: number;
  readonly y: number;
  readonly scale: number;
  readonly color: string;
}) => {
  const loop = "M0,0 C-30,-72 -112,-78 -102,-22 C-96,8 -40,10 0,0 Z";
  const shade = "M-10,-8 C-32,-48 -82,-54 -80,-24 C-77,-8 -42,-4 -10,-8 Z";
  const tail = "M-4,4 L-46,78 L-28,72 L-20,92 L10,8 Z";

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill={color}>
      <path d={tail} />
      <path d={tail} transform="scale(-1 1) rotate(-6)" />
      <path d={loop} />
      <path d={loop} transform="scale(-1 1)" />
      <path d={shade} fill="rgba(0,0,0,0.16)" />
      <path d={shade} fill="rgba(0,0,0,0.16)" transform="scale(-1 1)" />
      <ellipse cx={0} cy={0} rx={18} ry={15} />
      <ellipse cx={0} cy={2} rx={18} ry={15} fill="rgba(0,0,0,0.1)" />
    </g>
  );
};

const Present = ({ gift, id }: { readonly gift: Gift; readonly id: string }) => {
  const { x, w, h, body, ribbon, cross, pattern } = gift;
  const top = GROUND - h;
  const lid = Math.min(54, Math.max(36, h * 0.17));
  const band = Math.max(26, w * 0.13);
  const cx = x + w / 2;
  const clip = `gift-${id}`;

  return (
    <g>
      <clipPath id={clip}>
        <rect x={x} y={top + lid} width={w} height={h - lid} />
      </clipPath>
      <rect x={x} y={top + lid} width={w} height={h - lid + 20} rx={6} fill={body} />
      <g clipPath={`url(#${clip})`}>
        {pattern?.kind === "dots"
          ? Array.from({ length: Math.ceil(w / 36) + 1 }, (_, col) =>
              Array.from({ length: Math.ceil(h / 36) + 1 }, (_, row) => (
                <circle
                  key={`${col}-${row}`}
                  cx={x + 12 + col * 36 + (row % 2) * 18}
                  cy={top + lid + 16 + row * 36}
                  r={5.5}
                  fill={pattern.color}
                />
              )),
            )
          : null}
        {pattern?.kind === "stripes"
          ? Array.from({ length: Math.ceil((w + h) / 44) + 1 }, (_, i) => (
              <line
                key={i}
                x1={x - h + i * 44}
                y1={GROUND + 20}
                x2={x + i * 44}
                y2={top + lid - 20}
                stroke={pattern.color}
                strokeWidth={12}
              />
            ))
          : null}
        {/* The lid's shadow on the box. */}
        <rect x={x} y={top + lid} width={w} height={16} fill="rgba(0,0,0,0.14)" />
        {/* Shade on the right side, for a little depth. */}
        <rect
          x={x + w * 0.82}
          y={top + lid}
          width={w * 0.18}
          height={h}
          fill="rgba(0,0,0,0.07)"
        />
      </g>
      <rect x={cx - band / 2} y={top + lid} width={band} height={h} fill={ribbon} />
      {cross ? (
        <rect
          x={x}
          y={top + lid + (h - lid) * 0.42}
          width={w}
          height={band}
          fill={ribbon}
        />
      ) : null}
      <rect x={x - 12} y={top} width={w + 24} height={lid} rx={8} fill={body} />
      <rect
        x={x - 12}
        y={top + lid - 10}
        width={w + 24}
        height={10}
        rx={4}
        fill="rgba(0,0,0,0.1)"
      />
      <rect x={cx - band / 2} y={top} width={band} height={lid} fill={ribbon} />
      <Bow
        x={cx}
        y={top + 4}
        scale={Math.min(1.15, Math.max(0.55, w / 310))}
        color={ribbon}
      />
    </g>
  );
};

/** Back row first, so the front row overlaps it. */
const GIFTS: readonly Gift[] = [
  {
    x: 92,
    w: 214,
    h: 330,
    body: INK,
    ribbon: brand.white,
    cross: true,
    pattern: { kind: "dots", color: "#3a3a3a" },
  },
  {
    x: 706,
    w: 250,
    h: 272,
    body: PINK,
    ribbon: DEEP,
    cross: true,
    pattern: { kind: "stripes", color: "rgba(255,255,255,0.55)" },
  },
  { x: 334, w: 356, h: 300, body: brand.white, ribbon: DEEP },
  {
    x: 18,
    w: 196,
    h: 150,
    body: DEEP,
    ribbon: PINK,
    pattern: { kind: "dots", color: "rgba(255,255,255,0.18)" },
  },
  { x: 566, w: 168, h: 118, body: DEEP, ribbon: PINK, cross: true },
  {
    x: 842,
    w: 214,
    h: 176,
    body: brand.white,
    ribbon: INK,
    pattern: { kind: "dots", color: PINK },
  },
];

/** The ink tag hangs from the big white present's bow and carries the logo mark. */
const TAG = { x: 376, y: 248, w: 118, h: 150, rotate: -9 };

const Presents = () => (
  <svg
    width={POST.width}
    height={560}
    viewBox="0 0 1080 560"
    style={{ position: "absolute", left: 0, top: PILE_TOP }}
  >
    <ellipse cx={540} cy={GROUND + 6} rx={560} ry={38} fill="rgba(0,0,0,0.16)" />
    {GIFTS.map((gift, i) => (
      <Present key={gift.x} gift={gift} id={String(i)} />
    ))}
    <path
      d={`M512,${GROUND - 300 + 4} L${TAG.x + TAG.w / 2 + 18},${TAG.y + 14}`}
      stroke={INK}
      strokeWidth={3}
    />
    {/* Snowdrift in front: the shadowed ridge, then the snow. */}
    <path
      d="M0,468 C120,438 220,460 330,450 C460,438 560,466 700,456 C820,446 930,438 1080,458 L1080,560 L0,560 Z"
      fill="#f1d9e0"
    />
    <path
      d="M0,482 C130,456 240,476 350,468 C480,458 580,484 720,474 C840,466 950,458 1080,478 L1080,560 L0,560 Z"
      fill={brand.white}
    />
  </svg>
);

const GiftTag = () => (
  <Interactive.Div
    name="Gift tag"
    style={{
      position: "absolute",
      left: TAG.x,
      top: PILE_TOP + TAG.y,
      width: TAG.w,
      height: TAG.h,
      rotate: `${TAG.rotate}deg`,
      borderRadius: 14,
      backgroundColor: INK,
      boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 12,
        left: TAG.w / 2 - 8,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: "#b35b74",
      }}
    />
    <Img
      src={staticFile("brand/logo-mark-light.svg")}
      style={{ marginTop: 22, width: (154.431 / 256.013) * 84, height: 84 }}
    />
  </Interactive.Div>
);

export const Christmas = () => (
  <AbsoluteFill
    style={{
      fontFamily: geist,
      background:
        "radial-gradient(ellipse 90% 70% at 50% 34%, #c42553 0%, #af1a44 48%, #84102f 100%)",
    }}
  >
    <Snow />
    <Layer>
      {ORNAMENTS.map((ornament) => (
        <Ornament key={ornament.x} {...ornament} />
      ))}
    </Layer>
    <Greeting
      top={64}
      size={200}
      headline={
        <>
          <div>Vesel</div>
          <div style={{ color: PINK_LIGHT }}>božič</div>
        </>
      }
      lead="in mirne praznike vam želi ekipa Kranfix."
    />
    <Presents />
    <GiftTag />
    <Interactive.Div
      name="Address"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 34,
        textAlign: "center",
        fontSize: 30,
        fontWeight: 500,
        color: brand.primary,
      }}
    >
      kranfix.si · {ADDRESS}
    </Interactive.Div>
  </AbsoluteFill>
);

/* ---------- New Year ---------- */

const GOLD = "#ffd27a";
const ROSE = "#ff6f97";

type Firework = {
  readonly cx: number;
  readonly cy: number;
  readonly r: number;
  readonly color: string;
  readonly inner: string;
  readonly rays: number;
  /** Where its rocket left the ground; no trail if absent. */
  readonly from?: number;
};

/** One burst: long rays ending in sparks, a shorter inner ring and a glowing core. */
const Burst = ({ cx, cy, r, color, inner, rays }: Firework) => (
  <g filter="url(#glow)">
    {Array.from({ length: rays }, (_, i) => {
      const angle = (i / rays) * Math.PI * 2 + random(`a-${cx}-${i}`) * 0.08;
      const reach = r * (0.86 + random(`l-${cx}-${i}`) * 0.14);
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      return (
        <g key={i}>
          <line
            x1={cx + cos * r * 0.3}
            y1={cy + sin * r * 0.3}
            x2={cx + cos * reach * 0.88}
            y2={cy + sin * reach * 0.88}
            stroke={color}
            strokeWidth={4}
            strokeLinecap="round"
            opacity={0.75}
          />
          <circle cx={cx + cos * reach} cy={cy + sin * reach} r={6} fill={color} />
        </g>
      );
    })}
    {Array.from({ length: rays }, (_, i) => {
      const angle = ((i + 0.5) / rays) * Math.PI * 2;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      return (
        <g key={`in-${i}`}>
          <line
            x1={cx + cos * r * 0.18}
            y1={cy + sin * r * 0.18}
            x2={cx + cos * r * 0.5}
            y2={cy + sin * r * 0.5}
            stroke={inner}
            strokeWidth={3}
            strokeLinecap="round"
            opacity={0.85}
          />
          <circle cx={cx + cos * r * 0.58} cy={cy + sin * r * 0.58} r={4} fill={inner} />
        </g>
      );
    })}
    <circle cx={cx} cy={cy} r={r * 0.08} fill={inner} opacity={0.9} />
  </g>
);

/** The rocket's climb: a dotted, slightly curved line that fades out towards the ground. */
const Trail = ({ cx, cy, r, color, from }: Firework) => {
  if (from === undefined) return null;
  const id = `trail-${cx}`;
  const bottom = POST.height + 10;
  const endY = cy + r * 0.2;

  return (
    <g>
      <linearGradient id={id} gradientUnits="userSpaceOnUse" x1={0} y1={bottom} x2={0} y2={endY}>
        <stop offset="0" stopColor={color} stopOpacity={0} />
        <stop offset="1" stopColor={color} stopOpacity={0.9} />
      </linearGradient>
      <path
        d={`M${from},${bottom} Q${(from + cx) / 2 + 40},${(bottom + endY) / 2} ${cx},${endY}`}
        stroke={`url(#${id})`}
        strokeWidth={6}
        strokeLinecap="round"
        strokeDasharray="3 14"
        fill="none"
      />
    </g>
  );
};

/** Four-point twinkle, for the sky between the bursts. */
const Sparkle = ({
  x,
  y,
  size,
  color,
}: {
  readonly x: number;
  readonly y: number;
  readonly size: number;
  readonly color: string;
}) => (
  <path
    d={`M${x},${y - size} Q${x},${y} ${x + size},${y} Q${x},${y} ${x},${y + size} Q${x},${y} ${x - size},${y} Q${x},${y} ${x},${y - size} Z`}
    fill={color}
  />
);

/** Kept clear of the logo and the headline; the big ones rise from the bottom edge. */
const FIREWORKS: readonly Firework[] = [
  { cx: 118, cy: 290, r: 110, color: ROSE, inner: brand.white, rays: 18 },
  { cx: 955, cy: 250, r: 130, color: GOLD, inner: ROSE, rays: 20 },
  { cx: 220, cy: 1100, r: 158, color: GOLD, inner: brand.white, rays: 22, from: 330 },
  { cx: 845, cy: 1075, r: 186, color: ROSE, inner: GOLD, rays: 24, from: 700 },
  { cx: 535, cy: 1220, r: 78, color: brand.white, inner: ROSE, rays: 14, from: 520 },
  { cx: 812, cy: 66, r: 46, color: brand.white, inner: GOLD, rays: 12 },
  { cx: 1020, cy: 690, r: 64, color: brand.white, inner: ROSE, rays: 12 },
  { cx: 58, cy: 720, r: 58, color: GOLD, inner: brand.white, rays: 12 },
];

const CONFETTI_COLORS = [ROSE, GOLD, brand.white, PINK];

const Sky = () => (
  <Layer>
    <defs>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation={6} result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    {Array.from({ length: 60 }, (_, i) => (
      <circle
        key={`star-${i}`}
        cx={random(`star-x-${i}`) * POST.width}
        cy={random(`star-y-${i}`) * POST.height}
        r={1.5 + random(`star-r-${i}`) * 2.5}
        fill={brand.white}
        opacity={0.2 + random(`star-o-${i}`) * 0.5}
      />
    ))}
    {FIREWORKS.map((firework) => (
      <Trail key={`t-${firework.cx}`} {...firework} />
    ))}
    {FIREWORKS.map((firework) => (
      <Burst key={firework.cx} {...firework} />
    ))}
    {Array.from({ length: 60 }, (_, i) => {
      const x = random(`c-x-${i}`) * POST.width;
      const y = random(`c-y-${i}`) * POST.height;
      if (x > 120 && x < 960 && y > 60 && y < 880) return null;
      return (
        <rect
          key={`c-${i}`}
          x={x}
          y={y}
          width={8 + random(`c-w-${i}`) * 8}
          height={18 + random(`c-h-${i}`) * 10}
          rx={3}
          transform={`rotate(${random(`c-r-${i}`) * 180} ${x} ${y})`}
          fill={CONFETTI_COLORS[i % CONFETTI_COLORS.length]}
          opacity={0.75}
        />
      );
    })}
    {SPARKLES.map((sparkle) => (
      <Sparkle key={`${sparkle.x}-${sparkle.y}`} {...sparkle} />
    ))}
  </Layer>
);

const SPARKLES = [
  { x: 330, y: 120, size: 22, color: GOLD },
  { x: 800, y: 180, size: 16, color: brand.white },
  { x: 70, y: 520, size: 18, color: brand.white },
  { x: 1000, y: 480, size: 24, color: GOLD },
  { x: 420, y: 1020, size: 20, color: brand.white },
  { x: 640, y: 960, size: 16, color: GOLD },
  { x: 990, y: 1280, size: 20, color: brand.white },
  { x: 60, y: 1290, size: 16, color: GOLD },
];

export const NewYear = () => (
  <AbsoluteFill
    style={{
      fontFamily: geist,
      background:
        "radial-gradient(ellipse 80% 45% at 50% 108%, rgba(175,26,68,0.7) 0%, rgba(175,26,68,0) 100%), linear-gradient(180deg, #170a11 0%, #0c090b 55%, #14070d 100%)",
    }}
  >
    <Sky />
    <Greeting
      top={80}
      size={190}
      headline={
        <>
          <div>Srečno</div>
          <div
            style={{
              fontSize: 250,
              color: ROSE,
              textShadow: "0 0 48px rgba(255,111,151,0.45)",
            }}
          >
            2027!
          </div>
        </>
      }
      lead={
        <>
          Hvala za leto 2026.
          <br />
          Spet smo tu v ponedeljek, 4. januarja.
        </>
      }
    />
  </AbsoluteFill>
);
