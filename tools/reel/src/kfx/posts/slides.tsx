import type { ComponentType, ReactNode } from "react";
import { Interactive } from "remotion";
import hero from "../assets/hero.jpg";
import { kfx } from "../brand";
import { ArrowRightIcon, CalendarFoldIcon } from "../icons";
import { Snow } from "../Snow";
import { CroppedPhoto } from "./Photo";
import {
  DOMAIN,
  Headline,
  IconTile,
  Label,
  Lead,
  PAD,
  pageOf,
  palette,
  PostFrame,
} from "./shared";

/** Carousel slide layouts shared by the December posts, the same rhythm as the November battery carousel. */

type IconComponent = ComponentType<{
  size: number;
  color: string;
  strokeWidth?: number;
}>;

/** The site's hero scooter under the headline on the dark footer colour, optionally in falling snow. */
export const ScooterCover = ({
  label,
  title,
  lead,
  footerRight,
  snow = false,
}: {
  readonly label: string;
  readonly title: ReactNode;
  readonly lead: ReactNode;
  readonly footerRight: ReactNode;
  readonly snow?: boolean;
}) => {
  const theme = "dark";
  return (
    <PostFrame theme={theme} footerRight={footerRight}>
      <CroppedPhoto
        src={hero}
        sourceWidth={1440}
        sourceHeight={800}
        cropX={380}
        height={860}
        fadeTo={palette(theme).bg}
        fadeFrom={0.45}
      />
      {snow ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            maskImage:
              "linear-gradient(180deg, #000 0%, #000 42%, transparent 56%)",
          }}
        >
          <Snow count={60} seed={`cover-${label}`} opacity={0.7} />
        </div>
      ) : null}
      <div
        style={{
          position: "absolute",
          left: PAD,
          right: PAD,
          bottom: 210,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Label>{label}</Label>
        <Headline size={124} theme={theme} style={{ marginTop: 28 }}>
          {title}
        </Headline>
        <Lead theme={theme} style={{ marginTop: 28 }}>
          {lead}
        </Lead>
      </div>
    </PostFrame>
  );
};

/** A big crimson icon tile, the visual for a tip. */
export const IconVisual = ({ Icon }: { readonly Icon: IconComponent }) => (
  <IconTile size={200} radius={48}>
    <Icon size={110} color={kfx.white} />
  </IconTile>
);

/** A number or short figure set huge in crimson, the visual for a rule such as "15+" or "25 km/h". */
export const BigFigure = ({
  children,
  size = 260,
}: {
  readonly children: ReactNode;
  readonly size?: number;
}) => (
  <Interactive.Div
    name="Figure"
    style={{
      fontWeight: 800,
      fontSize: size,
      whiteSpace: "nowrap",
      lineHeight: 0.9,
      letterSpacing: "-0.06em",
      color: kfx.primary,
    }}
  >
    {children}
  </Interactive.Div>
);

/** One numbered tip: series name and number on top, the visual, then the tip itself. */
export const TipSlide = ({
  number,
  series,
  visual,
  title,
  body,
  footerRight,
  note,
}: {
  readonly number: number;
  readonly series: string;
  readonly visual: ReactNode;
  readonly title: ReactNode;
  readonly body: ReactNode;
  readonly footerRight: ReactNode;
  /** Small print under the body, such as a source. */
  readonly note?: ReactNode;
}) => (
  <PostFrame footerRight={footerRight}>
    <div
      style={{
        position: "absolute",
        top: 110,
        left: PAD,
        right: PAD,
        display: "flex",
        alignItems: "baseline",
        gap: 20,
      }}
    >
      <span
        style={{
          fontWeight: 800,
          fontSize: 44,
          letterSpacing: "-0.03em",
          color: kfx.primary,
        }}
      >
        {String(number).padStart(2, "0")}
      </span>
      <span style={{ fontWeight: 500, fontSize: 32, color: kfx.muted }}>
        {series}
      </span>
    </div>
    <div
      style={{
        position: "absolute",
        top: 230,
        left: PAD,
        right: PAD,
        height: 360,
        display: "flex",
        alignItems: "center",
      }}
    >
      {visual}
    </div>
    <div style={{ position: "absolute", top: 660, left: PAD, right: PAD }}>
      <Headline size={92}>{title}</Headline>
      <Lead style={{ marginTop: 28 }}>{body}</Lead>
      {note ? (
        <Interactive.Div
          name="Note"
          style={{
            marginTop: 24,
            fontWeight: 500,
            fontSize: 26,
            color: kfx.muted,
          }}
        >
          {note}
        </Interactive.Div>
      ) : null}
    </div>
  </PostFrame>
);

/** The site's "Rezerviraj termin" button, static. */
export const BookButton = ({
  children = "Rezerviraj termin",
}: {
  readonly children?: ReactNode;
}) => (
  <Interactive.Div
    name="Button"
    style={{
      alignSelf: "flex-start",
      display: "flex",
      alignItems: "center",
      gap: 22,
      padding: "32px 48px",
      borderRadius: 22,
      backgroundColor: kfx.primary,
      color: kfx.primaryForeground,
      fontWeight: 600,
      fontSize: 46,
    }}
  >
    <CalendarFoldIcon size={48} color={kfx.primaryForeground} />
    {children}
    <ArrowRightIcon size={44} color={kfx.primaryForeground} />
  </Interactive.Div>
);

/** Closing slide on the dark footer colour: a question, the answer, and the booking button. */
export const BookCta = ({
  label = "Servis KFX",
  title,
  lead,
  footerRight,
  link = `${DOMAIN}/servis`,
}: {
  readonly label?: string;
  readonly title: ReactNode;
  readonly lead: ReactNode;
  readonly footerRight: ReactNode;
  readonly link?: string;
}) => {
  const theme = "dark";
  return (
    <PostFrame theme={theme} footerRight={footerRight}>
      <div
        style={{
          position: "absolute",
          top: 140,
          left: PAD,
          right: PAD,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Label>{label}</Label>
        <Headline size={124} theme={theme} style={{ marginTop: 28 }}>
          {title}
        </Headline>
        <Lead theme={theme} style={{ marginTop: 36 }}>
          {lead}
        </Lead>
        <div style={{ marginTop: 72, display: "flex" }}>
          <BookButton />
        </div>
        <Interactive.Div
          name="Link"
          style={{
            marginTop: 28,
            fontWeight: 500,
            fontSize: 38,
            color: palette(theme).muted,
          }}
        >
          {link}
        </Interactive.Div>
      </div>
    </PostFrame>
  );
};

export { pageOf };
