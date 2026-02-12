"use client";

import { PipelineChartWidget } from "../base/pipeline-chart-widget";
import { getOpportunityPipeline } from "@/mock-data/crm";

const pipeline = getOpportunityPipeline();

const stageColors = [
  "hsl(217, 91%, 60%)",
  "hsl(187, 85%, 53%)",
  "hsl(258, 90%, 66%)",
  "hsl(45, 93%, 47%)",
  "hsl(142, 71%, 45%)",
];

const stages = pipeline.map((stage, idx) => ({
  name: stage.name,
  value: stage.value,
  color: stageColors[idx % stageColors.length],
}));

export function OpportunitiesPipelineWidget() {
  return (
    <PipelineChartWidget
      title="Opportunity Pipeline"
      description="Deal values by stage"
      stages={stages}
    />
  );
}
