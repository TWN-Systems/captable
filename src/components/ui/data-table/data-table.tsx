import type { Table } from "@tanstack/react-table";
import { createContext, type ReactNode, useContext } from "react";

interface DataTableRootProps<TData> {
  children: ReactNode;
  table: Table<TData>;
}

interface TDataTableContext<TData> {
  table: Table<TData>;
}

// biome-ignore lint/suspicious/noExplicitAny: required for type compatibility
const dataTableContext = createContext<TDataTableContext<any> | null>(null);

export const useDataTable = () => {
  const context = useContext(dataTableContext);

  if (!context) {
    throw new Error("useDataTable should be called inside DataTable");
  }

  return context;
};

export function DataTable<TData>({
  children,
  table,
}: DataTableRootProps<TData>) {
  return (
    <dataTableContext.Provider value={{ table: table }}>
      {children}
    </dataTableContext.Provider>
  );
}
