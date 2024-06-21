import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { generalFunction } from "../../assets/Config/generalFunction";
import { deleteIcon, searchIcon, inviteButton } from "../Common/SideBarSvg";
import { ThemeContext } from "../Common/AppContext";
import { mainConfig } from "../../assets/Config/appConfig";
import AddAdminPopup from "./AddAdminPopup";
import { Toast } from "@questlabs/react-sdk";
import CreateRole from "./CreateRole";
import { importConfig } from "../../assets/Config/importConfig";

const AdminComponent = () => {
    const { theme, bgColors, appConfig } = useContext(ThemeContext);
    const [adminData, setAdminData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [adminPopup, setAdminPopup] = useState(false);
    const [flag, setFlag] = useState(false);
    const [openRolePopup, setOpenRolePopup] = useState(false);
    const [roleData, setRoleData] = useState();
    const ownerDetails = JSON.parse(localStorage.getItem("adminDetails"));


    useEffect(() => {
        const getAdmins = async () => {
            generalFunction.showLoader();
            setLoading(true);
            setTimeout(() => {
                generalFunction.hideLoader();
                setLoading(false);
            }, 5000);
            let request = generalFunction.createUrl(`api/entities/${ownerDetails?.ownerEntityId}/admins?userId=${generalFunction.getUserId()}`);
            const { data } = await axios.get(
                request.url,
                {
                    headers: {...request.headers, apiKey: ownerDetails?.apiKey},
                }
            );
            let filteredData = data.data.filter((user) => !mainConfig.ALLOWED_ADMIN.includes(user.emails[0]));
            setAdminData(filteredData);
            setFilterData(filteredData);
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
            let request = generalFunction.createUrl(`api/entities/${ownerDetails?.ownerEntityId}/remove-admin?userId=${generalFunction.getUserId()}`);
            const res = await axios.post(
                request.url,
                {
                    ownerUserId: generalFunction.getUserId(),
                    userId,
                },
                {
                    headers: {...request.headers, apiKey: ownerDetails?.apiKey},
                }
            );
                const data = res.data;
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
                    });

                    let removedUser = adminData?.filter((user) => user.userId == userId);
                    console.log(removedUser)
                    const data = adminData?.filter((user) => user.userId != userId);
                    setAdminData(data);

                    //////////////////////////
                    // Role deleted successfully, update roles in supabase
                    // let data = {
                    //   role: "ADMIN",
                    //   email: removedUser[0].email.toLowerCase(),
                    // }
                    ////////////////////////

                    // get user id from email
                    const user_id = await generalFunction.getUserIdFromEmail(removedUser[0].emails[0])
                    // set the user to is_active is false
                    generalFunction.deactivateUser(user_id[0].id)

                    setFlag((prev) => !prev);
                    generalFunction.hideLoader();
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        let request = generalFunction.createUrl(`api/entities/${ownerDetails?.ownerEntityId}/roles?userId=${generalFunction.getUserId()}`);
        axios
        .get(request.url, { headers: {...request.headers, apiKey: ownerDetails?.apiKey} })
        .then((res) => {
            const data = res.data;
            if (data.success == false) {
                generalFunction.hideLoader();
            } else if (data.success == true) {
                setRoleData(data.data);
                setTimeout(function () {
                    generalFunction.hideLoader();
                }, 500);
            }
        })
        .catch((err) => {
            Toast.error({
                text: "Error Occurred" + "\n" + "Unable to Invite Member",
            });
            generalFunction.hideLoader();
        });
    }, [flag]);

    const checkIsOwner = () => {
        let dt = adminData?.filter((user) => user.userId == generalFunction.getUserId());
        return dt.length > 0 && dt[0].role == "OWNER";
    }

    const changeRole = async (userId, role) => {
        try {
            generalFunction.showLoader();
            let request = generalFunction.createUrl(`api/entities/${ownerDetails?.ownerEntityId}/roles/${role}/users/${userId}/update?userId=${generalFunction.getUserId()}`);
            await axios.post(
                request.url,
                {
                    ownerUserId: generalFunction.getUserId(),
                    userId,
                    role,
                    isActive: true,
                },
                {
                    headers: {...request.headers, apiKey: ownerDetails?.apiKey},
                }
            ).then((res) => {
                const data = res.data;
                if (data.success == false) {
                    generalFunction.hideLoader();
                    Toast.error({ text: "Error Occurred" });
                    return;
                } else {
                    Toast.success({
                        text: "Role Changed Successfully",
                    });

                    let changedUser = adminData?.filter((user) => user.userId == userId);
                    console.log(changedUser)
                    //////////////////////////
                    // Role changed successfully, update roles in supabase
                    // let data = {
                    //   role: "ADMIN",
                    //   email: changedUser[0].email.toLowerCase(),
                    // }
                    ////////////////////////
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
                    className="flex items-center text-sm py-[10px] rounded-[10px] px-[32px] gap-1"
                    style={{
                        background: `linear-gradient(${theme == "dark" ? "black" : "white"},${theme == "dark" ? "black" : "white"}) padding-box,${bgColors[`${theme}-primary-bg-color-0`]}border-box`,
                        color: bgColors[`${theme}-color-premitive-grey-9`],
                        whiteSpace: "nowrap",
                        border: "1.5px solid #0000"
                    }}
                    onClick={() => setAdminPopup(true)}
                >
                    Invite Team Member
                    {inviteButton(bgColors[`${theme}-color-premitive-grey-9`])}
                </button>
                { checkIsOwner() &&
                    <button
                        className="flex items-center text-sm py-[10px] rounded-[10px] px-[32px] gap-1"
                        style={{
                            background: `linear-gradient(${theme == "dark" ? "black" : "white"},${theme == "dark" ? "black" : "white"}) padding-box,${bgColors[`${theme}-primary-bg-color-0`]}border-box`,
                            color: bgColors[`${theme}-color-premitive-grey-9`],
                            whiteSpace: "nowrap",
                            border: "1.5px solid #0000"
                        }}
                        onClick={() => setOpenRolePopup(true)}
                    >
                        Create a Role
                        {inviteButton(bgColors[`${theme}-color-premitive-grey-9`])}
                    </button>
                }
            </div>

            {adminPopup && <AddAdminPopup setAdminPopup={setAdminPopup} setFlag={setFlag} adminPopup={adminPopup} />}

            {openRolePopup && <CreateRole setOpenRolePopup={setOpenRolePopup} setFlag={setFlag} openRolePopup={openRolePopup} />}

            {filterData?.length != 0 ? (
                <div 
                    className="mt-[16px] rounded-xl border overflow-y-auto"
                    style={{border: `1.5px solid ${bgColors[`${theme}-primary-border-color`]}`}}
                >
                    <table className="min-w-[1100px] w-full " style={{
                        color: bgColors[`${theme}-primary-bg-color-8`]
                    }}>
                        <thead style={{background: theme == "dark" ? 'transparent' : '#F0F0F0'}}>
                            <tr 
                                className="text-sm font-medium font-['Figtree']"
                                style={{borderBottom: `1px solid ${bgColors[`${theme}-primary-border-color`]}`}}
                            >
                                <th className="w-[10%] text-center py-[18px]  rounded-tl-xl"
                                    style={{
                                        color: bgColors[`${theme}-color-premitive-grey-9`],
                                        background: bgColors[`${theme}-primary-bg-color-9`]
                                    }}>
                                    Sr
                                </th>
                                <th className="w-[25%] text-center py-[18px]" style={{
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
                                    style={{borderBottom: !(filterData?.length == index + 1) && `1px solid ${bgColors[`${theme}-primary-border-color`]}`}}
                                >
                                    <td 
                                        className="w-[10%] px-6 py-4 text-[#455A64] text-center"
                                        style={{color: bgColors[`${theme}-color-premitive-grey-9`]}}
                                    >
                                        {index + 1}
                                    </td>
                                    <td 
                                        className="w-[25%] px-6 py-4 text-[#455A64] text-center"
                                        style={{color: bgColors[`${theme}-color-premitive-grey-9`]}}
                                    >
                                        {user.name}
                                    </td>
                                    <td 
                                        className="w-[25%] px-6 py-4 text-center"
                                        style={{
                                            color: bgColors[
                                                `${theme}-color-premitive-grey-9`
                                            ],
                                        }}
                                    >
                                        {user.emails[0]}
                                    </td>
                                    <td 
                                        className="w-[20%] px-6 py-4 text-center"
                                        style={{
                                            color: bgColors[
                                                `${theme}-color-premitive-grey-9`
                                            ],
                                        }}
                                    >
                                        {(checkIsOwner() && user.userId != generalFunction.getUserId())
                                            ?
                                            <select value={user.role} onChange={(e) => changeRole(user.userId, e.target.value)} >
                                                {
                                                    roleData?.map((role, index) => (
                                                        <option key={index}>{role.role}</option>
                                                    ))
                                                }
                                            </select>
                                            :
                                            user.role
                                        }
                                    </td>
                                    <td 
                                        className="w-[10%] px-6 py-4 text-center"
                                        style={{
                                            color: bgColors[
                                                `${theme}-color-premitive-grey-9`
                                            ],
                                        }}
                                    >
                                        {user.isActive === true
                                            ? "Active"
                                            : "Inactive"}
                                    </td>
                                    <td 
                                        className="w-[10%] px-6 py-4 text-center"
                                        style={{
                                            color: bgColors[
                                                `${theme}-color-premitive-grey-9`
                                            ],
                                        }}
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
