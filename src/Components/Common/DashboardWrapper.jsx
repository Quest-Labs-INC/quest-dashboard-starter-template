import { useContext, useEffect, useState } from "react";
import "./dashboardWrapper.css";
import { Link, useNavigate } from "react-router-dom";
// import { routesConfig, routesConfigUpper } from "../../assets/Config/routesConfig";
import { routesConfig } from "../../assets/Config/routesConfig";
import { importConfig } from "../../assets/Config/importConfig";
import { appConfig } from "../../assets/Config/appConfig";
import { FeedbackWorkflow, Search, Survey } from "@questlabs/react-sdk";
import FeedbackButton from "./FeedbackButton";
import { generalFunction } from "../../assets/Config/generalFunction";
import {
    referal,
    upgrade,
    bookACall,
    logOutBtn,
    explore,
    referFriends,
    questIcon,
    cancelButton,
} from "./SideBarSvg";
import ReferralPopup from "../Referral/ReferralPopup";
import { ThemeContext } from "./AppContext";

export default function DashboardWrapper({ children, selectdRoute }) {
    const [hover, sethover] = useState("close");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    // const [checked, setChecked] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const { theme, setTheme, bgColors, appConfig, checked, setChecked } =
        useContext(ThemeContext);

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
        toggleTheme();
    };
    const [quesNoFeed, setQuesNoFeed] = useState(1);
    const [showFeedbackSection, setShowFeedbackSection] = useState(false);

    const diffWithDate = (date, type) => {
      const inputDate = new Date().getTime();
      const targetDate = new Date(date).getTime();
      const differenceInMilliseconds = Math.abs(inputDate - targetDate);
      const differenceInDays = Math.ceil(differenceInMilliseconds / (type == "days" ? (1000 * 3600 * 24) : (1000 * 3600)));
      return differenceInDays;
    }

    useEffect(() => {
      let websiteVisit = localStorage.getItem("websiteVisit");
      let feedbackOpen = localStorage.getItem("feedbackOpen");

      const websiteVisitDiffDate = diffWithDate(websiteVisit, "days");
      const feedbackOpenDiffDate = diffWithDate(feedbackOpen, "hours");

      if (!!websiteVisit && !!feedbackOpen && websiteVisitDiffDate > 2) {
        if (feedbackOpenDiffDate > 2) {
          localStorage.setItem("feedbackOpen", new Date());
          setShowFeedbackSection(true);
        }
      } else {
        localStorage.setItem("websiteVisit", new Date());
      }
    }, [])

    const closeSurveyPopup = (e) => {
      if (document.getElementById("clickbox_sreferral").contains(e.target)) {
      } else {
        setShowFeedbackSection(false);
      }
    }


    return (
        <div
            className="flex relative w-screen h-screen bg-customShade-4 transition-all ease-in delay-[40]"
            style={{
                backgroundColor: bgColors[`${theme}-primary-bg-color-3`],
                position: "relative",
            }}
        >
            {/* feedback sidebar buton */}
            <FeedbackButton />

            {/* for referral pop up  */}
            {openPopup && (
                <ReferralPopup setOpenPopup={() => setOpenPopup(false)} />
            )}

            {/* for selected hightlight */}
            <div className="z-20">
                <Search
                    questId={appConfig?.QUEST_SEARCH_BAR_CAMPAIGN_ID}
                    userId={generalFunction.getDataFromCookies("questUserId")}
                    token={generalFunction.getDataFromCookies("questUserToken")}
                    open="ON_CTRL_K_KEY"
                    onResultClick={(e) => e == "/book-a-call" ? window.open(appConfig.CALENDLY_LINK, "_blank") : navigate(e)}
                    // data={{}}
                    icons={[
                        importConfig.routesIcons.dashboardIcon,
                        importConfig.routesIcons.userIcon,
                        importConfig.routesIcons.adminIcon,
                        importConfig.routesIcons.settingIcon,
                    ]}
                    placeholder="Search for anything..."
                    styleConfig={{
                        listHover: {
                            background: theme == "dark" ? "rgba(162, 162, 162, 0.5)" : "#f4ebff"
                        },
                        Form: {
                            background: bgColors[`${theme}-primary-bg-color-3`],
                        },
                        Footer: {
                            background: bgColors[`${theme}-primary-bg-color-3`],
                        },
                    }}
                    onSearch={(e) => navigate(e)}
                />
            </div>
            { showFeedbackSection &&
              <div className="fixed w-screen h-screen z-20 left-0 top-0 bg-[rgba(151,151,151,0.2)] backdrop-blur-sm" onClick={closeSurveyPopup}>
                <div className="absolute right-20 bottom-14" id="clickbox_sreferral">
                  <Survey
                    questId="q-saas-survey"
                    userId={generalFunction.getDataFromCookies("questUserId")}
                    token={generalFunction.getDataFromCookies("questUserToken")}
                    itemsPerPage={2}
                    styleConfig={{
                      Form: {
                          background: bgColors[`${theme}-primary-bg-color-3`],
                          boxShadow: "0px 0px 0px 0px",
                      },
                      Label: {
                          color: bgColors[
                              `${theme}-color-premitive-grey-6`
                          ],
                          fontFamily: "Figtree",
                          fontSize: "12px",
                          fontStyle: "normal",
                          fontWeight: "500",
                          lineHeight: "16px",
                      },
                      Input: {
                          borderRadius: "10px",
                          border: "1px solid #ECECEC",
                      },
                      MultiChoice: {
                          selectedStyle: {
                              background: bgColors[`${theme}-primary-bg-color-0`],
                              color: "#E0E0E0",
                              border: "1px solid"
                          }
                      },
                      SingleChoice: {
                          selectedStyle: {
                              border: "1px solid gray"
                          }
                      }
                    }}
                    heading="How was your experience?"
                    subHeading="Please share your feedback with us."
                    showFooter={false}
                  />
                </div>
              </div>
            }

            <div></div>

            <nav
                className="s_nav_container"
                style={{
                    backgroundColor: bgColors[`${theme}-primary-bg-color-3`],
                }}
            >
                {/* for logo image */}
                <div className="s_nav_header_cont">
                    <div className="s_nav_company_logo_cont">
                        <img
                            src={appConfig.BRAND_LOGO || importConfig.brandLogo}
                            alt=""
                            className=""
                        />
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

                {/* for navigations */}
                <div className="s_navigation_cont">
                    {/* upper  */}
                    <div className="s_nav_menu_cont-upper">
                        <ul className="s_nav_menu">
                            {routesConfig.map(
                                (routes, index) =>
                                    !routes.hidden &&
                                    routes.isUpper && (
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
                                    onClick={() =>
                                        setOpenPopup((prev) => !prev)
                                    }
                                >
                                    <div>{referFriends()}</div>
                                    <p>Refer Friends</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* lwer */}
                    <div className="s_nav_menu_cont-lower">
                        <ul className="s_nav_menu">
                            <li>
                                <Link
                                    className="s_nav_menu_link"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <div>{upgrade()}</div>
                                    <p>Upgrade</p>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    className="s_nav_menu_link"
                                    onClick={() => {setSidebarOpen(false); window.open(appConfig.CALENDLY_LINK, "_blank")}}
                                >
                                    <div>{bookACall()}</div>
                                    <p>Book a call</p>
                                </Link>
                            </li>

                            <li className={"profileContSecondary toggle-btn"}>
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
                            </li>

                            <li>
                                <Link
                                    // to={routes.path}
                                    className="s_nav_menu_link"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <div>{logOutBtn()}</div>
                                    <p>Logout</p>
                                </Link>
                            </li>
                        </ul>
                        <div className='text-xs text-[#939393] mt-3 w-full flex items-center justify-center cursor-pointer' onClick={() => window.open("https://questlabs.ai/")}>
                            <p>Powered by Quest Labs</p>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="w-[calc(100vw-185px)]">
                <div className="">{children}</div>
            </div>
        </div>
    );
}
