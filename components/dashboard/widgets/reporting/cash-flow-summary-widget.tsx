"use client";

import { AreaChartWidget } from "../base/area-chart-widget";
import { cashFlowMonthly } from "@/mock-data/accounting";

export function CashFlowSummaryWidget() {
  return (
    <AreaChartWidget
      title="Cash Flow Summary"
      description="12-month inflow vs outflow trend"
      data={cashFlowMonthly}
      xKey="month"
      series={[
        { dataKey: "inflow", label: "Cash In", color: "hsl(142, 71%, 45%)" },
        { dataKey: "outflow", label: "Cash Out", color: "hsl(0, 84%, 60%)" },
      ]}
    />
  );
}
