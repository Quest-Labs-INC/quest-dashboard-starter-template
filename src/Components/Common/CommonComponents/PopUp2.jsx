import React from 'react';

const PopUp = ({ fields, newRowData, handleInputChange, handleClosePopup, handleAddRow, lcaNames }) => {
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
