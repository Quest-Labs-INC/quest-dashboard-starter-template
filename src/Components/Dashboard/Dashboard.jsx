import { GetStarted } from "@questlabs/react-sdk";
import DashboardWrapper from "../Common/DashboardWrapper";
import { importConfig } from "../../assets/Config/importConfig";
import { generalFunction } from "../../assets/Config/GeneralFunction";
import { useContext } from "react";
import { ThemeContext } from "../Common/appContext";
import { searchIcon } from "../Common/SideBarSvg";

export default function Dashboard() {
    const completeAllStatus = () => { };

    const { theme, bgColors, appConfig } = useContext(ThemeContext);

    return (
        <div className="dashboard-page transition-all ease-in delay-[40]">
            {/* get started head  */}
            <div
                className="dashboard-page-header"
                style={{
                    backgroundColor: bgColors[`${theme}-primary-bg-color-3`],
                }}
            >
                <p
                    style={{
                        color: bgColors[`${theme}-color-premitive-grey-5`],
                    }}
                >
                    Get Started
                </p>
            </div>

            {/* <div className="pl-10 pr-[116px] pt-[30px]"> */}
            {/* here */}
            <div className="pl-5 pr-[96px] pt-[30px]">
                {/* for search cont  */}
                <div className="w-full flex items-center justify-between gap-4 px-5">
                    <div className="flex h-10 border py-2.5 items-center border-[#EFEFEF] rounded-[10px] w-full ">
                        <div className="flex items-center h-full mx-5">
                            {searchIcon()}
                        </div>
                        <input
                            type="text"
                            placeholder="Search here.."
                            className="border-none outline-none h-full w-full bg-transparent"
                            style={{
                                backgroundColor: "transparent",
                                color: bgColors[
                                    `${theme}-color-premitive-grey-5`
                                ],
                            }}
                        />
                    </div>

                    <button
                        className="text-sm px-8 py-2.5 rounded-[5px]"
                        style={{
                            background: bgColors[`${theme}-primary-bg-color-0`],
                            color: "#eaebed",
                            whiteSpace: "nowrap",
                        }}
                    >
                        Search
                    </button>
                </div>


                <div className="get-started pt-[10px]">
                    <GetStarted
                        questId={appConfig?.QUEST_GET_STARTED_CAMPAIGN_ID}
                        userId={generalFunction.getDataFromCookies("questUserId")}
                        token={generalFunction.getDataFromCookies("questUserToken")}
                        completeAllStatus={completeAllStatus}
                        buttonBg="linear-gradient(90deg, rgba(105,92,254,1) 0%, rgba(0,210,234,1) 50%, rgba(105,92,254,1) 100%)"
                        // cardBG={}
                        cardHeadingColor={
                            bgColors[`${theme}-color-premitive-grey-5`]
                        }
                        cardDescColor="var(--neutral-grey-200, #AFAFAF)"
                        cardBorderColor="var(--primary-bg-color-2)"
                        descriptionText={`Get started with ${appConfig?.QUEST_ENTITY_NAME} and explore how you can get the best out of the platform`}
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
                                padding: "0px",
                                background: bgColors[`${theme}-primary-bg-color-3`],
                            },
                            Heading: {
                                color: bgColors[`${theme}-color-premitive-grey-5`],
                                fontFamily: "Figtree",
                                fontSize: "24px",
                                fontStyle: "normal",
                                fontWeight: "600",
                                lineHeight: "32px",
                            },
                            Description: {
                                color: "var(--Neutral-Black-200, #6E6E6E)",
                                fontFamily: "Figtree",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "20px",
                                margin: "8px 0 0 0",
                            },
                            Card: {},
                        }}
                        showFooter={false}
                    />
                </div>
            </div>
        </div>
    );
}
