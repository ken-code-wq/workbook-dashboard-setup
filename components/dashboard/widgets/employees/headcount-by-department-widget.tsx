"use client";

import { PieChartWidget } from "../base/pie-chart-widget";
import { getHeadcountByDepartment } from "@/mock-data/employees";

export function HeadcountByDepartmentWidget() {
  const data = getHeadcountByDepartment().map((d) => ({
    name: d.department,
    value: d.value,
  }));

  return (
    <PieChartWidget
      title="Headcount by Department"
      description="Team distribution"
      data={data}
    />
  );
}
