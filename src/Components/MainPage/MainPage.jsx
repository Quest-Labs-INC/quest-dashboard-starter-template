import React, { useContext, useEffect, useState } from 'react'
import { importConfig } from '../../assets/Config/importConfig';
import { generalFunction } from '../../assets/Config/GeneralFunction';
import toast from 'react-hot-toast';
import { mainConfig } from '../../assets/Config/appConfig';
import axios from 'axios';
import LoginPopUp from './LoginPopUp';
import OnboardingPopUp from './OnboardingPopUp';
import Cookies from 'universal-cookie';
import { QuestProvider } from '@questlabs/react-sdk';
import ChangeEntityPopup from './ChangeEntityPopup';
import SuccessPopup from './SuccessPopup';
import { ThemeContext } from '../Common/appContext';
import './MainPage.css'

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
        console.log(event.target.files[0])
        console.log(URL.createObjectURL(event.target.files[0]));
        console.log(imageUrl)
        console.log(customImage)
        if (event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            setImageUrl(URL.createObjectURL(event.target.files[0]));
        }
        console.log(imageUrl)
        console.log(customImage)
    };

    useEffect(() => {
        if (selectedFile) {
            generalFunction
                .uploadImageToBackend(selectedFile)
                .then((imageResponse) => {
                    if (imageResponse == null || !imageResponse?.data || imageResponse?.data.success == false || !imageResponse?.data?.imageUrl) {
                        setSelectedFile(null);
                        imageResponse != null && toast.error("Unable to upload image");
                        return;
                    } else {
                        setImageUrl(null)
                        setCustomImage(imageResponse?.data.imageUrl)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    setSelectedFile(null);
                    toast.error("Unable to upload image.");
                });
        }
    }, [selectedFile]);

    const fetchTheImage = async () => {
        try {
            generalFunction.showLoader();
            let apiKeyRequest = generalFunction.createUrl(`api/entities/${generalFunction.getDataFromCookies("adminCommunityId")}/keys?userId=${generalFunction.getDataFromCookies("questUserId")}`);
            let apiKeyResponse = await axios.get(apiKeyRequest.url, { headers: apiKeyRequest.headers })
            console.log(apiKeyResponse)
            const data = apiKeyResponse.data;
            console.log(data)
            if (data.success == false) {
                let errMsg = data.error ? data.error : "Unable to Get Developer Details"
                toast.error("Error Occurred" + "\n" + errMsg);
            }
            generalFunction.setDataInCookies("apiKey", data?.data?.key)

            let request = generalFunction.createUrl(`api/entities/${adminEntity || generalFunction.getDataFromCookies("adminCommunityId")}?userId=${generalFunction.getDataFromCookies("questUserId")}`)
            let response = await axios(request.url, {
                headers: { ...request.headers, apikey: data?.data?.key },
            })
            console.log(response)
            generalFunction.hideLoader()
            // setName(response?.data?.data?.name);
            setImageUrl(response?.data?.data?.imageUrl);
            let apiData = response.data;
            setEntityDetails(apiData)


            setAppConfig({
                ...appConfig,
                BRAND_LOGO: apiData?.saasDashboard?.dashboardConfig?.imageUrl || apiData?.imageUrl,
                QUEST_ENTITY_NAME: apiData?.name,
                QUEST_ENTITY_ID: apiData?.id,
            })
            let iconSelector = document.querySelector(".iconUrl")
            // iconSelector.setAttribute("href", "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1709407714542-90319026362-min_500x500.webp")

            setContentConfig({
                ...contentConfig,
                login: {
                    heading: apiData?.saasDashboard?.dashboardConfig?.title,
                    description: apiData?.saasDashboard?.dashboardConfig?.description,
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (adminEntity || generalFunction.getDataFromCookies("adminCommunityId")) {
            fetchTheImage();
        }
    }, [adminEntity])

    const createTemplate = async () => {
        if (!generalFunction.getDataFromCookies("questUserId")) {
            setLoginPopup(true);
            return;
        } else if (!generalFunction.getDataFromCookies("userName") || !generalFunction.getDataFromCookies("adminCommunityId")) {
            setOnboardingPopup(true);
            return;
        }

        if (!name && !description && !imageUrl && !bg) {
            toast.error("Please fill the required information");
            return;
        }

        try {
            generalFunction.showLoader();
            let request = generalFunction.createUrl(`api/entities/${adminEntity || generalFunction.getDataFromCookies("adminCommunityId")}/quests/generate-saas?userId=${generalFunction.getDataFromCookies("questUserId")}`);

            console.log("name", name)
            console.log("description", description)
            console.log("customImage", customImage)
            console.log("colorConfig", bg)

            let response = await axios.post(request.url, {
                entityName: name,
                entityDetails: description,
                imageUrl: customImage,
                colorConfig: bg,
            }, { headers: request.headers })
            if (response.success) {
                toast.success("Successfully generated")
            }

            generalFunction.hideLoader();

            let apiData = response.data;

            setEntityDetails(apiData)
            setAppConfig({
                ...appConfig,
                BRAND_LOGO: apiData?.saasDashboard?.dashboardConfig?.imageUrl || apiData?.imageUrl,
                QUEST_ENTITY_NAME: apiData?.name,
                QUEST_ENTITY_ID: apiData?.id,
            })
            let iconSelector = document.querySelector(".iconUrl")
            // iconSelector.setAttribute("href", "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1709407714542-90319026362-min_500x500.webp")

            setContentConfig({
                ...contentConfig,
                login: {
                    heading: apiData?.saasDashboard?.dashboardConfig?.title,
                    description: apiData?.saasDashboard?.dashboardConfig?.description,
                }
            })

            setSuccessPopup(true);

            toast.success("Template successfully created")
        } catch (error) {
            console.log(error);
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
                    if (res.isAdmin) {
                        setIsAdmin(res.isAdmin);
                        let adminEntities = await generalFunction.fetchCommunities(headers?.userId)
                        if (adminEntities.data.length >= 1) {
                            generalFunction.setDataInCookies("allEntity", adminEntities.data)
                            let communitySelect = adminEntities.data[0]
                            setAdminEntity(communitySelect.id)
                            generalFunction.setDataInCookies("adminCommunityId", communitySelect.id);
                            generalFunction.setDataInCookies("communityImageUrl", communitySelect?.imageUrl || "");
                        }
                    }
                    if (!res?.data?.name || res?.data?.name == "" || !res.isAdmin) {
                        setOnboardingPopup(true)
                    } else {
                        generalFunction.setDataInCookies("userName", res?.data?.name);
                        generalFunction.setDataInCookies("userImageUrl", res?.data?.imageUrl);
                    }
                }
            })
    }

    useEffect(() => {
        if (generalFunction.getDataFromCookies("questUserId")) {
            fetchUser(generalFunction.getDataFromCookies("questUserId"), generalFunction.getDataFromCookies("questUserToken"))
        }
    }, [])

    useEffect(() => {
        console.log("ima", imageUrl);
        console.log("cus", customImage);
    }, [imageUrl, customImage]);
    return (
        <QuestProvider
            apiKey={mainConfig?.API_KEY}
            entityId={mainConfig?.ENTITY_ID}
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
                    onboardingPopup && <OnboardingPopUp isAdmin={isAdmin} setOnboardingPopup={() => setOnboardingPopup(false)} setAdminEntity={(id) => setAdminEntity(id)} />
                }
                {/* complteed til here  */}


                {
                    changeEntityPopup && <ChangeEntityPopup setChangeEntityPopup={() => setChangeEntityPopup(false)} setAdminEntity={(id) => setAdminEntity(id)} />
                }

                {successPopup && <SuccessPopup setSuccessPopup={setSuccessPopup} />}


                <div className='create-page-header'>
                    <div className='create-page-header-cont'>
                        {/* header imgae */}
                        <img src={importConfig.brandLogo} className='w-20' alt="" />
                        {/* header login  */}
                        {
                            generalFunction.getDataFromCookies("questUserId") ?
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
                                                <p className='cursor-pointer px-4 py-2 hover:bg-gray-100 w-full' onClick={() => setChangeEntityPopup(true)}>Change Organization</p>
                                                <p className='cursor-pointer px-4 py-2 hover:bg-gray-100 w-full' onClick={() => window.open("https://questlabs.ai/")}>Admin</p>
                                                <p className='cursor-pointer px-4 py-2 hover:bg-gray-100 w-full' onClick={() => generalFunction.mainLogout()}>Logout</p>
                                            </div>
                                        }
                                    </div>
                                    {/* <button className='px-4 py-2.5 bg-violet-700 rounded-[10px] border border-purple-300 justify-center items-center gap-1 inline-flex text-white text-sm font-semibold font-["Figtree"] leading-tight' onClick={() => setChangeEntityPopup(true)}>Change Organization</button> */}
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
                            <div className="description w-[820px] left-0 top-[72px] text-center text-[#545454] text-2xl font-normal font-['Figtree'] leading-9">Let's launch 10x faster! Just make a wish and in a few seconds we will help generate the entire base dashboard for you with Login, Onboarding, Get Started, Feedback Collection, Surveys, Referrals, Search Bar Settings and more..</div>
                        </div>

                        {/* input section  */}

                        <section className='create-saas-page-input w-full m-auto px-6 py-8 rounded-xl border border-[#ECECEC] gap-[32px]'>
                            <div
                                className="w-24 h-24 flex items-center justify-center rounded-full bg-[#F4EBFF] m-auto relative"
                            >
                                {
                                    (imageUrl || customImage) && (
                                        <img
                                            style={{
                                                objectFit: "cover",
                                                height: "100%",
                                                width: "100%",
                                                borderRadius: "100%"
                                            }}
                                            src={imageUrl || customImage}
                                            // src={imageUrl}
                                            alt=""
                                        />
                                    )
                                }
                                <div
                                    className={`q-input-container ${(imageUrl || customImage) ? "opacity-0" : "opacity-100"}`}
                                >
                                    <label className="cursor-pointer" htmlFor='profile-img'>
                                        <img
                                            className="w-10 absolute top-7 left-7"
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


                            <form action="" className='create-saas-page-form'>
                                {/* for organiztion */}
                                <div>
                                    <p className="">
                                        {" "}
                                        What is the name of your platform?*{" "}
                                    </p>
                                    <input
                                        // className="px-4 py-2.5 border border-[#ECECEC] rounded-[10px] mt-1.5 w-full"
                                        className=""
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
                                        What will be your platform about? Give as much details as possible, will be helpful to our AI.*{" "}
                                    </p>
                                    <textarea
                                        // className="px-4 py-2.5 rounded-[10px] mt-1.5 w-full min-h-[64px]"
                                        className=""
                                        style={{ resize: "vertical", border: "1px solid #ECECEC" }}
                                        onChange={(e) => setDescription(e.target.value)}
                                        value={description}
                                        placeholder="eg. Write your description here..."
                                        type="text"
                                        name="description"
                                        required="required"
                                        rows={5}
                                    />
                                    <p className='char-count-para'>0/120 characters</p>
                                </div>
                            </form>

                            {/* <div className='mt-8'> */}
                            <div className='theme-colors-cont'>

                                <p className="">Choose Theme</p>

                                <div className="flex gap-4 mt-1.5">
                                    {gradientCSS.map((gradient, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                background: `${gradient}`, borderRadius: "5px",
                                                border: selectedBox === index ? "3px solid var(--color-premitive-grey-5)" : "none",
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
                                {entityDetails?.saasDashboard ? "Update AI Template" : "Generate"}
                            </button>
                        </section>

                    </div>
                </div>

                {/* footer copyright  */}
                <div className='create-page-footer'>
                    <div>
                        <div className='w-full border-b border-[#4B4B4B]'></div>
                        <div className="footer-text-cont ">

                            <div className="copyright-text">Copyright © 2023 AI Saas Template</div>

                            <div className="terns-privacy-cont">
                                <div className="text-[#4C4C4C] text-lg font-normal font-['Hanken Grotesk'] leading-7">Terms of service  </div>
                                <div className="text-[#4C4C4C] text-lg font-normal font-['Hanken Grotesk'] leading-7">Privacy Policy</div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </QuestProvider>
    )
}

export default MainPage;