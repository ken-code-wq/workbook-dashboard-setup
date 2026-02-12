import { create } from "zustand";
import { persist } from "zustand/middleware";
import { widgetRegistry } from "@/components/dashboard/widgets/widget-registry";

// ---------------------------------------------------------------------------
// Schema version – bump when the persisted shape changes
// ---------------------------------------------------------------------------

const STORE_VERSION = 3;
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

/** A named dashboard view / tab. */
export interface DashboardView {
  /** Unique view ID */
  id: string;
  /** Display name (editable) */
  name: string;
  /** Widget layouts for this view */
  layouts: WidgetLayoutItem[];
  /** Creation timestamp */
  createdAt: number;
}

/** Shape persisted to localStorage. */
interface PersistedState {
  views: DashboardView[];
  activeViewId: string;
}

interface WidgetLayoutStore {
  /** All dashboard views / tabs */
  views: DashboardView[];
  /** Currently active view ID */
  activeViewId: string;
  /** Whether the user is in "Edit Dashboard" mode */
  isEditing: boolean;

  // ── View actions ──
  addView: (name: string, presetWidgets?: string[]) => string;
  removeView: (viewId: string) => void;
  renameView: (viewId: string, name: string) => void;
  duplicateView: (viewId: string) => string;
  setActiveView: (viewId: string) => void;
  reorderViews: (viewIds: string[]) => void;

  // ── Widget actions (operate on active view) ──
  setLayouts: (layouts: WidgetLayoutItem[]) => void;
  addWidget: (widgetId: string) => void;
  removeWidget: (instanceId: string) => void;
  toggleEditing: () => void;
  setEditing: (editing: boolean) => void;
  resetActiveView: () => void;
  resetToDefault: () => void;

