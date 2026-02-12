"use client";

import { PieChartWidget } from "../base/pie-chart-widget";
import { getPaymentsByMethod } from "@/mock-data/sales-documents";

export function PaymentsByMethodWidget() {
  const data = getPaymentsByMethod().map((d) => ({
    name: d.method,
    value: d.value,
  }));

  return (
    <PieChartWidget
      title="Payments"
      description="Payments by method"
      data={data}
    />
  );
}
