import type { ReactNode } from "react";
import { interpolate } from "remotion";
import { brand, glide, manrope } from "../brand";
import { clamp } from "../location/shared";
import { INK, Label, LINE, MUTED, RED, SitePage, Tap, Title } from "../site/ui";

/**
 * kranfix.si/odkup inside the drawn phone, drawn after apps/webshop/components/buyback/* with the
 * site's own words (lib/buyback.ts). Type is set larger than on the site so it reads in a video.
 * Every screen takes `t`, the frame within its step.
 */
type ScreenProps = { readonly t: number };

const ease = { ...clamp, easing: glide };

const STEPS = ["Model", "Stanje", "Ocena", "Podatki", "Končano"] as const;

/** The /odkup page with its five-step bar (components/buyback/step-bar.tsx). */
export const Chrome = ({
  active,
  children,
}: {
  readonly active: number;
  readonly children: ReactNode;
}) => (
  <SitePage steps={STEPS} active={active}>
    {children}
  </SitePage>
);

/* ---------- 1. Model: type, pick the result ---------- */

const QUERY = "iPhone 15 128";
/** lib/buyback.ts modelLabel(): `${brand} ${name} (${storage})`. */
export const MODEL = "Apple iPhone 15 (128 GB)";
const TYPED_BY = 8 + QUERY.length * 2;
const MODEL_TAP = 58;

export const ModelScreen = ({ t }: ScreenProps) => {
  const typed = QUERY.slice(0, Math.max(0, Math.floor((t - 8) / 2)));
  const caret = t < TYPED_BY + 6 && Math.floor(t / 8) % 2 === 0;
  const picked = t >= MODEL_TAP + 2;
  return (
    <Chrome active={0}>
      <Title>Izberite model</Title>
      <div style={{ marginTop: 10, fontSize: 20, color: MUTED }}>
        Poiščite telefon in kapaciteto.
      </div>
      <div
        style={{
          marginTop: 28,
          height: 64,
          padding: "0 18px",
          display: "flex",
          alignItems: "center",
          border: `2px solid ${t >= 4 ? RED : LINE}`,
          borderRadius: 14,
          fontSize: 24,
        }}
      >
        {typed ? (
          <span>{typed}</span>
        ) : (
          <span style={{ color: MUTED }}>Na primer iPhone 15 128</span>
        )}
        <span
          style={{
            width: 2,
            height: 30,
            marginLeft: 2,
            backgroundColor: INK,
            opacity: caret ? 1 : 0,
          }}
        />
      </div>
      <div
        style={{
          marginTop: 16,
          padding: "20px 18px",
          borderRadius: 14,
          border: `2px solid ${picked ? RED : LINE}`,
          backgroundColor: picked ? "rgba(175,26,68,0.07)" : "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 22,
          fontWeight: 500,
          opacity: interpolate(t, [TYPED_BY, TYPED_BY + 6], [0, 1], clamp),
          translate: `0px ${interpolate(t, [TYPED_BY, TYPED_BY + 6], [12, 0], ease)}px`,
        }}
      >
        {MODEL}
        <span style={{ color: picked ? RED : MUTED, fontSize: 26 }}>›</span>
      </div>
      <Tap t={t} at={MODEL_TAP} x={160} y={214} />
    </Chrome>
  );
};

/* ---------- 2. Condition: four questions, then the grade ---------- */

/** lib/buyback.ts: the four categories and their questions (the third shortened). */
const QUESTIONS = [
  {
    category: "Funkcionalnost",
    prompt:
      "Ali se naprava vklopi in deluje, ne da bi bila priključena na elektriko?",
  },
  {
    category: "Stanje zaslona",
    prompt: "Ali zaslon naprave deluje in na njem ni poškodb?",
  },
  {
    category: "Ohranjenost ohišja",
    prompt: "Ali so sprednja stran, okvir in zadnji pokrov dobro ohranjeni?",
  },
  {
    category: "Delovanje tipk",
    prompt: "Ali so vsi gumbi prisotni in delujoči?",
  },
] as const;

/** lib/buyback.ts grades A–C. */
const GRADES = [
  { title: "Odlično", hint: "Brezhiben, kot nov" },
  { title: "Zelo dobro", hint: "Manjše sledi uporabe" },
  { title: "Dobro", hint: "Vidna obraba" },
] as const;

