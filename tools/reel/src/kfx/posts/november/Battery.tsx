import type { ReactNode } from "react";
import { Interactive } from "remotion";
import hero from "../../assets/hero.jpg";
import { kfx } from "../../brand";
import {
  ArrowRightIcon,
  CalendarCheckIcon,
  CalendarFoldIcon,
  HouseIcon,
  PlugZapIcon,
  SnowflakeIcon,
} from "../../icons";
import { Snow } from "../../Snow";
import { CroppedPhoto } from "../Photo";
import {
  Accent,
  DOMAIN,
  Headline,
  IconTile,
  Label,
  Lead,
  PAD,
  pageOf,
  palette,
  PostFrame,
} from "../shared";

/**
 * 18 Nov carousel: winter battery care. Storage at 30–60 % in a dry room at room temperature, and no charging
 * a cold battery, follow Bosch's e-bike battery guidance; the rest is general Li-ion care. No brand-specific
 * claims, so it holds for e-scooters and e-bikes alike.
 */
const PAGES = 7;

/** 1: the site's hero scooter under falling snow. */
export const BatteryCover = () => {
  const theme = "dark";
  return (
    <PostFrame theme={theme} footerRight={pageOf(1, PAGES)}>
      <CroppedPhoto
        src={hero}
        sourceWidth={1440}
        sourceHeight={800}
        cropX={380}
        height={860}
        fadeTo={palette(theme).bg}
        fadeFrom={0.45}
      />
      {/* Snow over the photo only, fading out before the text. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          maskImage: "linear-gradient(180deg, #000 0%, #000 42%, transparent 56%)",
        }}
      >
        <Snow count={60} seed="battery-cover" opacity={0.7} />
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
        <Label>Nasveti za zimo</Label>
        <Headline size={140} theme={theme} style={{ marginTop: 28 }}>
          Baterija
          <br />
          <Accent>pozimi.</Accent>
        </Headline>
        <Lead theme={theme} style={{ marginTop: 28 }}>
          5 pravil, da bo skiro spomladi pripravljen.
        </Lead>
      </div>
    </PostFrame>
  );
};

/** Ten-cell battery with the 30–60 % storage band in crimson. */
const StorageGauge = () => {
  const cells = 10;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            gap: 10,
            padding: 14,
            borderRadius: 28,
            border: `8px solid ${kfx.ink}`,
          }}
        >
          {Array.from({ length: cells }, (_, i) => {
            const inBand = i >= 3 && i < 6;
            const filled = i < 6;
            return (
              <div
                key={i}
                style={{
                  width: 62,
                  height: 128,
                  borderRadius: 10,
                  backgroundColor: inBand
                    ? kfx.primary
                    : filled
                      ? "#d4d4d4"
                      : kfx.section,
                }}
              />
            );
          })}
        </div>
        <div
          style={{
            width: 18,
            height: 64,
            marginLeft: 6,
            borderRadius: "0 8px 8px 0",
            backgroundColor: kfx.ink,
          }}
        />
      </div>
      <div style={{ position: "relative", height: 56 }}>
        {/* 22 px border + padding before the first cell, 72 px per cell. */}
        <Interactive.Div
          name="Band label"
          style={{
            position: "absolute",
            left: 22 + 3 * 72,
            width: 3 * 72 - 10,
            textAlign: "center",
            fontWeight: 800,
            fontSize: 44,
            letterSpacing: "-0.03em",
            color: kfx.primary,
          }}
        >
          30–60 %
        </Interactive.Div>
      </div>
    </div>
  );
};

/** Summer and winter range as two bars, without numbers: only the difference matters. */
const RangeBars = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 28, width: 820 }}>
    {[
      { label: "Poleti", width: 820, color: kfx.ink, icon: null },
      {
        label: "Pozimi",
        width: 560,
        color: kfx.primary,
        icon: <SnowflakeIcon size={44} color={kfx.primary} />,
      },
    ].map((bar) => (
      <div key={bar.label}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 12,
            fontWeight: 600,
            fontSize: 36,
            color: kfx.muted,
          }}
        >
          {bar.label}
          {bar.icon}
        </div>
        <div
          style={{
            width: bar.width,
            height: 56,
            borderRadius: 16,
            backgroundColor: bar.color,
          }}
        />
      </div>
    ))}
  </div>
);

