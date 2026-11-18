import type { ReactNode } from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { brand, geist, manrope } from "../brand";
import { clamp } from "../location/shared";
import { Logo } from "../Logo";

/**
 * kranfix.si's booking pages (buyback, repairs) as drawn inside the reels' phone: the logo, the
 * step bar, and the site's cards and taps. Type is set larger than on the site so it reads in a video.
 */
export const INK = "#171717";
export const MUTED = "#737373";
export const LINE = "#e5e5e5";
export const RED = brand.primary;
/** The tint of a selected card on the site. */
export const SELECTED = "rgba(175,26,68,0.07)";

/** The page is laid out at 1/ZOOM of the phone screen and scaled up; checked to fit the longest step. */
const ZOOM = 1.18;

/** The site's step bar (components/*\/step-bar.tsx). */
const StepBar = ({
  steps,
  active,
}: {
  readonly steps: readonly string[];
  readonly active: number;
}) => (
  <div
    style={{
      position: "absolute",
      top: 122,
      left: 24,
      right: 24,
      display: "flex",
      gap: 6,
    }}
  >
    {steps.map((label, i) => (
      <div
        key={label}
        style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}
      >
        <div
          style={{
            height: 5,
            borderRadius: 3,
            backgroundColor: i <= active ? RED : LINE,
          }}
        />
        <div
          style={{
            fontSize: 14,
            fontWeight: i === active ? 600 : 400,
            color: i === active ? INK : MUTED,
          }}
        >
          {label}
        </div>
      </div>
    ))}
  </div>
);

/** White page with the site logo and step bar; content starts under them. */
export const SitePage = ({
  steps,
  active,
  children,
}: {
  readonly steps: readonly string[];
  readonly active: number;
  readonly children: ReactNode;
}) => (
  <AbsoluteFill
    style={{ backgroundColor: "#fff", fontFamily: geist, color: INK }}
  >
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: `${100 / ZOOM}%`,
        height: `${100 / ZOOM}%`,
        scale: String(ZOOM),
        transformOrigin: "0 0",
      }}
    >
      <div style={{ position: "absolute", top: 64, left: 24 }}>
        <Logo height={34} />
      </div>
      <StepBar steps={steps} active={active} />
      <div style={{ position: "absolute", top: 196, left: 24, right: 24 }}>
        {children}
      </div>
    </div>
  </AbsoluteFill>
);

/** A finger tap at page point (x, y), at frame `at`: a ring that grows and fades. */
export const Tap = ({
  t,
  at,
  x,
  y,
}: {
  readonly t: number;
  readonly at: number;
  readonly x: number;
  readonly y: number;
}) => (
  <div
    style={{
      position: "absolute",
      left: x - 36,
      top: y - 36,
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: "rgba(23,23,23,0.18)",
      border: "3px solid rgba(23,23,23,0.3)",
      scale: String(interpolate(t, [at, at + 12], [0.5, 1.3], clamp)),
      opacity: interpolate(t, [at, at + 2, at + 12], [0, 1, 0], clamp),
      pointerEvents: "none",
    }}
  />
);

export const Title = ({ children }: { readonly children: ReactNode }) => (
  <div
    style={{
      fontFamily: manrope,
      fontWeight: 700,
      fontSize: 32,
      lineHeight: 1.15,
      letterSpacing: "-0.02em",
    }}
  >
    {children}
  </div>
);

export const Label = ({
  children,
  color = RED,
}: {
  readonly children: ReactNode;
  readonly color?: string;
}) => <div style={{ fontSize: 18, fontWeight: 600, color }}>{children}</div>;

/** An option card (device, repair, part, speed, hand-over): title, line, optional price. */
export const OptionCard = ({
  title,
  text,
  price,
  selected,
  compact,
}: {
  readonly title: string;
  readonly text?: string;
  readonly price?: string;
  readonly selected?: boolean;
  readonly compact?: boolean;
}) => (
  <div
    style={{
      padding: compact ? "12px 16px" : "16px 20px",
      borderRadius: 16,
      border: `2px solid ${selected ? RED : LINE}`,
      backgroundColor: selected ? SELECTED : "#fff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12,
    }}
  >
    <div style={{ minWidth: 0 }}>
      <div
        style={{
          fontFamily: manrope,
          fontWeight: 700,
          fontSize: compact ? 22 : 24,
        }}
      >
        {title}
      </div>
      {text ? (
        <div
          style={{ marginTop: 4, fontSize: 17, lineHeight: 1.3, color: MUTED }}
        >
          {text}
        </div>
      ) : null}
    </div>
    {price ? (
      <div style={{ flex: "none", fontSize: 20, fontWeight: 600, color: INK }}>
        {price}
      </div>
    ) : null}
  </div>
);
