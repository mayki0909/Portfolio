import { interpolate } from "remotion";
import { clamp, ease } from "./brand";

/** Fades in and rises `distance` px into place over `duration` frames from `start`. */
export const rise = (
  frame: number,
  start: number,
  distance: number,
  duration = 16,
) => ({
  opacity: interpolate(frame, [start, start + duration], [0, 1], {
    ...clamp,
    easing: ease,
  }),
  translate: interpolate(
    frame,
    [start, start + duration],
    [`0px ${distance}px`, "0px 0px"],
    { ...clamp, easing: ease },
  ),
});
