"use client";

import { StackedBarChartWidget } from "../base/stacked-bar-chart-widget";
import { revenueVsExpenses } from "@/mock-data/accounting";

export function RevenueVsExpensesWidget() {
  return (
    <StackedBarChartWidget
      title="Revenue vs Expenses"
      description="Revenue compared to COGS and operating expenses"
      data={revenueVsExpenses}
      xKey="month"
      series={[
        { dataKey: "revenue", label: "Revenue", color: "hsl(142, 71%, 45%)" },
        { dataKey: "cogs", label: "COGS", color: "hsl(28, 95%, 53%)" },
        { dataKey: "opex", label: "OPEX", color: "hsl(330, 80%, 60%)" },
      ]}
      stacked={false}
    />
  );
}
