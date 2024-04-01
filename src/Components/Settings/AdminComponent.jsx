import { useContext, useEffect, useState } from "react";
import "./AdminComponent.css";
import InputComponent from "../Common/CommonComponents/InputComponent";
import { importConfig } from "../../assets/Config/importConfig";
import { ThemeContext } from "../Common/AppContext";
import { deleteIcon, searchIcon } from "../Common/SideBarSvg";
import axios from "axios";
import { uploadImageToBackend } from "../../utils/UploadImage";
import { generalFunction } from "../../assets/Config/generalFunction";
import { mainConfig } from "../../assets/Config/appConfig";
import NoData from "./NoData";
import AddAdminPopup from "./AddAdminPopup";
import { Toast } from "@questlabs/react-sdk";

const AdminComponent = () => {
    const { theme, bgColors, appConfig } = useContext(ThemeContext);
    const [adminData, setAdminData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [adminPopup, setAdminPopup] = useState(false);
    const [flag, setFlag] = useState(false);

    const headers = {
        apikey: appConfig.QUEST_API_KEY,
        userid: generalFunction.getDataFromCookies("questUserId") || generalFunction.getUserId(),
        token: generalFunction.getDataFromCookies("questUserToken"),
    };

    useEffect(() => {
        const getAdmins = async () => {
            generalFunction.showLoader();
            setLoading(true);
            setTimeout(() => {
                generalFunction.hideLoader();
                setLoading(false);
            }, 5000);
            const { data } = await axios.get(
                `${mainConfig.BACKEND_URL}api/entities/${appConfig.QUEST_ENTITY_ID}/admins?userId=${headers.userid}`,
                {
                    headers: headers,
                }
            );
            setAdminData(data.data);
            setFilterData(data.data);
            generalFunction.hideLoader();
            setLoading(false);
        };
        getAdmins();
    }, [flag]);

    useEffect(() => {
        let data = adminData?.filter((user) => {
            return user.name.toLowerCase().includes(search.toLowerCase());
        });
        setFilterData(data);
    }, [search]);

    const deleteAdmin = async (userId) => {
        try {
            generalFunction.showLoader();
            await axios.post(
                `${mainConfig.BACKEND_URL}api/entities/${appConfig.QUEST_ENTITY_ID}/remove-admin`,
                {
                    ownerUserId: generalFunction.getDataFromCookies("questUserId"),
                    userId,
                },
                {
                    headers: headers,
                }
            ).then((res) => {
                const data = res.data;
                console.log(data);
                if (data.success == false) {
                    let errMsg = data.message ? data.message : "Unable to Delete Member";
                    generalFunction.hideLoader();
                    Toast.error({ text: "Error Occurred" + "\n" + errMsg ,
                    // image: `${appConfig.BRAND_LOGO || importConfig.brandLogo}`
                 });
                    return;
                } else {
                    Toast.success({
                        text: "Admin Removed Successfully",
                        // image: `${appConfig.BRAND_LOGO || importConfig.brandLogo}`
                    });
                    const data = adminData?.filter((user) => user.userId != userId);
                    setAdminData(data);
                    setFlag((prev) => !prev);
                    generalFunction.hideLoader();
                }
            });
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="w-full h-full">
            <div className="w-full flex items-center justify-between gap-4 mt-[24px]">
                <div className="flex h-10 border py-2.5 items-center rounded-[10px] w-full"
                    style={{
                        border: `1.5px solid ${bgColors[`${theme}-primary-border-color`]}`
                    }}
                >
                    <div className="flex items-center h-full mx-5">
                        {searchIcon()}
                    </div>
                    <input
                        type="text"
                        color="white"
                        placeholder="Search here ..."
                        className="border-none outline-none h-full w-full bg-transparent"
                        style={{
                            color: bgColors[`${theme}-color-premitive-grey-5`],
                        }}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    />
                </div>
                <button
                    className="text-sm px-8 py-2.5 rounded-[10px] pl-[40px] pr-[40px]"
                    style={{
                        background: `linear-gradient(${theme == "dark" ? "black" : "white"},${theme == "dark" ? "black" : "white"}) padding-box,${bgColors[`${theme}-primary-bg-color-0`]}border-box`,
                        color: bgColors[`${theme}-color-premitive-grey-9`],
                        whiteSpace: "nowrap",
                        border: "1.5px solid #0000"
                    }}
                    onClick={() => setAdminPopup(true)}
                >
                    Invite Team Member
                </button>
            </div>
            {adminPopup && <AddAdminPopup setAdminPopup={setAdminPopup} setFlag={setFlag} adminPopup={adminPopup} />}
            {filterData?.length != 0 ? (
                <div
                    className="mt-[16px] rounded-xl border overflow-y-auto"
                    style={{ border: `1.5px solid ${bgColors[`${theme}-primary-border-color`]}` }}
                >
                    <table className="min-w-[1100px] w-full " style={{
                        color: bgColors[`${theme}-primary-bg-color-8`],
                    }}>
                        <thead style={{ background: theme == "dark" ? 'transparent' : '#F0F0F0' }}>
                            <tr
                                className="text-sm font-medium font-['Figtree']"
                                style={{ borderBottom: `1px solid ${bgColors[`${theme}-primary-border-color`]}` }}
                            >
                                <th className="w-[10%] py-[18px] text-center rounded-tl-xl"
                                    style={{
                                        color: bgColors[`${theme}-color-premitive-grey-9`],
                                        background: bgColors[`${theme}-primary-bg-color-9`]
                                    }}>
                                    Sr
                                </th>
                                <th className="w-[25%] py-[18px] text-center" style={{
                                    color: bgColors[`${theme}-color-premitive-grey-9`],
                                    background: bgColors[`${theme}-primary-bg-color-9`]
                                }}>
                                    User
                                </th>
                                <th className="w-[25%] text-center py-[18px] " style={{
                                    color: bgColors[`${theme}-color-premitive-grey-9`],
                                    background: bgColors[`${theme}-primary-bg-color-9`]
                                }}>
                                    Email Address
                                </th>
                                <th className="w-[20%] text-center py-[18px] " style={{
                                    color: bgColors[`${theme}-color-premitive-grey-9`],
                                    background: bgColors[`${theme}-primary-bg-color-9`]
                                }}>
                                    Role
                                </th>
                                <th className="w-[10%] text-center py-[18px] " style={{
                                    color: bgColors[`${theme}-color-premitive-grey-9`],
                                    background: bgColors[`${theme}-primary-bg-color-9`]
                                }}>
                                    Status
                                </th>
                                <th className="w-[10%] px-6 py-[18px]  rounded-tr-xl" style={{
                                    color: bgColors[`${theme}-color-premitive-grey-9`],
                                    background: bgColors[`${theme}-primary-bg-color-9`]
                                }}>
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filterData?.map((user, index) => (
                                <tr
                                    className="text-[#4C4C4C]"
                                    style={{ borderBottom: !(filterData?.length == index + 1) && `1px solid ${bgColors[`${theme}-primary-border-color`]}` }}
                                >
                                    <td
                                        className="w-[10%] px-6 py-4 text-[#455A64] text-center"
                                        style={{ color: bgColors[`${theme}-color-premitive-grey-9`] }}
                                    >
                                        {index + 1}
                                    </td>
                                    <td
                                        className="w-[25%] px-6 py-4 text-[#455A64] text-center"
                                        style={{ color: bgColors[`${theme}-color-premitive-grey-9`] }}
                                    >
                                        {user.name}
                                    </td>
                                    <td 
                                        className="w-[25%] px-6 py-4 text-center"
                                        style={{ color: bgColors[`${theme}-color-premitive-grey-9`] }}
                                    >
                                        {user.emails[0]}
                                    </td>
                                    <td 
                                        className="w-[20%] px-6 py-4 text-center"
                                        style={{ color: bgColors[`${theme}-color-premitive-grey-9`] }}
                                    >
                                        {user.role}
                                    </td>
                                    <td 
                                        className="w-[10%] px-6 py-4 text-center"
                                        style={{ color: bgColors[`${theme}-color-premitive-grey-9`] }}
                                    >
                                        {user.isActive === true
                                            ? "Active"
                                            : "Inactive"}
                                    </td>
                                    <td 
                                        className="w-[10%] px-6 py-4 text-center"
                                        style={{ color: bgColors[`${theme}-color-premitive-grey-9`] }}
                                    >
                                        <div className="flex items-center justify-center cursor-pointer" onClick={() => deleteAdmin(user.userId)}>
                                            {deleteIcon()}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                !loading && (
                    <div className="w-full text-center mt-20 text-white">
                        No Admin found
                    </div>
                )
            )}
            {/* </div> */}
        </div>
    );
};

export default AdminComponent;
