import { Folder, Still } from "remotion";
import { POST, STORY } from "../shared";
import { BatteryCover, BatteryCta, BatteryRule } from "./Battery";
import {
  BlackFridayPost,
  BlackFridayTeaserStory,
  CyberMondayStory,
} from "./BlackFriday";
import { LightsProducts, LightsRules } from "./Lights";
import {
  RenameAddress,
  RenameContact,
  RenameCover,
  RenameTeam,
} from "./Rename";

/**
 * KFX November feed posts (4:5) and stories (9:16), named by posting date. The reels (12, 16 and 23 Nov)
 * are compositions in Root.tsx. Captions are in tools/reel/out/kfx/november/captions.md.
 * The Black Friday offer is a placeholder until the owner sets it: edit the props here or in Studio.
 */
export const KfxNovemberPosts = () => (
  <Folder name="KFX-November">
    <Still id="KfxNov14-Rename-1" component={RenameCover} {...POST} />
    <Still id="KfxNov14-Rename-2" component={RenameTeam} {...POST} />
    <Still id="KfxNov14-Rename-3" component={RenameAddress} {...POST} />
    <Still id="KfxNov14-Rename-4" component={RenameContact} {...POST} />
    <Still id="KfxNov18-Battery-1" component={BatteryCover} {...POST} />
    <Still
      id="KfxNov18-Battery-2"
      component={BatteryRule}
      defaultProps={{ rule: 1 }}
      {...POST}
    />
    <Still
      id="KfxNov18-Battery-3"
      component={BatteryRule}
      defaultProps={{ rule: 2 }}
      {...POST}
    />
    <Still
      id="KfxNov18-Battery-4"
      component={BatteryRule}
      defaultProps={{ rule: 3 }}
      {...POST}
    />
    <Still
      id="KfxNov18-Battery-5"
      component={BatteryRule}
      defaultProps={{ rule: 4 }}
      {...POST}
    />
    <Still
      id="KfxNov18-Battery-6"
      component={BatteryRule}
      defaultProps={{ rule: 5 }}
      {...POST}
    />
    <Still id="KfxNov18-Battery-7" component={BatteryCta} {...POST} />
    <Still id="KfxNov20-Lights-1" component={LightsRules} {...POST} />
    <Still id="KfxNov20-Lights-2" component={LightsProducts} {...POST} />
    <Still
      id="KfxNov25-BlackFridayTeaserStory"
      component={BlackFridayTeaserStory}
      {...STORY}
    />
    <Still
      id="KfxNov27-BlackFriday"
      component={BlackFridayPost}
      defaultProps={{
        discount: "−XX %",
        subject: "na [kaj velja]",
        until: "Velja do [datum]",
      }}
      {...POST}
    />
    <Still
      id="KfxNov30-CyberMondayStory"
      component={CyberMondayStory}
      defaultProps={{
        discount: "−XX %",
        subject: "na [kaj velja]",
        until: "Samo še danes",
      }}
      {...STORY}
    />
  </Folder>
);
