import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../Common/AppContext";
import { supabase } from '../../supabaseClient';
import { generalFunction } from '../../assets/Config/generalFunction';

const ManageFacilities = () => {
  const { theme, bgColors, appConfig } = useContext(ThemeContext);
  const [facilities, setFacilities] = useState([]);
  const [newFacility, setNewFacility] = useState({ name: '', type: '', address: '', processes: [''] });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editFacility, setEditFacility] = useState({ name: '', type: '', address: '', processes: [''] });
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [facilityToDelete, setFacilityToDelete] = useState(null);



  

  useEffect(() => {
    fetchFacilities();
  }, []);

  //Fetching facilities along with associated processes data from the database
  const fetchFacilities = async () => {
    const company_id = await generalFunction.getCompanyId();
    
    const { data, error } = await supabase
      .from('facility')
      .select(`
        *,
        processes:process(facility_id, process_name)
      `)
      .eq('company_id', company_id);

    if (error) {
      console.error(error);
      return;
    }

    const formattedData = data.map(facility => ({
      ...facility,
      processes: facility.processes.map(process => process.process_name)
    }));

    setFacilities(formattedData);
  };

  const handleInputChange = (e, facilitySetter) => {
    const { name, value } = e.target;
    facilitySetter(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProcessChange = (index, event, facilitySetter, facility) => {
    const newProcesses = facility.processes.map((process, i) => (i === index ? event.target.value : process));
    facilitySetter({ ...facility, processes: newProcesses });
  };

  const handleAddProcess = (facilitySetter, facility) => {
    facilitySetter({ ...facility, processes: [...facility.processes, ''] });
  };

  const handleDeleteProcess = (index, facilitySetter, facility) => {
    const newProcesses = facility.processes.filter((_, i) => i !== index);
    facilitySetter({ ...facility, processes: newProcesses });
  };

  //Adding new facility to the database
  const handleAddFacility = async () => {
    const company_id = await generalFunction.getCompanyId();

    const { data: facilityData, error: facilityError } = await supabase
      .from('facility')
      .insert([{
        facility_name: newFacility.name,
        type: newFacility.type,
        address: newFacility.address,
        is_active: true,
        company_id : company_id,
      }])
      .select('*');

    if (facilityError) {
      console.error(facilityError);
      return;
    }

    const facilityId = facilityData[0].facility_id;
    //Parsing processes data and extracting processname and adding it to the process table with (process_name, facility_id, is_active)
    const processesData = newFacility.processes.map(processName => ({
      process_name: processName.trim(),
      facility_id: facilityId,
      is_active: true
    }));

    const { error: processError } = await supabase
      .from('process')
      .insert(processesData);

    if (processError) {
      console.error(processError);
      return;
    }

    await fetchFacilities();
    resetNewFacility();
    setIsPopupOpen(false);
  };

  //Updating existing facility data in the database
  const handleEditFacility = async () => {
    const { data: facilityData, error: facilityError } = await supabase
      .from('facility')
      .update({
        facility_name: editFacility.name,
        type: editFacility.type,
        address: editFacility.address
      })
      .eq('facility_id', editFacility.facility_id)
      .select('*');

    if (facilityError) {
      console.error(facilityError);
      return;
    }

    const facilityId = facilityData[0].facility_id;

    const { data: existingProcesses, error: fetchError } = await supabase
      .from('process')
      .select('process_id, process_name')
      .eq('facility_id', facilityId);

    if (fetchError) {
      console.error(fetchError);
      return;
    }

    //Checking for whether there any changes to existing processes data and updating them in the database
    //If there are any new processes, adding them to the process table
    const newProcesses = [];
    const updateProcesses = [];
    const deleteProcesses = [];

    existingProcesses.forEach(existingProcess => {
      if (!editFacility.processes.includes(existingProcess.process_name)) {
        deleteProcesses.push(existingProcess.process_id);
      }
    });

    editFacility.processes.forEach((processName, index) => {
      const trimmedProcessName = processName.trim();
      const existingProcess = existingProcesses.find(p => p.process_name === trimmedProcessName);

      if (existingProcess) {
        if (existingProcess.process_name !== trimmedProcessName) {
          updateProcesses.push({ process_id: existingProcess.process_id, process_name: trimmedProcessName });
        }
      } else {
        newProcesses.push({ process_name: trimmedProcessName, facility_id: facilityId, is_active: true });
      }
    });

    await deleteExistingProcesses(deleteProcesses);
    await updateExistingProcesses(updateProcesses);
    await insertNewProcesses(newProcesses);

    await fetchFacilities();
    resetEditFacility();
    setIsEditPopupOpen(false);
  };

  //Deleting facility data from the database
  const handleDeleteFacility = async () => {
    if (facilityToDelete) {
      const { error: deleteProcessError } = await supabase
        .from('process')
        .delete()
        .eq('facility_id', facilityToDelete);
  
      if (deleteProcessError) {
        console.error(deleteProcessError);
        return;
      }
  
      const { error: deleteFacilityError } = await supabase
        .from('facility')
        .delete()
        .eq('facility_id', facilityToDelete);
  
      if (deleteFacilityError) {
        console.error(deleteFacilityError);
        return;
      }
  
      await fetchFacilities();
      setIsDeletePopupOpen(false);
      setFacilityToDelete(null);
    }
  };

  const handleCloseDeletePopup = () => {
    setIsDeletePopupOpen(false);
    setFacilityToDelete(null);
  };

  const deleteExistingProcesses = async (deleteProcesses) => {
    for (const processId of deleteProcesses) {
      const { error: deleteError } = await supabase
        .from('process')
        .delete()
        .eq('process_id', processId);

      if (deleteError) {
        console.error(deleteError);
        return;
      }
    }
  };

  const updateExistingProcesses = async (updateProcesses) => {
    for (const process of updateProcesses) {
      const { error: updateError } = await supabase
        .from('process')
        .update({ process_name: process.process_name })
        .eq('process_id', process.process_id);

      if (updateError) {
        console.error(updateError);
        return;
      }
    }
  };

  const handleDeleteFacilityConfirmation = (facilityId) => {
    setFacilityToDelete(facilityId);
    setIsDeletePopupOpen(true);
  };

  const insertNewProcesses = async (newProcesses) => {
    if (newProcesses.length > 0) {
      const { error: insertError } = await supabase
        .from('process')
        .insert(newProcesses);

      if (insertError) {
        console.error(insertError);
        return;
      }
    }
  };

  const resetNewFacility = () => {
    setNewFacility({ name: '', type: '', address: '', processes: [''] });
  };

  const resetEditFacility = () => {
    setEditFacility({ name: '', type: '', address: '', processes: [''] });
  };

  const EditPopup = (facility) => {
    setEditFacility(facility);
    setIsEditPopupOpen(true);
  };

  return (
    <div className="relative flex flex-col justify-center overflow-hidden mt-20">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-black-600/40 lg:max-w-4xl">
        <h1 className="text-2xl text-center mb-4">Facility Settings</h1>
        <div className="container mx-auto">
          <table className="mt-4 w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Facility Type</th>
                <th className="border border-gray-300 px-4 py-2">Address</th>
                <th className="border border-gray-300 px-4 py-2">Processes</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {facilities.map((facility, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{facility.facility_name}</td>
                  <td className="border border-gray-300 px-4 py-2">{facility.type}</td>
                  <td className="border border-gray-300 px-4 py-2">{facility.address}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <table className="w-full">
                      <tbody>
                        {facility.processes.map((process, processIndex) => (
                          <tr key={processIndex}>
                            <td className="border border-gray-300 px-4 py-1">{process}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-between">
                  <button className="text-blue-500 hover:text-blue-700" onClick={() => EditPopup(facility)}>Edit</button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteFacilityConfirmation(facility.facility_id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button 
            className="mt-4 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setIsPopupOpen(true)}
          >
            Add Facility
          </button>
        </div>
      </div>
      {isDeletePopupOpen && (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Delete Facility</h2>
          <p>Are you sure you want to delete this facility?</p>
          <div className="flex justify-end mt-4">
            <button
              className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={handleCloseDeletePopup}
            >
              No
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
              onClick={handleDeleteFacility}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
      )}

      {isEditPopupOpen && (
        <PopupForm 
          facility={editFacility}
          handleInputChange={(e) => handleInputChange(e, setEditFacility)}
          handleProcessChange={(index, event) => handleProcessChange(index, event, setEditFacility, editFacility)}
          handleAddProcess={() => handleAddProcess(setEditFacility, editFacility)}
          handleDeleteProcess={(index) => handleDeleteProcess(index, setEditFacility, editFacility)}
          handleSubmit={handleEditFacility}
          handleClose={() => setIsEditPopupOpen(false)}
        />
      )}

      {isPopupOpen && (
        <PopupForm 
          facility={newFacility}
          handleInputChange={(e) => handleInputChange(e, setNewFacility)}
          handleProcessChange={(index, event) => handleProcessChange(index, event, setNewFacility, newFacility)}
          handleAddProcess={() => handleAddProcess(setNewFacility, newFacility)}
          handleDeleteProcess={(index) => handleDeleteProcess(index, setNewFacility, newFacility)}
          handleSubmit={handleAddFacility}
          handleClose={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
};
//Common Popup form for adding new facility or editing existing facility
const PopupForm = ({ facility, handleInputChange, handleProcessChange, handleAddProcess, handleDeleteProcess, handleSubmit, handleClose }) => (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-lg font-bold mb-4">{facility.facility_id ? "Edit Existing Facility" : "Add New Facility"}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={facility.facility_name}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Facility Type</label>
          <input
            type="text"
            id="type"
            name="type"
            value={facility.type}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={facility.address}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="processes" className="block text-sm font-medium text-gray-700">Processes</label>
          {facility.processes.map((process, index) => (
            <div key={index} className="flex items-center mt-1">
              <input
                type="text"
                id={`process-${index}`}
                name={`process-${index}`}
                value={process}
                onChange={(event) => handleProcessChange(index, event)}
                className="border border-gray-300 rounded-md shadow-sm block w-full"
              />
              <button
                type="button"
                onClick={() => handleDeleteProcess(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddProcess}
            className="mt-2 bg-blue-500 text-white px-1 py-0.5 rounded-md"
          >
            + 
          </button>
        </div>
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            {facility.facility_id ? "Save" : "Add"}
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default ManageFacilities;
