"use client";

import { BarChartWidget } from "../base/bar-chart-widget";
import { revenueByMonth } from "@/mock-data/sales";

export function RevenueByMonthWidget() {
  return (
    <BarChartWidget
      title="Revenue by Month"
      description="Monthly revenue trend"
      data={revenueByMonth}
      xKey="month"
      yKey="revenue"
    />
  );
}
