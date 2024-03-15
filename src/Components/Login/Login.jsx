import { QuestLogin } from "@questlabs/react-sdk";
import { importConfig } from "../../assets/Config/importConfig";
import LoginWrapper from "../Common/LoginWrapper";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../Common/appContext";


export default function Login() {
    const cookies = new Cookies()
    const navigate = useNavigate()
    const { appConfig, theme, bgColors, contentConfig } = useContext(ThemeContext)

    console.log(theme)
    console.log(bgColors)
    const completeLogin = (e) => {
        const { userId, token, userCredentials } = e;
        if (userId && token) {
            localStorage.setItem("questUserId", userId);
            localStorage.setItem("questUserToken", token);
            localStorage.setItem("questUserCredentials", JSON.stringify(userCredentials))
            navigate("/onboarding");
        }
    }



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

                styleConfig={{

                    Form: {
                        boxShadow: "0px 0px 0px 0px",
                        borderRadius: "0px",
                        // padding:'50px'
                        // background: "yellow"
                    },
                    // Topbar: {
                    //     background: 'red'
                    // },
                    Heading: {
                        fontSize: "22px",
                        // background: 'red'
                        display: "-webkit-box",
                        // - webkit - box - orient: vertical;
                        // -webkit-line-clamp: 1;
                        alignSelf: "stretch",
                        overflow: "hidden",
                        color: "var(--Neutral-Grey-700, #252525)",
                        textAlign: "center",
                        textOverflow: "ellipsis",

                        /* Title lg/600 */
                        fontFamily: "Figtree",
                        fontSize: "24px",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: "32px", /* 133.333% */
                        letterSpacing: "-0.48px",


                    },
                    Description: {
                        // fontSize: "14px",
                        alignSelf: "stretch",
                        color: "var(--Neutral-White-500, #B9B9B9)",
                        textAlign: "center",

                        /* Body md/400 */
                        fontFamily: "Figtree",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "20px", /* 142.857% */

                    },
                    Label: {
                        alignSelf: "stretch",
                        color: "var(--Neutral-Black-500, #0D0D0D)",
                        /* Body sm/400 */
                        fontFamily: "Figtree",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "16px", /* 133.333% */
                    },
                    Input: {
                        alignSelf: "stretch",
                        color: "var(--Neutral-White-500, #B9B9B9)",

                        /* Body md/400 */
                        fontFamily: "Figtree",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "20px", /* 142.857% */
                    },
                    OtpInput: {
                        // background: "blue",
                        color: "var(--Neutral- Grey - 300, #8E8E8E)",
                        textAlign: "center",

                        /* Body md/400 */
                        fontFamily: "Figtree",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "20px" /* 142.857% */
                    },

                    IconStyle: {
                        // BorderColor: bgColors[`${theme}-primary-bg-color-0`],
                        Background: bgColors[`${theme}-primary-bg-color-0`],
                        // color: 'yellow'
                    },
                    // bgColors[`${theme}-color-premitive-grey-5`],
                    Footer: {},
                    PrimaryButton: {},
                    SecondaryButton: {},
                    TextArea: {}
                }}
                showFooter={false}
            />
        </div>
    );
}
