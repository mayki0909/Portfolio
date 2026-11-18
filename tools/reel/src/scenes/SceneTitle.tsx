import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { brand, glide, manrope } from "../brand";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Three-line headline at the top of a scene, rising in line by line like RepairReveal's title. */
export const SceneTitle = ({
  lines,
  accent = brand.primary,
}: {
  /** The middle line is the accent, as in "Popravilo / rezervirate / v nekaj klikih." */
  readonly lines: readonly [string, string, string];
  readonly accent?: string;
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        top: 210,
        left: 96,
        right: 96,
        fontFamily: manrope,
        fontWeight: 800,
        fontSize: 112,
        lineHeight: 1.05,
        letterSpacing: "-0.04em",
        color: brand.ink,
      }}
    >
      {lines.map((text, index) => (
        <Interactive.Div
          key={text}
          name={`Title line ${index + 1}`}
          style={{
            color: index === 1 ? accent : undefined,
            opacity: interpolate(frame, [index * 6, index * 6 + 20], [0, 1], {
              ...clamp,
              easing: glide,
            }),
            translate: interpolate(
              frame,
              [index * 6, index * 6 + 20],
              ["0px 70px", "0px 0px"],
              { ...clamp, easing: glide },
            ),
          }}
        >
          {text}
        </Interactive.Div>
      ))}
    </div>
  );
};
