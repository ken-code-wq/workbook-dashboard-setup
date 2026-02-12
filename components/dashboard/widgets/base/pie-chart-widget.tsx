"use client";

import { useMemo } from "react";
import { Pie, PieChart, Label } from "recharts";
import { cn } from "@/lib/utils";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

type PieDatum = {
  name: string;
  value: number;
};

const DEFAULT_COLORS = [
  "hsl(187, 85%, 53%)",
  "hsl(330, 80%, 60%)",
  "hsl(28, 95%, 53%)",
  "hsl(142, 71%, 45%)",
  "hsl(258, 90%, 66%)",
  "hsl(217, 91%, 60%)",
  "hsl(45, 93%, 47%)",
  "hsl(0, 84%, 60%)",
];

export function PieChartWidget({
  title,
  description,
  data,
  className,
}: {
  title: string;
  description?: string;
  data: PieDatum[];
  className?: string;
}) {
  const total = useMemo(
    () => data.reduce((sum, item) => sum + item.value, 0),
    [data]
  );

  // Build chart config from data dynamically
  const chartConfig = useMemo(() => {
    const config: ChartConfig = {};
    data.forEach((d, idx) => {
      const key = d.name.toLowerCase().replace(/\s+/g, "-");
      config[key] = {
        label: d.name,
        color: DEFAULT_COLORS[idx % DEFAULT_COLORS.length],
      };
    });
    return config;
  }, [data]);

  // Map data to use fill from config
  const chartData = useMemo(
    () =>
      data.map((d, idx) => ({
        name: d.name.toLowerCase().replace(/\s+/g, "-"),
        label: d.name,
        value: d.value,
        fill: DEFAULT_COLORS[idx % DEFAULT_COLORS.length],
      })),
    [data]
  );

  return (
    <div
      className={cn(
        "bg-card text-card-foreground rounded-xl border overflow-hidden h-full flex flex-col",
        className
      )}
    >
      <div className="px-4 py-3 border-b">
        <h3 className="font-medium text-base">{title}</h3>
        {description ? (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        ) : null}
      </div>

      <div className="p-4 flex-1 min-h-0 flex flex-col">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full flex-1 min-h-40 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey="name"
                  labelKey="label"
                  formatter={(value, name) => {
                    const item = chartData.find((d) => d.name === name);
                    const pct = total
                      ? Math.round(((value as number) / total) * 100)
                      : 0;
                    return (
                      <span className="flex items-center gap-2">
                        <span className="text-muted-foreground">
                          {item?.label ?? name}
                        </span>
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {(value as number).toLocaleString()} ({pct}%)
                        </span>
                      </span>
                    );
                  }}
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={2}
              strokeWidth={2}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-muted-foreground text-xs"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className="flex-wrap gap-2 text-xs"
            />
          </PieChart>
        </ChartContainer>
      </div>
    </div>
  );
}
