import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { generalFunction } from '../../assets/Config/generalFunction'

export default function Compliance() {
  const [tableData, setTableData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({ certification: '', status: '', due_date: '', task_assigned: '',  checklist: '' });

  const fields = [
    { id: 'certification', label: 'Certification', type: 'text' },
    { id: 'status', label: 'Status', type: 'text' },
    { id: 'due_date', label: 'Due Date', type: 'date' },
    { id: 'task_assigned', label: 'Task Assigned', type: 'text' },
    { id: 'checklist', label: 'Checklist', type: 'text' },
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await generalFunction.fetchCompliances();
        setTableData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData(); 
  }, [])

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    generalFunction.createCompliance(newRowData);
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

  return (
    <div className="flex flex-col justify-center overflow-hidden mt-20 p-6">
      <h1 className="text-xl text-center mb-10">Certifications</h1>
      <table className="border-separate border-spacing-0 border rounded-md shadow">
        <thead>
          <tr>
            {fields.map((field) => (
              <th key={field.id} className="font-medium px-4 py-2">
                {field.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            {fields.map((field) => (
              <td key={field.id} className="border px-4 py-2">
                <Link to={`/certification/${row[field.id]}`}>
                  {row[field.id]}
                </Link>
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>

      <div className="mb-6 mt-10 flex items-center justify-center">
          <button
            onClick={handleOpenPopup}
            type="submit"
            className="
                h-10
                px-5
                text-lg
                text-black-100
                rounded-lg
                shadow
                transition-colors
                duration-150
                focus:shadow-outline
                hover:bg-green-500
                "
          >
            Add Compliance
          </button>
        </div>

      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Add New Row</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              {fields.map((field) => (
              <div className="mb-4" key={field.id}>
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  value={newRowData[field.id]}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                />
              </div>
            ))}
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

  );
}
