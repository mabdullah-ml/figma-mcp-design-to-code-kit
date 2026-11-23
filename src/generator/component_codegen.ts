import type { FigmaComponentSpec, FigmaMcpPayload } from "../schema/figma_spec";

const HEX_COLOR_RE = /^#[0-9a-fA-F]{6}$/;
const PASCAL_CASE_RE = /^[A-Z][A-Za-z0-9]+$/;

export function validateFigmaPayload(payload: FigmaMcpPayload): string[] {
  const errors: string[] = [];

  if (!payload.fileKey?.trim()) {
    errors.push("Missing Figma fileKey.");
  }
  for (const [token, color] of Object.entries(payload.tokens?.colors ?? {})) {
    if (!HEX_COLOR_RE.test(color)) {
      errors.push(`Token color '${token}' must be a valid 6-digit hex color (got '${color}').`);
    }
  }
  if (!payload.components || payload.components.length === 0) {
    errors.push("Payload must include at least one component specification.");
  }

  for (const comp of payload.components ?? []) {
    if (!PASCAL_CASE_RE.test(comp.name)) {
      errors.push(`Component name '${comp.name}' must be PascalCase.`);
    }
    if (!comp.ariaLabel || comp.ariaLabel.trim().length < 5) {
      errors.push(
        `Component '${comp.name}' failed accessibility gate: ariaLabel >= 5 chars required.`
      );
    }
  }
  return errors;
}

export function generateCssTokens(payload: FigmaMcpPayload): string {
  const colorLines = Object.entries(payload.tokens.colors).map(
    ([name, val]) => `  --color-${name}: ${val};`
  );
  const radiusLines = Object.entries(payload.tokens.radius).map(
    ([name, val]) => `  --radius-${name}: ${val};`
  );
  return `:root {\n${[...colorLines, ...radiusLines].join("\n")}\n}\n`;
}

export function generateReactComponent(spec: FigmaComponentSpec): string {
  const propLines = spec.props.map(
    (p) => `  ${p.name}${p.required ? "" : "?"}: ${p.type};`
  );
  const variantClasses =
    spec.variant === "warning"
      ? "border-amber-500/40 bg-amber-950/30 text-amber-100"
      : spec.variant === "elevated"
        ? "border-slate-800 bg-slate-900/80 text-slate-100"
        : "border-slate-700 bg-slate-950 text-slate-200";

  const renderFields = spec.props.map(
    (p) =>
      `      <div className="text-sm"><span className="text-slate-400">${p.name}:</span> {String(props.${p.name} ?? "")}</div>`
  );

  return `// Auto-generated from Figma MCP node ${spec.figmaNodeId}
import React from "react";

export interface ${spec.name}Props {
${propLines.join("\n")}
}

export function ${spec.name}(props: ${spec.name}Props) {
  return (
    <section
      aria-label="${spec.ariaLabel}"
      data-figma-node="${spec.figmaNodeId}"
      className="rounded-xl border p-5 ${variantClasses}"
    >
      <h3 className="text-sm font-semibold tracking-tight">${spec.name}</h3>
      <div className="mt-2 space-y-1">
${renderFields.join("\n")}
      </div>
    </section>
  );
}
`;
}

export function runDesignToCode(payload: FigmaMcpPayload): {
  cssTokens: string;
  components: Record<string, string>;
} {
  const errors = validateFigmaPayload(payload);
  if (errors.length > 0) {
    throw new Error(`Figma MCP validation failed:\n- ${errors.join("\n- ")}`);
  }

  const components: Record<string, string> = {};
  for (const spec of payload.components) {
    components[`${spec.name}.tsx`] = generateReactComponent(spec);
  }
  return {
    cssTokens: generateCssTokens(payload),
    components,
  };
}
