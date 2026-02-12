"use client";

import { RadialChartWidget } from "../base/radial-chart-widget";

export function TargetsWidget() {
  return (
    <RadialChartWidget
      title="Monthly Targets"
      description="Progress towards goals"
      metrics={[
        { name: "Revenue", value: 86000, max: 100000, color: "hsl(142, 71%, 45%)" },
        { name: "New Customers", value: 18, max: 25, color: "hsl(217, 91%, 60%)" },
        { name: "Orders", value: 42, max: 50, color: "hsl(258, 90%, 66%)" },
        { name: "Retention", value: 94, max: 100, color: "hsl(45, 93%, 47%)" },
      ]}
    />
  );
}
