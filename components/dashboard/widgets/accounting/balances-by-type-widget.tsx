"use client";

import { PieChartWidget } from "../base/pie-chart-widget";
import { getBalanceByAccountType } from "@/mock-data/accounting";

export function BalancesByTypeWidget() {
  const data = getBalanceByAccountType().map((d) => ({
    name: d.type,
    value: d.value,
  }));

  return (
    <PieChartWidget
      title="Balances by Type"
      description="Active account balances (abs)"
      data={data}
    />
  );
}
