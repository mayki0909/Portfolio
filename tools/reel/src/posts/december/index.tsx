import { Folder, Still } from "remotion";
import { POST } from "../shared";
import { Christmas, NewYear } from "./Holidays";
import {
  BatteryAfter,
  BatteryBefore,
  Buyback,
  CameraAfter,
  CameraBefore,
  GiftsCover,
  GiftSlide,
  HOLIDAY_HOURS_DEFAULTS,
  HolidayHelp,
  HolidayHours,
} from "./Posts";

/**
 * December feed posts (4:5), named by posting date (zero-padded so they sort).
 * The holiday hours are props: render with --props once they are known.
 */
export const DecemberPosts = () => (
  <Folder name="December">
    <Still id="Dec18-Gifts-1" component={GiftsCover} {...POST} />
    <Still
      id="Dec18-Gifts-2"
      component={GiftSlide}
      defaultProps={{ gift: 1 }}
      {...POST}
    />
    <Still
      id="Dec18-Gifts-3"
      component={GiftSlide}
      defaultProps={{ gift: 2 }}
      {...POST}
    />
    <Still
      id="Dec18-Gifts-4"
      component={GiftSlide}
      defaultProps={{ gift: 3 }}
      {...POST}
    />
    <Still id="Dec22-Battery-1" component={BatteryBefore} {...POST} />
    <Still id="Dec22-Battery-2" component={BatteryAfter} {...POST} />
    <Still
      id="Dec21-HolidayHours"
      component={HolidayHours}
      defaultProps={HOLIDAY_HOURS_DEFAULTS}
      {...POST}
    />
    <Still id="Dec23-Holidays" component={HolidayHelp} {...POST} />
    <Still id="Dec24-Christmas" component={Christmas} {...POST} />
    <Still id="Dec27-Buyback" component={Buyback} {...POST} />
    <Still id="Dec28-Camera-1" component={CameraBefore} {...POST} />
    <Still id="Dec28-Camera-2" component={CameraAfter} {...POST} />
    <Still id="Dec30-NewYear" component={NewYear} {...POST} />
  </Folder>
);
