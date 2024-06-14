// importing react features to use states, effects, and links
import React, { useState, useEffect } from 'react';
import { generalFunction } from '../../assets/Config/generalFunction';
import  Button from '../Common/CommonComponents/Button'
import  Table from '../Common/CommonComponents/Table'
import PopUp from '../Common/CommonComponents/PopUp'

export default function SupplierAnalytics() {
    const [supplierData, setSupplierData] = useState({});
    const [productData, setProductData] = useState([]);
    const [isProdBtnOpen, setProdBtnOpen] = useState(false);
    const [newProd, setNewProd] = useState({ product_name: '', serial_number: '', last_exported: '', volume: '', supplier_id: '' });
    const [isEditProdOpen, setEditProdOpen] = useState(false);
    const [prodRowData, setProdRowData] = useState({ id: '', product_name: '', serial_number: '', last_exported: '', volume: '' });
    const [prodRowIndex, setProdRowIndex] = useState(-1);
    const [certificateData, setCertificateData] = useState([]);
    const [isCertBtnOpen, setCertBtnOpen] = useState(false);
    const [newCert, setNewCert] = useState({ certificate_name: '', status: '', expiration: '',  last_audited: '', link: '', notes: '', supplier_id: '' });
    const [isEditCertOpen, setEditCertOpen] = useState(false);
    const [certRowData, setCertRowData] = useState({ id: '', certificate_name: '', status: '', expiration: '', last_audited: '', link: '', notes: '' });
    const [certRowIndex, setCertRowIndex] = useState(-1);
    const [validationErrors, setValidationErrors] = useState({});

    const url = window.location.href;
    const parts = url.split('/');
    let supplier = parts[parts.length - 1];
    supplier = supplier.replace(/%20/g, ' ');

    const supFields = [
        { id: 'supplier_name', label: 'Supplier Name', type: 'text' },
        { id: 'location', label: 'Location', type: 'text' },
        { id: 'key_product', label: 'Key Product', type: 'text' },
        { id: 'sustainability_score', label: 'Sustainability Score', type: 'text' },
        { id: 'key_contact', label: 'Key Contact', type: 'text' },
        { id: 'key_email', label: 'Key Email', type: 'text' }
    ];

    const certFields = [
        { id: 'certificate_name', label: 'Certificate Name', type: 'text' },
        { id: 'status', label: 'Status', type: 'text' },
        { id: 'expiration', label: 'Expiration', type: 'date' },
        { id: 'last_audited', label: 'Last Audited', type: 'date' },
        { id: 'link', label: 'Link', type: 'text' },
        { id: 'notes', label: 'Notes', type: 'text' }
    ];

    const prodFields = [
        { id: 'product_name', label: 'Product Name', type: 'text' },
        { id: 'serial_number', label: 'Serial Number', type: 'number' },
        { id: 'last_exported', label: 'Last Exported', type: 'date' },
        { id: 'volume', label: 'Volume', type: 'number' }
    ];

    async function fetchSupplierData() {
        try {
            const data = await generalFunction.fetchSupplierAnalytics(supplier);
            if (data && data.length > 0) {
                setSupplierData(data[0]);
            }
        } catch (error) {
            console.log('Error fetching supplier analytics:', error);
        }
    }

    async function fetchProductData() {
        try {
            const data = await generalFunction.fetchSupplierProducts(supplierData);
            if (data && data.length > 0) {
                setProductData(data);
            }
        } catch (error) {
            console.log('Error fetching supplier products:', error);
        }
    }

    async function fetchCertificateData() {
        try {
            const data = await generalFunction.fetchSupplierCertificates(supplierData);
            if (data && data.length > 0) {
                setCertificateData(data);
            }
        } catch (error) {
            console.log('Error fetching supplier certificates:', error);
        }
    }

    useEffect(() => {
        fetchSupplierData()
    }, [])

    useEffect(() => {
        if (supplierData.id != null) {
            fetchProductData()
            fetchCertificateData()
        }
    }, [supplierData.id])

    const openAddCert = () => {
        setValidationErrors({});
        setCertBtnOpen(true);
    };

    const handleInputCert = (e) => {
        const { name, value } = e.target;
        setNewCert((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleCloseCertBtn = () => {
        setCertBtnOpen(false);
        setNewCert({ certificate_name: '', status: '', expiration: '',  last_audited: '', link: '', notes: '', supplier_id: '' });
    };

    const handleAddCert = () => {
        const errors = generalFunction.validateData(newCert, certFields);
        if (Object.keys(errors).length > 0) {
          setValidationErrors(errors);
          return;
        }
        setCertificateData((prevData) => [...prevData, newCert]);
        generalFunction.createSupplierCertificate(newCert, supplierData);
        handleCloseCertBtn();
    };

    const openEditCert = (row, index) => {
        setValidationErrors({});
        setCertRowData(row);
        setCertRowIndex(index);
        setEditCertOpen(true);
    }

    const handleEditCertInput = (e) => {
        const { name, value } = e.target;
        setCertRowData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    async function handleEditCertSubmit() {
        const errors = generalFunction.validateData(certRowData, certFields);
        if (Object.keys(errors).length > 0) {
          setValidationErrors(errors);
          return;
        }
        generalFunction.editSupplierCertificate(certRowData);
        setCertificateData((prevData) => {
            const newData = [...prevData];
            newData[certRowIndex] = { ...certRowData };
            return newData;
        });
        setEditCertOpen(false);
    }

    const handleCloseEditCert = () => {
        setEditCertOpen(false);
        setCertRowData({ certificate_name: '', status: '', expiration: '',  last_audited: '', link: '', notes: '' });
        setCertRowIndex(-1);
    };

    const openAddProd = () => {
        setValidationErrors({});
        setProdBtnOpen(true);
    };

    const handleInputProd = (e) => {
        const { name, value } = e.target;
        setNewProd((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleCloseProdBtn = () => {
        setProdBtnOpen(false);
        setNewProd({ product_name: '', serial_number: '', last_exported: '', volume: '', supplier_id: '' });
    };

    const handleAddProd = () => {
        const errors = generalFunction.validateData(newProd, prodFields);
        if (Object.keys(errors).length > 0) {
          setValidationErrors(errors);
          return;
        }
        setProductData((prevData) => [...prevData, newProd]);
        generalFunction.createSupplierProduct(newProd, supplierData);
        handleCloseProdBtn();
    };

    const openEditProd = (row, index) => {
        setValidationErrors({});
        setProdRowData(row);
        setProdRowIndex(index);
        setEditProdOpen(true);
    }

    const handleEditProdInput = (e) => {
        const { name, value } = e.target;
        setProdRowData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    async function handleEditProdSubmit() {
        const errors = generalFunction.validateData(prodRowData, prodFields);
        if (Object.keys(errors).length > 0) {
          setValidationErrors(errors);
          return;
        }
        generalFunction.editSupplierProduct(prodRowData);
        setProductData((prevData) => {
            const newData = [...prevData];
            newData[prodRowIndex] = { ...prodRowData };
            return newData;
        });
        setEditProdOpen(false);
    }

    const handleCloseEditProd = () => {
        setEditProdOpen(false);
        setProdRowData({ product_name: '', serial_number: '', last_exported: '', volume: '' });
        setProdRowIndex(-1);
    };

    const certActions = [
        <Button
        label="Edit"
        handleFunction = {openEditCert}
        />,
    ];

    const prodActions = [
        <Button
        label="Edit"
        handleFunction = {openEditProd}
        />,
    ];

    return (
        <div className="flex flex-col justify-center overflow-hidden mt-20 p-6">
        <h1 className="text-xl text-center mb-10">{supplierData.supplier_name}</h1>
        <Table
          fields={supFields}
          tableData={[supplierData]}
        />
        <h1 className="text-xl text-center m-10">Products</h1>
        <Table
        fields={prodFields}
        tableData={productData}
        hasActions={true}
        actions={prodActions}
        />
        <div className="mb-6 mt-10 flex items-center justify-center">
          <Button
            label="Add Product"
            handleFunction={openAddProd}
          />
        </div>
        {isProdBtnOpen && (
          <PopUp
            title='Add Product'
            fields={prodFields}
            newRowData={newProd}
            handleInputChange={handleInputProd}
            handleClosePopup={handleCloseProdBtn}
            handleSave={handleAddProd}
            validationErrors={validationErrors}
          />
        )}
        {isEditProdOpen && (
          <PopUp
            title='Edit Product'
            fields={prodFields}
            newRowData={prodRowData}
            handleInputChange={handleEditProdInput}
            handleClosePopup={handleCloseEditProd}
            handleSave={handleEditProdSubmit}
            button2Label='Edit'
            validationErrors={validationErrors}
          />
        )}
        <h1 className="text-xl text-center m-10">Certificates</h1>
        <Table
        fields={certFields}
        tableData={certificateData}
        hasActions={true}
        actions={certActions}
        />
        <div className="mb-6 mt-10 flex items-center justify-center">
          <Button
            label="Add Certificate"
            handleFunction={openAddCert}
          />
        </div>
        {isCertBtnOpen && (
          <PopUp
            title='Add Certificate'
            fields={certFields}
            newRowData={newCert}
            handleInputChange={handleInputCert}
            handleClosePopup={handleCloseCertBtn}
            handleSave={handleAddCert}
            validationErrors={validationErrors}
          />
        )}
        {isEditCertOpen && (
          <PopUp
            title='Edit Certificate'
            fields={certFields}
            newRowData={certRowData}
            handleInputChange={handleEditCertInput}
            handleClosePopup={handleCloseEditCert}
            handleSave={handleEditCertSubmit}
            button2Label='Edit'
            validationErrors={validationErrors}
          />
        )}
      </div>
    );
}