/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);

// Serve the Kranfix webshop's public folder so the Kranfix posts and reels use the live site's
// logos and photos. It lives in the kranfix repo, a sibling of this one; set REEL_PUBLIC_DIR if
// that repo is somewhere else. Other clients import their assets from src/<client>/assets.
Config.setPublicDir(
  process.env.REEL_PUBLIC_DIR ?? "../../../kranfix/apps/webshop/public",
);
