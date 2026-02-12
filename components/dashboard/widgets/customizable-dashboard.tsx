"use client";

import { useCallback, useMemo, useState } from "react";
import { Responsive, useContainerWidth, verticalCompactor, type LayoutItem, type Layout } from "react-grid-layout";
import { Pencil, RotateCcw, Check, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WidgetWrapper } from "./widget-wrapper";
import { WidgetLibraryDrawer } from "./widget-library-modal";
import { widgetRegistry } from "./widget-registry";
import {
  useWidgetLayoutStore,
  type WidgetLayoutItem,
} from "@/store/widget-store";
import { cn } from "@/lib/utils";

// Grid config
const COLS = { lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 };
const ROW_HEIGHT = 60;
const MARGIN: [number, number] = [16, 16];

export function CustomizableDashboard() {
  const { layouts, isEditing, setLayouts, removeWidget, toggleEditing, resetToDefault } =
    useWidgetLayoutStore();

  // ── Container width measurement for responsive grid ──
  const { width, containerRef } = useContainerWidth({ initialWidth: 1280 });

  // ── Breakpoint tracking ──
  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");

  // ── Convert our store layouts → RGL format ──
  const rglLayouts = useMemo(() => {
    // Create responsive breakpoints from the single canonical layout
    const base: LayoutItem[] = layouts.map((item) => {
      const def = widgetRegistry[item.widgetId];
      return {
        i: item.i,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
        minW: item.minW,
        minH: item.minH,
        maxW: def?.maxW,
        maxH: item.maxH,
        isResizable: def?.resizable ?? true,
        resizeHandles: def?.resizable ? (["se", "sw"] as const) : ([] as const),
      };
    });

    // On small breakpoints, stack everything full-width
    const sm: LayoutItem[] = layouts.map((item, idx) => {
      const def = widgetRegistry[item.widgetId];
      return {
        i: item.i,
        x: 0,
        y: idx * item.h,
        w: 6,
        h: item.h,
        minW: 2,
        minH: item.minH,
        isResizable: def?.resizable ?? true,
      };
    });

    const xs: LayoutItem[] = layouts.map((item, idx) => {
      const def = widgetRegistry[item.widgetId];
      return {
        i: item.i,
        x: 0,
        y: idx * item.h,
        w: 4,
        h: item.h,
        minW: 2,
        minH: item.minH,
        isResizable: def?.resizable ?? true,
      };
    });

    return { lg: base, md: base, sm, xs, xxs: xs };
  }, [layouts]);

  // ── Handle layout changes from RGL ──
  const handleLayoutChange = useCallback(
    (currentLayout: Layout) => {
      if (!isEditing) return;

      // Merge the position data from RGL back into our store items
      const updated: WidgetLayoutItem[] = layouts.map((item) => {
        const moved = currentLayout.find((l: LayoutItem) => l.i === item.i);
        if (!moved) return item;
        return {
          ...item,
          x: moved.x,
          y: moved.y,
          w: moved.w,
          h: moved.h,
        };
      });

      setLayouts(updated);
    },
    [isEditing, layouts, setLayouts]
  );

  // ── Render each widget ──
  const renderedWidgets = useMemo(() => {
    return layouts.map((item) => {
      const def = widgetRegistry[item.widgetId];
      if (!def) return null;

      const Component = def.component;

      return (
        <div key={item.i} className="widget-grid-item">
          <WidgetWrapper
            widgetId={item.i}
            title={def.label}
            isEditing={isEditing}
            onRemove={removeWidget}
          >
            <Component />
          </WidgetWrapper>
        </div>
      );
    });
  }, [layouts, isEditing, removeWidget]);

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* ── Toolbar ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <WidgetLibraryDrawer />
          {isEditing && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5"
              onClick={resetToDefault}
            >
              <RotateCcw className="size-3.5" />
              <span>Reset</span>
            </Button>
          )}
        </div>

        <Button
          variant={isEditing ? "default" : "outline"}
          size="sm"
          className={cn(
            "h-8 gap-1.5 transition-colors",
            isEditing &&
              "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600"
          )}
          onClick={toggleEditing}
        >
          {isEditing ? (
            <>
              <Check className="size-3.5" />
              <span>Done</span>
            </>
          ) : (
            <>
              <Pencil className="size-3.5" />
              <span>Edit Dashboard</span>
            </>
          )}
        </Button>
      </div>

      {/* ── Grid ─────────────────────────────────────────────── */}
      {width > 0 && (
        <Responsive
          className={cn("widget-grid-layout", isEditing && "is-editing")}
          layouts={rglLayouts}
          cols={COLS}
          rowHeight={ROW_HEIGHT}
          margin={MARGIN}
          containerPadding={[0, 0]}
          width={width}
          dragConfig={{
            enabled: isEditing,
          }}
          resizeConfig={{
            enabled: isEditing,
          }}
          onLayoutChange={handleLayoutChange}
          onBreakpointChange={setCurrentBreakpoint}
          compactor={verticalCompactor}
        >
          {renderedWidgets}
        </Responsive>
      )}

      {/* ── Empty state ──────────────────────────────────────── */}
      {layouts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-muted mb-4">
            <Lock className="size-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-1">No widgets yet</h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-sm">
            Your dashboard is empty. Click &quot;Edit Dashboard&quot; and add
            widgets from the library.
          </p>
          <Button onClick={resetToDefault} variant="outline" className="gap-2">
            <RotateCcw className="size-4" />
            Restore Defaults
          </Button>
        </div>
      )}
    </div>
  );
}
