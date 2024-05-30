
import React, { useContext, useEffect, useRef, useState } from "react";
import { generalFunction } from "../../assets/Config/generalFunction";
import { UserProfile } from "@questlabs/react-sdk";
import { ThemeContext } from "../Common/AppContext";
import { uploadSVG } from "../Common/SideBarSvg";
import { supabase } from '../../supabaseClient';

const ManageFacilities = () => {
    const { theme, bgColors, appConfig } = useContext(ThemeContext);
    const [facilities, setFacilities] = useState([]);
    const [newFacility, setNewFacility] = useState({ name: '', type: '', address: '', processes: '' });
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

    useEffect(() => {
        fetchFacilities();
    }, []);

    // fetches facilities and related processes data from db 
    async function fetchFacilities() {
        let { data, error } = await supabase
        .from('facility')
        .select(`
        *,
        processes:process(facility_id, process_name)
        `);
        if (error) console.error(error);
        else {
        const formattedData = data.map(facility => ({
            ...facility,
            processes: facility.processes.map(process => process.process_name)
          }));
          setFacilities(formattedData);}
          
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFacility((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    // function to add new facility to db using supabase client
    const handleAddFacility = async () => {
        // Insert the new facility into the facility table
        let { data: facilityData, error: facilityError } = await supabase
          .from('facility')
          .insert([{ 
            facility_name: newFacility.name, 
            type: newFacility.type, 
            address: newFacility.address,
            is_active: true
          }])
          .select('*'); // Ensure to return the inserted data
      
        if (facilityError) {
          console.error(facilityError);
          return;
        }

        console.log(facilityData[0]);
      
        // Extract the new facility ID
        const facilityId = facilityData[0].facility_id;
      
        // Prepare the processes data
        const processesData = newFacility.processes.split(',').map(processName => ({
          process_name: processName.trim(),
          facility_id: facilityId,
          is_active : true
        }));
      
        // Insert the processes into the process table
        let { data: processData, error: processError } = await supabase
          .from('process')
          .insert(processesData);
      
        if (processError) {
          console.error(processError);
          return;
        }
      
        // Fetch the updated facilities list with processes
        await fetchFacilities();
      
        // Clear the form inputs
        setNewFacility({ name: '', type: '', address: '', processes: '' });
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
                <th className="border border-gray-300 px-4 py-2">Edit</th>
              </tr>
            </thead>
            <tbody>
              {facilities.map((facility, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{facility.facility_name}</td>
                  <td className="border border-gray-300 px-4 py-2">{facility.type}</td>
                  <td className="border border-gray-300 px-4 py-2">{facility.address}</td>
                  <td className="border border-gray-300 px-4 py-2">{facility.processes.join(', ')}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => setIsEditPopupOpen(True)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setIsPopupOpen(true)}
          >
            Add Facility
          </button>
        </div>
      </div>
      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Add New Facility</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newFacility.name}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Facility Type
                </label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={newFacility.type}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={newFacility.address}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="processes" className="block text-sm font-medium text-gray-700">
                  Processes (comma-separated)
                </label>
                <input
                  type="text"
                  id="processes"
                  name="processes"
                  value={newFacility.processes}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                  onClick={() => setIsPopupOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  onClick={handleAddFacility}
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

export default ManageFacilities;