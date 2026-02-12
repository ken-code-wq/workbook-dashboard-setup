"use client";

import { type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface WidgetWrapperProps {
  /** Unique widget instance key */
  widgetId: string;
  /** Human-readable title for the header */
  title: string;
  /** Whether the dashboard is in edit/customise mode */
  isEditing: boolean;
  /** Callback to remove this widget from the layout */
  onRemove: (id: string) => void;
  /** The actual widget component rendered inside */
  children: ReactNode;
  /** Optional additional className */
  className?: string;
}

export function WidgetWrapper({
  widgetId,
  title,
  isEditing,
  onRemove,
  children,
  className,
}: WidgetWrapperProps) {
  return (
    <div
      className={cn(
        "group/widget relative h-full w-full flex flex-col rounded-xl overflow-visible",
        "transition-all duration-200",
        isEditing && "cursor-grab active:cursor-grabbing",
        isEditing &&
          "border-2 border-primary/20 hover:border-primary/50 dark:border-primary/15 dark:hover:border-primary/40 shadow-sm hover:shadow-lg",
        className
      )}
    >
      {/* ── Remove button – top-left corner, partially outside ── */}
      {isEditing && (
        <button
          type="button"
          className={cn(
            "absolute -top-2.5 -left-2.5 z-40",
            "flex size-6 items-center justify-center rounded-full",
            "bg-destructive text-destructive-foreground shadow-md",
            "opacity-0 group-hover/widget:opacity-100",
            "transition-all duration-150 hover:scale-110 active:scale-95"
          )}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onRemove(widgetId);
          }}
        >
          <X className="size-3 text-white " />
          <span className="sr-only">Remove {title}</span>
        </button>
      )}

      {/* ── Blur overlay with widget title – only on hover ───── */}
      {isEditing && (
        <div
          className={cn(
            "absolute inset-0 z-30 flex items-center justify-center rounded-xl",
            "bg-background/40 backdrop-blur-[2px]",
            "pointer-events-none select-none",
            "opacity-0 group-hover/widget:opacity-100 transition-opacity duration-200"
          )}
        >
          <span className="rounded-md bg-background/70 px-3 py-1.5 text-sm font-medium text-foreground/80 shadow-sm">
            {title}
          </span>
        </div>
      )}

      {/* ── Widget content ───────────────────────────────────── */}
      <div
        className={cn(
          "flex-1 overflow-hidden rounded-xl",
          isEditing && "pointer-events-none select-none"
        )}
      >
        {children}
      </div>
    </div>
  );
}
