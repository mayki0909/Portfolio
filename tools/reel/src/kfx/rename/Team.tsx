import { AbsoluteFill, Interactive, useCurrentFrame } from "remotion";
import { inter, kfx } from "../brand";
import { MechanicPhoto } from "../MechanicPhoto";
import { rise } from "../motion";

/** "Novo ime. Ista ekipa.": the mechanic at work, and the footer's "od leta 2019". */
export const Team = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: kfx.footer }}>
      <MechanicPhoto />

      <div
        style={{
          position: "absolute",
          left: 96,
          right: 96,
          bottom: 380,
          fontFamily: inter,
        }}
      >
        {[
          { text: "Novo ime.", color: "#a3a3a3" },
          { text: "Ista ekipa.", color: kfx.primaryForeground },
        ].map((line, index) => (
          <Interactive.Div
            key={line.text}
            name={line.text}
            style={{
              fontWeight: 600,
              fontSize: 136,
              lineHeight: 1.04,
              letterSpacing: "-0.04em",
              color: line.color,
              ...rise(frame, 4 + index * 8, 70, 20),
            }}
          >
            {line.text}
          </Interactive.Div>
        ))}
        <Interactive.Div
          name="Since 2019"
          style={{
            marginTop: 36,
            fontWeight: 500,
            fontSize: 42,
            lineHeight: 1.3,
            color: kfx.footerMuted,
            ...rise(frame, 22, 40),
          }}
        >
          Trgovina in servis e-skirojev in e-koles od leta 2019.
        </Interactive.Div>
      </div>
    </AbsoluteFill>
  );
};
