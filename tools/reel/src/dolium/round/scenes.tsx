import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import lake from "../assets/sauna-lake.jpg";
import fire from "../assets/ritual/fire.mp4";
import rest from "../assets/ritual/rest.jpg";
import stones from "../assets/ritual/stones.mp4";
import { clamp, dmSans, dmSerif, dolium, ease, expoOut } from "../brand";
import { focusIn, Grain, Mist, Steam } from "../film";
import { Footage, RitualScene, Still, WINDOW } from "../ritual/parts";

/** Where a caption starts: once the dissolve into the scene has finished. */
const CAPTION = 16;

/** 01 is a little longer so the barrel can fill the frame before the window closes. */
export const NIGHT_FRAMES = 96;
export const ROUND_FRAMES = 90;
export const STEAM_FRAMES = 104;
export const REST_FRAMES = 90;
export const WATER_FRAMES = 104;

/**
 * "01 — KROG" and a serif line under the window, with an optional second line.
 * `end` fades the block out before a scene hands off to the outro.
 */
const Line = ({
  kicker,
  text,
  detail,
  start,
  end,
}: {
  readonly kicker?: string;
  readonly text: string;
  readonly detail?: string;
  readonly start: number;
  readonly end?: number;
}) => {
  const frame = useCurrentFrame();
  const tracking = interpolate(frame, [start, start + 28], [0.62, 0.38], {
    ...clamp,
    easing: expoOut,
  });
  const out =
    end === undefined
      ? 0
      : interpolate(frame, [end, end + 12], [0, 1], { ...clamp, easing: ease });

  return (
    <div
      style={{
        position: "absolute",
        top: 1278,
        left: 80,
        right: 80,
        textAlign: "center",
        opacity: 1 - out,
        filter: `blur(${out * 8}px)`,
      }}
    >
      {kicker !== undefined ? (
        <div
          style={{
            fontFamily: dmSans,
            fontWeight: 500,
            fontSize: 26,
            lineHeight: 1,
            textTransform: "uppercase",
            letterSpacing: `${tracking}em`,
            paddingLeft: `${tracking}em`,
            color: dolium.secondaryLight,
            opacity: interpolate(frame, [start, start + 14], [0, 1], {
              ...clamp,
              easing: ease,
            }),
          }}
        >
          {kicker}
        </div>
      ) : null}
      <div
        style={{
          marginTop: kicker !== undefined ? 26 : 0,
          fontFamily: dmSerif,
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 84,
          lineHeight: 1.08,
          color: dolium.primaryLight,
          ...focusIn(frame, start + 4, 10, 18),
        }}
      >
        {text}
      </div>
      {detail !== undefined ? (
        <div
          style={{
            marginTop: 22,
            fontFamily: dmSans,
            fontWeight: 500,
            fontSize: 48,
            lineHeight: 1.2,
            color: dolium.primaryLight,
            ...focusIn(frame, start + 16, 8, 14),
          }}
        >
          {detail}
        </div>
      ) : null}
    </div>
  );
};

/** The sky goes toward night; the lit door stays warm. */
const NightGrade = () => (
  <AbsoluteFill
    style={{
      backgroundImage:
        "linear-gradient(to bottom, rgba(7, 10, 28, 0.78) 0%, rgba(7, 10, 28, 0.28) 38%, rgba(18, 16, 25, 0.2) 100%)",
    }}
  />
);

const CLOSE = [8, 40] as const;

/**
 * Opens on the lakeside barrel (saunas-shop/public/navbar/sod-savna.jpg), the same photo as the outro,
 * darkened so the longest night reads before the window closes on the lit door.
 */
export const LongestNight = () => {
  const frame = useCurrentFrame();
  const closed = interpolate(frame, CLOSE, [0, 1], { ...clamp, easing: ease });

  return (
    <RitualScene
      closed={closed}
      caption={<Line text="Najdaljša noč v letu." start={18} />}
    >
      <Still src={lake} focus={0.7} />
      <NightGrade />
    </RitualScene>
  );
};

