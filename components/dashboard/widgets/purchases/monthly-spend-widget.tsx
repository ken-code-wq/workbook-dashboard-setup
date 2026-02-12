"use client";

import { AreaChartWidget } from "../base/area-chart-widget";
import { monthlySpend } from "@/mock-data/purchases";

export function MonthlySpendWidget() {
  return (
    <AreaChartWidget
      title="Monthly Spend"
      description="Bills and expenses over time"
      data={monthlySpend}
      xKey="month"
      series={[
        { dataKey: "bills", label: "Bills", color: "hsl(330, 80%, 60%)" },
        { dataKey: "expenses", label: "Expenses", color: "hsl(28, 95%, 53%)" },
      ]}
      stacked
    />
  );
}
