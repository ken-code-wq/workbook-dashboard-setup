"use client";

import { KpiCardWidget } from "../base/kpi-card-widget";
import {
  DollarSign,
  ShoppingCart,
  Users,
  FileText,
} from "lucide-react";

export function OverviewKpiWidget() {
  return (
    <KpiCardWidget
      title="Key Metrics"
      description="Business health at a glance"
      metrics={[
        {
          label: "Revenue (MTD)",
          value: "$86,000",
          change: 8.9,
          changeLabel: "vs last month",
          icon: <DollarSign className="size-4" />,
        },
        {
          label: "Open Orders",
          value: "24",
          change: 12,
          changeLabel: "vs last month",
          icon: <ShoppingCart className="size-4" />,
        },
        {
          label: "Active Customers",
          value: "148",
          change: 5.2,
          changeLabel: "vs last month",
          icon: <Users className="size-4" />,
        },
        {
          label: "Outstanding",
          value: "$29,800",
          change: -3.4,
          changeLabel: "vs last month",
          icon: <FileText className="size-4" />,
        },
      ]}
    />
  );
}
