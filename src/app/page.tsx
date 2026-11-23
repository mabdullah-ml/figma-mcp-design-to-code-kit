import fs from "node:fs";
import path from "node:path";
import type { FigmaMcpPayload } from "@/schema/figma_spec";
import { runDesignToCode } from "@/generator/component_codegen";

export default function ShowcasePage() {
  const samplePath = path.join(process.cwd(), "samples", "figma_mcp_export.json");
  const payload = JSON.parse(fs.readFileSync(samplePath, "utf-8")) as FigmaMcpPayload;
  const generated = runDesignToCode(payload);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <span className="rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-300">
        Figma Dev Mode + MCP → Typed Next.js 15 / Tailwind Pipeline
      </span>
      <h1 className="mt-3 text-3xl font-bold text-white">{payload.designSystem}</h1>
      <p className="mt-1 text-sm text-slate-400">
        Design tokens and React/TypeScript components deterministically generated &amp; verified
        from Figma MCP specification <code>{payload.fileKey}</code>.
      </p>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        {Object.entries(generated.components).map(([filename, code]) => (
          <div
            key={filename}
            className="rounded-xl border border-slate-800 bg-slate-900/80 p-5"
          >
            <div className="font-mono text-xs text-sky-400">generated/{filename}</div>
            <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 p-3 text-xs text-slate-200">
              {code}
            </pre>
          </div>
        ))}
      </section>
    </main>
  );
}
