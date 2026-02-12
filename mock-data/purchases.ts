export type BillStatus = "draft" | "approved" | "paid" | "overdue";

export interface Bill {
  id: string;
  number: string;
  vendor: string;
  issueDate: string;
  dueDate: string;
  status: BillStatus;
  total: number;
}

export type PurchaseOrderStatus = "open" | "sent" | "received" | "cancelled";

export interface PurchaseOrder {
  id: string;
  number: string;
  vendor: string;
  date: string;
  status: PurchaseOrderStatus;
  total: number;
}

export const bills: Bill[] = [
  { id: "bill-301", number: "BILL-00301", vendor: "Cloud Hosting Ltd", issueDate: "2026-01-07", dueDate: "2026-01-21", status: "paid", total: 1290 },
  { id: "bill-302", number: "BILL-00302", vendor: "Workspace Supplies", issueDate: "2026-01-12", dueDate: "2026-01-26", status: "approved", total: 420 },
  { id: "bill-303", number: "BILL-00303", vendor: "Logistics Partner", issueDate: "2026-01-18", dueDate: "2026-02-01", status: "overdue", total: 870 },
  { id: "bill-304", number: "BILL-00304", vendor: "Software Tools Inc", issueDate: "2026-02-01", dueDate: "2026-02-15", status: "draft", total: 310 },
];

export const purchaseOrders: PurchaseOrder[] = [
  { id: "po-901", number: "PO-00901", vendor: "Electro Wholesale", date: "2026-01-09", status: "received", total: 4820 },
  { id: "po-902", number: "PO-00902", vendor: "Packaging Co", date: "2026-01-16", status: "sent", total: 980 },
  { id: "po-903", number: "PO-00903", vendor: "Electro Wholesale", date: "2026-01-28", status: "open", total: 2650 },
  { id: "po-904", number: "PO-00904", vendor: "Raw Materials Ltd", date: "2026-02-03", status: "cancelled", total: 1190 },
];

// ---------------------------------------------------------------------------
// Expenses
// ---------------------------------------------------------------------------

export type ExpenseStatus = "pending" | "approved" | "reimbursed" | "rejected";

export interface Expense {
  id: string;
  date: string;
  description: string;
  category: string;
  submittedBy: string;
  status: ExpenseStatus;
  amount: number;
}

export const expenses: Expense[] = [
  { id: "exp-01", date: "2026-01-05", description: "Client dinner", category: "Entertainment", submittedBy: "Sophia Martinez", status: "reimbursed", amount: 280 },
  { id: "exp-02", date: "2026-01-10", description: "Office supplies", category: "Office", submittedBy: "Isabella Rossi", status: "approved", amount: 320 },
  { id: "exp-03", date: "2026-01-14", description: "Flight – client visit", category: "Travel", submittedBy: "Noah Patel", status: "reimbursed", amount: 890 },
  { id: "exp-04", date: "2026-01-20", description: "Software license", category: "Software", submittedBy: "Ethan Kim", status: "approved", amount: 450 },
  { id: "exp-05", date: "2026-01-28", description: "Taxi receipts", category: "Travel", submittedBy: "Sophia Martinez", status: "pending", amount: 124 },
  { id: "exp-06", date: "2026-02-03", description: "Team lunch", category: "Entertainment", submittedBy: "Ava Chen", status: "pending", amount: 210 },
  { id: "exp-07", date: "2026-02-06", description: "Phone bill", category: "Utilities", submittedBy: "James Brown", status: "rejected", amount: 95 },
];

// ---------------------------------------------------------------------------
// Suppliers
// ---------------------------------------------------------------------------

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalPurchased: number;
  billCount: number;
  status: "active" | "inactive";
}

export const suppliers: Supplier[] = [
  { id: "sup-01", name: "Cloud Hosting Ltd", email: "billing@cloudhosting.com", phone: "+44-20-7946-000", totalPurchased: 15480, billCount: 12, status: "active" },
  { id: "sup-02", name: "Electro Wholesale", email: "sales@electrowhole.co", phone: "+1-555-0201", totalPurchased: 38200, billCount: 8, status: "active" },
  { id: "sup-03", name: "Workspace Supplies", email: "orders@workspace.co", phone: "+1-555-0202", totalPurchased: 6400, billCount: 5, status: "active" },
  { id: "sup-04", name: "Logistics Partner", email: "dispatch@logpartner.com", phone: "+1-555-0203", totalPurchased: 12800, billCount: 7, status: "active" },
  { id: "sup-05", name: "Raw Materials Ltd", email: "info@rawmats.co", phone: "+1-555-0204", totalPurchased: 9100, billCount: 4, status: "active" },
  { id: "sup-06", name: "Packaging Co", email: "hello@packco.com", phone: "+1-555-0205", totalPurchased: 3200, billCount: 3, status: "inactive" },
];

// ---------------------------------------------------------------------------
// Monthly Spend (area chart)
// ---------------------------------------------------------------------------

export interface MonthlySpend {
  month: string;
  bills: number;
  expenses: number;
}

export const monthlySpend: MonthlySpend[] = [
  { month: "Jan", bills: 12400, expenses: 3200 },
  { month: "Feb", bills: 14800, expenses: 2800 },
  { month: "Mar", bills: 11900, expenses: 3500 },
  { month: "Apr", bills: 16200, expenses: 4100 },
  { month: "May", bills: 18500, expenses: 3900 },
  { month: "Jun", bills: 15700, expenses: 3600 },
  { month: "Jul", bills: 19800, expenses: 4500 },
  { month: "Aug", bills: 17200, expenses: 4000 },
  { month: "Sep", bills: 20100, expenses: 4800 },
  { month: "Oct", bills: 22400, expenses: 5200 },
  { month: "Nov", bills: 21800, expenses: 4900 },
  { month: "Dec", bills: 24100, expenses: 5600 },
];
