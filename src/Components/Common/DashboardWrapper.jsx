// import { useContext, useEffect, useState } from "react";
// import "./dashboardWrapper.css";
// import { Link, useNavigate } from "react-router-dom";
// import { routesConfig } from "../../assets/Config/routesConfig";
// import { importConfig } from "../../assets/Config/importConfig";
// import { appConfig } from "../../assets/Config/appConfig";
// import GeneralFunction from "../../assets/Functions/GeneralFunction";
// import { FeedbackWorkflow, Search } from "@questlabs/react-sdk";
// import FeedbackButton from "./FeedbackButton";
// import { generalFunction } from "../../assets/Config/GeneralFunction";
// import { referal } from "./SideBarSvg";
// import { ThemeContext } from "./appContext";
// import ReferralPopup from "../Referral/ReferralPopup";

// export default function DashboardWrapper({ children, selectdRoute }) {
//     const [hover, sethover] = useState("close");
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const navigate = useNavigate();
//     const [checked, setChecked] = useState(false);
//     const [openPopup, setOpenPopup] = useState(false);
//     const { theme, setTheme, bgColors, appConfig } = useContext(ThemeContext);

//     const toggleTheme = () => {
//         if (theme === "dark") {
//             setTheme("light");
//             localStorage.setItem("theme", "light");
//         } else {
//             setTheme("dark");
//             localStorage.setItem("theme", "dark");
//         }
//     };

//     const handleToggle = () => {
//         setChecked((prev) => !prev);
//         toggleTheme();
//     };

//     const handleChange = (e) => {
//         e.stopPropagation();
//         setChecked(e.target.checked);
//         toggleTheme();
//     };

//     return (
//         <div
//             className="flex relative w-screen h-screen bg-customShade-4 transition-all ease-in delay-[40]"
//             style={{ backgroundColor: bgColors[`${theme}-primary-bg-color-3`] }}
//         >
//             <FeedbackButton />
//             {openPopup && (
//                 <ReferralPopup setOpenPopup={() => setOpenPopup(false)} />
//             )}
//             <div className="z-20">
//                 <Search
//                     questId={appConfig?.QUEST_SEARCH_BAR_CAMPAIGN_ID}
//                     userId={generalFunction.getUserId()}
//                     token={generalFunction.getUserToken()}
//                     open="ON_CTRL_K_KEY"
//                     onResultClick={(e) => navigate(e)}
//                     icons={[
//                         importConfig.routesIcons.dashboardIcon,
//                         importConfig.routesIcons.userIcon,
//                         importConfig.routesIcons.adminIcon,
//                         importConfig.routesIcons.settingIcon,
//                     ]}
//                     styleConfig={{
//                         Form: {
//                             background: bgColors[`${theme}-primary-bg-color-3`]
//                         }
//                     }}
//                     showFooter={false}
//                 />
//             </div>

//             <nav
//                 className="s_nav_container"
//                 // style={{ backgroundColor: bgColors[`${theme}-primary-bg-color-2`] }}
//                 style={{
//                     backgroundColor: bgColors[`${theme}-primary-bg-color-3`],
//                 }}
//             >
//                 <div className="s_nav_header_cont">
//                     <div className="s_nav_company_logo_cont">
//                         <div className="s_nav_company_logo">
//                             <img src={appConfig.BRAND_LOGO || importConfig.brandLogo} alt="" />
//                         </div>
//                         <p
//                             style={{
//                                 color: bgColors[
//                                     `${theme}-color-premitive-grey-5`
//                                 ],
//                             }}
//                         >
//                             {appConfig?.QUEST_ENTITY_NAME}
//                         </p>
//                     </div>
//                 </div>

//                 <div className="s_nav_menu_cont">
//                     <ul className="s_nav_menu">
//                         {routesConfig.map(
//                             (routes, index) =>
//                                 !routes.hidden && (
//                                     <li
//                                         className={`s_nav_menu_item ${
//                                             window.location.href.includes(
//                                                 routes.path
//                                             ) && "s_nav_active"
//                                         }`}
//                                         key={index}
//                                     >
//                                         <Link
//                                             to={routes.path}
//                                             className="s_nav_menu_link"
//                                             onClick={() =>
//                                                 setSidebarOpen(false)
//                                             }
//                                         >
//                                             <div>{routes.logo}</div>
//                                             <p>{routes.name}</p>
//                                         </Link>
//                                     </li>
//                                 )
//                         )}

//                         <li className={`s_nav_menu_item cursor-pointer`}>
//                             <div
//                                 className="s_nav_menu_link"
//                                 onClick={() => setOpenPopup((prev) => !prev)}
//                             >
//                                 <div>{referal()}</div>
//                                 <p>Referral</p>
//                             </div>
//                         </li>
//                     </ul>
//                 </div>

//                 <div className={"profileContSecondary"}>
//                     <div className={"profileContThird"} onClick={handleToggle}>
//                         <label className={"PaymentSwitch2"}>
//                             <input
//                                 id="sidebar-toggle"
//                                 type="checkbox"
//                                 checked={checked}
//                                 onChange={handleChange}
//                             />
//                             <span className={"slider2"} />
//                         </label>
//                         <div className={"profileTitle3"}>
//                             {checked ? "Light Mode" : "Dark Mode"}
//                         </div>
//                     </div>
//                 </div>
//             </nav>

