import React, { useState, useEffect } from 'react';
import { generalFunction } from '../../assets/Config/generalFunction'
import  Button from '../Common/CommonComponents/Button'
import  Table from '../Common/CommonComponents/Table'
import PopUp from '../Common/CommonComponents/PopUp'
import { handleOpenPopup } from '../../assets/Config/popUpFunctions';


export default function ProjectManagement() {
  const fields = [
    { id: 'task_id', label: 'Project ID', type: 'number' },
    { id: 'project', label: 'Project', type: 'text' },
    { id: 'status', label: 'Status', type: 'text' },
    { id: 'due_date', label: 'Due Date', type: 'date' },
    { id: 'lead', label: 'Lead', type: 'text' },
  ];
  const [AllProjects, setAllProjects] = useState([]);
  const [newProject, setProject] = useState({ certification: '', status: '', due_date: '', task_assigned: '',  checklist: '' });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
    generalFunction.createCompliance(newProject);
    setProject({ certification: '', status: '', due_date: '', task_assigned: '',  checklist: '' });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleAddRow = () => {
    setAllProjects((prevData) => [...prevData, newProject]);
    handleClosePopup();
  };

  return (
    <div className="flex flex-col justify-center overflow-hidden mt-20 p-6">
      <h1 className="text-xl text-center mb-10">Project Management</h1>
      <Table
        fields={fields}
        tableData={AllProjects}
      />
      <div className="mb-6 mt-10 flex items-center justify-center">
        <Button
          label="Add Projects"
          handleFunction = {handleOpenPopup}
        />
      </div>
      {isPopupOpen && (
        <PopUp
          fields={fields}
          newRowData={newProject}
          handleInputChange={handleInputChange}
          handleClosePopup={handleClosePopup}
          handleAddRow={handleAddRow}
        />
      )}
    </div>

  );
}
