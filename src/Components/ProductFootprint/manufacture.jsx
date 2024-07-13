import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Common/CommonComponents/Button';
import { supabase } from '../../supabaseClient';

export default function Manufacture() {
  const [tableData, setTableData] = useState([]);
  const [processes, setProcesses] = useState({});
  const [assemblyData, setAssemblyData] = useState([]);
  const [isProcessPopupOpen, setIsProcessPopupOpen] = useState(false);
  const [isAssemblyPopupOpen, setIsAssemblyPopupOpen] = useState(false);
  const [isAddProcessPopupOpen, setIsAddProcessPopupOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({ name: '', material: '', mass: '', qty: '', assembly_id: '' });
  const [selectedPartId, setSelectedPartId] = useState(null);
  const [newProcess, setNewProcess] = useState('');
  const [newAssemblyData, setNewAssemblyData] = useState({ name: '', region: '' });
  const [selectedAssemblyId, setSelectedAssemblyId] = useState('');

  useEffect(() => {
    fetchAssemblyData();
  }, []);

  useEffect(() => {
    fetchManufacturingData();
  }, [selectedAssemblyId]);

  async function fetchManufacturingData() {
    let query = supabase.from('product_manufacturing').select('*');
    if (selectedAssemblyId) {
      query = query.eq('assembly_id', selectedAssemblyId);
    }
    const { data, error } = await query;

    if (error) {
      console.error('Error fetching manufacturing data:', error.message);
      return;
    }
    setTableData(data);
    fetchProcesses(data);
  }

  async function fetchProcesses(data) {
    const processesObj = {};
    for (const row of data) {
      const { data: processesData, error } = await supabase.from('product_process').select('*').eq('part_id', row.id);
      if (error) {
        console.error('Error fetching processes:', error.message);
        return;
      }
      processesObj[row.id] = processesData;
    }
    setProcesses(processesObj);
  }

  async function fetchAssemblyData() {
    const { data, error } = await supabase.from('product_assembly').select('*');
    if (error) {
      console.error('Error fetching assembly data:', error.message);
      return;
    }
    setAssemblyData(data);
  }

  const handleOpenProcessPopup = () => {
    setIsProcessPopupOpen(true);
  };

  const handleCloseProcessPopup = () => {
    setIsProcessPopupOpen(false);
    setNewRowData({ name: '', material: '', mass: '', qty: '', assembly_id: '' });
  };

  const handleOpenAssemblyPopup = () => {
    setIsAssemblyPopupOpen(true);
  };

  const handleCloseAssemblyPopup = () => {
    setIsAssemblyPopupOpen(false);
    setNewAssemblyData({ name: '', region: '' });
  };

  const handleOpenAddProcessPopup = (partId) => {
    setSelectedPartId(partId);
    setIsAddProcessPopupOpen(true);
  };

  const handleCloseAddProcessPopup = () => {
    setIsAddProcessPopupOpen(false);
    setNewProcess('');
    setSelectedPartId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAssemblyInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssemblyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProcessInputChange = (e) => {
    setNewProcess(e.target.value);
  };

  const handleAddRow = async () => {
    const { data, error } = await supabase.from('product_manufacturing').insert({
      name: newRowData.name,
      material: newRowData.material,
      mass: newRowData.mass,
      qty: newRowData.qty,
      assembly_id: newRowData.assembly_id,
    }).select('*');

    if (data) {
      setTableData((prevData) => [...prevData, ...data]);
    }

    if (error) {
      console.error('Error adding row:', error);
    }

    handleCloseProcessPopup();
  };

  const handleAddProcess = async () => {
    if (selectedPartId && newProcess) {
      const { data, error } = await supabase.from('product_process').insert({
        name: newProcess,
        part_id: selectedPartId,
      }).select('*');

      if (data) {
        setProcesses((prevProcesses) => ({
          ...prevProcesses,
          [selectedPartId]: [...prevProcesses[selectedPartId], ...data],
        }));
      }

      if (error) {
        console.error('Error adding process:', error);
      }

      setNewProcess('');
      setSelectedPartId(null);
      setIsAddProcessPopupOpen(false);
    }
  };

  const handleAddAssembly = async () => {
    const { data, error } = await supabase.from('product_assembly').insert({
      name: newAssemblyData.name,
      region: newAssemblyData.region,
    }).select('*');

    if (data) {
      setAssemblyData((prevData) => [...prevData, ...data]);
    }

    if (error) {
      console.error('Error adding assembly:', error);
    }

    handleCloseAssemblyPopup();
  };

  const openProcessPopup = (partId) => {
    setSelectedPartId(partId);
    setIsAddProcessPopupOpen(true);
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
        <h1 className="text-2xl text-center mb-4 mt-8">Assembly</h1>
        <table className="mt-4 w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Assembly Name</th>
              <th className="border border-gray-300 px-4 py-2">Region</th>
            </tr>
          </thead>
          <tbody>
            {assemblyData.map((row, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{row.name}</td>
                <td className="border border-gray-300 px-4 py-2">{row.region}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <button onClick={handleOpenAssemblyPopup} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add Assembly
          </button>
        </div>

        <h1 className="text-2xl text-center mb-4">Manufacturing</h1>
        <div className="container mx-auto">
          <div className="flex justify-center mb-4">
            <select
              value={selectedAssemblyId}
              onChange={(e) => setSelectedAssemblyId(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="">Select Assembly</option>
              {assemblyData.map((assembly) => (
                <option key={assembly.id} value={assembly.id}>
                  {assembly.name}
                </option>
              ))}
            </select>
          </div>
          <table className="mt-4 w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Material</th>
                <th className="border border-gray-300 px-4 py-2">Mass</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Processes</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    <Link to={`/manufacture/${row.name}`}>{row.name}</Link>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{row.material}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Link to={`/manufacture/${row.name}`}>{row.mass}</Link>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{row.qty}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button onClick={() => openProcessPopup(row.id)} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Add Process
                    </button>
                    {processes[row.id] && processes[row.id].length > 0 && (
                      <ul className="mt-2">
                        {processes[row.id].map((process, processIndex) => (
                          <li key={processIndex}>{process.name}</li>
                        ))}
                      </ul>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <button onClick={handleOpenProcessPopup} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Add Row
            </button>
          </div>
        </div>
      </div>

      {isProcessPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">Add Manufacturing Row</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={newRowData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="material" className="block mb-2">Material:</label>
              <input
                type="text"
                name="material"
                value={newRowData.material}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mass" className="block mb-2">Mass:</label>
              <input
                type="text"
                name="mass"
                value={newRowData.mass}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="qty" className="block mb-2">Quantity:</label>
              <input
                type="text"
                name="qty"
                value={newRowData.qty}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="assembly_id" className="block mb-2">Assembly ID:</label>
              <select
                name="assembly_id"
                value={newRowData.assembly_id}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                <option value="">Select Assembly</option>
                {assemblyData.map((assembly) => (
                  <option key={assembly.id} value={assembly.id}>
                    {assembly.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button onClick={handleCloseProcessPopup} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-2">
                Cancel
              </button>
              <button onClick={handleAddRow} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {isAssemblyPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">Add Assembly</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">Assembly Name:</label>
              <input
                type="text"
                name="name"
                value={newAssemblyData.name}
                onChange={handleAssemblyInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="region" className="block mb-2">Region:</label>
              <input
                type="text"
                name="region"
                value={newAssemblyData.region}
                onChange={handleAssemblyInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end">
              <button onClick={handleCloseAssemblyPopup} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-2">
                Cancel
              </button>
              <button onClick={handleAddAssembly} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddProcessPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">Add Process</h2>
            <div className="mb-4">
              <label htmlFor="process" className="block mb-2">Process Name:</label>
              <input
                type="text"
                name="process"
                value={newProcess}
                onChange={handleProcessInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end">
              <button onClick={handleCloseAddProcessPopup} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-2">
                Cancel
              </button>
              <button onClick={handleAddProcess} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
