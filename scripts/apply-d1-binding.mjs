// The vinext build always writes the D1 binding into
// `dist/server/wrangler.json` using a placeholder database id (see
// `vite.config.ts` — it's designed for a control-plane that injects the
// real id at deploy time, which we don't have in this manual-Wrangler
// setup). This script patches that generated file with the real,
// already-provisioned Cloudflare D1 database right before `wrangler
// deploy` runs. Safe to run multiple times.
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const WRANGLER_CONFIG_PATH = fileURLToPath(
  new URL("../dist/server/wrangler.json", import.meta.url)
);

const REAL_D1_DATABASE = {
  binding: "DB",
  database_name: "bebrand-dev-leads",
  database_id: "e7a75a0a-bbf9-4224-83a5-ae654ff1c68f",
};

const raw = await readFile(WRANGLER_CONFIG_PATH, "utf8");
const config = JSON.parse(raw);

config.d1_databases = [REAL_D1_DATABASE];

await writeFile(WRANGLER_CONFIG_PATH, JSON.stringify(config), "utf8");

console.log(
  `[apply-d1-binding] Wired D1 binding "${REAL_D1_DATABASE.binding}" -> ${REAL_D1_DATABASE.database_name} (${REAL_D1_DATABASE.database_id}) into dist/server/wrangler.json`
);
