import { OnBoarding } from "@questlabs/react-sdk";
import LoginWrapper from "../Common/LoginWrapper";
import { useState } from "react";
import { appConfig } from "../../assets/Config/appConfig";
import { generalFunction } from "../../assets/Config/GeneralFunction";
import { useNavigate } from "react-router-dom";



export default function Onboarding() {
    const [answer, setAnswer] = useState({})
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    const completeAnswer = (e) => {
        navigate("/dashboard")
    }

    return (
        <div className="w-full flex h-full items-center justify-center m-auto">
            <div className={`${!loading && "rounded-xl bg-white"} w-1/2`} style={{boxShadow: loading ? "" : "0 0 5px #00000060"}}>
                <OnBoarding
                    questId={appConfig?.QUEST_ONBOARDING_QUIZ_CAMPAIGN_ID}
                    userId={generalFunction.getUserId()}
                    token= {generalFunction.getUserToken()}
                    progress= {["Personal Details", "Personal Details"]}
                    controlBtnType= "Buttons"
                    headingScreen= {[{"name":"Identity Insights", "desc":"Revealing dimensions beyond words"}]}
                    design= {[[1, 2, 3]]}
                    singleChoose= "modal1"
                    multiChoice= "modal2"
                    answer={answer}
                    setAnswer={setAnswer}
                    inputBgColor=""
                    loadingTracker={true}
                    setLoading={setLoading}
                    getAnswers={completeAnswer}
                    // template={1}
                    // progressBarType="modal1"
                />
            </div>
        </div>
    )
}