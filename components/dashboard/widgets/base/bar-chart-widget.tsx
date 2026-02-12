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

export function BarChartWidget<Row extends object>({
  title,
  description,
  data,
  xKey,
  yKey,
  barColor = "hsl(187, 85%, 53%)",
  className,
}: {
  title: string;
  description?: string;
  data: Row[];
  xKey: keyof Row & string;
  yKey: keyof Row & string;
  barColor?: string;
  className?: string;
}) {
  const chartConfig = useMemo<ChartConfig>(
    () => ({
      [yKey]: {
        label: yKey.charAt(0).toUpperCase() + yKey.slice(1),
        color: barColor,
      },
    }),
    [yKey, barColor]
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
              content={<ChartTooltipContent />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey={yKey}
              fill={`var(--color-${yKey})`}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
