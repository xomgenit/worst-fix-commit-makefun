// SPDX-License-Identifier: MIT
// Worst Fix Ever — a commit message for the fix that made everything worse.
// The joke lands in three beats: the confident deletion, the discovery that
// the bug was structural, and the database quietly grieving for it.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";

const subject = "fix: deleted the bug.";
const twist = "the bug was load-bearing.";
const aftermath = "the database misses it already.";

const line = [subject, twist, aftermath].join(" ");

if (line.length < 1 || line.length > 100) {
  throw new Error(`entry must be 1-100 chars, got ${line.length}`);
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, line, "utf8");

// Read it back and confirm the file holds exactly what we meant to say:
// one line, no trailing newline, byte-identical to the composed message.
const back = readFileSync(target, "utf8");
if (back !== line || back.includes("\n")) {
  throw new Error("entry.txt does not match the composed line");
}
console.log(`wrote ${line.length} chars to entry.txt (verified byte-identical)`);
