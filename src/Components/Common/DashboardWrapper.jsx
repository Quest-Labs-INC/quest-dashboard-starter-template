import { useContext, useEffect, useState } from "react";
import "./dashboardWrapper.css";
import { Link, useNavigate } from "react-router-dom";
import { routesConfig } from "../../assets/Config/routesConfig";
import { importConfig } from "../../assets/Config/importConfig";
import { FeedbackWorkflow, Search } from "@questlabs/react-sdk";
import FeedbackButton from "./FeedbackButton";
import { generalFunction } from "../../assets/Config/GeneralFunction";
import { ThemeContext } from "../../App";

export default function DashboardWrapper({ children, selectdRoute }) {
    const [hover, sethover] = useState("close");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const { theme, setTheme, bgColors, appConfig } = useContext(ThemeContext);

    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
            localStorage.setItem("theme", "light");
        }
        else {
            setTheme('dark');
            localStorage.setItem("theme", "dark");
        }
    }

    return (
        // wrapper div 
        <div className="flex relative w-screen h-screen bg-customShade-4 transition-all ease-in delay-[40]" style={{ backgroundColor: bgColors[`${theme}-primary-bg-color-3`] }}>
            <FeedbackButton />

            <div className="z-20">
                <Search
                    questId={appConfig?.QUEST_SEARCH_BAR_CAMPAIGN_ID}
                    userId={generalFunction.getUserId()}
                    token={generalFunction.getUserToken()}
                    open="ON_CTRL_K_KEY"
                    onResultClick={e => navigate(e)}
                    icons={[importConfig.routesIcons.dashboardIcon, importConfig.routesIcons.userIcon, importConfig.routesIcons.adminIcon, importConfig.routesIcons.settingIcon]}
                />
            </div>

            <div className={`min-h-screen h-full ${sidebarOpen == false ? "w-0" : "w-screen fixed"} md:w-[250px] z-10`} onClick={() => setSidebarOpen(false)}>

                {/* nav container */}
                <nav
                    className={`sidebar hover ${sidebarOpen == false ? "hidden" : ""} md:block fixed md:relative w-[250px]`}
                    style={{ backgroundColor: bgColors[`${theme}-primary-bg-color-2`] }}
                >
                    <header>
                        <div className="image-text">
                            <span className="image">
                                <img src={importConfig.brandLogo} alt="" />
                            </span>
                            <div className="text logo-text">
                                <span className="name">{appConfig?.QUEST_ENTITY_NAME}</span>
                            </div>
                        </div>
                    </header>

                    <div className="menu-bar">
                        <div className="menu">
                            <ul className="menu-links">
                                {
                                    routesConfig.map((routes, index) => (
                                        !routes.hidden &&
                                        <li className={`nav-link ${window.location.href.includes(routes.path) && "selected-route"}`} key={index}>
                                            <Link to={routes.path}>
                                                <div className="icon">
                                                    <img src={routes.logo} alt="" className="w-6 img-white" />
                                                </div>
                                                <span className="text nav-text">
                                                    {routes.name}
                                                </span>
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        <div className="bottom-content">
                            <li className="">
                                <Link to="">
                                    <div className="icon">
                                        <img src={importConfig.routesIcons.upgradeIcon} alt="" className="w-6" />
                                    </div>
                                    <span className="text nav-text">Upgrade</span>
                                </Link>
                            </li>

                            <li className="">
                                <Link to="">
                                    <div className="icon">
                                        <img src={importConfig.routesIcons.bookIcon} alt="" className="w-6" />
                                    </div>
                                    <span className="text nav-text">Book A Call</span>
                                </Link>
                            </li>

                            <li className="">
                                <Link to="">
                                    <div className="icon">
                                        <img src={importConfig.routesIcons.helpIcon} alt="" className="w-6" />
                                    </div>
                                    <span className="text nav-text">Help Center</span>
                                </Link>
                            </li>

                            <li className="">
                                <Link onClick={() => generalFunction.logout()} to="/login">
                                    <div className="icon">
                                        <img src={importConfig.routesIcons.logoutIcon} alt="" className="w-6" />
                                    </div>
                                    <span className="text nav-text">Logout</span>
                                </Link>
                            </li>

                            <li className="mode">
                                <div className="sun-moon">
                                    <i className="bx bx-moon icon moon"></i>
                                    <i className="bx bx-sun icon sun"></i>
                                </div>
                                <span className="mode-text text" id="theme-text">
                                    {
                                        theme === 'dark' ? "Dark Theme" : "Light Theme"
                                    }
                                </span>

                                <div className="toggle-switch" onClick={toggleTheme}
                                >
                                    <span className="switch"

                                    ></span>
                                </div>
                            </li>
                        </div>
                    </div>
                </nav>

            </div>


            {/* right div container */}
            <div
                className='w-full'
                style={{ backgroundColor: bgColors[`${theme}-primary-bg-color-3`] }}
            >
                {/* <div className="py-4 px-4 border-b-[1px] border-[var(--color-premitive-grey-0)] text-primary-3 font-semibold flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <img src={importConfig.routesIcons.menuIcon} alt="" className="w-4 flex md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}/>
                        <p>{selectdRoute}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src={importConfig.brandLogo} alt="" className="w-7 rounded-full border-[1px] border-[var(--color-premitive-grey-0)]"/>
                        <p>Soumitra</p>
                    </div>
                </div> */}
                <div className="p-4 w-full md:w-[calc(100vw-250px)] h-screen overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}