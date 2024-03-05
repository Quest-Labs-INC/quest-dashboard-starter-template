import { useEffect, useState } from "react";
import "./dashboardWrapper.css";
import { Link, useNavigate } from "react-router-dom";
import { routesConfig } from "../../assets/Config/routesConfig";
import { importConfig } from "../../assets/Config/importConfig";
import { appConfig } from "../../assets/Config/appConfig";
import GeneralFunction from "../../assets/Functions/GeneralFunction";
import { FeedbackWorkflow, Search } from "@questlabs/react-sdk";
import FeedbackButton from "./FeedbackButton";
import { generalFunction } from "../../assets/Config/GeneralFunction";

export default function DashboardWrapper2({ children, selectdRoute }) {
    const [hover, sethover] = useState("close");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();


    return (
        <div className="flex relative w-screen h-screen bg-customShade-4 transition-all ease-in delay-[40]">
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
            {/* <div className={`min-h-screen h-full ${sidebarOpen == false ? "w-0" : "w-screen fixed"} md:w-[184px] z-10`} onClick={() => setSidebarOpen(false)}> */}
            <nav className="s_nav_container">
                <div className="s_nav_header_cont">
                    <div className="s_nav_company_logo_cont">
                        <div className="s_nav_company_logo">
                            <img src={importConfig.brandLogo} alt="" />
                        </div>
                        <p>Afore Hive</p>
                    </div>
                </div>

                <div className="s_nav_menu_cont">
                    <ul className="s_nav_menu">
                        {
                            routesConfig.map((routes, index) => (
                                !routes.hidden &&
                                <li className={`s_nav_menu_item ${window.location.href.includes(routes.path) && "s_nav_active"}`} key={index}>
                                    <Link to={routes.path} className="s_nav_menu_link" onClick={() => setSidebarOpen(false)}>
                                        <div>
                                            {routes.logo}
                                        </div>
                                        <p>{routes.name}</p>

                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                {/* <div className="toggle-switch"  onClick={() => GeneralFunction.shareInstance.toggleTheme()}>
                    <span style={{width:'40px', height:'22px'}} className="switch"></span>
                </div> */}

            </nav>

            <div className="w-full">
            
                <div className="p-4 w-full md:w-[calc(100vw-250px)] h-screen overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
