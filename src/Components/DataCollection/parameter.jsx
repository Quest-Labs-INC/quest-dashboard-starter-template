import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Link, useParams } from 'react-router-dom';
import Table from '../Common/CommonComponents/Table';

export default function Parameter() {
    const [tableData, setTableData] = useState([]);
    const { parameter } = useParams();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [facilities, setFacilities] = useState([]);
    const [selectedFacility, setSelectedFacility] = useState(null);
    const [processes, setProcesses] = useState([]);
    const [selectedProcess, setSelectedProcess] = useState(null);
    const [loadingFacilities, setLoadingFacilities] = useState(true);
    const [loadingProcesses, setLoadingProcesses] = useState(false);
    const [collectionData, setCollectionData] = useState([]);

    const tableFields = [
        { id: 'point_name', label: 'Point Name' },
        { id: 'point_method', label: 'Method' },
        { id: 'user_name', label: 'User Name' }
    ];

    async function fetchFacilities() {
        const { data, error } = await supabase.from('facility').select('*');
        if (error) {
            console.error(error);
        } else {
            setFacilities(data);
        }
        setLoadingFacilities(false);
    }

    async function fetchProcesses(facilityId) {
        setLoadingProcesses(true);
        const { data, error } = await supabase.from('process').select('*').eq('facility_id', facilityId);
        if (error) {
            console.error(error);
        } else {
            setProcesses(data);
        }
        setLoadingProcesses(false);
    }

    async function fetchParameterData(processId) {
        const { data, error } = await supabase.rpc('dc_points', { process: processId , param : parameter});
        if (error) {
            console.error(error);
        } else {
            setCollectionData(data);
        }
    }

    useEffect(() => {
        fetchFacilities();
    }, []);

    useEffect(() => {
        if (selectedProcess) {
            fetchParameterData(selectedProcess);
        }
    }, [selectedProcess]);

    return (
        <div className="relative flex flex-col justify-center overflow-hidden mt-20">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-black-600/40 lg:max-w-4xl">
                <h1 className="text-2xl text-center mb-4">Parameter</h1>
                <div className="container mx-auto">
                    <div className="flex flex-row justify-between">
                        <div>
                            <label htmlFor="facility" className="block text-sm font-medium text-gray-700">Facility</label>
                            <select
                                id="facility"
                                name="facility"
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                onChange={(e) => {
                                    const facilityId = e.target.value;
                                    setSelectedFacility(facilityId);
                                    fetchProcesses(facilityId);
                                }}
                            >
                                <option value="">Select a facility</option>
                                {!loadingFacilities && facilities.map((facility) => (
                                    <option key={facility.facility_id} value={facility.facility_id}>
                                        {facility.facility_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="process" className="block text-sm font-medium text-gray-700">Process</label>
                            <select
                                id="process"
                                name="process"
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                onChange={(e) => {
                                    setSelectedProcess(e.target.value);
                                }}
                                disabled={!selectedFacility || loadingProcesses}
                            >
                                <option value="">Select a process</option>
                                {!loadingProcesses && processes.map((process) => (
                                    <option key={process.process_id} value={process.process_id}>
                                        {process.process_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-xl">Data Collection Points</h2>
                        <table className = "border-separate border-spacing-0 border rounded-md shadow">
                            <thead>
                                <tr>
                                    {tableFields.map((field) => (
                                    <th key={field.id} className="font-medium px-4 py-2">
                                        {field.label}
                                    </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                            {collectionData.map((row, index) => (
                                <tr key={index}>
                                    {tableFields.map((field) => (
                                    <td key={field.id} className="border px-4 py-2">
                                        <Link to={`/data_collection/${parameter}/${row.point_id}`}>{row[field.id]}</Link>
                                    </td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>   
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