//             <div className="w-full">
//                 <div className="p-4 w-full md:w-[calc(100vw-185px)] h-screen overflow-auto">
//                     {children}
//                 </div>
//             </div>
//         </div>
//     );
// }






import { useContext, useEffect, useState } from "react";
import "./dashboardWrapper.css";
import { Link, useNavigate } from "react-router-dom";
// import { routesConfig, routesConfigUpper } from "../../assets/Config/routesConfig";
import { routesConfig } from "../../assets/Config/routesConfig";
import { importConfig } from "../../assets/Config/importConfig";
import { appConfig } from "../../assets/Config/appConfig";
import GeneralFunction from "../../assets/Functions/GeneralFunction";
import { FeedbackWorkflow, Search } from "@questlabs/react-sdk";
import FeedbackButton from "./FeedbackButton";
import { generalFunction } from "../../assets/Config/GeneralFunction";
import { referal, upgrade, bookACall, logOutBtn, explore, referFriends, questIcon, cancelButton } from "./SideBarSvg";
import ReferralPopup from "../Referral/ReferralPopup";
import AppContext, { ThemeContext } from "./AppContext";

export default function DashboardWrapper({ children, selectdRoute }) {
  const [hover, sethover] = useState("close");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  // const [checked, setChecked] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const { theme, setTheme, bgColors, appConfig, checked, setChecked } = useContext(ThemeContext);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
      // setChecked(true);
    } else {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      // setChecked(false);
    }
  };

  const handleToggle = () => {
    setChecked((prev) => !prev);
    toggleTheme();
  };

  const handleChange = (e) => {
    e.stopPropagation();
    // setChecked(e.target.checked);
    toggleTheme();
  };
  console.log(appConfig)
  console.log(appConfig.BRAND_LOGO)
  const [quesNoFeed, setQuesNoFeed] = useState(1);
  const [showFeedbackSection, setShowFeedbackSection] = useState(true);

  useEffect(() => {
    // console.log("2")
  }, [quesNoFeed, showFeedbackSection])

  return (
    <div
      className="flex relative w-screen h-screen bg-customShade-4 transition-all ease-in delay-[40]"
      style={{
        backgroundColor: bgColors[`${theme}-primary-bg-color-3`],
        position: "relative"
      }}
    >

      {/* feedback sidebar buton */}
      <FeedbackButton />

      {/* for referral pop up  */}
      {openPopup && <ReferralPopup setOpenPopup={() => setOpenPopup(false)} />}

      {/* for selected hightlight */}
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
        />
      </div>

      <div>
        {/* <Survey
          questId="q-42b7c525-72d3-45e2-88b2-490fafea4b3f"
          userId={generalFunction.getDataFromCookies("questUserId")}
          token={generalFunction.getDataFromCookies("questUserToken")}
          heading= "How was your experience?"
          subHeading= "Welcome back, Please complete your details"
          itemsPerPage= "2"
          ratingType= "colored"
          btnColor= ""
          btnTextColor= ""
          bgColor= ""
          supportUrl= ""
          font= ""
          textColor= ""
        /> */}
      </div>

      <nav
        className="s_nav_container"
        // style={{ backgroundColor: bgColors[`${theme}-primary-bg-color-2`] }}
        style={{
          backgroundColor: bgColors[`${theme}-primary-bg-color-3`],
          // background: 'pink'
        }}
      >

        {/* for logo image */}
        <div className="s_nav_header_cont"
          style={{
            // background: "pink"
          }}
        >
          <div className="s_nav_company_logo_cont">
            {/* <div className="s_nav_company_logo">
              <img src={importConfig.brandLogo} alt="" />
            </div> */}
            {/* <img src={importConfig.brandLogo} alt="" className=""/> */}
            <img src={appConfig.BRAND_LOGO || importConfig.brandLogo} alt="" className="" />
            <p style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}>
              {/* {appConfig?.QUEST_ENTITY_NAME} */}
              Team Scant
            </p>
          </div>

        </div>

        {/* for navigations */}
        <div className="s_navigation_cont">
          {/* upper  */}
          <div className="s_nav_menu_cont-upper">
            <ul className="s_nav_menu">
              {
                routesConfig.map(
                  (routes, index) =>
                    !routes.hidden && routes.isUpper && (
                      // console.log(object)
                      <li
                        className={`s_nav_menu_item ${window.location.href.includes(routes.path) &&
                          "s_nav_active"
                          }`}
                        key={index}
                      >
                        <Link
                          to={routes.path}
                          className="s_nav_menu_link"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <div>{routes.logo}</div>
                          <p>{routes.name}</p>
                        </Link>
                      </li>
                    )
                )
              }

              <li className={`s_nav_menu_item cursor-pointer`}>
                <div
                  className="s_nav_menu_link"
                  onClick={() => setOpenPopup((prev) => !prev)}
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
                  onClick={() => setSidebarOpen(false)}
                >
                  <div>{bookACall()}</div>
                  <p>Book a call</p>
                </Link>
              </li>

              <li className={"profileContSecondary toggle-btn"}>
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
          </div>
        </div>

      </nav>

      <div className="w-full">
        <div className="">
          {children}
        </div>
      </div>
    </div>
  );
}
