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
        <div className="dashboard-page transition-all ease-in delay-[40]">

            {/* get started head  */}
            <div className="dashboard-page-header" style={{ backgroundColor: bgColors[`${theme}-primary-bg-color-3`] }}>
                <p style={{
                    color: bgColors[`${theme}-color-premitive-grey-5`],
                    // transition: '0.4s'
                }}>Get Started</p>
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
                {/* for search cont  */}
                <div className="search-cont flex gap-[34px] items-center w-full">

                    <div className="w-full h-14 flex border border-[#EFEFEF] rounded-[10px] ">
                        <div className="flex items-center h-full mx-5">
                            {searchIcon()}
                        </div>
                        <input type="text" placeholder="Search here.." className="border-none outline-none h-full w-full bg-transparent" style={{
                            backgroundColor: 'transparent',
                            color: bgColors[`${theme}-color-premitive-grey-5`]
                        }} />
                    </div>

                    <div className="flex w-[134px] h-[56px] px-[48px] py-[12px] justify-center items-center gap-[8px] flex-shrink-0 rounded-[5px]"
                        style={{
                            background: bgColors[`${theme}-primary-bg-color-0`],
                            // color: 'var(--Foundation-Neutral-neutral-50, #EAEBED)'
                        }}>
                        {/* <button className="h-14 w-[134px] text-center text-lg rounded-[5px] px-[48px] py-[12px]" style={{ background: bgColors[`${theme}-primary-bg-color-0`], color: 'var(--Foundation-Neutral-neutral-50, #EAEBED)' }}>Search</button> */}
                        {/* color: var(--Foundation-Neutral-neutral-50, #EAEBED);
                        font-family: "Hanken Grotesk";
                        font-size: 18px;
                        font-style: normal;
                        font-weight: 500;
                        line-height: 28px; /* 155.556% */}
                        <button
                            className="text-[18px] font-[500]"
                            style={{
                                color: 'var(--Foundation-Neutral-neutral-50, #EAEBED)',
                                fontFamily: 'Hanken Grotesk',
                                fontStyle: "normal",
                                lineHeight: '28px'
                            }}
                        >Search</button>
                    </div>

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
                            // background: "transparent",
                            // background: "red",
                            // padding: "-25px",
                            background: bgColors[`${theme}-primary-bg-color-3`],
                        },
                        Heading: {
                            // fontSize: "22px",

                            color: 'var(--Neutral-Black-400, #2C2C2C)',
                            color: bgColors[`${theme}-color-premitive-grey-5`],
                            fontFamily: 'Figtree',
                            fontSize: '24px',
                            fontStyle: 'normal',
                            fontWeight: '600',
                            lineHeight: '32px' /* 133.333% */
                            // backgroundColor: bgColors[`${theme}-primary-bg-color-3`] 
                        },
                        Description: {
                            fontSize: "14px",
                            color: "green",
                            color: 'var(--Neutral-Black-200, #6E6E6E)',
                            fontFamily: 'Figtree',
                            fontSize: '14px',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            lineHeight: '20px' /* 142.857% */,
                            margin: "8px 0 0 0"
                        },
                        Card: {
                            // padding:"25px"
                            // background: "yellow",
                            // padding: "50px"
                            // margin:"0"
                            color: 'blue',

                        },


                        // TopBar: {
                        //     background: 'blue',
                        // }
                    }}
                    showFooter={false}
                />
            </div>

        </div>
    );
}
