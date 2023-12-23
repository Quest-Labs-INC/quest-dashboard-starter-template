import { useEffect, useState } from "react";
import "./dashboardWrapper.css";
import { Link } from "react-router-dom";
import { routesConfig } from "../../assets/Config/routesConfig";
import { importConfig } from "../../assets/Config/importConfig";
import { appConfig } from "../../assets/Config/appConfig";
import GeneralFunction from "../../assets/Functions/GeneralFunction";

export default function DashboardWrapper({children, selectdRoute}) {
    const [hover, sethover] = useState("close");
    

    return (
        <div className="flex relative w-screen h-screen bg-customShade-4 transition-all ease-in delay-[40]">
            <div className="w-24">
                <nav className={`sidebar ${hover}`} onMouseOver={()=> sethover("")} onMouseOut={() => sethover("close")}>
                    <header>
                        <div className="image-text">
                            <span className="image">
                                <img src={importConfig.brandLogo} alt="" />
                            </span>

                            <div className="text logo-text">
                                <span className="name">{appConfig.ENTITY_NAME}</span>
                                {/* <span className="profession">Web developer</span> */}
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
                                <Link to="">
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
                                <span className="mode-text text" id="theme-text">Dark Theme</span>

                                <div className="toggle-switch" onClick={() => GeneralFunction.shareInstance.toggleTheme()}>
                                    <span className="switch"></span>
                                </div>
                            </li>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="w-full">
                <div className="py-4 px-4 border-b-[1px] border-[var(--color-premitive-grey-0)] text-primary-3 font-semibold flex justify-between items-center">
                    <p>{selectdRoute}</p>
                    <div className="flex items-center gap-2">
                        <img src={importConfig.brandLogo} alt="" className="w-7 rounded-full border-[1px] border-[var(--color-premitive-grey-0)]"/>
                        <p>Soumitra</p>
                    </div>
                </div>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
