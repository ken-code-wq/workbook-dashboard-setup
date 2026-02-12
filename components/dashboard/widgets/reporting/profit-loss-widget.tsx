"use client";

import { StackedBarChartWidget } from "../base/stacked-bar-chart-widget";
import { revenueVsExpenses } from "@/mock-data/accounting";

export function ProfitLossWidget() {
  return (
    <StackedBarChartWidget
      title="Profit & Loss"
      description="Revenue, COGS and operating expenses"
      data={revenueVsExpenses}
      xKey="month"
      series={[
        { dataKey: "opex", label: "Operating Expenses", color: "hsl(330, 80%, 60%)", stackId: "expenses" },
        { dataKey: "cogs", label: "Cost of Goods Sold", color: "hsl(28, 95%, 53%)", stackId: "expenses" },
        { dataKey: "revenue", label: "Revenue", color: "hsl(142, 71%, 45%)" },
      ]}
      stacked={false}
    />
  );
}
