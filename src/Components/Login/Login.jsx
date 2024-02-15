import { QuestLogin } from "@questlabs/react-sdk";
import { importConfig } from "../../assets/Config/importConfig";
import LoginWrapper from "../Common/LoginWrapper";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { appConfig } from "../../assets/Config/appConfig";


export default function Login() {
    const cookies = new Cookies()
    const navigate = useNavigate()

    const completeLogin = (e) => {
        const { userId, token } = e;
        if (userId && token) {
            cookies.set("userId", userId);
            cookies.set("userToken", token);
            navigate("/onboarding");
        }
    }



    return (
        <QuestLogin
            googleClientId= {appConfig?.GOOGLE_CLIENT_ID}
            textColor= ""
            btnTextColor= ""
            backgroundColor= "white"
            btnColor= ""
            redirectUri= {appConfig?.GOOGLE_REDIRECT_URI}
            // redirectURL= "http://localhost:5173/login"
            google= {true}
            email= {true}
            onSubmit={(e) => completeLogin(e)}
        />
    );
}