export const QUESTION_FRAMES = 24;
/** Frame within each question when "Da" is tapped. */
export const ANSWER_TAP = 15;
export const GRADES_FROM = QUESTIONS.length * QUESTION_FRAMES;
export const GRADE_TAP = GRADES_FROM + 30;

const Button = ({
  children,
  primary,
  pressed,
}: {
  readonly children: ReactNode;
  readonly primary?: boolean;
  readonly pressed?: boolean;
}) => (
  <div
    style={{
      flex: 1,
      height: 62,
      borderRadius: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 24,
      fontWeight: 600,
      color: primary ? "#fff" : INK,
      backgroundColor: primary ? RED : "#fff",
      border: primary ? "none" : `2px solid ${LINE}`,
      scale: pressed ? "0.96" : "1",
    }}
  >
    {children}
  </div>
);

export const ConditionScreen = ({ t }: ScreenProps) => {
  if (t < GRADES_FROM) {
    const q = Math.floor(t / QUESTION_FRAMES);
    const qt = t - q * QUESTION_FRAMES;
    const question = QUESTIONS[q];
    return (
      <Chrome active={1}>
        <div style={{ opacity: interpolate(qt, [0, 4], [0.2, 1], clamp) }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Label>{question.category}</Label>
            <div style={{ fontSize: 18, color: MUTED }}>
              {q + 1}/{QUESTIONS.length}
            </div>
          </div>
          <div style={{ marginTop: 16, height: 190 }}>
            <Title>{question.prompt}</Title>
          </div>
          <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
            <Button>Ne</Button>
            <Button primary pressed={qt >= ANSWER_TAP && qt < ANSWER_TAP + 4}>
              Da
            </Button>
          </div>
        </div>
        <Tap t={qt} at={ANSWER_TAP} x={270} y={267} />
      </Chrome>
    );
  }
  const picked = t >= GRADE_TAP + 2;
  return (
    <Chrome active={1}>
      <div
        style={{
          opacity: interpolate(
            t,
            [GRADES_FROM, GRADES_FROM + 5],
            [0.2, 1],
            clamp,
          ),
        }}
      >
        <Label>Ohranjenost naprave</Label>
        <div style={{ marginTop: 12 }}>
          <Title>Kako ohranjen je telefon?</Title>
        </div>
        <div
          style={{
            marginTop: 22,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {GRADES.map((grade, i) => {
            const selected = picked && i === 1;
            return (
              <div
                key={grade.title}
                style={{
                  padding: "16px 20px",
                  borderRadius: 16,
                  border: `2px solid ${selected ? RED : LINE}`,
                  backgroundColor: selected ? "rgba(175,26,68,0.07)" : "#fff",
                }}
              >
                <div
                  style={{ fontFamily: manrope, fontWeight: 700, fontSize: 24 }}
                >
                  {grade.title}
                </div>
                <div style={{ marginTop: 4, fontSize: 18, color: MUTED }}>
                  {grade.hint}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Tap t={t} at={GRADE_TAP} x={180} y={248} />
    </Chrome>
  );
};

/* ---------- 3. Estimate ---------- */

export const ESTIMATE_REVEAL = 30;
export const ESTIMATE_COUNTED = 62;

export const EstimateScreen = ({
  t,
  estimate,
}: ScreenProps & { readonly estimate: string }) => {
  if (t < ESTIMATE_REVEAL) {
    return (
      <Chrome active={2}>
        <div
          style={{
            marginTop: 150,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              border: `7px solid ${LINE}`,
              borderTopColor: RED,
              rotate: `${t * 14}deg`,
            }}
          />
          <div style={{ fontSize: 24, color: MUTED }}>Pripravljam …</div>
        </div>
      </Chrome>
    );
  }
  /* Count up to the leading number of `estimate` ("280 €"), then show it as given. */
  const target = Number(/^\d+/.exec(estimate)?.[0] ?? 0);
  const counting = t < ESTIMATE_COUNTED && target > 0;
  const shown = counting
    ? `${Math.round(target * interpolate(t, [ESTIMATE_REVEAL, ESTIMATE_COUNTED], [0, 1], ease))} €`
    : estimate;
  return (
    <Chrome active={2}>
      <div
        style={{
          padding: "26px 24px",
          borderRadius: 20,
          border: `2px solid ${LINE}`,
          opacity: interpolate(
            t,
            [ESTIMATE_REVEAL, ESTIMATE_REVEAL + 6],
            [0, 1],
            clamp,
          ),
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Label>Informativna ocena vrednosti</Label>
        </div>
        <div style={{ marginTop: 10, fontSize: 18, color: MUTED }}>
          {MODEL} · Zelo dobro
        </div>
        <div
          style={{
            marginTop: 18,
            fontFamily: manrope,
            fontWeight: 800,
            fontSize: 84,
            letterSpacing: "-0.04em",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {shown}
        </div>
        <div
          style={{
            display: "inline-block",
            marginTop: 8,
            padding: "4px 12px",
            borderRadius: 999,
            backgroundColor: "#f5f5f5",
            fontSize: 16,
            color: MUTED,
          }}
        >
          Primer
        </div>
      </div>
      <div
        style={{ marginTop: 22, fontSize: 18, lineHeight: 1.4, color: MUTED }}
      >
        Končna odkupna cena velja šele po pregledu naprave na Koroški cesti 4.
      </div>
    </Chrome>
  );
};

/* ---------- 4. Details and hand-over, then done ---------- */

export const HANDOVER_TAP = 46;
export const DONE_FROM = 74;

/** lib/buyback.ts handover options. */
const HANDOVERS = [
  {
    title: "Prinesem v servis",
    text: "Koroška cesta 4, 4000 Kranj. Oceno potrdimo ob pregledu.",
  },
  {
    title: "Pošljem po pošti",
    text: "Po prejemu naprave sporočimo končno ceno.",
  },
] as const;

/** components/buyback/done-step.tsx. */
export const DoneContent = () => (
  <div
    style={{
      marginTop: 110,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: 22,
    }}
  >
    <svg width="110" height="110" viewBox="0 0 110 110">
      <circle cx="55" cy="55" r="55" fill={brand.live} />
      <path
        d="M31 57 l16 16 l33 -36"
        fill="none"
        stroke="#fff"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <Title>Ocena je pripravljena</Title>
    <div style={{ fontSize: 20, lineHeight: 1.4, color: MUTED }}>
      Po pregledu potrdimo končno odkupno ceno.
    </div>
  </div>
);

export const DetailsScreen = ({ t }: ScreenProps) => {
  if (t >= DONE_FROM) {
    return (
      <Chrome active={4}>
        <div
          style={{
            opacity: interpolate(t, [DONE_FROM, DONE_FROM + 6], [0, 1], clamp),
          }}
        >
          <DoneContent />
        </div>
      </Chrome>
    );
  }
  const name = "Jan Novak".slice(0, Math.max(0, Math.floor((t - 4) / 2)));
  const picked = t >= HANDOVER_TAP + 2;
  return (
    <Chrome active={3}>
      <Title>Vaši podatki</Title>
      <div style={{ marginTop: 20, fontSize: 18, color: MUTED }}>
        Ime in priimek
      </div>
      <div
        style={{
          marginTop: 8,
          height: 60,
          padding: "0 18px",
          display: "flex",
          alignItems: "center",
          border: `2px solid ${LINE}`,
          borderRadius: 12,
          fontSize: 22,
        }}
      >
        {name}
      </div>
      <div style={{ marginTop: 26, fontSize: 20, fontWeight: 600 }}>
        Način oddaje
      </div>
      <div
        style={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {HANDOVERS.map((option, i) => {
          const selected = picked && i === 0;
          return (
            <div
              key={option.title}
              style={{
                padding: "16px 20px",
                borderRadius: 16,
                border: `2px solid ${selected ? RED : LINE}`,
                backgroundColor: selected ? "rgba(175,26,68,0.07)" : "#fff",
              }}
            >
              <div
                style={{ fontFamily: manrope, fontWeight: 700, fontSize: 24 }}
              >
                {option.title}
              </div>
              <div style={{ marginTop: 4, fontSize: 18, color: MUTED }}>
                {option.text}
              </div>
            </div>
          );
        })}
      </div>
      <Tap t={t} at={HANDOVER_TAP} x={160} y={272} />
    </Chrome>
  );
};
