import { OnBoarding } from "@questlabs/react-sdk";
import LoginWrapper from "../Common/LoginWrapper";
import { useContext, useEffect, useState } from "react";
import { generalFunction } from "../../assets/Config/GeneralFunction";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../Common/AppContext";

export default function Onboarding() {
    const [answer, setAnswer] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { appConfig } = useContext(ThemeContext);
    const { theme, bgColors, contentConfig } = useContext(ThemeContext);
    const [key, setKey] = useState("");

    const completeAnswer = (e) => {
        navigate("/dashboard");
    };

    useEffect(() => {}, [appConfig.QUEST_API_KEY]);

    return (
        <div className="w-full flex h-full items-center justify-center m-auto">
            <div
                className={`${!loading && "rounded-xl"} w-2/3`}
                style={{ boxShadow: loading ? "" : "" }}
            >
                {appConfig.QUEST_API_KEY != "" && (
                    <OnBoarding
                        questId={appConfig?.QUEST_ONBOARDING_QUIZ_CAMPAIGN_ID}
                        userId={generalFunction.getUserId()}
                        token={generalFunction.getUserToken()}
                        controlBtnType="Buttons"
                        headingScreen={[
                            {
                                name: "Welcome Aboard!",
                                desc: "Start your journey with us. Quick setup - lasting success.",
                            },
                        ]}
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
                                borderRadius: "10px",
                                overflow: "hidden",
                                backgroundColor:
                                    theme === "dark"
                                        ? bgColors[
                                              `${theme}-primary-bg-color-3`
                                          ]
                                        : "",
                            },
                            Topbar: {
                                padding: "20px 0",
                                gap: "4px",
                                border: "none",
                            },
                            Heading: {
                                color: bgColors[
                                    `${theme}-color-premitive-grey-5`
                                ],
                                textAlign: "center",
                                fontFamily: "Figtree",
                                fontSize: "20px",
                                fontStyle: "normal",
                                fontWeight: "600",
                                lineHeight: "30px",
                                letterSpacing: "-0.4px",
                            },
                            Description: {
                                color: "#939393",
                                textAlign: "center",
                                fontFamily: "Figtree",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "16px",
                                margin: "auto",
                            },
                            Label: {
                                color: bgColors[
                                    `${theme}-color-premitive-grey-6`
                                ],
                                fontFamily: "Figtree",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: "500",
                                lineHeight: "16px",
                            },
                            Input: {
                                borderRadius: "10px",
                                border: "1px solid #ECECEC",
                            },
                            MultiChoice: {
                                selectedStyle: {
                                    background:
                                        bgColors[`${theme}-primary-bg-color-0`],
                                    color: "#E0E0E0",
                                    border: "1px solid",
                                },
                            },
                            SingleChoice: {
                                selectedStyle: {
                                    border: "1px solid gray",
                                },
                            },
                        }}
                        showFooter={false}
                    />
                )}
            </div>
        </div>
    );
}
