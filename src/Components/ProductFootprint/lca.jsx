import React, { useState, useEffect } from 'react';
import { generalFunction } from '../../assets/Config/generalFunction';
import Button from '../Common/CommonComponents/Button';
import Table from '../Common/CommonComponents/Table';
import PopUp from '../Common/CommonComponents/PopUpLCA';

export default function LCA() {
  const fields = [
    { id: 'id', label: 'LCA ID', type: 'number', link: true },
    { id: 'lca_name', label: 'LCA Name', type: 'text' },
    { id: 'co2', label: 'CO2 Consumption', type: 'text' },
    { id: 'last_edited', label: 'Last Edited', type: 'date' },
    { id: 'company_id', label: 'Company', type: 'select', options: [] },
  ];

  const initial_fields = { id: '', lca_name: '', co2: '', last_edited: '', company_id: '' };

  const [AllProjects, setAllProjects] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [newProject, setProject] = useState(initial_fields);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await generalFunction.getTableData('product_information');
        setAllProjects(data);

        const companies = await generalFunction.getTableData('company');
        console.log('Fetched companies:', companies); // Log the fetched company data
        setCompanyOptions(companies.map(company => ({
          value: company.id,
          label: company.name
        })));
        fields.find(field => field.id === 'company_id').options = companies.map(company => ({
          value: company.id,
          label: company.name
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, []);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setProject(initial_fields);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddRow = () => {
    const newProject_ = {
      id: newProject.id,
      lca_name: newProject.lca_name,
      co2: newProject.co2,
      last_edited: newProject.last_edited,
      company_id: newProject.company_id,
    };
    
    setAllProjects((prevData) => [...prevData, newProject_]);
    generalFunction.createTableRow('product_information', newProject_)
      .then(response => {
        console.log('Data successfully pushed to Supabase:', response);
      })
      .catch(error => {
        console.error('Error pushing data to Supabase:', error);
      });
    handleClosePopup();
  };

  const navigateTo = (path) => {
    window.location.href = path;
  };

  return (
    <div className="flex flex-col justify-center overflow-hidden mt-20 p-6">
      <div className="flex mb-10 justify-center space-x-4">
        <Button label="My LCA" handleFunction={() => navigateTo('/product_footprint')} />
        <Button label="Details" handleFunction={() => navigateTo('/product_footprint/details/')} />
        <Button label="Manufacture" handleFunction={() => navigateTo('/product_footprint/manufacture')} />
        <Button label="Transportation" handleFunction={() => navigateTo('/product_footprint/transport')} />
      </div>
      <h1 className="text-xl text-center mb-10">Product LCA</h1>

      <Table 
        fields={fields} 
        tableData={AllProjects} 
        pageLink="/product_footprint/details/" 
      />
      <div className="mb-6 mt-10 flex items-center justify-center">
        <Button 
          label="Add Projects" 
          handleFunction={handleOpenPopup} 
        />
      </div>

      {isPopupOpen && (
        <PopUp
          fields={fields}
          newRowData={newProject}
          handleInputChange={handleInputChange}
          handleClosePopup={handleClosePopup}
          handleAddRow={handleAddRow}
          options={companyOptions}
        />
      )}
    </div>
  );
}
