"use client";

import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

export interface AreaSeries {
  dataKey: string;
  label: string;
  color: string;
  /** Stacked or independent (default: true for multi-series) */
  stackId?: string;
}

export function AreaChartWidget<Row extends object>({
  title,
  description,
  data,
  xKey,
  series,
  className,
  stacked = false,
}: {
  title: string;
  description?: string;
  data: Row[];
  xKey: keyof Row & string;
  series: AreaSeries[];
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
          <AreaChart
            data={data}
            margin={{ top: 8, right: 12, left: -18, bottom: 0 }}
          >
            <defs>
              {series.map((s) => (
                <linearGradient
                  key={s.dataKey}
                  id={`fill-${s.dataKey}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={`var(--color-${s.dataKey})`}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={`var(--color-${s.dataKey})`}
                    stopOpacity={0.05}
                  />
                </linearGradient>
              ))}
            </defs>
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
            {series.length > 1 && (
              <ChartLegend content={<ChartLegendContent />} />
            )}
            {series.map((s) => (
              <Area
                key={s.dataKey}
                type="monotone"
                dataKey={s.dataKey}
                stroke={`var(--color-${s.dataKey})`}
                fill={`url(#fill-${s.dataKey})`}
                strokeWidth={2}
                dot={false}
                stackId={stacked ? (s.stackId ?? "stack") : undefined}
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}
