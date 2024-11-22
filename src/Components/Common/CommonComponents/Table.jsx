import React from "react";
import { useNavigate } from 'react-router-dom';

const Table = ({fields, tableData, pageLink}) => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`${pageLink}${id}`);
  };

  return (
    <table className="border-separate border-spacing-0 border rounded-md shadow">
    <thead>
      <tr>
        {fields.map((field) => (
          <th key={field.id} className="font-medium px-4 py-2">
            {field.label}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
    {tableData.map((row, index) => (
      <tr
          key={index}
          onClick={() => handleRowClick(row[fields.find(f => f.link).id])}
          className="cursor-pointer"
      >
        {fields.map((field) => (
          <td key={field.id} className="border px-4 py-2">
              {row[field.id]}
          </td>
        ))}
      </tr>
    ))}
    </tbody>
  </table>
  );
}

export default Table;