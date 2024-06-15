import React, { useContext } from 'react'
import { ThemeContext } from '../Common/AppContext';
import { generalFunction } from '../../assets/Config/generalFunction';
import { Referral } from '@questlabs/react-sdk';

const ReferralComp = ({ colorPicker }) => {
    const { theme, bgColors, appConfig } = useContext(ThemeContext);
    return (
        <Referral
            userId={generalFunction.getUserId()}
            token={generalFunction.getUserToken()}
            // questId={"q-saas-referral"}
            questId={appConfig.QUEST_REFERRAL_CAMPAIGN_ID}
            bgColor="white"
            color=""
            heading={"Your referral link"}
            description={
                "Copy and share your referral link with friends or on social media using the icons below."
            }
            referralLink={`${window.location.origin}/login?ref=`}
            showReferralCode={false}
            // headingColor="blue"
            shareButtonText="Share Referral Link"
            styleConfig={{
                Form: {
                    background: theme == "dark" ? "black" : "white",
                    paddingTop: "28px",
                    boxShadow: "0px 0px 0px 0px",
                    border: `1.5px solid ${bgColors[`${theme}-primary-border-color`]}`,
                },
                Description: {
                    alignSelf: "stretch",
                    overflow: "hidden",
                    textAlign: "left",
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
                    textAlign: "left",
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
                PrimaryButton: {
                    background: bgColors[`${theme}-primary-bg-color-0`],
                    border: "none",
                },
                React,
                Icon: {
                    background: bgColors[`${theme}-primary-border-color`],
                    color: colorPicker
                },
                Input: {
                    borderColor: theme == "dark" ? 'rgba(255, 255, 255, 0.2)' : ''
                },
            }}
            gradientBackgroundColor={
                bgColors[`${theme}-primary-bg-color-0`]
            }
            gradientBackground={false}
            showFooter={false}
            showRefferalLogo={false}
        />
    )
}

export default ReferralComp