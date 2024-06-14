import React, { useState, useEffect } from 'react';
import { generalFunction } from '../../assets/Config/generalFunction';
import  Button from '../Common/CommonComponents/Button';
import  Table from '../Common/CommonComponents/Table';
import PopUp from '../Common/CommonComponents/PopUp';

export default function SupplierManagement() {
  const [tableData, setTableData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({ supplier_name: '', location: '', key_product: '',  sustainability_score: '', key_contact: '', key_email: '' });
  const [validationErrors, setValidationErrors] = useState({});

  const fields = [
    { id: 'supplier_name', label: 'Supplier Name', type: 'text', link: true },
    { id: 'location', label: 'Location', type: 'text' },
    { id: 'key_product', label: 'Key Product', type: 'text' },
    { id: 'sustainability_score', label: 'Sustainability Score', type: 'text' },
    { id: 'key_contact', label: 'Key Contact', type: 'text' },
    { id: 'key_email', label: 'Key Email', type: 'text' }
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await generalFunction.fetchSuppliers();
        setTableData(data);
      } catch(error) {
        console.log('Error fetching supplier data:', error);
      }
    };
    getData();
  }, [])

  const handleOpenPopup = () => {
    setValidationErrors({});
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
    const errors = generalFunction.validateData(newRowData, fields);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setTableData((prevData) => [...prevData, newRowData]);
    generalFunction.createSupplier(newRowData);
    handleClosePopup();
  };

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
          handleFunction={handleOpenPopup}
        />
      </div>
      {isPopupOpen && (
        <PopUp
          title='Add Supplier'
          fields={fields}
          newRowData={newRowData}
          handleInputChange={handleInputChange}
          handleClosePopup={handleClosePopup}
          handleSave={handleAddRow}
          validationErrors={validationErrors}
        />
      )}
    </div>
  );
}

