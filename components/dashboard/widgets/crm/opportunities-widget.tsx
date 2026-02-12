"use client";

import { Badge } from "@/components/ui/badge";
import { TableWidget, type TableWidgetColumn } from "../base/table-widget";
import { opportunities, type Opportunity } from "@/mock-data/crm";

function StageBadge({ stage }: { stage: Opportunity["stage"] }) {
  const styles: Record<Opportunity["stage"], string> = {
    prospecting: "border-muted text-muted-foreground",
    qualification: "border-blue-500/30 text-blue-500",
    proposal: "border-violet-500/30 text-violet-500",
    negotiation: "border-amber-500/30 text-amber-500",
    "closed-won": "border-emerald-500/30 text-emerald-500",
    "closed-lost": "border-pink-500/30 text-pink-500",
  };

  const labels: Record<Opportunity["stage"], string> = {
    prospecting: "Prospecting",
    qualification: "Qualified",
    proposal: "Proposal",
    negotiation: "Negotiation",
    "closed-won": "Won",
    "closed-lost": "Lost",
  };

  return (
    <Badge variant="outline" className={styles[stage]}>
      {labels[stage]}
    </Badge>
  );
}

const columns: Array<TableWidgetColumn<Opportunity>> = [
  {
    key: "name",
    header: "Opportunity",
    cell: (row) => (
      <div className="min-w-[200px]">
        <p className="text-sm font-medium truncate">{row.name}</p>
        <p className="text-xs text-muted-foreground truncate">{row.company}</p>
      </div>
    ),
  },
  {
    key: "owner",
    header: "Owner",
    cell: (row) => <span className="text-sm text-muted-foreground truncate">{row.owner}</span>,
    className: "w-[140px]",
  },
  {
    key: "value",
    header: "Value",
    cell: (row) => (
      <span className="text-sm font-medium tabular-nums">${row.value.toLocaleString()}</span>
    ),
    className: "w-[110px]",
  },
  {
    key: "probability",
    header: "Prob.",
    cell: (row) => <span className="text-sm tabular-nums text-muted-foreground">{row.probability}%</span>,
    className: "w-[80px]",
  },
  {
    key: "expectedClose",
    header: "Expected Close",
    cell: (row) => <span className="text-sm text-muted-foreground">{row.expectedClose}</span>,
    className: "w-[120px]",
  },
  {
    key: "stage",
    header: "Stage",
    cell: (row) => <StageBadge stage={row.stage} />,
    className: "w-[110px]",
  },
];

export function OpportunitiesWidget() {
  return (
    <TableWidget
      title="Opportunities"
      description="Sales pipeline deals"
      rows={opportunities}
      columns={columns}
      rowKey={(row) => row.id}
    />
  );
}
