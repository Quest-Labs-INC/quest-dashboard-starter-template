import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../Common/AppContext";
import InputComponent from "../Common/CommonComponents/InputComponent";
import { importConfig } from "../../assets/Config/importConfig";
import { uploadImageToBackend } from "../../utils/UploadImage";
import { generalFunction } from "../../assets/Config/generalFunction";
import { mainConfig } from "../../assets/Config/appConfig";
import { UserProfile } from "@questlabs/react-sdk";
import { uploadSVG } from "../../assets/Images/svgAssets";

const EditProfile = () => {
    const { theme, bgColors, appConfig } = useContext(ThemeContext);
    const [section, setSection] = useState("edit");
    const [adminData, setAdminData] = useState([]);
    const [search, setSearch] = useState("");
    const [name, setName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [about, setAbout] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [customImage, setCustomImage] = useState("");
    const [descLen, setDesclen] = useState(0);
    const [answer, setAnswer] = useState({});
    const [loading, setLoading] = useState(true);
    const headers = {
        apikey: appConfig.QUEST_API_KEY,
        userid: generalFunction.getDataFromCookies("questUserId"),
        token: generalFunction.getDataFromCookies("questUserToken"),
    };

    useEffect(() => {
        generalFunction.showLoader();
        const getuser = async () => {
            setTimeout(() => {
                generalFunction.hideLoader();
            }, 5000);
            let request = generalFunction.createUrl(`api/users/${headers.userid}`)
            const { data } = await axios.get(
                request.url,
                { headers: request.headers }
            );
            setName(data.data.name);
            setJobTitle(data.data.role);
            setAbout(data.data.about);
            setImageUrl(data.data.imageUrl);
            generalFunction.hideLoader();
        };
        getuser();
    }, []);

    const inputFileChangeHandler = (event) => {
        if (event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            setImageUrl(URL.createObjectURL(event.target.files[0]));
            setCustomImage(URL.createObjectURL(event.target.files[0]));

            const uploadFile = async () => {
                generalFunction.showLoader();
                let data = await uploadImageToBackend(event.target.files[0]);
                setImageUrl(data?.imageUrl);
                generalFunction.hideLoader();
            };
            uploadFile();
        }
    };

    const updateProfile = async () => {
        generalFunction.showLoader();
        const data = await axios.post(
            `${mainConfig.BACKEND_URL}api/users/${headers.userid}`,
            {
                imageUrl: imageUrl,
            },
            { headers: headers }
        );
        generalFunction.hideLoader();
    };


    const colorRetriver = () => {
        let mainColor = bgColors[`${theme}-primary-bg-color-0`];
        let diffColor = mainColor.split(" ")?.filter((ele) => ele.charAt(0) == "#")
        let pickColor = !!diffColor?.length ? [diffColor[0], diffColor.length > 1 ? diffColor[1] : "#D1ACFF"] : ["#9035FF", "#D1ACFF"];
        return pickColor;
    };
    
    
    return (
        <div className="w-full max-w-[calc(100vw-184px)] max-h-[calc(100vh-161px)] overflow-x-scroll overflow-y-scroll mt-[18px]">
            <div 
                className="p-8 flex flex-col items-center gap-8 rounded-[10px]"
                style={{border: `1.5px solid ${bgColors[`${theme}-primary-border-color`]}`}}
            >
                <div className="w-28 h-28 flex items-center justify-center rounded-full bg-[#F4EBFF] relative">
                    {(imageUrl || customImage) && (
                        <img
                            className="object-cover h-full w-full rounded-full"
                            src={imageUrl || customImage}
                            alt=""
                        />
                    )}
                    <div className={`${imageUrl ? "opacity-0" : "opacity-100"}`}>
                        <label className="cursor-pointer" htmlFor="profile-img">
                            {/* <img className="w-10 absolute top-9 left-9" src={uploadSVG()} alt="" />/ */}
                            {
                                uploadSVG(colorRetriver()[0], colorRetriver()[1])
                            }
                        </label>
                        <input
                            onChange={inputFileChangeHandler}
                            id="profile-img"
                            type="file"
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                </div>

                {/* <div className="flex justify-center gap-8 w-full">
                    <div className="flex flex-col w-full">
                        <p className="self-stretch text-gray-600 font-semibold text-sm">Enter Name*</p>
                        <input
                            type="text"
                            placeholder="Enter name"
                            required
                            className="self-stretch py-2 px-4 border border-gray-200 outline-none bg-transparent rounded-[10px]"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{
                                color: bgColors[`${theme}-color-premitive-grey-5`]
                            }}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <p className="self-stretch text-gray-600 font-semibold text-sm">Enter Job Title*</p>
                        <input
                            type="text"
                            required
                            placeholder="Product Manager"
                            className="self-stretch py-2 px-4 border border-gray-200 outline-none bg-transparent rounded-[10px]"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            style={{
                                color: bgColors[`${theme}-color-premitive-grey-5`]
                            }}
                        />
                    </div>
                </div> */}

                {/* <div className="flex justify-center gap-8 w-full">
                    <div className="flex flex-col w-full">
                        <p className="self-stretch text-gray-600 font-semibold text-sm">Enter Email*</p>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            required
                            className="self-stretch py-2 px-4 border border-gray-200 outline-none bg-transparent rounded-[10px]"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{
                                color: bgColors[`${theme}-color-premitive-grey-5`]
                            }}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <p className="self-stretch text-gray-600 font-semibold text-sm">Enter Contact No</p>
                        <input
                            type="text"
                            required
                            placeholder="Product Manager"
                            className="self-stretch py-2 px-4 border border-gray-200 outline-none bg-transparent rounded-[10px]"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            style={{
                                color: bgColors[`${theme}-color-premitive-grey-5`]
                            }}
                        />
                    </div>
                </div> */}

                {/* <div className="w-full">
                    <p className="text-gray-600 font-semibold text-sm">Enter Your Description*</p>
                    <div className="flex w-full border border-gray-200 rounded-[10px]">
                        <textarea
                            cols="30"
                            rows="6"
                            className="flex-1 py-2 px-4 resize-none outline-none bg-transparent"
                            value={about}
                            onChange={(e) => {
                                if (e.target.value.length <= 120) {
                                    setAbout(e.target.value)
                                }
                            }}
                            style={{
                                color: bgColors[`${theme}-color-premitive-grey-5`]
                            }}
                        ></textarea>
                    </div>
                    <p className="text-gray-400 font-normal text-xs">{about?.length || 0}/120 Characters</p>
                </div> */}

                {/* <button
                    className="flex justify-center items-center gap-2 self-stretch py-2 px-4 rounded-[10px]"
                    style={{
                        background: bgColors[`${theme}-primary-bg-color-0`]
                    }}
                    onClick={updateProfile}
                >
                    <p className="text-white font-semibold text-md">Update</p>
                </button> */}
                <UserProfile
                    questId={appConfig?.QUEST_ONBOARDING_QUIZ_CAMPAIGN_ID}
                    userId={generalFunction.getDataFromCookies(
                        "questUserId"
                    )}
                    token={generalFunction.getDataFromCookies(
                        "questUserToken"
                    )}
                    answer={answer}
                    setAnswer={setAnswer}
                    getAnswers={updateProfile}
                    loadingTracker
                    setLoading={(e) => setLoading(e)}
                    styleConfig={{
                        Form: {
                            width: "100%",
                            background: "transparent",
                        },
                        Label: {
                            color: bgColors[
                                `${theme}-color-premitive-grey-6`
                            ],
                            fontFamily: "Figtree",
                            fontSize: "12px",
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
                                border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`
                            },
                            style: {
                                border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`,
                            }
                        },
                        SingleChoice: {
                            style: {
                                border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`
                            },
                            selectedStyle: {
                                border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`
                            }
                        },
                        TextArea: {
                            border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`
                        },
                        PrimaryButton: {
                            border: "none"
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default EditProfile;
