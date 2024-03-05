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


    const completeLogin = (e) => {
        const { userId, token, userCredentials } = e;
        if (userId && token) {
            localStorage.setItem("questUserId", userId);
            localStorage.setItem("questUserToken", token);
            localStorage.setItem("questUserCredentials", JSON.stringify(userCredentials))
            navigate("/preview/onboarding");
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
                    },
                    Heading: {
                        fontSize: "22px"
                    },
                    Description: {
                        fontSize: "14px"
                    }
                }}
                showFooter={false}
            />
        </div>
    );
}
