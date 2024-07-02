import { useContext, useEffect, useState } from "react";
import "./dashboardWrapper.css";
import { Link, useNavigate } from "react-router-dom";
import { routesConfig } from "../../assets/Config/routesConfig";
import { importConfig } from "../../assets/Config/importConfig";
import { FeedbackWorkflow, Search, Survey } from "@questlabs/react-sdk";
//import FeedbackButton from "./FeedbackButton";
import { generalFunction } from "../../assets/Config/generalFunction";
import { upgrade, bookACall, logOutBtn, referFriends } from "./SideBarSvg";
import ReferralPopup from "../Referral/ReferralPopup";
import { ThemeContext } from "./AppContext";
import { mainConfig } from "../../assets/Config/appConfig";
import SearchComponents from "./SearchComponents";
import SurveyComponents from "./SurveyComponents";
import Cookies from "universal-cookie";
import { SettingsSvg } from "./SideBarSvg";
import { ProviderConfig } from "./ProviderConfig";
import Settings from "../Settings/Settings";
import { userPermissions } from "../../assets/Config/accessControl";

export default function DashboardWrapper({ children, selectdRoute }) {
    const [openPopup, setOpenPopup] = useState(false);
    const { theme, setTheme, bgColors, appConfig, checked, setChecked } =
        useContext(ThemeContext);
    const navigate = useNavigate();

    const toggleTheme = () => {
        if (theme === "dark") {
            setTheme("light");
            localStorage.setItem("theme", "light");
        } else {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
        }
    };

    const getPageVisibility = async (route) => {
        const PageVisibility = await userPermissions.hasUserPermissions(route.name);
        return PageVisibility;
    };

    const filterRoutes = async (routesConfig) => {
        const routePromises = routesConfig.map(async (route) => {
            const isVisible = await getPageVisibility(route);
            return {
                ...route,
                isVisible,
            };
        });

        const routesWithVisibility = await Promise.all(routePromises);

        const filteredRoutes = routesWithVisibility.filter(
            (route) => !route.hidden && route.isVisible && route.isUpper
        );

        return filteredRoutes;
    };

    const [filteredRoutes, setFilteredRoutes] = useState([]);

    useEffect(() => {
        const fetchFilteredRoutes = async () => {
            const routes = await filterRoutes(routesConfig);
            setFilteredRoutes(routes);
        };

        fetchFilteredRoutes();
    }, []);

    const handleToggle = () => {
        document.getElementsByTagName("BODY")[0].classList.toggle("dark");
        setChecked((prev) => !prev);
        toggleTheme();
    };

    const handleChange = (e) => {
        e.stopPropagation();
        toggleTheme();
    };

    const [quesNoFeed, setQuesNoFeed] = useState(1);
    const [showFeedbackSection, setShowFeedbackSection] = useState(false);

    const diffWithDate = (date, type) => {
        const inputDate = new Date().getTime();
        const targetDate = new Date(date).getTime();
        const differenceInMilliseconds = Math.abs(inputDate - targetDate);
        const differenceInDays = Math.ceil(
            differenceInMilliseconds /
                (type === "days" ? 1000 * 3600 * 24 : 1000 * 3600)
        );
        return differenceInDays;
    };

    useEffect(() => {
        let websiteVisit = localStorage.getItem("websiteVisit");
        let feedbackOpen = localStorage.getItem("feedbackOpen");

        const websiteVisitDiffDate = diffWithDate(websiteVisit, "days");
        const feedbackOpenDiffDate = diffWithDate(feedbackOpen, "hours");

        if (websiteVisit && feedbackOpen && websiteVisitDiffDate > 2) {
            if (feedbackOpenDiffDate > 2) {
                localStorage.setItem("feedbackOpen", new Date());
                setShowFeedbackSection(true);
            }
        } else {
            localStorage.setItem("websiteVisit", new Date());
        }
    }, []);

    // const closeSurveyPopup = (e) => {
    //     if (!document.getElementById("clickbox_sreferral").contains(e.target)) {
    //         setShowFeedbackSection(false);
    //     }
    // };

    return (
        <div
            className="flex relative w-screen h-screen bg-customShade-4 transition-all ease-in delay-[40]"
            style={{
                backgroundColor: bgColors[`${theme}-primary-bg-color-3`],
                position: "relative",
            }}
        >
            {/* feedback sidebar button */}
            {/* <FeedbackButton /> */}

            {/* for referral pop up */}
            {/* {openPopup && (
                <ReferralPopup setOpenPopup={() => setOpenPopup(false)} />
            )} */}

            {/* for selected highlight */}

            {/* <SearchComponents /> */}

            {/* {showFeedbackSection && (
                <SurveyComponents closeSurveyPopup={closeSurveyPopup} />
            )} */}

            <div></div>

            <nav
                className="s_nav_container"
                style={{
                    backgroundColor: bgColors[`${theme}-primary-bg-color-3`],
                }}
            >
                {/* for logo image */}
                <div className="s_nav_header_cont">
                    <div className="">
                        <img
                            src={appConfig.BRAND_LOGO || importConfig.brandLogo}
                            alt=""
                            className="w-[200px]"
                        />
                    </div>
                    {/* <div className="s_nav_company_logo_cont  ">
                        <div className="s_nav_company_img  flex  justify-center ">
                        </div>
                        <div className="s_nav_company_name hidden">
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
                    </div> */}
                </div>

                {/* for navigations */}
                <div className="s_navigation_cont">
                    {/* upper */}
                    <div className="s_nav_menu_cont-upper">
                        <ul className="s_nav_menu">
                            {filteredRoutes.map((route, index) => (
                                <li
                                    className={`s_nav_menu_item ${
                                        window.location.href.includes(route.path)
                                        && "s_nav_active"
                                    }`}
                                    key={index}
                                >
                                    <Link
                                        to={route.path}
                                        className="s_nav_menu_link"
                                    >
                                        <div>{route.logo}</div>
                                        <p>{route.name}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* lower */}
                    <div className="s_nav_menu_cont-lower">
                        <ul className="s_nav_menu">
                            {/* <li>
                                <Link
                                    className="s_nav_menu_link"
                                >
                                    <div>{upgrade()}</div>
                                    <p>Upgrade</p>
                                </Link>
                            </li> */}

                            <li>
                                <Link className="s_nav_menu_link" to="/settings">
                                    <div>{SettingsSvg()}</div>
                                    <p>Settings</p>
                                </Link>
                            </li>

                            {/* <li className={"profileContSecondary toggle-btn"}>
                                <div
                                    className={"profileContThird"}
                                    onClick={handleToggle}
                                >
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
                            </li> */}

                            <li>
                                <div
                                    // to={routes.path}
                                    className="s_nav_menu_link cursor-pointer"
                                    onClick={() => {
                                        generalFunction.logout();
                                        navigate("/login");
                                    }}
                                >
                                    <div>{logOutBtn()}</div>
                                    <p>Logout</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div
                className="w-[calc(100vw-185px)]" 
                style={{
                    backgroundColor: theme === "dark" ? "black" : "white",
                }}
            >
                <div className="">{children}</div>
            </div>
        </div>
    );
}
