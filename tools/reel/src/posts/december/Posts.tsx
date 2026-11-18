import type { CSSProperties, ReactNode } from "react";
import { Img, Interactive, staticFile } from "remotion";
import { brand, geist, manrope } from "../../brand";
import {
  Accent,
  Badge,
  Headline,
  Lead,
  PAD,
  Photo,
  PostFrame,
  StateChip,
} from "../shared";

const NoWrap = ({ children }: { readonly children: ReactNode }) => (
  <span style={{ whiteSpace: "nowrap" }}>{children}</span>
);

/* ---------- Wed 9 Dec: Christmas gifts, 4 slides ---------- */

const GIFTS = [
  {
    name: "Ovitki",
    line: "Za iPhone, Samsung in druge telefone.",
    src: "home/shop-case.png",
    zoom: 1.45,
  },
  {
    name: "Polnilci",
    line: "Za hitro polnjenje telefona.",
    src: "home/shop-glass.png",
    zoom: 1.45,
  },
  {
    name: "Kabli",
    line: "Rezervni kabel vedno pride prav.",
    src: "home/shop-cable.png",
    zoom: 1.45,
  },
] as const;

/** Top-anchored content column; flex so badges keep their own width. */
const COLUMN: CSSProperties = {
  position: "absolute",
  top: 96,
  left: PAD,
  right: PAD,
  display: "flex",
  flexDirection: "column",
};

/** Product shots (transparent PNGs) on the site's light surface. */
const ProductTile = ({
  src,
  zoom,
  style,
}: {
  readonly src: string;
  /** The PNGs carry wide transparent margins; this scales the product up inside its tile. */
  readonly zoom: number;
  readonly style?: CSSProperties;
}) => (
  <div
    style={{
      borderRadius: 32,
      backgroundColor: brand.surface,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      ...style,
    }}
  >
    <Img
      src={staticFile(src)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        scale: String(zoom),
      }}
    />
  </div>
);

