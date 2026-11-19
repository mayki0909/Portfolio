import { AbsoluteFill, random } from "remotion";
import { dmSans, dolium } from "../../brand";
import { barrel, steamWisps } from "../../logoPaths";
import { DoliumLogo, Headline, Lead, PAD, Soft } from "../shared";

/**
 * The Christmas (24 Dec) and New Year (30 Dec) cards: full bleed on the reels' night violet instead of the
 * light page, the logo on top. Christmas hangs baubles, sets the logo's barrel in the middle and stands
 * presents in the snow. New Year uses the same kind of shells as the Kranfix card: tapered streaks with
 * white-hot heads, a falling willow, confetti and sparkles, in gold and rose on the night violet. Snow,
 * stars and sparks are SVG placed with Remotion's seeded `random()`, so every render is the same.
 */

const W = 1080;
const H = 1350;
/** Warm light for the New Year sparks, and a quieter gold for Christmas ribbons. Not site colours. */
const EMBER = "#f2c88f";
const GOLD = "#e6c58a";

const Sky = ({ glowY }: { readonly glowY: number }) => (
  <AbsoluteFill
    style={{
      backgroundColor: dolium.night,
      backgroundImage: `radial-gradient(ellipse 70% 45% at 50% ${glowY}%, rgba(93, 90, 136, 0.55) 0%, rgba(18, 16, 25, 0) 100%)`,
    }}
  />
);

const Stars = ({
  seed,
  count,
  maxY,
}: {
  readonly seed: string;
  readonly count: number;
  readonly maxY: number;
}) => (
  <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
    {Array.from({ length: count }, (_, i) => (
      <circle
        key={i}
        cx={random(`${seed}-x-${i}`) * W}
        cy={random(`${seed}-y-${i}`) * maxY}
        r={0.8 + random(`${seed}-r-${i}`) * 1.8}
        fill={dolium.primaryLight}
        opacity={0.25 + random(`${seed}-o-${i}`) * 0.55}
      />
    ))}
  </svg>
);

/** Soft snowflakes, kept out of the boxes in `avoid` (logo and text). */
const Snow = ({
  seed,
  count,
  avoid,
}: {
  readonly seed: string;
  readonly count: number;
  readonly avoid: readonly { x: number; y: number; w: number; h: number }[];
}) => (
  <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
    {Array.from({ length: count }, (_, i) => {
      const x = random(`${seed}-x-${i}`) * W;
      const y = random(`${seed}-y-${i}`) * H;
      const inside = avoid.some(
        (box) =>
          x > box.x && x < box.x + box.w && y > box.y && y < box.y + box.h,
      );
      if (inside) return null;
      const size = random(`${seed}-s-${i}`);
      return (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={2 + size * 6}
          fill="#ffffff"
          opacity={0.25 + size * 0.55}
        />
      );
    })}
  </svg>
);

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
    stroke={dolium.primaryLight}
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

/** Kept off the logo and the greeting. */
const SNOWFLAKES = [
  { x: 90, y: 430, size: 64, rotate: 12, opacity: 0.55 },
  { x: 990, y: 400, size: 72, rotate: 28, opacity: 0.5 },
  { x: 160, y: 620, size: 40, rotate: 6, opacity: 0.4 },
  { x: 930, y: 680, size: 46, rotate: 20, opacity: 0.38 },
  { x: 70, y: 860, size: 34, rotate: 40, opacity: 0.32 },
  { x: 1010, y: 900, size: 38, rotate: 8, opacity: 0.32 },
];

/** A bauble on a string from the top edge, with a band and a highlight. */
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
        stroke="rgba(236, 239, 249, 0.55)"
        strokeWidth={3}
      />
      <clipPath id={id}>
        <circle cx={x} cy={cy} r={r} />
      </clipPath>
      <circle cx={x} cy={cy} r={r} fill={color} />
      <g clipPath={`url(#${id})`}>
        <rect x={x - r} y={cy - r * 0.14} width={r * 2} height={r * 0.28} fill={band} />
        <circle cx={x + r * 0.32} cy={cy + r * 0.38} r={r} fill="rgba(18, 16, 25, 0.12)" />
      </g>
      <ellipse
        cx={x - r * 0.36}
        cy={cy - r * 0.4}
        rx={r * 0.2}
        ry={r * 0.12}
        transform={`rotate(-35 ${x - r * 0.36} ${cy - r * 0.4})`}
        fill="rgba(255,255,255,0.7)"
      />
      <rect x={x - 11} y={length} width={22} height={18} rx={4} fill={dolium.secondaryLight} />
    </g>
  );
};

