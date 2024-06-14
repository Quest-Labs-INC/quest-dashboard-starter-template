import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

export default function DataCollection() {
    const [tableData, setTableData] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newRowData, setNewRowData] = useState({ log_date: '', data: '' });
    const url = window.location.href;
    const parts = url.split('/');
  
    const assigned_to = parts[parts.length - 1];
    const name_ = parts[parts.length - 2];
    const metric = parts[parts.length - 3];

    useEffect(() => {
        fetchDataCollected()
    }, [])

    async function fetchDataCollected() {
        const { data, error } = await supabase
        .from(`datapoint`)
        .select('*')
        .match({ assigned_to: assigned_to, name: name_, metric: metric })
        setTableData(data);
    }

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        // Clear input fields when closing the popup
        createDataPoint()
        setNewRowData({ log_date: '', data: '' });
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

    async function createDataPoint() {
        const { data, error } = await supabase
        .from('datapoint')
        .insert([
            { log_date: newRowData.log_date,  metric: metric, data: newRowData.data, assigned_to: assigned_to, name: name_},
        ])
        .select()
        console.log(data, error)
            
    }


    return (
        <div className="relative flex flex-col justify-center overflow-hidden mt-20">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-black-600/40 lg:max-w-4xl">
        <h1 className="text-2xl text-center mb-4">Data Collection {metric} </h1>
        <div className="container mx-auto">
        <button onClick={handleOpenPopup} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add data
        </button>
        <table className="mt-4 w-full border-collapse border border-gray-300">
            <thead>
            <tr>
                <th className="border border-gray-300 px-4 py-2">Log Date</th>
                <th className="border border-gray-300 px-4 py-2">Data</th>
            </tr>
            </thead>
            <tbody>
            {tableData.map((row, index) => (
                <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{row.log_date}</td>
                <td className="border border-gray-300 px-4 py-2">{row.data}</td>
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
                        Log Date
                    </label>
                    <input
                    type="text"
                    id="log_date"
                    name="log_date"
                    value={newRowData.log_date}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                        Data
                    </label>
                    <input
                    type="text"
                    id="data"
                    name="data"
                    value={newRowData.data}
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
