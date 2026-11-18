import { Audio } from "@remotion/media";
import { AbsoluteFill, Interactive, Track, useCurrentFrame } from "remotion";
import { brand, geist, manrope } from "../../brand";
import { rise } from "../shared";

/**
 * Copied from `officeHours` in apps/webshop/components/home/office-hours.ts
 * (that file needs newer JS libs than this project). Update both if the hours change.
 */
const HOURS = [
  { label: "Ponedeljek – Četrtek", times: ["09:00 – 12:00", "13:00 – 16:00"] },
  { label: "Petek", times: ["09:00 – 14:00"] },
  { label: "Sobota", times: ["09:00 – 12:00"] },
  { label: "Nedelja", times: [] },
] as const;

const ROW_START = 10;
const ROW_STAGGER = 7;

/** Opening hours, one row at a time, in the layout of the site's "Obiščite nas" section. */
export const Hours = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.white,
        justifyContent: "center",
        padding: "0 96px 220px",
      }}
    >
      <Interactive.Div
        name="Title"
        style={{
          marginBottom: 56,
          fontFamily: manrope,
          fontWeight: 800,
          fontSize: 132,
          lineHeight: 1.08,
          letterSpacing: "-0.04em",
          color: brand.ink,
          ...rise(frame, 0, 80, 22),
        }}
      >
        Delovni čas
      </Interactive.Div>

      {HOURS.map((row, index) => (
        <Interactive.Div
          key={row.label}
          name={row.label}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 32,
            padding: "30px 0",
            borderTop: "3px solid #e5e5e5",
            fontFamily: geist,
            ...rise(frame, ROW_START + index * ROW_STAGGER, 50, 18),
          }}
        >
          <span style={{ fontSize: 42, lineHeight: 1.3, color: brand.muted }}>
            {row.label}
          </span>
          <span
            style={{
              fontSize: 54,
              lineHeight: 1.3,
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

      {/* CC0 sound effects from Remotion's library (remotion.dev/docs/sfx). */}
      <Track name="Clicks">
        {HOURS.map((row, index) => (
          <Audio
            key={row.label}
            name={`${row.label} click`}
            src="https://remotion.media/mouse-click.wav"
            from={ROW_START + index * ROW_STAGGER}
            durationInFrames={8}
            volume={0.3}
          />
        ))}
      </Track>
    </AbsoluteFill>
  );
};
