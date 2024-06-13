// importing react features to use states, effects, and links
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import  Button from '../Common/CommonComponents/Button'
import  Table from '../Common/CommonComponents/Table'
import PopUp from '../Common/CommonComponents/PopUp'

// declare + export SupplierAnalytics component
export default function SupplierAnalytics() {
    // SETUP

    // supplier
    const [supplierData, setSupplierData] = useState({});

    // product
    const [productData, setProductData] = useState([]);
    const [isProdBtnOpen, setProdBtnOpen] = useState(false);
    const [newProd, setNewProd] = useState({ supplier_id: '', product_name: '', serial_number: '', last_exported: '', volume: '' });
    // edit product
    const [isEditProdOpen, setEditProdOpen] = useState(false);
    const [prodRowData, setProdRowData] = useState({ id: '', product_name: '', serial_number: '', last_exported: '', volume: '' });
    const [prodRowIndex, setProdRowIndex] = useState(-1);

    // cerificate
    const [certificateData, setCertificateData] = useState([]);
    const [isCertBtnOpen, setCertBtnOpen] = useState(false);
    const [newCert, setNewCert] = useState({ certificate_name: '', status: '', expiration: '',  last_audited: '', link: '', notes: '', supplier_id: '' });
    // edit certificate
    const [isEditCertOpen, setEditCertOpen] = useState(false);
    const [certRowData, setCertRowData] = useState({ id: '', certificate_name: '', status: '', expiration: '', last_audited: '', link: '', notes: '' });
    const [certRowIndex, setCertRowIndex] = useState(-1);

    // get supplier name from url
    const url = window.location.href;
    const parts = url.split('/');
    let supplier = parts[parts.length - 1];
    // replace any %20 with spaces
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
        { id: 'serial_number', label: 'Serial Number', type: 'text' },
        { id: 'last_exported', label: 'Last Exported', type: 'date' },
        { id: 'volume', label: 'Volume', type: 'text' }
    ];

    async function fetchSupplierData() {
        // retrieve supplier data from database
        const { data } = await supabase
          .from(`supplier_management`)
          .select('*')
          .eq('supplier_name', supplier)
        if (data && data.length > 0) {
            setSupplierData(data[0]);
        }
    }

    async function fetchProductData() {
        // retrieve product data from database
        const { data } = await supabase
          .from(`supplier_products`)
          .select('*')
          .eq('supplier_id', supplierData.id)
        if (data && data.length > 0) {
            setProductData(data);
        }
    }

    async function fetchCertificateData() {
        // retrieve certificate data from database
        const { data } = await supabase
          .from(`supplier_certificates`)
          .select('*')
          .eq('supplier_id', supplierData.id)
        if (data && data.length > 0) {
            setCertificateData(data);
        }
    }

    // fetch all needed information once when the page loads
    useEffect(() => {
        fetchSupplierData()
    }, [])

    useEffect(() => {
        if (supplierData.id != null) {
            fetchProductData()
            fetchCertificateData()
        }
    }, [supplierData.id])

    // ADD CERTIFICATE BUTTON FUNCTIONS

    // opens add certificate popup
    const openAddCert = () => {
        setCertBtnOpen(true);
    };

    // updates newCertData var when input changes
    const handleInputCert = (e) => {
        // gets name + value from event target
        const { name, value } = e.target;
        // add new name + value pair to obj along w/ prev data
        setNewCert((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    // creates new certificate in the database
    async function createCert() {
        await supabase
        .from(`supplier_certificates`)
        .insert({ certificate_name: newCert.certificate_name, status: newCert.status , expiration: newCert.expiration , last_audited: newCert.last_audited , link: newCert.link , notes: newCert.notes, supplier_id: supplierData.id })
    }

    // closes add certificate popup
    const handleCloseCertBtn = () => {
        setCertBtnOpen(false);
        // resets newCert props to empty strings
        setNewCert({ certificate_name: '', status: '', expiration: '',  last_audited: '', link: '', notes: '', supplier_id: '' });
    };

    // adds new certificate to table, creates new row in database, and closes popup
    const handleAddCert = () => {
        setCertificateData((prevData) => [...prevData, newCert]);
        createCert();
        handleCloseCertBtn();
    };

    //  EDIT CERTIFICATE BUTTON FUNCTIONS 

    // opens edit certificate popup
    const openEditCert = (row, index) => {
        // set row data
        setCertRowData(row);
        // set index
        setCertRowIndex(index);
        // open edit popup
        setEditCertOpen(true);
    }

    // handle input changes in the edit certificate form
    const handleEditCertInput = (e) => {
        const { name, value } = e.target;
        setCertRowData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // submit edited certificate data
    async function handleEditCertSubmit() {
        // update certificate data in database
        await supabase
            .from('supplier_certificates')
            .update({
                certificate_name: certRowData.certificate_name,
                status: certRowData.status,
                expiration: certRowData.expiration,
                last_audited: certRowData.last_audited,
                link: certRowData.link,
                notes: certRowData.notes,
            })
            .eq('id', certRowData.id);

        // update the table with the edited certificate data
        setCertificateData((prevData) => {
            const newData = [...prevData];
            newData[certRowIndex] = { ...certRowData };
            return newData;
        });

        // close the edit form
        setEditCertOpen(false);
    }

    // close the edit certificate popup
    const handleCloseEditCert = () => {
        setEditCertOpen(false);
        // resets newCert props to empty strings
        setCertRowData({ certificate_name: '', status: '', expiration: '',  last_audited: '', link: '', notes: '' });
        setCertRowIndex(-1);
    };

    // ADD PRODUCT BUTTON FUNCTIONS

    // opens add product popup
    const openAddProd = () => {
        setProdBtnOpen(true);
    };

    // updates newProdData var when input changes
    const handleInputProd = (e) => {
        // gets name + value from event target
        const { name, value } = e.target;
        // add new name + value pair to obj along w/ prev data
        setNewProd((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    // creates new product in the database
    async function createProd() {
        console.log("Creating product with data:", {
            supplier_id: supplierData.id, 
            product_name: newProd.product_name, 
            serial_number: newProd.serial_number, 
            last_exported: newProd.last_exported, 
            volume: newProd.volume
        });

        const { data, error } = await supabase
          .from('supplier_products')
          .insert({ 
              product_name: newProd.product_name, 
              serial_number: newProd.serial_number, 
              last_exported: newProd.last_exported, 
              volume: newProd.volume,
              supplier_id: supplierData.id,
          });

        if (error) {
            console.error("Error inserting product:", error);
        } else {
            console.log("Product inserted:", data);
        }
    }

    // closes add product popup
    const handleCloseProdBtn = () => {
        setProdBtnOpen(false);
        // resets newProd props to empty strings
        setNewProd({ supplier_id: '', product_name: '', serial_number: '', last_exported: '', volume: '' });
    };

    // adds new certificate to table, creates new row in database, and closes popup
    const handleAddProd = () => {
        setProductData((prevData) => [...prevData, newProd]);
        createProd();
        handleCloseProdBtn();
    };

    //  EDIT PRODUCT BUTTON FUNCTIONS 

    // opens edit certificate popup
    const openEditProd = (row, index) => {
        // set row data
        setProdRowData(row);
        // set index
        setProdRowIndex(index);
        // open edit popup
        setEditProdOpen(true);
    }

    // handle input changes in the edit certificate form
    const handleEditProdInput = (e) => {
        const { name, value } = e.target;
        setProdRowData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // submit edited certificate data
    async function handleEditProdSubmit() {
        // update certificate data in database
        await supabase
            .from('supplier_products')
            .update({
                product_name: prodRowData.product_name,
                serial_number: prodRowData.serial_number,
                last_exported: prodRowData.last_exported,
                volume: prodRowData.volume
            })
            .eq('id', prodRowData.id);

        // update the table with the edited certificate data
        setProductData((prevData) => {
            const newData = [...prevData];
            newData[prodRowIndex] = { ...prodRowData };
            return newData;
        });

        // close the edit form
        setEditProdOpen(false);
    }

    // close the edit product popup
    const handleCloseEditProd = () => {
        setEditProdOpen(false);
        // resets newCert props to empty strings
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
            handleFunction = {openAddProd}
          />
        </div>
        {isProdBtnOpen && (
          <PopUp
            popupTitle='Add Product'
            fields={prodFields}
            newRowData={newProd}
            handleInputChange={handleInputProd}
            handleClosePopup={handleCloseProdBtn}
            handleAddRow={handleAddProd}
          />
        )}
        {isEditProdOpen && (
          <PopUp
            popupTitle='Edit Product'
            fields={prodFields}
            newRowData={prodRowData}
            handleInputChange={handleEditProdInput}
            handleClosePopup={handleCloseEditProd}
            handleAddRow={handleEditProdSubmit}
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
            handleFunction = {openAddCert}
          />
        </div>
        {isCertBtnOpen && (
          <PopUp
            popupTitle='Add Certificate'
            fields={certFields}
            newRowData={newCert}
            handleInputChange={handleInputCert}
            handleClosePopup={handleCloseCertBtn}
            handleAddRow={handleAddCert}
          />
        )}
        {isEditCertOpen && (
          <PopUp
            popupTitle='Edit Certificate'
            fields={certFields}
            newRowData={certRowData}
            handleInputChange={handleEditCertInput}
            handleClosePopup={handleCloseEditCert}
            handleAddRow={handleEditCertSubmit}
          />
        )}
      </div>
    );
}