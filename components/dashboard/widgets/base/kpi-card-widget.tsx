"use client";

import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export interface KpiMetric {
  label: string;
  value: string;
  change?: number; // percent change, positive = good
  changeLabel?: string;
  icon?: React.ReactNode;
}

export function KpiCardWidget({
  title,
  description,
  metrics,
  className,
}: {
  title: string;
  description?: string;
  metrics: KpiMetric[];
  className?: string;
}) {
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

      <div className="p-4 flex-1 min-h-0 grid gap-4" style={{ gridTemplateColumns: `repeat(${Math.min(metrics.length, 4)}, minmax(0, 1fr))` }}>
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="flex flex-col gap-1.5 rounded-lg border bg-muted/30 p-3"
          >
            <div className="flex items-center gap-2">
              {metric.icon && (
                <span className="text-muted-foreground">{metric.icon}</span>
              )}
              <span className="text-xs text-muted-foreground font-medium truncate">
                {metric.label}
              </span>
            </div>

            <span className="text-2xl font-bold tabular-nums tracking-tight">
              {metric.value}
            </span>

            {metric.change !== undefined && (
              <div className="flex items-center gap-1">
                {metric.change > 0 ? (
                  <TrendingUp className="size-3 text-emerald-500" />
                ) : metric.change < 0 ? (
                  <TrendingDown className="size-3 text-pink-500" />
                ) : (
                  <Minus className="size-3 text-muted-foreground" />
                )}
                <span
                  className={cn(
                    "text-[11px] font-medium tabular-nums",
                    metric.change > 0
                      ? "text-emerald-500"
                      : metric.change < 0
                      ? "text-pink-500"
                      : "text-muted-foreground"
                  )}
                >
                  {metric.change > 0 ? "+" : ""}
                  {metric.change}%
                </span>
                {metric.changeLabel && (
                  <span className="text-[11px] text-muted-foreground">
                    {metric.changeLabel}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
