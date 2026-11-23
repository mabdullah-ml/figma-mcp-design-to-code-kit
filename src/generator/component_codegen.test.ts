import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import type { FigmaMcpPayload } from "../schema/figma_spec";
import { runDesignToCode, validateFigmaPayload } from "./component_codegen.ts";

const samplePath = path.resolve("samples/figma_mcp_export.json");
const samplePayload = JSON.parse(fs.readFileSync(samplePath, "utf-8")) as FigmaMcpPayload;

test("valid Figma MCP payload passes validation and generates typed TSX components", () => {
  assert.deepEqual(validateFigmaPayload(samplePayload), []);
  const result = runDesignToCode(samplePayload);
  assert.ok(result.cssTokens.includes("--color-primary: #0284c7;"));
  assert.ok(result.components["MetricKpiCard.tsx"].includes("export interface MetricKpiCardProps"));
  assert.ok(
    result.components["ApprovalActionBanner.tsx"].includes(
      'aria-label="Human in the loop approval banner"'
    )
  );
});

test("accessibility and hex-color guardrails reject malformed Figma MCP specs", () => {
  const broken: FigmaMcpPayload = {
    ...samplePayload,
    tokens: { ...samplePayload.tokens, colors: { primary: "not-a-hex" } },
    components: [{ ...samplePayload.components[0], ariaLabel: "" }],
  };
  const errors = validateFigmaPayload(broken);
  assert.equal(errors.length, 2);
  assert.throws(() => runDesignToCode(broken), /validation failed/);
});
