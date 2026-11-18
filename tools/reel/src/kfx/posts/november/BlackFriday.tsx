import { AbsoluteFill, Interactive } from "remotion";
import { inter, kfx } from "../../brand";
import { CalendarFoldIcon, InstagramIcon } from "../../icons";
import {
  Accent,
  DOMAIN,
  Headline,
  INSTAGRAM,
  KfxLogo,
  Label,
  Lead,
  PAD,
  palette,
  PostFrame,
  SpeedLines,
} from "../shared";

/**
 * Black Friday (Fri 27 Nov) and Cyber Monday (Mon 30 Nov). The teaser makes no offer, so it can go out
 * as is. The offer post and the Cyber Monday story take the offer as props: the owner decides it, and
 * the defaults are bracketed placeholders so an unfinished render can't pass for a real offer.
 */
export type OfferProps = {
  /** The headline number, e.g. "−20 %". */
  readonly discount: string;
  /** What it applies to, e.g. "na vse rezervne dele". */
  readonly subject: string;
  /** When it ends, e.g. "Velja do ponedeljka, 30. 11." */
  readonly until: string;
};

export const OFFER_PLACEHOLDER: OfferProps = {
  discount: "−XX %",
  subject: "na [kaj velja]",
  until: "Velja do [datum]",
};

const dark = palette("dark");

/** Story safe area: Instagram's bars cover about 250 px at the top and 340 px at the bottom. */
const SAFE_TOP = 270;
const SAFE_BOTTOM = 360;

/** "BLACK / FRIDAY" set like the site's uppercase hero. */
const BlackFridayWordmark = ({ size }: { readonly size: number }) => (
  <Headline size={size} theme="dark" style={{ lineHeight: 0.94 }}>
    BLACK
    <br />
    <Accent>FRIDAY</Accent>
  </Headline>
);

/** 25 Nov story: Black Friday is coming, no offer yet. */
export const BlackFridayTeaserStory = () => (
  <AbsoluteFill style={{ backgroundColor: dark.bg, fontFamily: inter }}>
    <SpeedLines
      style={{ top: SAFE_TOP + 40, right: 0 }}
      lines={[
        { width: 620, height: 26, color: kfx.primary, offset: 0 },
        { width: 420, height: 14, color: kfx.primary, offset: 90 },
        { width: 260, height: 8, color: "#a3a3a3", offset: 40 },
      ]}
    />
    <div
      style={{
        position: "absolute",
        left: PAD,
        right: PAD,
        top: SAFE_TOP + 190,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Label>Prihaja</Label>
      <div style={{ marginTop: 36 }}>
        <BlackFridayWordmark size={210} />
      </div>
      <Lead theme="dark" style={{ marginTop: 32, fontSize: 52 }}>
        pri KFX
      </Lead>

      <Interactive.Div
        name="Date"
        style={{
          marginTop: 72,
          alignSelf: "flex-start",
          display: "flex",
          alignItems: "center",
          gap: 24,
          padding: "28px 40px",
          borderRadius: 24,
          backgroundColor: dark.card,
          color: dark.ink,
          fontWeight: 600,
          fontSize: 52,
        }}
      >
        <CalendarFoldIcon size={56} color={kfx.primary} />
        Petek, 27. 11.
      </Interactive.Div>

      <Lead theme="dark" style={{ marginTop: 56 }}>
        Ponudbo razkrijemo v petek. Sledite nam, da je ne zamudite.
      </Lead>
    </div>
    <div
      style={{
        position: "absolute",
        left: PAD,
        right: PAD,
        bottom: SAFE_BOTTOM,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <KfxLogo height={60} theme="dark" />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontWeight: 600,
          fontSize: 38,
          color: dark.body,
        }}
      >
        <InstagramIcon size={40} color={dark.body} />
        {INSTAGRAM}
      </div>
    </div>
  </AbsoluteFill>
);

/** 27 Nov feed post: the offer. */
export const BlackFridayPost = ({ discount, subject, until }: OfferProps) => (
  <PostFrame theme="dark" footerRight={DOMAIN}>
    <SpeedLines style={{ top: 130, right: 0 }} />
    <div
      style={{
        position: "absolute",
        top: 120,
        left: PAD,
        right: PAD,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Label>Samo ta konec tedna</Label>
      <div style={{ marginTop: 32 }}>
        <BlackFridayWordmark size={150} />
      </div>
      <Interactive.Div
        name="Discount"
        style={{
          marginTop: 56,
          fontWeight: 800,
          fontSize: 230,
          lineHeight: 0.9,
          letterSpacing: "-0.06em",
          color: dark.ink,
        }}
      >
        {discount}
      </Interactive.Div>
      <Lead theme="dark" style={{ marginTop: 28, fontSize: 52, color: dark.ink }}>
        {subject}
      </Lead>
      <Lead theme="dark" style={{ marginTop: 16 }}>
        {until}
      </Lead>
    </div>
  </PostFrame>
);

/** 30 Nov story: last day, online. */
export const CyberMondayStory = ({ discount, subject, until }: OfferProps) => (
  <AbsoluteFill style={{ backgroundColor: kfx.white, fontFamily: inter }}>
    <SpeedLines
      style={{ top: SAFE_TOP + 40, right: 0 }}
      lines={[
        { width: 620, height: 26, color: kfx.primary, offset: 0 },
        { width: 420, height: 14, color: kfx.primary, offset: 90 },
        { width: 260, height: 8, color: "#a3a3a3", offset: 40 },
      ]}
    />
    <div
      style={{
        position: "absolute",
        left: PAD,
        right: PAD,
        top: SAFE_TOP + 190,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Label>Zadnji dan</Label>
      <Headline size={190} style={{ marginTop: 36, lineHeight: 0.94 }}>
        CYBER
        <br />
        <Accent>MONDAY</Accent>
      </Headline>
      <Interactive.Div
        name="Discount"
        style={{
          marginTop: 64,
          fontWeight: 800,
          fontSize: 200,
          lineHeight: 0.9,
          letterSpacing: "-0.06em",
          color: kfx.ink,
        }}
      >
        {discount}
      </Interactive.Div>
      <Lead style={{ marginTop: 28, fontSize: 52, color: kfx.ink }}>
        {subject}
      </Lead>
      <Lead style={{ marginTop: 16 }}>{until}</Lead>
    </div>
    <div
      style={{
        position: "absolute",
        left: PAD,
        right: PAD,
        bottom: SAFE_BOTTOM,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <KfxLogo height={60} />
      <div style={{ fontWeight: 600, fontSize: 40, color: kfx.body }}>
        {DOMAIN}
      </div>
    </div>
  </AbsoluteFill>
);
