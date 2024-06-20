import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { generalFunction } from '../../assets/Config/generalFunction';
import Table from '../Common/CommonComponents/Table';
import Button from '../Common/CommonComponents/Button';
import PopUp from '../Common/CommonComponents/PopUp';

export default function DataEntryDetails() {
    const location = useLocation();
    const { access } = location.state;
    const [userDataEntry, setUserDataEntry] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newEntry, setNewEntry] = useState({ date: '', value: '', evidenceFile: null, evidence_url: ''});

    useEffect(() => {
        fetchDataEntry();
    }, []);

    async function fetchDataEntry() {
        try {
            const userId = 35;  
            const processId = parseInt(access.process.process_id, 10);
            const parameterId = parseInt(access.parameter.para_id, 10);

            const data = await generalFunction.fetchUserDataEntry(userId, processId, parameterId);
            setUserDataEntry(data);
        } catch (error) {
            console.log("Error fetching data: ", error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEntry(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewEntry(prevData => ({
            ...prevData,
            evidenceFile: file,
        }));
    };

    const handleSaveNewEntry = async () => {
        try {
            const userId = 35;  
            const processId = parseInt(access.process.process_id, 10);
            const parameterId = parseInt(access.parameter.para_id, 10);

            const data = await generalFunction.createUserDataEntry(userId, processId, parameterId, newEntry);
            setIsPopupOpen(false);

            fetchDataEntry();
        } catch (error) {
            console.log("Error saving new entry: ", error);
        }
    };

    const tableFields = [
        { id: 'value', label: 'Value' },
        { id: 'log_date', label: 'Log Date' },
        { id: 'evidence', label: 'Evidence' },
        { id: 'status', label: 'Status' }
    ];

    return (
        <div className="relative flex flex-col justify-center overflow-hidden mt-20">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-black-600/40 lg:max-w-4xl">
                <h1 className="text-2xl text-center mb-4">Data Entry Details</h1>
                <div className="flex justify-between items-center">
                    <label className="text-md font-mdm">Facility: {access.process.facility.facility_name}</label>
                </div>
                <div className="flex justify-between items-center">
                    <label className="text-md font-mdm">Process: {access.process.process_name}</label>
                </div>
                <div className="flex justify-between items-center">
                    <label className="text-md font-mdm">Parameter: {access.parameter.para_name}</label>
                </div>
                <Table
                    fields={tableFields}
                    tableData={userDataEntry.map(entry => ({
                        value: entry.value,
                        log_date: new Date(entry.log_date).toLocaleString(),
                        evidence: entry.evidence_url ? <a href={entry.evidence_url} target="_blank" rel="noopener noreferrer">View</a> : '',
                        status: 'Approved' 
                    }))}
                />
                <Button
                    label="New Entry Form"
                    handleFunction={() => setIsPopupOpen(true)}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                />
                <Button
                    label="Back"
                    handleFunction={() => window.history.back()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                />
            </div>

            {isPopupOpen && (
                <PopUp
                    title="New Data Entry"
                    fields={[
                        { id: 'date', label: 'Date', type: 'date' },
                        { id: 'value', label: 'Value', type: 'text' },
                        { id: 'evidenceFile', label: 'Evidence', type: 'file', handleFileChange: handleFileChange },
                    ]}
                    newRowData={newEntry}
                    handleInputChange={handleInputChange}
                    handleClosePopup={() => setIsPopupOpen(false)}
                    handleSave={handleSaveNewEntry}
                    button1Label="Close"
                    button2Label="Submit"
                    validationErrors={{}}
                />
            )}
        </div>
    );
}
