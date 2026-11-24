// Entry for make.fun bounty post-x-promote-make-your-own-bounty-01
// (Node 22, standard library only, deterministic).
//
// The entry is the X post itself: one public post by @Udachii quoting
// make.fun's make-your-own-bounty post
// (https://x.com/makefunai/status/2124915864336236646), with a photo of
// its own attached, @makefunai and the play code in its text.
// POST.json at this repository's root names that post's address.
//
// This program reads POST.json from the repository directory and writes
// a deterministic report about the promotion post to the output
// directory. It uses no network, no wall clock, no randomness, and
// reads nothing outside the repository.
//
// Local run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR: string = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const POST_URL: string = "https://x.com/Udachii/status/2125166652966973581";
const POST_HANDLE: string = "Udachii";
const POST_STATUS_ID: string = "2125166652966973581";
const QUOTED_POST_ID: string = "2124915864336236646";
const QUOTED_POST_URL: string =
  "https://x.com/makefunai/status/2124915864336236646";
const PLAY_CODE: string = "makefun-mill-parcel-mango";

function main(): void {
  const postPath: string = join(BOT_DIR, "POST.json");
  let post: unknown;
  try {
    post = JSON.parse(readFileSync(postPath, "utf8"));
  } catch (err) {
    console.error(`POST.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
    process.exit(1);
  }

  if (
    typeof post !== "object" ||
    post === null ||
    (post as { url?: unknown }).url !== POST_URL
  ) {
    console.error(`POST.json does not name the expected post: ${POST_URL}`);
    process.exit(1);
  }

  const report = {
    bounty: "post-x-promote-make-your-own-bounty-01",
    entry: {
      account: "@Udachii",
      handle: POST_HANDLE,
      has_photo: true,
      play_code: PLAY_CODE,
      platform: "x",
      quoted_post_id: QUOTED_POST_ID,
      quoted_post_url: QUOTED_POST_URL,
      status_id: POST_STATUS_ID,
      url: POST_URL,
    },
  };

  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(
    join(OUTPUT_DIR, "report.json"),
    JSON.stringify(report, null, 2) + "\n",
    "utf8",
  );
}

main();
