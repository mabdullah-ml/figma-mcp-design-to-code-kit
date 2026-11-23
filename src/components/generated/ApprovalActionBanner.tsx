// Auto-generated from Figma MCP node 12:518
import React from "react";

export interface ApprovalActionBannerProps {
  title: string;
  description: string;
  ctaLabel: string;
}

export function ApprovalActionBanner(props: ApprovalActionBannerProps) {
  return (
    <section
      aria-label="Human in the loop approval banner"
      data-figma-node="12:518"
      className="rounded-xl border p-5 border-amber-500/40 bg-amber-950/30 text-amber-100"
    >
      <h3 className="text-sm font-semibold tracking-tight">ApprovalActionBanner</h3>
      <div className="mt-2 space-y-1">
      <div className="text-sm"><span className="text-slate-400">title:</span> {String(props.title ?? "")}</div>
      <div className="text-sm"><span className="text-slate-400">description:</span> {String(props.description ?? "")}</div>
      <div className="text-sm"><span className="text-slate-400">ctaLabel:</span> {String(props.ctaLabel ?? "")}</div>
      </div>
    </section>
  );
}
