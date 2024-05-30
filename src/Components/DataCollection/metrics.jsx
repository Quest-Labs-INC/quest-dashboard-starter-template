import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './metrics.css'; 

export default function Metrics() {
  const [tableData, setTableData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({ parameter: '', factory1: '', factory2: '' });

  useEffect(() => {
    fetchMeasurement()
  }, [])

  // fetches data from db using supabase client
  async function fetchMeasurement() {
    let { data, error } = await supabase.rpc('fetch_aggregated_metrics')

    if (error) console.error(error)
    else console.log(data)
    setTableData(formatdata(data));
  }

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    // Clear input fields when closing the popup
    createMeasurement();
    setNewRowData({ parameter: '', factory1: '', factory2: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formatdata = (data) => {

    const result = {};
     // Iterate over each item in the data array and organize it by facility, then by process, and then by parameter.
    data.forEach(item => {
      const { facility_name, process_name, para_name, total_value } = item;
      if (!result[facility_name]) {
        result[facility_name] = {};
      }
      if (!result[facility_name][process_name]) {
        result[facility_name][process_name] = {};
      }
      result[facility_name][process_name][para_name] = total_value;
    });
    return result;
  };

  const handleAddRow = () => {
    setTableData((prevData) => [...prevData, newRowData]);
    handleClosePopup();
  };

  async function createMeasurement() {
    await supabase
      .from(`metrics`)
      .insert({ parameter: newRowData.parameter, factory1: newRowData.factory1 , factory2: newRowData.factory2 })
  }

  //
  const renderTable = () => {
    // Extracting facility names
    const facilities = Object.keys(tableData);
    if (facilities.length === 0) return <p>No data available</p>;

    // Using forEach to gather unique parameters
    const parameters = new Set();
    facilities.forEach(facility => {
      Object.values(tableData[facility]).forEach(processData => {
        Object.keys(processData).forEach(parameter => parameters.add(parameter));
      });
    });

    // Using reduce to gather unique process names
    const processes = facilities.reduce((acc, facility) => {
      const processNames = Object.keys(tableData[facility]);
      processNames.forEach(process => {
        if (!acc.includes(process)) acc.push(process);
      });
      return acc;
    }, []);

    return (
      <table className="metrics-table">
        <thead>
          <tr>
            <th>Parameter</th>
            {facilities.map(facility => (
              <th key={facility} colSpan={processes.length} className="text-center">
                {facility}
              </th>
            ))}
          </tr>
          <tr>
            <th></th>
            {facilities.map(facility =>
              processes.map(process => (
                <th key={`${facility}-${process}`} className="text-center">
                  {process}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {Array.from(parameters).map(parameter => (
            <tr key={parameter}>
              <td>{parameter}</td>
              {facilities.map(facility =>
                processes.map(process => (
                  <td key={`${facility}-${process}-${parameter}`} className="text-center">
                    {tableData[facility][process]?.[parameter] || '-'}
                  </td>
                ))
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="relative flex flex-col justify-center overflow-hidden mt-20">
    <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-black-600/40 lg:max-w-4xl">
      <h1 className="text-2xl text-center mb-4">Sustainability Metrics</h1>
    <div className="container mx-auto">
      <button onClick={handleOpenPopup} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Add Row
      </button>
      {renderTable()}
      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Add New Row</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Metrics
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

