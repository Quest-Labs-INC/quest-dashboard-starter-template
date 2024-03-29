import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { generalFunction } from "../../assets/Config/generalFunction";
import { deleteIcon, searchIcon } from "../Common/SideBarSvg";
import { ThemeContext } from "../Common/AppContext";
import { mainConfig } from "../../assets/Config/appConfig";

const AdminComponent = () => {
    const { theme, bgColors, appConfig } = useContext(ThemeContext);
    const [adminData, setAdminData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");


    useEffect(() => {
        const getAdmins = async () => {
            generalFunction.showLoader();
            setLoading(true);
            setTimeout(() => {
                generalFunction.hideLoader();
                setLoading(false);
            }, 5000);
            let request = generalFunction.createUrl(`api/entities/${mainConfig.QUEST_ENTITY_ID}/admins?userId=${generalFunction.getUserId()}`);
            const { data } = await axios.get(
                request.url,
                {
                    headers: request.headers,
                }
            );
            setAdminData(data.data);
            setFilterData(data.data);
            generalFunction.hideLoader();
            setLoading(false);
        };
        getAdmins();
    }, []);

    useEffect(() => {
        let data = adminData?.filter((user) => {
            return user.name.toLowerCase().includes(search.toLowerCase());
        });
        setFilterData(data);
    }, [search]);

    const deleteAdmin = async (userId) => {
        try {
            generalFunction.showLoader();
            let request = generalFunction.createUrl(`api/entities/${mainConfig.QUEST_ENTITY_ID}/remove-admin?userId=${generalFunction.getUserId()}`);
            await axios.post(
                request.url,
                {
                    ownerUserId: generalFunction.getDataFromCookies("questUserId"),
                    userId,
                },
                {
                    headers: request.headers,
                }
            );

            const data = adminData?.filter((user) => user.userId != userId);
            setAdminData(data);
            setAdminData(data);
            generalFunction.hideLoader();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full h-full">
            <div className="w-full flex items-center justify-between gap-4 mt-[24px]">
                <div className="flex h-10 border py-2.5 items-center border-[#EFEFEF] rounded-[10px] w-full">
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
                    className="text-sm px-8 py-2.5 rounded-[5px] pl-[40px] pr-[40px]"
                    style={{
                        background: bgColors[`${theme}-primary-bg-color-0`],
                        color: "#eaebed",
                        whiteSpace: "nowrap",
                    }}
                >
                    Search
                </button>
            </div>

            {filterData?.length != 0 ? (
                <div className="mt-[16px] rounded-xl border border-[#F0F0F0] overflow-y-auto">
                    <table className="min-w-[1100px] w-full " style={{
                        color: bgColors[`${theme}-primary-bg-color-8`]
                    }}>
                        <thead>
                            <tr className="border-b border-[#F0F0F0] text-sm font-medium font-['Figtree']">
                                <th className="w-[10%] text-start pl-6 py-[18px]  rounded-tl-xl"
                                    style={{
                                        color: bgColors[`${theme}-color-premitive-grey-9`]
                                    }}>
                                    Sr
                                </th>
                                <th className="w-[25%] text-start pl-6 py-[18px]  " style={{
                                    color: bgColors[`${theme}-color-premitive-grey-9`]
                                }}>
                                    User
                                </th>
                                <th className="w-[25%] text-start pl-6 py-[18px] " style={{
                                    color: bgColors[`${theme}-color-premitive-grey-9`]
                                }}>
                                    Email Address
                                </th>
                                <th className="w-[20%] text-start pl-6 py-[18px] " style={{
                                    color: bgColors[`${theme}-color-premitive-grey-9`]
                                }}>
                                    Role
                                </th>
                                <th className="w-[10%] text-start pl-6 py-[18px] " style={{
                                    color: bgColors[`${theme}-color-premitive-grey-9`]
                                }}>
                                    Status
                                </th>
                                <th className="w-[10%] px-6 py-[18px]  rounded-tr-xl" style={{
                                    color: bgColors[`${theme}-color-premitive-grey-9`]
                                }}>
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filterData?.map((user, index) => (
                                <tr className="border-b border-[#F0F0F0] text-[#4C4C4C]">
                                    <td className="w-[10%] px-6 py-4 text-[#455A64]">
                                        {index + 1}
                                    </td>
                                    <td className="w-[25%] px-6 py-4 text-[#455A64]">
                                        {user.name}
                                    </td>
                                    <td className="w-[25%] px-6 py-4">
                                        {user.emails[0]}
                                    </td>
                                    <td className="w-[20%] px-6 py-4">
                                        {user.role}
                                    </td>
                                    <td className="w-[10%] px-6 py-4">
                                        {user.isActive === true
                                            ? "Active"
                                            : "Inactive"}
                                    </td>
                                    <td className="w-[10%] px-6 py-4">
                                        <div className="flex items-center justify-center cursor-pointer">
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
