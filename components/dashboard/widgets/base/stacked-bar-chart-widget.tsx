"use client";

import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

export interface BarSeries {
  dataKey: string;
  label: string;
  color: string;
  stackId?: string;
}

export function StackedBarChartWidget<Row extends object>({
  title,
  description,
  data,
  xKey,
  series,
  className,
  stacked = true,
}: {
  title: string;
  description?: string;
  data: Row[];
  xKey: keyof Row & string;
  series: BarSeries[];
  className?: string;
  stacked?: boolean;
}) {
  const chartConfig = useMemo<ChartConfig>(() => {
    const config: ChartConfig = {};
    for (const s of series) {
      config[s.dataKey] = {
        label: s.label,
        color: s.color,
      };
    }
    return config;
  }, [series]);

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

      <div className="p-4 flex-1 min-h-0">
        <ChartContainer config={chartConfig} className="h-full w-full min-h-40">
          <BarChart
            data={data}
            margin={{ top: 8, right: 12, left: -18, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xKey}
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              tick={{ fontSize: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            {series.map((s, idx) => (
              <Bar
                key={s.dataKey}
                dataKey={s.dataKey}
                fill={`var(--color-${s.dataKey})`}
                radius={
                  stacked
                    ? idx === series.length - 1
                      ? [4, 4, 0, 0]
                      : [0, 0, 0, 0]
                    : [4, 4, 0, 0]
                }
                stackId={stacked ? (s.stackId ?? "stack") : undefined}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
