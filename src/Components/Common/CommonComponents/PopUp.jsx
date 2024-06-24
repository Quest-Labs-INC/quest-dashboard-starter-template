import React from 'react';
import Button from './Button';

const PopUp = ({
  title,
  fields,
  newRowData,
  handleInputChange,
  handleFileChange,
  handleClosePopup,
  handleSave,
  readOnly = false,
  button1Label = 'Cancel',
  button2Label = 'Save',
  validationErrors,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 w-1/2 h-1/2 max-w-4xl max-h-screen rounded-lg overflow-y-auto">
        <h2 className="text-lg font-mdm mb-4 flex justify-center items-center">{title}</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {fields.map((field) => (
            <div className="mb-4" key={field.id}>
              <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              {field.type === 'table' ? (
                <table className="border-separate border-spacing-0 border rounded-md shadow">
                  <thead>
                    <tr>
                      {field.tableFields.map((tableField) => (
                        <th key={tableField.id} className="font-medium px-4 py-2">
                          {tableField.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {newRowData[field.id] && newRowData[field.id].map((log, index) => (
                      <tr key={index}>
                        {field.tableFields.map((tableField) => (
                          <td key={tableField.id} className="border px-4 py-2">
                            {log[tableField.id.toLowerCase()]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : field.type === 'select' ? (
                <select
                  id={field.id}
                  name={field.id}
                  value={newRowData[field.id] || ''}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                  readOnly={readOnly}
                >
                  <option value="">Select {field.label.toLowerCase()}</option>
                  {field.options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              ) : field.type === 'file' ? (
                <input
                  type="file"
                  id={field.id}
                  name={field.id}
                  onChange={handleFileChange}
                  className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full cursor-pointer bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
                />
              ) : (
                <input
                  type={field.type || 'text'}
                  id={field.id}
                  name={field.id}
                  value={newRowData[field.id] || ''}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                  readOnly={readOnly}
                />
          )}
            {validationErrors && <span className="text-red-500 text-sm">{validationErrors[field.id]}</span>}
            </div>
          ))}
          <div className="flex justify-center items-center space-x-4">
            <Button
              label={button1Label}
              handleFunction={handleClosePopup}
            />
            {!readOnly && <Button label={button2Label} handleFunction={handleSave} />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopUp;
