import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { Easing } from "remotion";

/**
 * KFX branding (formerly Krgofix): krgofix/apps/webshop/app/globals.css and packages/ui/src/styles/globals.css.
 * The site loads no web font and sets everything in the system sans (SF Pro on Apple, Segoe UI on Windows),
 * so the videos use Inter, the closest Google font.
 */
export const { fontFamily: inter } = loadInter("normal", {
  weights: ["500", "600", "800"],
  subsets: ["latin", "latin-ext"],
});

export const kfx = {
  primary: "#af1a44",
  primaryForeground: "#fafafa",
  ink: "#0a0a0a",
  body: "#525252",
  muted: "#737373",
  border: "#e5e5e5",
  white: "#ffffff",
  /** Background of the service page's "Kako poteka servis?" section. */
  section: "#f2f2f3",
  /** Footer (`--footer-bg`, `--footer-text`, `--footer-muted`). */
  footer: "#171717",
  footerText: "#e5e5e5",
  footerMuted: "#d4d4d4",
} as const;

/** Starts at rest and decelerates into place. */
export const ease = Easing.bezier(0.4, 0, 0.2, 1);
export const expoOut = Easing.bezier(0.16, 1, 0.3, 1);
export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

/**
 * The logo leans about 32° (the K's stem runs from x 62.7 at the top to x 0 at the baseline).
 * Speed lines and the domain's wipe use the same slant.
 */
export const LOGO_SLANT = 62.74 / 99.26;
