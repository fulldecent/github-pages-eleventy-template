import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";

const indexPath = new URL("../build/index.html", import.meta.url);
if (!existsSync(indexPath)) {
  console.error("build/index.html is missing. Run yarn build first.");
  process.exit(1);
}

const home = await readFile(indexPath, "utf8");
const creek = await readFile(new URL("../build/notes/creek/index.html", import.meta.url), "utf8");
const ridge = await readFile(new URL("../build/notes/ridge/index.html", import.meta.url), "utf8");
const css = await readFile(new URL("../build/css/site.css", import.meta.url), "utf8");

assert.match(home, /<title>Trail notes<\/title>/);
assert.match(home, /<h1>Trail notes<\/h1>/);
assert.match(home, /href="(\/[^/]+)?\/notes\/creek\/"/);
assert.match(home, /href="(\/[^/]+)?\/notes\/ridge\/"/);
assert.match(home, /east bank/);
assert.match(home, /when the wind picks up/);

assert.match(creek, /<title>Creek<\/title>/);
assert.match(creek, /Stay on the east bank/);
assert.match(ridge, /<title>Ridge<\/title>/);
assert.match(ridge, /Turn around at the bench/);

for (const html of [home, creek, ridge]) {
  const href = html.match(/href="([^"]*\/css\/site\.css)"/);
  assert.ok(href, "stylesheet link");
  assert.match(href[1], /^(\/[^/]+)?\/css\/site\.css$/);
}

assert.match(css, /max-width:\s*40rem/);
