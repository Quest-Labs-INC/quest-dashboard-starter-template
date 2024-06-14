import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../Common/AppContext";
import { supabase } from '../../supabaseClient';
import './manage-users.css';

export default function ManageUsers() {
    const { theme, bgColors, appConfig } = useContext(ThemeContext);
    const [Users, setUsers] = useState([]);
    const [AllUsers, setAllUsers] = useState([]);  // State to hold all users
    const [newUser, setNewUser] = useState({ role: '', user_id: '', status: false, access_till: '', assigned_by: '' });
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

    useEffect(() => {
        fetchUsers();
        fetchAllUsers();  // Fetch all users on component mount
    }, []);

    async function fetchUsers() {
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

        if (data) {
            setUsers(data);
        } else {
            console.log(error);
        }
    }

    async function fetchAllUsers() {
        const { data, error } = await supabase
            .from('users')
            .select('id, name, email');

        if (data) {
            setAllUsers(data);
        } else {
            console.log(error);
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
        const { data, error } = await supabase
            .from('user_permissions')
            .insert([newUser])
            .select('*');

        if (error) {
            console.error(error);
            return;
        }

        await fetchUsers();
        resetNewUser();
        setIsPopupOpen(false);
    };

    const resetNewUser = () => {
        setNewUser({ role: '', user_id: '', status: false, access_till: '', assigned_by: '' });
    };

    return (
        <div className="relative flex flex-col justify-center overflow-hidden mt-20">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-black-600/40 lg:max-w-4xl">
                <h1 className="text-2xl text-center mb-4">User Management</h1>
                <div className="container mx-auto">
                    <table className="mt-4 w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">ID</th>
                                <th className="border border-gray-300 px-4 py-2">Role</th>
                                <th className="border border-gray-300 px-4 py-2">User Name</th>
                                <th className="border border-gray-300 px-4 py-2">Email</th>
                                <th className="border border-gray-300 px-4 py-2">Status</th>
                                <th className="border border-gray-300 px-4 py-2">Access Till</th>
                                <th className="border border-gray-300 px-4 py-2">Assigned By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Users.map((user, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.user.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.user.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <span className={`status-circle ${user.status ? 'status-active' : 'status-inactive'}`}></span>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{new Date(user.access_till).toLocaleString()}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.assigned_user.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => setIsPopupOpen(true)}
                    >
                        Add User
                    </button>
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
        </div>
    );
}
