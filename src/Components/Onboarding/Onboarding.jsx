import { OnBoarding } from "@questlabs/react-sdk";
import LoginWrapper from "../Common/LoginWrapper";
import { useContext, useEffect, useState } from "react";
// import { appConfig } from "../../assets/Config/appConfig";
import { generalFunction } from "../../assets/Config/GeneralFunction";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../Common/appContext";
import './OnboardingPage.css'


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

    }, [appConfig.QUEST_API_KEY])

    return (
        // <div className="onboarding-page-div w-full flex h-full items-center justify-center m-auto">
        <div className="onboarding-page-div ">
            {/* <div className={`${!loading && "rounded-xl"} w-2/3 onboarding-page`} style={{ boxShadow: loading ? "" : "" }}> */}
            <div className={`${!loading && "rounded-xl"} onboarding-page`}>
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
                                borderRadius: "10px",
                                overflow: 'hidden',
                                backgroundColor: '',
                                // backgroundColor: bgColors[`${theme}-primary-bg-color-0`]
                                backgroundColor: theme === 'dark' ? bgColors[`${theme}-primary-bg-color-0`] : ""

                                // gap: '50px'
                            },
                            Topbar: {
                                // background: 'aquamarine',
                                padding: "20px 0",
                                gap: "4px",
                                border: 'none'
                            },
                            Heading: {
                                // fontSize: "22px",
                                overflow: "hidden",
                                // color: 'var(--Neutral-Black-400, #2C2C2C)',
                                color: bgColors[`${theme}-color-premitive-grey-5`],
                                textAlign: "center",
                                textOverflow: "ellipsis",
                                /* Title md/600 */
                                fontFamily: "Figtree",
                                fontSize: "20px",
                                fontStyle: "normal",
                                fontWeight: "600",
                                lineHeight: "30px", /* 150% */
                                letterSpacing: "-0.4px",
                                display: "-webkit-box",
                                // -webkit-box-orient: "vertical";
                                // -webkit-line-clamp: 1;
                                alignSelf: "stretch",
                                // background: 'blue'
                            },
                            Description: {
                                fontSize: "14px",
                                color: "var(--Neutral-Black-100, #939393)",
                                textAlign: "center",

                                /* Body sm/400 */
                                fontFamily: "Figtree",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "16px", /* 133.333% */
                                alignSelf: "stretch",
                                // backgroundColor: 'red'
                            },
                            // top here ends 

                            TextArea: {
                            },


                            Label: {
                                // color: "var(--Neutral-Black-300, #4C4C4C)",
                                color: bgColors[`${theme}-color-premitive-grey-6`],
                                fontFamily: "Figtree",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: "500",
                                lineHeight: "16px",
                            },
                            Input: {
                                alignSelf: "stretch",
                                borderRadius: "10px",
                                border: "1px solid var(--Neutral-Grey-100, #ECECEC)",
                                // background:'red'
                            },
                            MultiChoice: {},
                            PrimaryButton: {},
                            SecondaryButton: {},
                            ProgressBar: {},

                            Footer: {
                            }
                        }}
                        showFooter={false}
                    />
                }
            </div>

        </div>
    )
}