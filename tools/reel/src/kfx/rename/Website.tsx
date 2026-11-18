import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  Track,
  useCurrentFrame,
} from "remotion";
import site from "../assets/site-mobile.jpg";
import { clamp, expoOut, inter, kfx } from "../brand";
import { LockIcon } from "../icons";
import { rise } from "../motion";

/**
 * A screenshot of the live homepage at phone width (390 CSS px at 2×, so 780 px wide), taken on 7 Nov 2026
 * with the cookie banner accepted, cropped to its top 3000 px. Retake it if the homepage changes.
 */
const SITE_WIDTH = 780;
const PHONE_WIDTH = 720;
const BEZEL = 20;
const SCREEN_WIDTH = PHONE_WIDTH - BEZEL * 2;
const SITE_SCALE = SCREEN_WIDTH / SITE_WIDTH;
const ADDRESS_BAR = 120;
const PHONE_TOP = 800;

/** The site scrolls from the hero past the info bar to the spare-parts section. */
const SCROLL = [32, 112] as const;
const SCROLL_DISTANCE = 1250 * SITE_SCALE;

/** "Nova spletna stran.": the live site in a phone, with kfxservis.si in the address bar. */
export const Website = ({ domain }: { readonly domain: string }) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [4, 30], [1, 0], {
    ...clamp,
    easing: expoOut,
  });
  const scroll = interpolate(frame, SCROLL, [0, SCROLL_DISTANCE], {
    ...clamp,
    easing: Easing.bezier(0.45, 0, 0.25, 1),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: kfx.section, fontFamily: inter }}>
      <div style={{ position: "absolute", top: 360, left: 96, right: 96 }}>
        {["Nova spletna", "stran."].map((line, index) => (
          <Interactive.Div
            key={line}
            name={`Title line ${index + 1}`}
            style={{
              fontWeight: 600,
              fontSize: 112,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              color: index === 1 ? kfx.primary : kfx.ink,
              ...rise(frame, index * 5, 70, 20),
            }}
          >
            {line}
          </Interactive.Div>
        ))}
        <Interactive.Div
          name="Subline"
          style={{
            marginTop: 24,
            fontWeight: 500,
            fontSize: 40,
            lineHeight: 1.3,
            color: kfx.muted,
            ...rise(frame, 14, 40),
          }}
        >
          Nakup, prijava na servis in najem – vse na spletu.
        </Interactive.Div>
      </div>

      <Interactive.Div
        name="Phone"
        style={{
          position: "absolute",
          left: (1080 - PHONE_WIDTH) / 2,
          top: PHONE_TOP,
          width: PHONE_WIDTH,
          height: 1920 - PHONE_TOP + 120,
          padding: BEZEL,
          borderRadius: 96,
          backgroundColor: kfx.ink,
          boxShadow: "0px 40px 80px rgba(0, 0, 0, 0.18)",
          translate: `0px ${enter * 900}px`,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            borderRadius: 76,
            backgroundColor: kfx.white,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: ADDRESS_BAR - scroll,
              width: SCREEN_WIDTH,
            }}
          >
            <Img src={site} style={{ display: "block", width: "100%" }} />
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: ADDRESS_BAR,
              paddingTop: 30,
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#f3f4f6",
              borderBottom: `2px solid ${kfx.border}`,
            }}
          >
            <div
              style={{
                height: 64,
                padding: "0 32px",
                borderRadius: 32,
                display: "flex",
                alignItems: "center",
                gap: 14,
                backgroundColor: kfx.white,
                fontWeight: 500,
                fontSize: 30,
                color: kfx.ink,
              }}
            >
              <LockIcon size={26} color={kfx.muted} strokeWidth={2.4} />
              {domain}
            </div>
          </div>
        </div>
      </Interactive.Div>

      {/* CC0 sound effects from Remotion's library (remotion.dev/docs/sfx). */}
      <Track name="Whooshes">
        <Audio
          name="Phone whoosh"
          src="https://remotion.media/whoosh.wav"
          from={3}
          durationInFrames={8}
          volume={0.45}
        />
      </Track>
    </AbsoluteFill>
  );
};
