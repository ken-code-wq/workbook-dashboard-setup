"use client";

import { useMemo } from "react";
import { RadialBar, RadialBarChart, PolarAngleAxis } from "recharts";
import { cn } from "@/lib/utils";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export interface RadialMetric {
  name: string;
  value: number;
  max: number;
  color: string;
}

export function RadialChartWidget({
  title,
  description,
  metrics,
  className,
}: {
  title: string;
  description?: string;
  metrics: RadialMetric[];
  className?: string;
}) {
  const chartConfig = useMemo<ChartConfig>(() => {
    const config: ChartConfig = {};
    metrics.forEach((m) => {
      const key = m.name.toLowerCase().replace(/\s+/g, "-");
      config[key] = {
        label: m.name,
        color: m.color,
      };
    });
    return config;
  }, [metrics]);

  const chartData = useMemo(
    () =>
      metrics.map((m) => ({
        name: m.name.toLowerCase().replace(/\s+/g, "-"),
        label: m.name,
        value: m.value,
        max: m.max,
        pct: Math.round((m.value / m.max) * 100),
        fill: m.color,
      })),
    [metrics]
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
        <ChartContainer config={chartConfig} className="mx-auto w-full flex-1 min-h-40">
          <RadialBarChart
            innerRadius="30%"
            outerRadius="90%"
            data={chartData}
            startAngle={180}
            endAngle={0}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey="name"
                  labelKey="label"
                  formatter={(value, name) => {
                    const item = chartData.find((d) => d.name === name);
                    return (
                      <span className="flex items-center gap-2">
                        <span className="text-muted-foreground">
                          {item?.label ?? name}
                        </span>
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item?.value.toLocaleString()} / {item?.max.toLocaleString()} ({item?.pct}%)
                        </span>
                      </span>
                    );
                  }}
                />
              }
            />
            <RadialBar
              dataKey="pct"
              background
              cornerRadius={6}
            />
          </RadialBarChart>
        </ChartContainer>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-3 pt-1 text-xs">
          {chartData.map((d) => (
            <div key={d.name} className="flex items-center gap-1.5">
              <span
                className="size-2 rounded-full"
                style={{ background: d.fill }}
              />
              <span className="text-muted-foreground">{d.label}</span>
              <span className="font-medium tabular-nums">{d.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
