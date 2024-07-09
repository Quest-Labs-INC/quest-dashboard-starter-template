// importing react features to use states, effects, and links
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Common/CommonComponents/Button';
// import database
import { supabase } from '../../supabaseClient';

// declare + export supplierManagement component
export default function Manfacture() {
  // tableData - state var that stores all table data, initially an empty array
  // setTableData - function used to update value of tableData
  const [tableData, setTableData] = useState([]);
  // isPopupOpen - state var that changes depending on whether popup is open or not, initially set to false
  // setIsPopupOpen - function used to update the value of isPopupOpen
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // newRowData - state var that stores obj containing properties for new row of data, all props initially set to empty string
  // setNewRowData - function to set new row data
  const [newRowData, setNewRowData] = useState({ name: '', material: '', process: '',  mass: '', qty: '' });

  // useEffect - effect that runs once when component mounts
  useEffect(() => {
    // call fetchMeasurement function
    fetchMeasurement()
  }, []) // <-- '[]' as the dependency array means it runs once

  // fetches data from db + updates tableData var w/ fetched data
  async function fetchMeasurement() {
    // await async data retrieval from db; selects all info from supplier_management table
    const { data } = await supabase
      .from(`product_manufacturing`)
      .select('*')
    // updates tableData var with data from db
    setTableData(data); 
  }

  // sets isPopupOpen to true, opening popup
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  // sets isPopupOpen to false, closing popup + adding new row of data
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    // resets newRowData props to empty strings
    setNewRowData({ name: '', material: '', process: '',  mass: '', qty: '' });
  };

  // updates newRowData var when input changes
  const handleInputChange = (e) => {
    // gets name + value from event target
    const { name, value } = e.target;
    // add new name + value pair to obj along w/ prev data
    setNewRowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // adds new row of data to tableData var + closes popup
  const handleAddRow = () => {
    setTableData((prevData) => [...prevData, newRowData]);
    createMeasurement();
    handleClosePopup();
  };

  // inserts new row of data into db buyer_management table w/ values from newRowData
  async function createMeasurement() {
    await supabase
      .from(`product_manufacturing`)
      .insert({ name: newRowData.name, material: newRowData.material, process: newRowData.process,  mass: newRowData.mass, qty: newRowData.qty })
  };

  const navigateTo = (path) => {
    window.location.href = path;
  };

 

  return (
    <div className="relative flex flex-col justify-center overflow-hidden mt-20">

    <div className="flex mb-10 justify-center space-x-4">
        <Button label="My LCA" handleFunction={() => navigateTo('/product_footprint')} />
        <Button label="Details" handleFunction={() => navigateTo('/product_footprint/details/')} />
        <Button label="Manufacture" handleFunction={() => navigateTo('/product_footprint/manufacture')} />
        <Button label="Transportation" handleFunction={() => navigateTo('/product_footprint/transport')} />
      </div>

    <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-black-600/40 lg:max-w-4xl">

 

      <h1 className="text-2xl text-center mb-4">Manufacturing</h1>
    <div className="container mx-auto">
      <table className="mt-4 w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Material</th>
            <th className="border border-gray-300 px-4 py-2">Process</th>
            <th className="border border-gray-300 px-4 py-2">Mass </th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">
              <Link to={`/manufacture/${row.name}`}>
                {row.name}
              </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
              <Link to={`/manufacture/${row.name}`}>
                {row.material}
              </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
              <Link to={`/manufacture/${row.name}`}>
                {row.process}
              </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
              <Link to={`/manufacture/${row.name}`}>
                {row.mass}
              </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
              <Link to={`/manufacture/${row.name}`}>
                {row.qty}
              </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button onClick={handleOpenPopup} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add Part
        </button>
      </div>
      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Add new Part</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newRowData.name}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="material" className="block text-sm font-medium text-gray-700">
                  Material
                </label>
                <input
                  type="text"
                  id="material"
                  name="material"
                  value={newRowData.material}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="process" className="block text-sm font-medium text-gray-700">
                  Process
                </label>
                <input
                  type="text"
                  id="process"
                  name="process"
                  value={newRowData.process}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="mass" className="block text-sm font-medium text-gray-700">
                  Mass
                </label>
                <input
                  type="number"
                  id="mass"
                  name="mass"
                  value={newRowData.mass}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full">
                 </input>
              </div>
              <div className="mb-4">
                <label htmlFor="qty" className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  id="qty"
                  name="qty"
                  value={newRowData.qty}
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

