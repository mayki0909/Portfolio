import type { ReactNode } from "react";
import { Interactive } from "remotion";
import { brand } from "../../brand";
import { PhoneSlide } from "../layouts";
import {
  Accent,
  Headline,
  Lead,
  PAD,
  Photo,
  PhotoCard,
  PostFrame,
  StateChip,
} from "../shared";

/* ---------- Tue 24 Nov: charging port, 2 slides ---------- */

/** The port shots crop the phone at both sides, so they run edge to edge. */
const PortSlide = ({
  state,
  src,
  headline,
  lead,
}: {
  readonly state: "Pred" | "Po";
  readonly src: string;
  readonly headline: ReactNode;
  readonly lead: string;
}) => (
  <PostFrame>
    <div style={{ position: "absolute", top: 96, left: PAD, right: PAD }}>
      <Headline size={104}>{headline}</Headline>
      <Lead style={{ marginTop: 24 }}>{lead}</Lead>
    </div>
    <Photo
      src={src}
      style={{
        position: "absolute",
        top: 520,
        left: 0,
        width: 1080,
        height: 640,
        objectFit: "cover",
        objectPosition: "50% 50%",
      }}
    />
    <div style={{ position: "absolute", top: 500, left: PAD }}>
      <StateChip state={state} />
    </div>
  </PostFrame>
);

export const PortBefore = () => (
  <PortSlide
    state="Pred"
    src="home/service-port.png"
    headline={
      <>
        <div>Telefon se</div>
        <Accent>ne polni?</Accent>
      </>
    }
    lead="Ali moraš kabel držati pod točno določenim kotom?"
  />
);

export const PortAfter = () => (
  <PortSlide
    state="Po"
    src="home/service-port-fixed.png"
    headline={
      <>
        <div>Pogosto je kriv</div>
        <Accent>priključek.</Accent>
      </>
    }
    lead="Polnilni priključek pregledamo in ga po potrebi zamenjamo."
  />
);

/* ---------- Mon 30 Nov: screen replacement, 2 slides ---------- */

const ScreenSlide = PhoneSlide;

export const ScreenBefore = () => (
  <ScreenSlide
    state="Pred"
    src="home/service-screen.png"
    headline={
      <>
        <Accent>Razbit</Accent>
        <div>ekran?</div>
      </>
    }
    lead="Črte, črn zaslon ali mavrične lise po padcu?"
  />
);

export const ScreenAfter = () => (
  <ScreenSlide
    state="Po"
    src="home/service-screen-fixed.png"
    headline={
      <>
        <div>Kot</div>
        <Accent>nov.</Accent>
      </>
    }
    lead={
      <>
        Zamenjamo ekran, na popravilo dobiš{" "}
        <span style={{ whiteSpace: "nowrap" }}>90-dnevno</span> garancijo.
      </>
    }
  />
);

/* ---------- Thu 3 Dec: how a repair works, 5 slides ---------- */

/** Copied from apps/webshop/components/home/process-section.tsx. Update both if they change. */
const STEPS = [
  {
    title: ["Prijava in", "diagnoza"],
    text: "Opišeš težavo in predaš telefon v pregled. Z diagnozo ugotovimo vzrok težave in pripravimo oceno stroškov.",
    src: "home/process-1.png",
  },
  {
    title: ["Potrditev", "popravila"],
    text: "Predstavimo ti predlagano rešitev in stroške. Popravilo se začne, ko potrdiš ponudbo.",
    src: "home/process-2.png",
  },
  {
    title: ["Strokovno", "popravilo"],
    text: "Odpravimo ugotovljeno napako in zamenjamo potrebne dele. Nato preverimo delovanje telefona.",
    src: "home/process-3.png",
  },
  {
    title: ["Preizkus in", "prevzem"],
    text: "Po končnem preizkusu ti predamo telefon in pojasnimo, kaj je bilo popravljeno. Tvoj telefon je pripravljen za uporabo.",
    src: "home/process-4.png",
  },
] as const;

const NumberDot = ({ n }: { readonly n: number }) => (
  <div
    style={{
      position: "absolute",
      top: 20,
      left: 20,
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: brand.primary,
      color: brand.primaryForeground,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 600,
      fontSize: 34,
    }}
  >
    {n}
  </div>
);

export const ProcessCover = () => (
  <PostFrame>
    <div style={{ position: "absolute", top: 96, left: PAD, right: PAD }}>
      <Headline size={120}>
        <div>Kako poteka</div>
        <Accent>popravilo?</Accent>
      </Headline>
      <Lead style={{ marginTop: 24 }}>
        Štirje koraki, brez presenečenj pri ceni.
      </Lead>
      <Interactive.Div
        name="Step photos"
        style={{
          marginTop: 48,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
        }}
      >
        {STEPS.map((step, index) => (
          <div key={step.src} style={{ position: "relative", height: 300 }}>
            <PhotoCard
              src={step.src}
              style={{ width: "100%", height: "100%", borderRadius: 28 }}
            />
            <NumberDot n={index + 1} />
          </div>
        ))}
      </Interactive.Div>
    </div>
  </PostFrame>
);

export type ProcessStepProps = {
  /** 1–4. */
  readonly step: number;
};

export const ProcessStep = ({ step }: ProcessStepProps) => {
  const data = STEPS[step - 1];

  return (
    <PostFrame>
      <div style={{ position: "absolute", top: 96, left: PAD, right: PAD }}>
        <Interactive.Div
          name="Progress"
          style={{ display: "flex", alignItems: "center", gap: 24 }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            {STEPS.map((item, index) => (
              <div
                key={item.src}
                style={{
                  width: 64,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor:
                    index < step ? brand.primary : brand.surface,
                }}
              />
            ))}
          </div>
          <div style={{ fontSize: 32, fontWeight: 500, color: brand.muted }}>
            Korak {step} od {STEPS.length}
          </div>
        </Interactive.Div>
        <Headline size={110} style={{ marginTop: 40 }}>
          <div>{data.title[0]}</div>
          <Accent>{data.title[1]}</Accent>
        </Headline>
        <Lead style={{ marginTop: 28, fontSize: 38 }}>{data.text}</Lead>
      </div>
      <PhotoCard
        src={data.src}
        style={{
          position: "absolute",
          left: PAD,
          right: PAD,
          bottom: 210,
          width: 1080 - 2 * PAD,
          height: 470,
        }}
      />
    </PostFrame>
  );
};
