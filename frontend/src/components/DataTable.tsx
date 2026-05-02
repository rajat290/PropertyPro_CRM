import React from 'react';

// This <T> makes the component "Generic"
interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export default function DataTable<T extends { id: number | string }>({ 
  data, 
  columns 
}: DataTableProps<T>) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="p-4 font-semibold text-slate-600 text-sm">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50 transition">
              {columns.map((col, index) => (
                <td key={index} className="p-4 text-sm text-slate-600">
                  {/* If accessor is a function, call it. If it's a key, show the value */}
                  {typeof col.accessor === 'function' 
                    ? col.accessor(item) 
                    : (item[col.accessor] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
