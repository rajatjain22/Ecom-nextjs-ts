import React, { useState, useMemo } from 'react';

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
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);
  const [entriesPerPageState, setEntriesPerPageState] = useState(entriesPerPage);

  const handleCheckboxChange = (id: number) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedRows = useMemo(() => {
    const sortableRows = [...rows];
    if (sortConfig) {
      sortableRows.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableRows;
  }, [rows, sortConfig]);

  const indexOfLastEntry = currentPage * entriesPerPageState;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPageState;
  const currentEntries = sortedRows.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalPages = Math.ceil(rows.length / entriesPerPageState);

  return (
    <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
      <table className="w-full text-left table-auto min-w-max">
        <thead className="whitespace-nowrap uppercase bg-gray-50">
          <tr>
            <th className="pl-4 w-8 border-b border-blue-gray-100 bg-blue-gray-50 text-left text-sm font-semibold text-black cursor-pointer">
              <input
                type="checkbox"
                className=""
                checked={Object.keys(checkedItems).length === rows.length}
                onChange={() => {
                  const newCheckedItems: Record<number, boolean> = {};
                  rows.forEach((row, index) => {
                    newCheckedItems[index] = !checkedItems[index];
                  });
                  setCheckedItems(newCheckedItems);
                }}
              />
            </th>
            {columns.map((item) => (
              <th
                key={item.accessor}
                className="p-4 border-b border-blue-gray-100 bg-blue-gray-50 text-left text-sm font-semibold text-black cursor-pointer"
                onClick={() => handleSort(item.accessor)}
              >
                {item.header} {sortConfig?.key === item.accessor ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="whitespace-nowrap">
          {currentEntries.map((row, index) => (
            <tr key={index} className="hover:bg-blue-50">
              <td className="pl-4 w-8 border-b border-blue-gray-50">
                <input
                  id={`checkbox${index}`}
                  type="checkbox"
                  checked={!!checkedItems[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
              {columns.map((column) => (
                <td key={column.accessor} className="p-4 text-sm border-b border-blue-gray-50">
                  {row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="md:flex m-4">
        <p className="text-sm text-gray-500 flex-1">
          Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, rows.length)} of {rows.length} entries
        </p>
        <div className="flex items-center max-md:mt-4">
          <p className="text-sm text-gray-500">Display</p>
          <select
            value={entriesPerPageState}
            onChange={(e) => {
              setEntriesPerPageState(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="text-sm text-gray-500 border border-gray-400 rounded h-7 mx-4 px-1 outline-none"
          >
            {[5, 10, 20, 50, 100].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <ul className="flex space-x-1 ml-2">
            {[...Array(totalPages).keys()].map((pageNumber) => (
              <li
                key={pageNumber + 1}
                className={`flex items-center justify-center cursor-pointer w-7 h-7 rounded ${currentPage === pageNumber + 1 ? 'bg-[#007bff] text-white' : 'text-gray-500'}`}
                onClick={() => setCurrentPage(pageNumber + 1)}
              >
                {pageNumber + 1}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Table;
