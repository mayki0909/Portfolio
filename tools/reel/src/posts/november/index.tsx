import { Folder, Still } from "remotion";
import { POST, STORY } from "../shared";
import {
  PortAfter,
  PortBefore,
  ProcessCover,
  ProcessStep,
  ScreenAfter,
  ScreenBefore,
} from "./Carousels";
import {
  GiveawayLastDayStory,
  GiveawayPost,
  GiveawayReminderStory,
  GiveawayStory,
  GiveawayWinnerStory,
} from "./Giveaway";
import { TagBattery, TagScreen } from "./TagPosts";

/**
 * November feed posts (4:5) and stories (9:16), named by posting date. On 23 Nov 2026 everything
 * from 21 Nov moved 9 days later (owner on vacation), so most stills here now start with "Dec";
 * they keep this folder.
 * Captions and the schedule live in the "Kranfix social media plan" doc.
 */
export const NovemberPosts = () => (
  <Folder name="November">
    <Still id="Nov18-TagScreen" component={TagScreen} {...POST} />
    <Still id="Nov30-Giveaway" component={GiveawayPost} {...POST} />
    <Still id="Nov30-GiveawayStory" component={GiveawayStory} {...STORY} />
    <Still id="Dec03-Port-1" component={PortBefore} {...POST} />
    <Still id="Dec03-Port-2" component={PortAfter} {...POST} />
    <Still id="Dec06-TagBattery" component={TagBattery} {...POST} />
    <Still
      id="Dec07-GiveawayReminderStory"
      component={GiveawayReminderStory}
      {...STORY}
    />
    <Still id="Dec09-Screen-1" component={ScreenBefore} {...POST} />
    <Still id="Dec09-Screen-2" component={ScreenAfter} {...POST} />
    <Still
      id="Dec11-GiveawayLastDayStory"
      component={GiveawayLastDayStory}
      {...STORY}
    />
    <Still id="Dec12-Process-1" component={ProcessCover} {...POST} />
    <Still
      id="Dec12-Process-2"
      component={ProcessStep}
      defaultProps={{ step: 1 }}
      {...POST}
    />
    <Still
      id="Dec12-Process-3"
      component={ProcessStep}
      defaultProps={{ step: 2 }}
      {...POST}
    />
    <Still
      id="Dec12-Process-4"
      component={ProcessStep}
      defaultProps={{ step: 3 }}
      {...POST}
    />
    <Still
      id="Dec12-Process-5"
      component={ProcessStep}
      defaultProps={{ step: 4 }}
      {...POST}
    />
    <Still
      id="Dec12-GiveawayWinnerStory"
      component={GiveawayWinnerStory}
      {...STORY}
    />
  </Folder>
);
