// importing react features to use states, effects, and links
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import database
import { supabase } from '../../supabaseClient';

// declare + export SupplierAnalytics component
export default function SupplierAnalytics() {
    // setup
    const [supplierData, setSupplierData] = useState({});
    const [productData, setProductData] = useState([]);
    const [certificateData, setCertificateData] = useState([]);
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
    }, [])
    
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
          .eq('supplier_name', supplier)
        if (data && data.length > 0) {
            setProductData(data);
        }
    }

    async function fetchCertificateData() {
        // retrieve certificate data from database
        const { data } = await supabase
          .from(`certificates`)
          .select('*')
          .eq('supplier_name', supplier)
        if (data && data.length > 0) {
            setCertificateData(data);
        }
    }

    /* want to return:
    - exporter name
    - sustainability score
    - basic info
    - ceritification
    */
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
            </div>
        </div>
    </div>
    );
}