import React from "react";
import Button from './Button';

const PopUp = ({popupTitle = 'New Task', fields, newRowData, handleInputChange, handleClosePopup, handleAddRow}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 w-1/2 max-w-4xl max-h-screen rounded-lg overflow-y-auto">
      <h2 className="text-lg font-mdm mb-4 flex justify-center items-center">{popupTitle}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        {fields.map((field) => (
        <div className="mb-4" key={field.id}>
          <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.id}
            name={field.id}
            value={newRowData[field.id]}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
          />
        </div>
      ))}
        <div className="flex justify-center items-center">
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

export default PopUp;