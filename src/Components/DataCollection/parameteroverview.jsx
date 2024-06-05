import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './parameteroverview.css';

export default function Parameteroverview() {
  const [tableData, setTableData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isParameterPopupOpen, setIsParameterPopupOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({ parameter: '', factory1: '', factory2: '' });
  const [newParameterData, setNewParameterData] = useState({ parameter: '', unit: '', facility: '', process: '', dataCollectionPoints: [{ name: '', assigned: '', method: '' }] });
  const [facilities, setFacilities] = useState([]);
  const [processes, setProcesses] = useState([]);

  useEffect(() => {
    fetchMeasurement();
    fetchFacilities();
  }, []);

  // Fetch facilities data from the database
  async function fetchFacilities() {
    let { data, error } = await supabase.from('facility').select('*');
    if (error) console.error(error);
    else setFacilities(data);
  }

  // Fetch processes based on selected facility
  async function fetchProcesses(facilityId) {
    let { data, error } = await supabase.from('process').select('*').eq('facility_id', facilityId);
    if (error) console.error(error);
    else setProcesses(data);
  }

  // Fetch measurement data from the database using supabase client
  async function fetchMeasurement() {
    let { data, error } = await supabase.rpc('fetch_aggregated_metrics');
    if (error) console.error(error);
    else setTableData(formatData(data));
  }

  const formatData = (data) => {
    const result = {};
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

  //Functions to handle popup open and close
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    createMeasurement();
    setNewRowData({ parameter: '', factory1: '', factory2: '' });
  };

  const handleOpenParameterPopup = () => {
    setIsParameterPopupOpen(true);
  };

  const handleCloseParameterPopup = () => {
    setIsParameterPopupOpen(false);
    createParameter();
    setNewParameterData({ parameter: '', unit: '', facility: '', process: '', dataCollectionPoints: [{ name: '', assigned: '', method: '' }] });
  };

  const handleInputChange = (e, setData, data) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFacilityChange = async (e) => {
    const { value } = e.target;
    setNewParameterData(prevData => ({
      ...prevData,
      facility: value,
    }));
    await fetchProcesses(value);
  };

  const handleDataCollectionPointChange = (index, e) => {
    const { name, value } = e.target;
    setNewParameterData(prevData => {
      const newPoints = prevData.dataCollectionPoints.map((point, i) => (i === index ? { ...point, [name]: value } : point));
      return { ...prevData, dataCollectionPoints: newPoints };
    });
  };

  const addDataCollectionPoint = () => {
    setNewParameterData(prevData => ({
      ...prevData,
      dataCollectionPoints: [...prevData.dataCollectionPoints, { name: '', assigned: '', method: '' }],
    }));
  };

  const removeDataCollectionPoint = (index) => {
    setNewParameterData(prevData => ({
      ...prevData,
      dataCollectionPoints: prevData.dataCollectionPoints.filter((_, i) => i !== index),
    }));
  };

  const handleAddRow = () => {
    setTableData(prevData => [...prevData, newRowData]);
    handleClosePopup();
  };

  async function createMeasurement() {
    await supabase
      .from('metrics')
      .insert({ parameter: newRowData.parameter, factory1: newRowData.factory1, factory2: newRowData.factory2 });
  }

  //Function to create a new parameter in the database
  async function createParameter() {
    const { data, error } = await supabase
      .from('parameters')
      .insert([{ parameter_name: newParameterData.parameter, unit: newParameterData.unit, facility_id: newParameterData.facility, process_name: newParameterData.process }]);

    if (error) {
      console.error(error);
      return;
    }

    const parameterId = data[0].id;
    const dataCollectionPoints = newParameterData.dataCollectionPoints.map(point => ({ ...point, parameter_id: parameterId }));

    const { error: pointsError } = await supabase
      .from('data_collection_points')
      .insert(dataCollectionPoints);

    if (pointsError) {
      console.error(pointsError);
    }
  }

  //Function to dynamically render the table based on the data
  const renderTable = () => {
    const facilities = Object.keys(tableData);
    if (facilities.length === 0) return <p>No data available</p>;

    const parameters = new Set();
    facilities.forEach(facility => {
      Object.values(tableData[facility]).forEach(processData => {
        Object.keys(processData).forEach(parameter => parameters.add(parameter));
      });
    });

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
          <button onClick={handleOpenParameterPopup} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add Parameter
          </button>

          {isPopupOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg">
                <h2 className="text-lg font-bold mb-4">Add New Row</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Metrics</label>
                    <input
                      type="text"
                      id="parameter"
                      name="parameter"
                      value={newRowData.parameter}
                      onChange={(e) => handleInputChange(e, setNewRowData, newRowData)}
                      className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="factory1" className="block text-sm font-medium text-gray-700">Factory 1</label>
                    <input
                      type="text"
                      id="factory1"
                      name="factory1"
                      value={newRowData.factory1}
                      onChange={(e) => handleInputChange(e, setNewRowData, newRowData)}
                      className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="factory2" className="block text-sm font-medium text-gray-700">Factory 2</label>
                    <input
                      type="text"
                      id="factory2"
                      name="factory2"
                      value={newRowData.factory2}
                      onChange={(e) => handleInputChange(e, setNewRowData, newRowData)}
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

          {isParameterPopupOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg">
                <h2 className="text-lg font-bold mb-4">Add Parameter</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-4">
                    <label htmlFor="parameter" className="block text-sm font-medium text-gray-700">Parameter</label>
                    <input
                      type="text"
                      id="parameter"
                      name="parameter"
                      value={newParameterData.parameter}
                      onChange={(e) => handleInputChange(e, setNewParameterData, newParameterData)}
                      className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="unit" className="block text-sm font-medium text-gray-700">Unit</label>
                    <input
                      type="text"
                      id="unit"
                      name="unit"
                      value={newParameterData.unit}
                      onChange={(e) => handleInputChange(e, setNewParameterData, newParameterData)}
                      className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="facility" className="block text-sm font-medium text-gray-700">Select Facility</label>
                    <select
                      id="facility"
                      name="facility"
                      value={newParameterData.facility}
                      onChange={handleFacilityChange}
                      className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                    >
                      <option value="">Select a facility</option>
                      {facilities.map(facility => (
                        <option key={facility.facility_id} value={facility.facility_id}>
                          {facility.facility_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {processes.length > 0 && (
                    <div className="mb-4">
                      <label htmlFor="process" className="block text-sm font-medium text-gray-700">Select Process</label>
                      <select
                        id="process"
                        name="process"
                        value={newParameterData.process}
                        onChange={(e) => handleInputChange(e, setNewParameterData, newParameterData)}
                        className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                      >
                        <option value="">Select a process</option>
                        {processes.map(process => (
                          <option key={process.process_id} value={process.process_name}>
                            {process.process_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="mb-4">
                    <h3 className="text-md font-bold mb-2">Add Data Collection Points</h3>
                    {newParameterData.dataCollectionPoints.map((point, index) => (
                      <div key={index} className="mb-2 flex items-center">
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          value={point.name}
                          onChange={(e) => handleDataCollectionPointChange(index, e)}
                          className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full mr-2"
                        />
                        <input
                          type="text"
                          name="assigned"
                          placeholder="Assigned"
                          value={point.assigned}
                          onChange={(e) => handleDataCollectionPointChange(index, e)}
                          className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full mr-2"
                        />
                        <input
                          type="text"
                          name="method"
                          placeholder="Data collection method"
                          value={point.method}
                          onChange={(e) => handleDataCollectionPointChange(index, e)}
                          className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full mr-2"
                        />
                        <button
                          type="button"
                          onClick={() => removeDataCollectionPoint(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          X
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addDataCollectionPoint}
                      className="mt-2 bg-blue-500 text-white px-1 py-0.5 rounded-md"
                    >
                      + Add Data Collection Point
                    </button>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={handleCloseParameterPopup}
                      className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCloseParameterPopup}
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
