import { OnBoarding } from "@questlabs/react-sdk";
import LoginWrapper from "../Common/LoginWrapper";
import { useState } from "react";



export default function Onboarding() {
    const [answer, setAnswer] = useState({})
    const [loading, setLoading] = useState(true);

    return (
        <div className="w-1/2 flex h-full items-center m-auto">
            <div className={`${!loading && "rounded-xl bg-white"}`} style={{boxShadow: loading ? "" : "0 0 5px #00000060"}}>
                <OnBoarding
                    questId="q-be64768a-f2ef-4a77-881e-97479d0a7cf1"
                    userId="u-1dd2f19b-5a1a-46e9-aa38-2e4318834421"
                    token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTFkZDJmMTliLTVhMWEtNDZlOS1hYTM4LTJlNDMxODgzNDQyMSIsImlhdCI6MTcwMzM1MzA5NywiZXhwIjoxNzAzNDM5NDk3fQ.zf5dISjIQoqPgYgjWdV6Yaus_6XEpI5qZZk5JPwoEv0"
                    progress= {["Personal Details","Professional Details"]}
                    controlBtnType= "Buttons"
                    headingScreen= {[{"name":"Identity Insights","desc":"Revealing dimensions beyond words"},{"name":"Professional Details","desc":"Tell us more about your company"}]}
                    design= {[[1,2,3],[4,5,6]]}
                    singleChoose= "modal1"
                    multiChoice= "modal2"
                    answer={answer}
                    setAnswer={setAnswer}
                    // inputBgColor="var(--primary-bg-color-1)"
                    loadingTracker={true}
                    setLoading={setLoading}
                />
            </div>
        </div>
    )
}