import { QuestLogin } from "@questlabs/react-sdk";
import { importConfig } from "../../assets/Config/importConfig";
import LoginWrapper from "../Common/LoginWrapper";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";


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
            googleClientId="867106888033-ihclhq2s3lvp1ed70qevk7u0arhl6c07.apps.googleusercontent.com"
            textColor= ""
            btnTextColor= ""
            backgroundColor= "white"
            btnColor= ""
            redirectUri= "http://localhost:5173/login"
            // redirectURL= "http://localhost:5173/login"
            google= {true}
            email= {true}
            onSubmit={(e) => completeLogin(e)}
        />
    );
}
