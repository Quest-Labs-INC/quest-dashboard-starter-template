import { QuestLogin, Toast } from "@questlabs/react-sdk";
import { importConfig } from "../../assets/Config/importConfig";
import LoginWrapper from "../Common/LoginWrapper";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../Common/AppContext";
import { generalFunction } from "../../assets/Config/generalFunction";

export default function Login() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const { appConfig, theme, bgColors, contentConfig } =
        useContext(ThemeContext);
    const refQuery = new URLSearchParams(window.location.search).get("ref");


    const completeLogin = async (e) => {
        const { userId, token, userCredentials } = e;
        if (userId && token) {
            localStorage.setItem("questUserId", userId);
            localStorage.setItem("questUserToken", token);
            localStorage.setItem(
                "questUserCredentials",
                JSON.stringify(userCredentials)
            );

            if (refQuery) {
                // let request = generalFunction.createUrl(`api/entities/${appConfig.QUEST_ENTITY_ID}/quests/${appConfig.QUEST_REFERRAL_CAMPAIGN_ID}/claim`);
                let request = generalFunction.createUrl(`api/v2/entities/${mainConfig.QUEST_ENTITY_ID}/campaigns/${appConfig.QUEST_REFERRAL_CAMPAIGN_ID}/claim`);
                await fetch(request.url, {
                    method: "POST",
                    // credentials: "include",
                    headers: {
                        "content-type": "application/json",
                        apikey: appConfig.QUEST_API_KEY,
                        userId: userId,
                        token: token,
                    },
                    body: JSON.stringify({
                        userId: userId,
                        referralCode: refQuery,
                    })
                });
            }
            navigate("/your-app-onboarding");
        }
    };

    return (
        <div className="flex items-center justify-center h-full">
            <QuestLogin
                googleClientId={appConfig?.GOOGLE_CLIENT_ID}
                textColor=""
                btnTextColor=""
                backgroundColor="white"
                btnColor=""
                redirectUri={appConfig?.GOOGLE_REDIRECT_URI}
                // redirectURL= "http://localhost:5173/login"
                google={true}
                email={true}
                onSubmit={(e) => completeLogin(e)}
                googleButtonText="Continue with Google"
                descriptionText={`Welcome to ${appConfig?.QUEST_ENTITY_NAME}`}
                onError={(e) => Toast.error({ text: e.error })}
                styleConfig={{
                    Form: {
                        boxShadow: "0px 0px 0px 0px",
                        borderRadius: "0px",
                    },
                    Heading: {
                        color: bgColors[`${theme}-color-premitive-grey-7`],
                        textAlign: "center",
                        fontFamily: "Figtree",
                        fontSize: "24px",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: "32px",
                        letterSpacing: "-0.48px",
                    },
                    Description: {
                        color: 'var(--Neutral-Grey-200, #AFAFAF)',
                        textAlign: "center",
                        fontFamily: "Figtree",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "20px",
                    },
                    Label: {
                        // color: bgColors[`${theme}-color-premitive-grey-6`],
                        color: bgColors[`${theme}-color-premitive-grey-8`],
                        fontFamily: "Figtree",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "16px",
                    },
                    Input: {
                        color: bgColors[`${theme}-color-premitive-grey-7`],
                        fontFamily: "Figtree",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "20px",
                        border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`,
                        height: "40px",
                    },
                    OtpInput: {
                        color: bgColors[`${theme}-color-premitive-grey-7`],
                        textAlign: "center",
                        fontFamily: "Figtree",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "20px",
                        border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`
                    },

                    IconStyle: {
                        Background: bgColors[`${theme}-primary-bg-color-0`],
                        BorderColor: bgColors[`${theme}-primary-bg-color-0`],
                    },
                    PrimaryButton: {
                        border: "none"
                    },
                    SecondaryButton: {
                        background: "transparent",
                        border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`,
                        color: bgColors[`${theme}-color-premitive-grey-8`],
                    }

                }}
                showFooter={false}
            />
        </div>
    );
}
