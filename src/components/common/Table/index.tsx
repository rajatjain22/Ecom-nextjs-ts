import React, { useState, useMemo } from "react";
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
  entriesPerPage?: number;
}

const Table: React.FC<TableProps> = ({ rows, columns, entriesPerPage = 5 }) => {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);
  const [entriesPerPageState, setEntriesPerPageState] =
    useState(entriesPerPage);

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

  const indexOfLastEntry = currentPage * entriesPerPageState;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPageState;
  const currentEntries = sortedRows.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalPages = Math.ceil(rows.length / entriesPerPageState);

  const isRowSelected = checkedItems.size > 0;

  const handleEdit = () => {
    const selectedRows = Array.from(checkedItems);
    console.log("Edit selected rows:", selectedRows);
  };

  const handleDelete = () => {
    const selectedRows = Array.from(checkedItems);
    console.log("Delete selected rows:", selectedRows);
  };

  return (
    <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
      <div className="flex justify-between p-4">
        <div className="relative mb-2 md:mb-0">
          <Input
            id="search"
            name="search"
            type="text"
            prefix={<SearchIcon />}
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
      <div className="md:flex m-4">
        <p className="text-sm text-gray-500 flex-1">
          Showing {indexOfFirstEntry + 1} to{" "}
          {Math.min(indexOfLastEntry, rows.length)} of {rows.length} entries
        </p>
        <div className="flex items-center max-md:mt-4">
          <p className="text-sm text-gray-500">Display</p>
          <select
            value={entriesPerPageState}
            onChange={(e) => {
              const newEntriesPerPage = Number(e.target.value);
              setEntriesPerPageState(newEntriesPerPage);
              setCurrentPage(1);
            }}
            className="text-sm text-gray-500 border border-gray-400 rounded h-7 mx-4 px-1 outline-none"
          >
            {[5, 10, 20, 50, 100].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <div className="flex space-x-1 ml-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                className={`flex items-center justify-center cursor-pointer w-7 h-7 rounded ${
                  currentPage === index + 1
                    ? "bg-[#007bff] text-white"
                    : "text-gray-500"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
