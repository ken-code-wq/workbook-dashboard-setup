"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TableWidget, type TableWidgetColumn } from "../base/table-widget";
import { employees, type Employee } from "@/mock-data/employees";

function StatusBadge({ status }: { status: Employee["status"] }) {
  if (status === "active") {
    return (
      <Badge variant="outline" className="border-emerald-500/30 text-emerald-500">
        Active
      </Badge>
    );
  }

  if (status === "on-leave") {
    return (
      <Badge variant="outline" className="border-amber-500/30 text-amber-500">
        On leave
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="border-violet-500/30 text-violet-500">
      Contract
    </Badge>
  );
}

const columns: Array<TableWidgetColumn<Employee>> = [
  {
    key: "name",
    header: "Employee",
    cell: (row) => (
      <div className="flex items-center gap-2.5 min-w-45">
        <Avatar className="size-7">
          <AvatarImage src={row.avatar} />
          <AvatarFallback className="text-xs">{row.name[0]}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="text-sm font-medium truncate">{row.name}</p>
          <p className="text-xs text-muted-foreground truncate">{row.role}</p>
        </div>
      </div>
    ),
  },
  {
    key: "department",
    header: "Department",
    cell: (row) => <span className="text-sm">{row.department}</span>,
    className: "w-[140px]",
  },
  {
    key: "location",
    header: "Location",
    cell: (row) => <span className="text-sm text-muted-foreground">{row.location}</span>,
    className: "w-[110px]",
  },
  {
    key: "status",
    header: "Status",
    cell: (row) => <StatusBadge status={row.status} />,
    className: "w-[110px]",
  },
];

export function EmployeesTableWidget() {
  return (
    <TableWidget
      title="Employees"
      description="Directory snapshot by department and status"
      rows={employees}
      columns={columns}
      rowKey={(row) => row.id}
    />
  );
}
