import React, { useState, useMemo, useEffect } from "react";
import Button from "../Button";
import Input from "../Input/Input";
import { SearchIcon } from "@/components/Icons";

interface Row {
  [key: string]: any;
}

interface Column {
  header: string;
  accessor: string;
}

interface TableProps {
  rows: Row[];
  columns: Column[];
  pagination: {
    totalPages: number;
    currentPage: number;
    totalCount: number;
    limit?: number;
  };
  onPageChange: (page: number) => void; // Function to update page in parent component
}

const Table: React.FC<TableProps> = ({
  rows,
  columns,
  pagination: { currentPage, totalCount, totalPages, limit = 10 },
  onPageChange,
}) => {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);

  const handleCheckboxChange = (id: number) => {
    setCheckedItems((prev) => {
      const newCheckedItems = new Set(prev);
      if (newCheckedItems.has(id)) {
        newCheckedItems.delete(id);
      } else {
        newCheckedItems.add(id);
      }
      return newCheckedItems;
    });
  };

  const handleSelectAll = () => {
    if (checkedItems.size === rows.length) {
      setCheckedItems(new Set());
    } else {
      setCheckedItems(new Set(rows.map((_, index) => index)));
    }
  };

  const handleSort = (key: string) => {
    setSortConfig((prevSortConfig) => {
      if (prevSortConfig?.key === key) {
        return {
          key,
          direction:
            prevSortConfig.direction === "ascending"
              ? "descending"
              : "ascending",
        };
      }
      return { key, direction: "ascending" };
    });
  };

  const sortedRows = useMemo(() => {
    if (!sortConfig) return rows;

    return [...rows].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "ascending" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
  }, [rows, sortConfig]);

  const indexOfLastEntry = currentPage * limit;
  const indexOfFirstEntry = indexOfLastEntry - limit;
  const currentEntries = sortedRows;

  const isRowSelected = checkedItems.size > 0;

  const handleEdit = () => {
    const selectedRows = Array.from(checkedItems);
    console.log("Edit selected rows:", selectedRows);
  };

  const handleDelete = () => {
    const selectedRows = Array.from(checkedItems);
    console.log("Delete selected rows:", selectedRows);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page); // Trigger parent function to change page
    }
  };

  return (
    <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
      <div className="flex justify-between p-4">
        <div className="relative mb-2 md:mb-0">
          <Input
            id="search"
            name="search"
            type="text"
            prefix={<SearchIcon fill="#969696"/>}
            placeholder="Search here..."
            className="border border-gray-300 rounded p-2 text-sm w-full md:w-64"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className={`text-sm py-2 px-4 rounded ${
              !isRowSelected
                ? "border bg-gray-100 text-gray-600 cursor-not-allowed"
                : "bg-green-500 text-white"
            }`}
            disabled={!isRowSelected}
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className={`text-sm py-2 px-4 rounded ${
              !isRowSelected
                ? "border bg-gray-100 text-gray-600 cursor-not-allowed"
                : "bg-red-500 text-white"
            }`}
            disabled={!isRowSelected}
          >
            Delete
          </button>
        </div>
      </div>
      <table className="w-full text-left table-auto min-w-max">
        <thead className="whitespace-nowrap capitalize bg-gray-50">
          <tr>
            <th className="pl-4 w-8 border-b border-blue-gray-100 bg-blue-gray-50 text-left text-sm font-semibold text-black cursor-pointer">
              <input
                type="checkbox"
                checked={checkedItems.size === rows.length}
                onChange={handleSelectAll}
              />
            </th>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="p-4 border-b border-blue-gray-100 bg-blue-gray-50 text-left text-sm font-semibold text-black cursor-pointer"
                onClick={() => handleSort(column.accessor)}
              >
                {column.header}{" "}
                {sortConfig?.key === column.accessor &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="whitespace-nowrap">
          {currentEntries.map((row, index) => (
            <tr key={index} className="hover:bg-blue-50">
              <td className="pl-4 w-8 border-b border-blue-gray-50">
                <input
                  type="checkbox"
                  checked={checkedItems.has(index)}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
              {columns.map((column) => (
                <td
                  key={column.accessor}
                  className="p-4 text-sm border-b border-blue-gray-50"
                >
                  {row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="flex items-center justify-end m-4 gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index + 1}
              className={`flex items-center justify-center cursor-pointer w-7 h-7 border rounded ${
                currentPage === index + 1
                  ? "bg-[#007bff] text-white"
                  : "text-gray-500"
              }`}
              onClick={() => handlePageChange(index + 1)} // Update page on click
            >
              {index + 1}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Table;
