import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Interactive,
  interpolate,
  Track,
  useCurrentFrame,
} from "remotion";
import { clamp, ease, expoOut, inter, kfx } from "../brand";
import { rise } from "../motion";
import { CheckIcon } from "../icons";

/**
 * The four steps of `SERVIS_STEPS` in krgofix/apps/webshop/components/servis/service-process-steps.tsx.
 * The first description there points at "the form below", so here it names the website instead.
 * Update both if the steps change.
 */
const STEPS = [
  {
    title: "Oddaja Prijave",
    description: "Prek obrazca na spletni strani ali po telefonu",
  },
  {
    title: "Pregled in Ocena",
    description: "Brezplačna diagnostika in cenitev popravila",
  },
  {
    title: "Popravilo",
    description: "Strokovno popravilo z originalnimi deli",
  },
  {
    title: "Prevzem",
    description: "Testiranje in predaja s celotnim poročilom",
  },
] as const;

const CARD_START = 18;
const CARD_STAGGER = 28;
/** Once every card is in, the numbers flip to ticks one after another: all done. */
const CHECK_START = CARD_START + (STEPS.length - 1) * CARD_STAGGER + 30;
const CHECK_STAGGER = 5;
const BADGE = 104;

const Badge = ({ index }: { readonly index: number }) => {
  const frame = useCurrentFrame();
  const arrive = CARD_START + index * CARD_STAGGER;
  const flip = CHECK_START + index * CHECK_STAGGER;
  const number = interpolate(frame, [flip, flip + 5], [1, 0], {
    ...clamp,
    easing: ease,
  });
  const tick = interpolate(frame, [flip + 3, flip + 11], [0, 1], {
    ...clamp,
    easing: expoOut,
  });

  return (
    <div
      style={{
        position: "relative",
        width: BADGE,
        height: BADGE,
        flexShrink: 0,
        borderRadius: 24,
        backgroundColor: kfx.primary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        scale: interpolate(
          frame,
          [arrive + 2, arrive + 9, arrive + 15, flip, flip + 4, flip + 10],
          [0.6, 1.1, 1, 1, 1.12, 1],
          { ...clamp, output: "perceptual-scale" },
        ),
      }}
    >
      <div
        style={{
          fontWeight: 600,
          fontSize: 52,
          color: kfx.primaryForeground,
          opacity: number,
          scale: 0.5 + number * 0.5,
        }}
      >
        {index + 1}
      </div>
      {frame >= flip + 3 ? (
        <div style={{ position: "absolute" }}>
          <CheckIcon
            progress={tick}
            size={60}
            color={kfx.primaryForeground}
            strokeWidth={3}
          />
        </div>
      ) : null}
    </div>
  );
};

/** "Kako poteka servis?": the site's four step cards, one after another, then every step ticked off. */
export const Steps = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: kfx.section,
        padding: "380px 96px 0",
        fontFamily: inter,
      }}
    >
      <div style={{ marginBottom: 56 }}>
        {["Kako poteka", "servis?"].map((line, index) => (
          <Interactive.Div
            key={line}
            name={`Title line ${index + 1}`}
            style={{
              fontWeight: 600,
              fontSize: 104,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              color: kfx.ink,
              ...rise(frame, index * 5, 70, 20),
            }}
          >
            {line}
          </Interactive.Div>
        ))}
      </div>

      {STEPS.map((step, index) => (
        <Interactive.Div
          key={step.title}
          name={step.title}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            marginTop: index === 0 ? 0 : 24,
            padding: 32,
            borderRadius: 32,
            border: `2px solid ${kfx.border}`,
            backgroundColor: kfx.white,
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.05)",
            ...rise(frame, CARD_START + index * CARD_STAGGER, 60, 18),
          }}
        >
          <Badge index={index} />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                fontWeight: 600,
                fontSize: 46,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                color: kfx.ink,
              }}
            >
              {step.title}
            </div>
            <div
              style={{
                fontWeight: 500,
                fontSize: 32,
                lineHeight: 1.3,
                color: kfx.muted,
              }}
            >
              {step.description}
            </div>
          </div>
        </Interactive.Div>
      ))}

      {/* CC0 sound effects from Remotion's library (remotion.dev/docs/sfx). */}
      <Track name="Clicks">
        {STEPS.map((step, index) => (
          <Audio
            key={step.title}
            name={`${step.title} click`}
            src="https://remotion.media/mouse-click.wav"
            from={CARD_START + index * CARD_STAGGER + 4}
            durationInFrames={8}
            volume={0.35}
          />
        ))}
      </Track>
      <Track name="Ding">
        <Audio
          name="All done ding"
          src="https://remotion.media/ding.wav"
          from={CHECK_START + (STEPS.length - 1) * CHECK_STAGGER + 4}
          volume={0.5}
        />
      </Track>
    </AbsoluteFill>
  );
};