export const GiftsCover = () => (
  <PostFrame>
    <div style={COLUMN}>
      <Badge>Božična darila</Badge>
      <Headline size={112} style={{ marginTop: 40 }}>
        <div>Darila, ki so</div>
        <Accent>res uporabna.</Accent>
      </Headline>
      <Lead style={{ marginTop: 24 }}>Za vsakogar, ki ima telefon.</Lead>
      <Interactive.Div
        name="Gift tiles"
        style={{
          marginTop: 48,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}
      >
        {GIFTS.map((gift) => (
          <div
            key={gift.name}
            style={{ display: "flex", flexDirection: "column", gap: 18 }}
          >
            <ProductTile
              src={gift.src}
              zoom={gift.zoom}
              style={{ height: 380 }}
            />
            <div
              style={{
                textAlign: "center",
                fontSize: 36,
                fontWeight: 500,
                color: brand.ink,
              }}
            >
              {gift.name}
            </div>
          </div>
        ))}
      </Interactive.Div>
    </div>
  </PostFrame>
);

export type GiftProps = {
  /** 1–3: case, charger, cable. */
  readonly gift: number;
};

export const GiftSlide = ({ gift }: GiftProps) => {
  const data = GIFTS[gift - 1];

  return (
    <PostFrame>
      <div style={COLUMN}>
        <Badge>Božična darila</Badge>
        <Headline size={150} style={{ marginTop: 40 }}>
          <Accent>{data.name}</Accent>
        </Headline>
        <Lead style={{ marginTop: 16 }}>{data.line}</Lead>
        <ProductTile
          src={data.src}
          zoom={data.zoom * 0.85}
          style={{ marginTop: 40, height: 620 }}
        />
      </div>
    </PostFrame>
  );
};

/* ---------- Sat 12 Dec: battery, 2 slides ---------- */

/*
 * service-battery-fixed.png is a 1.34× closer crop of the same phone (body 944 px wide against 704)
 * with its bottom cut off, so both are scaled to a 520 px wide body with the tops aligned 30 px into
 * the window, which then clips both at the same 58 % of the phone.
 */
const BATTERY_BEFORE: Crop = {
  width: 1024 * (520 / 704),
  left: 540 - 512 * (520 / 704),
  top: 30 - 54 * (520 / 704),
};
const BATTERY_AFTER: Crop = {
  width: 1024 * (520 / 944),
  left: 540 - 510 * (520 / 944),
  top: 30 - 138 * (520 / 944),
};

export const BatteryBefore = () => (
  <CropSlide
    state="Pred"
    src="home/service-battery.png"
    crop={BATTERY_BEFORE}
    headline={
      <>
        <div>Baterija</div>
        <Accent>ne zdrži?</Accent>
      </>
    }
    lead="Telefon se izprazni že do kosila ali se nenadoma ugasne?"
  />
);

export const BatteryAfter = () => (
  <CropSlide
    state="Po"
    src="home/service-battery-fixed.png"
    crop={BATTERY_AFTER}
    headline={
      <>
        <div>Nova</div>
        <Accent>baterija.</Accent>
      </>
    }
    lead={
      <>
        Zamenjamo jo, na popravilo dobiš <NoWrap>90-dnevno</NoWrap> garancijo.
      </>
    }
  />
);

/* ---------- Tue 15 Dec: camera glass, 2 slides ---------- */

/** Where a shot sits inside CropSlide's 1080×640 window. */
type Crop = {
  readonly width: number;
  readonly left: number;
  readonly top: number;
};

/** The camera module sits at about (388, 265) in the 1024×1536 shot; 1.84× brings it to ~700 px. */
const CAMERA_ZOOM: Crop = {
  width: 1884,
  left: 540 - 388 * 1.84,
  top: 320 - 265 * 1.84,
};

/** Headline on top, a close-up of the shot below in a full-width 1080×640 window. */
const CropSlide = ({
  state,
  src,
  crop,
  headline,
  lead,
}: {
  readonly state: "Pred" | "Po";
  readonly src: string;
  readonly crop: Crop;
  readonly headline: ReactNode;
  readonly lead: ReactNode;
}) => (
  <PostFrame>
    <div style={{ position: "absolute", top: 96, left: PAD, right: PAD }}>
      <Headline size={104}>{headline}</Headline>
      <Lead style={{ marginTop: 24 }}>{lead}</Lead>
    </div>
    <div
      style={{
        position: "absolute",
        top: 520,
        left: 0,
        width: 1080,
        height: 640,
        overflow: "hidden",
      }}
    >
      <Photo
        src={src}
        style={{
          position: "absolute",
          width: crop.width,
          left: crop.left,
          top: crop.top,
        }}
      />
    </div>
    <div style={{ position: "absolute", top: 500, left: PAD }}>
      <StateChip state={state} />
    </div>
  </PostFrame>
);

export const CameraBefore = () => (
  <CropSlide
    state="Pred"
    src="home/service-camera.png"
    crop={CAMERA_ZOOM}
    headline={
      <>
        <div>Počeno steklo</div>
        <Accent>kamere?</Accent>
      </>
    }
    lead="Fotografije so zamegljene, skozi razpoke pa pride prah."
  />
);

export const CameraAfter = () => (
  <CropSlide
    state="Po"
    src="home/service-camera-fixed.png"
    crop={CAMERA_ZOOM}
    headline={
      <>
        <div>Spet</div>
        <Accent>ostre slike.</Accent>
      </>
    }
    lead={
      <>
        Steklo kamere zamenjamo, na popravilo dobiš <NoWrap>90-dnevno</NoWrap>{" "}
        garancijo.
      </>
    }
  />
);

/* ---------- Fri 18 Dec: before the holidays ---------- */

/** What the website's trust section promises (components/home/trust-section.tsx, FAQ). */
const HOLIDAY_POINTS = [
  "Preveri možnost nadomestnega telefona",
  "Ekspresno popravilo, če je del na zalogi",
  "90-dnevna garancija na popravilo",
] as const;

export const HolidayHelp = () => (
  <PostFrame>
    <Headline size={100} style={{ position: "absolute", top: 96, left: PAD }}>
      <div>Med prazniki</div>
      <div>ne ostani</div>
      <Accent>brez telefona.</Accent>
    </Headline>

    {/* The website's loaner card: the cracked phone in for repair, a working one to borrow. */}
    <Photo
      src="home/trust-loaner-cracked.png"
      style={{
        position: "absolute",
        top: 440,
        left: 210,
        height: 420,
        rotate: "-7deg",
      }}
    />
    <Photo
      src="home/trust-loaner-back.png"
      style={{
        position: "absolute",
        top: 450,
        left: 430,
        height: 420,
        rotate: "6deg",
      }}
    />
    <Interactive.Div
      name="Warranty badge"
      style={{
        position: "absolute",
        top: 600,
        left: 700,
        width: 210,
        height: 210,
        borderRadius: 105,
        backgroundColor: brand.primary,
        color: brand.primaryForeground,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 16px 32px rgba(175,26,68,0.25)",
      }}
    >
      <div
        style={{
          fontFamily: manrope,
          fontWeight: 800,
          fontSize: 76,
          lineHeight: 1,
        }}
      >
        90
      </div>
      <div style={{ fontFamily: geist, fontSize: 24, fontWeight: 500 }}>
        dni garancije
      </div>
    </Interactive.Div>

    <Interactive.Div
      name="Points"
      style={{
        position: "absolute",
        top: 900,
        left: PAD,
        right: PAD,
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      {HOLIDAY_POINTS.map((point) => (
        <div
          key={point}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 36,
            color: brand.ink,
          }}
        >
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              backgroundColor: brand.primary,
              flex: "none",
            }}
          />
          {point}
        </div>
      ))}
    </Interactive.Div>
  </PostFrame>
);

