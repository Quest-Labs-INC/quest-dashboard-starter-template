import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Table = ({ fields, tableData, hasLink = false, pageLink, hasActions = false, actions = [], rowsPerPage = 10, enablePagination = true, searchableColumn }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  const handleRowClick = (id) => {
    navigate(`${pageLink}${id}`);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const filteredData = tableData.filter(row => {
    if (!searchableColumn) return true;
    return row[searchableColumn]?.toString().toLowerCase().includes(searchQuery.toLowerCase());
  });

  const paginatedData = enablePagination ? filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage) : filteredData;

  return (
    <div className="flex flex-col items-center">
      <div className="w-[90%] margin-[auto] mb-4 flex justify-between items-center">
        {searchableColumn && (
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={`Search by ${fields.find(field => field.id === searchableColumn)?.label}`}
            className="px-2 py-1 border rounded-md shadow text-sm"
          />
        )}
      </div>
      <table className="w-[90%] margin-[auto] border-separate border-spacing-0 border rounded-md shadow text-center">
        <thead>
          <tr>
            {fields.map((field) => (
              <th key={field.id} className="font-medium px-4 py-2">
                {field.label}
              </th>
            ))}
            {hasActions && (
              <th key="actions" className="font-medium px-4 py-2">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => {
            const clickable = hasLink && fields.some(f => f.link);
            return (
              <tr
                key={index}
                onClick={clickable ? () => handleRowClick(row[fields.find(f => f.link).id]) : undefined}
                className={clickable ? "cursor-pointer" : ""}
              >
                {fields.map((field) => (
                  <td key={field.id} className="border px-4 py-2">
                    {row[field.id]}
                  </td>
                ))}
                {hasActions && (
                  <td className="border px-4 py-2">
                    {actions.map((ActionButton, actionIndex) => (
                      <span key={actionIndex} onClick={(e) => e.stopPropagation()}>
                        {React.cloneElement(ActionButton, { handleFunction: () => ActionButton.props.handleFunction(row, index) })}
                      </span>
                    ))}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      {enablePagination && (
        <div className="flex justify-end w-[90%] mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 mx-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-2 py-1 text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 mx-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