const RULES: readonly {
  title: ReactNode;
  body: string;
  visual: ReactNode;
}[] = [
  {
    title: "Hranite ga na toplem.",
    body: "Skiro ali baterijo pozimi hranite v suhem prostoru na sobni temperaturi, ne v mrzli garaži ali na balkonu.",
    visual: (
      <IconTile size={200} radius={48}>
        <HouseIcon size={110} color={kfx.white} />
      </IconTile>
    ),
  },
  {
    title: "Ne puščajte je prazne.",
    body: "Za daljšo hrambo naj bo baterija napolnjena na 30–60 %. Ne čisto prazna in ne do konca polna.",
    visual: <StorageGauge />,
  },
  {
    title: "Mrzle baterije ne polnite.",
    body: "Ko skiro pripeljete z mraza, naj se baterija najprej ogreje na sobno temperaturo. Šele nato jo priključite na polnilec.",
    visual: (
      <div style={{ display: "flex", gap: 28 }}>
        <IconTile size={200} radius={48}>
          <SnowflakeIcon size={110} color={kfx.white} />
        </IconTile>
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: 48,
            border: `6px solid ${kfx.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <PlugZapIcon size={100} color={kfx.ink} />
          {/* Struck through: not while it's cold. */}
          <div
            style={{
              position: "absolute",
              width: 230,
              height: 10,
              borderRadius: 5,
              backgroundColor: kfx.primary,
              rotate: "-45deg",
            }}
          />
        </div>
      </div>
    ),
  },
  {
    title: "Enkrat na mesec preverite.",
    body: "Baterija se počasi prazni tudi, ko skiro stoji. Preverite stanje in jo po potrebi dopolnite na 30–60 %.",
    visual: (
      <IconTile size={200} radius={48}>
        <CalendarCheckIcon size={110} color={kfx.white} />
      </IconTile>
    ),
  },
  {
    title: "Mraz pobere doseg.",
    body: "Na mrazu baterija odda manj energije, zato skiro pelje manj daleč. Ko se baterija ogreje, se doseg vrne.",
    visual: <RangeBars />,
  },
];

/** 2–6: one rule per slide, the visual on top and the rule below. */
export const BatteryRule = ({ rule }: { readonly rule: number }) => {
  const { title, body, visual } = RULES[rule - 1];
  return (
    <PostFrame footerRight={pageOf(rule + 1, PAGES)}>
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
          {String(rule).padStart(2, "0")}
        </span>
        <span style={{ fontWeight: 500, fontSize: 32, color: kfx.muted }}>
          Baterija pozimi
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
      <div
        style={{
          position: "absolute",
          top: 660,
          left: PAD,
          right: PAD,
        }}
      >
        <Headline size={96}>{title}</Headline>
        <Lead style={{ marginTop: 32 }}>{body}</Lead>
      </div>
    </PostFrame>
  );
};

/** 7: free diagnostics at KFX, with the site's "Rezerviraj termin" button. */
export const BatteryCta = () => {
  const theme = "dark";
  return (
    <PostFrame theme={theme} footerRight={pageOf(PAGES, PAGES)}>
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
        <Label>Servis KFX</Label>
        <Headline size={124} theme={theme} style={{ marginTop: 28 }}>
          Baterija ne
          <br />
          zdrži <Accent>več?</Accent>
        </Headline>
        <Lead theme={theme} style={{ marginTop: 36 }}>
          Pripeljite skiro ali e-kolo na brezplačno diagnostiko. Skiro lahko
          prevzamemo tudi na vašem naslovu.
        </Lead>

        <Interactive.Div
          name="Button"
          style={{
            marginTop: 72,
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
          Rezerviraj termin
          <ArrowRightIcon size={44} color={kfx.primaryForeground} />
        </Interactive.Div>
        <Interactive.Div
          name="Link"
          style={{
            marginTop: 28,
            fontWeight: 500,
            fontSize: 38,
            color: palette(theme).muted,
          }}
        >
          {DOMAIN}/servis
        </Interactive.Div>
      </div>
    </PostFrame>
  );
};
