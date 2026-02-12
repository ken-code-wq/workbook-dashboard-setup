"use client";

import { AreaChartWidget } from "../base/area-chart-widget";
import { winRateTrend } from "@/mock-data/crm";

export function WinRateWidget() {
  return (
    <AreaChartWidget
      title="Win Rate Trend"
      description="Monthly deal close rate (%)"
      data={winRateTrend}
      xKey="month"
      series={[
        { dataKey: "winRate", label: "Win Rate %", color: "hsl(142, 71%, 45%)" },
      ]}
    />
  );
}