const ORNAMENTS = [
  { x: 78, length: 96, r: 40, color: dolium.primaryLight, band: GOLD },
  { x: 214, length: 230, r: 28, color: GOLD, band: dolium.primaryDark },
  { x: 866, length: 190, r: 34, color: dolium.white, band: dolium.primaryDark },
  { x: 1002, length: 78, r: 44, color: dolium.primaryLight, band: GOLD },
];

type Gift = {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
  readonly body: string;
  readonly ribbon: string;
  readonly cross?: boolean;
};

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
      <path d={shade} fill="rgba(18, 16, 25, 0.16)" />
      <path d={shade} fill="rgba(18, 16, 25, 0.16)" transform="scale(-1 1)" />
      <ellipse cx={0} cy={0} rx={18} ry={15} />
    </g>
  );
};

const Present = ({ gift }: { readonly gift: Gift }) => {
  const { x, y, w, h, body, ribbon, cross } = gift;
  const lid = Math.min(48, Math.max(32, h * 0.16));
  const band = Math.max(22, w * 0.14);
  const cx = x + w / 2;
  return (
    <g>
      <rect x={x + 10} y={y + lid + 8} width={w} height={h - lid} rx={6} fill="rgba(18, 16, 25, 0.28)" />
      <rect x={x} y={y + lid} width={w} height={h - lid} rx={6} fill={body} />
      <rect x={x + w * 0.78} y={y + lid} width={w * 0.22} height={h - lid} fill="rgba(18, 16, 25, 0.08)" />
      <rect x={cx - band / 2} y={y + lid} width={band} height={h - lid} fill={ribbon} />
      {cross ? (
        <rect
          x={x}
          y={y + lid + (h - lid) * 0.42}
          width={w}
          height={band * 0.85}
          fill={ribbon}
        />
      ) : null}
      <rect x={x - 12} y={y} width={w + 24} height={lid} rx={8} fill={body} />
      <rect x={x - 12} y={y + lid - 8} width={w + 24} height={8} fill="rgba(18, 16, 25, 0.12)" />
      <rect x={cx - band / 2} y={y} width={band} height={lid} fill={ribbon} />
      <Bow x={cx} y={y + 2} scale={Math.min(0.95, Math.max(0.48, w / 340))} color={ribbon} />
    </g>
  );
};

/** Back row first, so the front boxes overlap it. The middle is left open for the logo barrel. */
const GIFTS: readonly Gift[] = [
  { x: 28, y: 1020, w: 188, h: 250, body: "#2a2640", ribbon: GOLD, cross: true },
  { x: 860, y: 1008, w: 190, h: 246, body: dolium.primaryDark, ribbon: dolium.primaryLight },
  { x: 8, y: 1164, w: 160, h: 150, body: dolium.white, ribbon: GOLD },
  { x: 168, y: 1176, w: 132, h: 128, body: "#3d3858", ribbon: dolium.primaryLight, cross: true },
  { x: 780, y: 1168, w: 150, h: 140, body: GOLD, ribbon: "#2a2640" },
  { x: 920, y: 1148, w: 140, h: 160, body: dolium.white, ribbon: dolium.primaryDark, cross: true },
];

/** The logo's barrel and its steam, large, in the open middle above the presents. */
const LogoBarrel = () => {
  const width = 340;
  const view = { x: -1, y: -1, w: 33, h: 53 };
  return (
    <svg
      width={width}
      height={(view.h / view.w) * width}
      viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
      style={{
        position: "absolute",
        left: "50%",
        top: 620,
        transform: "translateX(-50%)",
        overflow: "visible",
      }}
    >
      {[...barrel.paths, ...steamWisps.flatMap((wisp) => wisp.paths)].map((d) => (
        <path key={d} d={d} fill={dolium.primaryLight} />
      ))}
    </svg>
  );
};

const Presents = () => (
  <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }}>
    {GIFTS.map((gift) => (
      <Present key={gift.x} gift={gift} />
    ))}
    <path
      d={`M0 1260 C 160 1230, 300 1188, 500 1172 C 700 1156, 880 1196, ${W} 1244 L ${W} ${H} L 0 ${H} Z`}
      fill="#c9c6d8"
    />
    <path
      d={`M0 1284 C 180 1256, 340 1216, 540 1204 C 740 1192, 900 1228, ${W} 1268 L ${W} ${H} L 0 ${H} Z`}
      fill={dolium.primaryLight}
    />
  </svg>
);

