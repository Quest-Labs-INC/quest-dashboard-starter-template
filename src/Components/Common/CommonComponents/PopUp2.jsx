import React from 'react';

const PopUp = ({ fields, newRowData, handleInputChange, handleClosePopup, handleAddRow, lcaNames }) => {
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

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Add New Project</h2>
        <form onSubmit={handleAddRow}>
          {fields.map((field) => (
            <div key={field.id} className="form-group">
              <label htmlFor={field.id}>{field.label}</label>
              {field.id === 'lca_name' ? (
                <select
                  id={field.id}
                  name={field.id}
                  value={newRowData[field.id]}
                  onChange={handleInputChange}
                >
                  <option value="">Select LCA Name</option>
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
                />
              )}
            </div>
          ))}
          <button type="button" onClick={handleClosePopup}>Save</button>
        </form>
      </div>
    </div>
  );
};

export default PopUp;
