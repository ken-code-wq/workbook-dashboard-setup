export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "void";

export interface Invoice {
  id: string;
  number: string;
  customer: string;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  total: number;
}

export type PaymentMethod = "card" | "bank" | "cash" | "paypal";

export interface Payment {
  id: string;
  date: string;
  customer: string;
  method: PaymentMethod;
  amount: number;
}

export const invoices: Invoice[] = [
  {
    id: "inv-00021",
    number: "INV-00021",
    customer: "Brightwave Co",
    issueDate: "2026-01-05",
    dueDate: "2026-01-19",
    status: "paid",
    total: 6200,
  },
  {
    id: "inv-00022",
    number: "INV-00022",
    customer: "Zencloud",
    issueDate: "2026-01-10",
    dueDate: "2026-01-24",
    status: "sent",
    total: 3850,
  },
  {
    id: "inv-00023",
    number: "INV-00023",
    customer: "Aurora Tech",
    issueDate: "2026-01-14",
    dueDate: "2026-01-28",
    status: "overdue",
    total: 9100,
  },
  {
    id: "inv-00024",
    number: "INV-00024",
    customer: "PixelForge",
    issueDate: "2026-01-20",
    dueDate: "2026-02-03",
    status: "paid",
    total: 4400,
  },
  {
    id: "inv-00025",
    number: "INV-00025",
    customer: "NetPulse",
    issueDate: "2026-01-25",
    dueDate: "2026-02-08",
    status: "sent",
    total: 2700,
  },
  {
    id: "inv-00026",
    number: "INV-00026",
    customer: "OrbitTech",
    issueDate: "2026-02-01",
    dueDate: "2026-02-15",
    status: "draft",
    total: 5100,
  },
];

export const payments: Payment[] = [
  {
    id: "pay-101",
    date: "2026-01-06",
    customer: "Brightwave Co",
    method: "bank",
    amount: 6200,
  },
  {
    id: "pay-102",
    date: "2026-01-22",
    customer: "PixelForge",
    method: "card",
    amount: 4400,
  },
  {
    id: "pay-103",
    date: "2026-02-02",
    customer: "NetPulse",
    method: "paypal",
    amount: 2700,
  },
  {
    id: "pay-104",
    date: "2026-02-05",
    customer: "StellarTech",
    method: "card",
    amount: 1800,
  },
  {
    id: "pay-105",
    date: "2026-02-06",
    customer: "Zencloud",
    method: "bank",
    amount: 1500,
  },
];

export function getPaymentsByMethod() {
  const sums = new Map<PaymentMethod, number>();
  for (const payment of payments) {
    sums.set(payment.method, (sums.get(payment.method) ?? 0) + payment.amount);
  }

  return Array.from(sums.entries()).map(([method, value]) => ({
    method,
    value,
  }));
}
