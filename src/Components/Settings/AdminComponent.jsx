import { useContext, useEffect, useState } from "react";
import './AdminComponent.css'
import InputComponent from "../Common/CommonComponents/InputComponent";
import { importConfig } from "../../assets/Config/importConfig";
import { ThemeContext } from "../Common/appContext";
import { deleteIcon, searchIcon } from "../Common/SideBarSvg";
import axios from "axios";
import { uploadImageToBackend } from "../../utils/UploadImage";
import { generalFunction } from "../../assets/Config/GeneralFunction";
import { mainConfig } from "../../assets/Config/appConfig";
import NoData from "./NoData";

const AdminComponent = () => {
    const { theme, bgColors, appConfig } = useContext(ThemeContext);
    const [adminData, setAdminData] = useState([]);
    const [search, setSearch] = useState('');
    const [adminData2, setAdminData2] = useState([
        {
            imageUrl: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1710574174410-user-1.png",
            emails: ["asdfg@gmail.com"],
            role: "Software Engineer",
            isActive: true,
            name: "Rohit Prajapati"
        },
        {
            imageUrl: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1710574174410-user-1.png",
            emails: ["asdfg@gmail.com"],
            role: "Software Engineer",
            isActive: true,
            name: "Rohit Prajapati"
        },
        {
            imageUrl: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1710574174410-user-1.png",
            emails: ["asdfg@gmail.com"],
            role: "Software Engineer",
            isActive: true,
            name: "Alpha Prajapati"
        },
        {
            imageUrl: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1710574174410-user-1.png",
            emails: ["asdfg@gmail.com"],
            role: "Software Engineer",
            isActive: true,
            name: "Rohit Prajapati"
        },
        {
            imageUrl: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1710574174410-user-1.png",
            emails: ["asdfg@gmail.com"],
            role: "Software Engineer",
            isActive: true,
            name: "Yogesh Prajapati"
        },
        {
            imageUrl: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1710574174410-user-1.png",
            emails: ["asdfg@gmail.com"],
            role: "Software Engineer",
            isActive: true,
            name: "Rohit Prajapati"
        },
        {
            imageUrl: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1710574174410-user-1.png",
            emails: ["asdfg@gmail.com"],
            role: "Software Engineer",
            isActive: true,
            name: "Pata Nahi Prajapati"
        },
        {
            imageUrl: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1710574174410-user-1.png",
            emails: ["asdfg@gmail.com"],
            role: "Software Engineer",
            isActive: true,
            name: "Rohit Prajapati"
        },
        {
            imageUrl: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1710574174410-user-1.png",
            emails: ["asdfg@gmail.com"],
            role: "Software Engineer",
            isActive: true,
            name: "Aman Prajapati"
        },
        {
            imageUrl: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1710574174410-user-1.png",
            emails: ["asdfg@gmail.com"],
            role: "Software Engineer",
            isActive: true,
            name: "Raaju Prajapati"
        },
        {
            imageUrl: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1710574174410-user-1.png",
            emails: ["asdfg@gmail.com"],
            role: "Software Engineer",
            isActive: false,
            name: "Rohit Prajapati"
        },
        {
            imageUrl: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1710574174410-user-1.png",
            emails: ["asdfg@gmail.com"],
            role: "Software Engineer",
            isActive: true,
            name: "Rohit Prajapati"
        },
        {
            imageUrl: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1710574174410-user-1.png",
            emails: ["asdfg@gmail.com"],
            role: "Software Engineer",
            isActive: true,
            name: "Rohit Prajapati"
        },
        {
            imageUrl: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1710574174410-user-1.png",
            emails: ["asdfg@gmail.com"],
            role: "Software Engineer",
            isActive: true,
            name: "Mohit singh Prajapati"
        },
        {
            imageUrl: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1710574174410-user-1.png",
            emails: ["asdfgrohitas@gmail.com"],
            role: "Software Engineer",
            isActive: false,
            name: "Akkash Prajapati"
        },
    ]);

    const headers = {
        apikey: appConfig.QUEST_API_KEY,
        userid: generalFunction.getDataFromCookies("questUserId"),
        token: generalFunction.getDataFromCookies("questUserToken")
    }

    useEffect(() => {
        const getAdmins = async () => {
            generalFunction.showLoader();
            setTimeout(() => {
                generalFunction.hideLoader();
            }, 5000);
            const { data } = await axios.get(`${mainConfig.BACKEND_URL}api/entities/${appConfig.QUEST_ENTITY_ID}/admins?userId=${headers.userid}`, {
                headers: headers
            });
            setAdminData(data.data);
            generalFunction.hideLoader();
        }
        getAdmins();
    }, []);

    return (
        <div className="settings-page-search-admin-section-div">

            <div>

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

                <div className="table-div">

                    {
                        adminData.length > 0 ? <div className="ese-hi">
                            <table className="settings-page-admin-table">
                                <thead className="table-head">
                                    <tr className="table-head-row">
                                        <th className="sr">
                                            <p style={{ color: bgColors[`${theme}-color-premitive-grey-4`] }}>Sr</p>
                                        </th>
                                        <th className="user">
                                            <p style={{ color: bgColors[`${theme}-color-premitive-grey-4`] }}>User</p>
                                        </th>
                                        <th className="email">
                                            <p style={{ color: bgColors[`${theme}-color-premitive-grey-4`] }}>Email Address</p>
                                        </th>
                                        <th className="role">
                                            <p style={{ color: bgColors[`${theme}-color-premitive-grey-4`] }}>Role</p>
                                        </th>
                                        <th className="status">
                                            <p style={{ color: bgColors[`${theme}-color-premitive-grey-4`] }}>Status</p>
                                        </th>
                                        <th className="action">
                                            <p style={{ color: bgColors[`${theme}-color-premitive-grey-4`] }}>Actions</p>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="table-body">
                                    {
                                        adminData.filter((user) => {
                                            return search.toLowerCase() === '' ? user : user.name.toLowerCase().includes(search);
                                        }).map((user, index) => {
                                            return <tr className="sr-user-user-row" style={{ backgroundColor: bgColors[`${theme}-primary-bg-color-7`] }} key={index}>

                                                <td className="sr">
                                                    <p style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}>{index + 1}</p>
                                                </td>

                                                <td className="user">
                                                    <img src={user.imageUrl} alt="" />
                                                    <p style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}>{user.name}</p>
                                                </td>
                                                <td className="email">
                                                    <p style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}>{user.emails[0]}</p>
                                                </td>
                                                <td className="role">
                                                    <p style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}>{user.role}</p>
                                                </td>
                                                <td className="status">
                                                    <p style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}>{user.isActive === true ? "Active" : "Pending"}</p>
                                                </td>
                                                <td className="action">
                                                    <button style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}>{deleteIcon()}</button>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>

                            </table>
                        </div> : <NoData />
                    }

                </div>

            </div>

        </div>
    )
}

export default AdminComponent