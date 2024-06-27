import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generalFunction } from '../../assets/Config/generalFunction';
import Button from '../Common/CommonComponents/Button';

export default function DataEntry() {
    const [userAccessData, setUserAccessData] = useState([]);
    const navigate = useNavigate();
    

    useEffect(() => {
        fetchUserAccessData();
    }, []);

    async function fetchUserAccessData() {
        try {
            const userId = localStorage.getItem('varaUserId');
            const data = await generalFunction.fetchUserAccessData(userId);
            setUserAccessData(data);
        } catch (error) {
            console.log("Error fetching data: ", error);
        }
    }

    const handleRowClick = (access) => {
        navigate('/data_entry_details', { state: { access } });
    }

    return (
        <div className="relative flex flex-col justify-center overflow-hidden mt-20">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-black-600/40 lg:max-w-4xl">
                <h1 className="text-2xl text-center mb-4">Data Entry</h1>
                {userAccessData.length > 0 && (
                    <h1 className="text-2xl text-center mb-4">Welcome {userAccessData[0].user_name}</h1>
                )}

                <table className="mt-4 w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Facility</th>
                            <th className="border border-gray-300 px-4 py-2">Process</th>
                            <th className="border border-gray-300 px-4 py-2">Parameter</th>
                            <th className="border border-gray-300 px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {userAccessData.map((access, index) => (
                            <tr 
                                key={index} 
                                onClick={() => handleRowClick(access)} 
                                className="cursor-pointer hover:bg-gray-100 transition"
                            >
                                <td className="border border-gray-300 px-4 py-2">{access.facility_name}</td>
                                <td className="border border-gray-300 px-4 py-2">{access.process_name}</td>
                                <td className="border border-gray-300 px-4 py-2">{access.parameter_name}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center text-blue-500">
                                    &gt;
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
