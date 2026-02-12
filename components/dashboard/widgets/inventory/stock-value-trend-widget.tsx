"use client";

import { AreaChartWidget } from "../base/area-chart-widget";
import { stockValueTrend } from "@/mock-data/inventory";

export function StockValueTrendWidget() {
  return (
    <AreaChartWidget
      title="Stock Value Trend"
      description="Retail value vs cost basis"
      data={stockValueTrend}
      xKey="month"
      series={[
        { dataKey: "value", label: "Retail Value", color: "hsl(217, 91%, 60%)" },
        { dataKey: "cost", label: "Cost Basis", color: "hsl(28, 95%, 53%)" },
      ]}
    />
  );
}
