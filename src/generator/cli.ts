import fs from "node:fs";
import path from "node:path";
import type { FigmaMcpPayload } from "../schema/figma_spec";
import { runDesignToCode } from "./component_codegen.ts";

const inputPath = process.argv[2] ?? "samples/figma_mcp_export.json";
const raw = fs.readFileSync(path.resolve(inputPath), "utf-8");
const payload = JSON.parse(raw) as FigmaMcpPayload;
const output = runDesignToCode(payload);

const outDir = path.resolve("src/components/generated");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "tokens.css"), output.cssTokens, "utf-8");

for (const [filename, code] of Object.entries(output.components)) {
  fs.writeFileSync(path.join(outDir, filename), code, "utf-8");
}

console.log(
  `Generated ${Object.keys(output.components).length} typed React components + tokens.css from ${payload.fileKey}.`
);
