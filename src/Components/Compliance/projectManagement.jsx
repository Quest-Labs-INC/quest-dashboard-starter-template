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
    { id: 'due_date', label: 'Due Date', type: 'date', showInPopup: true},
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
  const [editProject, setEditProject] = useState({
    project_id: '',
    project: '',
    status: '',
    due_date: '',
    lead: '',
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [projectTracker, setProjectTracker] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [isEditOpen, setEditOpen] = useState(false);
  const [rowIndex, setRowIndex] = useState(-1);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await generalFunction.getTableData(`project_management`);
        if (data) {
          setAllProjects(data);
          setProjectTracker(data.length + 1)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, [])

  const handleOpenPopup = () => {
    setValidationErrors({});
    setIsPopupOpen(true);
  };

  const getProjectNumber = async () => {
    const data = await generalFunction.getTableData(`project_management`);
    setProjectTracker(data.length + 1)
  }

  const handleClosePopup = async () => {
    setIsPopupOpen(false);
    getProjectNumber();
    const newProject_ = {
        project_id: projectTracker,
        project: newProject.project,
        status: newProject.status,
        lead: newProject.lead,
        due_date: newProject.due_date,
        company_id: await generalFunction.getCompanyId()
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
    const errors = generalFunction.validateData(newProject, fields);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setAllProjects((prevData) => [...prevData, newProject]);
    handleClosePopup();
  };

  const popupFields = fields.filter(field => field.showInPopup);

// functions for edit button

const openEdit = (row, index) => {
  setValidationErrors({});
  setEditProject(row);
  setRowIndex(index);
  setEditOpen(true);
}

const handleEditInput = (e) => {
  const { name, value } = e.target;
  setEditProject((prevData) => ({
      ...prevData,
      [name]: value,
  }));
};

async function handleEditSubmit() {
  const errors = generalFunction.validateData(editProject, fields);
  if (Object.keys(errors).length > 0) {
    setValidationErrors(errors);
    return;
  }
  generalFunction.editProject(editProject);
  setAllProjects((prevData) => {
      const newData = [...prevData];
      newData[rowIndex] = { ...editProject };
      return newData;
  });
  setEditOpen(false);
}

const handleCloseEdit = () => {
  setEditOpen(false);
  setEditProject(initial_fields);
  setRowIndex(-1);
};

  const actions = [
    <Button
    label="Edit"
    handleFunction = {openEdit}
    />,
  ];

  return (
    <div className="flex flex-col justify-center overflow-hidden mt-20 p-6">
      <h1 className="text-xl text-center mb-10">Compliance Management</h1>
      <Table
        fields={fields}
        tableData={AllProjects}
        hasLink={true}
        pageLink="/project_management/project_page/"
        searchableColumn="project"
        hasActions={true}
        actions={actions}
      />
      <div className="mb-6 mt-10 flex items-center justify-center">
        <Button
          label="Add Projects"
          handleFunction = {handleOpenPopup}
        />
      </div>
      {isPopupOpen && (
        <PopUp
          title='New Project'
          fields={popupFields}
          newRowData={newProject}
          handleInputChange={handleInputChange}
          handleClosePopup={handleClosePopup}
          handleSave={handleAddRow}
          validationErrors={validationErrors}
        />
      )}
      {isEditOpen && (
        <PopUp
          title='Edit Project'
          fields={popupFields}
          newRowData={editProject}
          handleInputChange={handleEditInput}
          handleClosePopup={handleCloseEdit}
          handleSave={handleEditSubmit}
          button2Label='Edit'
          validationErrors={validationErrors}
        />
        )}
    </div>

  );
}
