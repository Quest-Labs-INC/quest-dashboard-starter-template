import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../Common/AppContext";
import { supabase } from '../../supabaseClient';
import Button from '../Common/CommonComponents/Button';
import './manage-users.css';

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

    useEffect(() => {
        fetchUsers();
        fetchAllUsers();
        fetchParameters();  // Fetch all parameters once
    }, []);

    async function fetchUsers() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('user_permissions')
                .select(`
                    id,
                    role,
                    status,
                    access_till,
                    user_id,
                    assigned_by,
                    user:user_id(id, email, name),
                    assigned_user:assigned_by(id, name)
                `);
            if (error) throw error;
            setUsers(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function fetchAllUsers() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('users')
                .select('id, name, email');
            if (error) throw error;
            setAllUsers(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function fetchFacilities() {
        try {
            const { data, error } = await supabase
                .from('facility')
                .select('facility_id, facility_name');
            if (error) throw error;
            setFacilities(data);
        } catch (error) {
            setError(error.message);
        }
    }

    async function fetchProcesses(facilityId) {
        try {
            const { data, error } = await supabase
                .from('process')
                .select('process_id, process_name')
                .eq('facility_id', facilityId);
            if (error) throw error;
            setProcesses(data);
        } catch (error) {
            setError(error.message);
        }
    }

    async function fetchParameters() {
        try {
            const { data, error } = await supabase
                .from('parameter')
                .select('para_id, para_name');
            if (error) throw error;
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
            const { error } = await supabase
                .from('user_permissions')
                .insert([newUser])
                .select('*');
            if (error) throw error;
            await fetchUsers();
            resetNewUser();
            setIsPopupOpen(false);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleAddUserAccess = async () => {
        try {
            const { error } = await supabase
                .from('user_data_access')
                .insert({
                    user_id: selectedUser.user_id,
                    parameter_id: selectedParameter,
                    process_id: selectedProcess,
                });
            if (error) throw error;
            fetchUserAccessData(selectedUser);
            setUserAccessPopup(false);
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchUserAccessData = async (user) => {
        try {
            const { data, error } = await supabase
                .from('user_data_access')
                .select(`
                    *,
                    process:process_id (
                        process_name,
                        facility:facility_id (
                            facility_name
                        )
                    ),
                    parameter:parameter_id (
                        para_name
                    )
                `)
                .eq('user_id', user.user_id);
            if (error) throw error;
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

    return (
        <div className="relative flex flex-col justify-center overflow-hidden mt-20">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-black-600/40 lg:max-w-4xl">
                <h1 className="text-2xl text-center mb-4">User Management</h1>
                <div className="container mx-auto">
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <table className="mt-4 w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">User Name</th>
                                <th className="border border-gray-300 px-4 py-2">Role</th>
                                <th className="border border-gray-300 px-4 py-2">Status</th>
                                <th className="border border-gray-300 px-4 py-2">Access Till</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Users.map((user, index) => (
                                <tr key={index}>
                                    <td 
                                        className="border border-gray-300 px-4 py-2 cursor-pointer"
                                        onClick={() => handleCellClick(user)}
                                    >
                                        {user.user.name}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <span className={`status-circle ${user.status ? 'status-active' : 'status-inactive'}`}></span>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{new Date(user.access_till).toLocaleString()}</td>
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
                <div className="popup">
                    <div className="popup-content">
                        <h2 className="popup-title">Add New User</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="form-group">
                                <label htmlFor="role">Role</label>
                                <input
                                    type="text"
                                    id="role"
                                    name="role"
                                    value={newUser.role}
                                    onChange={(e) => handleInputChange(e, setNewUser)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="user_id">User</label>
                                <select
                                    id="user_id"
                                    name="user_id"
                                    value={newUser.user_id}
                                    onChange={(e) => handleInputChange(e, setNewUser)}
                                >
                                    <option value="">Select a user</option>
                                    {AllUsers.map(user => (
                                        <option key={user.id} value={user.id}>
                                            {user.name} ({user.email})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={newUser.status}
                                    onChange={(e) => handleInputChange(e, setNewUser)}
                                >
                                    <option value={false}>Inactive</option>
                                    <option value={true}>Active</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="access_till">Access Till</label>
                                <input
                                    type="datetime-local"
                                    id="access_till"
                                    name="access_till"
                                    value={newUser.access_till}
                                    onChange={(e) => handleInputChange(e, setNewUser)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="assigned_by">Assigned_by</label>
                                <select
                                    id="assigned_by"
                                    name="assigned_by"
                                    value={newUser.assigned_by}
                                    onChange={(e) => handleInputChange(e, setNewUser)}
                                >
                                    <option value="">Select a user</option>
                                    {AllUsers.map(user => (
                                        <option key={user.id} value={user.id}>
                                            {user.name} ({user.email})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="button-group">
                                <button onClick={() => setIsPopupOpen(false)} className="button-secondary">
                                    Cancel
                                </button>
                                <button onClick={handleAddUser} className="button-primary">
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {userAccessPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2 className="popup-title">{selectedUser.user.name}</h2>
                        <p>Role - {selectedUser.role}</p>
                        <table className="mt-4 w-full border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">Facility</th>
                                    <th className="border border-gray-300 px-4 py-2">Process</th>
                                    <th className="border border-gray-300 px-4 py-2">Parameter</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userAccessData.map((access, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 px-4 py-2">{access.process.facility.facility_name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{access.process.process_name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{access.parameter.para_name}</td>
                                    </tr>
                                ))}  
                            </tbody>
                        </table>
                        
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
                            <label htmlFor="parameter">Parameter</label>
                            <select
                                id="parameter"
                                name="parameter"
                                value={selectedParameter}
                                onChange={(e) => setSelectedParameter(e.target.value)}
                            >
                                <option value="">Select a parameter</option>
                                {parameters.map(parameter => (
                                    <option key={parameter.para_id} value={parameter.para_id}>
                                        {parameter.para_name}
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


