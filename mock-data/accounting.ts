export type AccountType =
  | "asset"
  | "liability"
  | "equity"
  | "income"
  | "expense";

export type AccountStatus = "active" | "archived";

export interface ChartOfAccount {
  id: string;
  code: string;
  name: string;
  type: AccountType;
  status: AccountStatus;
  balance: number;
}

export const chartOfAccounts: ChartOfAccount[] = [
  { id: "acc-1000", code: "1000", name: "Cash at Bank", type: "asset", status: "active", balance: 128_420 },
  { id: "acc-1100", code: "1100", name: "Accounts Receivable", type: "asset", status: "active", balance: 42_800 },
  { id: "acc-2000", code: "2000", name: "Accounts Payable", type: "liability", status: "active", balance: -31_260 },
  { id: "acc-2100", code: "2100", name: "Sales Tax Payable", type: "liability", status: "active", balance: -8_940 },
  { id: "acc-3000", code: "3000", name: "Owner's Equity", type: "equity", status: "active", balance: -95_000 },
  { id: "acc-4000", code: "4000", name: "Sales", type: "income", status: "active", balance: -212_740 },
  { id: "acc-5000", code: "5000", name: "Cost of Goods Sold", type: "expense", status: "active", balance: 124_110 },
  { id: "acc-6100", code: "6100", name: "Rent", type: "expense", status: "active", balance: 28_800 },
  { id: "acc-6200", code: "6200", name: "Software Subscriptions", type: "expense", status: "active", balance: 12_300 },
  { id: "acc-9999", code: "9999", name: "Legacy Clearing", type: "asset", status: "archived", balance: 0 },
];

export function getBalanceByAccountType() {
  const sums = new Map<AccountType, number>();

  for (const account of chartOfAccounts) {
    if (account.status !== "active") continue;
    sums.set(account.type, (sums.get(account.type) ?? 0) + account.balance);
  }

  return (Array.from(sums.entries()) as Array<[AccountType, number]>).map(
    ([type, value]) => ({ type, value: Math.abs(Math.round(value)) })
  );
}

// ---------------------------------------------------------------------------
// Transactions
// ---------------------------------------------------------------------------

export type TransactionType = "invoice" | "payment" | "bill" | "expense" | "journal" | "transfer";

export interface Transaction {
  id: string;
  date: string;
  reference: string;
  description: string;
  type: TransactionType;
  debit: number;
  credit: number;
  account: string;
}

export const transactions: Transaction[] = [
  { id: "txn-001", date: "2026-01-05", reference: "INV-00021", description: "Invoice to Brightwave Co", type: "invoice", debit: 6200, credit: 0, account: "Accounts Receivable" },
  { id: "txn-002", date: "2026-01-06", reference: "PAY-101", description: "Payment from Brightwave Co", type: "payment", debit: 0, credit: 6200, account: "Cash at Bank" },
  { id: "txn-003", date: "2026-01-07", reference: "BILL-00301", description: "Cloud Hosting Ltd bill", type: "bill", debit: 0, credit: 1290, account: "Accounts Payable" },
  { id: "txn-004", date: "2026-01-10", reference: "EXP-001", description: "Office supplies", type: "expense", debit: 320, credit: 0, account: "Office Expenses" },
  { id: "txn-005", date: "2026-01-14", reference: "INV-00023", description: "Invoice to Aurora Tech", type: "invoice", debit: 9100, credit: 0, account: "Accounts Receivable" },
  { id: "txn-006", date: "2026-01-18", reference: "JRN-050", description: "Monthly depreciation", type: "journal", debit: 1800, credit: 0, account: "Depreciation Expense" },
  { id: "txn-007", date: "2026-01-22", reference: "PAY-102", description: "Payment from PixelForge", type: "payment", debit: 0, credit: 4400, account: "Cash at Bank" },
  { id: "txn-008", date: "2026-01-28", reference: "TRF-010", description: "Transfer to savings", type: "transfer", debit: 0, credit: 15000, account: "Cash at Bank" },
  { id: "txn-009", date: "2026-02-01", reference: "INV-00026", description: "Invoice to OrbitTech", type: "invoice", debit: 5100, credit: 0, account: "Accounts Receivable" },
  { id: "txn-010", date: "2026-02-05", reference: "EXP-002", description: "Software subscription", type: "expense", debit: 890, credit: 0, account: "Software Subscriptions" },
];

