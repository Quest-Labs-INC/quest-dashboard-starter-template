import React, { useContext } from 'react'
import { ThemeContext } from '../Common/AppContext';
import { generalFunction } from '../../assets/Config/generalFunction';
import { Referral } from '@questlabs/react-sdk';

const ReferralComp = () => {
    const { theme, bgColors, appConfig } = useContext(ThemeContext);
    return (
        <Referral
            userId={generalFunction.getDataFromCookies("questUserId")}
            token={generalFunction.getDataFromCookies("questUserToken")}
            questId={"q-saas-referral"}
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
                    paddingTop: "28px",
                    boxShadow: "0px 0px 0px 0px",
                    border: "1px solid #ECECEC",
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
                    border: "none",
                },
                React,
                Icon: {
                    // color: bgColors[`${theme}-color-premitive-grey-5`]
                }
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