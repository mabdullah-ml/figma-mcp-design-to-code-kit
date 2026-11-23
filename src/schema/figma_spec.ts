export interface FigmaPropSpec {
  name: string;
  type: "string" | "number" | "boolean";
  required: boolean;
}

export interface FigmaComponentSpec {
  name: string;
  figmaNodeId: string;
  ariaLabel: string;
  variant: "elevated" | "warning" | "neutral";
  props: FigmaPropSpec[];
}

export interface FigmaMcpPayload {
  fileKey: string;
  designSystem: string;
  tokens: {
    colors: Record<string, string>;
    radius: Record<string, string>;
  };
  components: FigmaComponentSpec[];
}

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
      errors.push(`Component '${comp.name}' failed accessibility gate: ariaLabel >= 5 chars required.`);
    }
  }
  return errors;
}
