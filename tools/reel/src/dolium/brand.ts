import { loadFont as loadDmSans } from "@remotion/google-fonts/DMSans";
import { loadFont as loadDmSerif } from "@remotion/google-fonts/DMSerifDisplay";
import { Easing } from "remotion";

/**
 * Savne Dolium branding (saunas-shop/styles/variables.scss and globals.scss).
 * The site sets body text in DM Sans and headings in DM Serif Display; the wordmark is in the logo paths.
 */
export const { fontFamily: dmSans } = loadDmSans("normal", {
  weights: ["400", "500"],
  subsets: ["latin", "latin-ext"],
});

export const { fontFamily: dmSerif } = loadDmSerif("normal", {
  weights: ["400"],
  subsets: ["latin", "latin-ext"],
});
// Same family name, so `fontStyle: "italic"` picks it up.
loadDmSerif("italic", { weights: ["400"], subsets: ["latin", "latin-ext"] });

export const dolium = {
  primaryDark: "#5D5A88",
  primaryLight: "#ECEFF9",
  secondaryDark: "#9795B5",
  secondaryLight: "#BCBACD",
  neutral30: "#5F5C65",
  white: "#ffffff",
  /** Not on the site: a near-black with primaryDark's violet, for the darker videos. */
  night: "#121019",
} as const;

/** Starts at rest and decelerates into place. */
export const ease = Easing.bezier(0.4, 0, 0.2, 1);
export const expoOut = Easing.bezier(0.16, 1, 0.3, 1);
export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;
