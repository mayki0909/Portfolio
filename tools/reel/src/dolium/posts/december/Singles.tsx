import type { ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { dmSans, dmSerif, dolium } from "../../brand";
import saunaLake from "../../assets/sauna-lake.jpg";
import electricHeater from "../../assets/posts/electric-heater.jpg";
import stoveFire from "../../assets/posts/stove-fire.jpg";
import {
  DoliumLogo,
  Headline,
  Label,
  Lead,
  PAD,
  Photo,
  Soft,
} from "../shared";

/** The poll Story and the UNESCO Story. */

const PollChoice = ({
  photo,
  focus,
  title,
  body,
}: {
  readonly photo: string;
  readonly focus: string;
  readonly title: string;
  readonly body: ReactNode;
}) => (
  <div
    style={{
      flex: 1,
      borderRadius: 36,
      backgroundColor: dolium.white,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div style={{ position: "relative", height: 300 }}>
      <Photo
        src={photo}
        focus={focus}
        style={{ left: 0, right: 0, top: 0, bottom: 0 }}
      />
    </div>
    <div style={{ padding: "28px 32px 36px", fontFamily: dmSerif }}>
      <Headline size={48} style={{ fontStyle: "italic" }}>
        {title}
      </Headline>
      <Lead size={30} style={{ marginTop: 14, fontFamily: dmSerif }}>
        {body}
      </Lead>
    </div>
  </div>
);

/**
 * 5 Dec Story: wood or electric? The two upsides are the FAQ's ("Katere grelnike naj izberem: električne ali
 * na drva?"). The poll itself is an Instagram sticker added in the app, in the space under the cards.
 */
export const PollStory = () => (
  <AbsoluteFill
    style={{ backgroundColor: dolium.primaryLight, fontFamily: dmSans }}
  >
    <div
      style={{
        position: "absolute",
        top: 390,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <DoliumLogo height={64} />
    </div>
    <div
      style={{
        position: "absolute",
        left: PAD - 24,
        right: PAD - 24,
        top: 500,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Headline size={112} style={{ textAlign: "center" }}>
        Drva ali
        <br />
        <Soft>elektrika?</Soft>
      </Headline>
      <div style={{ marginTop: 44, display: "flex", gap: 28, width: "100%" }}>
        <PollChoice
          photo={stoveFire}
          focus="50% 60%"
          title="Peč na drva"
          body="Vonj po gorečem lesu in brez električnega priključka."
        />
        <PollChoice
          photo={electricHeater}
          focus="35% 50%"
          title="Električni grelec"
          body="Temperaturo lažje uravnavate, manj dela z ognjem."
        />
      </div>
      {/* y ≈ 1290–1540 stays empty for the poll sticker. */}
    </div>
  </AbsoluteFill>
);

/**
 * 17 Dec Story: the anniversary of "Sauna culture in Finland" joining UNESCO's Representative List of the
 * Intangible Cultural Heritage of Humanity on 17 Dec 2020 (Finnish Government, valtioneuvosto.fi, and
 * ich.unesco.org). The source is on the image, because Stories get shared on their own.
 */
export const UnescoStory = () => (
  <AbsoluteFill style={{ backgroundColor: dolium.night, fontFamily: dmSans }}>
    <Photo
      src={saunaLake}
      focus="50% 60%"
      fadeTo={dolium.night}
      fadeFrom={0.45}
      style={{ left: 0, right: 0, top: 0, height: 1100 }}
    />
    <div
      style={{
        position: "absolute",
        left: PAD,
        right: PAD,
        top: 880,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Label theme="dark" style={{ alignSelf: "center" }}>
        17. 12. 2020
      </Label>
      <Headline size={104} theme="dark" style={{ marginTop: 34 }}>
        Finska savna
        <br />
        <Soft>je dediščina.</Soft>
      </Headline>
      <Lead theme="dark" size={38} style={{ marginTop: 28 }}>
        Finska kultura savnanja je od 17. decembra 2020 na Unescovem seznamu
        nesnovne kulturne dediščine človeštva.
      </Lead>
      <Lead theme="dark" size={26} style={{ marginTop: 26, color: dolium.secondaryDark }}>
        Vir: UNESCO, Vlada Republike Finske
      </Lead>
      <div style={{ marginTop: 40 }}>
        <DoliumLogo height={56} color={dolium.primaryLight} />
      </div>
    </div>
  </AbsoluteFill>
);
