import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import  Button from '../Common/CommonComponents/Button'
import  Table from '../Common/CommonComponents/Table'
import PopUp from '../Common/CommonComponents/PopUp'

export default function SupplierManagement() {
  const [tableData, setTableData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({ supplier_name: '', location: '', key_product: '',  sustainability_score: '', key_contact: '', key_email: '' });

  const fields = [
    { link: true, id: 'supplier_name', label: 'Supplier Name', type: 'text' },
    { id: 'location', label: 'Location', type: 'text' },
    { id: 'key_product', label: 'Key Product', type: 'text' },
    { id: 'sustainability_score', label: 'Sustainability Score', type: 'text' },
    { id: 'key_contact', label: 'Key Contact', type: 'text' },
    { id: 'key_email', label: 'Key Email', type: 'text' }
  ];

  useEffect(() => {
    fetchMeasurement()
  }, [])

  async function fetchMeasurement() {
    const { data } = await supabase
      .from(`supplier_management`)
      .select('*')
    setTableData(data); 
  }

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setNewRowData({ supplier_name: '', location: '', key_product: '',  sustainability_score: '', key_contact: '', key_email: '' });
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
    createMeasurement();
    handleClosePopup();
  };

  async function createMeasurement() {
    await supabase
      .from(`supplier_management`)
      .insert({ supplier_name: newRowData.supplier_name, location: newRowData.location , key_product: newRowData.key_product , sustainability_score: newRowData.sustainability_score , key_contact: newRowData.key_contact , key_email: newRowData.key_email })
  }

  return (
    <div className="flex flex-col justify-center overflow-hidden mt-20 p-6">
      <h1 className="text-xl text-center mb-10">Supplier Management</h1>
      <Table
        fields={fields}
        tableData={tableData}
        hasLink={true}
        pageLink={``}
      />
      <div className="mb-6 mt-10 flex items-center justify-center">
        <Button
          label="Add Supplier"
          handleFunction = {handleOpenPopup}
        />
      </div>
      {isPopupOpen && (
        <PopUp
          popupTitle='Add Supplier'
          fields={fields}
          newRowData={newRowData}
          handleInputChange={handleInputChange}
          handleClosePopup={handleClosePopup}
          handleAddRow={handleAddRow}
        />
      )}
    </div>
  );
}

