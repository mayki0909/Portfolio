import { Composition, Folder, Still } from "remotion";
import { DoliumIntro } from "./dolium/DoliumIntro";
import { DOLIUM_OUTRO_DURATION, DoliumOutro } from "./dolium/DoliumOutro";
import { RITUAL_DURATION, RitualReel } from "./dolium/ritual/RitualReel";
import {
  COVER,
  FacebookCover,
  FacebookProfile,
  PROFILE,
} from "./facebook/FacebookImages";
import { LogoIntro } from "./intro/LogoIntro";
import { KfxIntro } from "./kfx/KfxIntro";
import { KfxOutro } from "./kfx/KfxOutro";
import { KfxOutroCharge } from "./kfx/KfxOutroCharge";
import { KfxDecemberPosts } from "./kfx/posts/december";
import { KfxNovemberPosts } from "./kfx/posts/november";
import { KFX_WINTER_DURATION, KfxWinterReel } from "./kfx/winter/KfxWinterReel";
import { KFX_RENAME_DURATION, KfxRenameReel } from "./kfx/rename/KfxRenameReel";
import {
  KFX_SERVICE_DURATION,
  KfxServiceReel,
} from "./kfx/service/KfxServiceReel";
import { LaunchReel } from "./LaunchReel";
import { LocationReel } from "./location/LocationReel";
import { LogoOutro } from "./outro/LogoOutro";
import { DecemberPosts } from "./posts/december";
import { NovemberPosts } from "./posts/november";
import {
  REFURBISHED_DURATION,
  RefurbishedReel,
} from "./refurbished/RefurbishedReel";
import { BUYBACK_DURATION, BuybackReel } from "./buyback/BuybackReel";
import { REPAIR_DURATION, RepairReel } from "./repair/RepairReel";

export const RemotionRoot = () => (
  <>
    <Folder name="Instagram">
      <Composition
        id="LaunchReel"
        component={LaunchReel}
        durationInFrames={405}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="LocationReel"
        component={LocationReel}
        durationInFrames={480}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="RefurbishedReel"
        component={RefurbishedReel}
        durationInFrames={REFURBISHED_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BuybackReel"
        component={BuybackReel}
        defaultProps={{ estimate: "280 €" }}
        durationInFrames={BUYBACK_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="RepairReel"
        component={RepairReel}
        durationInFrames={REPAIR_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="LogoIntro"
        component={LogoIntro}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="LogoOutro"
        component={LogoOutro}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <NovemberPosts />
      <DecemberPosts />
    </Folder>
    <Folder name="Facebook">
      <Still id="FacebookProfile" component={FacebookProfile} {...PROFILE} />
      <Still id="FacebookCover" component={FacebookCover} {...COVER} />
    </Folder>
    {/* KFX (formerly Krgofix, the krgofix project), kept separate from the Kranfix videos. */}
    <Folder name="KFX">
      <Composition
        id="KfxIntro"
        component={KfxIntro}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="KfxOutro"
        component={KfxOutro}
        // Inline so Remotion Studio can edit and save it; same as KFX_OUTRO_DEFAULTS, which KfxServiceReel uses.
        defaultProps={{ domain: "kfxservis.si" }}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="KfxOutroCharge"
        component={KfxOutroCharge}
        defaultProps={{ domain: "kfxservis.si" }}
        durationInFrames={105}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="KfxServiceReel"
        component={KfxServiceReel}
        durationInFrames={KFX_SERVICE_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="KfxRenameReel"
        component={KfxRenameReel}
        durationInFrames={KFX_RENAME_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="KfxWinterReel"
        component={KfxWinterReel}
        durationInFrames={KFX_WINTER_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <KfxNovemberPosts />
      <KfxDecemberPosts />
    </Folder>
    {/* Savne Dolium (saunas-shop), kept separate from the Kranfix videos. */}
    <Folder name="Dolium">
      <Composition
        id="DoliumIntro"
        component={DoliumIntro}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="DoliumOutro"
        component={DoliumOutro}
        durationInFrames={DOLIUM_OUTRO_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="RitualReel"
        component={RitualReel}
        durationInFrames={RITUAL_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
    </Folder>
  </>
);
