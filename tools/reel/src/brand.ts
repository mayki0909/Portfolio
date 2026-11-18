import { loadFont as loadGeist } from "@remotion/google-fonts/Geist";
import { loadFont as loadManrope } from "@remotion/google-fonts/Manrope";
import { Easing } from "remotion";

/**
 * Kranfix webshop branding (apps/webshop/app/globals.css, components/home/*).
 * The site loads Manrope for headlines and Geist for everything else.
 */
export const { fontFamily: manrope } = loadManrope("normal", {
  weights: ["600", "800"],
  subsets: ["latin", "latin-ext"],
});

export const { fontFamily: geist } = loadGeist("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin", "latin-ext"],
});

export const brand = {
  primary: "#af1a44",
  primaryForeground: "#fafafa",
  ink: "#0a0a0a",
  text: "#404040",
  body: "#525252",
  muted: "#737373",
  border: "#d4d4d4",
  surface: "#f5f5f5",
  white: "#ffffff",
  live: "#22c55e",
  /** Buyback (Refix) green: the site's greenButton and refix-mark-lg.svg. */
  refix: "#306b34",
} as const;

/** The site's `--ease-glide`: starts at rest and decelerates into place. */
export const glide = Easing.bezier(0.4, 0, 0.2, 1);
