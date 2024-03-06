import React, { useEffect, useState } from 'react';
import { generalFunction } from '../../assets/Config/generalFunction';

const ChangeEntityPopup = ({setChangeEntityPopup, setAdminEntity}) => {
    const [selected, setSelected] = useState("");
    
    useEffect(() => {
        setSelected(generalFunction.getDataFromCookies("adminCommunityId"));
    }, [])

    const clickHadnler = (e) => {
        if (document.getElementById("clickboxent").contains(e.target)) {
        } else {
            setChangeEntityPopup(false);
        }
    };

    const handleSave = () => {
        let entities = generalFunction.getDataFromCookies("allEntity");
        let selectedEntity = entities?.filter((ele) => ele.id == selected);
        generalFunction.setDataInCookies("adminCommunityId", selectedEntity[0]?.id);
        generalFunction.setDataInCookies("communityImageUrl", selectedEntity[0]?.imageUrl || "");
        setAdminEntity(selectedEntity[0]?.id);
        setChangeEntityPopup()
    }
    return (
        <div className='w-screen h-screen flex justify-center items-center fixed top-0 left-0 bg-[rgba(0,0,0,.15)] backdrop-blur-sm z-10' onClick={clickHadnler}>
            <div id='clickboxent' className='w-full max-w-[376px] bg-white flex flex-col p-6 rounded-xl'>
                <label htmlFor="">Choose entity</label>
                <select name="" id="" value={selected} onChange={(e) => setSelected(e.target.value)} className='mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
                    {
                        generalFunction.getDataFromCookies("allEntity")?.map((ele, i) => (
                            <option value={ele.id} key={ele.id}>{ele.name}</option>
                        ))
                    }
                </select>
                <button className='mt-8 px-4 py-2.5 bg-violet-700 rounded-[10px] text-white text-sm font-semibold font-["Figtree"]' onClick={handleSave}>Save selected entity</button>
            </div>
        </div>
    );
}

export default ChangeEntityPopup;