// ---------------------------------------------------------------------------
// Cash Flow (area chart – inflow vs outflow per month)
// ---------------------------------------------------------------------------

export interface CashFlowMonth {
  month: string;
  inflow: number;
  outflow: number;
}

export const cashFlowMonthly: CashFlowMonth[] = [
  { month: "Jan", inflow: 48000, outflow: 32000 },
  { month: "Feb", inflow: 55000, outflow: 38000 },
  { month: "Mar", inflow: 50000, outflow: 34000 },
  { month: "Apr", inflow: 63000, outflow: 41000 },
  { month: "May", inflow: 68000, outflow: 44000 },
  { month: "Jun", inflow: 64000, outflow: 42000 },
  { month: "Jul", inflow: 76000, outflow: 48000 },
  { month: "Aug", inflow: 71000, outflow: 45000 },
  { month: "Sep", inflow: 79000, outflow: 50000 },
  { month: "Oct", inflow: 85000, outflow: 53000 },
  { month: "Nov", inflow: 82000, outflow: 52000 },
  { month: "Dec", inflow: 90000, outflow: 56000 },
];

// ---------------------------------------------------------------------------
// Fixed Assets
// ---------------------------------------------------------------------------

export type AssetStatus = "in-use" | "disposed" | "fully-depreciated";

export interface FixedAsset {
  id: string;
  name: string;
  category: string;
  purchaseDate: string;
  cost: number;
  bookValue: number;
  status: AssetStatus;
}

export const fixedAssets: FixedAsset[] = [
  { id: "fa-01", name: "Office Laptops (x10)", category: "IT Equipment", purchaseDate: "2024-03-15", cost: 18000, bookValue: 10800, status: "in-use" },
  { id: "fa-02", name: "Server Rack", category: "IT Equipment", purchaseDate: "2023-08-20", cost: 12000, bookValue: 5400, status: "in-use" },
  { id: "fa-03", name: "Office Furniture", category: "Furniture", purchaseDate: "2024-01-10", cost: 8500, bookValue: 6800, status: "in-use" },
  { id: "fa-04", name: "Company Vehicle", category: "Vehicles", purchaseDate: "2023-06-01", cost: 35000, bookValue: 22000, status: "in-use" },
  { id: "fa-05", name: "Old Printer", category: "Office Equipment", purchaseDate: "2020-11-05", cost: 2400, bookValue: 0, status: "fully-depreciated" },
  { id: "fa-06", name: "Standing Desks (x5)", category: "Furniture", purchaseDate: "2025-02-14", cost: 4500, bookValue: 4050, status: "in-use" },
];

// ---------------------------------------------------------------------------
// Revenue vs Expenses (stacked bar – monthly comparison)
// ---------------------------------------------------------------------------

export interface RevenueVsExpense {
  month: string;
  revenue: number;
  cogs: number;
  opex: number;
}

export const revenueVsExpenses: RevenueVsExpense[] = [
  { month: "Jan", revenue: 42000, cogs: 18000, opex: 10000 },
  { month: "Feb", revenue: 51000, cogs: 21000, opex: 10000 },
  { month: "Mar", revenue: 48000, cogs: 19000, opex: 10000 },
  { month: "Apr", revenue: 59000, cogs: 24000, opex: 11000 },
  { month: "May", revenue: 64000, cogs: 26000, opex: 12000 },
  { month: "Jun", revenue: 61000, cogs: 25000, opex: 11000 },
  { month: "Jul", revenue: 72000, cogs: 29000, opex: 13000 },
  { month: "Aug", revenue: 68000, cogs: 27000, opex: 12000 },
  { month: "Sep", revenue: 75000, cogs: 31000, opex: 13000 },
  { month: "Oct", revenue: 81000, cogs: 33000, opex: 14000 },
  { month: "Nov", revenue: 79000, cogs: 32000, opex: 14000 },
  { month: "Dec", revenue: 86000, cogs: 35000, opex: 14000 },
];
