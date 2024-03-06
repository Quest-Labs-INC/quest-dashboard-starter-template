import { OnBoarding } from "@questlabs/react-sdk";
import LoginWrapper from "../Common/LoginWrapper";
import { useContext, useEffect, useState } from "react";
// import { appConfig } from "../../assets/Config/appConfig";
import { generalFunction } from "../../assets/Config/GeneralFunction";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../Common/appContext";



export default function Onboarding() {
    const [answer, setAnswer] = useState({})
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const { appConfig } = useContext(ThemeContext);
    const { theme, bgColors, contentConfig } = useContext(ThemeContext)
    const [key, setKey] = useState("")


    const completeAnswer = (e) => {
        navigate("/dashboard")
    }
    
    useEffect(() => {

    },[appConfig.QUEST_API_KEY])

    return (
        <div className="w-full flex h-full items-center justify-center m-auto">
            <div className={`${!loading && "rounded-xl"} w-2/3`} style={{ boxShadow: loading ? "" : "" }}>
                {
                    appConfig.QUEST_API_KEY != "" &&
                    <OnBoarding
                        questId={appConfig?.QUEST_ONBOARDING_QUIZ_CAMPAIGN_ID}
                        userId={generalFunction.getDataFromCookies("questUserId")}
                        token={generalFunction.getDataFromCookies("questUserToken")}
                        controlBtnType="Buttons"
                        headingScreen={[{ "name": "Welcome Aboard!", "desc": "Start your journey with us. Quick setup - lasting success." }]}
                        singleChoose="modal3"
                        multiChoice="modal2"
                        answer={answer}
                        setAnswer={setAnswer}
                        inputBgColor=""
                        loadingTracker={true}
                        setLoading={setLoading}
                        getAnswers={completeAnswer}
                        styleConfig={{
                            Form: {
                                boxShadow: `0 0 5px ${bgColors[`${theme}-color-premitive-grey-5`]}`,
                                borderRadius: "10px",
                                background: "transparent"
                            },
                            Heading: {
                                fontSize: "22px"
                            },
                            Description: {
                                fontSize: "14px"
                            },
                        }}
                        showFooter={false}
                    />
                }
            </div>
        </div>
    )
}