  // ── Derived getters ──
  getActiveView: () => DashboardView | undefined;
  getActiveLayouts: () => WidgetLayoutItem[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let _idCounter = 0;
/** Generate a short unique view ID. */
function generateViewId(): string {
  return `view-${Date.now()}-${_idCounter++}`;
}

/** Generate the default "Overview" layout from the registry. */
function buildDefaultLayout(): WidgetLayoutItem[] {
  const items: WidgetLayoutItem[] = [];
  let currentY = 0;

  const stats = widgetRegistry["stats-cards"];
  if (stats) {
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
  }

  const chart = widgetRegistry["leads-chart"];
  if (chart) {
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
  }

  const performers = widgetRegistry["top-performers"];
  if (performers && chart) {
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
  }

  const table = widgetRegistry["leads-table"];
  if (table) {
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
  }

  return items;
}

/** Build a layout from a list of widget IDs (for preset views). */
function buildLayoutFromWidgetIds(widgetIds: string[]): WidgetLayoutItem[] {
  const items: WidgetLayoutItem[] = [];
  let currentY = 0;
  let currentX = 0;

  for (const widgetId of widgetIds) {
    const def = widgetRegistry[widgetId];
    if (!def) continue;

    // If this widget won't fit on the current row, move to the next row
    if (currentX + def.defaultW > 12) {
      currentY += items.length > 0 ? items[items.length - 1].h : 0;
      currentX = 0;
    }

    const count = items.filter((l) => l.widgetId === widgetId).length;
    items.push({
      i: `${widgetId}-${count}`,
      widgetId,
      x: currentX,
      y: currentY,
      w: def.defaultW,
      h: def.defaultH,
      minW: def.minW,
      minH: def.minH,
      maxH: def.maxH,
    });

    currentX += def.defaultW;
    if (currentX >= 12) {
      currentY += def.defaultH;
      currentX = 0;
    }
  }

  return items;
}

/** Build the default set of views. */
function buildDefaultViews(): DashboardView[] {
  return [
    {
      id: "overview",
      name: "Overview",
      layouts: buildDefaultLayout(),
      createdAt: Date.now(),
    },
  ];
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

/** Normalize a single view's layouts against the current registry. */
function normalizeViewLayouts(view: DashboardView): DashboardView {
  const normalized = view.layouts
    .map((item) => {
      const def = widgetRegistry[item.widgetId];
      if (!def) return null;

      const next: WidgetLayoutItem = {
        ...item,
        minW: def.minW,
        minH: def.minH,
        maxH: def.maxH,
      };

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

      if (next.w < def.minW) next.w = def.minW;
      if (def.maxW !== undefined && next.w > def.maxW) next.w = def.maxW;
      if (next.h < def.minH) next.h = def.minH;
      if (def.maxH !== undefined && next.h > def.maxH) next.h = def.maxH;

      return next;
    })
    .filter(Boolean) as WidgetLayoutItem[];

  return { ...view, layouts: normalized };
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useWidgetLayoutStore = create<WidgetLayoutStore>()(
  persist(
    (set, get) => ({
      views: buildDefaultViews(),
      activeViewId: "overview",
      isEditing: false,

      // ── View CRUD ────────────────────────────────────────────

      addView: (name, presetWidgets) => {
        const id = generateViewId();
        const layouts = presetWidgets
          ? buildLayoutFromWidgetIds(presetWidgets)
          : [];

        const newView: DashboardView = {
          id,
          name,
          layouts,
          createdAt: Date.now(),
        };

        set((state) => ({
          views: [...state.views, newView],
          activeViewId: id,
        }));
        return id;
      },

      removeView: (viewId) =>
        set((state) => {
          const remaining = state.views.filter((v) => v.id !== viewId);
          // Never allow removing the last view
          if (remaining.length === 0) return state;

          const needsSwitch = state.activeViewId === viewId;
          return {
            views: remaining,
            activeViewId: needsSwitch ? remaining[0].id : state.activeViewId,
          };
        }),

      renameView: (viewId, name) =>
        set((state) => ({
          views: state.views.map((v) =>
            v.id === viewId ? { ...v, name } : v
          ),
        })),

      duplicateView: (viewId) => {
        const state = get();
        const source = state.views.find((v) => v.id === viewId);
        if (!source) return viewId;

        const newId = generateViewId();
        const duplicate: DashboardView = {
          ...source,
          id: newId,
          name: `${source.name} (copy)`,
          layouts: sanitize([...source.layouts]),
          createdAt: Date.now(),
        };

        set((s) => ({
          views: [...s.views, duplicate],
          activeViewId: newId,
        }));
        return newId;
      },

      setActiveView: (viewId) => set({ activeViewId: viewId }),

      reorderViews: (viewIds) =>
        set((state) => {
          const viewMap = new Map(state.views.map((v) => [v.id, v]));
          const reordered = viewIds
            .map((id) => viewMap.get(id))
            .filter(Boolean) as DashboardView[];
          return { views: reordered };
        }),

      // ── Widget actions (scoped to active view) ──────────────

      setLayouts: (layouts) =>
        set((state) => ({
          views: state.views.map((v) =>
            v.id === state.activeViewId
              ? { ...v, layouts: sanitize(layouts) }
              : v
          ),
        })),

      addWidget: (widgetId) => {
        const def = widgetRegistry[widgetId];
        if (!def) return;

        const state = get();
        const view = state.views.find((v) => v.id === state.activeViewId);
        if (!view) return;

        const instanceId = generateInstanceId(widgetId, view.layouts);
        const nextY = getNextY(view.layouts);

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

        set((s) => ({
          views: s.views.map((v) =>
            v.id === s.activeViewId
              ? { ...v, layouts: [...v.layouts, newItem] }
              : v
          ),
        }));
      },

      removeWidget: (instanceId) =>
        set((state) => ({
          views: state.views.map((v) =>
            v.id === state.activeViewId
              ? { ...v, layouts: v.layouts.filter((l) => l.i !== instanceId) }
              : v
          ),
        })),

      toggleEditing: () => set((state) => ({ isEditing: !state.isEditing })),
      setEditing: (editing) => set({ isEditing: editing }),

      resetActiveView: () =>
        set((state) => ({
          views: state.views.map((v) =>
            v.id === state.activeViewId
              ? { ...v, layouts: v.id === "overview" ? buildDefaultLayout() : [] }
              : v
          ),
        })),

      resetToDefault: () =>
        set({
          views: buildDefaultViews(),
          activeViewId: "overview",
          isEditing: false,
        }),

      // ── Derived helpers ─────────────────────────────────────

      getActiveView: () => {
        const { views, activeViewId } = get();
        return views.find((v) => v.id === activeViewId);
      },

      getActiveLayouts: () => {
        const view = get().getActiveView();
        return view?.layouts ?? [];
      },
    }),
    {
      name: STORAGE_KEY,
      version: STORE_VERSION,
      // Only persist views + activeViewId, not transient UI state
      partialize: (state) => ({
        views: state.views.map((v) => ({
          ...v,
          layouts: sanitize(v.layouts),
        })),
        activeViewId: state.activeViewId,
      }),
      // Re-hydrate: normalize all view layouts against current registry
      merge: (persisted, current) => {
        const data = persisted as Partial<PersistedState> | undefined;
        if (!data?.views || !Array.isArray(data.views) || data.views.length === 0) {
          return current;
        }

        const normalizedViews = data.views.map(normalizeViewLayouts);
        const activeViewId =
          data.activeViewId && normalizedViews.some((v) => v.id === data.activeViewId)
            ? data.activeViewId
            : normalizedViews[0].id;

        return { ...current, views: normalizedViews, activeViewId };
      },
      // On version mismatch, migrate by resetting to defaults
      migrate: () => ({
        views: buildDefaultViews(),
        activeViewId: "overview",
        isEditing: false,
      }),
    }
  )
);
