import React, { useContext } from "react";
import { Referral } from "@questlabs/react-sdk";
import { generalFunction } from "../../assets/Config/generalFunction";
import { ThemeContext } from "../Common/AppContext";

const ReferralPopup = ({ setOpenPopup }) => {
    const { theme, bgColors, contentConfig, appConfig } = useContext(ThemeContext);
    const clickHandler = (e) => {
        if (document.getElementById("clickbox_sreferral").contains(e.target)) {
        } else {
            setOpenPopup(false);
        }
    };

    return (
        <div
            className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 bg-[rgba(0,0,0,.15)] backdrop-blur-sm z-10"
            onClick={clickHandler}
        >
            <div className="" id="clickbox_sreferral">
                <Referral
                    userId={generalFunction.getUserId()}
                    token={generalFunction.getUserToken()}
                    // questId={"q-saas-referral"}
                    questId={appConfig.QUEST_REFERRAL_CAMPAIGN_ID}
                    bgColor="white"
                    color=""
                    heading={"Referral link and code"}
                    description={
                        "Share your unique referral link with friends and receive up to 6,000 credits each time a friend signs up!"
                    }
                    referralLink={`${window.location.origin}?ref=`}
                    showReferralCode={false}
                    // headingColor="blue"
                    shareButtonText="Share Referral Link"
                    styleConfig={{
                        PrimaryButton: {
                            background: bgColors[`${theme}-primary-bg-color-0`],
                        },
                        Form: {
                            background: bgColors[`${theme}-primary-bg-color-1`],
                        },
                        Description: {
                            alignSelf: "stretch",
                            overflow: "hidden",
                            textAlign: "center",
                            textOverflow: "ellipsis",
                            fontFamily: "Figtree",
                            fontSize: "12px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "16px" /* 133.333% */,
                        },
                        Heading: {
                            overflow: "hidden",
                            color: theme === "dark" ? "white" : "",
                            textAlign: "center",
                            textOverflow: "ellipsis",
                            fontStyle: "normal",
                            fontWeight: "600",
                            lineHeight: "32px",
                            letterSpacing: "-0.48px",
                        },

                        Label: {
                            alignSelf: "stretch",
                            color: bgColors[`${theme}-color-premitive-grey-6`],
                            fontFamily: "Figtree",
                            fontSize: "12px",
                            fontStyle: "normal",
                            fontWeight: "500",
                            lineHeight: "16px",
                        },
                        Footer: {
                            background: bgColors[`${theme}-primary-bg-color-1`],
                            flex: "1 0 0",
                            color: "var(--Neutral-Black-100, #939393)",
                            textAlign: "center",

                            /* Caption/400 */
                            fontFamily: "Figtree",
                            fontSize: "10px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "12px" /* 120% */,
                            letterSpacing: "-0.1px",
                        },
                    }}
                    gradientBackgroundColor={
                        bgColors[`${theme}-primary-bg-color-0`]
                    }
                    gradientBackground={true}
                    showFooter={false}
                />
            </div>
        </div>
    );
};

export default ReferralPopup;
