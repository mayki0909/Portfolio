import { Folder, Still } from "remotion";
import { POST, STORY } from "../shared";
import { CareCover, CareCta, CareRule } from "./Care";
import { ElectricCover, ElectricCta, ElectricTip } from "./Electric";
import {
  GiftsCover,
  GiftsCta,
  GiftsRest,
  GiftsRitual,
  GiftsWater,
} from "./Gifts";
import { HeatingCover, HeatingCta, HeatingTip } from "./Heating";
import { ChristmasPost, NewYearPost } from "./Holidays";
import {
  RentCover,
  RentIncluded,
  RentPrices,
  RentRefund,
  RentSteps,
} from "./Rent";
import { PollStory, UnescoStory } from "./Singles";
import { SizesCover, SizesCta, SizesModel } from "./Sizes";
import { WoodCover, WoodCta, WoodTip } from "./Wood";

/**
 * Savne Dolium December 2026 feed posts (4:5) and Stories (9:16), named by posting date. The 1 Dec reel is
 * `RitualReel`; the 21 Dec reel is `DoliumDec21-RoundReel`. Prices and rental terms come from `../shared`.
 */
export const DoliumDecemberPosts = () => (
  <Folder name="Dolium-December">
    <Still id="DoliumDec03-Rent-1" component={RentCover} {...POST} />
    <Still id="DoliumDec03-Rent-2" component={RentSteps} {...POST} />
    <Still id="DoliumDec03-Rent-3" component={RentIncluded} {...POST} />
    <Still id="DoliumDec03-Rent-4" component={RentPrices} {...POST} />
    <Still id="DoliumDec03-Rent-5" component={RentRefund} {...POST} />
    <Still id="DoliumDec02-Electric-1" component={ElectricCover} {...POST} />
    {[1, 2, 3].map((tip) => (
      <Still
        key={`electric-${tip}`}
        id={`DoliumDec02-Electric-${tip + 1}`}
        component={ElectricTip}
        defaultProps={{ tip }}
        {...POST}
      />
    ))}
    <Still id="DoliumDec02-Electric-5" component={ElectricCta} {...POST} />
    <Still id="DoliumDec04-Wood-1" component={WoodCover} {...POST} />
    {[1, 2, 3].map((tip) => (
      <Still
        key={`wood-${tip}`}
        id={`DoliumDec04-Wood-${tip + 1}`}
        component={WoodTip}
        defaultProps={{ tip }}
        {...POST}
      />
    ))}
    <Still id="DoliumDec04-Wood-5" component={WoodCta} {...POST} />
    <Still id="DoliumDec05-PollStory" component={PollStory} {...STORY} />
    <Still id="DoliumDec07-Heating-1" component={HeatingCover} {...POST} />
    {[1, 2, 3, 4, 5].map((tip) => (
      <Still
        key={tip}
        id={`DoliumDec07-Heating-${tip + 1}`}
        component={HeatingTip}
        defaultProps={{ tip }}
        {...POST}
      />
    ))}
    <Still id="DoliumDec07-Heating-7" component={HeatingCta} {...POST} />
    <Still id="DoliumDec09-Gifts-1" component={GiftsCover} {...POST} />
    <Still id="DoliumDec09-Gifts-2" component={GiftsWater} {...POST} />
    <Still id="DoliumDec09-Gifts-3" component={GiftsRitual} {...POST} />
    <Still id="DoliumDec09-Gifts-4" component={GiftsRest} {...POST} />
    <Still id="DoliumDec09-Gifts-5" component={GiftsCta} {...POST} />
    <Still id="DoliumDec16-Care-1" component={CareCover} {...POST} />
    {[1, 2, 3, 4].map((rule) => (
      <Still
        key={rule}
        id={`DoliumDec16-Care-${rule + 1}`}
        component={CareRule}
        defaultProps={{ rule }}
        {...POST}
      />
    ))}
    <Still id="DoliumDec16-Care-6" component={CareCta} {...POST} />
    <Still id="DoliumDec17-UnescoStory" component={UnescoStory} {...STORY} />
    <Still id="DoliumDec18-Sizes-1" component={SizesCover} {...POST} />
    {[1, 2, 3, 4, 5].map((index) => (
      <Still
        key={index}
        id={`DoliumDec18-Sizes-${index + 1}`}
        component={SizesModel}
        defaultProps={{ index }}
        {...POST}
      />
    ))}
    <Still id="DoliumDec18-Sizes-7" component={SizesCta} {...POST} />
    <Still id="DoliumDec24-Christmas" component={ChristmasPost} {...POST} />
    <Still id="DoliumDec30-NewYear" component={NewYearPost} {...POST} />
  </Folder>
);
