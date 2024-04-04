import { GetStarted } from "@questlabs/react-sdk";
import DashboardWrapper from "../Common/DashboardWrapper";
import { importConfig } from "../../assets/Config/importConfig";
import { generalFunction } from "../../assets/Config/generalFunction";
import { useContext } from "react";
import { ThemeContext } from "../Common/AppContext";
import { adminIcon, searchIcon, settingIcon, userIcon } from "../Common/SideBarSvg";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const completeAllStatus = () => { };
    const navigate = useNavigate();
    const { theme, bgColors, appConfig } = useContext(ThemeContext);

    const getLighterColor = (color1, color2) => {
        const calculateLuminance = (color) => {
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);
            return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        };
        const luminance1 = calculateLuminance(color1);
        const luminance2 = calculateLuminance(color2);
     
    
        return luminance1 > luminance2 ? color1 : color2;
    };
    
    
    const colorRetriver = () => {
        let mainColor = bgColors[`${theme}-primary-bg-color-0`] || "#FBFBFB"; 
        let diffColor = mainColor.split(" ")?.filter((ele) => ele.charAt(0) == "#");
        let pickColor = !!diffColor?.length
          ? [diffColor[0], diffColor.length > 1 ? diffColor[1] : "#D1ACFF"]
          : ["#9035FF", "#D1ACFF"];
        const lighterColor = getLighterColor(diffColor[0], diffColor[1]); 
    
        return lighterColor;
    };
    
      function hexToRgb(hex) {
        hex = hex.replace(/^#/, "");
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r}, ${g}, ${b}`;
      }

    return (
        <div className="dashboard-page transition-all ease-in delay-[40]">
            {/* get started head  */}
            <div
                className="dashboard-page-header"
                style={{borderBottom: `1.5px solid ${bgColors[`${theme}-primary-border-color`]}`}}
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
                {/* <div className="w-full flex items-center justify-between gap-4 px-5">
                    <div className="flex h-10 border py-2.5 items-center rounded-[10px] w-full" style={{borderColor: bgColors[`${theme}-primary-border-color`]}}>
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
                        className="text-sm px-8 py-2.5 rounded-[10px]"
                        style={{
                            background: bgColors[`${theme}-primary-bg-color-0`],
                            color: "#eaebed",
                            whiteSpace: "nowrap",
                        }}
                    >
                        Search
                    </button>
                </div> */}


                <div id='get-started' className="get-started pt-[4px]">
                    <GetStarted
                        questId={appConfig?.QUEST_GET_STARTED_CAMPAIGN_ID}
                        userId={generalFunction.getDataFromCookies("questUserId")}
                        token={generalFunction.getDataFromCookies("questUserToken")}
                        completeAllStatus={completeAllStatus}
                        buttonBg="linear-gradient(90deg, rgba(105,92,254,1) 0%, rgba(0,210,234,1) 50%, rgba(105,92,254,1) 100%)"
                        cardHeadingColor={
                            bgColors[`${theme}-color-premitive-grey-5`]
                        }
                        cardDescColor="var(--neutral-grey-200, #AFAFAF)"
                        cardBorderColor="var(--primary-bg-color-2)"
                        descriptionText={`Get started with ${appConfig?.QUEST_ENTITY_NAME} and explore how you can get the best out of the platform`}
                        iconUrls={[
                            userIcon(bgColors[`${theme}-color-premitive-grey-5`]),
                            adminIcon(bgColors[`${theme}-color-premitive-grey-5`]),
                            settingIcon(bgColors[`${theme}-color-premitive-grey-5`]),
                        ]}
                        arrowColor="#939393"
                        onLinkTrigger={(e) => window.open(e, "_blank")}
                        showProgressBar={false}
                        allowMultiClick
                        styleConfig={{
                            Form: {
                                padding: "0px",
                                background: "transparent",
                            },
                            Topbar: {
                                border: "0px",
                                paddingBottom: "0px",
                                paddingTop: "0px",
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
                            ProgressBar: {
                                barColor: bgColors[`${theme}-primary-bg-color-0`],
                                ProgressText: {
                                    color: bgColors[`${theme}-color-premitive-grey-5`],
                                }
                            },
                            Card: {
                                background: theme == "dark" ? bgColors[`${theme}-primary-bg-color-2`] : "transparent",
                                border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`,
                            },
                            Icon: {
                                background: theme == "dark" ? "rgba(255, 255, 255, 0.08)" : `rgba(${hexToRgb(colorRetriver())}, 0.1)`,
                            },
                            Arrow:{
                                Background: theme == "dark" ? '#202020' : "",
                                CompletedBackground: theme == "dark" ? "#202020" : "",
                            }
                        }}
                        showFooter={false}
                    />
                </div>
            </div>
        </div>
    );
}
