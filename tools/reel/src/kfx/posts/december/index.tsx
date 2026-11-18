import { Folder, Still } from "remotion";
import { POST, STORY } from "../shared";
import { FirstRideCover, FirstRideCta, FirstRideStep } from "./FirstRide";
import { RulesCover, RulesRule } from "./Rules";
import {
  ChristmasPost,
  DiagnosticsPost,
  HolidayHoursPost,
  JanuaryPost,
  LastOrderPost,
  MiklavzStory,
} from "./Singles";
import {
  TubesCover,
  TubesCta,
  TubesSize,
  TubesStock,
  TubesValve,
} from "./Tubes";

/**
 * KFX December feed posts (4:5) and the Miklavž Story (9:16), named by posting date. The December reels
 * (3, 7, 14 and 30 Dec) are not made yet. The last order day and holiday hours are placeholders until the
 * owner sets them: edit the props here or in Studio.
 */
export const KfxDecemberPosts = () => (
  <Folder name="KFX-December">
    <Still id="KfxDec01-Tubes-1" component={TubesCover} {...POST} />
    <Still id="KfxDec01-Tubes-2" component={TubesSize} {...POST} />
    <Still id="KfxDec01-Tubes-3" component={TubesStock} {...POST} />
    <Still id="KfxDec01-Tubes-4" component={TubesValve} {...POST} />
    <Still id="KfxDec01-Tubes-5" component={TubesCta} {...POST} />
    <Still id="KfxDec05-MiklavzStory" component={MiklavzStory} {...STORY} />
    <Still id="KfxDec09-Rules-1" component={RulesCover} {...POST} />
    {[1, 2, 3, 4, 5, 6].map((rule) => (
      <Still
        key={rule}
        id={`KfxDec09-Rules-${rule + 1}`}
        component={RulesRule}
        defaultProps={{ rule }}
        {...POST}
      />
    ))}
    <Still id="KfxDec11-Diagnostics" component={DiagnosticsPost} {...POST} />
    <Still
      id="KfxDec16-LastOrder"
      component={LastOrderPost}
      defaultProps={{ orderBy: "[datum]", pickupBy: "[datum]" }}
      {...POST}
    />
    <Still
      id="KfxDec18-HolidayHours"
      component={HolidayHoursPost}
      defaultProps={{ dec24: "[vpišite]", dec31: "[vpišite]" }}
      {...POST}
    />
    <Still id="KfxDec22-FirstRide-1" component={FirstRideCover} {...POST} />
    {[1, 2, 3, 4, 5].map((step) => (
      <Still
        key={step}
        id={`KfxDec22-FirstRide-${step + 1}`}
        component={FirstRideStep}
        defaultProps={{ step }}
        {...POST}
      />
    ))}
    <Still id="KfxDec22-FirstRide-7" component={FirstRideCta} {...POST} />
    <Still id="KfxDec24-Christmas" component={ChristmasPost} {...POST} />
    <Still id="KfxDec28-January" component={JanuaryPost} {...POST} />
  </Folder>
);
