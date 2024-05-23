// import react features to control states + use effects + use links
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import database
import { supabase } from '../../supabaseClient';

// declare + export Certification component
export default function Certification() {
  // tableData - state var that keeps track of all data in table, initially empty array
  // setTableData - function used to update tableData
  const [tableData, setTableData] = useState([]);
  // isPopupOpen - state var that keeps track if popup is open or not, initially set to false
  // setIsPopupOpen - function used to update state of isPopupOpen 
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // newRowData - state var that keeps track of new row data, initially an object with props set to empty strings
  // setNewRowData - function that updates newRowData
  const [newRowData, setNewRowData] = useState({ certification: '', status: '', due_date: '', task_assigned: '',  checklist: '' });

  // useEffect - effect that runs once when component mounts
  useEffect(() => {
    // call fetchMeasurement function 
    fetchMeasurement()
  }, []) // <-- '[]' as the dependency array means it runs once

  // async function that fetches data from db
  async function fetchMeasurement() {
    // awaits data collection from all of certification table
    const { data } = await supabase
      .from(`certification`)
      .select('*')
    // sets tableData var to fetched data
    setTableData(data);
  }

  // function that sets isPopupOpen var to true
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  // function that handles when popup is closed
  const handleClosePopup = () => {
    // sets isPopupOpen var to false
    setIsPopupOpen(false);
    // clear input fields when closing the popup
    // creates new row data
    createMeasurement();
    // sets newRowData var obj props to empty strings
    setNewRowData({ certification: '', status: '', due_date: '', task_assigned: '',  checklist: '' });
  };

  // function that handles any changes to input
  const handleInputChange = (e) => {
    // saves name + value from event target
    const { name, value } = e.target;
    // sets NewRo
    setNewRowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // function that adds new rows to tableData
  const handleAddRow = () => {
    setTableData((prevData) => [...prevData, newRowData]);
    handleClosePopup();
  };

  // function that creates new row in db
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

