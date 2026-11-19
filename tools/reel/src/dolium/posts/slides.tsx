import type { ReactNode } from "react";
import { Img, Interactive } from "remotion";
import { dmSerif, dolium } from "../brand";
import checkIcon from "../assets/posts/icons/Check.svg";
import {
  Button,
  euro,
  Headline,
  Label,
  Lead,
  PAD,
  palette,
  persons,
  Photo,
  PostFrame,
  priceOf,
  type Model,
  type Theme,
} from "./shared";

/** Carousel slide layouts for the Savne Dolium posts. */

/** A photo across the top fading into night, with the series label, headline and lead underneath. */
export const PhotoCover = ({
  photo,
  focus,
  photoHeight = 860,
  label,
  title,
  lead,
  footerRight,
  titleSize = 116,
  scale,
}: {
  readonly photo: string;
  readonly focus?: string;
  readonly photoHeight?: number;
  readonly label: string;
  readonly title: ReactNode;
  readonly lead?: ReactNode;
  readonly footerRight?: ReactNode;
  readonly titleSize?: number;
  readonly scale?: number;
}) => {
  const theme = "dark";
  return (
    <PostFrame theme={theme} footerRight={footerRight}>
      <Photo
        src={photo}
        focus={focus}
        fadeTo={dolium.night}
        fadeFrom={0.42}
        scale={scale}
        style={{ left: 0, right: 0, top: 0, height: photoHeight }}
      />
      <div
        style={{
          position: "absolute",
          left: PAD,
          right: PAD,
          bottom: 190,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Label theme={theme}>{label}</Label>
        <Headline size={titleSize} theme={theme} style={{ marginTop: 30 }}>
          {title}
        </Headline>
        {lead ? (
          <Lead theme={theme} style={{ marginTop: 26 }}>
            {lead}
          </Lead>
        ) : null}
      </div>
    </PostFrame>
  );
};

/** The series label at the top of a light slide. */
const TopLabel = ({ children }: { readonly children: string }) => (
  <div style={{ position: "absolute", top: 96, left: PAD }}>
    <Label>{children}</Label>
  </div>
);

/** One tip: the tip in serif, the explanation in sans, an optional photo. */
export const TipSlide = ({
  series,
  title,
  body,
  footerRight,
  photo,
  focus,
}: {
  readonly series: string;
  readonly title: ReactNode;
  readonly body: ReactNode;
  readonly footerRight?: ReactNode;
  readonly photo?: string;
  readonly focus?: string;
}) => (
  <PostFrame footerRight={footerRight}>
    <TopLabel>{series}</TopLabel>
    {photo ? (
      <Photo
        src={photo}
        focus={focus}
        radius={36}
        style={{ left: PAD, right: PAD, top: 200, height: 400 }}
      />
    ) : null}
    {/* Without a photo the tip sits in the middle of the page, between the label and the footer. */}
    <div
      style={{
        position: "absolute",
        left: PAD,
        right: PAD,
        top: photo ? 640 : 180,
        bottom: photo ? undefined : 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: photo ? "flex-start" : "center",
      }}
    >
      <Headline size={photo ? 70 : 100}>{title}</Headline>
      <Lead size={photo ? 40 : 46} style={{ marginTop: 30 }}>
        {body}
      </Lead>
    </div>
  </PostFrame>
);

/** A light round tile holding one of the site's line icons (public/icons, drawn in primaryDark). */
export const IconCircle = ({
  src,
  size = 112,
}: {
  readonly src: string;
  readonly size?: number;
}) => (
  <div
    style={{
      width: size,
      height: size,
      flexShrink: 0,
      borderRadius: size,
      backgroundColor: dolium.white,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Img src={src} style={{ width: size * 0.56, height: size * 0.56 }} />
  </div>
);

/** A process as icon rows: "Rezervacijo opravite prek spleta." */
export const StepsSlide = ({
  series,
  title,
  steps,
  footerRight,
}: {
  readonly series: string;
  readonly title: ReactNode;
  readonly steps: readonly { readonly icon: string; readonly text: ReactNode }[];
  readonly footerRight?: ReactNode;
}) => (
  <PostFrame footerRight={footerRight}>
    <TopLabel>{series}</TopLabel>
    <div
      style={{
        position: "absolute",
        left: PAD,
        right: PAD,
        top: 180,
        bottom: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Headline size={100}>{title}</Headline>
      <div
        style={{
          marginTop: 64,
          display: "flex",
          flexDirection: "column",
          gap: 44,
        }}
      >
        {steps.map((step, index) => (
          <div
            key={index}
            style={{ display: "flex", alignItems: "center", gap: 36 }}
          >
            <IconCircle src={step.icon} size={128} />
            <Lead size={44} style={{ color: dolium.primaryDark, flex: 1 }}>
              {step.text}
            </Lead>
          </div>
        ))}
      </div>
    </div>
  </PostFrame>
);

/** A check-marked list under a rounded photo: what the rental includes. */
export const ChecklistSlide = ({
  series,
  title,
  items,
  photo,
  focus,
  footerRight,
}: {
  readonly series: string;
  readonly title: ReactNode;
  readonly items: readonly ReactNode[];
  readonly photo: string;
  readonly focus?: string;
  readonly footerRight?: ReactNode;
}) => (
  <PostFrame footerRight={footerRight}>
    <TopLabel>{series}</TopLabel>
    <Photo
      src={photo}
      focus={focus}
      radius={36}
      style={{ left: PAD, right: PAD, top: 200, height: 430 }}
    />
    <div
      style={{
        position: "absolute",
        left: PAD,
        right: PAD,
        top: 676,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Headline size={80}>{title}</Headline>
      <div
        style={{
          marginTop: 36,
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            style={{ display: "flex", alignItems: "center", gap: 24 }}
          >
            <Img src={checkIcon} style={{ width: 46, height: 46 }} />
            <Lead size={38} style={{ color: dolium.primaryDark }}>
              {item}
            </Lead>
          </div>
        ))}
      </div>
    </div>
  </PostFrame>
);

/** Price rows with hairlines: label and note on the left, the price on the right. */
export const PriceSlide = ({
  series,
  title,
  rows,
  note,
  footerRight,
}: {
  readonly series: string;
  readonly title: ReactNode;
  readonly rows: readonly {
    readonly label: string;
    readonly note?: string;
    readonly price: string;
  }[];
  readonly note: ReactNode;
  readonly footerRight?: ReactNode;
}) => (
  <PostFrame footerRight={footerRight}>
    <TopLabel>{series}</TopLabel>
    <div
      style={{
        position: "absolute",
        left: PAD,
        right: PAD,
        top: 220,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Headline size={100}>{title}</Headline>
      <div style={{ marginTop: 50 }}>
        {rows.map((row) => (
          <div
            key={row.label}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "30px 0",
              borderBottom: `2px solid ${dolium.secondaryLight}`,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 42,
                  fontWeight: 500,
                  color: dolium.primaryDark,
                }}
              >
                {row.label}
              </div>
              {row.note ? (
                <div
                  style={{
                    fontSize: 30,
                    marginTop: 6,
                    color: palette("light").muted,
                  }}
                >
                  {row.note}
                </div>
              ) : null}
            </div>
            <div
              style={{
                fontFamily: dmSerif,
                fontSize: 76,
                whiteSpace: "nowrap",
                color: dolium.primaryDark,
              }}
            >
              {row.price}
            </div>
          </div>
        ))}
      </div>
      <Lead size={32} style={{ marginTop: 36 }}>
        {note}
      </Lead>
    </div>
  </PostFrame>
);

/** The last slide: a headline, a line or two, the link as a button and the phone number. */
export const CtaSlide = ({
  theme = "dark",
  label,
  title,
  lead,
  button,
  phone,
  footerRight,
  photo,
  focus,
  titleSize = 104,
}: {
  readonly theme?: Theme;
  readonly label?: string;
  readonly titleSize?: number;
  readonly title: ReactNode;
  readonly lead?: ReactNode;
  readonly button: string;
  readonly phone?: string;
  readonly footerRight?: ReactNode;
  readonly photo?: string;
  readonly focus?: string;
}) => (
  <PostFrame theme={theme} footerRight={footerRight}>
    {photo ? (
      <Photo
        src={photo}
        focus={focus}
        fadeTo={palette(theme).bg}
        fadeFrom={0.35}
        style={{ left: 0, right: 0, top: 0, height: 560 }}
      />
    ) : null}
    <div
      style={{
        position: "absolute",
        left: PAD,
        right: PAD,
        bottom: 200,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {label ? <Label theme={theme}>{label}</Label> : null}
      <Headline size={titleSize} theme={theme} style={{ marginTop: label ? 30 : 0 }}>
        {title}
      </Headline>
      {lead ? (
        <Lead theme={theme} style={{ marginTop: 28 }}>
          {lead}
        </Lead>
      ) : null}
      <Button theme={theme} style={{ marginTop: 48 }}>
        {button}
      </Button>
      {phone ? (
        <Lead theme={theme} size={36} style={{ marginTop: 28 }}>
          ali pokličite {phone}
        </Lead>
      ) : null}
    </div>
  </PostFrame>
);

/** One sauna model: photo, capacity, name and length, the shop's price, and what the price includes. */
export const ProductSlide = ({
  series,
  model,
  photo,
  focus,
  footerRight,
}: {
  readonly series: string;
  readonly model: Model;
  readonly photo: string;
  readonly focus?: string;
  readonly footerRight?: ReactNode;
}) => (
  <PostFrame footerRight={footerRight}>
    <TopLabel>{series}</TopLabel>
    <Photo
      src={photo}
      focus={focus}
      radius={36}
      style={{ left: PAD, right: PAD, top: 200, height: 560 }}
    />
    {model.badge ? (
      <div style={{ position: "absolute", top: 230, left: PAD + 30 }}>
        <Label filled style={{ fontSize: 24, padding: "10px 22px" }}>
          {model.badge}
        </Label>
      </div>
    ) : null}
    <div
      style={{
        position: "absolute",
        left: PAD,
        right: PAD,
        top: 800,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Headline size={104}>Za {persons(model.persons)}</Headline>
      <Lead size={40} style={{ marginTop: 14, color: dolium.primaryDark }}>
        {model.name}, {model.length}
      </Lead>
      <div
        style={{
          marginTop: 28,
          display: "flex",
          alignItems: "baseline",
          gap: 22,
        }}
      >
        <Interactive.Div
          name="Price"
          style={{
            fontFamily: dmSerif,
            fontSize: 72,
            color: dolium.primaryDark,
          }}
        >
          {euro(priceOf(model))}
        </Interactive.Div>
        {model.discount ? (
          <div
            style={{
              fontSize: 36,
              color: palette("light").muted,
              textDecoration: "line-through",
            }}
          >
            {euro(model.price)}
          </div>
        ) : null}
      </div>
      <Lead size={28} style={{ marginTop: 6, color: palette("light").muted }}>
        Osnovni komplet z dostavo, brez peči.
      </Lead>
    </div>
  </PostFrame>
);

/** A white card with a product cut-out, its name and price. */
export const ProductCard = ({
  photo,
  name,
  price,
  height,
  cover = false,
}: {
  readonly photo: string;
  readonly name: string;
  readonly price: string;
  readonly height: number;
  /** Fill the picture area (for a photo rather than a cut-out on white). */
  readonly cover?: boolean;
}) => (
  <div
    style={{
      flex: 1,
      height,
      borderRadius: 36,
      backgroundColor: dolium.white,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        flex: 1,
        position: "relative",
        margin: cover ? 0 : 40,
        marginBottom: cover ? 0 : 10,
      }}
    >
      <Img
        src={photo}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: cover ? "cover" : "contain",
        }}
      />
    </div>
    <div style={{ padding: "26px 36px 34px" }}>
      <Lead size={34} style={{ color: dolium.primaryDark, lineHeight: 1.2 }}>
        {name}
      </Lead>
      <div
        style={{
          fontFamily: dmSerif,
          fontSize: 60,
          marginTop: 8,
          color: dolium.primaryDark,
        }}
      >
        {price}
      </div>
    </div>
  </div>
);

/** Two product cards side by side under a short headline. */
export const GiftSlide = ({
  series,
  title,
  products,
  footerRight,
}: {
  readonly series: string;
  readonly title: ReactNode;
  readonly products: readonly {
    readonly photo: string;
    readonly name: string;
    readonly price: string;
    readonly cover?: boolean;
  }[];
  readonly footerRight?: ReactNode;
}) => (
  <PostFrame footerRight={footerRight}>
    <TopLabel>{series}</TopLabel>
    <div
      style={{
        position: "absolute",
        left: PAD,
        right: PAD,
        top: 210,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Headline size={84}>{title}</Headline>
      <div style={{ marginTop: 48, display: "flex", gap: 32 }}>
        {products.map((product) => (
          <ProductCard key={product.name} {...product} height={720} />
        ))}
      </div>
    </div>
  </PostFrame>
);
