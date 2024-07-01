import React, { useState, useEffect } from 'react';
import { generalFunction } from '../../assets/Config/generalFunction'
import  Button from '../Common/CommonComponents/Button'
import  Table from '../Common/CommonComponents/Table'
import PopUp from '../Common/CommonComponents/PopUp'

export default function Compliance() {
  const [tableData, setTableData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({ certification: '', status: '', due_date: '', task_assigned: '',  checklist: '' });

  const compliance_fields = [
    { id: 'name', label: 'Compliance Name', type: 'text' },
    { id: 'date_published', label: 'Date published', type: 'date' },
    { id: 'document', label: 'Document', type: 'text' },
    { id: 'chatbot_link', label: 'Chatbot Link', type: 'text' },
  ];

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
    generalFunction.createCompliance(newRowData);
    setNewRowData({ certification: '', status: '', due_date: '', task_assigned: '',  checklist: '' });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleAddRow = () => {
    setTableData((prevData) => [...prevData, newRowData]);
    handleClosePopup();
  };

  return (
    <div className="flex flex-col justify-center overflow-hidden mt-20 p-6">
      <h1 className="text-xl text-center mb-10">Compliance Framework</h1>
      <Table
        fields={compliance_fields}
        tableData={tableData}
      />
      <div className="mb-6 mt-10 flex items-center justify-center">
        <Button
          label="Add compliance"
          handleFunction = {handleOpenPopup}
        />
      </div>
      {isPopupOpen && (
        <PopUp
          fields={compliance_fields}
          newRowData={newRowData}
          handleInputChange={handleInputChange}
          handleClosePopup={handleClosePopup}
          handleSave={handleAddRow}
        />
      )}
    </div>

  );
}