export const ChristmasPost = () => (
  <AbsoluteFill style={{ fontFamily: dmSans }}>
    <Sky glowY={42} />
    <Stars seed="dolium-xmas-stars" count={80} maxY={900} />
    <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
      {ORNAMENTS.map((ornament) => (
        <Ornament key={ornament.x} {...ornament} />
      ))}
      {SNOWFLAKES.map((flake) => (
        <Snowflake key={`${flake.x}-${flake.y}`} {...flake} />
      ))}
    </svg>
    <LogoBarrel />
    <Presents />
    <Snow
      seed="dolium-xmas-snow"
      count={110}
      avoid={[
        { x: 300, y: 70, w: 480, h: 120 },
        { x: 220, y: 150, w: 640, h: 250 },
        { x: 360, y: 600, w: 360, h: 580 },
      ]}
    />
    <div
      style={{
        position: "absolute",
        top: 88,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <DoliumLogo height={76} color={dolium.primaryLight} />
    </div>
    <div
      style={{
        position: "absolute",
        left: PAD,
        right: PAD,
        top: 168,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Headline size={84} theme="dark">
        Vesel božič
        <br />
        <Soft style={{ whiteSpace: "nowrap" }}>in tople praznike.</Soft>
      </Headline>
      <Lead theme="dark" style={{ marginTop: 24 }}>
        Hvala za zaupanje v letu 2026.
      </Lead>
    </div>
  </AbsoluteFill>
);

/** Firework colours from the Dolium palette: violet shells and a lilac year on the night sky. */
const NY_LILAC = "#C9C6E8";
const NY_VIOLET = "#8A86B4";
const NY_HEAD = dolium.primaryLight;

type ShellBurst = {
  readonly cx: number;
  readonly cy: number;
  readonly r: number;
  readonly color: string;
  readonly inner: string;
  readonly rays: number;
  readonly kind?: "peony" | "willow";
  readonly from?: number;
};

type Point = { readonly x: number; readonly y: number };

/** One star's path: thrown out, then pulled down. Sampled from the faint tail to the head. */
const flight = (centre: Point, reach: number, angle: number, gravity: number, t0: number): Point[] =>
  Array.from({ length: 13 }, (_, k) => {
    const t = t0 + ((1 - t0) * k) / 12;
    return {
      x: centre.x + Math.cos(angle) * reach * t,
      y: centre.y + Math.sin(angle) * reach * t + 0.5 * gravity * reach * t * t,
    };
  });

/** A ribbon along the points, a hair at the tail and `width` at the head. */
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
  readonly head?: number;
}) => {
  const tail = points[0];
  const tip = points[points.length - 1];
  return (
    <g>
      <linearGradient id={id} gradientUnits="userSpaceOnUse" x1={tail.x} y1={tail.y} x2={tip.x} y2={tip.y}>
        <stop offset="0" stopColor={color} stopOpacity={0} />
        <stop offset="0.55" stopColor={color} stopOpacity={0.55} />
        <stop offset="1" stopColor={NY_HEAD} stopOpacity={1} />
      </linearGradient>
      <path d={ribbon(points, width)} fill={`url(#${id})`} />
      {head > 0 ? (
        <>
          <circle cx={tip.x} cy={tip.y} r={width * 1.25 * head} fill={color} opacity={0.5} />
          <circle cx={tip.x} cy={tip.y} r={width * 0.62 * head} fill={NY_HEAD} />
        </>
      ) : null}
    </g>
  );
};

const Burst = ({ cx, cy, r, color, inner, rays, kind = "peony" }: ShellBurst) => {
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
        <stop offset="0" stopColor={NY_HEAD} stopOpacity={0.95} />
        <stop offset="0.4" stopColor={inner} stopOpacity={0.5} />
        <stop offset="1" stopColor={inner} stopOpacity={0} />
      </radialGradient>
      <circle cx={cx} cy={cy + r * 0.15} r={r * 1.7} fill={`url(#bloom-${key})`} />
      <g filter="url(#ny-glow)">
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
              fill={i % 3 === 0 ? color : NY_HEAD}
              opacity={0.45 + random(`g-o-${key}-${i}`) * 0.55}
            />
          );
        })}
      </g>
    </g>
  );
};

const Trail = ({ cx, cy, r, color, from }: ShellBurst) => {
  if (from === undefined) return null;
  const key = `${cx}-${cy}`;
  const end = { x: cx, y: cy + r * 0.12 };
  const bend = (from + cx) / 2 + 40;
  const points = Array.from({ length: 25 }, (_, k) => {
    const t = k / 24;
    const u = 1 - t;
    return {
      x: u * u * from + 2 * u * t * bend + t * t * end.x,
      y: u * u * (H + 10) + 2 * u * t * ((H + 10 + end.y) / 2) + t * t * end.y,
    };
  });
  return (
    <g filter="url(#ny-glow)">
      <linearGradient id={`trail-${key}`} gradientUnits="userSpaceOnUse" x1={0} y1={H} x2={0} y2={end.y}>
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
          fill={NY_HEAD}
          opacity={(k / points.length) * 0.9}
        />
      ))}
    </g>
  );
};

