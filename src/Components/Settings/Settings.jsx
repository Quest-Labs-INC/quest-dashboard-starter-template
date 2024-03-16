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
import EditProfile from "./EditProfile";
import AdminComponent from "./AdminComponent";

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

    // useEffect(() => {
    //     // generalFunction.showLoader();
    //     const uploadFile = async () => {
    //         const { data } = await uploadImageToBackend(selectedFile);
    //         setImageUrl(data.imageUrl);
    //         generalFunction.hideLoader();
    //     }
    //     uploadFile();
    // }, [selectedFile])


    // const updateProfile = () => {
    //     // generalFunction.showLoader();
    //     const updateProfileFunc = async () => {
    //         const data = await axios.post(`${mainConfig.BACKEND_URL}api/users/${headers.userid}`, {
    //             name: name,
    //             about: about,
    //             role: jobTitle,
    //             imageUrl: imageUrl
    //         }, {
    //             headers: headers
    //         });
    //         generalFunction.hideLoader()
    //     }
    //     updateProfileFunc();
    // }

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


            <div className="edit-admin">
                {
                    section === 'edit' ? <EditProfile /> : <AdminComponent />
                }
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