import { QuestLogin, Toast } from '@questlabs/react-sdk';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { appConfig, mainConfig } from '../../assets/Config/appConfig';
import { generalFunction } from '../../assets/Config/generalFunction';

const LoginPopUp = ({ loginComplete, setLoginPopup }) => {
    const cookies = new Cookies()
    const navigate = useNavigate()

    const completeLogin = (e) => {
        const { userId, token, userCredentials } = e;
        if (userId && token) {
            generalFunction.setDataInCookies("questUserId", userId);
            generalFunction.setDataInCookies("questUserToken", token);
            generalFunction.setDataInCookies("questUserCredentials", JSON.stringify(userCredentials))
            setLoginPopup(false);
            loginComplete(userId, token);
        }
    }

    const clickHadnler = (e) => {
        if (document.getElementById("clickbox").contains(e.target)) {
        } else {
            setLoginPopup(false);
        }
    };

    return (
        <div className='w-screen h-screen flex justify-center items-center fixed top-0 left-0 bg-[rgba(13,13,13,0.20)] backdrop-blur-sm z-10' onClick={clickHadnler}>
            <div id='clickbox'>
                <QuestLogin
                    googleClientId={mainConfig?.GOOGLE_CLIENT_ID}
                    textColor=""
                    btnTextColor=""
                    backgroundColor="white"
                    btnColor=""
                    redirectUri={mainConfig?.REDIRECT_URI}
                    google={true}
                    email={true}
                    onSubmit={(e) => completeLogin(e)}
                    descriptionText='Please select a way to continue'
                    googleButtonText='Continue with Google'
                    onError={(e) => Toast.error({ text: e.error })}
                    styleConfig={{
                        Form: {
                            boxShadow: "0px 0px 0px 0px",
                            // borderRadius: "0px",
                            background: "white",
                            borderRadius: "8px"
                        },
                        Topbar: {
                            background: 'red'
                        },
                        Footer: {
                            padding: "12px 20px",
                            color: 'var(--Neutral- Black - 100, #939393)',
                            textAlign: "center",
                            fontFamily: "Figtree",
                            fontSize: "10px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "12px", /* 120% */
                            letterSpacing: "-0.1px",
                            flex: "1 0 0",
                        },

                        Heading: {
                            fontSize: "22px",
                            display: "-webkit-box",
                            alignSelf: "stretch",
                            overflow: "hidden",
                            color: "var(--Neutral-Grey-700, #252525)",
                            textAlign: "center",
                            textOverflow: "ellipsis",
                            fontFamily: "Figtree",
                            fontSize: "20px",
                            fontStyle: "normal",
                            fontWeight: "600",
                            lineHeight: "30px", /* 133.333% */
                            letterSpacing: "-0.4px",
                        },
                        Description: {
                            fontSize: "14px",
                            alignSelf: "stretch",
                            color: "var(--Neutral-White-500, #B9B9B9)",
                            textAlign: "center",
                            fontFamily: "Figtree",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "16px", /* 142.857% */
                        },
                        Label: {
                            alignSelf: "stretch",
                            color: "var(--Neutral-Black-500, #0D0D0D)",
                            fontFamily: "Figtree",
                            fontSize: "12px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "16px", /* 133.333% */
                        },
                        Input: {
                            color: "var(--Neutral-White-500, #2C2C2C)",
                            fontFamily: "Figtree",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "20px", /* 142.857% */
                        },

                        OtpInput: {
                            color: "var(--Neutral- Grey - 300, #8E8E8E)",
                            textAlign: "center",
                            fontFamily: "Figtree",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "20px" /* 142.857% */,
                            padding: "10px 12px",
                            borderRadius: "10px",
                            border: "1.5px solid var(--Neutral- Grey - 100, #ECECEC)",
                            background: 'var(--neutral- opacity - white - 80, rgba(255, 255, 255, 0.80))',
                        },
                    }}
                    showFooter={false}
                />
            </div>
        </div>
    );
}

export default LoginPopUp;
