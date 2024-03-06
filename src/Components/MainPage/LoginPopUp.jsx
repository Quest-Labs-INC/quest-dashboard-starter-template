import { QuestLogin } from '@questlabs/react-sdk';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { appConfig, mainConfig } from '../../assets/Config/appConfig';
import { generalFunction } from '../../assets/Config/GeneralFunction';

const LoginPopUp = ({loginComplete, setLoginPopup}) => {
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
                    styleConfig={{
                        Form: {
                            boxShadow: `0 0 5px #2e425c`,
                            background: "white"
                        },
                        Heading: {
                            fontSize: "22px"
                        },
                        Description: {
                            fontSize: "14px"
                        },
                        Input: {
                            border: "1.5px solid #ECECEC"
                        }
                    }}
                    showFooter={false}
                />
            </div>
        </div>
    );
}

export default LoginPopUp;
