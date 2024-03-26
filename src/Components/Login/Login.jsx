import { QuestLogin } from "@questlabs/react-sdk";
import { importConfig } from "../../assets/Config/importConfig";
import LoginWrapper from "../Common/LoginWrapper";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../Common/AppContext";
import { mainConfig } from "../../assets/Config/appConfig";

export default function Login() {
    const navigate = useNavigate();
    const { appConfig, theme, bgColors, contentConfig } =
        useContext(ThemeContext);

    const completeLogin = (e) => {
        const { userId, token, userCredentials } = e;
        if (userId && token) {
            localStorage.setItem("questUserId", userId);
            localStorage.setItem("questUserToken", token);
            localStorage.setItem(
                "questUserCredentials",
                JSON.stringify(userCredentials)
            );
            navigate("/onboarding");
        }
    };

    return (
        <div className="flex items-center justify-center h-full">
            <QuestLogin
                googleClientId={mainConfig?.GOOGLE_CLIENT_ID}
                textColor=""
                btnTextColor=""
                backgroundColor="white"
                btnColor=""
                redirectUri={mainConfig?.GOOGLE_REDIRECT_URI}
                // redirectURL= "http://localhost:5173/login"
                google={true}
                email={true}
                onSubmit={(e) => completeLogin(e)}
                googleButtonText="Continue with Google"
                descriptionText={`Welcome to ${appConfig?.QUEST_ENTITY_NAME}`}
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
                        color: "var(--Neutral-Grey-200, #AFAFAF)",
                        textAlign: "center",
                        fontFamily: "Figtree",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "20px",
                    },
                    Label: {
                        color: bgColors[`${theme}-color-premitive-grey-8`],
                        fontFamily: "Figtree",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "16px",
                    },
                    Input: {
                        color: "var(--Neutral-White-500, #B9B9B9)",
                        fontFamily: "Figtree",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "20px",
                    },
                    OtpInput: {
                        color: "var(--Neutral- Grey - 300, #8E8E8E)",
                        textAlign: "center",
                        fontFamily: "Figtree",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "20px",
                    },

                    IconStyle: {
                        Background: bgColors[`${theme}-primary-bg-color-0`],
                    },
                }}
                showFooter={false}
            />
        </div>
    );
}
