import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * Defaults are right for this site: every page except /api/inquiry is
 * prerendered, so there is nothing to cache incrementally and no tag or queue
 * backing store to configure.
 */
export default defineCloudflareConfig();
