import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

export default function Certification() {
  const [tableData, setTableData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({ certification: '', status: '', due_date: '', task_assigned: '',  checklist: '' });

  useEffect(() => {
    fetchMeasurement()
  }, [])

  async function fetchMeasurement() {
    const { data } = await supabase
      .from(`certification`)
      .select('*')
    setTableData(data);
  }

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    // Clear input fields when closing the popup
    createMeasurement();
    setNewRowData({ certification: '', status: '', due_date: '', task_assigned: '',  checklist: '' });
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

  async function createMeasurement() {
    await supabase
      .from(`certification`)
      .insert({ certification: newRowData.certification, status: newRowData.status , due_date: newRowData.due_date , task_assigned: newRowData.task_assigned , checklist: newRowData.checklist })
  }

  return (
    <div className="relative flex flex-col justify-center overflow-hidden mt-20">
    <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-black-600/40 lg:max-w-4xl">
      <h1 className="text-2xl text-center mb-4">Certifications</h1>
    <div className="container mx-auto">
      <button onClick={handleOpenPopup} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Add Certificate
      </button>
      <table className="mt-4 w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Certification</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Due Date</th>
            <th className="border border-gray-300 px-4 py-2">Task Assigned</th>
            <th className="border border-gray-300 px-4 py-2">Checklist</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">
              <Link to={`/certification/${row.certification}`}>
                {row.certification}
              </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
              <Link to={`/certification/${row.status}`}>
                {row.status}
              </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
              <Link to={`/certification/${row.due_date}`}>
                {row.due_date}
              </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
              <Link to={`/certification/${row.task_assigned}`}>
                {row.task_assigned}
              </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
              <Link to={`/certification/${row.checklist}`}>
                {row.checklist}
              </Link>
              </td>
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
                  Certification
                </label>
                <input
                  type="text"
                  id="certification"
                  name="certification"
                  value={newRowData.certification}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <input
                  type="text"
                  id="status"
                  name="status"
                  value={newRowData.status}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Due Date
                </label>
                <input
                  type="date"
                  id="due_date"
                  name="due_date"
                  value={newRowData.due_date}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Task Assigned
                </label>
                <input
                  type="text"
                  id="task_assigned"
                  name="task_assigned"
                  value={newRowData.task_assigned}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Checklist
                </label>
                <input
                  type="text"
                  id="checklist"
                  name="checklist"
                  value={newRowData.checklist}
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

