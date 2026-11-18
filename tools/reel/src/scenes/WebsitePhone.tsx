import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { brand, geist, glide, manrope } from "../brand";
import { Logo } from "../Logo";

/** CSS width of the mobile site inside the phone. */
const SITE_WIDTH = 390;
const PHONE_WIDTH = 760;
const BEZEL = 22;
const SITE_SCALE = (PHONE_WIDTH - BEZEL * 2) / SITE_WIDTH;

/** Rise-in from the site's hero (`.hero-rise`), on the site's own pixel scale. */
const useRise = (start: number) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [start, start + 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: glide,
  });
  return { opacity: progress, translate: `0px ${(1 - progress) * 28}px` };
};

const SiteHeader = () => (
  <div
    style={{
      height: 84,
      padding: "0 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: brand.surface,
    }}
  >
    <Logo height={44} />
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          height: 36,
          padding: "0 16px",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          gap: 8,
          backgroundColor: brand.primary,
          color: brand.primaryForeground,
          fontFamily: geist,
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        <Img
          src={staticFile("home/icon-cart.svg")}
          style={{ width: 16, height: 16 }}
        />
        Košarica
      </div>
      <svg width={36} height={36} viewBox="-6 -6 36 36" fill="none">
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke={brand.ink}
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
    </div>
  </div>
);

const SiteHero = () => {
  const frame = useCurrentFrame();
  const title = useRise(10);
  const copy = useRise(16);
  const cta = useRise(22);

  return (
    <div
      style={{
        overflow: "hidden",
        borderRadius: "0 0 32px 32px",
        backgroundColor: brand.white,
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "1440 / 840",
          overflow: "hidden",
        }}
      >
        <Img
          src={staticFile("home/hero-bench.png")}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            scale: String(
              interpolate(frame, [0, 70], [1.045, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: glide,
              }),
            ),
          }}
        />
      </div>
      <div
        style={{
          padding: "32px 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 16,
        }}
      >
        <div
          style={{
            ...title,
            fontFamily: manrope,
            fontWeight: 800,
            fontSize: 32,
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
            color: brand.ink,
          }}
        >
          Hitro in zanesljivo
          <br />
          popravilo telefonov
          <br />v Kranju
        </div>
        <div
          style={{
            ...copy,
            fontFamily: manrope,
            fontSize: 16,
            lineHeight: 1.5,
            letterSpacing: "-0.04em",
            color: brand.text,
          }}
        >
          Zamenjamo razbit zaslon ali izrabljeno baterijo, popravimo pa tudi
          tablice, prenosnike in igralne konzole. Napravo najprej pregledamo in
          potrdimo ceno, šele nato jo popravimo.
        </div>
        <div
          style={{
            ...cta,
            height: 40,
            padding: "0 24px",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: brand.primary,
            color: brand.primaryForeground,
            fontFamily: geist,
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Rezerviraj popravilo
          <Img
            src={staticFile("home/icon-arrow-light.svg")}
            style={{ width: 16, height: 16 }}
          />
        </div>
      </div>
    </div>
  );
};

const services = [
  {
    title: "Menjava ekrana telefona",
    src: "home/service-screen.png",
    image: {
      top: "-7.01%",
      left: "-0.98%",
      height: "199.57%",
      width: "101.64%",
    },
  },
  {
    title: "Popravilo stekla kamere",
    src: "home/service-camera.png",
    image: { top: "-5.41%", left: "0%", height: "196.35%", width: "100%" },
  },
] as const;

