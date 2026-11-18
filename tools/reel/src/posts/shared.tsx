import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Img, Interactive, staticFile } from "remotion";
import { brand, geist, manrope } from "../brand";
import { Logo } from "../Logo";

/** Instagram feed post, 4:5. */
export const POST = { width: 1080, height: 1350 } as const;
/** Instagram / Facebook story, 9:16. The top ~250 px and bottom ~340 px sit under the app's UI. */
export const STORY = { width: 1080, height: 1920 } as const;

/** Side margin of every post, the same 88 px rhythm as the reels' 96 px at story size. */
export const PAD = 88;

export const ADDRESS = "Koroška cesta 4, Kranj";

/** White page in the website's type, with the logo footer pinned to the bottom. */
export const PostFrame = ({
  children,
  footer = true,
}: {
  readonly children: ReactNode;
  readonly footer?: boolean;
}) => (
  <AbsoluteFill style={{ backgroundColor: brand.white, fontFamily: geist }}>
    {children}
    {footer ? <Footer /> : null}
  </AbsoluteFill>
);

/** Logo on the left, address on the right, above a hairline like the site footer. */
export const Footer = ({ bottom = 72 }: { readonly bottom?: number }) => (
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
      borderTop: `3px solid ${brand.surface}`,
    }}
  >
    <Logo height={58} />
    <Interactive.Div
      name="Address"
      style={{ fontSize: 32, lineHeight: 1.2, color: brand.muted }}
    >
      {ADDRESS}
    </Interactive.Div>
  </div>
);

/** Manrope 800 headline, one line per child. Wrap the crimson words in `<Accent>`. */
export const Headline = ({
  children,
  size,
  style,
}: {
  readonly children: ReactNode;
  readonly size: number;
  readonly style?: CSSProperties;
}) => (
  <Interactive.Div
    name="Headline"
    style={{
      fontFamily: manrope,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 1.06,
      letterSpacing: "-0.04em",
      color: brand.ink,
      ...style,
    }}
  >
    {children}
  </Interactive.Div>
);

export const Accent = ({ children }: { readonly children: ReactNode }) => (
  <span style={{ color: brand.primary }}>{children}</span>
);

/** Geist body line under a headline. */
export const Lead = ({
  children,
  style,
}: {
  readonly children: ReactNode;
  readonly style?: CSSProperties;
}) => (
  <Interactive.Div
    name="Lead"
    style={{
      fontSize: 40,
      lineHeight: 1.35,
      color: brand.body,
      ...style,
    }}
  >
    {children}
  </Interactive.Div>
);

/** The reel's "Zdaj na spletu" badge, in crimson for campaigns. */
export const Badge = ({
  children,
  tone = "primary",
}: {
  readonly children: ReactNode;
  readonly tone?: "primary" | "live";
}) => {
  const color = tone === "live" ? brand.live : brand.primary;
  const tint =
    tone === "live" ? "rgba(34,197,94,0.2)" : "rgba(175,26,68,0.1)";

  return (
    <Interactive.Div
      name="Badge"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        alignSelf: "flex-start",
        padding: "16px 26px",
        borderRadius: 20,
        border: `3px solid ${tint}`,
        backgroundColor: tint,
        fontSize: 36,
        lineHeight: 1.2,
        fontWeight: 500,
        color: tone === "live" ? brand.body : brand.primary,
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: 9,
          backgroundColor: color,
        }}
      />
      {children}
    </Interactive.Div>
  );
};

/**
 * A product shot from apps/webshop/public. They sit on near-white (248–254), which shows
 * as a grey box on the page's pure white: the 3 % lift clips it to white and `multiply`
 * blends what is left (the soft shadow) into the page.
 */
export const Photo = ({
  src,
  style,
}: {
  readonly src: string;
  readonly style?: CSSProperties;
}) => (
  <Img
    src={staticFile(src)}
    style={{ mixBlendMode: "multiply", filter: "brightness(1.03)", ...style }}
  />
);

/** A full photograph (the process shots), as a rounded card like the site's process section. */
export const PhotoCard = ({
  src,
  style,
}: {
  readonly src: string;
  readonly style?: CSSProperties;
}) => (
  <Img
    src={staticFile(src)}
    style={{ objectFit: "cover", borderRadius: 32, ...style }}
  />
);

/** "Pred" / "Po" label for before/after slides. */
export const StateChip = ({ state }: { readonly state: "Pred" | "Po" }) => (
  <Interactive.Div
    name={`${state} chip`}
    style={{
      padding: "12px 28px",
      borderRadius: 999,
      fontFamily: manrope,
      fontWeight: 800,
      fontSize: 38,
      letterSpacing: "-0.02em",
      color: state === "Po" ? brand.primaryForeground : brand.ink,
      backgroundColor: state === "Po" ? brand.primary : brand.surface,
    }}
  >
    {state}
  </Interactive.Div>
);

/** Instagram-style photo tag: a dark bubble with a pointer, for the tag-a-friend posts. */
export const TagBubble = ({
  children,
  style,
}: {
  readonly children: ReactNode;
  readonly style?: CSSProperties;
}) => (
  <Interactive.Div
    name="Tag bubble"
    style={{
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      filter: "drop-shadow(0px 12px 24px rgba(0,0,0,0.18))",
      ...style,
    }}
  >
    <div
      style={{
        width: 0,
        height: 0,
        borderLeft: "18px solid transparent",
        borderRight: "18px solid transparent",
        borderBottom: `18px solid ${brand.ink}`,
      }}
    />
    <div
      style={{
        padding: "18px 30px",
        borderRadius: 18,
        backgroundColor: brand.ink,
        color: brand.white,
        fontSize: 40,
        fontWeight: 600,
        lineHeight: 1.1,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  </Interactive.Div>
);
