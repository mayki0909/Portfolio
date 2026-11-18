import type { ReactNode } from "react";
import { Interactive } from "remotion";
import { brand, manrope } from "../brand";
import { Logo } from "../Logo";
import { Badge, Lead, PAD, PostFrame } from "./shared";

/** Entry steps shared by both giveaways (like + follow + comment; Meta allows no tag or share asks). */
const STEPS = ["Sledi nam", "Všečkaj objavo", "Napiši komentar"] as const;

/** The three entry steps as numbered columns. */
export const Steps = ({ size = 34 }: { readonly size?: number }) => (
  <Interactive.Div
    name="Steps"
    style={{ display: "flex", justifyContent: "space-between" }}
  >
    {STEPS.map((step, index) => (
      <div
        key={step}
        style={{
          width: 290,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: size * 1.7,
            height: size * 1.7,
            borderRadius: size,
            backgroundColor: brand.primary,
            color: brand.primaryForeground,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: manrope,
            fontWeight: 800,
            fontSize: size,
          }}
        >
          {index + 1}
        </div>
        <div
          style={{
            fontSize: size,
            lineHeight: 1.2,
            fontWeight: 500,
            color: brand.ink,
          }}
        >
          {step}
        </div>
      </div>
    ))}
  </Interactive.Div>
);

/** Campaign badge on the left, the closing date on the right. */
export const BadgeRow = ({
  label,
  deadline,
}: {
  readonly label: string;
  readonly deadline: string;
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <Badge>{label}</Badge>
    <Interactive.Div
      name="Deadline"
      style={{ fontSize: 36, fontWeight: 500, color: brand.body }}
    >
      {deadline}
    </Interactive.Div>
  </div>
);

/** Story frame: logo below Instagram's top bar, content kept clear of the reply bar. */
export const StoryFrame = ({ children }: { readonly children: ReactNode }) => (
  <PostFrame footer={false}>
    <Logo height={64} style={{ position: "absolute", top: 250, left: PAD }} />
    <div
      style={{
        position: "absolute",
        top: 380,
        bottom: 360,
        left: PAD,
        right: PAD,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  </PostFrame>
);

/** Quiet last line of a story. */
export const JoinLine = ({ children }: { readonly children: ReactNode }) => (
  <Lead style={{ marginTop: 56, fontSize: 38, color: brand.muted }}>
    {children}
  </Lead>
);

/** Font size that fits a profile name on one line across the 904 px column. */
export const handleSize = (handle: string, max = 150) =>
  Math.min(max, Math.floor(904 / (handle.length * 0.58)));
