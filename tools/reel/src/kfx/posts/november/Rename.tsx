import { Interactive } from "remotion";
import service from "../../assets/service.jpg";
import { kfx } from "../../brand";
import {
  GlobeIcon,
  InstagramIcon,
  MapPinIcon,
  PhoneIcon,
} from "../../icons";
import { CroppedPhoto } from "../Photo";
import {
  Accent,
  CITY,
  DOMAIN,
  Headline,
  HOURS,
  IconTile,
  INSTAGRAM,
  KfxLogo,
  Label,
  Lead,
  PAD,
  pageOf,
  palette,
  PHONE,
  PostFrame,
  SpeedLines,
  STREET,
} from "../shared";

/**
 * 14 Nov carousel, two days after the rename reel: what's new (name, location, website, profile) and what
 * stays (the team). Drulovka 51 is a new address: the rename moved KFX there from Poštna ulica 3a.
 */
const PAGES = 4;

/** 1: Krgofix, struck through, is now KFX. */
export const RenameCover = () => (
  <PostFrame footerRight={pageOf(1, PAGES)}>
    <SpeedLines style={{ top: 150, right: 0 }} />
    <div
      style={{
        position: "absolute",
        top: 330,
        left: PAD,
        right: PAD,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <KfxLogo height={176} />
      <div style={{ marginTop: 96 }}>
        <Interactive.Div
          name="Old name"
          style={{
            position: "relative",
            alignSelf: "flex-start",
            display: "inline-block",
            fontWeight: 800,
            fontSize: 112,
            lineHeight: 1.04,
            letterSpacing: "-0.045em",
            color: "#a3a3a3",
          }}
        >
          Krgofix
          <div
            style={{
              position: "absolute",
              left: -10,
              right: -10,
              top: "54%",
              height: 12,
              borderRadius: 6,
              backgroundColor: kfx.primary,
            }}
          />
        </Interactive.Div>
        <Headline size={112}>
          je zdaj <Accent>KFX.</Accent>
        </Headline>
      </div>
      <Lead style={{ marginTop: 40 }}>Kaj je novo in kaj ostaja?</Lead>
    </div>
  </PostFrame>
);

/** 2: same team, over the service page's mechanic photo. */
export const RenameTeam = () => {
  const theme = "dark";
  return (
    <PostFrame theme={theme} footerRight={pageOf(2, PAGES)}>
      <CroppedPhoto
        src={service}
        sourceWidth={1440}
        sourceHeight={640}
        cropX={560}
        height={800}
        fadeTo={palette(theme).bg}
        fadeFrom={0.5}
      />
      <div
        style={{
          position: "absolute",
          left: PAD,
          right: PAD,
          bottom: 210,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Label>Ostaja</Label>
        <Headline size={132} theme={theme} style={{ marginTop: 28 }}>
          Ista ekipa.
        </Headline>
        <Lead theme={theme} style={{ marginTop: 24 }}>
          Trgovina in servis e-skirojev in e-koles v Kranju od leta 2019.
        </Lead>
      </div>
    </PostFrame>
  );
};

/** 3: the new address and opening hours. */
export const RenameAddress = () => (
  <PostFrame footerRight={pageOf(3, PAGES)}>
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
      <Label>Novo</Label>
      <Headline size={132} style={{ marginTop: 28 }}>
        Nova
        <br />
        lokacija.
      </Headline>

      <div
        style={{
          marginTop: 64,
          display: "flex",
          alignItems: "center",
          gap: 32,
        }}
      >
        <IconTile size={112} radius={28}>
          <MapPinIcon size={60} color={kfx.white} />
        </IconTile>
        <div>
          <Interactive.Div
            name="Street"
            style={{
              fontWeight: 800,
              fontSize: 72,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              color: kfx.ink,
            }}
          >
            {STREET}
          </Interactive.Div>
          <Interactive.Div
            name="City"
            style={{ fontWeight: 500, fontSize: 40, color: kfx.muted }}
          >
            {CITY}
          </Interactive.Div>
        </div>
      </div>

      <div style={{ marginTop: 64 }}>
        {HOURS.map((row) => (
          <Interactive.Div
            key={row.days}
            name={row.days}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              padding: "24px 0",
              borderTop: `3px solid ${kfx.border}`,
            }}
          >
            <span style={{ fontWeight: 500, fontSize: 40, color: kfx.muted }}>
              {row.days}
            </span>
            <span
              style={{
                fontWeight: 600,
                fontSize: 44,
                color: row.time === "Zaprto" ? kfx.muted : kfx.ink,
              }}
            >
              {row.time}
            </span>
          </Interactive.Div>
        ))}
      </div>
    </div>
  </PostFrame>
);

const CONTACT_ROWS = [
  { Icon: GlobeIcon, label: "Nova spletna stran", value: DOMAIN },
  { Icon: InstagramIcon, label: "Nov Instagram", value: INSTAGRAM },
  { Icon: PhoneIcon, label: "Telefon ostaja", value: PHONE },
] as const;

/** 4: website, Instagram handle and phone, on the dark footer colour. */
export const RenameContact = () => {
  const theme = "dark";
  return (
    <PostFrame theme={theme} footerRight={pageOf(4, PAGES)}>
      <SpeedLines style={{ top: 150, right: 0 }} />
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
        <Label>Novo</Label>
        <Headline size={132} theme={theme} style={{ marginTop: 28 }}>
          Kje nas
          <br />
          najdete.
        </Headline>

        <div style={{ marginTop: 72, display: "flex", flexDirection: "column", gap: 28 }}>
          {CONTACT_ROWS.map(({ Icon, label, value }) => (
            <Interactive.Div
              key={label}
              name={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 32,
                padding: 32,
                borderRadius: 28,
                backgroundColor: palette(theme).card,
              }}
            >
              <IconTile>
                <Icon size={48} color={kfx.white} />
              </IconTile>
              <div>
                <div
                  style={{
                    fontWeight: 500,
                    fontSize: 30,
                    color: palette(theme).muted,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 52,
                    letterSpacing: "-0.02em",
                    color: palette(theme).ink,
                  }}
                >
                  {value}
                </div>
              </div>
            </Interactive.Div>
          ))}
        </div>
      </div>
    </PostFrame>
  );
};
