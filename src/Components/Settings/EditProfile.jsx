import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../Common/appContext';
import './EditProfile.css'
import InputComponent from "../Common/CommonComponents/InputComponent";
import { importConfig } from "../../assets/Config/importConfig";

import { deleteIcon, searchIcon } from "../Common/SideBarSvg";

import { uploadImageToBackend } from "../../utils/UploadImage";
import { generalFunction } from "../../assets/Config/GeneralFunction";
import { mainConfig } from "../../assets/Config/appConfig";

const EditProfile = () => {
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
        generalFunction.showLoader();
        const getuser = async () => {
            setTimeout(() => {
                generalFunction.hideLoader();
                
            }, 5000);
            const { data } = await axios.get(`${mainConfig.BACKEND_URL}api/users/${headers.userid}`, {
                headers: headers
            });
            console.log(data)
            setName(data.data.name);
            setJobTitle(data.data.role);
            setAbout(data.data.about)
            setImageUrl(data.data.imageUrl)
            generalFunction.hideLoader();
        }
        getuser();

        const getAdmins = async () => {
            generalFunction.showLoader();
            const { data } = await axios.get(`${mainConfig.BACKEND_URL}api/entities/${appConfig.QUEST_ENTITY_ID}/admins?userId=${headers.userid}`, {
                headers: headers
            });
            setAdminData(data.data);
            generalFunction.hideLoader();
        }
        // getAdmins();

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
        console.log("upimg")
        if (event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            // setImageUrl(URL.createObjectURL(event.target.files[0]));
            setImageUrl(event.target.files[0]);
            setCustomImage(URL.createObjectURL(event.target.files[0]))



            generalFunction.showLoader();
            const uploadFile = async () => {
                const { data } = await uploadImageToBackend(selectedFile);
                setImageUrl(data.imageUrl);
                generalFunction.hideLoader();
            }
            uploadFile();
        }
    };

    useEffect(() => {
        // generalFunction.showLoader();
        // const uploadFile = async () => {
        //     const { data } = await uploadImageToBackend(selectedFile);
        //     setImageUrl(data.imageUrl);
        //     generalFunction.hideLoader();
        // }
        // uploadFile();
    }, [])


    const updateProfile = () => {
        generalFunction.showLoader();
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
    )
}

export default EditProfile