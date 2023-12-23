import { QuestLogin } from "@questlabs/react-sdk";
import { importConfig } from "../../assets/Config/importConfig";

import LoginWrapper from "../Common/LoginWrapper";

export default function Login() {
    return (
        <QuestLogin
            googleClientId="your client id"
            textColor= ""
            btnTextColor= ""
            // backgroundColor= "var(--primary-bg-color-1)"
            btnColor= ""
            redirectUri= "https://app.questapp.xyz/login"
            redirectURL= "https://www.questlabs.ai/"
            google= {true}
            email= {true}
        />
    );
}
