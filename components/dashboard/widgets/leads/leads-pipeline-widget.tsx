"use client";

import { PipelineChartWidget } from "../base/pipeline-chart-widget";

const pipelineStages = [
  { name: "Prospects", value: 3867, color: "hsl(217, 91%, 60%)" },
  { name: "Qualified", value: 2340, color: "hsl(187, 85%, 53%)" },
  { name: "Proposal", value: 1420, color: "hsl(45, 93%, 47%)" },
  { name: "Negotiation", value: 680, color: "hsl(28, 95%, 53%)" },
  { name: "Closed Won", value: 227, color: "hsl(142, 71%, 45%)" },
];

export function LeadsPipelineWidget() {
  return (
    <PipelineChartWidget
      title="Sales Pipeline"
      description="Lead conversion funnel"
      stages={pipelineStages}
    />
  );
}
