import { QuestLogin, Toast } from "@questlabs/react-sdk";
import { importConfig } from "../../assets/Config/importConfig";
import LoginWrapper from "../Common/LoginWrapper";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../Common/AppContext";
import { mainConfig } from "../../assets/Config/appConfig";
import { generalFunction } from "../../assets/Config/generalFunction";

export default function Login() {
    const navigate = useNavigate();
    const { appConfig, theme, bgColors, contentConfig } =
        useContext(ThemeContext);
    const refQuery = new URLSearchParams(window.location.search)?.get("ref");

    const completeLogin = async(e) => {
        const { userId, token, userCredentials } = e;

        // store email in supabase
        await generalFunction.supabase_addData("users", userCredentials);
        
        if (userId && token) {
            localStorage.setItem("questUserId", userId);
            localStorage.setItem("questUserToken", token);
            localStorage.setItem(
                "questUserCredentials",
                JSON.stringify(userCredentials)
            );
            
            if (refQuery) {
                let request = generalFunction.createUrl(`api/v2/entities/${mainConfig.QUEST_ENTITY_ID}/campaigns/${appConfig.QUEST_REFERRAL_CAMPAIGN_ID}/claim`);
                await fetch(request.url, {
                    method: "POST",
                    headers: {
                      "content-type": "application/json",
                      apikey: mainConfig.QUEST_API_KEY,
                      userId: userId,
                      token: token,
                    },
                    body: JSON.stringify({
                      userId: userId,
                      referralCode: refQuery,
                      campaignVariationId: "cv-8d3c0e83-4bec-4354-bd9b-8faf11fbf238"
                    })
                });
            }

            let claimedStatus = false;
            let request = generalFunction.createUrl(`api/v2/entities/${mainConfig.QUEST_ENTITY_ID}/campaigns/${appConfig.QUEST_ONBOARDING_QUIZ_CAMPAIGN_ID}?userId=${userId}`);
            await fetch(request.url, {
                method: "GET",
                headers: {
                  "content-type": "application/json",
                  apikey: mainConfig.QUEST_API_KEY,
                  userId: userId,
                  token: token,
                },
            }).then((res) => res.json()).then((res) => {
                claimedStatus = res?.data?.isClaimed;
            });

            let ownerDetails = JSON.parse(localStorage.getItem("adminDetails"));

            if (!ownerDetails?.ownerEntityId || ownerDetails?.userId != userId) {
                let ownerDetails = {
                    userId: userId,
                }

                let adminEntitiesRequest = generalFunction.createUrl(`api/users/${userId}/admin-entities`);
                await fetch(adminEntitiesRequest.url, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        apikey: mainConfig.QUEST_API_KEY,
                        userId: userId,
                        token: token,
                    },
                }).then((res) => res.json()).then((res) => {
                    let entities = res.data;
                    if (entities.length > 0) {
                        let mainOwner = entities.filter(ele => ele.id == mainConfig.QUEST_ENTITY_ID)
                        if (mainOwner.length > 0) {
                            ownerDetails.ownerEntityId = mainOwner[0].id;
                            ownerDetails.apiKey = mainConfig.QUEST_API_KEY
                        }

                        let otherOwner = entities.filter(ele => ele.parentEntityId == mainConfig.QUEST_ENTITY_ID)
                        if (otherOwner.length > 0) {
                            ownerDetails.ownerEntityId = otherOwner[0].id;
                        }
                    }
                });

                if (!!ownerDetails?.ownerEntityId && ownerDetails?.ownerEntityId != mainConfig.QUEST_ENTITY_ID) {
                    let generateApiKeyRequest = generalFunction.createUrl(`api/entities/${ownerDetails?.ownerEntityId}/keys?userId=${userId}`);
                    await fetch(generateApiKeyRequest.url, {
                        method: "GET",
                        headers: {
                            "content-type": "application/json",
                            apikey: mainConfig.QUEST_API_KEY,
                            userId: userId,
                            token: token,
                        },
                    }).then((res) => res.json()).then((res) => {
                        ownerDetails.apiKey = res?.data?.key;
                    });
                }
                localStorage.setItem("adminDetails", JSON.stringify(ownerDetails));
            }


            if (!claimedStatus) {
                navigate("/onboarding");
            } else {
                navigate("/data_collection");
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-full">
            <QuestLogin
                googleClientId={mainConfig?.GOOGLE_CLIENT_ID}
                textColor=""
                btnTextColor=""
                backgroundColor="white"
                btnColor=""
                redirectUri={mainConfig?.GOOGLE_REDIRECT_URI}
                // redirectURL= "http://localhost:5173/login"
                google={true}
                email={true}
                onSubmit={(e) => completeLogin(e)}
                onError={(e) => Toast.error({ text: e.error })}
                googleButtonText="Continue with Google"
                descriptionText={`Welcome to ${appConfig?.QUEST_ENTITY_NAME}`}
                styleConfig={{
                    Form: {
                        boxShadow: "0px 0px 0px 0px",
                        borderRadius: "0px",
                    },
                    Heading: {
                        color: bgColors[`${theme}-color-premitive-grey-7`],
                        textAlign: "center",
                        fontFamily: "Figtree",
                        fontSize: "24px",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: "32px",
                        letterSpacing: "-0.48px",
                    },
                    Description: {
                        color: "var(--Neutral-Grey-200, #AFAFAF)",
                        textAlign: "center",
                        fontFamily: "Figtree",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "20px",
                    },
                    Label: {
                        color: bgColors[`${theme}-color-premitive-grey-8`],
                        fontFamily: "Figtree",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "16px",
                    },
                    Input: {
                        color: bgColors[`${theme}-color-premitive-grey-7`],
                        fontFamily: "Figtree",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "20px",
                        border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`,
                        height: "40px",
                    },
                    OtpInput: {
                        color: bgColors[`${theme}-color-premitive-grey-7`],
                        textAlign: "center",
                        fontFamily: "Figtree",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "20px",
                        border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`
                    },
                    IconStyle: {
                        Background: bgColors[`${theme}-primary-bg-color-0`],
                        BorderColor: bgColors[`${theme}-primary-bg-color-0`],
                    },
                    PrimaryButton:{
                        border: "none"
                    },
                    SecondaryButton: {
                        background: "transparent",
                        border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`,
                        color: bgColors[`${theme}-color-premitive-grey-8`],
                    }
                }}
                showFooter={false}
            />
        </div>
    );
}
