"use client";

import { Component, useState, useRef, useCallback, type ReactNode } from "react";
import { Drawer } from "vaul";
import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import {
  widgetRegistry,
  widgetGroups,
  type WidgetGroup,
  type WidgetDefinition,
} from "./widget-registry";
import { useWidgetLayoutStore } from "@/store/widget-store";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Category colours
// ---------------------------------------------------------------------------

const groupColors: Record<WidgetGroup, { bg: string; text: string; border: string; dot: string }> = {
  overview: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/20", dot: "bg-blue-500" },
  leads: { bg: "bg-amber-500/10", text: "text-amber-500", border: "border-amber-500/20", dot: "bg-amber-500" },
  employees: { bg: "bg-violet-500/10", text: "text-violet-500", border: "border-violet-500/20", dot: "bg-violet-500" },
  sales: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/20", dot: "bg-emerald-500" },
  accounting: { bg: "bg-cyan-500/10", text: "text-cyan-500", border: "border-cyan-500/20", dot: "bg-cyan-500" },
  purchases: { bg: "bg-pink-500/10", text: "text-pink-500", border: "border-pink-500/20", dot: "bg-pink-500" },
  inventory: { bg: "bg-orange-500/10", text: "text-orange-500", border: "border-orange-500/20", dot: "bg-orange-500" },
  crm: { bg: "bg-indigo-500/10", text: "text-indigo-500", border: "border-indigo-500/20", dot: "bg-indigo-500" },
  reporting: { bg: "bg-teal-500/10", text: "text-teal-500", border: "border-teal-500/20", dot: "bg-teal-500" },
};

// ---------------------------------------------------------------------------
// Widget Preview Card – renders the actual component at a small scale
// ---------------------------------------------------------------------------

function WidgetPreviewCard({
  def,
  onAdd,
  isAdded,
  count,
}: {
  def: WidgetDefinition;
  onAdd: () => void;
  isAdded: boolean;
  count: number;
}) {
  const Component = def.component;

  return (
    <button
      onClick={onAdd}
      className={cn(
        "group relative flex flex-col rounded-xl border bg-card text-left transition-all",
        "hover:border-primary/30 hover:shadow-md",
        "active:scale-[0.98]",
        isAdded && "border-emerald-500/40 ring-1 ring-emerald-500/20"
      )}
    >
      {/* Instance count badge */}
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 z-10 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow">
          {count}
        </span>
      )}

      {/* Added checkmark overlay */}
      {isAdded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-emerald-500/10">
          <div className="flex size-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow">
            <Check className="size-4" />
          </div>
        </div>
      )}

      {/* Live preview – scaled-down actual widget */}
      <div className="relative h-35 w-full overflow-hidden rounded-t-xl bg-background">
        <div
          className="pointer-events-none origin-top-left"
          style={{
            transform: "scale(0.35)",
            width: `${100 / 0.35}%`,
            height: `${140 / 0.35}px`,
          }}
        >
          <PreviewErrorBoundary
            fallback={
              <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                Preview unavailable
              </div>
            }
          >
            <Component />
          </PreviewErrorBoundary>
        </div>
      </div>

      {/* Label */}
      <div className="flex items-center gap-2 border-t px-3 py-2.5">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium truncate">{def.label}</p>
          <p className="text-[10px] text-muted-foreground truncate">
            {def.description}
          </p>
        </div>
        <div
          className={cn(
            "flex size-6 shrink-0 items-center justify-center rounded-md transition-colors",
            "bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground"
          )}
        >
          <Plus className="size-3.5" />
        </div>
      </div>
    </button>
  );
}

class PreviewErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state: { hasError: boolean } = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

// ---------------------------------------------------------------------------
// Main Drawer
// ---------------------------------------------------------------------------

interface WidgetLibraryDrawerProps {
  trigger?: React.ReactNode;
}

