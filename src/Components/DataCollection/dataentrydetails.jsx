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
            const userId = localStorage.getItem('varaUserId');
            const processId = parseInt(access.process_id, 10);
            const parameterId = parseInt(access.parameter_id, 10);
            const data_collection_id = parseInt(access.data_collection_id, 10);

            const data = await generalFunction.fetchUserDataEntry(userId, processId, parameterId, data_collection_id);

            // Fetch signed URLs for evidence files if they exist
            const entriesWithSignedUrls = await Promise.all(data.map(async entry => {
                if (entry.evidence_url) {
                    const signedUrl = await generalFunction.getSignedUrl(entry.evidence_url);
                    return { ...entry, signedUrl };
                }
                return entry;
            }));

            setUserDataEntry(entriesWithSignedUrls);
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

    // Need to replace hard coded userId with actual userId from Local Storage
    const handleSaveNewEntry = async () => {
        try {
            const userId = access.userId;  
            const processId = parseInt(access.process_id, 10);
            const parameterId = parseInt(access.parameter_id, 10);
            const data_collection_id = parseInt(access.data_collection_id, 10);

            await generalFunction.createUserDataEntry(userId, processId, parameterId, data_collection_id, newEntry);
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
                <h1 className="text-2xl text-center mb-6">Data Entry Details</h1>
                
                <div className="flex flex-col space-y-1 mb-8">
                    <div className="flex justify-between items-center">
                        <label className="p-1 text-md font-mdm">Facility: {access.facility_name}</label>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <label className="p-1 text-md font-mdm">Process: {access.process_name}</label>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <label className="p-1 text-md font-mdm">Parameter: {access.parameter_name}</label>
                    </div>
                </div>

                <div className="mb-8">
                    <Table
                        fields={tableFields}
                        tableData={userDataEntry.map(entry => ({
                            value: entry.value,
                            log_date: new Date(entry.log_date).toLocaleDateString(),
                            evidence: entry.signedUrl ? <a href={entry.signedUrl.signedUrl} target="_blank" rel="noopener noreferrer">View</a> : '',
                            status: 'Approved' 
                        }))}
                    />
                </div>

                <div className="flex justify-between space-x-1">
                    <Button
                        label="New Entry Form"
                        handleFunction={() => setIsPopupOpen(true)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    />
                    
                    <Button
                        label="Back"
                        handleFunction={() => window.history.back()}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    />
                </div>
            </div>

            {isPopupOpen && (
                <PopUp
                    title="New Data Entry"
                    fields={[
                        { id: 'date', label: 'Date', type: 'date' },
                        { id: 'value', label: 'Value', type: 'text' },
                        { id: 'evidenceFile', label: 'Evidence', type: 'file' },
                    ]}
                    newRowData={newEntry}
                    handleInputChange={handleInputChange}
                    handleFileChange={handleFileChange} 
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
