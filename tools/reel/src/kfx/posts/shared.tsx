import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Interactive } from "remotion";
import { inter, kfx, LOGO_SLANT } from "../brand";
import { BLACK, CRIMSON, kf, LOGO_VIEWBOX, xBlade, xLock } from "../logoPaths";

/**
 * Building blocks for KFX feed posts and stories, in the reels' type (Inter) and colours.
 * Facts on the posts come from kfxservis.si (krgofix/apps/webshop/constants.ts and the /servis page).
 */

/** Instagram feed post, 4:5. */
export const POST = { width: 1080, height: 1350 } as const;
/** Instagram / Facebook story, 9:16. The top ~250 px and bottom ~340 px sit under the app's UI. */
export const STORY = { width: 1080, height: 1920 } as const;

/** Side margin, the same rhythm as the Kranfix posts. */
export const PAD = 88;

/** `CONTACTS` in krgofix/apps/webshop/constants.ts. */
export const STREET = "Drulovka 51";
export const CITY = "4000 Kranj";
export const PHONE = "+386 70 646 482";
export const DOMAIN = "kfxservis.si";
export const INSTAGRAM = "@kfx_kranj";
export const HOURS = [
  { days: "Pon–Pet", time: "9:00 – 16:00" },
  { days: "Sob", time: "9:00 – 12:00" },
  { days: "Ned", time: "Zaprto" },
] as const;

export type Theme = "light" | "dark";

export const palette = (theme: Theme) =>
  theme === "dark"
    ? {
        bg: kfx.footer,
        ink: kfx.primaryForeground,
        body: kfx.footerMuted,
        muted: "#a3a3a3",
        line: "#2e2e2e",
        card: "#242424",
      }
    : {
        bg: kfx.white,
        ink: kfx.ink,
        body: kfx.body,
        muted: kfx.muted,
        line: kfx.border,
        card: kfx.section,
      };

/** The KFX logo (logo-primary.svg). On dark backgrounds the X turns white, as in logo-white.svg. */
export const KfxLogo = ({
  height,
  theme = "light",
}: {
  readonly height: number;
  readonly theme?: Theme;
}) => {
  const x = theme === "dark" ? kfx.white : BLACK;
  return (
    <svg
      width={(LOGO_VIEWBOX.width / LOGO_VIEWBOX.height) * height}
      height={height}
      viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
      style={{ display: "block", flexShrink: 0 }}
    >
      <path d={kf} fill={CRIMSON} />
      <path d={xBlade} fill={x} />
      <path d={xLock} fill={x} />
    </svg>
  );
};

/** Page in the given theme with the logo footer pinned to the bottom. */
export const PostFrame = ({
  children,
  theme = "light",
  footer = true,
  footerRight = `${STREET}, Kranj`,
}: {
  readonly children: ReactNode;
  readonly theme?: Theme;
  readonly footer?: boolean;
  readonly footerRight?: ReactNode;
}) => (
  <AbsoluteFill
    style={{ backgroundColor: palette(theme).bg, fontFamily: inter }}
  >
    {children}
    {footer ? <Footer theme={theme} right={footerRight} /> : null}
  </AbsoluteFill>
);

/** Logo on the left, address (or a page count) on the right, above a hairline. */
export const Footer = ({
  theme = "light",
  right,
  bottom = 64,
}: {
  readonly theme?: Theme;
  readonly right: ReactNode;
  readonly bottom?: number;
}) => (
  <div
    style={{
      position: "absolute",
      left: PAD,
      right: PAD,
      bottom,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 28,
      borderTop: `3px solid ${palette(theme).line}`,
    }}
  >
    <KfxLogo height={46} theme={theme} />
    <Interactive.Div
      name="Footer text"
      style={{
        fontSize: 30,
        fontWeight: 500,
        lineHeight: 1.2,
        color: palette(theme).muted,
      }}
    >
      {right}
    </Interactive.Div>
  </div>
);

/** Inter 800 headline. Wrap the crimson words in `<Accent>`. */
export const Headline = ({
  children,
  size,
  theme = "light",
  style,
}: {
  readonly children: ReactNode;
  readonly size: number;
  readonly theme?: Theme;
  readonly style?: CSSProperties;
}) => (
  <Interactive.Div
    name="Headline"
    style={{
      fontWeight: 800,
      fontSize: size,
      lineHeight: 1.04,
      letterSpacing: "-0.045em",
      color: palette(theme).ink,
      ...style,
    }}
  >
    {children}
  </Interactive.Div>
);

export const Accent = ({ children }: { readonly children: ReactNode }) => (
  <span style={{ color: kfx.primary }}>{children}</span>
);

/** Body line under a headline. */
export const Lead = ({
  children,
  theme = "light",
  style,
}: {
  readonly children: ReactNode;
  readonly theme?: Theme;
  readonly style?: CSSProperties;
}) => (
  <Interactive.Div
    name="Lead"
    style={{
      fontWeight: 500,
      fontSize: 40,
      lineHeight: 1.35,
      letterSpacing: "-0.01em",
      color: palette(theme).body,
      ...style,
    }}
  >
    {children}
  </Interactive.Div>
);

/** The service page's crimson label ("CERTIFICIRAN SERVIS"). */
export const Label = ({
  children,
  style,
}: {
  readonly children: ReactNode;
  readonly style?: CSSProperties;
}) => (
  <Interactive.Div
    name="Label"
    style={{
      alignSelf: "flex-start",
      padding: "12px 22px",
      borderRadius: 12,
      backgroundColor: kfx.primary,
      color: kfx.white,
      fontWeight: 600,
      fontSize: 28,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      ...style,
    }}
  >
    {children}
  </Interactive.Div>
);

/** Crimson tile with a white icon, as on the service page's info bar. */
export const IconTile = ({
  children,
  size = 88,
  radius = 20,
}: {
  readonly children: ReactNode;
  readonly size?: number;
  readonly radius?: number;
}) => (
  <div
    style={{
      width: size,
      height: size,
      flexShrink: 0,
      borderRadius: radius,
      backgroundColor: kfx.primary,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {children}
  </div>
);

/**
 * Speed lines with the logo's slant at both ends: the KFX motif. Anchored to the right edge by default,
 * so they look like they've just shot in from off-frame.
 */
export const SpeedLines = ({
  style,
  lines = [
    { width: 420, height: 18, color: kfx.primary, offset: 0 },
    { width: 280, height: 10, color: kfx.primary, offset: 70 },
    { width: 180, height: 6, color: "#a3a3a3", offset: 30 },
  ],
}: {
  readonly style?: CSSProperties;
  readonly lines?: readonly {
    readonly width: number;
    readonly height: number;
    readonly color: string;
    readonly offset: number;
  }[];
}) => (
  <div
    style={{
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 18,
      ...style,
    }}
  >
    {lines.map((line, index) => {
      const run = line.height * LOGO_SLANT;
      return (
        <div
          key={index}
          style={{
            width: line.width,
            height: line.height,
            marginRight: line.offset,
            backgroundColor: line.color,
            clipPath: `polygon(${run}px 0, 100% 0, calc(100% - ${run}px) 100%, 0 100%)`,
          }}
        />
      );
    })}
  </div>
);

/** "1/5"-style page marker for carousels. */
export const pageOf = (page: number, of: number) => `${page}/${of}`;
