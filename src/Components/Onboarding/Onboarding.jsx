import { OnBoarding } from "@questlabs/react-sdk";
import LoginWrapper from "../Common/LoginWrapper";
import { useContext, useEffect, useState } from "react";
// import { appConfig } from "../../assets/Config/appConfig";
import { generalFunction } from "../../assets/Config/generalFunction";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../Common/AppContext";
import "./OnboardingPage.css";

export default function Onboarding() {
    const [answer, setAnswer] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { appConfig } = useContext(ThemeContext);
    const { theme, bgColors, contentConfig } = useContext(ThemeContext);
    const [key, setKey] = useState("");

    const completeAnswer = (e) => {
        navigate("/your-app-dashboard");
    };

    return (
        <div className="h-full min-h-screen overflow-y-scroll flex justify-center items-center pl-[134px] pr-[125px]">
            <div className={`${!loading && "rounded-xl"} m-auto max-w-[500px]`}>
                {appConfig.QUEST_API_KEY != "" && (
                    <OnBoarding
                        questId={appConfig?.QUEST_ONBOARDING_QUIZ_CAMPAIGN_ID}
                        userId={generalFunction.getDataFromCookies(
                            "questUserId"
                        )}
                        token={generalFunction.getDataFromCookies(
                            "questUserToken"
                        )}
                        controlBtnType="Buttons"
                        headingScreen={[
                            {
                                name: "Welcome Aboard!",
                                desc: "Join our voyage towards innovation and excellence! ⚡",
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
                                              `${theme}-primary-bg-color-2`
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
                                fontSize: "14px",
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
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: "500",
                                lineHeight: "16px",
                            },
                            Input: {
                                borderRadius: "10px",
                                border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`
                            },
                            MultiChoice: {
                                selectedStyle: {
                                    background:
                                        bgColors[`${theme}-primary-bg-color-0`],
                                    color: "#E0E0E0",
                                    border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`,
                                },
                                style: {
                                    border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`,
                                }
                            },
                            SingleChoice: {
                                selectedStyle: {
                                    border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`,
                                },
                                style: {
                                    border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`,
                                }
                            },
                            PrimaryButton: {
                                border: "none",
                            },
                            TextArea: {
                                border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`
                            }
                        }}
                        showFooter={false}
                    />
                )}
                {appConfig.QUEST_API_KEY != "" && (
                    <div className='m-auto text-xs px-4 py-2 text-[#939393] rounded-md flex items-center justify-center gap-3 cursor-pointer' onClick={() => window.open("https://questlabs.ai/")}>
                        <p>Powered by Quest Labs</p>
                    </div>
                )}
            </div>
        </div>
    );
}
