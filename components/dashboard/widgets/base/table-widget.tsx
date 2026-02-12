"use client";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type TableWidgetColumn<Row> = {
  key: string;
  header: React.ReactNode;
  cell: (row: Row) => React.ReactNode;
  className?: string;
};

export function TableWidget<Row>({
  title,
  description,
  rows,
  columns,
  rowKey,
  className,
}: {
  title: string;
  description?: string;
  rows: Row[];
  columns: Array<TableWidgetColumn<Row>>;
  rowKey: (row: Row) => string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground rounded-xl border overflow-hidden h-full flex flex-col",
        className
      )}
    >
      <div className="px-4 py-3 border-b">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-medium text-base truncate">{title}</h3>
            {description ? (
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {description}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent bg-muted/30">
              {columns.map((col) => (
                <TableHead key={col.key} className={cn(col.className)}>
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={rowKey(row)} className="border-border/50">
                {columns.map((col) => (
                  <TableCell key={col.key} className={cn(col.className)}>
                    {col.cell(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
