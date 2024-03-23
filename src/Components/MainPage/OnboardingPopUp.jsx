import React, { useContext, useState } from 'react';
import { appConfig, mainConfig } from '../../assets/Config/appConfig';
import { generalFunction } from '../../assets/Config/generalFunction';
import { OnBoarding } from '@questlabs/react-sdk';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../Common/AppContext';
import axios from 'axios';

const OnboardingPopUp = ({ isAdmin, setOnboardingPopup, setAdminEntity }) => {
    const [answer, setAnswer] = useState({})
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const { theme, bgColors, appConfig } = useContext(ThemeContext)
    let criteriaIds = {
        name: "ec-ff009e96-2d8f-4b66-af78-45eec34ea968", // "ec-3c5757c0-1e17-443c-913c-52744ed40b0a",
        role: "ec-63ebe09e-9192-472c-8372-c5df068993d8", // "ec-4dcce20a-4923-4c73-bb93-9cc8455c1251",
        company: "ec-b1261e2f-ff08-48e7-b8fa-e7bd4185c079", // "ec-210217e4-541c-4ab2-813c-3ebce6c49538",
        teamSize: "ec-33fa95c9-05ad-4836-9b1f-8ab57e13aae7", // "ec-a5d7c934-9ffa-494e-b40a-cf58f2b3aac0",
        reference: "ec-ff9c606d-d4a5-4489-94db-4b6f5a068e2a", // "ec-7d0a4723-183a-412e-9e3b-04a0bcb21819",
        // web3CommunityOwner : "ec-2989d07d-8c8a-460c-83cd-d6aef281d65a" : "ec-5f68c70d-dc1f-4c0b-9ee1-c4ca91cc087d", //need to change production criteria id
    }


    const completeAnswer = async (e) => {
        generalFunction.showLoader()
        let body = {
            name: answer[criteriaIds.name],
            role: answer[criteriaIds.role],
            metadata: {
                company: answer[criteriaIds.company],
                teamSize: answer[criteriaIds.teamSize],
                reference: answer[criteriaIds.reference],
                // web3CommunityOwner: answer[criteriaIds.web3CommunityOwner],
            }
        }

        let request = generalFunction.createUrl(
            `api/users/${generalFunction.getDataFromCookies("questUserId")}`
        );
        await axios.post(request.url, body, { headers: { ...request.headers, apikey: mainConfig.API_KEY } })
        generalFunction.setDataInCookies("userName", answer[criteriaIds.name]);


        // create a new entity
        if (!isAdmin) {
            let entityBody = {
                name: answer[criteriaIds.company],
                chainSource: "OFF_CHAIN"
            }
            let entityRequest = generalFunction.createUrl(
                `api/entities?userId=${generalFunction.getDataFromCookies("questUserId")}`
            );
            await axios.post(entityRequest.url, entityBody, { headers: { ...entityRequest.headers, apikey: mainConfig.API_KEY } })
                .then(async (res) => {
                    if (res.data.success) {
                        let communitySelect = res.data?.entityDoc
                        generalFunction.setDataInCookies("allEntity", [communitySelect])
                        generalFunction.setDataInCookies("adminCommunityId", communitySelect.id);
                        generalFunction.setDataInCookies("communityImageUrl", communitySelect?.imageUrl || "");
                        setAdminEntity(communitySelect.id)
                    }
                })
        }
        generalFunction.hideLoader();
        setOnboardingPopup()
    }

    const clickHadnler = (e) => {
        console.log("submit")
        if (document.getElementById("clickboxonb").contains(e.target)) {
        } else {
            setOnboardingPopup(false);
        }
    };

    return (
        <div className='w-screen h-screen flex justify-center items-center fixed top-0 left-0 bg-[rgba(0,0,0,.15)] backdrop-blur-sm z-10' onClick={clickHadnler}>
            <div className='w-full max-w-[376px] h-fit' id='clickboxonb'>
                <OnBoarding
                    questId={mainConfig?.ONBOARDING_QUEST_ID}
                    userId={generalFunction.getDataFromCookies("questUserId")}
                    token={generalFunction.getDataFromCookies("questUserToken")}
                    controlBtnType="Buttons"
                    headingScreen={[{ "name": "Share your details", "desc": "Please complete your details"}]}
                    singleChoose="modal3"
                    multiChoice="modal2"
                    answer={answer}
                    setAnswer={setAnswer}
                    inputBgColor=""
                    loadingTracker={true}
                    setLoading={setLoading}
                    getAnswers={completeAnswer}
                    nextBtnText='Submit Details'
                    styleConfig={{
                        Form: {
                            borderRadius: "10px",
                            overflow: 'hidden',
                        },
                        Topbar: {
                            padding: "20px 0",
                            gap: "4px",
                            border: 'none',
                            background: 'var(--Neutral-White-100, #FFF)',
                        },
                        Heading: {
                            color: 'var(--Neutral-Black-400, #2C2C2C)',
                            textAlign: "center",
                            textOverflow: "ellipsis",
                            fontFamily: "Figtree",
                            fontSize: "20px",
                            fontStyle: "normal",
                            fontWeight: "600",
                            lineHeight: "30px",
                            letterSpacing: "-0.4px",
                            display: "-webkit-box",
                        },
                        Description: {
                            fontSize: "14px",
                            color: "var(--Neutral-Black-100, #939393)",
                            textAlign: "center",
                            fontFamily: "Figtree",
                            fontSize: "12px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "16px",
                            margin: "auto",
                        },
                        Label: {
                            color: "var(--Neutral-Black-300, #4C4C4C)",
                            fontFamily: "Figtree",
                            fontSize: "12px",
                            fontStyle: "normal",
                            fontWeight: "500",
                            lineHeight: "16px",
                        },
                        Input: {
                            borderRadius: "10px",
                            border: "1px solid var(--Neutral-Grey-100, #ECECEC)",
                            display: "flex",
                            padding: '10px 16px',
                            alignItems: 'center',
                            flex: '1 0 0',
                            color: 'var(--Neutral-Black-400, #2C2C2C)',
                            fontFamily: "Figtree",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: "500",
                            lineHeight: "20px",
                        },
                        PrimaryButton: {
                            margin: '0',
                            fontFamily: "Figtree"
                        },
                    }}
                    showFooter={true}
                />
            </div>
        </div>
    );
}

export default OnboardingPopUp;
