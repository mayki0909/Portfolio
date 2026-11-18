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
/** The white-hot head of a burning star. */
const HOT = "#fff6e8";

type Firework = {
  readonly cx: number;
  readonly cy: number;
  readonly r: number;
  readonly color: string;
  readonly inner: string;
  readonly rays: number;
  /** A willow's stars fall in long, thin golden arcs; a peony (the default) keeps its round shape. */
  readonly kind?: "peony" | "willow";
  /** Where its rocket left the ground; no trail if absent. */
  readonly from?: number;
};

type Point = { readonly x: number; readonly y: number };

/**
 * Where one star flies: thrown out from the centre at `angle` and pulled down by `gravity`
 * (in burst radii), sampled from `t0` (the faint end of its tail) to 1 (its head).
 */
const flight = (
  centre: Point,
  reach: number,
  angle: number,
  gravity: number,
  t0: number,
): Point[] =>
  Array.from({ length: 13 }, (_, k) => {
    const t = t0 + ((1 - t0) * k) / 12;
    return {
      x: centre.x + Math.cos(angle) * reach * t,
      y: centre.y + Math.sin(angle) * reach * t + 0.5 * gravity * reach * t * t,
    };
  });

/** A ribbon along the points, a hair at the tail and `width` at the head, as one closed path. */
const ribbon = (points: readonly Point[], width: number) => {
  const last = points.length - 1;
  const side = (sign: number) =>
    points.map((p, k) => {
      const a = points[Math.max(0, k - 1)];
      const b = points[Math.min(last, k + 1)];
      const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
      const half = (width / 2) * (0.1 + 0.9 * (k / last) ** 1.4) * sign;
      return `${(p.x - ((b.y - a.y) / len) * half).toFixed(1)},${(p.y + ((b.x - a.x) / len) * half).toFixed(1)}`;
    });
  return `M${side(1).join(" L")} L${side(-1).reverse().join(" L")} Z`;
};

/** One star: a tapered tail that fades in towards a white-hot head with a coloured halo. */
const Streak = ({
  id,
  points,
  color,
  width,
  head = 1,
}: {
  readonly id: string;
  readonly points: readonly Point[];
  readonly color: string;
  readonly width: number;
  /** Size of the head against the tail; willow stars have almost burnt out. */
  readonly head?: number;
}) => {
  const tail = points[0];
  const tip = points[points.length - 1];

  return (
    <g>
      <linearGradient
        id={id}
        gradientUnits="userSpaceOnUse"
        x1={tail.x}
        y1={tail.y}
        x2={tip.x}
        y2={tip.y}
      >
        <stop offset="0" stopColor={color} stopOpacity={0} />
        <stop offset="0.55" stopColor={color} stopOpacity={0.55} />
        <stop offset="1" stopColor={HOT} stopOpacity={1} />
      </linearGradient>
      <path d={ribbon(points, width)} fill={`url(#${id})`} />
      {head > 0 ? (
        <>
          <circle cx={tip.x} cy={tip.y} r={width * 1.25 * head} fill={color} opacity={0.5} />
          <circle cx={tip.x} cy={tip.y} r={width * 0.62 * head} fill={HOT} />
        </>
      ) : null}
    </g>
  );
};

/**
 * One burst, drawn like a real shell: a soft light on the sky, an outer ring of stars that droop
 * as they fall, an inner ring in a second colour, a flash at the centre and crackling glitter.
 */
