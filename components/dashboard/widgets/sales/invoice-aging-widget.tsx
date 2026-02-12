"use client";

import { BarChartWidget } from "../base/bar-chart-widget";
import { invoiceAging } from "@/mock-data/sales";

export function InvoiceAgingWidget() {
  return (
    <BarChartWidget
      title="Invoice Aging"
      description="Outstanding receivables by period"
      data={invoiceAging}
      xKey="bucket"
      yKey="amount"
      barColor="hsl(28, 95%, 53%)"
    />
  );
}
