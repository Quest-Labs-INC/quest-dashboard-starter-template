import { useContext, useEffect, useState } from "react";
// import "";
// import './Settings.css'
import InputComponent from "../Common/CommonComponents/InputComponent";
import { importConfig } from "../../assets/Config/importConfig";
import { ThemeContext } from "../Common/appContext";
import { deleteIcon, searchIcon } from "../Common/SideBarSvg";
import './ReferralPage.css'
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


export default function ReferralPage() {
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
            emails: ["12:00:00"],
            role: "se",
            statue: "active",
        },
        {
            name: "Rich",
            emails: ["12:00:00"],
            role: "se",
            statue: "active",
        },
        {
            name: "Rich",
            emails: ["12:00:00"],
            role: "Product manager",
            statue: "active",
        },
        {
            name: "Rich",
            emails: ["12:00:00"],
            role: "se",
            statue: "active",
        },
        {
            name: "Rich",
            emails: ["12:00:00"],
            role: "se",
            statue: "active",
        },
        {
            name: "Rich",
            emails: ["12:00:00"],
            role: "se",
            statue: "active",
        },
        {
            name: "Rich",
            emails: ["12:00:00"],
            role: "Product manager",
            statue: "active",
        },
        {
            name: "Rich",
            emails: ["12:00:00"],
            role: "se",
            statue: "active",
        },
        {
            name: "Rich9",
            emails: ["12:00:00"],
            role: "Product manager",
            statue: "active",
        },
    ]);



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
        <div className="referral-page">
            <div className="referral-page-manage-admin" style={{ backgroundColor: bgColors[`${theme}-primary-bg-color-3`] }}>

                <div className="referral-sr-user-head-row" style={{ backgroundColor: bgColors[`${theme}-primary-bg-color-3`] }}>
                    <div className="sr">
                        <p style={{ color: bgColors[`${theme}-color-premitive-grey-4`] }}>Sr</p>
                    </div>
                    <div className="user" >
                        <p style={{ color: bgColors[`${theme}-color-premitive-grey-4`] }}>Referred By</p>
                    </div>
                    <div className="email">
                        <p style={{ color: bgColors[`${theme}-color-premitive-grey-4`] }}>Referred Time</p>
                    </div>
                    <div className="role">
                        <p style={{ color: bgColors[`${theme}-color-premitive-grey-4`] }}>Role</p>
                    </div>
                    <div className="status">
                        <p style={{ color: bgColors[`${theme}-color-premitive-grey-4`] }}>Status</p>
                    </div>
                    {/* <div className="action">
                        <p style={{ color: bgColors[`${theme}-color-premitive-grey-4`] }}>Actions</p>
                    </div> */}
                    {/* </div> */}
                </div>

                {
                    adminData.map((user, index) => {
                        console.log(user)
                        return (
                            <div className="referral-sr-user-user-row" style={{ backgroundColor: bgColors[`${theme}-primary-bg-color-3`] }}>
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
                                {/* <div className="actions">
                                    <button style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}>{deleteIcon()}</button>
                                </div> */}
                                {/* </div> */}
                            </div>
                        )
                    })
                }


            </div>
        </div>
    )

}