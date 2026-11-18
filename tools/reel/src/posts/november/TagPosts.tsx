import { Interactive } from "remotion";
import { brand, manrope } from "../../brand";
import {
  Accent,
  Headline,
  PAD,
  Photo,
  PostFrame,
  TagBubble,
} from "../shared";

/** Wed 18 Nov: "Označi prijatelja, ki ima vedno razbit ekran." */
export const TagScreen = () => (
  <PostFrame>
    <Headline size={88} style={{ position: "absolute", top: 96, left: PAD }}>
      <div>Označi prijatelja,</div>
      <div>ki ima vedno</div>
      <Accent>razbit ekran.</Accent>
    </Headline>

    <Photo
      src="home/service-screen.png"
      style={{
        position: "absolute",
        top: 410,
        left: 300,
        height: 760,
        rotate: "-6deg",
      }}
    />

    <TagBubble style={{ top: 770, left: 330 }}>@tvoj_prijatelj</TagBubble>
  </PostFrame>
);

const BATTERY = { width: 700, height: 330, border: 18 } as const;

/** Fri 27 Nov: "Označi prijatelja, ki ima vedno prazno baterijo." */
export const TagBattery = () => (
  <PostFrame>
    <Headline size={88} style={{ position: "absolute", top: 96, left: PAD }}>
      <div>Označi prijatelja,</div>
      <div>ki ima vedno</div>
      <Accent>prazno baterijo.</Accent>
    </Headline>

    <Interactive.Div
      name="Battery"
      style={{
        position: "absolute",
        top: 530,
        left: (1080 - BATTERY.width - 50) / 2,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: BATTERY.width,
          height: BATTERY.height,
          border: `${BATTERY.border}px solid ${brand.ink}`,
          borderRadius: 64,
          padding: 22,
          boxSizing: "border-box",
          display: "flex",
        }}
      >
        <div
          style={{
            width: 34,
            borderRadius: 26,
            backgroundColor: brand.primary,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: manrope,
            fontWeight: 800,
            fontSize: 150,
            letterSpacing: "-0.04em",
            color: brand.primary,
          }}
        >
          1 %
        </div>
      </div>
      <div
        style={{
          width: 40,
          height: 120,
          marginLeft: 10,
          borderRadius: "0 22px 22px 0",
          backgroundColor: brand.ink,
        }}
      />
    </Interactive.Div>

    <TagBubble style={{ top: 896, left: -25, right: 25 }}>@tvoj_prijatelj</TagBubble>
  </PostFrame>
);
