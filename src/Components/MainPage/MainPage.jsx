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
    const gradientCSS = [`linear-gradient(to right, #C2E59C, #64B3F4)`, `linear-gradient(to right, #ED87FE, #00DBDE)`, `linear-gradient(to right, #FEAC5E, #C779D0)`];
    const [bg, setBg] = useState("");
    const [selectedBox, setSelectedBox] = useState(null);

    const { appConfig, setAppConfig, contentConfig, setContentConfig } = useContext(ThemeContext)




    const inputFileChangeHandler = (event) => {
        if (event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            setImageUrl(URL.createObjectURL(event.target.files[0]));
        }
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
            const data = apiKeyResponse.data;
            if (data.success == false) {
                let errMsg = data.error ? data.error : "Unable to Get Developer Details"
                toast.error("Error Occurred" + "\n" + errMsg);
            }
            generalFunction.setDataInCookies("apiKey", data?.data?.key)

            let request = generalFunction.createUrl(`api/entities/${adminEntity || generalFunction.getDataFromCookies("adminCommunityId")}?userId=${generalFunction.getDataFromCookies("questUserId")}`)
            let response = await axios(request.url, {
                headers: {...request.headers, apikey: data?.data?.key},
            })
            generalFunction.hideLoader()
            setName(response?.data?.data?.name);
            setImageUrl(response?.data?.data?.imageUrl);
            let apiData = response.data;
            

            setAppConfig({...appConfig, 
                BRAND_LOGO: apiData?.saasDeshboard?.dashboardConfig?.imageUrl || apiData?.imageUrl,
                QUEST_ENTITY_NAME: apiData?.name,
                QUEST_ENTITY_ID: apiData?.id,
            })
            let iconSelector = document.querySelector(".iconUrl")
            // iconSelector.setAttribute("href", "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1709407714542-90319026362-min_500x500.webp")

            setContentConfig({
                ...contentConfig,
                login: {
                    heading: apiData?.saasDeshboard?.dashboardConfig?.title,
                    description: apiData?.saasDeshboard?.dashboardConfig?.description,
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

        try {
            generalFunction.showLoader();
            let request = generalFunction.createUrl(`api/entities/${adminEntity || generalFunction.getDataFromCookies("adminCommunityId")}/quests/generate-saas?userId=${generalFunction.getDataFromCookies("questUserId")}`)
            let response = await axios.post(request.url, {
                entityName: name,
                entityDetails: description,
                imageUrl: customImage,
                colorConfig: `config-${+selectedBox + 1}`
            }, {headers: request.headers})
            if (response.success) {
                toast.success("Successfully generated")
            }
            
            generalFunction.hideLoader();

            let apiData = response.data;
            console.log(apiData)
            
            setAppConfig({...appConfig, 
                BRAND_LOGO: apiData?.saasDeshboard?.dashboardConfig?.imageUrl || apiData?.imageUrl,
                QUEST_ENTITY_NAME: apiData?.name,
                QUEST_ENTITY_ID: apiData?.id,
            })
            let iconSelector = document.querySelector(".iconUrl")
            // iconSelector.setAttribute("href", "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1709407714542-90319026362-min_500x500.webp")

            setContentConfig({
                ...contentConfig,
                login: {
                    heading: apiData?.saasDeshboard?.dashboardConfig?.title,
                    description: apiData?.saasDeshboard?.dashboardConfig?.description,
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
        if(generalFunction.getDataFromCookies("questUserId")) {
            fetchUser(generalFunction.getDataFromCookies("questUserId"), generalFunction.getDataFromCookies("questUserToken"))
        }
    }, [])


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
            <div>
                <div className={`${loginPupup ? "block" : "hidden"}`}>
                    <LoginPopUp loginComplete={(e, j) => fetchUser(e, j)} setLoginPopup={() => setLoginPopup(false)}/>
                </div>
                {onboardingPopup && <OnboardingPopUp isAdmin={isAdmin} setOnboardingPopup={() => setOnboardingPopup(false)}/>}
                {changeEntityPopup && <ChangeEntityPopup setChangeEntityPopup={() => setChangeEntityPopup(false)} setAdminEntity={(id) => setAdminEntity(id)}/>}
                {successPopup && <SuccessPopup setSuccessPopup={setSuccessPopup}/>}
                <div>
                    <div className='px-28 py-5 flex items-center justify-between'>
                        <img src={importConfig.brandLogo} className='w-20' alt="" />
                        {
                            generalFunction.getDataFromCookies("questUserId") ?
                            <div className='flex items-center gap-4'>
                                <div className='relative text-xs' onMouseLeave={() => setOpenPopup(false)}>
                                    <div className='flex items-center gap-3 py-3' onMouseEnter={() => setOpenPopup(true)} >
                                        <img src={generalFunction.getDataFromCookies("userImageUrl") != "undefined" ? generalFunction.getDataFromCookies("userImageUrl") : importConfig.main.userIconImg} className='w-6 h-6 rounded-full border' alt="" />
                                        <div className='flex items-center gap-3'>
                                            <p>{generalFunction.getDataFromCookies("userName") || "User"}</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M7.99999 8.78133L11.3 5.48133L12.2427 6.424L7.99999 10.6667L3.75732 6.424L4.69999 5.48133L7.99999 8.78133Z" fill="#8A8A8A"/>
                                            </svg>
                                        </div>
                                    </div>
                                    { openpopup &&
                                        <div className='absolute w-40 border rounded-md left-4 top-8 cursor-pointer'>
                                            <p className='cursor-pointer px-4 py-2 hover:bg-gray-100 w-full' onClick={() => setChangeEntityPopup(true)}>Change Organization</p>
                                            <p className='cursor-pointer px-4 py-2 hover:bg-gray-100 w-full'>Logout</p>
                                        </div>
                                    }
                                </div>
                                {/* <button className='px-4 py-2.5 bg-violet-700 rounded-[10px] border border-purple-300 justify-center items-center gap-1 inline-flex text-white text-sm font-semibold font-["Figtree"] leading-tight' onClick={() => setChangeEntityPopup(true)}>Change Organization</button> */}
                            </div>
                            :
                            <button className='px-4 py-2.5 bg-[radial-gradient(3361.38%_131.94%_at_0%_100%,_#6200EE_0%,_#1F3EFE_100%)] rounded-[10px] border border-purple-300 justify-center items-center gap-1 inline-flex text-white text-sm font-semibold font-["Figtree"] leading-tight' onClick={() => setLoginPopup(true)}>Login</button>
                        }
                    </div>
                </div>
                <div className='mt-32'>
                    <div className="w-full max-w-[820px] m-auto">
                        <div className="left-[190px] top-0 text-center">
                            <span className="gradient-Text text-5xl font-semibold font-['Figtree'] leading-[60px]">Create Saas</span><span className="text-[#2C2C2C] text-5xl font-semibold font-['Figtree'] leading-[60px]"> Template</span>
                        </div>
                        <div className="w-[820px] left-0 top-[72px] text-center text-[#545454] text-2xl font-normal font-['Figtree'] leading-9 mt-3">Streamline Operations, Enhance Customer Experience, and Drive Growth with AI-driven Software as a Service</div>
                    </div>
                    <section className='w-full max-w-[644px] m-auto mt-6 px-6 py-8 rounded-xl border border-[#ECECEC]'>
                        <div
                            className="w-24 h-24 flex items-center justify-center rounded-full bg-[#F4EBFF] m-auto relative"
                        >
                            {(imageUrl || customImage) && (
                                <img
                                    style={{
                                        objectFit: "cover",
                                        height: "100%",
                                        width: "100%",
                                        borderRadius: "100%"
                                    }}
                                    src={imageUrl || customImage}
                                    alt=""
                                />
                            )}
                            <div
                                className={`q-input-container ${imageUrl ? "opacity-0" : "opacity-100"}`}
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
                        <form action="" className='mt-8'>
                            <div>
                                <p className="text-neutral-600 text-xs font-medium font-['Figtree'] leading-none">
                                    {" "}
                                    Enter Organization Name*{" "}
                                </p>
                                <input
                                    className="px-4 py-2.5 border border-[#ECECEC] rounded-[10px] mt-1.5 w-full"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    placeholder="eg. Quest Labs"
                                    type="text"
                                    name="name"
                                    required="required"
                                />
                            </div>

                            <div className="mt-8">
                                <p className="text-neutral-600 text-xs font-medium font-['Figtree'] leading-none">
                                    {" "}
                                    Enter Organization Description*{" "}
                                </p>
                                <textarea
                                    className="px-4 py-2.5 rounded-[10px] mt-1.5 w-full min-h-[64px]"
                                    style={{ resize: "vertical", border: "1px solid #ECECEC" }}
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                    placeholder="eg. Write your description here..."
                                    type="text"
                                    name="description"
                                    required="required"
                                />
                            </div>
                        </form>
                        <div className='mt-8'>
                            <p className="text-neutral-600 text-xs font-medium font-['Figtree'] leading-none">Choose Theme</p>
                            <div className="flex gap-4 mt-1.5">
                                {gradientCSS.map((gradient, index) => (
                                    <div
                                        key={index}
                                        style={{ background: `${gradient}`, borderRadius: "5px", border: selectedBox === index ? "3px solid var(--color-premitive-grey-5)" : "none" }}
                                        className="w-10 h-10"
                                        onClick={() => {
                                            setBg(`${gradient}`);
                                            setSelectedBox(index);
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                        <button className="mt-8 w-full px-4 py-2.5 bg-[radial-gradient(3361.38%_131.94%_at_0%_100%,_#6200EE_0%,_#1F3EFE_100%)] rounded-[10px] text-white text-sm font-semibold font-['Figtree']" onClick={() => createTemplate()}>
                            Create AI Template
                        </button>
                    </section>
                    <div className="px-[120px] py-20 flex-col justify-start items-start gap-[17px] inline-flex w-full">
                        <div className='w-full border-b border-[#4B4B4B]'></div>
                        <div className="justify-between items-start inline-flex w-full">
                            <div className="text-[#4C4C4C] text-lg font-normal font-['Hanken Grotesk'] leading-7">Copyright © 2023 AI Saas Template</div>
                            <div className="justify-start items-start gap-[47px] flex">
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