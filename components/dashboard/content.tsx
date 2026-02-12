"use client";

import { CustomizableDashboard } from "./widgets/customizable-dashboard";

export function DashboardContent() {
  return (
    <main className="flex-1 overflow-auto p-4 sm:p-6 bg-background w-full">
      <CustomizableDashboard />
    </main>
  );
}

