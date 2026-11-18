import { AbsoluteFill, Interactive } from "remotion";
import hero from "../../assets/hero.jpg";
import service from "../../assets/service.jpg";
import { inter, kfx } from "../../brand";
import {
  ClockIcon,
  GiftIcon,
  InstagramIcon,
  PackageIcon,
  SearchIcon,
  ShieldIcon,
  TruckIcon,
} from "../../icons";
import { Snow } from "../../Snow";
import { CroppedPhoto } from "../Photo";
import { BookButton } from "../slides";
import {
  Accent,
  DOMAIN,
  Headline,
  IconTile,
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
 * December single images and the Miklavž Story. Dates the owner hasn't set yet (last order day, holiday
 * hours) are props with bracketed placeholders, so an unfinished render can't pass for the real thing.
 */

const dark = palette("dark");
/** Story safe area: Instagram's bars cover about 250 px at the top and 340 px at the bottom. */
const SAFE_TOP = 270;
const SAFE_BOTTOM = 360;

/** 5 Dec Story: Miklavž is on Sunday, so Saturday's Story, with Saturday hours. */
export const MiklavzStory = () => (
  <AbsoluteFill style={{ backgroundColor: dark.bg, fontFamily: inter }}>
    <Snow count={80} seed="miklavz" opacity={0.6} />
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
        top: SAFE_TOP + 200,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <IconTile size={150} radius={36}>
        <GiftIcon size={84} color={kfx.white} />
      </IconTile>
      <Headline size={150} theme="dark" style={{ marginTop: 56 }}>
        Miklavž
        <br />
        je na <Accent>poti.</Accent>
      </Headline>
      <Lead theme="dark" style={{ marginTop: 36, fontSize: 46 }}>
        Darila za vse, ki se vozijo na dveh kolesih: od odsevnega jopiča do
        e-skiroja.
      </Lead>
      <Interactive.Div
        name="Hours"
        style={{
          marginTop: 64,
          alignSelf: "flex-start",
          padding: "28px 40px",
          borderRadius: 24,
          backgroundColor: dark.card,
          color: dark.ink,
          fontWeight: 600,
          fontSize: 48,
        }}
      >
        Danes odprto 9:00 – 12:00
      </Interactive.Div>
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

/** 11 Dec: free diagnostics and pickup, over the service page's mechanic photo. */
export const DiagnosticsPost = () => (
  <PostFrame theme="dark">
    <CroppedPhoto
      src={service}
      sourceWidth={1440}
      sourceHeight={640}
      cropX={560}
      height={720}
      fadeTo={dark.bg}
      fadeFrom={0.45}
    />
    <div
      style={{
        position: "absolute",
        left: PAD,
        right: PAD,
        bottom: 200,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Label>Servis KFX</Label>
      <Headline size={96} theme="dark" style={{ marginTop: 28 }}>
        Brezplačna diagnostika.
        <br />
        <Accent>Prevzem na vašem naslovu.</Accent>
      </Headline>
      <Lead theme="dark" style={{ marginTop: 28 }}>
        Skiro se ne vključi, ropota ali ne zdrži? Pregledamo ga brezplačno.
      </Lead>
    </div>
  </PostFrame>
);

export type LastOrderProps = {
  /** Last day to order online for delivery before Christmas, e.g. "petek, 18. 12." */
  readonly orderBy: string;
  /** Last day to pick up in the shop before Christmas. */
  readonly pickupBy: string;
};

/** 16 Dec: last day to order before the holidays. */
export const LastOrderPost = ({ orderBy, pickupBy }: LastOrderProps) => (
  <PostFrame>
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
      <Label>Božič</Label>
      <Headline size={124} style={{ marginTop: 28 }}>
        Darilo
        <br />
        pod <Accent>jelko?</Accent>
      </Headline>
      <div
        style={{ marginTop: 64, display: "flex", flexDirection: "column", gap: 24 }}
      >
        {[
          { Icon: PackageIcon, label: `Naročite na ${DOMAIN} do`, value: orderBy },
          { Icon: GiftIcon, label: "Prevzem na Drulovki 51 do", value: pickupBy },
        ].map(({ Icon, label, value }) => (
          <Interactive.Div
            key={label}
            name={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 32,
              padding: 32,
              borderRadius: 28,
              backgroundColor: kfx.section,
            }}
          >
            <IconTile>
              <Icon size={48} color={kfx.white} />
            </IconTile>
            <div>
              <div style={{ fontWeight: 500, fontSize: 32, color: kfx.muted }}>
                {label}
              </div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: 56,
                  letterSpacing: "-0.03em",
                  color: kfx.ink,
                }}
              >
                {value}
              </div>
            </div>
          </Interactive.Div>
        ))}
      </div>
    </div>
  </PostFrame>
);

