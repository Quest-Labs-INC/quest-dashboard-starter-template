import { QuestLogin } from '@questlabs/react-sdk';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { appConfig, mainConfig } from '../../assets/Config/appConfig';
import { generalFunction } from '../../assets/Config/GeneralFunction';

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
        <div className='w-screen h-screen flex justify-center items-center fixed top-0 left-0 bg-[rgba(0,0,0,.15)] backdrop-blur-sm z-10' onClick={clickHadnler}>
            <div id='clickbox'>
                <QuestLogin
                    googleClientId={mainConfig?.GOOGLE_CLIENT_ID}
                    textColor=""
                    btnTextColor=""
                    backgroundColor="white"
                    btnColor=""
                    redirectUri={mainConfig?.REDIRECT_URI}
                    // redirectURL= "http://localhost:5173/login"
                    google={true}
                    email={true}
                    onSubmit={(e) => completeLogin(e)}
                    // styleConfig={{
                    //     Form: {
                    //         boxShadow: `0 0 5px #2e425c`,
                    //         background: "white"
                    //     },
                    //     Heading: {
                    //         fontSize: "22px"
                    //     },
                    //     Description: {
                    //         fontSize: "14px"
                    //     },
                    //     Input: {
                    //         border: "1.5px solid #ECECEC"
                    //     }
                    // }}



                    styleConfig={{
                        Form: {
                            boxShadow: "0px 0px 0px 0px",
                            // borderRadius: "0px",
                            background: "white",
                            borderRadius: "8px"
                        },
                        Topbar: {
                            // background
                            background: 'red'
                            // background:"black"
                        },
                        Footer: {
                            // background: 'red',
                            padding: "12px 20px",
                            // color: "yellowgreen",

                            color: 'var(--Neutral- Black - 100, #939393)',
                            textAlign: "center",

                            /* Caption/400 */
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
                            // background: 'red',
                            display: "-webkit-box",
                            // - webkit - box - orient: vertical;
                            // -webkit-line-clamp: 1;
                            alignSelf: "stretch",
                            overflow: "hidden",
                            color: "var(--Neutral-Grey-700, #252525)",
                            textAlign: "center",
                            textOverflow: "ellipsis",

                            /* Title lg/600 */
                            fontFamily: "Figtree",
                            fontSize: "20px",
                            fontStyle: "normal",
                            fontWeight: "600",
                            lineHeight: "30px", /* 133.333% */
                            letterSpacing: "-0.4px",
                        },
                        Description: {
                            // fontSize: "14px",
                            alignSelf: "stretch",
                            color: "var(--Neutral-White-500, #B9B9B9)",
                            textAlign: "center",

                            /* Body md/400 */
                            fontFamily: "Figtree",
                            fontSize: "12px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "16px", /* 142.857% */
                        },
                        Label: {
                            alignSelf: "stretch",
                            color: "var(--Neutral-Black-500, #0D0D0D)",
                            /* Body sm/400 */
                            fontFamily: "Figtree",
                            fontSize: "12px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "16px", /* 133.333% */
                        },
                        Input: {
                            alignSelf: "stretch",
                            color: "var(--Neutral-White-500, #B9B9B9)",

                            /* Body md/400 */
                            fontFamily: "Figtree",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "20px", /* 142.857% */
                        },

                        OtpInput: {
                            // background: "blue",
                            color: "var(--Neutral- Grey - 300, #8E8E8E)",
                            textAlign: "center",

                            /* Body md/400 */
                            fontFamily: "Figtree",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "20px" /* 142.857% */,
                            padding: "10px 12px",
                            // border:""
                            borderRadius: "10px",
                            border: "1.5px solid var(--Neutral- Grey - 100, #ECECEC)",
                            background: 'var(--neutral- opacity - white - 80, rgba(255, 255, 255, 0.80))',

                        },
                        // IconStyle: {
                        //     background: "red",
                        //     padding: "50px"
                        // }
                        // IconStyle: {
                        //     // BorderColor: bgColors[`${theme}-primary-bg-color-0`],
                        //     Background: bgColors[`${theme}-primary-bg-color-0`],
                        //     // color: 'yellow'
                        // }
                        // bgColors[`${theme}-color-premitive-grey-5`],
                    }}
                    showFooter={true}
                />
            </div>
        </div>
    );
}

export default LoginPopUp;
