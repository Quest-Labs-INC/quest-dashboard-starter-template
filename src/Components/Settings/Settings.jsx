import { useContext, useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import AdminComponent from "./AdminComponent";
import { ThemeContext } from "../Common/AppContext";
import ReferralPage from "../Referral/ReferralPage";
import ManageFacilities from "./ManageFacilities";
import ManageUsers from "./manage-users";
import { userPermissions }  from "../../assets/Config/accessControl";

export default function Settings() {
    const { theme, bgColors, appConfig } = useContext(ThemeContext);
    const [section, setSection] = useState("edit");
    const [visibleSections, setVisibleSections] = useState({
        edit: true,
        manage: true,
        managefacilities: true,
        manageusers: true,
    });

    const handleSectionChange = (sectionName) => {
        setSection(sectionName);
    };

    const ownerDetails = JSON.parse(localStorage.getItem("adminDetails"));

    const getPageVisibility = async (section) => {
        const PageVisibility = await userPermissions.hasUserPermissions(section);
        console.log(`Page Visibility: ${PageVisibility}`);
        return PageVisibility;
    };

    useEffect(() => {
        const checkPageVisibility = async () => {
            const manage = await getPageVisibility("manage");
            const managefacilities = await getPageVisibility("managefacilities");
            const manageusers = await getPageVisibility("manageusers");

            setVisibleSections({
                edit: true, // Always visible
                manage: manage,
                managefacilities: managefacilities,
                manageusers: manageusers,
            });
        };

        checkPageVisibility();
    }, []);

    return (
        <div className="flex flex-col justify-between items-center">
            <div
                className="flex w-full px-10 py-5 justify-between items-center border-b"
                style={{
                    borderBottom: `1.5px solid ${bgColors[`${theme}-primary-border-color`]}`
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
                <div 
                    className="flex w-full items-start h-[52px]"
                    style={{
                        borderBottom: `1px solid ${bgColors[`${theme}-primary-border-color`]}`
                    }}
                >
                    {visibleSections.edit && (
                    <p
                        className={`text-sm font-semibold font-['Figtree'] h-[52px] p-4 cursor-pointer ${section === "edit" &&
                            "rounded-t-xl border-b border-[#939393]"
                            }`}
                        onClick={() => handleSectionChange("edit")}
                        style={{
                            color: bgColors[`${theme}-color-premitive-grey-5`],
                            background: section === "edit" ? bgColors[`${theme}-primary-bg-color-9`] : ""
                        }}
                    >
                        Edit Profile
                    </p>
                    )}
                    { visibleSections.manage &&!!ownerDetails?.ownerEntityId && (
                        <p
                            className={` text-sm font-semibold font-['Figtree'] h-[52px] p-4 cursor-pointer ${section === "manage" &&
                                "rounded-t-xl border-b border-[#939393]"
                                }`}
                            onClick={() => handleSectionChange("manage")}
                            style={{
                                color: bgColors[`${theme}-color-premitive-grey-5`],
                                background: section === "manage" ? bgColors[`${theme}-primary-bg-color-9`] : ""
                            }}
                        >
                            Manage Admins
                        </p>
                    )}
                    { visibleSections.managefacilities && (
                    <p
                        className={` text-sm font-semibold font-['Figtree'] h-[52px] p-4 cursor-pointer ${section === "managefacilities" &&
                            "rounded-t-xl border-b border-[#939393]"
                            }`}
                        onClick={() => handleSectionChange("managefacilities")}
                        style={{
                            color: bgColors[`${theme}-color-premitive-grey-5`],
                            background: section === "managefacilities" ? bgColors[`${theme}-primary-bg-color-9`] : ""
                        }}
                    >
                        Manage Facilities
                    </p>
                    )}
                    { visibleSections.manageusers && (
                    <p
                        className={` text-sm font-semibold font-['Figtree'] h-[52px] p-4 cursor-pointer ${section === "manageusers" &&
                            "rounded-t-xl border-b border-[#939393]"
                            }`}
                        onClick={() => handleSectionChange("manageusers")}
                        style={{
                            color: bgColors[`${theme}-color-premitive-grey-5`],
                            background: section === "manageusers" ? bgColors[`${theme}-primary-bg-color-9`] : ""
                        }}
                    >
                        Manage Users
                    </p> )}
                </div>

                <div className="edit-admin">
                    {section === "edit" ? (
                        <EditProfile />
                    ) : section === "manage" ? (
                        <AdminComponent />
                    ) : section === "managefacilities" ? (
                        <ManageFacilities />
                    ) : section === "manageusers" ? (
                        <ManageUsers />
                    ) : (
                        <ReferralPage />
                    )}
                </div>
            </div>
        </div>
    );
}
