import { GetStarted } from "@questlabs/react-sdk";
import DashboardWrapper from "../Common/DashboardWrapper";
import { importConfig } from "../../assets/Config/importConfig";
import { generalFunction } from "../../assets/Config/GeneralFunction";
import { useContext } from "react";
import { ThemeContext } from "../Common/appContext";
import { searchIcon } from "../Common/SideBarSvg";

// export default function Dashboard() {

//     const completeAllStatus = () => {
//     }

//     const { theme, bgColors, appConfig } = useContext(ThemeContext);

//     return (
//         <GetStarted
//             questId={appConfig?.QUEST_GET_STARTED_CAMPAIGN_ID}
//             userId={generalFunction.getUserId()}
//             token={generalFunction.getUserToken()}
//             completeAllStatus={completeAllStatus}
//             buttonBg='linear-gradient(90deg, rgba(105,92,254,1) 0%, rgba(0,210,234,1) 50%, rgba(105,92,254,1) 100%)'
//             // cardBG={}
//             // cardHeadingColor={bgColors[`${theme}-color-premitive-grey-5`]}
//             cardDescColor="var(--neutral-grey-200, #AFAFAF)"
//             cardBorderColor="var(--primary-bg-color-2)"
//             iconUrls={[importConfig.routesIcons.userIcon, importConfig.routesIcons.adminIcon, importConfig.routesIcons.settingIcon]}
//             arrowColor="black"
//             cardBackground={bgColors[`${theme}-primary-bg-color-2`]}
//             styleConfig={{
//                 Form: {
//                     background: "transparent"
//                 },
//                 Heading: {
//                     fontSize: "22px"
//                 },
//                 Description: {
//                     fontSize: "14px"
//                 },
//             }}
//             showFooter={false}
//         />
//     )
// }


export default function Dashboard() {
    const completeAllStatus = () => { };

    const { theme, bgColors, appConfig } = useContext(ThemeContext);

    return (
        <div className="dashboard-page" style={{
            // display: 'flex',
            // flexDirection: 'column',
            // gap: '25px',
            // width: '1256px',
            // alignItems: 'center',
            // margin: '0 auto',
            // backgroundColor:'burlywood'
        }}>
            <div className="dashboard-page-header" style={{ backgroundColor: bgColors[`${theme}-primary-bg-color-3`] }}>
                <div>
                    <p style={{
                        color: bgColors[`${theme}-color-premitive-grey-5`],
                        // transition: '0.4s'
                    }}>Get Started</p>
                </div>
            </div>

            {/* <div className="dashboard-search-section">
                <div className="search-cont">
                    <input type="text" placeholder="Search here" style={{ backgroundColor: bgColors[`${theme}-primary-bg-color-3`] }} />
                    <button >
                        {searchIcon()}
                    </button>
                </div>
                <button style={{ background: bgColors[`${theme}-primary-bg-color-0`] }}>
                    <p>Search</p>
                </button>
            </div> */}
            <div className="dashboard-main-section">
                <div className="flex gap-[63px] items-center w-full">
                    <div className="h-14 flex border border-[#EFEFEF] rounded-[10px] w-full">
                        <div className="flex items-center h-full mx-5">
                            {searchIcon()}
                        </div>
                        <input type="text" placeholder="Search here ..." className="border-none outline-none h-full w-full bg-transparent"/>
                    </div>
                    <button className="h-14 w-[134px] text-lg rounded-[5px]" style={{ background: bgColors[`${theme}-primary-bg-color-0`], color: "#eaebed" }}>Search</button>
                </div>

                <GetStarted
                    questId={appConfig?.QUEST_GET_STARTED_CAMPAIGN_ID}
                    userId={generalFunction.getDataFromCookies("questUserId")}
                    token={generalFunction.getDataFromCookies("questUserToken")}
                    completeAllStatus={completeAllStatus}
                    buttonBg="linear-gradient(90deg, rgba(105,92,254,1) 0%, rgba(0,210,234,1) 50%, rgba(105,92,254,1) 100%)"
                    // cardBG={}
                    cardHeadingColor={bgColors[`${theme}-color-premitive-grey-5`]}
                    cardDescColor="var(--neutral-grey-200, #AFAFAF)"
                    cardBorderColor="var(--primary-bg-color-2)"
                    // width="50%"
                    iconUrls={[
                        importConfig.routesIcons.userIcon,
                        importConfig.routesIcons.adminIcon,
                        importConfig.routesIcons.settingIcon,
                    ]}

                    arrowColor="black"
                    cardBackground={bgColors[`${theme}-primary-bg-color-2`]}
                    styleConfig={{
                        Form: {
                            background: "transparent",
                        },
                        Heading: {
                            fontSize: "22px",
                        },
                        Description: {
                            fontSize: "14px",
                        },
                    }}
                    showFooter={false}
                />
            </div>

        </div>
    );
}
