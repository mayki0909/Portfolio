import type { ReactNode } from "react";
import { brand } from "../brand";

/** A generic drawn phone (no maker's design), so the reel stands for any refurbished model. */
export const PHONE = {
  width: 440,
  height: 900,
  bezel: 16,
  radius: 76,
} as const;

/** Inner screen size, for screens that lay out in pixels. */
export const SCREEN = {
  width: PHONE.width - PHONE.bezel * 2,
  height: PHONE.height - PHONE.bezel * 2,
} as const;

export type ButtonGlow = {
  readonly volumeUp?: number;
  readonly volumeDown?: number;
  readonly power?: number;
};

/** A side button; `glow` 0–1 lights it crimson for the buttons check. */
const SideButton = ({
  side,
  top,
  height,
  glow,
}: {
  readonly side: "left" | "right";
  readonly top: number;
  readonly height: number;
  readonly glow: number;
}) => (
  <div
    style={{
      position: "absolute",
      top,
      [side]: -7,
      width: 9,
      height,
      borderRadius: 4,
      backgroundColor: "#2b2b2e",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: 4,
        backgroundColor: brand.primary,
        opacity: glow,
        boxShadow: `0 0 ${28 * glow}px rgba(175,26,68,${0.9 * glow})`,
      }}
    />
  </div>
);

export const Phone = ({
  children,
  glow = {},
}: {
  readonly children: ReactNode;
  readonly glow?: ButtonGlow;
}) => (
  <div
    style={{ position: "relative", width: PHONE.width, height: PHONE.height }}
  >
    <SideButton side="left" top={200} height={74} glow={glow.volumeUp ?? 0} />
    <SideButton side="left" top={292} height={74} glow={glow.volumeDown ?? 0} />
    <SideButton side="right" top={240} height={118} glow={glow.power ?? 0} />
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: PHONE.bezel,
        borderRadius: PHONE.radius,
        backgroundColor: "#1c1c1f",
        boxShadow: "0 50px 90px rgba(10,10,10,0.18), inset 0 0 0 3px #3a3a3e",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: PHONE.radius - PHONE.bezel,
          overflow: "hidden",
          backgroundColor: "#0c0c0f",
        }}
      >
        {children}
        {/* Front camera cut-out. */}
        <div
          style={{
            position: "absolute",
            top: 22,
            left: "50%",
            translate: "-50% 0",
            width: 118,
            height: 34,
            borderRadius: 17,
            backgroundColor: "#000",
          }}
        />
      </div>
    </div>
    {/* Charging port, on the bottom edge. */}
    <div
      style={{
        position: "absolute",
        bottom: 3,
        left: "50%",
        translate: "-50% 0",
        width: 64,
        height: 7,
        borderRadius: 4,
        backgroundColor: "#4a4a4f",
      }}
    />
  </div>
);