export type HolidayHoursProps = {
  /** Hours on Thursday 24 Dec, e.g. "9:00 – 12:00". */
  readonly dec24: string;
  /** Hours on Thursday 31 Dec. */
  readonly dec31: string;
};

/** 18 Dec: holiday opening hours. 25–26 Dec and 1–2 Jan are public holidays; 28–30 Dec are normal days. */
export const HolidayHoursPost = ({ dec24, dec31 }: HolidayHoursProps) => {
  const rows = [
    { day: "čet, 24. 12.", time: dec24 },
    { day: "pet, 25. 12.", time: "Zaprto" },
    { day: "sob, 26. 12.", time: "Zaprto" },
    { day: "pon–sre, 28.–30. 12.", time: "9:00 – 16:00" },
    { day: "čet, 31. 12.", time: dec31 },
    { day: "pet, 1. 1., in sob, 2. 1.", time: "Zaprto" },
  ];
  return (
    <PostFrame>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: PAD,
          right: PAD,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Label>Prazniki</Label>
        <Headline size={104} style={{ marginTop: 28 }}>
          Praznični
          <br />
          delovni čas.
        </Headline>
        <div style={{ marginTop: 48 }}>
          {rows.map((row) => (
            <Interactive.Div
              key={row.day}
              name={row.day}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 24,
                padding: "22px 0",
                borderTop: `3px solid ${kfx.border}`,
              }}
            >
              <span style={{ fontWeight: 500, fontSize: 36, color: kfx.muted }}>
                {row.day}
              </span>
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 40,
                  color: row.time === "Zaprto" ? kfx.muted : kfx.ink,
                }}
              >
                {row.time}
              </span>
            </Interactive.Div>
          ))}
        </div>
      </div>
    </PostFrame>
  );
};

/** 24 Dec: Merry Christmas over the snowy hero scooter. */
export const ChristmasPost = () => (
  <PostFrame theme="dark">
    <CroppedPhoto
      src={hero}
      sourceWidth={1440}
      sourceHeight={800}
      cropX={380}
      height={860}
      fadeTo={dark.bg}
      fadeFrom={0.45}
    />
    {/* Snow over the photo only, fading out before the text. */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        maskImage: "linear-gradient(180deg, #000 0%, #000 44%, transparent 58%)",
      }}
    >
      <Snow count={110} seed="christmas" opacity={0.8} />
    </div>
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
      <Headline size={150} theme="dark">
        Vesel
        <br />
        <Accent>božič.</Accent>
      </Headline>
      <Lead theme="dark" style={{ marginTop: 28 }}>
        Mirne praznike vam želi ekipa KFX. Hvala za zaupanje v letu 2026.
      </Lead>
    </div>
  </PostFrame>
);

const JANUARY_PERKS = [
  { Icon: SearchIcon, text: "Brezplačna diagnostika" },
  { Icon: TruckIcon, text: "Prevzem skiroja na vašem naslovu" },
  { Icon: ClockIcon, text: "Večina popravil v 24–48 urah" },
  { Icon: ShieldIcon, text: "12 mesecev garancije na delo" },
] as const;

/** 28 Dec: book a service in January, ready for spring. */
export const JanuaryPost = () => (
  <PostFrame>
    <div
      style={{
        position: "absolute",
        top: 110,
        left: PAD,
        right: PAD,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Label>Pred sezono</Label>
      <Headline size={96} style={{ marginTop: 28 }}>
        Januar je pravi
        <br />
        čas za <Accent>servis.</Accent>
      </Headline>
      <div
        style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 18 }}
      >
        {JANUARY_PERKS.map(({ Icon, text }) => (
          <Interactive.Div
            key={text}
            name={text}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              fontWeight: 600,
              fontSize: 40,
              color: kfx.ink,
            }}
          >
            <IconTile size={72} radius={18}>
              <Icon size={40} color={kfx.white} />
            </IconTile>
            {text}
          </Interactive.Div>
        ))}
      </div>
      <div style={{ marginTop: 56, display: "flex" }}>
        <BookButton />
      </div>
    </div>
  </PostFrame>
);
