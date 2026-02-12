"use client";

import { AreaChartWidget } from "../base/area-chart-widget";
import { revenueTrend } from "@/mock-data/sales";

export function SalesTrendWidget() {
  return (
    <AreaChartWidget
      title="Sales Trend"
      description="Revenue vs cost over time"
      data={revenueTrend}
      xKey="month"
      series={[
        { dataKey: "revenue", label: "Revenue", color: "hsl(142, 71%, 45%)" },
        { dataKey: "cost", label: "Cost", color: "hsl(330, 80%, 60%)" },
      ]}
    />
  );
}
