// importing react features to use states, effects, and links
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import Button from '../Common/CommonComponents/Button';

// declare + export Transportation component
export default function Transportation() {
  const [tableData, setTableData] = useState([]);
  const [partIds, setPartIds] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({ part_id: '', trans_stage: '', trans_type: '', dist: '' });

  // useEffect - effect that runs once when component mounts
  useEffect(() => {
    fetchTransportation();
    fetchPartIds();
  }, []);

  // fetches data from db + updates tableData var w/ fetched data
  async function fetchTransportation() {
    try {
      const { data, error } = await supabase
        .from('product_transportation')
        .select('*');
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setTableData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // fetches part IDs from product_manufacturing table
  async function fetchPartIds() {
    try {
      const { data, error } = await supabase
        .from('product_manufacturing')
        .select('id');
      if (error) {
        console.error("Error fetching part IDs:", error);
      } else {
        setPartIds(data);
      }
    } catch (error) {
      console.error("Error fetching part IDs:", error);
    }
  }

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setNewRowData({ part_id: '', trans_stage: '', trans_type: '', dist: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddRow = async () => {
    const success = await createTransportation();
    if (success) {
      setTableData((prevData) => [...prevData, newRowData]);
      handleClosePopup();
    }
  };

  // inserts new row of data into product_transportation table
  async function createTransportation() {
    try {
      const { data, error } = await supabase
        .from('product_transportation')
        .insert(newRowData);

      if (error) {
        console.error("Error inserting data:", error);
        return false;
      } else {
        console.log("Data inserted successfully:", data);
        return true;
      }
    } catch (error) {
      console.error("Error inserting data:", error);
      return false;
    }
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

    
        <h1 className="text-2xl text-center mb-4">Transportation</h1>
        <div className="container mx-auto">
          <table className="mt-4 w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Part ID</th>
                <th className="border border-gray-300 px-4 py-2">Transportation Stage</th>
                <th className="border border-gray-300 px-4 py-2">Transportation Type</th>
                <th className="border border-gray-300 px-4 py-2">Distance</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{row.part_id}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.trans_stage}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.trans_type}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.dist}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <button onClick={handleOpenPopup} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Add Transportation
            </button>
          </div>
          {isPopupOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg">
                <h2 className="text-lg font-bold mb-4">Add new Transportation</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-4">
                    <label htmlFor="part_id" className="block text-sm font-medium text-gray-700">
                      Part ID
                    </label>
                    <select
                      id="part_id"
                      name="part_id"
                      value={newRowData.part_id}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                    >
                      <option value="">Select Part ID</option>
                      {partIds.map((part) => (
                        <option key={part.id} value={part.id}>
                          {part.id}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="trans_stage" className="block text-sm font-medium text-gray-700">
                      Transportation Stage
                    </label>
                    <input
                      type="text"
                      id="trans_stage"
                      name="trans_stage"
                      value={newRowData.trans_stage}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="trans_type" className="block text-sm font-medium text-gray-700">
                      Transportation Type
                    </label>
                    <input
                      type="text"
                      id="trans_type"
                      name="trans_type"
                      value={newRowData.trans_type}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="dist" className="block text-sm font-medium text-gray-700">
                      Distance
                    </label>
                    <input
                      type="number"
                      id="dist"
                      name="dist"
                      value={newRowData.dist}
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
