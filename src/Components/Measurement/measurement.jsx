import React, { useState } from 'react';

export default function Measurment() {
  const [tableData, setTableData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({ parameter: '', factory1: '', factory2: '' });

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    // Clear input fields when closing the popup
    setNewRowData({ parameter: '', factory1: '', factory2: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddRow = () => {
    setTableData((prevData) => [...prevData, newRowData]);
    handleClosePopup();
  };

  return (
    <div className="relative flex flex-col justify-center overflow-hidden mt-20">
    <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-black-600/40 lg:max-w-4xl">
      <h1 className="text-2xl text-center mb-4">Measure</h1>
    <div className="container mx-auto">
      <button onClick={handleOpenPopup} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Add Row
      </button>
      <table className="mt-4 w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Parameter</th>
            <th className="border border-gray-300 px-4 py-2">Factory 1</th>
            <th className="border border-gray-300 px-4 py-2">Factory 2</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{row.parameter}</td>
              <td className="border border-gray-300 px-4 py-2">{row.factory1}</td>
              <td className="border border-gray-300 px-4 py-2">{row.factory2}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Add New Row</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Parameter
                </label>
                <input
                  type="text"
                  id="parameter"
                  name="parameter"
                  value={newRowData.parameter}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Factory 1
                </label>
                <input
                  type="text"
                  id="factory1"
                  name="factory1"
                  value={newRowData.factory1}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Factory 2
                </label>
                <input
                  type="text"
                  id="factory2"
                  name="factory2"
                  value={newRowData.factory2}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleClosePopup}
                  className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddRow}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
  );
}

