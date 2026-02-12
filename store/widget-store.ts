import { create } from "zustand";
import { persist } from "zustand/middleware";
import { widgetRegistry } from "@/components/dashboard/widgets/widget-registry";

// ---------------------------------------------------------------------------
// Schema version – bump when the persisted shape changes
// ---------------------------------------------------------------------------

const STORE_VERSION = 2;
const STORAGE_KEY = "dashboard-widgets";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Serialisable widget position, decoupled from RGL internal types. */
export interface WidgetLayoutItem {
  /** Unique instance id – e.g. "leads-chart-0" */
  i: string;
  /** Registry key – e.g. "leads-chart" */
  widgetId: string;
  /** Grid column start (0-based) */
  x: number;
  /** Grid row start */
  y: number;
  /** Width in grid columns */
  w: number;
  /** Height in grid rows */
  h: number;
  /** Optional constraints */
  minW?: number;
  minH?: number;
  maxH?: number;
}

/** Shape persisted to localStorage. */
interface PersistedState {
  layouts: WidgetLayoutItem[];
}

interface WidgetLayoutStore {
  /** Ordered layout items that react-grid-layout consumes */
  layouts: WidgetLayoutItem[];
  /** Whether the user is in "Edit Dashboard" mode */
  isEditing: boolean;

  // ── Actions ──
  setLayouts: (layouts: WidgetLayoutItem[]) => void;
  addWidget: (widgetId: string) => void;
  removeWidget: (instanceId: string) => void;
  toggleEditing: () => void;
  setEditing: (editing: boolean) => void;
  resetToDefault: () => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Generate the default layout from the registry (the "factory" layout). */
function buildDefaultLayout(): WidgetLayoutItem[] {
  const items: WidgetLayoutItem[] = [];
  let currentY = 0;

  // Row 1 – Stats cards (full width)
  const stats = widgetRegistry["stats-cards"];
  items.push({
    i: "stats-cards-0",
    widgetId: "stats-cards",
    x: 0,
    y: currentY,
    w: stats.defaultW,
    h: stats.defaultH,
    minW: stats.minW,
    minH: stats.minH,
    maxH: stats.maxH,
  });
  currentY += stats.defaultH;

  // Row 2 – Leads chart + Top performers side by side
  const chart = widgetRegistry["leads-chart"];
  items.push({
    i: "leads-chart-0",
    widgetId: "leads-chart",
    x: 0,
    y: currentY,
    w: chart.defaultW,
    h: chart.defaultH,
    minW: chart.minW,
    minH: chart.minH,
    maxH: chart.maxH,
  });

  const performers = widgetRegistry["top-performers"];
  items.push({
    i: "top-performers-0",
    widgetId: "top-performers",
    x: chart.defaultW,
    y: currentY,
    w: performers.defaultW,
    h: performers.defaultH,
    minW: performers.minW,
    minH: performers.minH,
    maxH: performers.maxH,
  });
  currentY += Math.max(chart.defaultH, performers.defaultH);

  // Row 3 – Leads table (full width)
  const table = widgetRegistry["leads-table"];
  items.push({
    i: "leads-table-0",
    widgetId: "leads-table",
    x: 0,
    y: currentY,
    w: table.defaultW,
    h: table.defaultH,
    minW: table.minW,
    minH: table.minH,
    maxH: table.maxH,
  });

  return items;
}

/** Generate a unique instance ID for a widget being added. */
function generateInstanceId(widgetId: string, existing: WidgetLayoutItem[]) {
  const count = existing.filter((l) => l.widgetId === widgetId).length;
  return `${widgetId}-${count}`;
}

/** Find the lowest open Y position on the grid. */
function getNextY(layouts: WidgetLayoutItem[]) {
  if (layouts.length === 0) return 0;
  return Math.max(...layouts.map((l) => l.y + l.h));
}

/** Strip transient RGL fields – only keep our clean schema. */
function sanitize(items: WidgetLayoutItem[]): WidgetLayoutItem[] {
  return items.map(({ i, widgetId, x, y, w, h, minW, minH, maxH }) => ({
    i,
    widgetId,
    x,
    y,
    w,
    h,
    ...(minW !== undefined && { minW }),
    ...(minH !== undefined && { minH }),
    ...(maxH !== undefined && { maxH }),
  }));
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useWidgetLayoutStore = create<WidgetLayoutStore>()(
  persist(
    (set, get) => ({
      layouts: buildDefaultLayout(),
      isEditing: false,

      setLayouts: (layouts) => set({ layouts: sanitize(layouts) }),

      addWidget: (widgetId) => {
        const def = widgetRegistry[widgetId];
        if (!def) return;

        const { layouts } = get();
        const instanceId = generateInstanceId(widgetId, layouts);
        const nextY = getNextY(layouts);

        const newItem: WidgetLayoutItem = {
          i: instanceId,
          widgetId,
          x: 0,
          y: nextY,
          w: def.defaultW,
          h: def.defaultH,
          minW: def.minW,
          minH: def.minH,
          maxH: def.maxH,
        };

        set({ layouts: [...layouts, newItem] });
      },

      removeWidget: (instanceId) =>
        set((state) => ({
          layouts: state.layouts.filter((l) => l.i !== instanceId),
        })),

      toggleEditing: () => set((state) => ({ isEditing: !state.isEditing })),
      setEditing: (editing) => set({ isEditing: editing }),

      resetToDefault: () =>
        set({ layouts: buildDefaultLayout(), isEditing: false }),
    }),
    {
      name: STORAGE_KEY,
      version: STORE_VERSION,
      // Only persist the clean widget layout, not transient UI state
      partialize: (state) => ({
        layouts: sanitize(state.layouts),
      }),
      // Re-hydrate: filter out stale widget definitions
      merge: (persisted, current) => {
        const data = persisted as Partial<PersistedState> | undefined;
        if (!data?.layouts || !Array.isArray(data.layouts)) return current;

        const normalized = data.layouts
          .map((item) => {
            const def = widgetRegistry[item.widgetId];
            if (!def) return null;

            // Always re-apply constraints from the registry.
            const next: WidgetLayoutItem = {
              ...item,
              minW: def.minW,
              minH: def.minH,
              maxH: def.maxH,
            };

            // For non-resizable widgets, force the canonical size.
            if (!def.resizable) {
              return {
                ...next,
                w: def.defaultW,
                h: def.defaultH,
                minW: def.defaultW,
                minH: def.defaultH,
                maxH: def.defaultH,
              };
            }

            // For resizable widgets, clamp w/h within allowed bounds.
            if (next.w < def.minW) next.w = def.minW;
            if (def.maxW !== undefined && next.w > def.maxW) next.w = def.maxW;
            if (next.h < def.minH) next.h = def.minH;
            if (def.maxH !== undefined && next.h > def.maxH) next.h = def.maxH;

            return next;
          })
          .filter(Boolean) as WidgetLayoutItem[];

        if (normalized.length === 0) return current;
        return { ...current, layouts: normalized };
      },
      // On version mismatch, migrate by resetting to defaults
      migrate: () => ({
        layouts: buildDefaultLayout(),
        isEditing: false,
      }),
    }
  )
);
