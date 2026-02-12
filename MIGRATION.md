# Dashboard Widget System — Migration Guide

> **Purpose:** Copy-paste this customisable dashboard into an **existing** Next.js + shadcn/ui project.
> Every section tells you _what to copy_ and _what to edit_. Follow the steps **in order**.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Install Dependencies](#2-install-dependencies)
3. [Copy shadcn/ui Components](#3-copy-shadcnui-components)
4. [Copy the CSS (react-grid-layout styles)](#4-copy-the-css-react-grid-layout-styles)
5. [Copy Utility Files](#5-copy-utility-files)
6. [Copy the Widget System (core)](#6-copy-the-widget-system-core)
7. [Copy the Base Widget Components](#7-copy-the-base-widget-components)
8. [Copy the Mock Data](#8-copy-the-mock-data)
9. [Copy the Domain Widgets](#9-copy-the-domain-widgets)
10. [Copy the Store](#10-copy-the-store)
11. [Wire It Into Your App](#11-wire-it-into-your-app)
12. [Replace Mock Data with Real Data](#12-replace-mock-data-with-real-data)
13. [Adding Your Own Widgets](#13-adding-your-own-widgets)
14. [Removing Widgets You Don't Need](#14-removing-widgets-you-dont-need)
15. [Folder Structure Reference](#15-folder-structure-reference)
16. [Troubleshooting](#16-troubleshooting)

---

## 1. Prerequisites

Your **existing** project must already have:

| Requirement | Minimum version |
| --- | --- |
| Next.js (App Router) | 14+ (tested on 16.1) |
| React | 18+ (tested on 19.2) |
| TypeScript | 5+ |
| Tailwind CSS | v4 |
| shadcn/ui initialised | `npx shadcn@latest init` already run |
| `@/` path alias | Points to project root (`tsconfig.json → paths`) |
| Package manager | pnpm (or npm — adjust commands accordingly) |

> **Important:** Your `tsconfig.json` must have `"@/*": ["./*"]` in `compilerOptions.paths`.
> shadcn/ui's `components.json` should already set this up. If not, add it.

---

## 2. Install Dependencies

Run this **single command** in your project root. It installs the dashboard-specific packages that you probably don't have yet.

```bash
pnpm add react-grid-layout zustand vaul recharts @nivo/core @nivo/funnel next-themes lucide-react
pnpm add -D @types/react-grid-layout
```

> **Already have some of these?** That's fine — pnpm/npm will skip them.
>
> **Don't need the funnel chart?** You can skip `@nivo/core` and `@nivo/funnel`.
> Later, remove the funnel widgets from the registry (Step 14).

---

## 3. Copy shadcn/ui Components

The widget system uses these shadcn/ui components. For each one you _don't_ already have, run the `add` command:

```bash
npx shadcn@latest add badge button card chart checkbox collapsible dialog dropdown-menu input scroll-area select separator sheet sidebar skeleton table tooltip avatar
```

> If prompted "Component already exists", choose **skip** or **overwrite** — either is fine.

This creates files inside `components/ui/`. You don't need to edit any of them.

---

## 4. Copy the CSS (react-grid-layout styles)

Open your **global CSS file** (e.g. `app/globals.css`).

**Paste the following block** at the end of the file:

```css
/* ── react-grid-layout core styles ─────────────────────────────────────── */

.react-grid-layout {
  position: relative;
  transition: height 200ms ease;
}

.react-grid-item {
  transition: all 200ms ease;
  transition-property: left, top, width, height;
}

.react-grid-item.cssTransforms {
  transition-property: transform, width, height;
}

.react-grid-item.resizing {
  transition: none;
  z-index: 1;
  will-change: width, height;
}

.react-grid-item.react-draggable-dragging {
  transition: none;
  z-index: 3;
  will-change: transform;
  opacity: 0.9;
}

/* Only show resize handles while editing */
.widget-grid-layout:not(.is-editing) .react-resizable-handle {
  opacity: 0;
  pointer-events: none;
}

.widget-grid-layout.is-editing .react-resizable-handle {
  opacity: 1;
  pointer-events: auto;
}

.react-grid-item > .react-resizable-handle {
  position: absolute;
  width: 26px;
  height: 26px;
  z-index: 20;
}

.react-grid-item > .react-resizable-handle::after {
  content: "";
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 0 0 6px 0;
  border-right: 4px solid var(--muted-foreground);
  border-bottom: 4px solid var(--muted-foreground);
  border-right-color: color-mix(
    in oklab,
    var(--muted-foreground) 55%,
    transparent
  );
  border-bottom-color: color-mix(
    in oklab,
    var(--muted-foreground) 55%,
    transparent
  );
  opacity: 0.9;
  transition: opacity 150ms ease, border-color 150ms ease;
}

.widget-grid-layout.is-editing .react-grid-item:hover > .react-resizable-handle::after {
  border-right-color: color-mix(
    in oklab,
    var(--muted-foreground) 75%,
    transparent
  );
  border-bottom-color: color-mix(
    in oklab,
    var(--muted-foreground) 75%,
    transparent
  );
}

.react-grid-item > .react-resizable-handle.react-resizable-handle-se {
  bottom: -6px;
  right: -6px;
  cursor: se-resize;
}

.react-grid-item > .react-resizable-handle.react-resizable-handle-se::after {
  right: 6px;
  bottom: 6px;
  border-radius: 6px 0 10px 0;
}

.react-grid-item > .react-resizable-handle.react-resizable-handle-sw {
  bottom: -6px;
  left: -6px;
  cursor: sw-resize;
}

.react-grid-item > .react-resizable-handle.react-resizable-handle-sw::after {
  left: 6px;
  bottom: 6px;
  border-right: none;
  border-left: 4px solid var(--muted-foreground);
  border-left-color: color-mix(
    in oklab,
    var(--muted-foreground) 55%,
    transparent
  );
  border-radius: 0 6px 0 10px;
}

.react-grid-item.react-grid-placeholder {
  background: hsl(var(--primary) / 0.08);
  border: 2px dashed hsl(var(--primary) / 0.3);
  border-radius: 0.75rem;
  opacity: 1;
  transition-duration: 100ms;
  z-index: 2;
  user-select: none;
}

/* ── Widget grid item ──────────────────────────────────────────────────── */

.widget-grid-item {
  height: 100%;
  width: 100%;
  overflow: visible;
}

/* When dragging, add a subtle shadow and lift */
.react-draggable-dragging .widget-grid-item {
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.25);
  border-radius: 0.75rem;
}
```

---

## 5. Copy Utility Files

You likely already have these from shadcn/ui. If not, copy them:

### `lib/utils.ts`

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### `hooks/use-mobile.ts`

```ts
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
```

### `components/theme-provider.tsx`

```tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

> **Edit needed:** If your project already has a `ThemeProvider`, skip this file.

---

## 6. Copy the Widget System (core)

These 3 files are the **engine** of the dashboard. Copy them **as-is**.

### Copy the entire folder:

```
components/dashboard/widgets/
├── customizable-dashboard.tsx   ← The main grid (react-grid-layout)
├── widget-wrapper.tsx           ← Wraps each widget with edit-mode controls
├── widget-library-modal.tsx     ← Vaul bottom drawer for adding widgets
└── widget-registry.ts           ← Central registry (you WILL edit this)
```

**Source → Destination mapping:**

| Source file | Copy to |
| --- | --- |
| `components/dashboard/widgets/customizable-dashboard.tsx` | Same path in your project |
| `components/dashboard/widgets/widget-wrapper.tsx` | Same path in your project |
| `components/dashboard/widgets/widget-library-modal.tsx` | Same path in your project |
| `components/dashboard/widgets/widget-registry.ts` | Same path in your project |

> **No edits needed** for `customizable-dashboard.tsx`, `widget-wrapper.tsx`, or `widget-library-modal.tsx`.
>
> **You WILL edit `widget-registry.ts`** later to add/remove widgets for your ERP modules (Step 13/14).

---

## 7. Copy the Base Widget Components

These are **reusable, generic chart/table shells**. They know nothing about your business domain.
Copy the entire `base/` folder:

```
components/dashboard/widgets/base/
├── area-chart-widget.tsx        ← Multi-series area chart with gradient fills
├── bar-chart-widget.tsx         ← Single-series bar chart
├── stacked-bar-chart-widget.tsx ← Multi-series grouped/stacked bar chart
├── pie-chart-widget.tsx         ← Donut pie chart with center total
├── kpi-card-widget.tsx          ← Grid of metric cards with trend arrows
├── radial-chart-widget.tsx      ← Gauge-style radial progress rings
├── pipeline-chart-widget.tsx    ← Funnel chart (@nivo/funnel)
└── table-widget.tsx             ← Generic sortable table
```

**Copy these files as-is. No edits needed.**

> If you skipped installing `@nivo/funnel` in Step 2, **do NOT copy `pipeline-chart-widget.tsx`**.

---

## 8. Copy the Mock Data

These files contain **fake data** used by the domain widgets. Copy the entire `mock-data/` folder:

```
mock-data/
├── dashboard.ts         ← Leads, stats, chart data
├── sales.ts             ← Revenue, credit notes, estimates, customers, orders
├── sales-documents.ts   ← Invoices, payments
├── accounting.ts        ← COA, transactions, cash flow, fixed assets
├── purchases.ts         ← Bills, POs, expenses, suppliers
├── inventory.ts         ← Stock items, movements, adjustments, transfers
├── crm.ts               ← Opportunities, pipeline, win rate
└── employees.ts         ← Employee list, headcount
```

**Copy the entire folder as-is.** You will **replace the contents** with real API calls later (Step 12), but having the mock data lets you test immediately.

---

## 9. Copy the Domain Widgets

Domain widgets are **thin wrappers** that connect a base widget to specific data.
Copy the folders for the ERP modules you need:

```
components/dashboard/widgets/
├── sales/
│   ├── invoices-widget.tsx
│   ├── payments-by-method-widget.tsx
│   ├── revenue-by-month-widget.tsx
│   ├── sales-trend-widget.tsx
│   ├── credit-notes-widget.tsx
│   ├── estimates-widget.tsx
│   ├── customers-widget.tsx
│   ├── orders-widget.tsx
│   └── invoice-aging-widget.tsx
├── accounting/
│   ├── chart-of-accounts-widget.tsx
│   ├── balances-by-type-widget.tsx
│   ├── transactions-widget.tsx
│   ├── cash-flow-widget.tsx
│   ├── fixed-assets-widget.tsx
│   └── revenue-vs-expenses-widget.tsx
├── purchases/
│   ├── bills-widget.tsx
│   ├── purchase-orders-widget.tsx
│   ├── expenses-widget.tsx
│   ├── suppliers-widget.tsx
│   └── monthly-spend-widget.tsx
├── inventory/
│   ├── stock-levels-widget.tsx
│   ├── stock-movements-widget.tsx
│   ├── stock-value-trend-widget.tsx
│   ├── adjustments-widget.tsx
│   └── transfers-widget.tsx
├── crm/
│   ├── opportunities-widget.tsx
│   ├── opportunities-pipeline-widget.tsx
│   └── win-rate-widget.tsx
├── employees/
│   ├── employees-table-widget.tsx
│   └── headcount-by-department-widget.tsx
├── leads/
│   └── leads-pipeline-widget.tsx
├── overview/
│   ├── overview-kpi-widget.tsx
│   └── targets-widget.tsx
└── reporting/
    ├── cash-flow-summary-widget.tsx
    └── profit-loss-widget.tsx
```

> **Don't need a module?** Skip that folder entirely. Just remember to also remove its entries from `widget-registry.ts` (Step 14).

---

## 10. Copy the Store

Copy these 2 files:

```
store/
├── widget-store.ts       ← Zustand store — persists widget layout to localStorage
└── dashboard-store.ts    ← Zustand store — filter/sort state for the leads table
```

### `store/widget-store.ts` — Copy as-is

This file manages the grid layout. It persists to `localStorage` under the key `"dashboard-widgets"`.

> **Edit if needed:**
> - Change `STORAGE_KEY` on line 10 if you want a different localStorage key.
> - The `buildDefaultLayout()` function (around line 65) defines which widgets appear by default. Edit this to match the widgets you kept.

### `store/dashboard-store.ts` — Copy as-is (or skip)

This store is only used by the original Leads table/chart components (`leads-chart.tsx`, `leads-table.tsx`, `stats-cards.tsx`, `top-performers.tsx`). If you don't copy those components, you can skip this file.

---

## 11. Wire It Into Your App

### Option A: Standalone Dashboard Page

Create a new page at `app/dashboard/page.tsx` (or wherever you want):

```tsx
import { CustomizableDashboard } from "@/components/dashboard/widgets/customizable-dashboard";

export default function DashboardPage() {
  return (
    <main className="flex-1 overflow-auto p-4 sm:p-6 bg-background w-full">
      <CustomizableDashboard />
    </main>
  );
}
```

That's it. The `<CustomizableDashboard />` component renders the toolbar (Edit / Add Widget / Reset) and the grid.

### Option B: Inside Your Existing Layout

If you already have a layout with a sidebar and header, just drop `<CustomizableDashboard />` into the content area:

```tsx
// Inside your existing content component
import { CustomizableDashboard } from "@/components/dashboard/widgets/customizable-dashboard";

export function YourDashboardContent() {
  return (
    <div className="flex-1 overflow-auto p-4 sm:p-6">
      <CustomizableDashboard />
    </div>
  );
}
```

### ThemeProvider

The dashboard uses `next-themes` for dark mode. Make sure your root layout wraps the app in `<ThemeProvider>`:

```tsx
// app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

> If you already have a ThemeProvider, skip this.

---

## 12. Replace Mock Data with Real Data

Each domain widget is a tiny file that imports mock data and passes it to a base widget. Here's the pattern:

### Before (mock data):

```tsx
// components/dashboard/widgets/sales/invoices-widget.tsx
"use client";

import { TableWidget, type TableWidgetColumn } from "../base/table-widget";
import { invoices, type Invoice } from "@/mock-data/sales-documents";

const columns: Array<TableWidgetColumn<Invoice>> = [ /* ... */ ];

export function InvoicesWidget() {
  return (
    <TableWidget
      title="Invoices"
      rows={invoices}        // ← mock data
      columns={columns}
      rowKey={(row) => row.id}
    />
  );
}
```

### After (real API):

```tsx
// components/dashboard/widgets/sales/invoices-widget.tsx
"use client";

import { useEffect, useState } from "react";
import { TableWidget, type TableWidgetColumn } from "../base/table-widget";

// Use your real Invoice type from your API/types
import type { Invoice } from "@/types/sales";

const columns: Array<TableWidgetColumn<Invoice>> = [ /* ... */ ];

export function InvoicesWidget() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    // Replace with your actual API call
    fetch("/api/sales/invoices")
      .then((res) => res.json())
      .then(setInvoices);
  }, []);

  return (
    <TableWidget
      title="Invoices"
      rows={invoices}        // ← real data
      columns={columns}
      rowKey={(row) => row.id}
    />
  );
}
```

### With React Query / SWR:

```tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { TableWidget, type TableWidgetColumn } from "../base/table-widget";
import type { Invoice } from "@/types/sales";

const columns: Array<TableWidgetColumn<Invoice>> = [ /* ... */ ];

export function InvoicesWidget() {
  const { data: invoices = [] } = useQuery({
    queryKey: ["invoices"],
    queryFn: () => fetch("/api/sales/invoices").then((r) => r.json()),
  });

  return (
    <TableWidget
      title="Invoices"
      rows={invoices}
      columns={columns}
      rowKey={(row) => row.id}
    />
  );
}
```

### For Chart widgets:

Same pattern — replace the mock data import with a fetch/hook:

```tsx
// Before:
import { revenueTrend } from "@/mock-data/sales";

export function SalesTrendWidget() {
  return (
    <AreaChartWidget data={revenueTrend} /* ... */ />
  );
}

// After:
export function SalesTrendWidget() {
  const { data = [] } = useQuery({ queryKey: ["sales-trend"], queryFn: fetchSalesTrend });
  return (
    <AreaChartWidget data={data} /* ... */ />
  );
}
```

> **Key insight:** You never need to touch the base widget files. Only edit the domain widget files to swap in real data.

---

## 13. Adding Your Own Widgets

### Step 1: Create the domain widget file

```tsx
// components/dashboard/widgets/sales/my-new-widget.tsx
"use client";

import { BarChartWidget } from "../base/bar-chart-widget";

// Your data (or fetch from API)
const data = [
  { period: "Q1", sales: 120000 },
  { period: "Q2", sales: 145000 },
  { period: "Q3", sales: 132000 },
  { period: "Q4", sales: 168000 },
];

export function QuarterlySalesWidget() {
  return (
    <BarChartWidget
      title="Quarterly Sales"
      description="Revenue by quarter"
      data={data}
      xKey="period"
      yKey="sales"
      barColor="hsl(217, 91%, 60%)"
    />
  );
}
```

### Step 2: Register it in `widget-registry.ts`

1. Add the import at the top:

```ts
import { QuarterlySalesWidget } from "@/components/dashboard/widgets/sales/my-new-widget";
```

2. Add the entry to the `widgetRegistry` object:

```ts
"sales-quarterly": {
  id: "sales-quarterly",
  label: "Quarterly Sales",
  description: "Revenue by quarter (bar)",
  category: "charts",
  group: "sales",        // ← which section in the widget library drawer
  defaultW: 6,           // ← default width (out of 12 columns)
  defaultH: 5,           // ← default height (row units, each row = 60px)
  minW: 4,
  minH: 4,
  maxH: 10,
  resizable: true,
  icon: "bar-chart-3",
  component: QuarterlySalesWidget,
},
```

That's it. The widget will now appear in the "Sales" section of the Add Widget drawer.

### Available `group` values:

| Group | Description |
| --- | --- |
| `"overview"` | High-level KPIs and targets |
| `"leads"` | Lead pipeline |
| `"employees"` | Team data |
| `"sales"` | Revenue, invoices, orders |
| `"accounting"` | COA, transactions, cash flow |
| `"purchases"` | Bills, POs, expenses |
| `"inventory"` | Stock, movements |
| `"crm"` | Opportunities, pipeline |
| `"reporting"` | P&L, cash flow reports |

### Adding a new group:

1. Add it to the `WidgetGroup` type union in `widget-registry.ts`:

```ts
export type WidgetGroup = "overview" | "leads" | /* ... */ | "your-new-group";
```

2. Add metadata to `widgetGroups`:

```ts
export const widgetGroups: Record<WidgetGroup, { label: string; description: string }> = {
  // ... existing ...
  "your-new-group": {
    label: "Your Group",
    description: "Description shown in the library",
  },
};
```

3. Add a color entry in `widget-library-modal.tsx`'s `groupColors` object:

```ts
const groupColors: Record<WidgetGroup, { bg: string; text: string; border: string; dot: string }> = {
  // ... existing ...
  "your-new-group": {
    bg: "bg-rose-500/10",
    text: "text-rose-500",
    border: "border-rose-500/20",
    dot: "bg-rose-500",
  },
};
```

---

## 14. Removing Widgets You Don't Need

### Step 1: Remove the import from `widget-registry.ts`

Delete the `import` line and the registry entry.

### Step 2: Delete the widget file

Delete the `.tsx` file from the domain folder (e.g. `components/dashboard/widgets/sales/some-widget.tsx`).

### Step 3: Delete unused mock data

If no other widget uses that mock data, delete it from `mock-data/`.

### Step 4: Update `buildDefaultLayout()` in `store/widget-store.ts`

If the deleted widget was in the default layout, remove it from the `buildDefaultLayout()` function.

### Removing an entire module

To remove, say, the CRM module:

1. Delete the folder: `components/dashboard/widgets/crm/`
2. Delete the mock data: `mock-data/crm.ts`
3. In `widget-registry.ts`:
   - Remove the 3 CRM imports
   - Remove the 3 CRM entries from `widgetRegistry`
   - Remove `"crm"` from the `WidgetGroup` type
   - Remove the `crm` entry from `widgetGroups`
4. In `widget-library-modal.tsx`:
   - Remove `crm` from `groupColors`

---

## 15. Folder Structure Reference

Here is the **complete** folder structure of everything you're copying:

```
your-project/
├── app/
│   └── globals.css                          ← EDIT: append grid CSS (Step 4)
│
├── components/
│   ├── theme-provider.tsx                   ← COPY if missing (Step 5)
│   ├── ui/                                  ← shadcn/ui components (Step 3)
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── chart.tsx          ← Required for all chart widgets
│   │   ├── checkbox.tsx
│   │   ├── collapsible.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── sidebar.tsx
│   │   ├── skeleton.tsx
│   │   ├── table.tsx          ← Required for all table widgets
│   │   └── tooltip.tsx
│   │
│   └── dashboard/
│       └── widgets/
│           ├── customizable-dashboard.tsx    ← COPY as-is  (core)
│           ├── widget-wrapper.tsx            ← COPY as-is  (core)
│           ├── widget-library-modal.tsx      ← COPY as-is  (core)
│           ├── widget-registry.ts            ← COPY, then EDIT (core)
│           │
│           ├── base/                         ← COPY as-is  (reusable)
│           │   ├── area-chart-widget.tsx
│           │   ├── bar-chart-widget.tsx
│           │   ├── stacked-bar-chart-widget.tsx
│           │   ├── pie-chart-widget.tsx
│           │   ├── kpi-card-widget.tsx
│           │   ├── radial-chart-widget.tsx
│           │   ├── pipeline-chart-widget.tsx
│           │   └── table-widget.tsx
│           │
│           ├── sales/                        ← COPY, then EDIT data sources
│           ├── accounting/                   ← COPY, then EDIT data sources
│           ├── purchases/                    ← COPY, then EDIT data sources
│           ├── inventory/                    ← COPY, then EDIT data sources
│           ├── crm/                          ← COPY, then EDIT data sources
│           ├── employees/                    ← COPY, then EDIT data sources
│           ├── leads/                        ← COPY, then EDIT data sources
│           ├── overview/                     ← COPY, then EDIT data sources
│           └── reporting/                    ← COPY, then EDIT data sources
│
├── hooks/
│   └── use-mobile.ts                        ← COPY if missing (Step 5)
│
├── lib/
│   └── utils.ts                             ← COPY if missing (Step 5)
│
├── mock-data/                               ← COPY as-is, then REPLACE (Step 12)
│   ├── dashboard.ts
│   ├── sales.ts
│   ├── sales-documents.ts
│   ├── accounting.ts
│   ├── purchases.ts
│   ├── inventory.ts
│   ├── crm.ts
│   └── employees.ts
│
└── store/
    ├── widget-store.ts                      ← COPY, then EDIT default layout
    └── dashboard-store.ts                   ← COPY if using leads widgets
```

### Legend:

| Action | Meaning |
| --- | --- |
| **COPY as-is** | Paste into your project. Don't change anything. |
| **COPY, then EDIT** | Paste first, then make targeted changes described in the steps above. |
| **COPY if missing** | Only copy if your project doesn't already have this file. |
| **EDIT** | Don't copy — edit your existing file. |

---

## 16. Troubleshooting

### "Module not found" errors after copying

- Make sure your `tsconfig.json` has `"@/*": ["./*"]` in `paths`.
- Make sure you installed all dependencies (Step 2).
- Make sure you ran `npx shadcn@latest add chart table badge` etc. (Step 3).

### "react-grid-layout" — items don't drag or resize

- Make sure you pasted the CSS from Step 4 into your global CSS.
- The grid **only** allows drag/resize in edit mode. Click "Edit Dashboard" first.

### Widgets don't appear in the library drawer

- Check that the widget is imported and registered in `widget-registry.ts`.
- The `group` value must match one of the keys in `widgetGroups`.

### Layout resets on refresh

- `widget-store.ts` persists to `localStorage` under key `"dashboard-widgets"`.
- If you changed `STORE_VERSION`, old data will be migrated (reset to defaults).
- Check the browser console for errors from Zustand's `persist` middleware.

### @nivo/funnel — "React 19" compatibility warning

- `@nivo/funnel` may show peer dependency warnings with React 19. It works at runtime, but you may see console warnings.
- If it causes issues, remove the funnel widgets and use stacked bar charts instead.

### Dark mode doesn't work

- Make sure `<ThemeProvider attribute="class">` wraps your app.
- The CSS variables in `globals.css` (`:root` and `.dark`) must be present.
- shadcn/ui's `init` command sets these up automatically.

### Grid items overlap on mobile

- The grid automatically stacks widgets on small screens (< 768px).
- If items still overlap, check that your container has `overflow: auto` or `overflow-y: auto`.

---

## Quick Reference: Base Widget Props

### `TableWidget`

```ts
TableWidget<Row>({
  title: string;
  description?: string;
  rows: Row[];
  columns: Array<{ key: string; header: ReactNode; cell: (row: Row) => ReactNode; className?: string }>;
  rowKey: (row: Row) => string;
})
```

### `BarChartWidget`

```ts
BarChartWidget<Row>({
  title: string;
  description?: string;
  data: Row[];
  xKey: keyof Row & string;
  yKey: keyof Row & string;
  barColor?: string;     // default: "hsl(187, 85%, 53%)"
})
```

### `StackedBarChartWidget`

```ts
StackedBarChartWidget<Row>({
  title: string;
  description?: string;
  data: Row[];
  xKey: keyof Row & string;
  series: Array<{ dataKey: string; label: string; color: string; stackId?: string }>;
  stacked?: boolean;     // default: true
})
```

### `AreaChartWidget`

```ts
AreaChartWidget<Row>({
  title: string;
  description?: string;
  data: Row[];
  xKey: keyof Row & string;
  series: Array<{ dataKey: string; label: string; color: string; stackId?: string }>;
  stacked?: boolean;     // default: false
})
```

### `PieChartWidget`

```ts
PieChartWidget({
  title: string;
  description?: string;
  data: Array<{ name: string; value: number }>;
})
```

### `KpiCardWidget`

```ts
KpiCardWidget({
  title: string;
  description?: string;
  metrics: Array<{
    label: string;
    value: string;
    change?: number;       // percent, positive = green, negative = red
    changeLabel?: string;
    icon?: ReactNode;
  }>;
})
```

### `RadialChartWidget`

```ts
RadialChartWidget({
  title: string;
  description?: string;
  metrics: Array<{
    name: string;
    value: number;
    max: number;
    color: string;         // HSL string
  }>;
})
```

### `PipelineChartWidget`

```ts
PipelineChartWidget({
  title: string;
  description?: string;
  stages: Array<{
    name: string;
    value: number;
    color: string;         // HSL string
  }>;
})
```

---

## Widget Registry Entry — All Fields

```ts
{
  id: string;              // Unique key, e.g. "sales-invoices"
  label: string;           // Shown in library, e.g. "Invoices"
  description: string;     // Subtitle in library
  category: "general" | "stats" | "charts" | "tables";
  group: WidgetGroup;      // Library section
  defaultW: number;        // Grid columns (out of 12)
  defaultH: number;        // Grid rows (each row = 60px)
  minW: number;
  minH: number;
  maxW?: number;
  maxH?: number;
  resizable: boolean;
  icon: string;            // Lucide icon name (cosmetic only)
  component: ComponentType; // The React component
}
```

---

## Summary Checklist

- [ ] Installed dependencies (`react-grid-layout`, `zustand`, `vaul`, `recharts`, etc.)
- [ ] Added shadcn/ui components (`chart`, `table`, `badge`, etc.)
- [ ] Pasted react-grid-layout CSS into `globals.css`
- [ ] Copied `lib/utils.ts`, `hooks/use-mobile.ts`, `theme-provider.tsx` (if missing)
- [ ] Copied the 4 core widget system files
- [ ] Copied `base/` folder (8 reusable chart/table components)
- [ ] Copied `mock-data/` folder
- [ ] Copied domain widget folders (sales, accounting, etc.)
- [ ] Copied `store/widget-store.ts`
- [ ] Added `<CustomizableDashboard />` to a page
- [ ] Wrapped app in `<ThemeProvider>`
- [ ] Build passes (`pnpm build`)
- [ ] Replaced mock data with real API calls
