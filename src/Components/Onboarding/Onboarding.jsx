import { OnBoarding, Toast } from "@questlabs/react-sdk";
import LoginWrapper from "../Common/LoginWrapper";
import { useContext, useEffect, useState } from "react";
import { generalFunction } from "../../assets/Config/generalFunction";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../Common/AppContext";
import { mainConfig } from "../../assets/Config/appConfig";

export default function Onboarding() {
    const [answer, setAnswer] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { appConfig } = useContext(ThemeContext);
    const { theme, bgColors, contentConfig } = useContext(ThemeContext);
    const [key, setKey] = useState("");
    const [openSecondOnboard, setOpenSecondOnboard] = useState(false);
    const [companyAnswer, setCompanyAnswer] = useState({});
    

    const completeAnswer = async(e) => {
        
        let ownerDetails = JSON.parse(localStorage.getItem("adminDetails"));
        
        if (!!ownerDetails?.ownerEntityId && ownerDetails?.userId == generalFunction.getUserId()) {
            
            
            await generalFunction.supabase_updateData(
                "users",
                generalFunction.getUserCredentials()?.email,
                {
                    // for storing the data in supabase add the following key and value
                    name: answer["ca-0534124c-8f43-4729-8a0b-1239821af73b"],
                    company_id: ownerDetails?.ownerEntityId,
                    
                }
            );
            
            if (ownerDetails?.ownerEntityId){
                let companyid = await generalFunction.getCompanyId();
                await generalFunction.supabase_updateData(
                    "users",
                    generalFunction.getUserCredentials()?.email,
                    {
                        // for storing the data in supabase add the following key and value
                        varacompanyid: companyid,
                        
                    }
                );
            }
            navigate("/data_collection");
        } else {
            
            setOpenSecondOnboard(true);
        }
    };

    const completeCompanyAnswer = async(e) => {
        let companyName = companyAnswer["ca-251082a0-ac36-4321-880b-5fc3e0514699"]

        let ownerDetails = {
            userId: generalFunction.getUserId(),
        }

        let entityCreation = generalFunction.createUrl(`api/entities?userId=${generalFunction.getUserId()}`)
        await fetch(entityCreation.url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                apikey: mainConfig.QUEST_API_KEY,
                userId: generalFunction.getUserId(),
                token: generalFunction.getUserToken(),
            },
            body: JSON.stringify({
                name: companyName,
                parentEntityId: appConfig.QUEST_ENTITY_ID,
            })
        }).then((res) => res.json()).then((res) => {
            console.log(res);
            if (res.success) {
                ownerDetails.ownerEntityId = res.entityId;
            }
        });

        const companydata = await generalFunction.createCompany({
            company_id: ownerDetails?.ownerEntityId,
            name: companyName,
        })

        const companyId = companydata[0]?.id;

        let generateApiKeyRequest = generalFunction.createUrl(`api/entities/${ownerDetails?.ownerEntityId}/keys?userId=${generalFunction.getUserId()}`);
        await fetch(generateApiKeyRequest.url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                apikey: mainConfig.QUEST_API_KEY,
                userId: generalFunction.getUserId(),
                token: generalFunction.getUserToken(),
            },
        }).then((res) => res.json()).then((res) => {
            ownerDetails.apiKey = res?.data?.key;
        });

        localStorage.setItem("adminDetails", JSON.stringify(ownerDetails));

        await generalFunction.supabase_updateData(
            "users",
            generalFunction.getUserCredentials()?.email,
            {
                // for storing the data in supabase add the following key and value
                name: answer["ca-0534124c-8f43-4729-8a0b-1239821af73b"],
                company_id: ownerDetails?.ownerEntityId,
                varacompanyid: companyId
            }
        );

        await generalFunction.createDefaultRoles(ownerDetails?.ownerEntityId, ownerDetails?.apiKey);

        navigate("/data_collection");
    }


    useEffect(() => {}, [appConfig.QUEST_API_KEY]);

    return (
        <div className="w-full flex h-full items-center justify-center m-auto">
            <div
                className={`${!loading && "rounded-xl"} w-2/3`}
                style={{ boxShadow: loading ? "" : "" }}
            >
                {appConfig.QUEST_API_KEY != "" && !openSecondOnboard && (
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
                {openSecondOnboard && (
                    <OnBoarding
                        questId={appConfig?.QUEST_COMPANY_ONBOARDING_QUIZ_CAMPAIGN_ID}
                        userId={generalFunction.getUserId()}
                        token={generalFunction.getUserToken()}
                        controlBtnType="Buttons"
                        headingScreen={[
                            {
                                name: "Professional details",
                                desc: "Join our voyage towards innovation and excellence! ⚡",
                            },
                        ]}
                        singleChoose="modal3"
                        multiChoice="modal2"
                        answer={companyAnswer}
                        setAnswer={setCompanyAnswer}
                        inputBgColor=""
                        loadingTracker={true}
                        setLoading={setLoading}
                        getAnswers={completeCompanyAnswer}
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
                                color: "#93939333",
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
                                    background: bgColors[`${theme}-primary-bg-color-0`],
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
