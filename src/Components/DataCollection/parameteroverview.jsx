import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './parameteroverview.css';
import {Link} from 'react-router-dom';
import { generalFunction } from '../../assets/Config/generalFunction';

export default function Parameteroverview() {
  const [tableData, setTableData] = useState([]);
  //const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isParameterPopupOpen, setIsParameterPopupOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({ parameter: '', factory1: '', factory2: '' });
  const [newParameterData, setNewParameterData] = useState({ parameter: '', unit: '', dataCollectionPoints: [{ name: '', assigned_to: '', method: '' }], processFacilityMappings: [] });
  const [facilities, setFacilities] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState('');
  const [selectedProcess, setSelectedProcess] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonColor, setButtonColor] = useState('bg-blue-500');
  const [users, SetUsers] = useState([]);

  useEffect(() => {
    fetchMeasurement();
    fetchFacilities();

  }, []);

  async function fetchFacilities() {
    const companyid = await generalFunction.getCompanyId();
    const { data, error } = await supabase
            .from('facility',)
            .select('facility_id, facility_name, company_id')
            .eq('company_id', companyid);
        if (error) {
            throw error;
        }
    setFacilities(data);
  }

  async function fetchProcesses(facilityId) {
    let { data, error } = await supabase.from('process').select('*').eq('facility_id', facilityId);
    if (error) console.error(error);
    else setProcesses(data);
  }

  async function fetchUsers() {
    const data = await generalFunction.fetchAllUsers();

    SetUsers(data);
  }

  // change to General Function later, resolve bug
  async function fetchMeasurement() {
    const companyid = await generalFunction.getCompanyId();
    const { data, error } = await supabase.rpc('fetch_aggregated_metrics', { p_company_id: companyid });
    setTableData(formatData(data));
  }

  const formatData = (data) => {
    const result = {};
    if (!data || !Array.isArray(data)) {
        console.error("Invalid data format in formatData:", data);
        return result;
    }

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
/*  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    createMeasurement();
    setNewRowData({ parameter: '', factory1: '', factory2: '' });
  };
*/
  const handleOpenParameterPopup = () => {
    fetchUsers();
    console.log(users);
    setIsParameterPopupOpen(true);
  };

  const handleCloseParameterPopup = () => {
    setIsParameterPopupOpen(false);
    setNewParameterData({ parameter: '', unit: '', dataCollectionPoints: [{ name: '', assigned_to: '', method: '' }], processFacilityMappings: [] });
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
    setSelectedFacility(value);
    await fetchProcesses(value);
  };

  const handleProcessChange = (e) => {
    const { value } = e.target;
    setSelectedProcess(value);
  };

  const addProcessFacilityMapping = () => {

    const temp_facilityName = facilities.find(facility => facility.facility_id === Number(selectedFacility))?.facility_name;
    const temp_processName = processes.find(process => process.process_id === Number(selectedProcess))?.process_name;
    setNewParameterData(prevData => ({
      ...prevData,
      processFacilityMappings: [...prevData.processFacilityMappings, { facility_id: selectedFacility, process_id: selectedProcess, facility_name : temp_facilityName, process_name : temp_processName }]
    }));
    setSelectedFacility('');
    setSelectedProcess('');
  };

  const handleDataCollectionPointChange = (index, e) => {
    const { name, value } = e.target;
    setNewParameterData(prevData => {
      const newPoints = prevData.dataCollectionPoints.map((point, i) => (i === index ? { ...point, [name]: value } : point));
      return { ...prevData, dataCollectionPoints: newPoints };
    });
  };

  const removeProcessFacilityMapping = (index) => {
    setNewParameterData(prevData => ({
      ...prevData,
      processFacilityMappings: prevData.processFacilityMappings.filter((_, i) => i !== index),
    }));
  };

  const addDataCollectionPoint = () => {
    setNewParameterData(prevData => ({
      ...prevData,
      dataCollectionPoints: [...prevData.dataCollectionPoints, { name: '', assigned_to: '', method: '' }],
    }));
  };

  const removeDataCollectionPoint = (index) => {
    setNewParameterData(prevData => ({
      ...prevData,
      dataCollectionPoints: prevData.dataCollectionPoints.filter((_, i) => i !== index),
    }));
  };
  /*
  const handleAddRow = () => {
    setTableData(prevData => [...prevData, newRowData]);
    handleClosePopup();
  };
*/
/*  async function createMeasurement() {
    await supabase
      .from('metrics')
      .insert({ parameter: newRowData.parameter, factory1: newRowData.factory1, factory2: newRowData.factory2 });
  }
*/
  async function createParameter() {
    const userId = localStorage.getItem('varaUserId');
    setLoading(true);
    setButtonColor('bg-yellow-500');
    
    const { data, error } = await supabase
    .from('parameter',)
    .insert([{ created_by: userId, para_name: newParameterData.parameter, para_metric: newParameterData.unit, para_description: newParameterData.parameter }])
    .select('para_id');

    if (error) {
      console.error(error);
      setButtonColor('bg-red-500');
      setLoading(false);
      setTimeout(() => {
        setButtonColor('bg-blue-500');
        handleCloseParameterPopup();
      }, 2000);
      return;
    }

    const parameterId = data[0].para_id;
    const dataCollectionPoints = newParameterData.dataCollectionPoints.map(point => ({ ...point, parameter_id: parameterId }));
    
    if (newParameterData.dataCollectionPoints.length > 0){
    const { error: pointsError } = await supabase
      .from('data_collection_points')
      .insert(dataCollectionPoints);


    if (pointsError) {
      console.error(pointsError);
      setButtonColor('bg-red-500');
      setLoading(false);
      setTimeout(() => {
        setButtonColor('bg-blue-500');
        handleCloseParameterPopup();
      }, 2000);
      return;
    }
    }

    const parameterProcessMappings = newParameterData.processFacilityMappings.map(mapping => ({ parameter_id: parameterId, process_id: mapping.process_id, active: true}));
    if (parameterProcessMappings.length > 0){
    const { error: mappingError } = await supabase
      .from('parameter_process_mapping')
      .insert(parameterProcessMappings);

    if (mappingError) {
      console.error(mappingError);
      setButtonColor('bg-red-500');
      setLoading(false);
      setTimeout(() => {
        setButtonColor('bg-blue-500');
        //handleCloseParameterPopup();
      }, 2000);
      return;
    }


    setButtonColor('bg-green-500');
    setLoading(false);
    setTimeout(() => {
      setButtonColor('bg-blue-500');
      handleCloseParameterPopup();
    }, 2000);
  }}

  const renderTable = () => {
    const facilities = Object.keys(tableData);
    if (facilities.length === 0) return <p>No data available</p>;
  
    const parameters = new Set();
    facilities.forEach(facility => {
      Object.values(tableData[facility]).forEach(processData => {
        Object.keys(processData).forEach(parameter => parameters.add(parameter));
      });
    });
  
    return (
      <table className="metrics-table">
        <thead>
          <tr>
            <th>Parameter</th>
            {facilities.map(facility => (
              <th key={facility} colSpan={Object.keys(tableData[facility]).length} className="text-center">
                {facility}
              </th>
            ))}
          </tr>
          <tr>
            <th></th>
            {facilities.map(facility =>
              Object.keys(tableData[facility]).map(process => (
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
              <td> <Link to={`/data_collection/${parameter}`} className="text-blue-500 hover:underline">
                    {parameter}
                  </Link>
                     </td>
              {facilities.map(facility =>
                Object.keys(tableData[facility]).map(process => (
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
      <div className="w-full m-auto bg-white rounded-md shadow-xl shadow-black-600/40 lg:max-w-5.5xl">
        <h1 className="text-2xl text-center mb-4">Sustainability Metrics</h1>
        <div className="container mx-auto">
          {/*<button onClick={handleOpenPopup} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add Row
          </button>*/}
          {renderTable()}
          <button onClick={handleOpenParameterPopup} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add Parameter
          </button>

          {/*{isPopupOpen && (
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
*/}

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
                      value={selectedFacility}
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
                  {(
                    <div className="mb-4">
                      <label htmlFor="process" className="block text-sm font-medium text-gray-700">Select Process</label>
                      <select
                        id="process"
                        name="process"
                        value={selectedProcess}
                        onChange={handleProcessChange}
                        className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                      >
                        <option value="">Select a process</option>
                        {processes.map(process => (
                          <option key={process.process_id} value={process.process_id}>
                            {process.process_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={addProcessFacilityMapping}
                    className="mt-2 bg-blue-500 text-white px-1 py-0.5 rounded-md"
                  >
                    + Add Process-Facility Combination
                  </button>
                  <div className="mb-4">
                    {newParameterData.processFacilityMappings.map((mapping, index) => (
                      <div key={index} className="mb-2">
                        <span>{mapping.facility_name} - {mapping.process_name}</span>
                        <button
                          type="button"
                          onClick={() => removeProcessFacilityMapping(index)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          X
                        </button>
                      </div>
                      
                    ))}
                  </div>
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
                        <select
                          name="assigned_to"
                          value={point.assigned_to}
                          onChange={(e) => handleDataCollectionPointChange(index, e)}
                          className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full mr-2"
                        >
                          <option value="">Assigned to</option>
                          {users.map(user => (
                            <option key={user.id} value={user.id}>
                              {user.name} ({user.email})
                            </option>
                          ))}
                        </select>
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
                      onClick={createParameter}
                      disabled={loading}
                      className={`${buttonColor} px-4 py-2 text-sm font-medium text-white rounded-md hover:bg-blue-600`}
                    >
                      {loading ? 'Loading...' : 'Add'}
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