/**
 * One round in a Finnish sauna: 10 to 15 minutes.
 * Terme Krka, Talaso Strunjan saunas page, "Finska savna", checked 19 Nov 2026.
 */
export const OneRound = () => (
  <RitualScene
    caption={
      <Line
        kicker="01 — Krog"
        text="10 do 15 minut."
        start={CAPTION}
      />
    }
  >
    <Footage
      src={fire}
      clipFrames={27}
      focus={0.5}
      focusY={0.62}
      zoom={1.7}
      from={0}
      durationInFrames={ROUND_FRAMES}
    />
  </RitualScene>
);

/**
 * Throw water on the stones, but never lean over the heater: the steam can burn.
 * Finnish Sauna Society, sauna.fi "Sauna bathing and customs", checked 19 Nov 2026.
 */
export const Pour = () => (
  <RitualScene
    caption={
      <Line
        kicker="02 — Para"
        text="Polijte kamne."
        detail="Ne nad peč."
        start={CAPTION}
      />
    }
  >
    <Footage
      src={stones}
      clipFrames={25}
      focus={0.62}
      from={0}
      durationInFrames={STEAM_FRAMES}
    />
    <Steam
      seed="round-pour"
      x={140}
      y={780}
      width={620}
      count={16}
      start={18}
      every={2}
      life={60}
      rise={720}
      size={600}
      peak={0.7}
    />
  </RitualScene>
);

/**
 * Cool down calmly, then rest. The picture is the step outside
 * (saunas-shop/public/assets/Hero.png), the same still as the ritual reel.
 */
export const CoolDown = () => (
  <RitualScene
    caption={
      <Line
        kicker="03 — Mir"
        text="Ohladite se."
        detail="Umirjeno, nato počivajte."
        start={CAPTION}
      />
    }
  >
    <Still src={rest} focus={0.48} />
  </RitualScene>
);

/**
 * Drink water while you sauna (Terme Krka, "Savna rituali", checked 19 Nov 2026).
 * Do not go in drunk (Finnish Sauna Society, "Saunan terveysvaikutukset").
 * The sources sit on this frame, then the outro takes over.
 */
export const Water = () => {
  const frame = useCurrentFrame();
  const inOpacity = interpolate(frame, [CAPTION, CAPTION + 16], [0, 1], {
    ...clamp,
    easing: ease,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: dolium.night }}>
      <Mist opacity={0.7} />
      <div
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          top: WINDOW.y + 180,
          textAlign: "center",
          opacity: inOpacity,
        }}
      >
        <div
          style={{
            fontFamily: dmSans,
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: "0.42em",
            paddingLeft: "0.42em",
            textTransform: "uppercase",
            color: dolium.secondaryLight,
          }}
        >
          04 — Voda
        </div>
        <div
          style={{
            marginTop: 28,
            fontFamily: dmSerif,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 84,
            lineHeight: 1.08,
            color: dolium.primaryLight,
            ...focusIn(frame, CAPTION + 4, 10, 18),
          }}
        >
          Pijte vodo.
        </div>
        <div
          style={{
            marginTop: 28,
            fontFamily: dmSans,
            fontWeight: 500,
            fontSize: 48,
            lineHeight: 1.25,
            color: dolium.primaryLight,
            ...focusIn(frame, CAPTION + 18, 8, 14),
          }}
        >
          Med savnanjem
          <br />
          brez alkohola.
        </div>
        <div
          style={{
            marginTop: 72,
            fontFamily: dmSans,
            fontWeight: 500,
            fontSize: 28,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: dolium.secondaryLight,
            opacity: interpolate(frame, [36, 52], [0, 1], clamp),
          }}
        >
          Terme Krka · Suomen Saunaseura
        </div>
      </div>
      <Grain />
    </AbsoluteFill>
  );
};
