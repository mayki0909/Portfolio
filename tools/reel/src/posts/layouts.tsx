import type { ReactNode } from "react";
import { Headline, Lead, PAD, Photo, PostFrame, StateChip } from "./shared";

/**
 * Before/after slide: headline on the left, the phone large on the right, as on the site's
 * service cards. Longer words need a smaller `size`, and a phone pushed further right
 * (`photoRight`) leaves a wider `textWidth`.
 */
export const PhoneSlide = ({
  state,
  src,
  headline,
  lead,
  size = 150,
  textWidth = 500,
  photoRight = -40,
}: {
  readonly state: "Pred" | "Po";
  readonly src: string;
  readonly headline: ReactNode;
  readonly lead: ReactNode;
  readonly size?: number;
  readonly textWidth?: number;
  readonly photoRight?: number;
}) => (
  <PostFrame>
    <Photo
      src={src}
      style={{ position: "absolute", top: 270, right: photoRight, height: 900 }}
    />
    <div
      style={{
        position: "absolute",
        top: 120,
        left: PAD,
        width: textWidth,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Headline size={size}>{headline}</Headline>
      <Lead style={{ marginTop: 32, width: 440 }}>{lead}</Lead>
      <div style={{ marginTop: 48 }}>
        <StateChip state={state} />
      </div>
    </div>
  </PostFrame>
);
