import { brand } from "../../brand";
import {
  BadgeRow as SharedBadgeRow,
  JoinLine,
  Steps,
  StoryFrame,
} from "../giveaway";
import {
  Accent,
  Badge,
  Headline,
  Lead,
  PAD,
  PhotoCard,
  PostFrame,
} from "../shared";

/** Giveaway 1 ("Popravilo na naš račun"), 21 Nov – 2 Dec 2026, draw on Thu 3 Dec. */
const DEADLINE = "Do srede, 2. 12.";

const BadgeRow = () => (
  <SharedBadgeRow label="Nagradna igra" deadline={DEADLINE} />
);

/** Sat 21 Nov feed post. */
export const GiveawayPost = () => (
  <PostFrame>
    <div
      style={{
        position: "absolute",
        top: 96,
        left: PAD,
        right: PAD,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <BadgeRow />
      <Headline size={120} style={{ marginTop: 40 }}>
        <div>Popravilo</div>
        <Accent>na naš račun.</Accent>
      </Headline>
      <Lead style={{ marginTop: 24 }}>
        Delo je na nas, plačaš samo nadomestne dele.
      </Lead>
      <PhotoCard
        src="home/process-3.png"
        style={{
          marginTop: 40,
          width: "100%",
          height: 360,
          objectPosition: "50% 55%",
        }}
      />
      <div style={{ marginTop: 40 }}>
        <Steps />
      </div>
    </div>
  </PostFrame>
);

/** Sat 21 Nov story: the giveaway opens. */
export const GiveawayStory = () => (
  <StoryFrame>
    <BadgeRow />
    <Headline size={140} style={{ marginTop: 48 }}>
      <div>Popravilo</div>
      <Accent>na naš račun.</Accent>
    </Headline>
    <Lead style={{ marginTop: 28 }}>
      Delo je na nas, plačaš samo nadomestne dele.
    </Lead>
    <PhotoCard
      src="home/process-3.png"
      style={{
        marginTop: 48,
        width: "100%",
        height: 440,
        objectPosition: "50% 55%",
      }}
    />
    <div style={{ marginTop: 56 }}>
      <Steps size={36} />
    </div>
    <JoinLine>Sodeluješ pod objavo na našem profilu.</JoinLine>
  </StoryFrame>
);

/** Sat 28 Nov story: four days left. */
export const GiveawayReminderStory = () => (
  <StoryFrame>
    <Badge>Nagradna igra</Badge>
    <Headline size={240} style={{ marginTop: 48, lineHeight: 0.98 }}>
      <div>Še</div>
      <Accent>4 dni.</Accent>
    </Headline>
    <Lead style={{ marginTop: 40, fontSize: 46 }}>
      Do srede, 2. 12., lahko še sodeluješ v nagradni igri za popravilo na
      naš račun.
    </Lead>
    <div style={{ marginTop: 80 }}>
      <Steps size={36} />
    </div>
    <JoinLine>Sodeluješ pod objavo na našem profilu.</JoinLine>
  </StoryFrame>
);

/** Wed 2 Dec story: last day. */
export const GiveawayLastDayStory = () => (
  <StoryFrame>
    <Badge>Nagradna igra</Badge>
    <Headline size={220} style={{ marginTop: 48, lineHeight: 0.98 }}>
      <div>Zadnji</div>
      <Accent>dan!</Accent>
    </Headline>
    <Lead style={{ marginTop: 40, fontSize: 46 }}>
      Nagradna igra za popravilo na naš račun se zaključi danes ob 23.59.
    </Lead>
    <div style={{ marginTop: 80 }}>
      <Steps size={36} />
    </div>
    <JoinLine>Sodeluješ pod objavo na našem profilu.</JoinLine>
  </StoryFrame>
);

/**
 * Empty space under "prejme:" for the winner. The name is not in the image: the owner adds it in
 * Instagram as a Mention sticker, which is tappable and notifies the winner (steps on the timeline page).
 */
const MENTION_SPACE = 260;

/** Thu 3 Dec story: the draw result. Gender-neutral wording ("prejme"). */
export const GiveawayWinnerStory = () => (
  <StoryFrame>
    <Badge>Nagradna igra</Badge>
    <Lead style={{ marginTop: 48, fontSize: 52, color: brand.ink }}>
      Žreb je opravljen. Popravilo na naš račun prejme:
    </Lead>
    <div style={{ height: MENTION_SPACE }} />
    <Lead style={{ marginTop: 0, fontSize: 46 }}>
      Čestitamo! Javi se nam v sporočilu do ponedeljka, 7. 12.
    </Lead>
    <JoinLine>Hvala vsem, ki ste sodelovali.</JoinLine>
  </StoryFrame>
);
