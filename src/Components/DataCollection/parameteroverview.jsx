import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './parameteroverview.css';
import { generalFunction } from '../../assets/Config/generalFunction';
import Button from '../Common/CommonComponents/Button';
import {Link} from 'react-router-dom';

export default function Parameteroverview() {
    const [tableData, setTableData] = useState([]);
    const [isParameterPopupOpen, setIsParameterPopupOpen] = useState(false);
    const [newParameterData, setNewParameterData] = useState({ parameter: '', unit: '', processFacilityMappings: [] });
    const [facilities, setFacilities] = useState([]);
    const [processes, setProcesses] = useState([]);
    const [selectedFacility, setSelectedFacility] = useState('');
    const [selectedProcess, setSelectedProcess] = useState('');
    const [loading, setLoading] = useState(false);
    const [buttonColor, setButtonColor] = useState('bg-blue-500');
    const [isProcessParameterPopupOpen, setIsProcessParameterPopupOpen] = useState(false);
    const [parameterProcessData, setParameterProcessData] = useState([]);
    const [popupFacilities, setPopupFacilities] = useState([]);
    const [popupProcesses, setPopupProcesses] = useState([]);
    const [selectedPopupFacility, setSelectedPopupFacility] = useState('');
    const [selectedPopupProcess, setSelectedPopupProcess] = useState('');


    useEffect(() => {
        fetchMeasurement();
        fetchFacilities();
    }, []);

    async function fetchFacilities() {
        try {
            const data = await generalFunction.fetchFacilities();
            setFacilities(data);
        } catch (error) {
            console.error(error.message);
        }
    }

    async function fetchProcesses(facilityId) {
        try {
            const data = await generalFunction.fetchProcesses(facilityId);
            setProcesses(data);
        } catch (error) {
            console.error(error.message);
        }
    }


    const handleFacilityChange = async (e) => {
        const { value } = e.target;
        setSelectedFacility(value);
        await fetchProcesses(value);
      };

    const handleProcessChange = (e) => {
        const { value } = e.target;
        setSelectedProcess(value);
    };

    async function fetchMeasurement() {
        const companyid = await generalFunction.getCompanyId();
        const { data, error } = await supabase.rpc('fetch_aggregated_metrics', { p_company_id: companyid });
        if (error) {
            console.error(error);
        } else {
            setTableData(formatData(data));
        }
    }

    const formatData = (data) => {
        const result = {};
        if (!data || !Array.isArray(data)) {
            console.error("Invalid data format in formatData:", data);
            return result;
        }

        data.forEach(item => {
            const { facility_name, facility_id, process_name, process_id, para_name, para_id, total_value } = item;
            if (!result[facility_name]) {
                result[facility_name] = {
                    facility_id,
                    processes: {}
                };
            }
            if (!result[facility_name].processes[process_name]) {
                result[facility_name].processes[process_name] = {
                    process_id,
                    parameters: {}
                };
            }
            result[facility_name].processes[process_name].parameters[para_name] = {
                para_id,
                total_value
            };
        });
        return result;
    };

    async function fetchProcessParameterData(para_id) {
        const { data, error } = await supabase.from('parameter_process_mapping').select(`id, process_id, parameter_id
            ,process(process_name, facility_id,facility(facility_name))
            `).eq('parameter_id', para_id).eq('active', true);
        if (error) {
            console.error(error);
        } else {
            setParameterProcessData(data);
        }
        return data;
    }

    const handleOpenParameterPopup = () => {
        setIsParameterPopupOpen(true);
    };

    const handleCloseParameterPopup = () => {
        setIsParameterPopupOpen(false);
        setNewParameterData({ parameter: '', unit: '', processFacilityMappings: [] });
    };

    const openProcessParameterPopup = async (para_id) => {
        const data = await fetchProcessParameterData(para_id);
        if (data) {
            const facilitiesData = await generalFunction.fetchFacilities();
            setPopupFacilities(facilitiesData);
            setIsProcessParameterPopupOpen(true);
        }
    };

    const closeProcessParameterPopup = () => {
        setIsProcessParameterPopupOpen(false);
        setParameterProcessData([]);
        setPopupFacilities([]);
        setPopupProcesses([]);
        setSelectedPopupFacility('');
        setSelectedPopupProcess('');
    };

    const handlePopupFacilityChange = async (e) => {
        const { value } = e.target;
        setSelectedPopupFacility(value);
        const processesData = await generalFunction.fetchProcesses(value);
        setPopupProcesses(processesData);
    };

    const handlePopupProcessChange = (e) => {
        const { value } = e.target;
        setSelectedPopupProcess(value);
    };

    async function addProcessParameterMapping() {
        const { error } = await supabase
            .from('parameter_process_mapping')
            .insert([{ process_id: selectedPopupProcess, parameter_id: parameterProcessData[0]?.parameter_id, active: true }]);

        if (error) {
            console.error(error);
            return;
        }

        // Fetch updated data
        fetchProcessParameterData(parameterProcessData[0]?.parameter_id);
    }

    async function deleteProcessParameterMapping(mappingId) {
        const { error } = await supabase
            .from('parameter_process_mapping')
            .delete()
            .eq('id', mappingId);

        if (error) {
            console.error(error);
            return;
        }

        // Fetch updated data
        const parameterId = parameterProcessData.find(mapping => mapping.id === mappingId)?.parameter_id;
        fetchProcessParameterData(parameterId);
    }

    const handleInputChange = (e, setData) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const addProcessFacilityMapping = () => {
        const temp_facilityName = facilities.find(facility => facility.facility_id === Number(selectedFacility))?.facility_name;
        const temp_processName = processes.find(process => process.process_id === Number(selectedProcess))?.process_name;
        setNewParameterData(prevData => ({
            ...prevData,
            processFacilityMappings: [...prevData.processFacilityMappings, { facility_id: selectedFacility, process_id: selectedProcess, facility_name: temp_facilityName, process_name: temp_processName }]
        }));
        setSelectedFacility('');
        setSelectedProcess('');
    };

    const removeProcessFacilityMapping = (index) => {
        setNewParameterData(prevData => ({
            ...prevData,
            processFacilityMappings: prevData.processFacilityMappings.filter((_, i) => i !== index),
        }));
    };

    async function createParameter() {
        const userId = localStorage.getItem('varaUserId');
        setLoading(true);
        setButtonColor('bg-yellow-500');

        const { data, error } = await supabase
            .from('parameter')
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

        const parameterProcessMappings = newParameterData.processFacilityMappings.map(mapping => ({ parameter_id: parameterId, process_id: mapping.process_id, active: true }));
        if (parameterProcessMappings.length > 0) {
            const { error: mappingError } = await supabase
                .from('parameter_process_mapping')
                .insert(parameterProcessMappings);

            if (mappingError) {
                console.error(mappingError);
                setButtonColor('bg-red-500');
                setLoading(false);
                setTimeout(() => {
                    setButtonColor('bg-blue-500');
                }, 2000);
                return;
            }

            setButtonColor('bg-green-500');
            setLoading(false);
            setTimeout(() => {
                setButtonColor('bg-blue-500');
                handleCloseParameterPopup();
            }, 2000);
        }
    }

    const renderTable = () => {
        const facilities = Object.keys(tableData);
        if (facilities.length === 0) return <p>No data available</p>;

        const parameters = new Map();
        facilities.forEach(facility => {
            Object.values(tableData[facility].processes).forEach(processData => {
                Object.entries(processData.parameters).forEach(([parameter, value]) => {
                    parameters.set(parameter, value.para_id);
                });
            });
        });

        return (
            <table className="metrics-table">
                <thead>
                    <tr>
                        <th>Parameter</th>
                        {facilities.map(facility => (
                            <th key={facility} colSpan={Object.keys(tableData[facility].processes).length} className="text-center">
                                {facility}
                            </th>
                        ))}
                    </tr>
                    <tr>
                        <th></th>
                        {facilities.map(facility =>
                            Object.keys(tableData[facility].processes).map(process => (
                                <th key={`${facility}-${process}`} className="text-center">
                                    {process}
                                </th>
                            ))
                        )}
                    </tr>
                </thead>
                <tbody>
                {Array.from(parameters.entries()).map(([parameter, para_id]) => (
                    <tr key={parameter}>
                        <td onClick={() => openProcessParameterPopup(para_id)} className="cursor-pointer text-blue-500 hover:underline">
                            {parameter}
                        </td>
                        {facilities.map(facility =>
                            Object.keys(tableData[facility].processes).map(process => {
                                const { process_id } = tableData[facility].processes[process];
                                const cellValue = tableData[facility].processes[process].parameters[parameter]?.total_value || '-';
                                return (
                                    <td key={`${facility}-${process}-${parameter}`} className="text-center">
                                        {cellValue !== undefined ? (
                                            <Link to={`/data_collection/${para_id}/${process_id}`} className="text-blue-500 hover:underline">
                                                {cellValue}
                                            </Link>
                                        ) : (
                                            '-'
                                        )}
                                    </td>
                                );
                            })
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
                    {renderTable()}
                    <button onClick={handleOpenParameterPopup} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Add Parameter
                    </button>

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
                                            onChange={(e) => handleInputChange(e, setNewParameterData)}
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
                                            onChange={(e) => handleInputChange(e, setNewParameterData)}
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
                    {isProcessParameterPopupOpen && (
                        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded-lg">
                                <h2 className="text-lg font-bold mb-4">Process Parameter Details</h2>
                                <table className="mt-4 w-full border-collapse border border-gray-300">
                                    <thead>
                                        <tr>
                                            <th className="border border-gray-300">Facility</th>
                                            <th className="border border-gray-300">Process</th>
                                            <th className="border border-gray-300">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {parameterProcessData.map((mapping, index) => (
                                            <tr key={index}>
                                                <td className="border border-gray-300">{mapping.process.facility.facility_name}</td>
                                                <td className="border border-gray-300">{mapping.process.process_name}</td>
                                                <td className="border border-gray-300">
                                                    <Button
                                                        label="Delete"
                                                        handleFunction={() => deleteProcessParameterMapping(mapping.id)}
                                                        additionalClasses="bg-red-500"
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="form-group">
                                    <label htmlFor="popup-facility">Facility</label>
                                    <select
                                        id="popup-facility"
                                        name="popup-facility"
                                        value={selectedPopupFacility}
                                        onChange={handlePopupFacilityChange}
                                    >
                                        <option value="">Select a facility</option>
                                        {popupFacilities.map(facility => (
                                            <option key={facility.facility_id} value={facility.facility_id}>
                                                {facility.facility_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="popup-process">Process</label>
                                    <select
                                        id="popup-process"
                                        name="popup-process"
                                        value={selectedPopupProcess}
                                        onChange={handlePopupProcessChange}
                                    >
                                        <option value="">Select a process</option>
                                        {popupProcesses.map(process => (
                                            <option key={process.process_id} value={process.process_id}>
                                                {process.process_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <Button
                                    label="Add Process-Parameter Mapping"
                                    handleFunction={addProcessParameterMapping}
                                    additionalClasses="bg-blue-500 mt-4"
                                />
                                <div className="flex justify-end mt-4">
                                    <Button
                                        label="Close"
                                        handleFunction={closeProcessParameterPopup}
                                        additionalClasses="bg-gray-300"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
