import { useContext, useEffect, useState } from "react";
import './Settings.css'
import InputComponent from "../Common/CommonComponents/InputComponent";
import { importConfig } from "../../assets/Config/importConfig";
import { ThemeContext } from "../Common/appContext";
import { deleteIcon, searchIcon } from "../Common/SideBarSvg";
import axios from "axios";
import { uploadImageToBackend } from "../../utils/UploadImage";
import { generalFunction } from "../../assets/Config/GeneralFunction";
import { mainConfig } from "../../assets/Config/appConfig";

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
    // const [userData, setUserData] = useState({
    //     name: "",
    //     subtitle: "",
    //     about: "",
    //     bannerUrl: "",
    // })
    const [section, setSection] = useState('edit');
    // const handleChange = (event) => {
    //     setUserData({
    //         ...userData,
    //         [event.target.name]: event.target.value
    //     })
    // }

    const handleSectionChange = (sectionName) => {
        setSection(sectionName);
    }
    const [adminData, setAdminData] = useState([]);

    const [search, setSearch] = useState('');
    const [name, setName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [about, setAbout] = useState('');

    // const [adminData, setAdminData] = useState([]);

    const headers = {
        apikey: appConfig.QUEST_API_KEY,
        userid: generalFunction.getDataFromCookies("questUserId"),
        token: generalFunction.getDataFromCookies("questUserToken")
    }

    useEffect(() => {
        // console.log("129 loader deting")
        // generalFunction.showLoader();
        const getuser = async () => {
            const { data } = await axios.get(`${mainConfig.BACKEND_URL}api/users/${headers.userid}`, {
                headers: headers
            });
            setName(data.data.name);
            setJobTitle(data.data.role);
            setAbout(data.data.about)
            setImageUrl(data.data.imageUrl)
            // generalFunction.hideLoader();
        }
        getuser();

        const getAdmins = async () => {
            // generalFunction.showLoader();
            const { data } = await axios.get(`${mainConfig.BACKEND_URL}api/entities/${appConfig.QUEST_ENTITY_ID}/admins?userId=${headers.userid}`, {
                headers: headers
            });
            setAdminData(data.data);
            // generalFunction.hideLoader();
        }
        getAdmins();

    }, []);

    const [imageUrl, setImageUrl] = useState('');

    // const inputFileChangeHandler2 = async (event) => {
    //     // General.shareInstance.fireTrackingEvent("upload_image", "edit_profile");
    //     console.log(event.target.files);
    //     if (event.target.files[0]) {
    //         if (event.target.id === "cover-img") {
    //             setProfileUrl(URL.createObjectURL(event.target.files[0]));
    //             // setCoverSelectedFile(event.target.files[0]);
    //         } else {
    //             // setImageUrl(URL.createObjectURL(event.target.files[0]));
    //             setImageUrl(event.target.files[0]);
    //             // setProfileSelectedFile(event.target.files[0]);
    //             console.log(imageUrl)
    //             // upload file 
    //         }
    //     }
    // };
    const [selectedFile, setSelectedFile] = useState(null);

    const [customImage, setCustomImage] = useState("");
    const inputFileChangeHandler = (event) => {
        if (event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            // setImageUrl(URL.createObjectURL(event.target.files[0]));
            setImageUrl(event.target.files[0]);
            setCustomImage(URL.createObjectURL(event.target.files[0]))
        }
    };

    useEffect(() => {
        // generalFunction.showLoader();
        const uploadFile = async () => {
            const { data } = await uploadImageToBackend(selectedFile);
            setImageUrl(data.imageUrl);
            generalFunction.hideLoader();
        }
        uploadFile();
    }, [selectedFile])


    const updateProfile = () => {
        // generalFunction.showLoader();
        const updateProfileFunc = async () => {
            const data = await axios.post(`${mainConfig.BACKEND_URL}api/users/${headers.userid}`, {
                name: name,
                about: about,
                role: jobTitle,
                imageUrl: imageUrl
            }, {
                headers: headers
            });
            generalFunction.hideLoader()
        }
        updateProfileFunc();
    }

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


                {
                    section === 'edit' ?
                        <div className="settings-page-edit-profile-div">
                            <div className="settings-page-edit-profile">

                                {/* profile img  */}
                                {/* <div className="edit-profile-img">
                                    <img src={deleteIcon} alt="" />
                                    <input onChange={inputFileChangeHandler} id="profile-img" type="file" accept="image/*" />
                                    <input id="cover-img" type="file" accept="image/*" />
                                </div> */}


                                <div
                                    className="w-[100px] h-[100px] flex items-center justify-center rounded-full bg-[#F4EBFF] m-auto relative"
                                >
                                    {(imageUrl || customImage) && (
                                        <img
                                            style={{
                                                objectFit: "cover",
                                                height: "100%",
                                                width: "100%",
                                                borderRadius: "100%"
                                            }}
                                            src={imageUrl || customImage}
                                            alt=""
                                        />
                                    )}
                                    <div
                                        className={`q-input-container ${imageUrl ? "opacity-0" : "opacity-100"}`}
                                    >
                                        <label className="cursor-pointer" htmlFor='profile-img'>
                                            <img
                                                className="w-10 absolute top-7 left-7"
                                                src={importConfig.main.upload}
                                                alt=""
                                            />
                                        </label>
                                        <input
                                            onChange={inputFileChangeHandler}
                                            id="profile-img"
                                            type="file"
                                            accept="image/*"
                                            className='hidden'
                                        />
                                    </div>
                                </div>


                                {/* for name title  */}
                                <div className="edit-name-job-title">
                                    <div className="name">
                                        <p>Enter  Name*</p>
                                        <input type="text" placeholder="Enter name" required style={{
                                            backgroundColor: bgColors[`${theme}-primary-bg-color-3`],
                                            color: bgColors[`${theme}-color-premitive-grey-5`]
                                        }}

                                            value={name} onChange={(e) => {
                                                // console.log("name is", e.target.value)
                                                setName(e.target.value);
                                            }} />
                                    </div>
                                    <div className="name">
                                        <p>Enter Job Title*</p>
                                        <input type="text" required placeholder="Product Manager name" style={{
                                            backgroundColor: bgColors[`${theme}-primary-bg-color-3`],
                                            color: bgColors[`${theme}-color-premitive-grey-5`]
                                        }}
                                            value={jobTitle} onChange={(e) => {
                                                console.log("job is", e.target.value)
                                                setJobTitle(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* email no  */}
                                {/* <div className="edit-name-job-title">
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
                                </div> */}

                                {/* descrpt  */}
                                <div className="edit-description">
                                    <p className="desc-label">
                                        Enter Your Description*
                                    </p>

                                    <div>
                                        <textarea name="" id="" cols="30" rows="6" style={{
                                            backgroundColor: bgColors[`${theme}-primary-bg-color-3`],
                                            color: bgColors[`${theme}-color-premitive-grey-5`]
                                        }}

                                            value={about} onChange={(e) => {
                                                // console.log("desc is", e.target.value)
                                                setAbout(e.target.value);
                                            }} ></textarea>
                                    </div>

                                    <p className="words-limit">
                                        0/120 Characters
                                    </p>
                                </div>

                                {/* btn  */}
                                <button style={{ background: bgColors[`${theme}-primary-bg-color-0`] }} onClick={updateProfile}>
                                    <p>Update</p>
                                </button>
                            </div>
                        </div>
                        :
                        <div className="settings-page-search-admin-section-div">
                            <div className="settings-page-search-section-div">

                                <div className="h-14 flex border border-[#EFEFEF] rounded-[10px] w-full">
                                    <div className="flex items-center h-full mx-5">
                                        {searchIcon()}
                                    </div>
                                    <input type="text" color="white" placeholder="Search here ..." className="border-none outline-none h-full w-full bg-transparent"
                                        style={{
                                            backgroundColor: 'transparent',
                                            color: bgColors[`${theme}-color-premitive-grey-5`]
                                        }}
                                        onChange={(e) => {
                                            // console.log(e.target.value)
                                            setSearch(e.target.value)
                                        }} />
                                </div>
                                <button className="h-14  text-lg rounded-[5px] pt-[0px] pb-0 pl-[40px] pr-[40px]" style={{ background: bgColors[`${theme}-primary-bg-color-0`], color: "#eaebed", whiteSpace: "nowrap" }}>Search</button>

                            </div>

                            <div className="settings-page-admin-secton-div">

                                <div className="settings-page-admin-cont-div">

                                    {/* for admins */}
                                    <div className="settings-page-manage-admin-div">
                                        <div className="settings-page-manage-admin">

                                            {/* row heading */}
                                            <div className="sr-user-head-row">
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

                                                adminData.filter((user) => {
                                                    return search.toLowerCase() === '' ? user : user.name.toLowerCase().includes(search);
                                                }).map((user, index) => {
                                                    // console.log(user)
                                                    return (
                                                        <div className="sr-user-user-row" style={{
                                                            // backgroundColor: bgColors[`${theme}-primary-bg-color-3`],
                                                            backgroundColor: bgColors[`${theme}-primary-bg-color-7`],
                                                            // backgroundColor: 'var(--Neutral-White-200, #FBFBFB)'
                                                        }}>
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

                            </div>

                        </div>
                }
                {/* for profile data  */}

            </div>
        </div >
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