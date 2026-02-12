"use client";

import { AreaChartWidget } from "../base/area-chart-widget";
import { cashFlowMonthly } from "@/mock-data/accounting";

export function CashFlowWidget() {
  return (
    <AreaChartWidget
      title="Cash Flow"
      description="Monthly inflow vs outflow"
      data={cashFlowMonthly}
      xKey="month"
      series={[
        { dataKey: "inflow", label: "Inflow", color: "hsl(142, 71%, 45%)" },
        { dataKey: "outflow", label: "Outflow", color: "hsl(0, 84%, 60%)" },
      ]}
    />
  );
}
