"use client";

import { useMemo } from "react";
import { ResponsiveFunnel } from "@nivo/funnel";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export interface PipelineStage {
  name: string;
  value: number;
  color: string;
}

export function PipelineChartWidget({
  title,
  description,
  stages,
  className,
}: {
  title: string;
  description?: string;
  stages: PipelineStage[];
  className?: string;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Map stages to nivo funnel data format
  const funnelData = useMemo(
    () =>
      stages.map((stage) => ({
        id: stage.name,
        label: stage.name,
        value: stage.value,
        color: stage.color,
      })),
    [stages]
  );

  // Overall conversion
  const overallConversion = useMemo(() => {
    if (stages.length < 2) return null;
    return Math.round((stages[stages.length - 1].value / stages[0].value) * 100);
  }, [stages]);

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
        <div className="flex-1 min-h-40">
          <ResponsiveFunnel
            data={funnelData}
            margin={{ top: 12, right: 20, bottom: 12, left: 20 }}
            direction="horizontal"
            interpolation="smooth"
            shapeBlending={0.7}
            spacing={2}
            colors={(d: { color?: string }) => d.color ?? "hsl(217, 91%, 60%)"}
            fillOpacity={1}
            // borderWidth={0}
            borderOpacity={0.3}
            enableLabel={true}
            labelColor={isDark ? "#fff" : "#fff"}
            // enableBeforeSeparators={false}
            // enableAfterSeparators={false}
            currentPartSizeExtension={20}
            motionConfig="gentle"

                        // beforeSeparatorLength={0}
                        // beforeSeparatorOffset={20}
                        enableBeforeSeparators={true}
                        enableAfterSeparators={false}
                        // afterSeparatorLength={100}
                        // afterSeparatorOffset={20}
                        // currentPartSizeExtension={10}
                        currentBorderWidth={40}
                        // motionConfig='gentle'
                        // enableLabel={true}


                        //  data={funnelData}
                        // margin={{ top: 20, right: 20, bottom: 60, left: 20 }}
                        // direction='horizontal'
                        // valueFormat={(value) =>
                        //     new Intl.NumberFormat('en-GH', {
                        //         style: 'currency',
                        //         currency: 'GHS',
                        //         notation: 'compact',
                        //         maximumFractionDigits: 1
                        //     }).format(value).replace('₵', 'S ')
                        // }
                        // colors={(datum) => datum.color}
                        borderWidth={20}
            theme={{
              text: {
                fill: isDark ? "#a1a1aa" : "#71717a",
                fontSize: 11,
              },
              tooltip: {
                container: {
                  background: isDark ? "#27272a" : "#fff",
                  color: isDark ? "#fafafa" : "#18181b",
                  fontSize: 12,
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  padding: "8px 12px",
                },
              },
            }}
          />
        </div>

        {/* Summary row */}
        <div className="pt-3 border-t flex items-center justify-between text-xs text-muted-foreground">
          <span>{stages.length} stages</span>
          {overallConversion !== null && (
            <span>
              Overall conversion:{" "}
              <span className="text-foreground font-semibold font-mono">
                {overallConversion}%
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
