import type { CSSProperties } from "react";
import { Img, staticFile } from "remotion";

const assets = {
  onDark: {
    mark: "brand/logo-mark-light.svg",
    word: "brand/logo-word-light.svg",
  },
  onLight: {
    mark: "brand/logo-mark-color.svg",
    word: "brand/logo-word-color.svg",
  },
} as const;

/** Same proportions as the webshop's `<Logo>` (components/home/logo.tsx). */
export const Logo = ({
  height,
  tone = "onLight",
  style,
}: {
  readonly height: number;
  readonly tone?: keyof typeof assets;
  readonly style?: CSSProperties;
}) => {
  const { mark, word } = assets[tone];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: (56 / 256.013) * height,
        ...style,
      }}
    >
      <Img
        src={staticFile(mark)}
        style={{ width: (154.431 / 256.013) * height, height }}
      />
      <Img
        src={staticFile(word)}
        style={{ width: (482.59 / 256.252) * height, height }}
      />
    </div>
  );
};
