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
import { routesConfig, routesConfigUpper } from "../../assets/Config/routesConfig";
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
    console.log("193")
    console.log(theme)
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


  const [quesNoFeed, setQuesNoFeed] = useState(1);
  const [showFeedbackSection, setShowFeedbackSection] = useState(true);

  useEffect(() => {
    console.log("2")
  }, [quesNoFeed])

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

      <nav
        className="s_nav_container"
        // style={{ backgroundColor: bgColors[`${theme}-primary-bg-color-2`] }}
        style={{ backgroundColor: bgColors[`${theme}-primary-bg-color-3`] }}
      >
        {/* for logo image */}
        <div className="s_nav_header_cont">
          <div className="s_nav_company_logo_cont">
            <div className="s_nav_company_logo">
              <img src={importConfig.brandLogo} alt="" />
            </div>
            <p style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}>
              {appConfig?.QUEST_ENTITY_NAME}
            </p>
          </div>
        </div>

        {/* for navigations */}
        <div className="s_navigation_cont">
          {/* upper  */}
          <div className="s_nav_menu_cont-upper">
            {/* <ul className="s_nav_menu">
              {
                routesConfig.map(
                  (routes, index) =>
                    !routes.hidden && (
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
                  <div>{referal()}</div>
                  <p>Referral</p>
                </div>
              </li>
            </ul> */}
            <ul className="s_nav_menu">
              {
                routesConfigUpper.map(
                  (routes, index) =>
                    !routes.hidden && (
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
            {/* <ul className="s_nav_menu">
              {
                routesConfig.map(
                  (routes, index) =>
                    !routes.hidden && (
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
                  <div>{referal()}</div>
                  <p>Referral</p>
                </div>
              </li>
            </ul> */}

            <ul className="s_nav_menu">
              <li
              // className={`s_nav_menu_item ${window.location.href.includes(routes.path) &&
              //   "s_nav_active"
              //   }`}
              // key={index}
              >
                <Link
                  // to={routes.path}
                  className="s_nav_menu_link"
                  onClick={() => setSidebarOpen(false)}
                >
                  <div>{upgrade()}</div>
                  <p>Upgrade</p>
                </Link>
              </li>

              <li
              // className={`s_nav_menu_item ${window.location.href.includes(routes.path) &&
              //   "s_nav_active"
              //   }`}
              // key={index}
              >
                <Link
                  // to={routes.path}
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

              <li
              // className={`s_nav_menu_item ${window.location.href.includes(routes.path) &&
              //   "s_nav_active"
              //   }`}
              // key={index}
              >
                <Link
                  // to={routes.path}
                  className="s_nav_menu_link"
                  onClick={() => setSidebarOpen(false)}
                >
                  <div>{logOutBtn()}</div>
                  <p>Logout</p>
                </Link>
              </li>

              {/* <li className={`s_nav_menu_item cursor-pointer`}>
                <div
                  className="s_nav_menu_link"
                  onClick={() => setOpenPopup((prev) => !prev)}
                >
                  <div>{referal()}</div>
                  <p>Referral</p>
                </div>
              </li> */}
            </ul>

          </div>

          {/* <div className={"profileContSecondary"}>
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
          </div> */}
        </div>
      </nav>

      <div className="w-full">
        <div className="p-4 w-full md:w-[calc(100vw-185px)] h-screen overflow-auto">
          {children}
        </div>
      </div>





      {
        showFeedbackSection ? <div className="dashboard-feedback-section">
          {/* ques no  */}
          <div className="dashboard-feedback-section-ques-no">
            <div className="">
              <div className="first">
                Question {quesNoFeed}/2
              </div>
              <div className="second" onClick={() => {
                setShowFeedbackSection(false);
              }}>
                {cancelButton()}
              </div>
            </div>
          </div>

          {/* data  */}
          {
            quesNoFeed === 1 ? <div className="dashboard-feedback-section-ques-cont">

              <div className="question-head-cont">

                <div className="quest-head">To what extent do you agree with the following statement</div>
                <div className="ques-res">
                  <input type="text" placeholder="“It was easy to handle my issue”" />
                </div>
              </div>

              {/* rating  */}
              <div className="rating-cont">
                <div className="rating-num-cont">
                  <div>
                    <p>1</p>
                  </div>
                  <div>
                    <p>2</p>
                  </div>
                  <div>
                    <p>3</p>
                  </div>
                  <div>
                    <p>4</p>
                  </div>
                  <div>
                    <p>5</p>
                  </div>
                  <div>
                    <p>6</p>
                  </div>
                  <div>
                    <p>7</p>
                  </div>
                </div>

                <div className="rating-text-cont">
                  <p className="dis">Strongly Diagree</p>
                  <p className="like">Very Likely</p>
                </div>
              </div>

              <div className="button-cont">
                <button className="cancel">
                  <p>Cancel</p>
                </button>
                <button type="button" className="submit" onClick={() => {
                  console.log("clicked")
                  setQuesNoFeed(2)
                }}>
                  <p>Next</p>
                </button>
              </div>
            </div>
              :
              <div className="dashboard-feedback-section-ques-cont-two">


                <div className="quest-head">
                  <p>To what extent do you agree with the following statement</p>
                </div>

                <div className="two-feed-text">
                  <p className="first">Tell us how we can improve </p>
                  <textarea name="" id="" cols="30" rows="5"></textarea>
                  <p className="second">0/120 characters</p>
                </div>


                <div className="button-cont">
                  <button className="cancel">
                    <p>Cancel</p>
                  </button>
                  <button type="submit" className="submit" onClick={() => {
                    console.log("clicked")
                    setQuesNoFeed(2)
                  }}>
                    <p>Submit</p>
                  </button>
                </div>
              </div>
          }








          {/* footer  */}
          <div className="dashboard-feedback-section-footer">
            <p>
              Powered by Quest Labs
            </p>
            {questIcon()}
          </div>

        </div> : ""
      }




    </div>
  );
}
