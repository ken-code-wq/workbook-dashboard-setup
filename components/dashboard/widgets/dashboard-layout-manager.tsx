"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  Plus,
  X,
  Copy,
  Pencil,
  Check,
  GripVertical,
  MoreHorizontal,
  LayoutGrid,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useWidgetLayoutStore,
  type DashboardView,
} from "@/store/widget-store";
import { cn } from "@/lib/utils";
import { CustomizableDashboard } from "./customizable-dashboard";

// ---------------------------------------------------------------------------
// Tab Presets – quick-start templates for new views
// ---------------------------------------------------------------------------

interface ViewPreset {
  label: string;
  description: string;
  widgets: string[];
}

const VIEW_PRESETS: Record<string, ViewPreset> = {
  sales: {
    label: "Sales Focus",
    description: "Revenue, invoices, and customer metrics",
    widgets: [
      "overview-kpi",
      "sales-revenue-month",
      "sales-trend",
      "sales-invoices",
      "sales-payments-method",
      "sales-invoice-aging",
    ],
  },
  inventory: {
    label: "Inventory",
    description: "Stock levels, movements, and value",
    widgets: [
      "inventory-stock",
      "inventory-movements",
      "inventory-stock-value",
      "inventory-adjustments",
      "inventory-transfers",
    ],
  },
  accounting: {
    label: "Accounting",
    description: "Chart of accounts, cash flow, and reports",
    widgets: [
      "accounting-coa",
      "accounting-balances-type",
      "accounting-cash-flow",
      "accounting-rev-vs-exp",
      "reporting-pnl",
    ],
  },
  crm: {
    label: "CRM",
    description: "Opportunities, pipeline, and win rate",
    widgets: [
      "crm-opportunities",
      "crm-pipeline",
      "crm-win-rate",
      "leads-pipeline",
    ],
  },
  purchases: {
    label: "Purchases",
    description: "Bills, POs, expenses, and suppliers",
    widgets: [
      "purchases-bills",
      "purchases-pos",
      "purchases-expenses",
      "purchases-suppliers",
      "purchases-monthly-spend",
    ],
  },
};

// ---------------------------------------------------------------------------
// New View Dialog
// ---------------------------------------------------------------------------

function NewViewDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [name, setName] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const addView = useWidgetLayoutStore((s) => s.addView);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setName("");
      setSelectedPreset(null);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const handleCreate = () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const preset = selectedPreset ? VIEW_PRESETS[selectedPreset] : undefined;
    addView(trimmed, preset?.widgets);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Dashboard View</DialogTitle>
          <DialogDescription>
            Create a new space to organize your widgets. Start blank or pick a
            template.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Name input */}
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="view-name">
              View name
            </label>
            <Input
              ref={inputRef}
              id="view-name"
              autoFocus
              placeholder="e.g. Sales Focus"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
          </div>

          {/* Presets grid */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Start from template</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedPreset(null)}
                className={cn(
                  "flex flex-col items-start gap-1 rounded-lg border p-3 text-left text-sm transition-colors",
                  selectedPreset === null
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "hover:bg-muted/50"
                )}
              >
                <span className="font-medium">Blank</span>
                <span className="text-xs text-muted-foreground">
                  Start from scratch
                </span>
              </button>
              {Object.entries(VIEW_PRESETS).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedPreset(key);
                    if (!name) setName(preset.label);
                  }}
                  className={cn(
                    "flex flex-col items-start gap-1 rounded-lg border p-3 text-left text-sm transition-colors",
                    selectedPreset === key
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                      : "hover:bg-muted/50"
                  )}
                >
                  <span className="font-medium">{preset.label}</span>
                  <span className="text-xs text-muted-foreground line-clamp-1">
                    {preset.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" size="sm">
              Cancel
            </Button>
          </DialogClose>
          <Button
            size="sm"
            disabled={!name.trim()}
            onClick={handleCreate}
          >
            Create View
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ---------------------------------------------------------------------------
// Inline rename input
// ---------------------------------------------------------------------------

function InlineRenameInput({
  value,
  onCommit,
  onCancel,
}: {
  value: string;
  onCommit: (name: string) => void;
  onCancel: () => void;
}) {
  const [text, setText] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.select();
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const trimmed = text.trim();
        if (trimmed) onCommit(trimmed);
        else onCancel();
      }}
      className="flex items-center"
    >
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => {
          const trimmed = text.trim();
          if (trimmed) onCommit(trimmed);
          else onCancel();
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") onCancel();
        }}
        className="h-6 w-24 rounded border bg-background px-1.5 text-xs font-medium outline-none focus:ring-1 focus:ring-primary"
        autoFocus
      />
    </form>
  );
}

