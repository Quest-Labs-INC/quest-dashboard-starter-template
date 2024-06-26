import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Link, useParams } from 'react-router-dom';
import Table from '../Common/CommonComponents/Table';
import PopUp from '../Common/CommonComponents/PopUp';
import Button from '../Common/CommonComponents/Button';
import { generalFunction } from '../../assets/Config/generalFunction';

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
    const [parameterData, setParameterData] = useState([]);
    const [popupFields, setPopupFields] = useState([]);

    const tableFields = [
        { id: 'point_name', label: 'Point Name' },
        { id: 'point_method', label: 'Method' },
        { id: 'user_name', label: 'User Name' }
    ];

    useEffect(() => {
        const fetchFacilities = async () => {
            setLoadingFacilities(true);
            const company_id = await generalFunction.getCompanyId();
            const { data, error } = await supabase.from('facility').select('*').eq('company_id', company_id);
            if (error) {
                console.error(error);
            } else {
                setFacilities(data);
            }
            setLoadingFacilities(false);
        };

        fetchFacilities();
    }, []);

    useEffect(() => {
        if (!selectedFacility) return;

        const fetchProcesses = async (facilityId) => {
            setLoadingProcesses(true);
            const { data, error } = await supabase.from('process').select('*').eq('facility_id', facilityId);
            if (error) {
                console.error(error);
            } else {
                setProcesses(data);
            }
            setLoadingProcesses(false);
        };

        fetchProcesses(selectedFacility);
    }, [selectedFacility]);

    useEffect(() => {
        if (!selectedProcess) return;

        const fetchParameterData = async (processId) => {
            const { data, error } = await supabase.rpc('dc_points', { process: processId, param: parameter });
            if (error) {
                console.error(error);
            } else {
                setCollectionData(data);
            }
        };

        fetchParameterData(selectedProcess);
    }, [selectedProcess]);

    const handleCellClick = async (row) => {
        setIsPopupOpen(true);
        
        const { data, error } = await supabase
            .from('data_collection_points')
            .select(`
                *,
                parameter_log(value, log_date),
                users(name)
            `)
            .eq('name', row.point_name);

        if (error) {
            console.error(error);
        } else {
            const processedData = {
                ...data[0],
                user_name: data[0].users.name
            };
            setParameterData(processedData);
            setPopupFields([
                { id: 'name', label: 'Name' },
                { id: 'method', label: 'Method' },
                { id: 'user_name', label: 'User Name' },
                { id: 'parameter_log', label: 'Parameter Log', type: 'table', tableFields: [{ id: 'value', label: 'Value' }, { id: 'log_date', label: 'Log Date' }] }
            ]);
        }
    }

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setParameterData([]);
    };

    return (
        <div className="relative flex flex-col justify-center overflow-hidden mt-20">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-black-600/40 lg:max-w-4xl">
                <h1 className="text-2xl text-center mb-4">Parameter</h1>
                <div className="container mx-auto">
                    <div className="flex flex-row justify-between">
                        <div>
                            <h2 className="text-xl">Facilities</h2>
                            <div className="flex space-x-4">
                                {!loadingFacilities && facilities.map((facility) => (
                                    <Button
                                        key={facility.facility_id}
                                        label={facility.facility_name}
                                        handleFunction={() => {
                                            setSelectedFacility(facility.facility_id);
                                            fetchProcesses(facility.facility_id);
                                        }}
                                        isSelected={selectedFacility === facility.facility_id}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl">Processes</h2>
                        <div className="flex space-x-4">
                            {!loadingProcesses && processes.map((process) => (
                                <Button
                                    key={process.process_id}
                                    label={process.process_name}
                                    handleFunction={() => setSelectedProcess(process.process_id)}
                                    isSelected={selectedProcess === process.process_id}
                                    disabled={!selectedFacility}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-xl">Data Collection Points</h2>
                        <table className="border-separate border-spacing-0 border rounded-md shadow">
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
                                            <td
                                                key={field.id}
                                                className="border px-4 py-2 cursor-pointer"
                                                onClick={() => handleCellClick(row)}
                                            >
                                                {row[field.id]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {isPopupOpen && (
                        <PopUp
                            title="Parameter Data"
                            fields={popupFields}
                            newRowData={parameterData}
                            handleClosePopup={handleClosePopup}
                            readOnly={true}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}