// importing react features to use states, effects, and links
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import database
import { supabase } from '../../supabaseClient';

// declare + export SupplierAnalytics component
export default function SupplierAnalytics() {
    // setup

    // supplier
    const [supplierData, setSupplierData] = useState({});

    // product
    const [productData, setProductData] = useState([]);
    const [isProdBtnOpen, setProdBtnOpen] = useState(false);
    const [newProd, setNewProd] = useState({ id: '', product_name: '', serial_number: '', last_exported: '', volume: '' });

    // cerificate
    const [certificateData, setCertificateData] = useState([]);
    const [isCertBtnOpen, setCertBtnOpen] = useState(false);
    const [newCert, setNewCert] = useState({ id: '', certificate_name: '', status: '', expiration: '',  last_audited: '', link: '', notes: '' });

    // get supplier name from url
    const url = window.location.href;
    const parts = url.split('/');
    let supplier = parts[parts.length - 1];
    // replace any %20 with spaces
    supplier = supplier.replace(/%20/g, ' ');

    // fetch all needed information once when the page loads
    useEffect(() => {
        fetchSupplierData()
        fetchProductData()
        fetchCertificateData()
    }, [supplierData])
    
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
          .eq('id', supplierData.id)
        if (data && data.length > 0) {
            setProductData(data);
        }
    }

    async function fetchCertificateData() {
        // retrieve certificate data from database
        const { data } = await supabase
          .from(`certificates`)
          .select('*')
          .eq('id', supplierData.id)
        if (data && data.length > 0) {
            setCertificateData(data);
        }
    }

    // CERTIFICATE BUTTON FUNCTIONS

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
        .from(`certificates`)
        .insert({ id: supplierData.id, certificate_name: newCert.certificate_name, status: newCert.status , expiration: newCert.expiration , last_audited: newCert.last_audited , link: newCert.link , notes: newCert.notes })
    }

    // closes add certificate popup
    const handleCloseCertBtn = () => {
        setCertBtnOpen(false);
        // resets newCert props to empty strings
        setNewCert({ id: '', certificate_name: '', status: '', expiration: '',  last_audited: '', link: '', notes: '' });
    };

    // adds new certificate to table, creates new row in database, and closes popup
    const handleAddCert = () => {
        setCertificateData((prevData) => [...prevData, newCert]);
        createCert();
        handleCloseCertBtn();
    };

    // PRODUCT BUTTON FUNCTIONS

    // opens add certificate popup
    const openAddProd = () => {
        setProdBtnOpen(true);
    };

    // updates newCertData var when input changes
    const handleInputProd = (e) => {
        // gets name + value from event target
        const { name, value } = e.target;
        // add new name + value pair to obj along w/ prev data
        setNewProd((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    // creates new certificate in the database
    async function createProd() {
        console.log("Creating product with data:", {
            id: supplierData.id, 
            product_name: newProd.product_name, 
            serial_number: newProd.serial_number, 
            last_exported: newProd.last_exported, 
            volume: newProd.volume
        });

        const { data, error } = await supabase
          .from('supplier_products')
          .insert({
              id: supplierData.id, 
              product_name: newProd.product_name, 
              serial_number: newProd.serial_number, 
              last_exported: newProd.last_exported, 
              volume: newProd.volume
          });

        if (error) {
            console.error("Error inserting product:", error);
        } else {
            console.log("Product inserted:", data);
        }
    }


    // closes add certificate popup
    const handleCloseProdBtn = () => {
        setProdBtnOpen(false);
        // resets newCert props to empty strings
        setNewProd({ id: '', product_name: '', serial_number: '', last_exported: '', volume: '' });
    };

    // adds new certificate to table, creates new row in database, and closes popup
    const handleAddProd = () => {
        setProductData((prevData) => [...prevData, newProd]);
        createProd();
        handleCloseProdBtn();
    };

    return (
    <div className="relative flex flex-col justify-center overflow-hidden mt-20">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-black-600/40 lg:max-w-4xl">
        <div className="flex flex-row justify-between">
            <h1 className="text-2xl text-left mb-4">{`${supplierData.supplier_name}`}</h1>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Request Information</button>
        </div>
            <div className="container mx-auto">
                <h2 className="text-1xl text-left mb-4 font-thin">Supplier Information</h2>
                {Object.keys(supplierData).length > 0 ? (
                    <div className="flex flex-row flex-wrap justify-center text-center m-4 ml-0 rounded-lg border-black border-[1px] border-solid">
                        {Object.entries(supplierData).map((element, index) => (
                            index !== 0 && (
                                <div key={element[0]} className="m-2">
                                    <strong className="capitalize">{element[0].replace('_', ' ')}:</strong> {element[1] || 'MISSING'}
                                </div>
                        )))}
                    </div>                        
                    ) : (
                        <p>No supplier data available.</p>
                )}
                <h2 className="text-1xl text-left mb-4 font-thin">Products</h2>
                <table className="mt-4 mb-4 w-full border-collapse border border-gray-300">
                    <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Product Name</th>
                        <th className="border border-gray-300 px-4 py-2">Serial Number</th>
                        <th className="border border-gray-300 px-4 py-2">Last Exported</th>
                        <th className="border border-gray-300 px-4 py-2">Volume</th>
                    </tr>
                    </thead>
                    <tbody>
                    {productData.map((row, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 px-4 py-2">
                                {row.product_name}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {row.serial_number}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {row.last_exported}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {row.volume}
                            </td>
                            <button className="m-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 ">Edit</button>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button onClick={openAddProd} className="px-4 py-2 mt-4 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600">Add Product</button>
                {isProdBtnOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-lg font-bold mb-4">Add Product</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                            type="text"
                            id="product_name"
                            name="product_name"
                            value={newProd.product_name}
                            onChange={handleInputProd}
                            className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                                Serial Number
                            </label>
                            <input
                            type="text"
                            id="serial_number"
                            name="serial_number"
                            value={newProd.serial_number}
                            onChange={handleInputProd}
                            className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Last Exported
                            </label>
                            <input
                            type="text"
                            id="last_exported"
                            name="last_exported"
                            value={newProd.last_exported}
                            onChange={handleInputProd}
                            className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Volume
                            </label>
                            <input
                            type="text"
                            id="volume"
                            name="volume"
                            value={newProd.volume}
                            onChange={handleInputProd}
                            className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                            onClick={handleCloseProdBtn}
                            className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                            Cancel
                            </button>
                            <button
                            onClick={handleAddProd}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                            >
                            Add
                            </button>
                        </div>
                        </form>
                    </div>
                    </div>
                )}
                <h2 className="text-1xl text-left mb-4 font-thin">Certification</h2>
                <table className="mt-4 mb-4 w-full border-collapse border border-gray-300">
                    <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Certificate Name</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                        <th className="border border-gray-300 px-4 py-2">Expiration Date</th>
                        <th className="border border-gray-300 px-4 py-2">Last Audited</th>
                        <th className="border border-gray-300 px-4 py-2">Link</th>
                        <th className="border border-gray-300 px-4 py-2">Notes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {certificateData.map((row, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 px-4 py-2">
                                {row.certificate_name}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {row.status}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {row.expiration}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {row.last_audited}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {row.link}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {row.notes}
                            </td>
                            <button className="m-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 ">Edit</button>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button onClick={openAddCert} className="px-4 py-2 mt-4 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600">Add Certificate</button>
                {isCertBtnOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-lg font-bold mb-4">Add Certificate</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                            type="text"
                            id="certificate_name"
                            name="certificate_name"
                            value={newCert.certificate_name}
                            onChange={handleInputCert}
                            className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <input
                            type="text"
                            id="status"
                            name="status"
                            value={newCert.status}
                            onChange={handleInputCert}
                            className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Expiration Date
                            </label>
                            <input
                            type="text"
                            id="expiration"
                            name="expiration"
                            value={newCert.expiration}
                            onChange={handleInputCert}
                            className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Last Audited
                            </label>
                            <input
                            type="text"
                            id="last_audited"
                            name="last_audited"
                            value={newCert.last_audited}
                            onChange={handleInputCert}
                            className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Link
                            </label>
                            <input
                            type="text"
                            id="link"
                            name="link"
                            value={newCert.link}
                            onChange={handleInputCert}
                            className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Notes
                            </label>
                            <input
                            type="text"
                            id="notes"
                            name="notes"
                            value={newCert.notes}
                            onChange={handleInputCert}
                            className="border border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                            onClick={handleCloseCertBtn}
                            className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                            Cancel
                            </button>
                            <button
                            onClick={handleAddCert}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                            >
                            Add
                            </button>
                        </div>
                        </form>
                    </div>
                    </div>
                )}
            </div>
        </div>
    </div>
    );
}