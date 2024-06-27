import React, { useState, useEffect } from 'react';
import { generalFunction } from '../../assets/Config/generalFunction'
import  Button from '../Common/CommonComponents/Button'
import  Table from '../Common/CommonComponents/Table'
import PopUp from '../Common/CommonComponents/PopUp'
import DescriptionArea from '../Common/CommonComponents/DescriptionArea'
import { useParams } from 'react-router-dom';

export default function ProjectPage() {
  const project_fields = [
    { id: 'project_id', label: 'Project ID', type: 'number' },
    { id: 'project', label: 'Project', type: 'text' },
    { id: 'status', label: 'Status', type: 'text' },
    { id: 'due_date', label: 'Due Date', type: 'date' },
    { id: 'lead', label: 'Lead', type: 'text' },
  ];

  const task_fields = [
    { id: 'project_id', label: 'Project ID', type: 'number', table: false, popup: false},
    { id: 'task_id', label: 'Task ID', type: 'number', table: true, popup: false},
    { id: 'task', label: 'Task', type: 'text', table: true, popup: true},
    { id: 'status', label: 'Status', type: 'text', table: true, popup: true},
    { id: 'due_date', label: 'Due Date', type: 'date', table: true, popup: true},
    { id: 'lead', label: 'Lead', type: 'text', table: true, popup: true},
    { id: 'description', label: 'Description', type: 'text', table: true, popup: true}
  ];

  const empty_task_fields = { task: '', status: '', due_date: '', lead: '', description: ''}

  const [editTask, setEditTask] = useState({
    task: '',
    status: '',
    due_date: '',
    lead: '',
    description: '',
    project_id: '',
    task_id: ''
  });

  // Get project ID
  const { id } = useParams();
  // Get all info of the project
  const [ProjectInfo, setProjectInfo] = useState([]);
  const [description, setDescription] = useState('');
  // Get all tasks of the project
  const [AllTasks, setAllTasks] = useState([]);
  const [newTask, setTask] = useState({ 
    task_id: '',
    task: '',
    status: '',
    due_date: '',
    lead: '',
    description: ''
  });
  const [taskTracker, setTaskTracker] = useState(0);
  // PopUp for tasks
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  // For editing
  const [isEditOpen, setEditOpen] = useState(false);
  const [rowIndex, setRowIndex] = useState(-1);

  useEffect(() => {
    const getData = async () => {
      try {
        // Get project data
        const project_info = await generalFunction.getTableRow(`project_management`, "project_id", id);
        if (project_info) {
          setProjectInfo(project_info);
          setDescription(project_info[0].description);
        }
        // Get task data
        const data = await generalFunction.getTaskData(`task_management`, id);
        if (data) {
          setAllTasks(data);
          setTaskTracker(data.length + 1)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData(); 
  }, [])

    // Function to save description
    const handleChange = (e) => {
      setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      generalFunction.updateRow(
        `project_management`,
        "description",
        description,
        "project_id",
        id
      );
    };

  // Function to save tasks
  const handleOpenPopup = () => {
    setValidationErrors({});
    setIsPopupOpen(true);
  };

  const getTaskNumber = async () => {
    const data = await generalFunction.getTableData(`task_management`);
    setTaskTracker(data.length + 1)
  }

  const handleClosePopup = async () => {
    setIsPopupOpen(false);
    getTaskNumber();    
    const newTask_ = { 
        project_id: id,
        task_id: taskTracker,
        task: newTask.task, 
        status: newTask.status,
        due_date: newTask.due_date,
        lead: newTask.lead,
        description: newTask.description,
        company_id: await generalFunction.getCompanyId()
    }
    generalFunction.createTableRow(`task_management`, newTask_);
    setTask({ 
      task_id: '',
      task: '', 
      status: '',
      due_date: '',
      lead: '',
      description: ''
    });
    setTaskTracker(taskTracker +1)
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevData) => ({
      ...prevData,
      task_id: taskTracker,
      [name]: value,
    }));
  };
  
  const handleAddRow = () => {
    const errors = generalFunction.validateData(newTask, TaskTable);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setAllTasks((prevData) => [...prevData, newTask]);
    handleClosePopup();
  };

  const TaskTable = task_fields.filter(field => field.table);
  const TaskPopUp = task_fields.filter(field => field.popup);

  // Functions to edit task

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const openEdit = (row, index) => {
    setValidationErrors({});
    setEditTask( {
      task: row.task,
      status: row.status,
      due_date: formatDate(row.due_date),
      lead: row.lead,
      description: row.description,
      project_id: row.project_id,
      task_id: row.task_id
    });
    setRowIndex(index);
    setEditOpen(true);
  }

  const handleEditInput = (e) => {
    const { name, value } = e.target;
    setEditTask((prevData) => ({
        ...prevData,
        [name]: value,
    }));
  };

  async function handleEditSubmit() {
    const errors = generalFunction.validateData(editTask, task_fields);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    generalFunction.editTask(editTask);
    setAllTasks((prevData) => {
        const newData = [...prevData];
        newData[rowIndex] = { ...editTask };
        return newData;
    });
    setEditOpen(false);
  }

  const handleCloseEdit = () => {
    setEditOpen(false);
    setEditTask(empty_task_fields);
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
      <h1 className="text-xl text-center mb-10">Project Page Test</h1>
      <Table
        fields={project_fields}
        tableData={ProjectInfo}
      />
      <DescriptionArea
        description={description}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <Table
        fields={TaskTable}
        tableData={AllTasks}
        hasActions={true}
        actions={actions}
      />
      <div className="mb-6 mt-10 flex items-center justify-center">
        <Button
          label="Add Task"
          handleFunction = {handleOpenPopup}
        />
      </div> 
      {isPopupOpen && (
        <PopUp
          fields={TaskPopUp}
          newRowData={newTask}
          handleInputChange={handleInputChange}
          handleClosePopup={handleClosePopup}
          handleSave={handleAddRow}
          validationErrors={validationErrors}
        />
      )}
      {isEditOpen && (
        <PopUp
          title='Edit Task'
          fields={TaskPopUp}
          newRowData={editTask}
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
