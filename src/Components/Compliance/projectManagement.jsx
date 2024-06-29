import React, { useState, useEffect } from 'react';
import { generalFunction } from '../../assets/Config/generalFunction'
import  Button from '../Common/CommonComponents/Button'
import  Table from '../Common/CommonComponents/Table'
import PopUp from '../Common/CommonComponents/PopUp'

export default function ProjectManagement() {
  const fields = [
    { id: 'project_id', label: 'Project ID', type: 'number', link: true},
    { id: 'project', label: 'Project', type: 'text' },
    { id: 'status', label: 'Status', type: 'text' },
    { id: 'due_date', label: 'Due Date', type: 'text' },
    { id: 'lead', label: 'Lead', type: 'text' },
  ];

  const initial_fields = { task_id: '', project: '', status: '', due_date: '', lead: '' }

  const [AllProjects, setAllProjects] = useState([]);
  const [newProject, setProject] = useState({
    project_id: '',
    project: '',
    status: '',
    due_date: '',
    lead: '',
});
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await generalFunction.getTableData(`project_management`);
        setAllProjects(data);
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
    const newProject_ = {
        project_id: newProject.project_id,
        project: newProject.project,
        status: newProject.status,
        lead: newProject.lead,
    }
    generalFunction.createTableRow(`project_management`, newProject_);
    setProject({
        project_id: '',
        project: '',
        status: '',
        due_date: '',
        lead: '',
    });
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
      <h1 className="text-xl text-center mb-10">Compliance Management</h1>

      <Table
        fields={fields}
        tableData={AllProjects}
        pageLink="/project_management/project_page/"
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