const Burst = ({ cx, cy, r, color, inner, rays, kind = "peony" }: Firework) => {
  const key = `${cx}-${cy}`;
  const willow = kind === "willow";
  const width = Math.max(4, r * (willow ? 0.03 : 0.052));
  const innerRays = Math.round(rays * 0.6);

  return (
    <g>
      <radialGradient id={`bloom-${key}`}>
        <stop offset="0" stopColor={color} stopOpacity={0.3} />
        <stop offset="0.5" stopColor={color} stopOpacity={0.08} />
        <stop offset="1" stopColor={color} stopOpacity={0} />
      </radialGradient>
      <radialGradient id={`flash-${key}`}>
        <stop offset="0" stopColor={HOT} stopOpacity={0.95} />
        <stop offset="0.4" stopColor={inner} stopOpacity={0.5} />
        <stop offset="1" stopColor={inner} stopOpacity={0} />
      </radialGradient>
      <circle cx={cx} cy={cy + r * 0.15} r={r * 1.7} fill={`url(#bloom-${key})`} />
      <g filter="url(#glow)">
        {Array.from({ length: rays }, (_, i) => {
          const angle = (i / rays) * Math.PI * 2 + (random(`a-${key}-${i}`) - 0.5) * 0.12;
          const reach = r * (0.82 + random(`l-${key}-${i}`) * 0.18);
          return (
            <Streak
              key={i}
              id={`s-${key}-${i}`}
              points={flight({ x: cx, y: cy }, reach, angle, willow ? 1.15 : 0.34, willow ? 0.04 : 0.22)}
              color={color}
              width={width}
              head={willow ? 0.45 : 1}
            />
          );
        })}
        {willow
          ? null
          : Array.from({ length: innerRays }, (_, i) => {
              const angle = ((i + 0.5) / innerRays) * Math.PI * 2;
              return (
                <Streak
                  key={`in-${i}`}
                  id={`si-${key}-${i}`}
                  points={flight({ x: cx, y: cy }, r * 0.52, angle, 0.2, 0.3)}
                  color={inner}
                  width={width * 0.8}
                />
              );
            })}
        <circle cx={cx} cy={cy} r={r * 0.24} fill={`url(#flash-${key})`} />
        {Array.from({ length: Math.round(rays * 1.3) }, (_, i) => {
          const angle = random(`g-a-${key}-${i}`) * Math.PI * 2;
          const t = 0.55 + random(`g-d-${key}-${i}`) * 0.7;
          const fall = willow ? 1.15 : 0.34;
          const x = cx + Math.cos(angle) * r * t;
          const y = cy + Math.sin(angle) * r * t + 0.5 * fall * r * t * t;
          return (
            <circle
              key={`g-${i}`}
              cx={x}
              cy={y}
              r={1.4 + random(`g-r-${key}-${i}`) * 2.6}
              fill={i % 3 === 0 ? color : HOT}
              opacity={0.45 + random(`g-o-${key}-${i}`) * 0.55}
            />
          );
        })}
      </g>
    </g>
  );
};

/** The rocket's climb: a tapered, curving spark trail that fades out towards the ground. */
const Trail = ({ cx, cy, r, color, from }: Firework) => {
  if (from === undefined) return null;
  const key = `${cx}-${cy}`;
  const bottom = POST.height + 10;
  const end = { x: cx, y: cy + r * 0.12 };
  const bend = (from + cx) / 2 + 40;
  const points = Array.from({ length: 25 }, (_, k) => {
    const t = k / 24;
    const u = 1 - t;
    return {
      x: u * u * from + 2 * u * t * bend + t * t * end.x,
      y: u * u * bottom + 2 * u * t * ((bottom + end.y) / 2) + t * t * end.y,
    };
  });

  return (
    <g filter="url(#glow)">
      {/* Dimmer than the stars, so the climb does not read as one more streak of the burst. */}
      <linearGradient
        id={`trail-${key}`}
        gradientUnits="userSpaceOnUse"
        x1={0}
        y1={bottom}
        x2={0}
        y2={end.y}
      >
        <stop offset="0" stopColor={color} stopOpacity={0} />
        <stop offset="0.8" stopColor={color} stopOpacity={0.45} />
        <stop offset="1" stopColor={color} stopOpacity={0.1} />
      </linearGradient>
      <path d={ribbon(points, 4.5)} fill={`url(#trail-${key})`} />
      {points.slice(4).map((p, k) => (
        <circle
          key={k}
          cx={p.x + (random(`tx-${key}-${k}`) - 0.5) * 26}
          cy={p.y + (random(`ty-${key}-${k}`) - 0.5) * 18}
          r={1.2 + random(`tr-${key}-${k}`) * 2}
          fill={HOT}
          opacity={(k / points.length) * 0.9}
        />
      ))}
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
  { cx: 118, cy: 290, r: 110, color: ROSE, inner: brand.white, rays: 22 },
  { cx: 955, cy: 250, r: 130, color: GOLD, inner: ROSE, rays: 24 },
  { cx: 215, cy: 1060, r: 175, color: GOLD, inner: GOLD, rays: 30, kind: "willow", from: 330 },
  { cx: 845, cy: 1075, r: 186, color: ROSE, inner: GOLD, rays: 30, from: 700 },
  { cx: 535, cy: 1220, r: 78, color: brand.white, inner: ROSE, rays: 16, from: 520 },
  { cx: 812, cy: 66, r: 46, color: brand.white, inner: GOLD, rays: 14 },
  { cx: 1020, cy: 690, r: 64, color: brand.white, inner: ROSE, rays: 14 },
  { cx: 58, cy: 720, r: 58, color: GOLD, inner: brand.white, rays: 14 },
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
