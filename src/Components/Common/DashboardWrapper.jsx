import { useContext, useEffect, useState } from "react";
import "./dashboardWrapper.css";
import { Link, useNavigate } from "react-router-dom";
import { routesConfig } from "../../assets/Config/routesConfig";
import { importConfig } from "../../assets/Config/importConfig";
import { Search } from "@questlabs/react-sdk";
import FeedbackButton from "./FeedbackButton";
import { generalFunction } from "../../assets/Config/generalFunction";
import { referal } from "./SideBarSvg";
import { ThemeContext } from "./AppContext";
import ReferralPopup from "../Referral/ReferralPopup";

export default function DashboardWrapper({ children, selectdRoute }) {
    const [hover, sethover] = useState("close");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const { theme, setTheme, bgColors, appConfig } = useContext(ThemeContext);

    const toggleTheme = () => {
        if (theme === "dark") {
            setTheme("light");
            localStorage.setItem("theme", "light");
        } else {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
        }
    };

    const handleToggle = () => {
        setChecked((prev) => !prev);
        toggleTheme();
    };

    const handleChange = (e) => {
        e.stopPropagation();
        setChecked(e.target.checked);
        toggleTheme();
    };

    return (
        <div
            className="flex relative w-screen h-screen bg-customShade-4 transition-all ease-in delay-[40]"
            style={{ backgroundColor: bgColors[`${theme}-primary-bg-color-3`] }}
        >
            <FeedbackButton />
            {openPopup && (
                <ReferralPopup setOpenPopup={() => setOpenPopup(false)} />
            )}
            <div className="z-20">
                <Search
                    questId={appConfig?.QUEST_SEARCH_BAR_CAMPAIGN_ID}
                    userId={generalFunction.getUserId()}
                    token={generalFunction.getUserToken()}
                    open="ON_CTRL_K_KEY"
                    onResultClick={(e) => navigate(e)}
                    icons={[
                        importConfig.routesIcons.dashboardIcon,
                        importConfig.routesIcons.userIcon,
                        importConfig.routesIcons.adminIcon,
                        importConfig.routesIcons.settingIcon,
                    ]}
                    styleConfig={{
                        Form: {
                            background: bgColors[`${theme}-primary-bg-color-3`]
                        }
                    }}
                    showFooter={false}
                />
            </div>

            <nav
                className="s_nav_container"
                // style={{ backgroundColor: bgColors[`${theme}-primary-bg-color-2`] }}
                style={{
                    backgroundColor: bgColors[`${theme}-primary-bg-color-3`],
                }}
            >
                <div className="s_nav_header_cont">
                    <div className="s_nav_company_logo_cont">
                        <div className="s_nav_company_logo">
                            <img src={appConfig.BRAND_LOGO || importConfig.brandLogo} alt="" />
                        </div>
                        <p
                            style={{
                                color: bgColors[
                                    `${theme}-color-premitive-grey-5`
                                ],
                            }}
                        >
                            {appConfig?.QUEST_ENTITY_NAME}
                        </p>
                    </div>
                </div>

                <div className="s_nav_menu_cont">
                    <ul className="s_nav_menu">
                        {routesConfig.map(
                            (routes, index) =>
                                !routes.hidden && (
                                    <li
                                        className={`s_nav_menu_item ${
                                            window.location.href.includes(
                                                routes.path
                                            ) && "s_nav_active"
                                        }`}
                                        key={index}
                                    >
                                        <Link
                                            to={routes.path}
                                            className="s_nav_menu_link"
                                            onClick={() =>
                                                setSidebarOpen(false)
                                            }
                                        >
                                            <div>{routes.logo}</div>
                                            <p>{routes.name}</p>
                                        </Link>
                                    </li>
                                )
                        )}

                        <li className={`s_nav_menu_item cursor-pointer`}>
                            <div
                                className="s_nav_menu_link"
                                onClick={() => setOpenPopup((prev) => !prev)}
                            >
                                <div>{referal()}</div>
                                <p>Referral</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className={"profileContSecondary"}>
                    <div className={"profileContThird"} onClick={handleToggle}>
                        <label className={"PaymentSwitch2"}>
                            <input
                                id="sidebar-toggle"
                                type="checkbox"
                                checked={checked}
                                onChange={handleChange}
                            />
                            <span className={"slider2"} />
                        </label>
                        <div className={"profileTitle3"}>
                            {checked ? "Light Mode" : "Dark Mode"}
                        </div>
                    </div>
                </div>
            </nav>

            <div className="w-full">
                <div className="p-4 w-full md:w-[calc(100vw-185px)] h-screen overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
