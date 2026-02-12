export interface RevenueByMonth {
  month: string;
  revenue: number;
}

export const revenueByMonth: RevenueByMonth[] = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 51000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 59000 },
  { month: "May", revenue: 64000 },
  { month: "Jun", revenue: 61000 },
  { month: "Jul", revenue: 72000 },
  { month: "Aug", revenue: 68000 },
  { month: "Sep", revenue: 75000 },
  { month: "Oct", revenue: 81000 },
  { month: "Nov", revenue: 79000 },
  { month: "Dec", revenue: 86000 },
];

// ---------------------------------------------------------------------------
// Revenue trend (area chart – revenue + cost)
// ---------------------------------------------------------------------------

export interface RevenueTrend {
  month: string;
  revenue: number;
  cost: number;
}

export const revenueTrend: RevenueTrend[] = [
  { month: "Jan", revenue: 42000, cost: 28000 },
  { month: "Feb", revenue: 51000, cost: 31000 },
  { month: "Mar", revenue: 48000, cost: 29000 },
  { month: "Apr", revenue: 59000, cost: 35000 },
  { month: "May", revenue: 64000, cost: 38000 },
  { month: "Jun", revenue: 61000, cost: 36000 },
  { month: "Jul", revenue: 72000, cost: 42000 },
  { month: "Aug", revenue: 68000, cost: 39000 },
  { month: "Sep", revenue: 75000, cost: 44000 },
  { month: "Oct", revenue: 81000, cost: 47000 },
  { month: "Nov", revenue: 79000, cost: 46000 },
  { month: "Dec", revenue: 86000, cost: 49000 },
];

// ---------------------------------------------------------------------------
// Credit Notes
// ---------------------------------------------------------------------------

export type CreditNoteStatus = "draft" | "issued" | "applied" | "void";

export interface CreditNote {
  id: string;
  number: string;
  customer: string;
  date: string;
  status: CreditNoteStatus;
  total: number;
}

export const creditNotes: CreditNote[] = [
  { id: "cn-01", number: "CN-00101", customer: "Brightwave Co", date: "2026-01-12", status: "applied", total: 1200 },
  { id: "cn-02", number: "CN-00102", customer: "Aurora Tech", date: "2026-01-18", status: "issued", total: 3400 },
  { id: "cn-03", number: "CN-00103", customer: "PixelForge", date: "2026-01-25", status: "draft", total: 800 },
  { id: "cn-04", number: "CN-00104", customer: "NetPulse", date: "2026-02-01", status: "void", total: 560 },
  { id: "cn-05", number: "CN-00105", customer: "Zencloud", date: "2026-02-06", status: "applied", total: 2100 },
];

// ---------------------------------------------------------------------------
// Estimates
// ---------------------------------------------------------------------------

export type EstimateStatus = "draft" | "sent" | "accepted" | "declined" | "expired";

export interface Estimate {
  id: string;
  number: string;
  customer: string;
  date: string;
  expiryDate: string;
  status: EstimateStatus;
  total: number;
}

export const estimates: Estimate[] = [
  { id: "est-01", number: "EST-00201", customer: "Brightwave Co", date: "2026-01-04", expiryDate: "2026-02-04", status: "accepted", total: 14500 },
  { id: "est-02", number: "EST-00202", customer: "OrbitTech", date: "2026-01-10", expiryDate: "2026-02-10", status: "sent", total: 8200 },
  { id: "est-03", number: "EST-00203", customer: "StellarTech", date: "2026-01-15", expiryDate: "2026-02-15", status: "declined", total: 3900 },
  { id: "est-04", number: "EST-00204", customer: "PixelForge", date: "2026-01-22", expiryDate: "2026-02-22", status: "draft", total: 6700 },
  { id: "est-05", number: "EST-00205", customer: "Zencloud", date: "2026-02-01", expiryDate: "2026-03-01", status: "expired", total: 11200 },
];

// ---------------------------------------------------------------------------
// Customers
// ---------------------------------------------------------------------------

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalSpent: number;
  invoiceCount: number;
  status: "active" | "inactive";
}

export const customers: Customer[] = [
  { id: "cust-01", name: "Brightwave Co", email: "billing@brightwave.co", phone: "+1-555-0101", totalSpent: 42800, invoiceCount: 8, status: "active" },
  { id: "cust-02", name: "Zencloud", email: "ap@zencloud.io", phone: "+1-555-0102", totalSpent: 31200, invoiceCount: 6, status: "active" },
  { id: "cust-03", name: "Aurora Tech", email: "finance@auroratech.com", phone: "+1-555-0103", totalSpent: 28900, invoiceCount: 5, status: "active" },
  { id: "cust-04", name: "PixelForge", email: "hello@pixelforge.dev", phone: "+1-555-0104", totalSpent: 19400, invoiceCount: 4, status: "active" },
  { id: "cust-05", name: "NetPulse", email: "accounts@netpulse.net", phone: "+1-555-0105", totalSpent: 15700, invoiceCount: 3, status: "active" },
  { id: "cust-06", name: "OrbitTech", email: "info@orbitech.co", phone: "+1-555-0106", totalSpent: 8600, invoiceCount: 2, status: "active" },
  { id: "cust-07", name: "StellarTech", email: "pay@stellartech.io", phone: "+1-555-0107", totalSpent: 5200, invoiceCount: 1, status: "inactive" },
];

// ---------------------------------------------------------------------------
// Orders
// ---------------------------------------------------------------------------

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

export interface Order {
  id: string;
  number: string;
  customer: string;
  date: string;
  status: OrderStatus;
  items: number;
  total: number;
}

export const orders: Order[] = [
  { id: "ord-01", number: "ORD-00401", customer: "Brightwave Co", date: "2026-01-08", status: "delivered", items: 5, total: 6200 },
  { id: "ord-02", number: "ORD-00402", customer: "Aurora Tech", date: "2026-01-14", status: "shipped", items: 3, total: 9100 },
  { id: "ord-03", number: "ORD-00403", customer: "PixelForge", date: "2026-01-20", status: "confirmed", items: 8, total: 4400 },
  { id: "ord-04", number: "ORD-00404", customer: "NetPulse", date: "2026-01-28", status: "pending", items: 2, total: 2700 },
  { id: "ord-05", number: "ORD-00405", customer: "Zencloud", date: "2026-02-02", status: "cancelled", items: 4, total: 3850 },
  { id: "ord-06", number: "ORD-00406", customer: "OrbitTech", date: "2026-02-06", status: "confirmed", items: 6, total: 5100 },
];

// ---------------------------------------------------------------------------
// Invoice aging buckets
// ---------------------------------------------------------------------------

export interface InvoiceAging {
  bucket: string;
  amount: number;
}

export const invoiceAging: InvoiceAging[] = [
  { bucket: "Current", amount: 12400 },
  { bucket: "1-30 days", amount: 8700 },
  { bucket: "31-60 days", amount: 4200 },
  { bucket: "61-90 days", amount: 2900 },
  { bucket: "90+ days", amount: 1500 },
];