/* ---------- Mon 21 Dec: holiday hours ---------- */

/** The usual Thursday, from apps/webshop/components/home/office-hours.ts. */
const THURSDAY = ["09:00 – 12:00", "13:00 – 16:00"];

export type HolidayHoursProps = {
  /** Hours on Thu 24 Dec; [] for closed. Defaults to the usual Thursday until you confirm. */
  readonly dec24: string[];
  /** Hours on Thu 31 Dec; [] for closed. */
  readonly dec31: string[];
};

export const HOLIDAY_HOURS_DEFAULTS: HolidayHoursProps = {
  dec24: THURSDAY,
  dec31: THURSDAY,
};

export const HolidayHours = ({ dec24, dec31 }: HolidayHoursProps) => {
  const rows = [
    { label: "Čet, 24. 12.", times: dec24 },
    { label: "Pet, 25. 12.", times: [] },
    { label: "Sob, 26. 12.", times: [] },
    { label: "Pon – sre, 28. – 30. 12.", times: THURSDAY },
    { label: "Čet, 31. 12.", times: dec31 },
    { label: "Pet, 1. 1., in sob, 2. 1.", times: [] },
  ];

  return (
    <PostFrame>
      <div style={{ position: "absolute", top: 96, left: PAD, right: PAD }}>
        <Headline size={110}>
          <div>Praznični</div>
          <Accent>delovni čas</Accent>
        </Headline>
        <div style={{ marginTop: 40 }}>
          {rows.map((row) => (
            <Interactive.Div
              key={row.label}
              name={row.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 32,
                padding: "20px 0",
                borderTop: "3px solid #e5e5e5",
              }}
            >
              <span
                style={{ fontSize: 36, lineHeight: 1.25, color: brand.muted }}
              >
                {row.label}
              </span>
              <span
                style={{
                  fontSize: 40,
                  lineHeight: 1.25,
                  fontWeight: 500,
                  textAlign: "right",
                  color: row.times.length > 0 ? brand.ink : brand.muted,
                }}
              >
                {row.times.length > 0
                  ? row.times.map((time) => (
                      <span key={time} style={{ display: "block" }}>
                        {time}
                      </span>
                    ))
                  : "Zaprto"}
              </span>
            </Interactive.Div>
          ))}
        </div>
      </div>
    </PostFrame>
  );
};

/* ---------- Sun 27 Dec: buyback, in the site's green Refix colour ---------- */

/** refix-mark-lg.svg is 74.14×44.6. */
const MARK = { width: 74.1428 * 2.2, height: 44.5986 * 2.2 };

export const Buyback = () => (
  <PostFrame>
    <div style={{ position: "absolute", top: 96, left: PAD, right: PAD }}>
      <Headline size={92}>
        <div>Nov telefon</div>
        <div>pod jelko?</div>
        <span style={{ color: brand.refix }}>Starega odkupimo.</span>
      </Headline>
      <Lead style={{ marginTop: 24 }}>
        Na kranfix.si izbereš model in dobiš informativno oceno vrednosti.
      </Lead>
      <Interactive.Div
        name="Buyback photo"
        style={{
          position: "relative",
          marginTop: 40,
          height: 560,
          borderRadius: 40,
          overflow: "hidden",
          backgroundColor: brand.surface,
        }}
      >
        <Photo
          src="home/buyback-phones.png"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <Img
          src={staticFile("home/refix-mark-lg.svg")}
          style={{
            position: "absolute",
            right: 40,
            bottom: 40,
            width: MARK.width,
            height: MARK.height,
          }}
        />
      </Interactive.Div>
    </div>
  </PostFrame>
);
