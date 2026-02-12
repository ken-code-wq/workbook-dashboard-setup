import { type ComponentType } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type WidgetCategory = "general" | "stats" | "charts" | "tables";

// Domain grouping (what the user thinks about), not the visualization type.
export type WidgetGroup =
  | "overview"
  | "leads"
  | "employees"
  | "sales"
  | "accounting"
  | "purchases"
  | "inventory"
  | "crm"
  | "reporting";

export interface WidgetDefinition {
  /** Unique string identifier used in layout items */
  id: string;
  /** Human-readable label shown in the widget library */
  label: string;
  /** Short description for the library modal */
  description: string;
  /** Category for grouping in the library */
  category: WidgetCategory;
  /** Domain group used for the widget library sections */
  group: WidgetGroup;
  /** Default grid width  (out of 12 columns) */
  defaultW: number;
  /** Default grid height (row units) */
  defaultH: number;
  /** Minimum grid width */
  minW: number;
  /** Minimum grid height */
  minH: number;
  /** Maximum grid width */
  maxW?: number;
  /** Maximum grid height */
  maxH?: number;
  /** Whether this widget can be resized in edit mode */
  resizable: boolean;
  /** Lucide icon name (used to render preview in modal) */
  icon: string;
  /**
   * The rendered component.
   */
  component: ComponentType;
}

// ---------------------------------------------------------------------------
// Category metadata (for grouping in the library UI)
// ---------------------------------------------------------------------------

export const widgetCategories: Record<
  WidgetCategory,
  { label: string; description: string }
> = {
  general: {
    label: "General",
    description: "Overview & welcome widgets",
  },
  stats: {
    label: "Statistics",
    description: "Key metrics at a glance",
  },
  charts: {
    label: "Charts",
    description: "Visual data representations",
  },
  tables: {
    label: "Tables",
    description: "Detailed data views",
  },
};

export const widgetGroups: Record<WidgetGroup, { label: string; description: string }> = {
  overview: {
    label: "Overview",
    description: "High-level snapshots",
  },
  leads: {
    label: "Leads",
    description: "Pipeline and lead performance",
  },
  employees: {
    label: "Employees",
    description: "Team and people data",
  },
  sales: {
    label: "Sales",
    description: "Revenue and sales performance",
  },
  accounting: {
    label: "Accounting",
    description: "COA and balances",
  },
  purchases: {
    label: "Purchases",
    description: "Bills and purchase orders",
  },
  inventory: {
    label: "Inventory",
    description: "Stock and movements",
  },
  crm: {
    label: "CRM",
    description: "Opportunities and pipeline",
  },
  reporting: {
    label: "Reporting",
    description: "Financial reports and summaries",
  },
};

// ---------------------------------------------------------------------------
// Lazy component imports – these map directly to your EXISTING components.
// We use dynamic imports so unused widgets aren't in the initial JS bundle.
// ---------------------------------------------------------------------------
import { StatsCards } from "@/components/dashboard/stats-cards";
import { LeadsChart } from "@/components/dashboard/leads-chart";
import { TopPerformers } from "@/components/dashboard/top-performers";
import { LeadsTable } from "@/components/dashboard/leads-table";
import { EmployeesTableWidget } from "@/components/dashboard/widgets/employees/employees-table-widget";
import { HeadcountByDepartmentWidget } from "@/components/dashboard/widgets/employees/headcount-by-department-widget";
import { RevenueByMonthWidget } from "@/components/dashboard/widgets/sales/revenue-by-month-widget";
import { ChartOfAccountsWidget } from "@/components/dashboard/widgets/accounting/chart-of-accounts-widget";
import { BalancesByTypeWidget } from "@/components/dashboard/widgets/accounting/balances-by-type-widget";
import { InvoicesWidget } from "@/components/dashboard/widgets/sales/invoices-widget";
import { PaymentsByMethodWidget } from "@/components/dashboard/widgets/sales/payments-by-method-widget";
import { BillsWidget } from "@/components/dashboard/widgets/purchases/bills-widget";
import { PurchaseOrdersWidget } from "@/components/dashboard/widgets/purchases/purchase-orders-widget";
import { StockLevelsWidget } from "@/components/dashboard/widgets/inventory/stock-levels-widget";
import { StockMovementsWidget } from "@/components/dashboard/widgets/inventory/stock-movements-widget";
import { LeadsPipelineWidget } from "@/components/dashboard/widgets/leads/leads-pipeline-widget";

