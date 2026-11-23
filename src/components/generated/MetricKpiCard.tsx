// Auto-generated from Figma MCP node 12:401
import React from "react";

export interface MetricKpiCardProps {
  label: string;
  value: string;
  trend?: string;
}

export function MetricKpiCard(props: MetricKpiCardProps) {
  return (
    <section
      aria-label="Key performance metric summary card"
      data-figma-node="12:401"
      className="rounded-xl border p-5 border-slate-800 bg-slate-900/80 text-slate-100"
    >
      <h3 className="text-sm font-semibold tracking-tight">MetricKpiCard</h3>
      <div className="mt-2 space-y-1">
      <div className="text-sm"><span className="text-slate-400">label:</span> {String(props.label ?? "")}</div>
      <div className="text-sm"><span className="text-slate-400">value:</span> {String(props.value ?? "")}</div>
      <div className="text-sm"><span className="text-slate-400">trend:</span> {String(props.trend ?? "")}</div>
      </div>
    </section>
  );
}
