import { OnBoarding, Toast } from "@questlabs/react-sdk";
import LoginWrapper from "../Common/LoginWrapper";
import { useContext, useEffect, useState } from "react";
import { generalFunction } from "../../assets/Config/generalFunction";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../Common/AppContext";

export default function Onboarding() {
    const [answer, setAnswer] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { appConfig } = useContext(ThemeContext);
    const { theme, bgColors, contentConfig } = useContext(ThemeContext);
    const [key, setKey] = useState("");

    const completeAnswer = async(e) => {
        await generalFunction.supabase_updateData(
            "users",
            generalFunction.getUserCredentials()?.email,
            {
                // for storing the data in supabase add the following key and value
                name: answer["ca-0534124c-8f43-4729-8a0b-1239821af73b"]
            }
        );

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
                        onError={(e) => Toast.error({ text: e.error })}
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
                                border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`,
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
            </div>
        </div>
    );
}
