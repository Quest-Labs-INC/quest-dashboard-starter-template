import { useContext, useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import AdminComponent from "./AdminComponent";
import { ThemeContext } from "../Common/AppContext";

export default function Settings() {
    const { theme, bgColors, appConfig } = useContext(ThemeContext);
    const [section, setSection] = useState("edit");

    const handleSectionChange = (sectionName) => {
        setSection(sectionName);
    };

    return (
        <div className="flex flex-col justify-between items-center">
            <div
                className="flex w-full px-8 py-5 justify-between items-center border-b border-[#ececec] bg-white"
                style={{
                    backgroundColor: bgColors[`${theme}-primary-bg-color-3`],
                }}
            >
                <p
                    className="text-base font-medium"
                    style={{
                        color: bgColors[`${theme}-color-premitive-grey-5`],
                    }}
                >
                    Settings
                </p>
            </div>

            <div className="px-8 pt-[30px] w-full pr-[96px]">
                <div className="flex w-full items-start border-b border-[#E0E0E0] h-[52px]">
                    <p
                        className={`text-sm font-semibold font-['Figtree'] h-[52px] p-4 cursor-pointer ${section == "edit" &&
                            "rounded-t-xl border-b bg-[#E0E0E0] border-[#939393]"
                            }`}
                        onClick={() => handleSectionChange("edit")}
                        style={{
                            color: section == "edit" ? "" : bgColors[`${theme}-color-premitive-grey-5`]
                        }}
                    >
                        Edit Profile
                    </p>
                    <p
                        className={`text-sm font-semibold font-['Figtree'] h-[52px] p-4 cursor-pointer ${section == "manage" &&
                            "rounded-t-xl border-b bg-[#E0E0E0] border-[#939393]"
                            }`}
                        onClick={() => handleSectionChange("manage")}
                        style={{
                            color: section == "manage" ? "" : bgColors[`${theme}-color-premitive-grey-5`]
                        }}
                    >
                        Manage Admins
                    </p>
                </div>

                <div className="edit-admin">
                    {section === "edit" ? <EditProfile /> : <AdminComponent />}
                </div>
            </div>
        </div>
    );
}
