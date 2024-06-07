import React from "react";

const Table = ({fields, tableData}) => {
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
      <tr key={index}>
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