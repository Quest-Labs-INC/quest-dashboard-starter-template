import React, { useContext, useEffect, useState } from 'react'
import { importConfig } from '../../assets/Config/importConfig';
import { generalFunction } from '../../assets/Config/generalFunction';
import { mainConfig } from '../../assets/Config/appConfig';
import axios from 'axios';
import LoginPopUp from './LoginPopUp';
import OnboardingPopUp from './OnboardingPopUp';
import Cookies from 'universal-cookie';
import { QuestProvider, Toast } from '@questlabs/react-sdk';
import ChangeEntityPopup from './ChangeEntityPopup';
import SuccessPopup from './SuccessPopup';
import { ThemeContext } from '../Common/AppContext';
import './MainPage.css'
import CreateSuccessPopUp from './CreateSuccessPopUp';
import watch from '../../assets/Images/watch.svg'
function MainPage() {
    const cookies = new Cookies()
    const [isAdmin, setIsAdmin] = useState(false);
    const [loginPupup, setLoginPopup] = useState(false);
    const [onboardingPopup, setOnboardingPopup] = useState(false);
    const [changeEntityPopup, setChangeEntityPopup] = useState(false);
    const [successPopup, setSuccessPopup] = useState(false);
    const [openpopup, setOpenPopup] = useState(false);
    const [adminEntity, setAdminEntity] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [customImage, setCustomImage] = useState("")
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [createSuccessPopUp, setCreateSuccessPopUp] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);


    const gradientCSS2 = [
        `linear-gradient(147deg, #FC5C7D 0%, #6A82FB 90.03%)`,
        `linear-gradient(147deg, #00F260 0%, #0575E6 90.03%)`,
        `linear-gradient(147deg, #11998E 0%, #38EF7D 90.03%)`,
        `linear-gradient(146deg, #D88EFD 7.78%, #75B2ED 56.47%, #26CDE7 91.93%)`
    ];
    const gradientCSS = [
        `radial-gradient(3361.38% 131.94% at 0% 100%, #6200EE 0%, #1F3EFE 100%)`,
        `linear-gradient(146deg, #D88EFD 7.78%, #75B2ED 56.47%, #26CDE7 91.93%)`,
        `linear-gradient(147deg, #11998E 0%, #38EF7D 90.03%)`,
        `linear-gradient(147deg, #00F260 0%, #0575E6 90.03%)`,
        `linear-gradient(147deg, #F8AD63 0%, #CE7EC3 90.03%)`,
        `linear-gradient(147deg, #3E5151 0%, #DECBA4 90.03%)`,
        `linear-gradient(147deg, #FC5C7D 0%, #6A82FB 90.03%)`,
        `linear-gradient(147deg, #23074D 0%, #CC5333 90.03%)`
    ];

    const [bg, setBg] = useState("");
    const [selectedBox, setSelectedBox] = useState(null);
    const [entityDetails, setEntityDetails] = useState(null);

    const { appConfig, setAppConfig, contentConfig, setContentConfig } = useContext(ThemeContext)

    const inputFileChangeHandler = (event) => {
        if (event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            setImageUrl(URL.createObjectURL(event.target.files[0]));
        }
    };

    const UploadImage = async () => {
        if (selectedFile) {
            try {
                const imageResponse = await generalFunction.uploadImageToBackend(selectedFile);
                if (imageResponse?.data?.success && imageResponse?.data?.imageUrl) {
                    // Update state with the uploaded image URL
                    setCustomImage(imageResponse.data.imageUrl);
                    return imageResponse.data.imageUrl;
                } else {
                    setSelectedFile(null);
                    Toast.error({ text: "Unable to upload image" });
                    return null; // Return null or any other indicator of failure
                }
            } catch (error) {
                console.log(error);
                setSelectedFile(null);
                Toast.error({ text: "Unable to upload image." });
                return null; // Return null or any other indicator of failure
            }
        }
        return null;
    };


    const fetchTheImage = async (createdEntityId) => {
        try {
            // generalFunction.showLoader();
            let apiKeyRequest = generalFunction.createUrl(`api/entities/${createdEntityId}/keys?userId=${generalFunction.getDataFromCookies("questUserId")}`);
            let apiKeyResponse = await axios.get(apiKeyRequest.url, { headers: apiKeyRequest.headers })
            const data = apiKeyResponse.data;
            if (data.success == false) {
                let errMsg = data.error ? data.error : "Unable to Get Developer Details"
                Toast.error({ text: "Error Occurred" + "\n" + errMsg });
            }
            generalFunction.setDataInCookies("apiKey", data?.data?.key)
            localStorage.setItem("apiKey", data?.data?.key)

            // generalFunction.hideLoader()
        } catch (error) {
            console.log(error);
        }
    }


    const createTemplate = async () => {
        if (!generalFunction.getDataFromCookies("questUserId")) {
            setLoginPopup(true);
            return;
        } else if (!generalFunction.getDataFromCookies("userName") || !generalFunction.getDataFromCookies("adminCommunityId")) {
            // setOnboardingPopup(true);
            // return;
        }

        if (!name || !description || !imageUrl || !bg) {
            Toast.error({ text: "Please fill all the information including the logo" });
            return;
        }

        generalFunction.showLoader();

        const uploadedImageUrl = await UploadImage();

        let entityBody = {
            name: name,
            chainSource: "OFF_CHAIN",
            imageUrl: uploadedImageUrl
        }

        let entityRequest = generalFunction.createUrl(
            `api/entities?userId=${generalFunction.getDataFromCookies("questUserId")}`
        );

        let createdEntityId;

        await axios.post(entityRequest.url, entityBody, { headers: { ...entityRequest.headers, apikey: mainConfig.API_KEY } })
            .then(async (res) => {
                if (res.data.success) {
                    let communitySelect = res.data?.entityDoc
                    generalFunction.setDataInCookies("allEntity", [communitySelect])
                    generalFunction.setDataInCookies("adminCommunityId", communitySelect.id);
                    generalFunction.setDataInCookies("communityImageUrl", communitySelect?.imageUrl || "");
                    localStorage.setItem("adminCommunityId", communitySelect.id);
                    setAdminEntity(communitySelect.id)
                    createdEntityId = communitySelect.id;
                }
            })

        await fetchTheImage(createdEntityId);


        try {
            // let request = generalFunction.createUrl(`api/entities/${createdEntityId}/quests/generate-saas?userId=${generalFunction.getDataFromCookies("questUserId")}`);

            console.log(generalFunction.getDataFromCookies("questUserId"))
            let request = generalFunction.createUrl(`api/v2/entities/${createdEntityId}/campaigns/generate-saas?userId=${generalFunction.getDataFromCookies("questUserId")}`);
            // console.log(request)
            console.log(request.headers)
            // /api/v2/entities/:entityId/campaigns/generate-saas
            let response = await axios.post(request.url, {
                entityName: name,
                entityDetails: description,
                imageUrl: customImage || uploadedImageUrl,
                colorConfig: bg,
            }, { headers: request.headers })
            if (response.success) {
                Toast.success({ text: "Successfully generated" })
            }

            generalFunction.hideLoader();

            let apiData = response.data.data;
            setEntityDetails(apiData)
            setAppConfig({
                ...appConfig,
                BRAND_LOGO: apiData?.saasDashboard?.dashboardConfig?.imageUrl || apiData?.imageUrl,
                QUEST_ENTITY_NAME: apiData?.name,
                QUEST_ENTITY_ID: apiData?.id,
            })

            localStorage.setItem("themeColor", apiData?.saasDashboard?.dashboardConfig?.colorConfig)
            localStorage.setItem("brandlogo", apiData?.saasDashboard?.dashboardConfig?.imageUrl || apiData?.imageUrl)
            localStorage.setItem("entityName", apiData?.saasDashboard?.dashboardConfig?.name)
            localStorage.setItem("heading", apiData?.saasDashboard?.dashboardConfig?.title)
            localStorage.setItem("description", apiData?.saasDashboard?.dashboardConfig?.description)

            setContentConfig({
                ...contentConfig,
                login: {
                    heading: apiData?.saasDashboard?.dashboardConfig?.title,
                    description: apiData?.saasDashboard?.dashboardConfig?.description,
                }
            })

            setSuccessPopup(true);

            Toast.success({ text: "Template successfully created" })
        } catch (error) {
            console.log(error);
        } finally {
            generalFunction.hideLoader();
        }
    }

    const fetchUser = (userId, token) => {
        const userDataUrl = generalFunction.createUrl(
            `api/users/${userId}`
        );
        generalFunction.showLoader();
        let headers = { ...userDataUrl.headers, ...{ userId: userId, token: token, apikey: mainConfig?.API_KEY } }
        axios(userDataUrl.url, { headers })
            .then(async (e) => {
                generalFunction.hideLoader();
                let res = e.data;
                if (res.success == true) {
                    setLoggedIn(true);
                    // if (res.isAdmin) {
                    //     setIsAdmin(res.isAdmin);
                    //     let adminEntities = await generalFunction.fetchCommunities(headers?.userId)
                    //     if (adminEntities.data.length >= 1) {
                    //         generalFunction.setDataInCookies("allEntity", adminEntities.data)
                    //         let communitySelect = adminEntities.data[0]
                    //         setAdminEntity(communitySelect.id)
                    //         generalFunction.setDataInCookies("adminCommunityId", communitySelect.id);
                    //         generalFunction.setDataInCookies("communityImageUrl", communitySelect?.imageUrl || "");
                    //         localStorage.setItem("adminCommunityId", communitySelect.id);
                    //         localStorage.setItem("communityImageUrl", communitySelect?.imageUrl || "");
                    //     }
                    // }
                    if (!res?.data?.name || res?.data?.name == "") {
                        setOnboardingPopup(true)
                    } else {
                        generalFunction.setDataInCookies("userName", res?.data?.name);
                        generalFunction.setDataInCookies("userImageUrl", res?.data?.imageUrl);
                        localStorage.setItem("userName", res?.data?.name);
                        localStorage.setItem("userImageUrl", res?.data?.imageUrl);
                    }
                }
            })
    }

    useEffect(() => {
        if (generalFunction.getDataFromCookies("questUserId")) {
            fetchUser(generalFunction.getDataFromCookies("questUserId"), generalFunction.getDataFromCookies("questUserToken"))
        }
    }, [])

    return (
        <QuestProvider
            apiKey={mainConfig?.API_KEY}
            entityId={mainConfig?.ENTITY_ID}
            // apiType='PRODUCTION'
            apiType='STAGING'
            themeConfig={{
                // buttonColor: bgColors[`${theme}-primary-bg-color-0`],
                // primaryColor: bgColors[`${theme}-color-premitive-grey-5`],
                // backgroundColor: "transparent",
            }}
        >
            <div className='create-page'>
                <div className={`${loginPupup ? "block" : "hidden"}`}>
                    <LoginPopUp loginComplete={(e, j) => fetchUser(e, j)} setLoginPopup={() => setLoginPopup(false)} />
                </div>

                {
                    onboardingPopup && <OnboardingPopUp isAdmin={isAdmin}
                        setOnboardingPopup={() => {
                            setOnboardingPopup(false)
                            setCreateSuccessPopUp(true);

                        }} setAdminEntity={(id) => setAdminEntity(id)} />
                }


                {
                    changeEntityPopup && <ChangeEntityPopup setChangeEntityPopup={() => setChangeEntityPopup(false)} setAdminEntity={(id) => setAdminEntity(id)} />
                }

                {successPopup && <SuccessPopup setSuccessPopup={setSuccessPopup} />}

                {createSuccessPopUp && <CreateSuccessPopUp setCreateSuccessPopUp={setCreateSuccessPopUp} />}


                <div className='create-page-header'>
                    <div className='create-page-header-cont'>
                        {/* header imgae */}
                        <img src={importConfig.brandLogo} className='w-20' alt="" />
                        {/* header login  */}
                        {
                            (loggedIn || generalFunction.getDataFromCookies("questUserId")) ?
                                <div className='flex items-center gap-4'>
                                    <div className='relative text-xs' onMouseLeave={() => setOpenPopup(false)}>
                                        <div className='flex items-center gap-3 py-3' onMouseEnter={() => setOpenPopup(true)} >
                                            <img src={generalFunction.getDataFromCookies("userImageUrl") != "undefined" ? generalFunction.getDataFromCookies("userImageUrl") : importConfig.main.userIconImg} className='w-6 h-6 rounded-full border' alt="" />
                                            <div className='flex items-center gap-3'>
                                                <p>{generalFunction.getDataFromCookies("userName") || "User"}</p>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M7.99999 8.78133L11.3 5.48133L12.2427 6.424L7.99999 10.6667L3.75732 6.424L4.69999 5.48133L7.99999 8.78133Z" fill="#8A8A8A" />
                                                </svg>
                                            </div>
                                        </div>
                                        {openpopup &&
                                            <div className='absolute w-40 border rounded-md left-4 top-8 cursor-pointer'>
                                                <p className='cursor-pointer px-4 py-2 hover:bg-gray-100 w-full rounded-t-md' onClick={() => window.open(`${mainConfig.QUEST_LABS_URL}/admin`, "_blank")}>Admin</p>
                                                <p className='cursor-pointer px-4 py-2 hover:bg-gray-100 w-full rounded-b-md' onClick={() => { generalFunction.mainLogout(); setLoggedIn(false) }}>Logout</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                                :
                                <button className='px-4 py-2.5 bg-[radial-gradient(3361.38%_131.94%_at_0%_100%,_#6200EE_0%,_#1F3EFE_100%)] rounded-[10px] border border-purple-300 justify-center items-center gap-1 inline-flex text-white text-sm font-semibold font-["Figtree"] leading-tight' onClick={() => setLoginPopup(true)}>
                                    <p>Login</p>
                                </button>
                        }
                    </div>
                </div>

                <div className='create-page-text-input'>
                    <div className='text-input-cont'>

                        {/* text  */}
                        <div className="create-sass-temp-text ">
                            <div className="create-saas-temp">
                                <div>Experience</div>
                                <p>the magic</p>
                            </div>
                            <div className="description w-[676px] left-0 top-[72px] text-center text-[#545454] text-lg font-normal font-['Figtree'] leading-9">Make a wish, and we will create your Saas dashboard starter within seconds with Login, Onboarding, Feedback, Surveys, Referrals, Search bar and much more.</div>
                        </div>

                        <div className='flex items-center justify-center gap-2' onClick={() => window.open("https://www.loom.com/share/c286b044781c4307a3c26f89bb999af0", "_blank")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M9 1.5C4.875 1.5 1.5 4.875 1.5 9C1.5 13.125 4.875 16.5 9 16.5C13.125 16.5 16.5 13.125 16.5 9C16.5 4.875 13.125 1.5 9 1.5Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9 12L9 8.25" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9.00391 6L8.99717 6" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <p className='cursor-pointer font-semibold'>Learn How It Works</p>
                        </div>

                        {/* input section  */}

                        <section className='create-saas-page-input w-full m-auto px-6 py-8 rounded-xl border border-[#ECECEC] gap-[32px]'>
                            <div
                                className="w-24 h-24 flex items-center overflow-hidden justify-center rounded-full bg-[#F4EBFF] m-auto relative"
                            >
                                {
                                    (imageUrl || customImage) && (
                                        <img
                                            style={{
                                                objectFit: "cover",
                                                height: "96px",
                                                width: "96px",
                                                borderRadius: "100%"
                                            }}
                                            src={imageUrl || customImage}
                                            // src={imageUrl}
                                            alt=""
                                        />
                                    )
                                }
                                <div
                                    className={`q-input-container ${(imageUrl || customImage) ? "opacity-0" : "opacity-100"} h-full`}
                                >
                                    <label className="cursor-pointer w-full h-full" htmlFor='profile-img'>
                                        <img
                                            className="w-24 h-24 p-7 absolute left-0 top-0"
                                            src={importConfig.main.upload}
                                            alt=""
                                        />
                                    </label>
                                    <input
                                        onChange={inputFileChangeHandler}
                                        id="profile-img"
                                        type="file"
                                        accept="image/*"
                                        className='hidden'
                                    />
                                </div>
                            </div>
                            <p className='text-[#2C2C2C] -mt-4 text-sm font-medium font-["Figtree"] leading-tight'>Upload Logo*</p>


                            <form action="" className='create-saas-page-form'>
                                {/* for organiztion */}
                                <div>
                                    <p className="">
                                        {" "}
                                        What is the name of your platform?*{" "}
                                    </p>
                                    <input
                                        // className="px-4 py-2.5 border border-[#ECECEC] rounded-[10px] mt-1.5 w-full"
                                        className="outline-none"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        placeholder="eg. Quest Labs"
                                        type="text"
                                        name="name"
                                        required="required"

                                    />
                                </div>

                                {/* for descrtion */}
                                <div className="">

                                    <p className="">
                                        {" "}
                                        Provide detailed platform information to assist our AI effectively.*{" "}
                                    </p>
                                    <textarea
                                        // className="px-4 py-2.5 rounded-[10px] mt-1.5 w-full min-h-[64px]"
                                        className="text-sm"
                                        style={{ resize: "vertical", border: "1px solid #ECECEC" }}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 1000) {
                                                setDescription(e.target.value)
                                            }

                                        }}
                                        value={description}
                                        placeholder="eg. Write your description here..."
                                        type="text"
                                        name="description"
                                        required="required"
                                        rows={5}

                                    />
                                    <p className='char-count-para'>{description.length}/1000 characters</p>
                                </div>
                            </form>

                            {/* <div className='mt-8'> */}
                            <div className='theme-colors-cont'>

                                <p className="">Choose Theme*</p>

                                <div className="flex gap-4 mt-1.5">
                                    {gradientCSS.map((gradient, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                background: `${gradient}`, borderRadius: "5px",
                                                border: selectedBox === index ? "3px solid #4C4C4C" : "none",
                                                cursor: 'pointer'
                                            }}
                                            // className="w-10 h-10"
                                            className="theme-color-box"
                                            onClick={() => {
                                                setBg(`${gradient}`);
                                                setSelectedBox(index);
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            </div>

                            <button className="w-full px-4 py-2.5 bg-[radial-gradient(3361.38%_131.94%_at_0%_100%,_#6200EE_0%,_#1F3EFE_100%)] rounded-[10px] text-white text-sm font-semibold font-['Figtree']" onClick={() => createTemplate()}>
                                {entityDetails?.saasDashboard ? "Update" : "Generate"}
                            </button>
                        </section>

                    </div>
                </div>

                {/* footer copyright  */}
                <div className='create-page-footer'>
                    <div>
                        <div className='w-full border-b border-[#4B4B4B]'></div>
                        <div className="footer-text-cont ">

                            <div className="copyright-text">Copyright © 2024 AI Saas GPT</div>

                            <div className="terns-privacy-cont">
                                <div className="text-[#4C4C4C] text-lg font-normal font-['Hanken Grotesk'] leading-7" onClick={() => window.open("https://crimson-chord-1b6.notion.site/Terms-and-Conditions-a0ab54d1a42a47f6bac1773dea9fdc9c", "_blank")}>Terms of service  </div>
                                <div className="text-[#4C4C4C] text-lg font-normal font-['Hanken Grotesk'] leading-7" onClick={() => window.open("https://crimson-chord-1b6.notion.site/Privacy-Policy-for-SAAS-GPT-5f2132e3d1bc47f7bb5c04a5180190bf", "_blank")}>Privacy Policy</div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </QuestProvider>
    )
}

export default MainPage;