export function WidgetLibraryDrawer({ trigger }: WidgetLibraryDrawerProps) {
  const [open, setOpen] = useState(false);
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState<WidgetGroup | null>(null);
  const addWidget = useWidgetLayoutStore((s) => s.addWidget);
  const layouts = useWidgetLayoutStore((s) => s.layouts);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  const getWidgetCount = (widgetId: string) =>
    layouts.filter((l) => l.widgetId === widgetId).length;

  const handleAdd = (def: WidgetDefinition) => {
    addWidget(def.id);
    setJustAdded(def.id);
    setTimeout(() => setJustAdded(null), 1200);
  };

  // Group widgets by domain (only groups that have widgets)
  const sections = Object.entries(widgetGroups)
    .map(([key, meta]) => ({
      key: key as WidgetGroup,
      label: meta.label,
      widgets: Object.values(widgetRegistry).filter((w) => w.group === key),
    }))
    .filter((group) => group.widgets.length > 0);

  // Scroll to a specific section
  const scrollToSection = useCallback((groupKey: WidgetGroup) => {
    const el = sectionRefs.current.get(groupKey);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveGroup(groupKey);
    }
  }, []);

  // Track active section on scroll
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let closest: WidgetGroup | null = null;
    let minOffset = Infinity;

    for (const [key, el] of sectionRefs.current.entries()) {
      const rect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const offset = Math.abs(rect.top - containerRect.top);
      if (offset < minOffset) {
        minOffset = offset;
        closest = key as WidgetGroup;
      }
    }

    if (closest) setActiveGroup(closest);
  }, []);

  // Register section ref
  const setSectionRef = useCallback((key: string, el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(key, el);
    else sectionRefs.current.delete(key);
  }, []);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} direction="bottom">
      <Drawer.Trigger asChild>
        {trigger ?? (
          <Button variant="outline" size="sm" className="h-8 gap-1.5">
            <Plus className="size-3.5" />
            <span>Add widget</span>
          </Button>
        )}
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mx-4 sm:mx-8 lg:mx-16 flex h-[75vh] max-h-160 flex-col rounded-t-2xl border bg-background p-0 outline-none">
          {/* Grab handle */}
          <Drawer.Handle className="mt-3" />

          {/* ── Header ──────────────────────────────────────────── */}
          <div className="px-6 pt-4 pb-3 text-center">
            <Drawer.Title className="text-base font-semibold">
              Widgets
            </Drawer.Title>
            <Drawer.Description className="text-xs text-muted-foreground">
              Tap a widget to add it to your dashboard
            </Drawer.Description>
          </div>

          {/* ── Body: sidebar + content ─────────────────────────── */}
          <div className="flex flex-1 min-h-0 border-t">
            {/* ── Sidebar navigation ──────────────────────────── */}
            <nav className="hidden sm:flex flex-col w-44 shrink-0 border-r py-3 px-2 gap-0.5 overflow-y-auto">
              {sections.map((group) => {
                const colors = groupColors[group.key];
                const isActive = activeGroup === group.key;
                return (
                  <button
                    key={group.key}
                    onClick={() => scrollToSection(group.key)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors text-left",
                      isActive
                        ? `${colors.bg} ${colors.text}`
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <span
                      className={cn(
                        "size-2 rounded-full shrink-0",
                        isActive ? colors.dot : "bg-muted-foreground/30"
                      )}
                    />
                    {group.label}
                    <span className="ml-auto text-[10px] tabular-nums opacity-60">
                      {group.widgets.length}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* ── Scrollable widget groups ──────────────────────── */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto"
            >
              <div className="space-y-6 p-6">
                {sections.map((group) => {
                  const colors = groupColors[group.key];
                  return (
                    <section
                      key={group.key}
                      ref={(el) => setSectionRef(group.key, el)}
                      id={`widget-group-${group.key}`}
                    >
                      <h3
                        className={cn(
                          "mb-3 text-xs font-semibold uppercase tracking-wider",
                          colors.text
                        )}
                      >
                        {group.label}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {group.widgets.map((def) => (
                          <WidgetPreviewCard
                            key={def.id}
                            def={def}
                            onAdd={() => handleAdd(def)}
                            isAdded={justAdded === def.id}
                            count={getWidgetCount(def.id)}
                          />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