// Sales – new
import { SalesTrendWidget } from "@/components/dashboard/widgets/sales/sales-trend-widget";
import { CreditNotesWidget } from "@/components/dashboard/widgets/sales/credit-notes-widget";
import { EstimatesWidget } from "@/components/dashboard/widgets/sales/estimates-widget";
import { CustomersWidget } from "@/components/dashboard/widgets/sales/customers-widget";
import { OrdersWidget } from "@/components/dashboard/widgets/sales/orders-widget";
import { InvoiceAgingWidget } from "@/components/dashboard/widgets/sales/invoice-aging-widget";

// Accounting – new
import { TransactionsWidget } from "@/components/dashboard/widgets/accounting/transactions-widget";
import { CashFlowWidget } from "@/components/dashboard/widgets/accounting/cash-flow-widget";
import { FixedAssetsWidget } from "@/components/dashboard/widgets/accounting/fixed-assets-widget";
import { RevenueVsExpensesWidget } from "@/components/dashboard/widgets/accounting/revenue-vs-expenses-widget";

// Purchases – new
import { ExpensesWidget } from "@/components/dashboard/widgets/purchases/expenses-widget";
import { SuppliersWidget } from "@/components/dashboard/widgets/purchases/suppliers-widget";
import { MonthlySpendWidget } from "@/components/dashboard/widgets/purchases/monthly-spend-widget";

// CRM
import { OpportunitiesWidget } from "@/components/dashboard/widgets/crm/opportunities-widget";
import { OpportunitiesPipelineWidget } from "@/components/dashboard/widgets/crm/opportunities-pipeline-widget";
import { WinRateWidget } from "@/components/dashboard/widgets/crm/win-rate-widget";

// Inventory – new
import { StockValueTrendWidget } from "@/components/dashboard/widgets/inventory/stock-value-trend-widget";
import { AdjustmentsWidget } from "@/components/dashboard/widgets/inventory/adjustments-widget";
import { TransfersWidget } from "@/components/dashboard/widgets/inventory/transfers-widget";

// Overview – new
import { OverviewKpiWidget } from "@/components/dashboard/widgets/overview/overview-kpi-widget";
import { TargetsWidget } from "@/components/dashboard/widgets/overview/targets-widget";

// Reporting
import { CashFlowSummaryWidget } from "@/components/dashboard/widgets/reporting/cash-flow-summary-widget";
import { ProfitLossWidget } from "@/components/dashboard/widgets/reporting/profit-loss-widget";

// ---------------------------------------------------------------------------
// Registry – the single source of truth for every available widget
// ---------------------------------------------------------------------------

