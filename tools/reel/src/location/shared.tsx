import { Easing, Img, interpolate, staticFile } from "remotion";
import { brand, glide } from "../brand";

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

/** Fades in and rises `distance` px into place, the site's reveal motion. */
export const rise = (
  frame: number,
  start: number,
  distance: number,
  duration = 20,
) => ({
  opacity: interpolate(frame, [start, start + duration], [0, 1], {
    ...clamp,
    easing: glide,
  }),
  translate: interpolate(
    frame,
    [start, start + duration],
    [`0px ${distance}px`, "0px 0px"],
    { ...clamp, easing: glide },
  ),
});

const DROP_FRAMES = 20;

/** Height above its resting place of a pin dropped at `start` from `from` px; it bounces and settles at 0. */
export const dropHeight = (frame: number, start: number, from: number) =>
  interpolate(frame, [start, start + DROP_FRAMES], [from, 0], {
    ...clamp,
    easing: Easing.bounce,
  });

/** Frame of a dropped pin's first touchdown, for the click. Easing.bounce first lands at t = 1 / 2.75. */
export const touchdown = (start: number) =>
  start + Math.round(DROP_FRAMES / 2.75);

/** The website's map marker (components/home/visit-section.tsx): a crimson disc with the white map-pin icon. */
export const Pin = ({ size }: { readonly size: number }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: brand.primary,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      filter: `drop-shadow(0px ${size / 10}px ${size / 7}px rgba(0,0,0,0.2))`,
    }}
  >
    <Img
      src={staticFile("home/icon-map-pin.svg")}
      style={{ width: size / 2, height: size / 2 }}
    />
  </div>
);
