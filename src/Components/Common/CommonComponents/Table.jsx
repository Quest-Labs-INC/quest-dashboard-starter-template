import React from "react";
import { useNavigate } from 'react-router-dom';

const Table = ({ fields, tableData, hasLink = false, pageLink, hasActions = false, actions = [] }) => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`${pageLink}${id}`);
  };

  return (
    <div className="flex justify-center">
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
        {tableData.map((row, index) => {
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
                  {actions.map((ActionButton, actionIndex) => <span key={actionIndex} onClick={(e) => e.stopPropagation()}>{React.cloneElement(ActionButton, { handleFunction: () => ActionButton.props.handleFunction(row, index) })}</span>)}
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
};

export default Table;
