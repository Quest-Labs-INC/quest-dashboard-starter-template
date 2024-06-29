import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../Common/AppContext";
import Button from '../Common/CommonComponents/Button';
import './manage-users.css';
import { generalFunction } from "../../assets/Config/generalFunction";
import Popup from "../Common/CommonComponents/PopUp";

export default function ManageUsers() {
    const { theme, bgColors, appConfig } = useContext(ThemeContext);
    const [Users, setUsers] = useState([]);
    const [AllUsers, setAllUsers] = useState([]);
    const [newUser, setNewUser] = useState({ role: '', user_id: '', status: false, access_till: '', assigned_by: '' });
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [userAccessPopup, setUserAccessPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [facilities, setFacilities] = useState([]);
    const [processes, setProcesses] = useState([]);
    const [parameters, setParameters] = useState([]);
    const [selectedFacility, setSelectedFacility] = useState('');
    const [selectedProcess, setSelectedProcess] = useState('');
    const [selectedParameter, setSelectedParameter] = useState('');
    const [userAccessData, setUserAccessData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [dataCollectionPoints, setDataCollectionPoints] = useState([]);
    const [selectedDataCollectionPoint, setSelectedDataCollectionPoint] = useState('');

    const roles = ["OWNER", "ADMIN", "TEAM MANAGER", "FIELD MANAGER"];

    useEffect(() => {
        fetchUsers();
        fetchAllUsers();
        fetchParameters();
    }, []);

    async function fetchUsers() {
        try {
            setLoading(true);
            const data = await generalFunction.fetchUserPermissions();
            setUsers(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function fetchDataCollectionPoints(processId) {
        try {
            const data = await generalFunction.fetchDataCollectionPoints(selectedParameter, processId);
            setDataCollectionPoints(data);
        } catch (error) {
            setError(error.message);
        }
    }

    async function fetchAllUsers() {
        try {
            setLoading(true);
            const data = await generalFunction.fetchAllUsers();
            setAllUsers(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function fetchFacilities() {
        try {
            const data = await generalFunction.fetchFacilities();
            setFacilities(data);
        } catch (error) {
            setError(error.message);
        }
    }

    async function fetchProcesses(facilityId) {
        try {
            const data = await generalFunction.fetchProcesses(facilityId);
            setProcesses(data);
        } catch (error) {
            setError(error.message);
        }
    }

    async function fetchParameters() {
        try {
            const data = await generalFunction.fetchParameters();
            setParameters(data);
        } catch (error) {
            setError(error.message);
        }
    }

    const handleInputChange = (e, userSetter) => {
        const { name, value } = e.target;
        userSetter(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddUser = async () => {
        try {
            await generalFunction.addUserPermission(newUser);
            await fetchUsers();
            resetNewUser();
            setIsPopupOpen(false);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleAddUserAccess = async () => {
        if (!selectedDataCollectionPoint || !selectedProcess || !selectedUser.user_id) {
            setError("Please select all required fields.");
            return;
        }
        
        try {
            await generalFunction.createTableRow('user_data_access', {
                user_id: selectedUser.user_id,
                data_collection_id: selectedDataCollectionPoint,
                process_id: selectedProcess,
            });
            fetchUserAccessData(selectedUser);
            setUserAccessPopup(false);
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchUserAccessData = async (user) => {
        try {
            const data = await generalFunction.fetchUserAccessData(user.user_id);
            setUserAccessData(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleCellClick = (row) => {
        setSelectedUser(row);
        fetchUserAccessData(row);
        setUserAccessPopup(true);
        fetchFacilities();
    };

    const resetNewUser = () => {
        setNewUser({ role: '', user_id: '', status: false, access_till: '', assigned_by: '' });
    };

    const handleSaveUserDetails = async (user) => {
        try {
            const data = await generalFunction.updateUserPermission(user.id, user.role);
            fetchUsers();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEditUser = (index, field, value) => {
        setUsers(prevUsers => {
            const updatedUsers = [...prevUsers];
            updatedUsers[index] = { ...updatedUsers[index], [field]: value };
            return updatedUsers;
        });
    };

    return (
        <div className="relative flex flex-col justify-center overflow-hidden mt-20">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-black-600/40 lg:max-w-4xl">
                <h1 className="text-2xl text-center mb-4">User Management</h1>
                <div className="container mx-auto">
                    
                    {error && <p className="text-red-500">{error}</p>}
                    <table className="mt-4 w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">User Name</th>
                                <th className="border border-gray-300 px-4 py-2">Role</th>
                                <th className="border border-gray-300 px-4 py-2">Status</th>
                                <th className="border border-gray-300 px-4 py-2">Access Till</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Users.map((user, index) => (
                                <tr key={index}>
                                    <td 
                                        className="border border-gray-300 px-4 py-2 cursor-pointer"
                                        onClick={() => handleCellClick(user)}
                                    >
                                        {user.user_name}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleEditUser(index, 'role', e.target.value)}
                                        >
                                            {roles.map(role => (
                                                <option key={role} value={role}>
                                                    {role}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <select
                                            value={user.status}
                                            onChange={(e) => handleEditUser(index, 'status', e.target.value)}
                                        >
                                            <option value={true}>Active</option>
                                            <option value={false}>Inactive</option>
                                        </select>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <input
                                            type="date"
                                            value={user.access_till ? new Date(user.access_till).toISOString().split('T')[0] : ''}
                                            onChange={(e) => handleEditUser(index, 'access_till', e.target.value)}
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <Button
                                            label="Save"
                                            handleFunction={() => handleSaveUserDetails(user)}
                                            className="bg-green-500 text-white rounded hover:bg-green-600"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Button
                        label="Add User"
                        handleFunction={() => setIsPopupOpen(true)}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    />
                </div>
            </div>

            {isPopupOpen && (
                <Popup
                    title="Add New User"
                    fields={[
                        { id: 'user_id', label: 'User', type: 'select', options: AllUsers.filter(user => user.name).map(user => ({ value: user.id, label: `${user.name}` })) },
                        { id: 'role', label: 'Role', type: 'select', options: roles.map(role => ({ value: role, label: role })) },
                        { id: 'status', label: 'Status', type: 'select', options: [{ value: false, label: 'Inactive' }, { value: true, label: 'Active' }] },
                        { id: 'access_till', label: 'Access Till', type: 'date' },
                        { id: 'assigned_by', label: 'Assigned by', type: 'select', options: AllUsers.filter(user => user.name).map(user => ({ value: user.id, label: `${user.name}` })) },
                    ]}
                    newRowData={newUser}
                    handleInputChange={(e) => handleInputChange(e, setNewUser)}
                    handleClosePopup={() => setIsPopupOpen(false)}
                    handleSave={handleAddUser}
                />
            )}

            {userAccessPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2 className="popup-title">{selectedUser.user_name}</h2>
                        <p>Role - {selectedUser.role}</p>
                        <table className="mt-4 w-full border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">Facility</th>
                                    <th className="border border-gray-300 px-4 py-2">Process</th>
                                    <th className="border border-gray-300 px-4 py-2">Parameter</th>
                                    <th className="border border-gray-300 px-4 py-2">Data Collection Point</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userAccessData.map((access, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 px-4 py-2">{access.facility_name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{access.process_name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{access.parameter_name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{access.data_collection_point_name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="form-group">
                            <label htmlFor="parameter">Parameter</label>
                            <select
                                id="parameter"
                                name="parameter"
                                value={selectedParameter}
                                onChange={(e) => {
                                    setSelectedParameter(e.target.value);
                                    
                                }}
                            >
                                <option value="">Select a parameter</option>
                                {parameters.map(parameter => (
                                    <option key={parameter.para_id} value={parameter.para_id}>
                                        {parameter.para_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="facility">Facility</label>
                            <select
                                id="facility"
                                name="facility"
                                value={selectedFacility}
                                onChange={(e) => {
                                    setSelectedFacility(e.target.value);
                                    fetchProcesses(e.target.value);
                                    
                                }}
                            >
                                <option value="">Select a facility</option>
                                {facilities.map(facility => (
                                    <option key={facility.facility_id} value={facility.facility_id}>
                                        {facility.facility_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="process">Process</label>
                            <select
                                id="process"
                                name="process"
                                value={selectedProcess}
                                onChange={(e) => {
                                    setSelectedProcess(e.target.value);
                                    fetchDataCollectionPoints( e.target.value);  // Fetch data collection points based on selected parameter
                                }}
                            >
                                <option value="">Select a process</option>
                                {processes.map(process => (
                                    <option key={process.process_id} value={process.process_id}>
                                        {process.process_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="dataCollectionPoint">Data Collection Point</label>
                            <select
                                id="dataCollectionPoint"
                                name="dataCollectionPoint"
                                value={selectedDataCollectionPoint}
                                onChange={(e) => setSelectedDataCollectionPoint(e.target.value)}
                            >
                                <option value="">Select a data collection point</option>
                                {dataCollectionPoints.map(point => (
                                    <option key={point.id} value={point.id}>
                                        {point.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <Button
                            label="Add Access"
                            handleFunction={handleAddUserAccess}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        />
                        <Button
                            label="Close"
                            handleFunction={() => setUserAccessPopup(false)}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
