import { Img, Interactive } from "remotion";
import hero from "../../assets/hero.jpg";
import brakeLight from "../../assets/products/brake-light-g30.jpg";
import reflectors from "../../assets/products/reflectors.jpg";
import vest from "../../assets/products/vest-led.jpg";
import { kfx } from "../../brand";
import { CroppedPhoto } from "../Photo";
import {
  Accent,
  DOMAIN,
  Headline,
  Label,
  Lead,
  PAD,
  pageOf,
  palette,
  PostFrame,
} from "../shared";

/**
 * 20 Nov carousel: it's dark before five, so lights. The four requirements are the police's wording for
 * e-scooters at night and in poor visibility (policija.si, "Varno z e-skirojem"). Products and prices are
 * from kfxservis.si (Svetila and Dodatki) on 9 Nov 2026: check them before posting.
 */
const PAGES = 2;

const REQUIREMENTS = [
  { color: "#ffffff", ring: true, text: "bela luč spredaj" },
  { color: "#e11d48", ring: false, text: "rdeča luč zadaj" },
  { color: "#b91c1c", ring: false, text: "rdeč odsevnik zadaj" },
  { color: "#f59e0b", ring: false, text: "rumeni ali oranžni odsevniki ob strani" },
] as const;

/** 1: the law, over the hero scooter at dusk. */
export const LightsRules = () => {
  const theme = "dark";
  return (
    <PostFrame theme={theme} footerRight={pageOf(1, PAGES)}>
      <CroppedPhoto
        src={hero}
        sourceWidth={1440}
        sourceHeight={800}
        cropX={0}
        height={700}
        fadeTo={palette(theme).bg}
        fadeFrom={0.3}
        style={{ filter: "brightness(0.55)" }}
      />
      <div
        style={{
          position: "absolute",
          left: PAD,
          right: PAD,
          top: 400,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Headline size={112} theme={theme}>
          Pred peto je
          <br />
          že <Accent>tema.</Accent>
        </Headline>
        <Lead theme={theme} style={{ marginTop: 28 }}>
          Ponoči in ob slabi vidljivosti mora imeti e-skiro:
        </Lead>
        <div
          style={{
            marginTop: 32,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {REQUIREMENTS.map((item) => (
            <Interactive.Div
              key={item.text}
              name={item.text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                fontWeight: 600,
                fontSize: 42,
                letterSpacing: "-0.01em",
                color: palette(theme).ink,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  flexShrink: 0,
                  backgroundColor: item.color,
                  boxShadow: `0 0 24px ${item.color}`,
                }}
              />
              {item.text}
            </Interactive.Div>
          ))}
        </div>
        <Interactive.Div
          name="Source"
          style={{
            marginTop: 28,
            fontWeight: 500,
            fontSize: 26,
            color: palette(theme).muted,
          }}
        >
          Vir: policija.si
        </Interactive.Div>
      </div>
    </PostFrame>
  );
};

const PRODUCTS = [
  { src: vest, name: "Odsevni jopič LED", price: "17,99 €" },
  { src: brakeLight, name: "Zadnja zavorna luč", price: "14,99 €" },
  { src: reflectors, name: "Odsevne nalepke", price: "9,99 €" },
] as const;

/** 2: three products from the shop that help. */
export const LightsProducts = () => (
  <PostFrame footerRight={pageOf(2, PAGES)}>
    <div
      style={{
        position: "absolute",
        top: 110,
        left: PAD,
        right: PAD,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Label>V trgovini KFX</Label>
      <Headline size={112} style={{ marginTop: 28 }}>
        Bodite <Accent>vidni.</Accent>
      </Headline>
      <Lead style={{ marginTop: 20 }}>
        Luči in odsevniki za e-skiro, v Kranju in na {DOMAIN}.
      </Lead>
    </div>
    <div
      style={{
        position: "absolute",
        top: 580,
        left: PAD,
        right: PAD,
        display: "flex",
        gap: 24,
      }}
    >
      {PRODUCTS.map((product) => (
        <Interactive.Div
          key={product.name}
          name={product.name}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            borderRadius: 28,
            overflow: "hidden",
            border: `3px solid ${kfx.border}`,
            backgroundColor: kfx.white,
          }}
        >
          <div style={{ height: 300, overflow: "hidden" }}>
            {/* Scaled up a touch so the corner mark on the shop photos stays outside the card. */}
            <Img
              src={product.src}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                scale: 1.12,
              }}
            />
          </div>
          <div style={{ padding: "24px 24px 28px" }}>
            <div
              style={{
                fontWeight: 600,
                fontSize: 30,
                lineHeight: 1.2,
                color: kfx.ink,
                minHeight: 72,
              }}
            >
              {product.name}
            </div>
            <div
              style={{
                marginTop: 12,
                fontWeight: 800,
                fontSize: 44,
                letterSpacing: "-0.03em",
                color: kfx.primary,
              }}
            >
              {product.price}
            </div>
          </div>
        </Interactive.Div>
      ))}
    </div>
  </PostFrame>
);
