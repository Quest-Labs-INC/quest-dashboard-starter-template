import { useContext, useEffect, useState } from "react";
// import "";
// import './Settings.css'
import InputComponent from "../Common/CommonComponents/InputComponent";
import { importConfig } from "../../assets/Config/importConfig";
import { ThemeContext } from "../Common/AppContext";
import { deleteIcon, searchIcon } from "../Common/SideBarSvg";
import './ReferralPage.css'
import ReferFriend from './Images/ReferFriend.svg'
import Email from './Images/Email.svg'
import Line from './Images/Line.svg'
import Copy from './Images/Copy.svg'
import Facebook from './Images/Facebook.svg'
import X from './Images/x.svg'
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

    const [referralHistory, setReferralHistory] = useState([
        {
            user: "Rich Explorer",
            email: "jessica.hanson@exmaple.com",
            role: "Product manager",
            status: "Active",
            earning: 2000
        },
        {
            user: "Rich Explorer",
            email: "jessica.hanson@exmaple.com",
            role: "Product manager",
            status: "Active",
            earning: 2000
        },
        {
            user: "Rich Explorer",
            email: "jessica.hanson@exmaple.com",
            role: "Product manager",
            status: "Active",
            earning: 2000
        },
        {
            user: "Rich ",
            email: "jessica.hanson@exmaple.com",
            role: "Product manager",
            status: "Active",
            earning: 2000
        },
        {
            user: "Rich Explorer",
            email: "jessica.hansonasdf@exmaple.com",
            role: "Product manager",
            status: "Active",
            earning: 0
        },
    ]);


    useEffect(() => {
        const fetchAdmins = async () => {
            const { data } = await axios.get('https://staging-api.questlabs.ai/api/entities/e-c6895222-ac01-4640-8c59-6101661deb8d/admins', {
                headers: {
                    apikey: "k-2fb4e0f9-3808-4def-a3a6-89e93e84c3f7",
                    userid: "u-88350caa-4080-4505-a169-09f3f15e83b7",
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTg4MzUwY2FhLTQwODAtNDUwNS1hMTY5LTA5ZjNmMTVlODNiNyIsImlhdCI6MTcwOTgwMzc0NCwiZXhwIjoxNzEwNDA4NTQ0fQ.bDlPaNDCStrtcW9WwW0toa_Dep2O06O_GhRQDsGDWtk"
                }

            });

            setAdminData(data.data);
        }
        fetchAdmins();
    }, []);

    return (
        <div className="referral-page">

            {/* refer frineds heading */}
            <div className="referral-page-header" style={{ backgroundColor: bgColors[`${theme}-primary-bg-color-3`] }}>
                <p style={{
                    color: bgColors[`${theme}-color-premitive-grey-5`],
                    // transition: '0.4s'
                }}>Refer Friends</p>
            </div>


            {/* upper dvi for 100% width  */}
            <div className="referral-page-refer-detail-cont">
                <div>

                    <div className="refer-image-cont">
                        <div>
                            Refer a friend
                            & get 10 % When they got hired
                        </div>
                        <img src={ReferFriend} alt="" />
                    </div>

                    <div className="send-invi">
                        <p>Send Invitations</p>
                    </div>

                    <div className="send-email">
                        <div className="input-div">
                            <input type="text" placeholder="Type Email address here" />
                            <img src={Email} alt="" />
                        </div>

                        <button><p>Send</p></button>
                    </div>

                    <div className="or-cont">
                        <img src={Line} alt="" />
                        {/* <div></div> */}
                        <p>OR</p>
                        <img src={Line} alt="" />
                    </div>


                    <div className="share-buttons">
                        <button>
                            <p>Copy invitation link</p>
                            <img src={Copy} alt="" />
                        </button>

                        <button>
                            <p>Share on facebook</p>
                            <img src={Facebook} alt="" />
                        </button>
                        <button>
                            <p>Share on twitter</p>
                            <img src={X} alt="" />
                        </button>
                    </div>

                </div>
            </div>

            {/* upper dvi for 100% width  */}
            <div className="referral-page-referral-history">

                <div>

                    <div className="referral-history-user-head-row">
                        <div className="sr">
                            <p>Sr</p>
                        </div>
                        <div className="user" >
                            <p>User</p>
                        </div>
                        <div className="email">
                            <p>Email Address</p>
                        </div>
                        <div className="role">
                            <p>Role</p>
                        </div>
                        <div className="status">
                            <p>Status</p>
                        </div>
                        <div className="earning">
                            <p>Earning</p>
                        </div>
                    </div>

                    <div className="referral-history-user-head-row-data">
                        <div className="sr">
                            <p>1</p>
                        </div>
                        <div className="user" >
                            <p>Rich Exploreer</p>
                        </div>
                        <div className="email">
                            <p>EmailAddressadfsa@example.com</p>
                        </div>
                        <div className="role">
                            <p>Software Engineer</p>
                        </div>
                        <div className="status">
                            <p>Pending</p>
                        </div>
                        <div className="earning">
                            <p>100000</p>
                        </div>
                    </div>

                </div>

            </div>

            {/* <div className="referral-page-manage-admin" style={{ backgroundColor: bgColors[`${theme}-primary-bg-color-3`] }}>

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
                </div>

                {
                    adminData.map((user, index) => {
                        return (
                            <div className="referral-sr-user-user-row" style={{ backgroundColor: bgColors[`${theme}-primary-bg-color-3`] }}>
                                <div className="sr">
                                    <p style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}>{index + 1}</p>
                                </div>
                                <div className="user" >
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
                            </div>
                        )
                    })
                }


            </div> */}
        </div>
    )

}