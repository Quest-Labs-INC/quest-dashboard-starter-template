import { useContext, useEffect, useState } from "react";
// import "";
import './Settings.css'
import InputComponent from "../Common/CommonComponents/InputComponent";
import { importConfig } from "../../assets/Config/importConfig";
import { ThemeContext } from "../Common/appContext";
import { deleteIcon, searchIcon } from "../Common/SideBarSvg";

// export default function Settings() {
//     const [userData, setUserData] = useState({
//         name: "",
//         subtitle: "",
//         about: "",
//         bannerUrl: "",
//     })

//     const handleChange = (event) => {
//         setUserData({
//             ...userData,
//             [event.target.name]: event.target.value
//         })
//     }

//     return (
//         <div className="w-full">
//             <div className="w-5/6 m-auto md:w-3/4">
//                 <div className="">
//                     <div>
//                         <label htmlFor="bannerUrl" className="relative">
//                             {
//                                 userData.bannerUrl
//                                     ? <img src={userData.bannerUrl} alt="" className="w-full h-32" />
//                                     : <div className="w-full h-32" style={{ background: "linear-gradient(to right,#09080d,#190a21,#260d20)" }}></div>
//                             }
//                             <div className="absolute w-full h-32 flex items-center justify-center top-0 text-xs text-white cursor-pointer hover:underline opacity-0 hover:opacity-100 duration-300">Upload banner image</div>
//                         </label>
//                         <input type="file" className="hidden" name="bannerUrl" id="bannerUrl" />
//                     </div>
//                 </div>

//                 <div className="">
//                     <div className="w-20 h-20 m-auto -translate-y-10">
//                         <label htmlFor="imageUrl" className="relative w-20 h-20">
//                             <img src={userData.imageUrl ? userData.imageUrl : importConfig.settings.userImage} alt="" className="w-20 h-20" />
//                             <div className="absolute w-20 h-20 flex items-center justify-center top-0 text-xs cursor-pointer hover:underline opacity-0 hover:opacity-100 duration-300">
//                                 <img src={importConfig.settings.uploadIcon} className="w-10 h-10" alt="" />
//                             </div>
//                         </label>
//                         <input type="file" className="hidden" name="imageUrl" id="imageUrl" />
//                     </div>
//                 </div>

//                 <div className="grid w-100 gap-x-5 grid-cols-1 md:grid-cols-2">
//                     <InputComponent
//                         inputTitle={"Name"}
//                         isMandatory={true}
//                         name={"name"}
//                         value={userData.name}
//                         onChange={(e) => handleChange(e)}
//                     />
//                     <InputComponent
//                         inputTitle={"Subtitle"}
//                         isMandatory={false}
//                         name={"subtitle"}
//                         value={userData.subtitle}
//                         onChange={(e) => handleChange(e)}
//                     />
//                     <InputComponent
//                         inputTitle={"About"}
//                         isMandatory={false}
//                         name={"about"}
//                         value={userData.about}
//                         onChange={(e) => handleChange(e)}
//                     />
//                     <InputComponent
//                         inputTitle={"Location"}
//                         isMandatory={false}
//                         name={"location"}
//                         value={userData.location}
//                         onChange={(e) => handleChange(e)}
//                     />
//                 </div>
//                 <button className="btn-gradient w-full mt-4">Save Details</button>
//             </div>
//         </div>
//     )
// }


