import { AbsoluteFill, Img, staticFile } from "remotion";
import { Logo } from "../Logo";
import { brand, geist, manrope } from "../brand";
import { MARK_VIEWBOX, markPaths } from "../intro/logoPaths";

/** The website footer's Kranj skyline (footer-city.png, 1658×949; the skyline sits in its bottom 60%). */
const CITY = { src: "home/footer-city.png", width: 1658, height: 949 } as const;

/** Profile picture: square upload, shown as a circle (about 170 px on desktop). */
export const PROFILE = { width: 1080, height: 1080 } as const;

/**
 * Cover photo: 16:9, the tallest crop Facebook uses. Wider crops (about 2.4:1 to 2.6:1) cut the top
 * and bottom, so the logo and text stay inside the middle band (y 190–735) and the bottom-left,
 * where the profile picture overlaps, carries only skyline.
 */
export const COVER = { width: 1640, height: 924 } as const;

const CRIMSON = "#AF1A44";
const BLACK = "#000000";

const Mark = ({ height }: { readonly height: number }) => (
  <svg
    width={(MARK_VIEWBOX.width / MARK_VIEWBOX.height) * height}
    height={height}
    viewBox={`0 0 ${MARK_VIEWBOX.width} ${MARK_VIEWBOX.height}`}
    style={{ display: "block" }}
  >
    <path d={markPaths.bottomLeft} fill={BLACK} />
    <path d={markPaths.bottomRight} fill={BLACK} />
    <path d={markPaths.top} fill={CRIMSON} />
  </svg>
);

/** The logo mark alone on white, sized to sit inside the circle crop. */
export const FacebookProfile = () => (
  <AbsoluteFill
    style={{
      backgroundColor: brand.white,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Mark height={680} />
  </AbsoluteFill>
);

export const FacebookCover = () => {
  const width = COVER.width;
  const height = (width * CITY.height) / CITY.width;

  return (
    <AbsoluteFill style={{ backgroundColor: brand.white }}>
      <Img
        src={staticFile(CITY.src)}
        style={{
          position: "absolute",
          left: 0,
          top: COVER.height - height + 90,
          width,
          height,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 210,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Logo height={112} />
        <div
          style={{
            marginTop: 34,
            fontFamily: manrope,
            fontWeight: 800,
            fontSize: 46,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: brand.ink,
          }}
        >
          Popravila · Nakup · Odkup · Dodatki
        </div>
        <div
          style={{
            marginTop: 18,
            fontFamily: geist,
            fontWeight: 500,
            fontSize: 34,
            lineHeight: 1.2,
            color: brand.body,
          }}
        >
          kranfix.si · Koroška cesta 4, Kranj
        </div>
      </div>
    </AbsoluteFill>
  );
};
