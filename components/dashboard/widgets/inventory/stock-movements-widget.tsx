"use client";

import { BarChartWidget } from "../base/bar-chart-widget";
import { getMovementsByType } from "@/mock-data/inventory";

export function StockMovementsWidget() {
  const data = getMovementsByType().map((d) => ({
    type: d.type,
    value: d.value,
  }));

  return (
    <BarChartWidget
      title="Stock Movements"
      description="Total movement volume by type"
      data={data}
      xKey="type"
      yKey="value"
    />
  );
}
