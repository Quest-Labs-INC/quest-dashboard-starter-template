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
        console.log(e)
        const { userId, token, userCredentials } = e;
        if (userId && token) {
            localStorage.setItem("questUserId", userId);
            localStorage.setItem("questUserToken", token);
            localStorage.setItem("questUserCredentials", JSON.stringify(userCredentials))
            navigate("/onboarding");
        }
    }



    return (
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
        />
    );
}