const SiteServices = () => (
  <div style={{ padding: "64px 0", backgroundColor: brand.white }}>
    <div
      style={{
        padding: "0 16px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div
        style={{
          fontFamily: geist,
          fontWeight: 600,
          fontSize: 28,
          lineHeight: "36px",
          letterSpacing: "-1px",
          color: "#000000",
        }}
      >
        Kaj nagaja vašemu telefonu?
      </div>
      <div
        style={{
          fontFamily: geist,
          fontSize: 16,
          lineHeight: "24px",
          color: brand.body,
        }}
      >
        Izberite težavo. Sporočite model. Skupaj poiščemo naslednji korak.
      </div>
    </div>
    <div style={{ marginTop: 32, padding: "0 16px", display: "flex", gap: 20 }}>
      {services.map((service) => (
        <div
          key={service.src}
          style={{
            width: 305,
            flexShrink: 0,
            overflow: "hidden",
            borderRadius: 24,
            border: `1px solid ${brand.border}`,
            backgroundColor: brand.white,
          }}
        >
          <div
            style={{
              minHeight: 72,
              padding: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: geist,
              fontWeight: 600,
              fontSize: 20,
              lineHeight: "24px",
              color: "#000000",
              textAlign: "center",
            }}
          >
            {service.title}
          </div>
          <div
            style={{ position: "relative", height: 233, overflow: "hidden" }}
          >
            <Img
              src={staticFile(service.src)}
              style={{
                position: "absolute",
                maxWidth: "none",
                ...service.image,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

/** Browser chrome at the top of the phone screen, so it reads as a website. */
const AddressBar = () => (
  <div
    style={{
      height: 92,
      paddingTop: 40,
      display: "flex",
      justifyContent: "center",
      backgroundColor: brand.white,
    }}
  >
    <div
      style={{
        width: 300,
        height: 40,
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        backgroundColor: "#efefef",
        fontFamily: geist,
        fontSize: 16,
        fontWeight: 500,
        color: brand.ink,
      }}
    >
      <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
        <rect x={5} y={11} width={14} height={10} rx={2} fill={brand.ink} />
        <path
          d="M8 11V8a4 4 0 0 1 8 0v3"
          stroke={brand.ink}
          strokeWidth={2.4}
        />
      </svg>
      kranfix.si
    </div>
  </div>
);

const PhoneScreen = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: SITE_WIDTH,
        height: 1600 / SITE_SCALE,
        scale: String(SITE_SCALE),
        transformOrigin: "0 0",
        overflow: "hidden",
        backgroundColor: brand.white,
      }}
    >
      <div
        style={{
          translate: `0px ${interpolate(frame, [50, 92], [0, -650], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.65, 0, 0.35, 1),
          })}px`,
          paddingTop: 92,
        }}
      >
        <SiteHeader />
        <SiteHero />
        <SiteServices />
      </div>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
        <AddressBar />
      </div>
    </div>
  );
};

export const WebsitePhone = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: brand.surface }}>
      <div
        style={{
          position: "absolute",
          top: 210,
          left: 96,
          right: 96,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <Interactive.Div
          name="Phone scene title"
          style={{
            fontFamily: manrope,
            fontWeight: 800,
            fontSize: 96,
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
            color: "#0a0a0a",
            opacity: interpolate(frame, [0, 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
            translate: interpolate(frame, [0, 20], ["0px 60px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
          }}
        >
          Vse na enem mestu
        </Interactive.Div>
        <Interactive.Div
          name="Phone scene subtitle"
          style={{
            fontFamily: geist,
            fontWeight: 500,
            fontSize: 46,
            lineHeight: 1.3,
            color: "#525252",
            opacity: interpolate(frame, [6, 26], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
            translate: interpolate(frame, [6, 26], ["0px 60px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
          }}
        >
          Popravila, nakup, odkup in dodatki.
        </Interactive.Div>
      </div>

      <Interactive.Div
        name="Phone"
        style={{
          position: "absolute",
          top: 560,
          left: (1080 - PHONE_WIDTH) / 2,
          width: PHONE_WIDTH,
          height: 1600,
          padding: BEZEL,
          borderRadius: 104,
          backgroundColor: "#0a0a0a",
          boxShadow: "0 60px 120px -40px rgba(0,0,0,0.45)",
          translate: interpolate(frame, [0, 34], ["0px 1100px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.4, 0, 0.2, 1),
          }),
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            borderRadius: 82,
            backgroundColor: brand.white,
          }}
        >
          <PhoneScreen />
          <div
            style={{
              position: "absolute",
              top: 22,
              left: "50%",
              width: 190,
              height: 52,
              marginLeft: -95,
              borderRadius: 26,
              backgroundColor: "#0a0a0a",
            }}
          />
        </div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
