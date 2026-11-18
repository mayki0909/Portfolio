import { Img, Interactive, interpolate, useCurrentFrame } from "remotion";
import photo from "./assets/service.jpg";
import { clamp, kfx } from "./brand";

/**
 * The service page's mechanic photo (krgofix/apps/webshop/public/assets/cta.png, 1440×640), cropped to its
 * right side from x 790: the mechanic, the hub motor and the scooter.
 */
export const PHOTO_HEIGHT = 1080;
const PHOTO_SCALE = PHOTO_HEIGHT / 640;
const PHOTO_LEFT = -790 * PHOTO_SCALE;

/**
 * The photo across the top of a dark scene, slowly zooming out, and fading into the footer colour at its bottom
 * edge so text can sit below it. Clipped to its box, so the zoom never pushes the photo's edge past the fade.
 */
export const MechanicPhoto = ({
  zoomFrames = 90,
}: {
  /** Frames over which the photo zooms from 108 % to 100 %. */
  readonly zoomFrames?: number;
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: PHOTO_HEIGHT,
        overflow: "hidden",
      }}
    >
      <Interactive.Div
        name="Photo"
        style={{
          position: "absolute",
          left: PHOTO_LEFT,
          top: 0,
          width: 1440 * PHOTO_SCALE,
          height: PHOTO_HEIGHT,
          transformOrigin: `${-PHOTO_LEFT + 540}px 40%`,
          scale: interpolate(frame, [0, zoomFrames], [1.08, 1], {
            ...clamp,
            output: "perceptual-scale",
          }),
        }}
      >
        <Img src={photo} style={{ width: "100%", height: "100%" }} />
      </Interactive.Div>
      {/* Darkens the top for Instagram's bar and fades into the footer colour under the text. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(180deg, rgba(23, 23, 23, 0.55) 0%, rgba(23, 23, 23, 0) 22%, rgba(23, 23, 23, 0) 45%, ${kfx.footer} 94%)`,
        }}
      />
    </div>
  );
};
