import React, { useState, useEffect } from 'react';
import { generalFunction } from '../../assets/Config/generalFunction';
import Button from '../Common/CommonComponents/Button';
import Table from '../Common/CommonComponents/Table';
import PopUp2 from '../Common/CommonComponents/PopUp2';

export default function Details() {
  const fields = [
    { id: 'id', label: 'LCA ID', type: 'number', link: true },
    { id: 'lca_name', label: 'Product Name', type: 'text' },
    { id: 'mass_units', label: 'Mass Units', type: 'number' },
    { id: 'dist_units', label: 'Distance Units', type: 'number' },
    { id: 'vol_units', label: 'Volume Units', type: 'number' },
  ];

  const initial_fields = { id: '', lca_name: '', mass_units: '', dist_units: '', vol_units: '' };

  const [AllProjects, setAllProjects] = useState([]);
  const [newProject, setProject] = useState(initial_fields);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [lcaNames, setLcaNames] = useState([]);
  const [lcaIdMapping, setLcaIdMapping] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await generalFunction.getTableData('product_information');
        setAllProjects(data);
        const lcaNames = data.map(item => item.lca_name);
        setLcaNames(lcaNames);
        const lcaIdMapping = data.reduce((acc, item) => {
          acc[item.lca_name] = item.id;
          return acc;
        }, {});
        setLcaIdMapping(lcaIdMapping);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, []);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = async () => {
    setIsPopupOpen(false);

    try {
      await generalFunction.updateProductInformation('product_information', newProject.id, {
        lca_name: newProject.lca_name,
        mass_units: newProject.mass_units,
        dist_units: newProject.dist_units,
        vol_units: newProject.vol_units,
      });
      setProject(initial_fields);
      const data = await generalFunction.getTableData('product_information');
      setAllProjects(data);
    } catch (error) {
      console.error('Error updating project:', error);
    }
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

      <h1 className="text-xl text-center mb-10">Details</h1>
      <Table
        fields={fields}
        tableData={AllProjects}
        pageLink="/product_footprint/details/"
      />
      <div className="mb-6 mt-10 flex items-center justify-center">
        <Button
          label="Update Projects"
          handleFunction={handleOpenPopup}
        />
      </div>
      {isPopupOpen && (
        <PopUp2
          fields={fields}
          newRowData={newProject}
          handleInputChange={handleInputChange}
          handleClosePopup={handleClosePopup}
          handleAddRow={handleAddRow}
          lcaNames={lcaNames}
          lcaIdMapping={lcaIdMapping}
        />
      )}
    </div>
  );
}
