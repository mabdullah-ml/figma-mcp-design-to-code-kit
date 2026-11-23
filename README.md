# Figma Dev Mode + MCP Design-to-Code Kit

[![CI](https://github.com/mabdullah-ml/figma-mcp-design-to-code-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/mabdullah-ml/figma-mcp-design-to-code-kit/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Next.js 15](https://img.shields.io/badge/Next.js-15%20%7C%20TypeScript-000000?style=flat-square)](#)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38bdf8?style=flat-square)](#)

> 🌐 **[日本語ドキュメントはこちら (README.ja.md)](./README.ja.md)**

An automated **Figma Dev Mode + Model Context Protocol (MCP) design-to-code pipeline** that validates design tokens and accessibility metadata, generates strongly-typed **React / Next.js 15 + Tailwind CSS** components, and verifies every generated artifact in CI via `tsc --noEmit`, unit tests, and `next build`.

---

## Workflow

```mermaid
flowchart LR
    FIG["Figma Dev Mode<br/>MCP Server Export"] --> VAL["Schema & A11y Gate<br/>Hex Tokens · PascalCase · aria-label"]
    VAL --> GEN["TypeScript Codegen CLI<br/>tokens.css + Typed TSX"]
    GEN --> VER["Automated CI Verification<br/>tsc · Unit Tests · next build"]
    VER --> APP["Next.js 15 Production UI"]
```

## Quick Start

```bash
npm install
npm run codegen      # Generate typed TSX components + CSS tokens from samples/figma_mcp_export.json
npm run typecheck    # Strict TypeScript check
npm test             # Verify codegen & accessibility guardrails
npm run build        # Verify Next.js production build
```

## Author

**Abdullah Mamun, Ph.D.** — Senior Generative AI / LLM Engineer · Forward-Deployed AI Engineer · PMP  
[GitHub](https://github.com/mabdullah-ml) · [LinkedIn](https://www.linkedin.com/in/mamunabdullah01)