export const widgetRegistry: Record<string, WidgetDefinition> = {
  "stats-cards": {
    id: "stats-cards",
    label: "Stats Overview",
    description: "Revenue, clients, leads & team metrics",
    category: "stats",
    group: "overview",
    defaultW: 12,
    defaultH: 2,
    minW: 6,
    minH: 2,
    maxH: 2,
    resizable: false,
    icon: "bar-chart-3",
    component: StatsCards,
  },

  "leads-chart": {
    id: "leads-chart",
    label: "Leads Chart",
    description: "Line / area chart showing leads gathered over time",
    category: "charts",
    group: "leads",
    defaultW: 8,
    defaultH: 5,
    minW: 4,
    minH: 3,
    maxH: 10,
    resizable: true,
    icon: "trending-up",
    component: LeadsChart,
  },

  "top-performers": {
    id: "top-performers",
    label: "Top Performers",
    description: "Ranked list of team members by performance score",
    category: "charts",
    group: "employees",
    defaultW: 4,
    defaultH: 5,
    minW: 3,
    minH: 3,
    maxH: 10,
    resizable: true,
    icon: "trophy",
    component: TopPerformers,
  },

  "leads-pipeline": {
    id: "leads-pipeline",
    label: "Sales Pipeline",
    description: "Funnel chart showing lead conversion stages",
    category: "charts",
    group: "leads",
    defaultW: 6,
    defaultH: 5,
    minW: 4,
    minH: 4,
    maxH: 10,
    resizable: true,
    icon: "funnel",
    component: LeadsPipelineWidget,
  },

  "leads-table": {
    id: "leads-table",
    label: "Lead Management",
    description: "Searchable, sortable table of all leads",
    category: "tables",
    group: "leads",
    defaultW: 12,
    defaultH: 8,
    minW: 6,
    minH: 4,
    maxH: 16,
    resizable: true,
    icon: "table",
    component: LeadsTable,
  },

  "employees-table": {
    id: "employees-table",
    label: "Employees",
    description: "Employee directory (table)",
    category: "tables",
    group: "employees",
    defaultW: 12,
    defaultH: 7,
    minW: 6,
    minH: 4,
    maxH: 16,
    resizable: true,
    icon: "table",
    component: EmployeesTableWidget,
  },

  "employees-headcount": {
    id: "employees-headcount",
    label: "Headcount",
    description: "Headcount by department (pie)",
    category: "charts",
    group: "employees",
    defaultW: 4,
    defaultH: 5,
    minW: 3,
    minH: 4,
    maxH: 10,
    resizable: true,
    icon: "pie-chart",
    component: HeadcountByDepartmentWidget,
  },

  "sales-revenue-month": {
    id: "sales-revenue-month",
    label: "Revenue",
    description: "Revenue by month (bar)",
    category: "charts",
    group: "sales",
    defaultW: 8,
    defaultH: 5,
    minW: 4,
    minH: 4,
    maxH: 10,
    resizable: true,
    icon: "bar-chart-3",
    component: RevenueByMonthWidget,
  },

  "accounting-coa": {
    id: "accounting-coa",
    label: "Chart of Accounts",
    description: "Accounts list (table)",
    category: "tables",
    group: "accounting",
    defaultW: 12,
    defaultH: 7,
    minW: 6,
    minH: 4,
    maxH: 16,
    resizable: true,
    icon: "table",
    component: ChartOfAccountsWidget,
  },

  "accounting-balances-type": {
    id: "accounting-balances-type",
    label: "Balances",
    description: "Balances by account type (pie)",
    category: "charts",
    group: "accounting",
    defaultW: 4,
    defaultH: 5,
    minW: 3,
    minH: 4,
    maxH: 10,
    resizable: true,
    icon: "pie-chart",
    component: BalancesByTypeWidget,
  },

  "sales-invoices": {
    id: "sales-invoices",
    label: "Invoices",
    description: "Recent invoices (table)",
    category: "tables",
    group: "sales",
    defaultW: 8,
    defaultH: 6,
    minW: 6,
    minH: 4,
    maxH: 16,
    resizable: true,
    icon: "table",
    component: InvoicesWidget,
  },

  "sales-payments-method": {
    id: "sales-payments-method",
    label: "Payments",
    description: "Payments by method (pie)",
    category: "charts",
    group: "sales",
    defaultW: 4,
    defaultH: 5,
    minW: 3,
    minH: 4,
    maxH: 10,
    resizable: true,
    icon: "pie-chart",
    component: PaymentsByMethodWidget,
  },

  "purchases-bills": {
    id: "purchases-bills",
    label: "Bills",
    description: "Vendor bills (table)",
    category: "tables",
    group: "purchases",
    defaultW: 8,
    defaultH: 6,
    minW: 6,
    minH: 4,
    maxH: 16,
    resizable: true,
    icon: "table",
    component: BillsWidget,
  },

  "purchases-pos": {
    id: "purchases-pos",
    label: "Purchase Orders",
    description: "Open and recent POs (table)",
    category: "tables",
    group: "purchases",
    defaultW: 12,
    defaultH: 6,
    minW: 6,
    minH: 4,
    maxH: 16,
    resizable: true,
    icon: "table",
    component: PurchaseOrdersWidget,
  },

  "inventory-stock": {
    id: "inventory-stock",
    label: "Stock Levels",
    description: "Items and availability (table)",
    category: "tables",
    group: "inventory",
    defaultW: 8,
    defaultH: 6,
    minW: 6,
    minH: 4,
    maxH: 16,
    resizable: true,
    icon: "table",
    component: StockLevelsWidget,
  },

  "inventory-movements": {
    id: "inventory-movements",
    label: "Movements",
    description: "Movement volume by type (bar)",
    category: "charts",
    group: "inventory",
    defaultW: 4,
    defaultH: 5,
    minW: 3,
    minH: 4,
    maxH: 10,
    resizable: true,
    icon: "bar-chart-3",
    component: StockMovementsWidget,
  },

  // ─── Overview (new) ──────────────────────────────────────────

  "overview-kpi": {
    id: "overview-kpi",
    label: "Key Metrics",
    description: "Revenue, orders, customers & outstanding",
    category: "stats",
    group: "overview",
    defaultW: 12,
    defaultH: 3,
    minW: 8,
    minH: 3,
    maxH: 4,
    resizable: true,
    icon: "gauge",
    component: OverviewKpiWidget,
  },

  "overview-targets": {
    id: "overview-targets",
    label: "Monthly Targets",
    description: "Progress towards monthly goals (radial)",
    category: "charts",
    group: "overview",
    defaultW: 4,
    defaultH: 5,
    minW: 3,
    minH: 4,
    maxH: 8,
    resizable: true,
    icon: "target",
    component: TargetsWidget,
  },

  // ─── Sales (new) ─────────────────────────────────────────────

  "sales-trend": {
    id: "sales-trend",
    label: "Sales Trend",
    description: "Revenue vs cost over time (area)",
    category: "charts",
    group: "sales",
    defaultW: 8,
    defaultH: 5,
    minW: 4,
    minH: 4,
    maxH: 10,
    resizable: true,
    icon: "area-chart",
    component: SalesTrendWidget,
  },

  "sales-credit-notes": {
    id: "sales-credit-notes",
    label: "Credit Notes",
    description: "Issued credit notes (table)",
    category: "tables",
    group: "sales",
    defaultW: 8,
    defaultH: 6,
    minW: 6,
    minH: 4,
    maxH: 16,
    resizable: true,
    icon: "table",
    component: CreditNotesWidget,
  },

  "sales-estimates": {
    id: "sales-estimates",
    label: "Estimates",
    description: "Quotes and proposals (table)",
    category: "tables",
    group: "sales",
    defaultW: 8,
    defaultH: 6,
    minW: 6,
    minH: 4,
    maxH: 16,
    resizable: true,
    icon: "table",
    component: EstimatesWidget,
  },

  "sales-customers": {
    id: "sales-customers",
    label: "Customers",
    description: "Customer directory (table)",
    category: "tables",
    group: "sales",
    defaultW: 8,
    defaultH: 6,
    minW: 6,
    minH: 4,
    maxH: 16,
    resizable: true,
    icon: "table",
    component: CustomersWidget,
  },

  "sales-orders": {
    id: "sales-orders",
    label: "Orders",
    description: "Customer orders (table)",
    category: "tables",
    group: "sales",
    defaultW: 8,
    defaultH: 6,
    minW: 6,
    minH: 4,
    maxH: 16,
    resizable: true,
    icon: "table",
    component: OrdersWidget,
  },

  "sales-invoice-aging": {
    id: "sales-invoice-aging",
    label: "Invoice Aging",
    description: "Outstanding receivables by period (bar)",
    category: "charts",
    group: "sales",
    defaultW: 4,
    defaultH: 5,
    minW: 3,
    minH: 4,
    maxH: 10,
    resizable: true,
    icon: "bar-chart-3",
    component: InvoiceAgingWidget,
  },

  // ─── Accounting (new) ────────────────────────────────────────

  "accounting-transactions": {
    id: "accounting-transactions",
    label: "Transactions",
    description: "General ledger entries (table)",
    category: "tables",
    group: "accounting",
    defaultW: 12,
    defaultH: 7,
    minW: 6,
    minH: 4,
    maxH: 16,
    resizable: true,
    icon: "table",
    component: TransactionsWidget,
  },

  "accounting-cash-flow": {
    id: "accounting-cash-flow",
    label: "Cash Flow",
    description: "Monthly inflow vs outflow (area)",
    category: "charts",
    group: "accounting",
    defaultW: 8,
    defaultH: 5,
    minW: 4,
    minH: 4,
    maxH: 10,
    resizable: true,
    icon: "area-chart",
    component: CashFlowWidget,
  },

  "accounting-fixed-assets": {
    id: "accounting-fixed-assets",
    label: "Fixed Assets",
    description: "Asset register (table)",
    category: "tables",
    group: "accounting",
    defaultW: 8,
    defaultH: 6,
    minW: 6,
    minH: 4,
    maxH: 16,
    resizable: true,
    icon: "table",
    component: FixedAssetsWidget,
  },

  "accounting-rev-vs-exp": {
    id: "accounting-rev-vs-exp",
    label: "Revenue vs Expenses",
    description: "Revenue, COGS and OPEX comparison (bar)",
    category: "charts",
    group: "accounting",
    defaultW: 8,
    defaultH: 5,
    minW: 4,
    minH: 4,
    maxH: 10,
    resizable: true,
    icon: "bar-chart-3",
    component: RevenueVsExpensesWidget,
  },

  // ─── Purchases (new) ─────────────────────────────────────────

  "purchases-expenses": {
    id: "purchases-expenses",
    label: "Expenses",
    description: "Employee expense claims (table)",
    category: "tables",
    group: "purchases",
    defaultW: 8,
    defaultH: 6,
    minW: 6,
    minH: 4,
    maxH: 16,
    resizable: true,
    icon: "table",
    component: ExpensesWidget,
  },

  "purchases-suppliers": {
    id: "purchases-suppliers",
    label: "Suppliers",
    description: "Vendor directory (table)",
    category: "tables",
    group: "purchases",
    defaultW: 8,
    defaultH: 6,
    minW: 6,
    minH: 4,
    maxH: 16,
    resizable: true,
    icon: "table",
    component: SuppliersWidget,
  },

  "purchases-monthly-spend": {
    id: "purchases-monthly-spend",
    label: "Monthly Spend",
    description: "Bills and expenses over time (area)",
    category: "charts",
    group: "purchases",
    defaultW: 8,
    defaultH: 5,
    minW: 4,
    minH: 4,
    maxH: 10,
    resizable: true,
    icon: "area-chart",
    component: MonthlySpendWidget,
  },

  // ─── CRM ─────────────────────────────────────────────────────

  "crm-opportunities": {
    id: "crm-opportunities",
    label: "Opportunities",
    description: "Sales pipeline deals (table)",
    category: "tables",
    group: "crm",
    defaultW: 12,
    defaultH: 7,
    minW: 6,
    minH: 4,
    maxH: 16,
    resizable: true,
    icon: "table",
    component: OpportunitiesWidget,
  },

  "crm-pipeline": {
    id: "crm-pipeline",
    label: "Opportunity Pipeline",
    description: "Deal values by stage (funnel)",
    category: "charts",
    group: "crm",
    defaultW: 6,
    defaultH: 5,
    minW: 4,
    minH: 4,
    maxH: 10,
    resizable: true,
    icon: "funnel",
    component: OpportunitiesPipelineWidget,
  },

  "crm-win-rate": {
    id: "crm-win-rate",
    label: "Win Rate",
    description: "Monthly deal close rate (area)",
    category: "charts",
    group: "crm",
    defaultW: 6,
    defaultH: 5,
    minW: 4,
    minH: 4,
    maxH: 10,
    resizable: true,
    icon: "area-chart",
    component: WinRateWidget,
  },

  // ─── Inventory (new) ─────────────────────────────────────────

  "inventory-stock-value": {
    id: "inventory-stock-value",
    label: "Stock Value Trend",
    description: "Retail value vs cost basis (area)",
    category: "charts",
    group: "inventory",
    defaultW: 8,
    defaultH: 5,
    minW: 4,
    minH: 4,
    maxH: 10,
    resizable: true,
    icon: "area-chart",
    component: StockValueTrendWidget,
  },

  "inventory-adjustments": {
    id: "inventory-adjustments",
    label: "Adjustments",
    description: "Inventory corrections (table)",
    category: "tables",
    group: "inventory",
    defaultW: 8,
    defaultH: 6,
    minW: 6,
    minH: 4,
    maxH: 16,
    resizable: true,
    icon: "table",
    component: AdjustmentsWidget,
  },

  "inventory-transfers": {
    id: "inventory-transfers",
    label: "Transfers",
    description: "Inter-location movements (table)",
    category: "tables",
    group: "inventory",
    defaultW: 8,
    defaultH: 6,
    minW: 6,
    minH: 4,
    maxH: 16,
    resizable: true,
    icon: "table",
    component: TransfersWidget,
  },

  // ─── Reporting ───────────────────────────────────────────────

  "reporting-pnl": {
    id: "reporting-pnl",
    label: "Profit & Loss",
    description: "Revenue vs expenses breakdown (bar)",
    category: "charts",
    group: "reporting",
    defaultW: 8,
    defaultH: 5,
    minW: 4,
    minH: 4,
    maxH: 10,
    resizable: true,
    icon: "bar-chart-3",
    component: ProfitLossWidget,
  },

  "reporting-cash-flow": {
    id: "reporting-cash-flow",
    label: "Cash Flow Report",
    description: "12-month cash flow summary (area)",
    category: "charts",
    group: "reporting",
    defaultW: 8,
    defaultH: 5,
    minW: 4,
    minH: 4,
    maxH: 10,
    resizable: true,
    icon: "area-chart",
    component: CashFlowSummaryWidget,
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** All widget IDs */
export const allWidgetIds = Object.keys(widgetRegistry);

/** Get widgets filtered by category */
export function getWidgetsByCategory(category: WidgetCategory) {
  return Object.values(widgetRegistry).filter(
    (w) => w.category === category
  );
}

/** Get a single definition or undefined */
export function getWidgetDef(id: string): WidgetDefinition | undefined {
  return widgetRegistry[id];
}
