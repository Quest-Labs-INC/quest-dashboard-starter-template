import React from 'react';

const PopUp2 = ({ fields, newRowData, handleInputChange, handleClosePopup, handleAddRow, lcaNames, lcaIdMapping }) => {
  const massUnitsOptions = ['Kilograms', 'Grams', 'Ounces'];
  const distUnitsOptions = ['Kilometers', 'Meters', 'Miles'];
  const volUnitsOptions = ['Liters', 'Gallons'];

  const getOptions = (fieldId) => {
    switch (fieldId) {
      case 'mass_units':
        return massUnitsOptions;
      case 'dist_units':
        return distUnitsOptions;
      case 'vol_units':
        return volUnitsOptions;
      default:
        return [];
    }
  };

  const handleLcaNameChange = (e) => {
    const selectedLcaName = e.target.value;
    handleInputChange({
      target: {
        name: 'lca_name',
        value: selectedLcaName,
      }
    });
    handleInputChange({
      target: {
        name: 'id', // Assuming 'id' is the field for lca_id
        value: lcaIdMapping[selectedLcaName] || '',
      }
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Update Project</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleAddRow(); }}>
          {fields.map((field) => (
            <div key={field.id} className="mb-4">
              <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              {field.id === 'lca_name' ? (
                <select
                  id={field.id}
                  name={field.id}
                  value={newRowData[field.id]}
                  onChange={handleLcaNameChange}
                  className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full p-2"
                >
                  <option value="">Select Product Name</option>
                  {lcaNames.map((name, index) => (
                    <option key={index} value={name}>{name}</option>
                  ))}
                </select>
              ) : getOptions(field.id).length > 0 ? (
                <select
                  id={field.id}
                  name={field.id}
                  value={newRowData[field.id]}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full p-2"
                >
                  <option value="">Select {field.label}</option>
                  {getOptions(field.id).map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  value={newRowData[field.id]}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full p-2"
                />
              )}
            </div>
          ))}
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={handleClosePopup}
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddRow}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopUp2;
