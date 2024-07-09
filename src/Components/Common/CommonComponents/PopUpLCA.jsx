import React from 'react';
import Button from './Button'

export default function PopUp({ fields, newRowData, handleInputChange, handleClosePopup, handleAddRow, options }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Add new Project</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {fields.map((field) => (
            <div className="mb-4" key={field.id}>
              <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              {field.type === 'select' ? (
                <select
                  id={field.id}
                  name={field.id}
                  value={newRowData[field.id]}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                >
                  <option value="">Select {field.label}</option>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  value={newRowData[field.id]}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                />
              )}
            </div>
          ))}
          <div className="flex justify-end">
          <Button
            label="Cancel"
            handleFunction = {handleClosePopup}
          />
            <Button
            label="Add"
            handleFunction = {handleAddRow}
          />
          </div>
        </form>
      </div>
    </div>
  );
}