export default function Settings() {
    const { theme, bgColors, appConfig } = useContext(ThemeContext);
    const [userData, setUserData] = useState({
        name: "",
        subtitle: "",
        about: "",
        bannerUrl: "",
    })
    const [section, setSection] = useState('edit');
    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })
    }

    const handleSectionChange = (sectionName) => {
        setSection(sectionName);
    }
    const [adminData, setAdminData] = useState([
        {
            name: "Rich",
            emails: ["rich@gmail.com"],
            role: "se",
            statue: "active",
        },
        {
            name: "Rich",
            emails: ["rich@gmail.com"],
            role: "se",
            statue: "active",
        },
        {
            name: "Rich",
            emails: ["rich@gmail.com"],
            role: "Product manager",
            statue: "active",
        },
        {
            name: "Rich",
            emails: ["rich@gmail.com"],
            role: "se",
            statue: "active",
        },
        {
            name: "Rich",
            emails: ["rich@gmail.com"],
            role: "se",
            statue: "active",
        },
        {
            name: "Rich",
            emails: ["rich@gmail.com"],
            role: "se",
            statue: "active",
        },
        {
            name: "Rich",
            emails: ["rich@gmail.com"],
            role: "Product manager",
            statue: "active",
        },
        {
            name: "Rich",
            emails: ["rich@gmail.com"],
            role: "se",
            statue: "active",
        },
        {
            name: "Rich9",
            emails: ["rich@gmail.com"],
            role: "Product manager",
            statue: "active",
        },
    ]);

    // const [adminData, setAdminData] = useState([]);

    useEffect(() => {
        const fetchAdmins = async () => {
            console.log("fet")
            const { data } = await axios.get('https://staging.questprotocol.xyz/api/entities/e-c6895222-ac01-4640-8c59-6101661deb8d/admins', {
                headers: {
                    apikey: "k-2fb4e0f9-3808-4def-a3a6-89e93e84c3f7",
                    userid: "u-88350caa-4080-4505-a169-09f3f15e83b7",
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTg4MzUwY2FhLTQwODAtNDUwNS1hMTY5LTA5ZjNmMTVlODNiNyIsImlhdCI6MTcwOTgwMzc0NCwiZXhwIjoxNzEwNDA4NTQ0fQ.bDlPaNDCStrtcW9WwW0toa_Dep2O06O_GhRQDsGDWtk"
                }

            });

            console.log(data);
            console.log(data.data);
            setAdminData(data.data);
        }
        fetchAdmins();
    }, []);

    return (
        <div className="settings-page">
            {/* header  */}
            <div className="settings-page-header" style={{ backgroundColor: bgColors[`${theme}-primary-bg-color-3`] }}>
                <div>
                    <p style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}>Settings</p>
                </div>
            </div>


            {/* for buttons  */}
            <div className="settings-page-edit-btns-div">
                <div className="settings-page-edit-btns">
                    <button className={`${section === 'edit' ? "selected" : "not-selected"}`} onClick={() => handleSectionChange('edit')}>
                        <p style={{ color: bgColors[`${section === 'manage' ? theme : ''}-color-premitive-grey-5`] }}>Edit Profile</p>
                    </button>
                    <button className={`${section === 'manage' ? "selected" : "not-selected"}`} onClick={() => handleSectionChange('manage')} >
                        <p style={{ color: bgColors[`${section === 'edit' ? theme : ''}-color-premitive-grey-5`] }} >
                            Manage admin
                        </p>
                    </button>
                </div>
            </div>

            {
                section === 'edit' ?
                    <div className="settings-page-edit-profile-div">
                        <div className="settings-page-edit-profile">

                            {/* profile img  */}
                            <div className="edit-profile-img">
                                <img src={deleteIcon} alt="" />
                            </div>

                            {/* for name title  */}
                            <div className="edit-name-job-title">
                                <div className="name">
                                    <p>Enter  Name*</p>
                                    <input type="text" placeholder="Enter name" required style={{
                                        backgroundColor: bgColors[`${theme}-primary-bg-color-3`],
                                        color: bgColors[`${theme}-color-premitive-grey-5`]
                                    }} />
                                </div>
                                <div className="name">
                                    <p>Enter Job Title*</p>
                                    <input type="text" required placeholder="Product Manager name" style={{
                                        backgroundColor: bgColors[`${theme}-primary-bg-color-3`],
                                        color: bgColors[`${theme}-color-premitive-grey-5`]
                                    }} />
                                </div>
                            </div>

                            {/* email no  */}
                            <div className="edit-name-job-title">
                                <div className="name">
                                    <p>Enter  Email*</p>
                                    <input type="email" required placeholder="Enter email" style={{
                                        backgroundColor: bgColors[`${theme}-primary-bg-color-3`],
                                        color: bgColors[`${theme}-color-premitive-grey-5`]
                                    }} />
                                </div>
                                <div className="name">
                                    <p>Enter Contact No*</p>
                                    <input type="number" required placeholder="Contact No" style={{
                                        backgroundColor: bgColors[`${theme}-primary-bg-color-3`],
                                        color: bgColors[`${theme}-color-premitive-grey-5`]
                                    }} />
                                </div>
                            </div>

                            {/* descrpt  */}
                            <div className="edit-description">
                                <p className="desc-label">
                                    Enter Your Description*
                                </p>

                                <div>
                                    <textarea name="" id="" cols="30" rows="6" style={{
                                        backgroundColor: bgColors[`${theme}-primary-bg-color-3`],
                                        color: bgColors[`${theme}-color-premitive-grey-5`]
                                    }} ></textarea>
                                </div>

                                <p className="words-limit">
                                    0/120 Characters
                                </p>
                            </div>

                            {/* btn  */}
                            <button style={{ background: bgColors[`${theme}-primary-bg-color-0`] }}>
                                <p>Update</p>
                            </button>
                        </div>
                    </div>
                    :
                    <div className="settings-page-admin-section">

                        <div className="settings-page-search-section-div">
                            <div className="settings-page-search-section">
                                <div className="search-cont">
                                    <input type="text" placeholder="Search here" style={{ backgroundColor: bgColors[`${theme}-primary-bg-color-3`] }} />
                                    <button>
                                        {searchIcon()}
                                    </button>
                                </div>
                                <button style={{ background: bgColors[`${theme}-primary-bg-color-0`] }}>
                                    <p>Search</p>
                                </button>
                            </div>
                        </div>


                        {/* for admins */}
                        <div className="settings-page-manage-admin-div">
                            <div className="settings-page-manage-admin" style={{ backgroundColor: bgColors[`${theme}-primary-bg-color-3`] }}>

                                <div className="sr-user-head-row" style={{ backgroundColor: bgColors[`${theme}-primary-bg-color-3`] }}>
                                    <div className="sr">
                                        <p style={{ color: bgColors[`${theme}-color-premitive-grey-4`] }}>Sr</p>
                                    </div>
                                    <div className="user" >
                                        <p style={{ color: bgColors[`${theme}-color-premitive-grey-4`] }}>User</p>
                                    </div>
                                    <div className="email">
                                        <p style={{ color: bgColors[`${theme}-color-premitive-grey-4`] }}>Email Address</p>
                                    </div>
                                    <div className="role">
                                        <p style={{ color: bgColors[`${theme}-color-premitive-grey-4`] }}>Role</p>
                                    </div>
                                    <div className="status">
                                        <p style={{ color: bgColors[`${theme}-color-premitive-grey-4`] }}>Status</p>
                                    </div>
                                    <div className="action">
                                        <p style={{ color: bgColors[`${theme}-color-premitive-grey-4`] }}>Actions</p>
                                    </div>
                                    {/* </div> */}
                                </div>

                                {
                                    adminData.map((user, index) => {
                                        console.log(user)
                                        return (
                                            <div className="sr-user-user-row" style={{ backgroundColor: bgColors[`${theme}-primary-bg-color-3`] }}>
                                                <div className="sr">
                                                    <p style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}>{index + 1}</p>
                                                </div>
                                                <div className="user" >
                                                    {/* <img src="" alt="" /> */}
                                                    <img src={user.imageUrl} alt="" />
                                                    <p style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}>{user.name}</p>
                                                </div>
                                                <div className="email">
                                                    <p style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}>{user.emails[0]}</p>
                                                </div>
                                                <div className="role">
                                                    <p style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}>{user.role}</p>
                                                </div>
                                                <div className="status">
                                                    <p style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}>{user.isActive === true ? "Active" : "Pending"}</p>
                                                </div>
                                                <div className="actions">
                                                    <button style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}>{deleteIcon()}</button>
                                                </div>
                                                {/* </div> */}
                                            </div>
                                        )
                                    })
                                }


                            </div>
                        </div>
                    </div>
            }
            {/* for profile data  */}


        </div>
    )

    // return (
    //     <div className="w-full bg-slate-600">
    //         <div className="w-5/6 m-auto md:w-3/4">
    //             <div className="">
    //                 <div>
    //                     <label htmlFor="bannerUrl" className="relative">
    //                         {
    //                             userData.bannerUrl
    //                                 ? <img src={userData.bannerUrl} alt="" className="w-full h-32" />
    //                                 : <div className="w-full h-32" style={{ background: "linear-gradient(to right,#09080d,#190a21,#260d20)" }}></div>
    //                         }
    //                         <div className="absolute w-full h-32 flex items-center justify-center top-0 text-xs text-white cursor-pointer hover:underline opacity-0 hover:opacity-100 duration-300">Upload banner image</div>
    //                     </label>
    //                     <input type="file" className="hidden" name="bannerUrl" id="bannerUrl" />
    //                 </div>
    //             </div>
    //             <div className="">
    //                 <div className="w-20 h-20 m-auto -translate-y-10">
    //                     <label htmlFor="imageUrl" className="relative w-20 h-20">
    //                         <img src={userData.imageUrl ? userData.imageUrl : importConfig.settings.userImage} alt="" className="w-20 h-20" />
    //                         <div className="absolute w-20 h-20 flex items-center justify-center top-0 text-xs cursor-pointer hover:underline opacity-0 hover:opacity-100 duration-300">
    //                             <img src={importConfig.settings.uploadIcon} className="w-10 h-10" alt="" />
    //                         </div>
    //                     </label>
    //                     <input type="file" className="hidden" name="imageUrl" id="imageUrl" />
    //                 </div>
    //             </div>
    //             <div className="grid w-100 gap-x-5 grid-cols-1 md:grid-cols-2">
    //                 <InputComponent
    //                     inputTitle={"Name"}
    //                     isMandatory={true}
    //                     name={"name"}
    //                     value={userData.name}
    //                     onChange={(e) => handleChange(e)}
    //                 />
    //                 <InputComponent
    //                     inputTitle={"Subtitle"}
    //                     isMandatory={false}
    //                     name={"subtitle"}
    //                     value={userData.subtitle}
    //                     onChange={(e) => handleChange(e)}
    //                 />
    //                 <InputComponent
    //                     inputTitle={"About"}
    //                     isMandatory={false}
    //                     name={"about"}
    //                     value={userData.about}
    //                     onChange={(e) => handleChange(e)}
    //                 />
    //                 <InputComponent
    //                     inputTitle={"Location"}
    //                     isMandatory={false}
    //                     name={"location"}
    //                     value={userData.location}
    //                     onChange={(e) => handleChange(e)}
    //                 />
    //             </div>
    //             <button className="btn-gradient w-full mt-4">Save Details</button>
    //         </div>
    //     </div>
    // )
}