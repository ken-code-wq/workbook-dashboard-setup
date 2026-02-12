"use client";

import { DashboardLayoutManager } from "./widgets/dashboard-layout-manager";

export function DashboardContent() {
  return (
    <main className="flex-1 overflow-auto p-4 sm:p-6 bg-background w-full">
      <DashboardLayoutManager />
    </main>
  );
}

