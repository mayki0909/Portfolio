import { Img, Interactive } from "remotion";
import tube8 from "../../assets/products/tube-8-5.jpg";
import tubeBent from "../../assets/products/tube-10x2-bent.jpg";
import tubeStraight from "../../assets/products/tube-10x2-straight.jpg";
import { kfx } from "../../brand";
import { BookCta } from "../slides";
import {
  Accent,
  DOMAIN,
  Headline,
  Label,
  Lead,
  PAD,
  pageOf,
  PostFrame,
} from "../shared";

/**
 * 1 Dec carousel: the right inner tube. Sizes and prices are the inner tubes in the kfxservis.si shop
 * (Pnevmatike in zračnice) on 9 Nov 2026: check them before posting.
 */
const PAGES = 5;

/** The shop photos sit on light grey with a small mark in the corner: crop it off inside a rounded card. */
const ProductPhoto = ({
  src,
  size,
}: {
  readonly src: string;
  readonly size: number;
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: 32,
      overflow: "hidden",
      flexShrink: 0,
    }}
  >
    <Img
      src={src}
      style={{ width: "100%", height: "100%", objectFit: "cover", scale: 1.1 }}
    />
  </div>
);

/** 1: cover, the tube photo beside the title. */
export const TubesCover = () => (
  <PostFrame footerRight={pageOf(1, PAGES)}>
    <div
      style={{
        position: "absolute",
        top: 120,
        left: PAD,
        right: PAD,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Label>Rezervni deli</Label>
      <Headline size={124} style={{ marginTop: 28 }}>
        Prava zračnica
        <br />
        za vaš <Accent>skiro.</Accent>
      </Headline>
      <Lead style={{ marginTop: 28 }}>
        Kako najdete pravo velikost in pravi ventil.
      </Lead>
    </div>
    <div
      style={{
        position: "absolute",
        left: PAD,
        right: PAD,
        top: 590,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ProductPhoto src={tube8} size={580} />
    </div>
  </PostFrame>
);

/** 2: the size is printed on the tyre. A mock sidewall with the marking in raised letters. */
export const TubesSize = () => (
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
      <Label>Korak 1</Label>
      <Headline size={104} style={{ marginTop: 28 }}>
        Velikost piše
        <br />
        na gumi.
      </Headline>
    </div>
    <div
      style={{
        position: "absolute",
        top: 470,
        left: PAD,
        right: PAD,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {[
        { mark: "10 x 2.0", note: "premer 10 col, širina 2 coli" },
        { mark: "60/70-6.5", note: "isto kot 10 x 2.5, zapisano metrično" },
      ].map((row) => (
        <Interactive.Div
          key={row.mark}
          name={row.mark}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            padding: "28px 36px",
            borderRadius: 28,
            backgroundColor: "#1c1c1c",
          }}
        >
          <span
            style={{
              fontWeight: 800,
              fontSize: 76,
              letterSpacing: "0.02em",
              color: "#8f8f8f",
              textShadow:
                "0 -2px 0 rgba(255,255,255,0.35), 0 3px 3px rgba(0,0,0,0.9)",
              minWidth: 430,
            }}
          >
            {row.mark}
          </span>
          <span
            style={{ fontWeight: 500, fontSize: 32, lineHeight: 1.3, color: "#a3a3a3" }}
          >
            {row.note}
          </span>
        </Interactive.Div>
      ))}
      <Lead style={{ marginTop: 20 }}>
        Oznako najdete na boku pnevmatike. Zračnica mora imeti enako mero.
      </Lead>
    </div>
  </PostFrame>
);

const SIZES = [
  { size: "8,5 col", price: "12,99 €" },
  { size: "10 × 2,0", price: "od 13,99 €" },
  { size: "10 × 3,0", price: "od 13,90 €" },
  { size: "200 × 50", price: "9,99 €" },
] as const;

/** 3: the sizes the shop stocks, with prices. */
export const TubesStock = () => (
  <PostFrame footerRight={pageOf(3, PAGES)}>
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
      <Label>Na zalogi</Label>
      <Headline size={104} style={{ marginTop: 28 }}>
        Zračnice pri <Accent>KFX.</Accent>
      </Headline>
      <div style={{ marginTop: 56 }}>
        {SIZES.map((row) => (
          <Interactive.Div
            key={row.size}
            name={row.size}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              padding: "30px 0",
              borderTop: `3px solid ${kfx.border}`,
            }}
          >
            <span
              style={{
                fontWeight: 800,
                fontSize: 60,
                letterSpacing: "-0.03em",
                color: kfx.ink,
              }}
            >
              {row.size}
            </span>
            <span style={{ fontWeight: 600, fontSize: 48, color: kfx.primary }}>
              {row.price}
            </span>
          </Interactive.Div>
        ))}
      </div>
      <Lead style={{ marginTop: 24, fontSize: 32 }}>
        Na Drulovki 51 in na {DOMAIN}.
      </Lead>
    </div>
  </PostFrame>
);

/** 4: straight or bent valve, the two 10 × 2.0 tubes side by side. */
export const TubesValve = () => (
  <PostFrame footerRight={pageOf(4, PAGES)}>
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
      <Label>Korak 2</Label>
      <Headline size={104} style={{ marginTop: 28 }}>
        Raven ali
        <br />
        kriv ventil?
      </Headline>
    </div>
    <div
      style={{
        position: "absolute",
        top: 500,
        left: PAD,
        right: PAD,
        display: "flex",
        gap: 24,
      }}
    >
      {[
        { src: tubeStraight, label: "Raven" },
        { src: tubeBent, label: "Kriv" },
      ].map((tube) => (
        <div
          key={tube.label}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <ProductPhoto src={tube.src} size={440} />
          <span style={{ fontWeight: 600, fontSize: 40, color: kfx.ink }}>
            {tube.label}
          </span>
        </div>
      ))}
    </div>
    <Lead
      style={{
        position: "absolute",
        top: 1070,
        left: PAD,
        right: PAD,
        fontSize: 36,
      }}
    >
      Izberite takega, kot ga ima stara zračnica.
    </Lead>
  </PostFrame>
);

/** 5: or have it changed at the service. */
export const TubesCta = () => (
  <BookCta
    title={
      <>
        Ne želite
        <br />
        menjati <Accent>sami?</Accent>
      </>
    }
    lead="Zračnico zamenjamo v servisu na Drulovki 51. Skiro lahko prevzamemo tudi na vašem naslovu."
    footerRight={pageOf(5, PAGES)}
  />
);
