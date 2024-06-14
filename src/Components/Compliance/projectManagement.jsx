import React, { useState, useEffect } from 'react';
import { generalFunction } from '../../assets/Config/generalFunction'
import  Button from '../Common/CommonComponents/Button'
import  Table from '../Common/CommonComponents/Table'
import PopUp from '../Common/CommonComponents/PopUp'

export default function ProjectManagement() {
  const fields = [
    { id: 'project_id', label: 'Project ID', type: 'number', link: true, showInPopup: false},
    { id: 'project', label: 'Project', type: 'text', showInPopup: true},
    { id: 'status', label: 'Status', type: 'text', showInPopup: true},
    { id: 'due_date', label: 'Due Date', type: 'text', showInPopup: true},
    { id: 'lead', label: 'Lead', type: 'text', showInPopup: true},
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
  const [projectTracker, setProjectTracker] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await generalFunction.getTableData(`project_management`);
        setAllProjects(data);
        setProjectTracker(data.length + 1)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, [])

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const getProjectNumber = async () => {
    const data = await generalFunction.getTableData(`project_management`);
    setProjectTracker(data.length + 1)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    getProjectNumber();
    const newProject_ = {
        project_id: projectTracker,
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
      project_id: projectTracker,
      [name]: value,
    }));
  };

  const handleAddRow = () => {
    setAllProjects((prevData) => [...prevData, newProject]);
    handleClosePopup();
  };

  const popupFields = fields.filter(field => field.showInPopup);

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
          fields={popupFields}
          newRowData={newProject}
          handleInputChange={handleInputChange}
          handleClosePopup={handleClosePopup}
          handleAddRow={handleAddRow}
        />
      )}
    </div>

  );
}