// ---------------------------------------------------------------------------
// Single Tab
// ---------------------------------------------------------------------------

function ViewTab({
  view,
  isActive,
  isOnly,
}: {
  view: DashboardView;
  isActive: boolean;
  isOnly: boolean;
}) {
  const [isRenaming, setIsRenaming] = useState(false);
  const { setActiveView, renameView, removeView, duplicateView } =
    useWidgetLayoutStore();

  const handleRename = useCallback(
    (name: string) => {
      renameView(view.id, name);
      setIsRenaming(false);
    },
    [renameView, view.id]
  );

  return (
    <div
      className={cn(
        "group/tab relative flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm transition-all cursor-pointer select-none",
        isActive
          ? "bg-background text-foreground shadow-sm border"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
      )}
      onClick={() => !isRenaming && setActiveView(view.id)}
    >
      {isRenaming ? (
        <InlineRenameInput
          value={view.name}
          onCommit={handleRename}
          onCancel={() => setIsRenaming(false)}
        />
      ) : (
        <span className="text-xs font-medium truncate max-w-28">
          {view.name}
        </span>
      )}

      {/* Context menu */}
      {isActive && !isRenaming && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="ml-1 flex size-5 items-center justify-center rounded opacity-0 group-hover/tab:opacity-100 hover:bg-muted transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="size-3" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-44">
            <DropdownMenuItem onClick={() => setIsRenaming(true)}>
              <Pencil className="size-3.5 mr-2" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => duplicateView(view.id)}>
              <Copy className="size-3.5 mr-2" />
              Duplicate
            </DropdownMenuItem>
            {!isOnly && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => removeView(view.id)}
                >
                  <X className="size-3.5 mr-2" />
                  Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Layout Manager (main export)
// ---------------------------------------------------------------------------

export function DashboardLayoutManager() {
  const [newViewOpen, setNewViewOpen] = useState(false);
  const views = useWidgetLayoutStore((s) => s.views);
  const activeViewId = useWidgetLayoutStore((s) => s.activeViewId);
  const isEditing = useWidgetLayoutStore((s) => s.isEditing);

  return (
    <div className="flex flex-col gap-0 w-full">
      {/* ── Tab bar ─────────────────────────────────────────── */}
      <div className="flex items-center gap-1 px-0 pb-3">
        <div className="flex items-center gap-0.5 rounded-xl bg-muted/50 p-1 overflow-x-auto scrollbar-none">
          {views.map((view) => (
            <ViewTab
              key={view.id}
              view={view}
              isActive={view.id === activeViewId}
              isOnly={views.length === 1}
            />
          ))}

          {/* Add view button */}
          <button
            onClick={() => setNewViewOpen(true)}
            className={cn(
              "flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors",
              "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            )}
          >
            <Plus className="size-3.5" />
            <span className="hidden sm:inline">New view</span>
          </button>
        </div>

        {/* View count indicator */}
        {views.length > 1 && (
          <div className="hidden sm:flex items-center gap-1.5 ml-auto mr-1 text-[10px] text-muted-foreground/60">
            <LayoutGrid className="size-3" />
            <span>{views.length} views</span>
          </div>
        )}
      </div>

      {/* ── Active view grid ────────────────────────────────── */}
      <CustomizableDashboard />

      {/* ── New view dialog ─────────────────────────────────── */}
      <NewViewDialog open={newViewOpen} onOpenChange={setNewViewOpen} />
    </div>
  );
}