const Sparkle = ({ x, y, size, color }: { readonly x: number; readonly y: number; readonly size: number; readonly color: string }) => (
  <path
    d={`M${x},${y - size} Q${x},${y} ${x + size},${y} Q${x},${y} ${x},${y + size} Q${x},${y} ${x - size},${y} Q${x},${y} ${x},${y - size} Z`}
    fill={color}
  />
);

/** Corners stay clear of the logo and the greeting. */
const FIREWORKS: readonly ShellBurst[] = [
  { cx: 130, cy: 280, r: 120, color: NY_VIOLET, inner: NY_HEAD, rays: 22 },
  { cx: 940, cy: 240, r: 140, color: NY_LILAC, inner: NY_VIOLET, rays: 24 },
  { cx: 200, cy: 1080, r: 180, color: NY_LILAC, inner: NY_VIOLET, rays: 30, kind: "willow", from: 320 },
  { cx: 860, cy: 1100, r: 190, color: NY_VIOLET, inner: NY_LILAC, rays: 30, from: 720 },
  { cx: 540, cy: 1240, r: 72, color: NY_HEAD, inner: NY_VIOLET, rays: 16 },
  { cx: 860, cy: 70, r: 48, color: NY_HEAD, inner: NY_LILAC, rays: 14 },
  { cx: 70, cy: 760, r: 58, color: NY_LILAC, inner: NY_HEAD, rays: 14 },
  { cx: 1020, cy: 700, r: 62, color: NY_HEAD, inner: NY_VIOLET, rays: 14 },
];

const CONFETTI = [NY_LILAC, NY_VIOLET, NY_HEAD, dolium.secondaryLight];

const SPARKLES = [
  { x: 340, y: 150, size: 18, color: NY_LILAC },
  { x: 760, y: 180, size: 14, color: NY_HEAD },
  { x: 80, y: 540, size: 16, color: NY_HEAD },
  { x: 1000, y: 500, size: 20, color: NY_LILAC },
  { x: 430, y: 1040, size: 16, color: NY_HEAD },
  { x: 660, y: 980, size: 14, color: NY_LILAC },
];



export const NewYearPost = () => (
  <AbsoluteFill
    style={{
      fontFamily: dmSans,
      background:
        "radial-gradient(ellipse 85% 48% at 50% 112%, rgba(138,134,180,0.62) 0%, rgba(93,90,136,0) 72%), linear-gradient(180deg, #121019 0%, #161322 58%, #1c1830 100%)",
    }}
  >
    <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
      <defs>
        <filter id="ny-glow" x="-50%" y="-50%" width="200%" height="200%">
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
          cx={random(`ny-star-x-${i}`) * W}
          cy={random(`ny-star-y-${i}`) * H}
          r={1.5 + random(`ny-star-r-${i}`) * 2.5}
          fill={dolium.white}
          opacity={0.2 + random(`ny-star-o-${i}`) * 0.5}
        />
      ))}
      {FIREWORKS.map((firework) => (
        <Trail key={`t-${firework.cx}`} {...firework} />
      ))}
      {FIREWORKS.map((firework) => (
        <Burst key={firework.cx} {...firework} />
      ))}
      {Array.from({ length: 54 }, (_, i) => {
        const x = random(`ny-c-x-${i}`) * W;
        const y = random(`ny-c-y-${i}`) * H;
        if (x > 160 && x < 920 && y > 150 && y < 760) return null;
        return (
          <rect
            key={`c-${i}`}
            x={x}
            y={y}
            width={8 + random(`ny-c-w-${i}`) * 8}
            height={16 + random(`ny-c-h-${i}`) * 12}
            rx={3}
            transform={`rotate(${random(`ny-c-r-${i}`) * 180} ${x} ${y})`}
            fill={CONFETTI[i % CONFETTI.length]}
            opacity={0.8}
          />
        );
      })}
      {SPARKLES.map((sparkle) => (
        <Sparkle key={`${sparkle.x}-${sparkle.y}`} {...sparkle} />
      ))}
    </svg>
    <div
      style={{
        position: "absolute",
        top: 72,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <DoliumLogo height={72} color={dolium.primaryLight} />
    </div>
    <div
      style={{
        position: "absolute",
        left: PAD,
        right: PAD,
        top: 250,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Headline size={168} theme="dark">
        Srečno
        <br />
        <Soft style={{ color: NY_LILAC, fontSize: 230, textShadow: "0 0 48px rgba(138,134,180,0.7)" }}>
          2027.
        </Soft>
      </Headline>
      <Lead theme="dark" style={{ marginTop: 28, color: "rgba(236,239,249,0.88)" }}>
        Naj bo novo leto toplo in sproščeno.
      </Lead>
    </div>
  </AbsoluteFill>
);
