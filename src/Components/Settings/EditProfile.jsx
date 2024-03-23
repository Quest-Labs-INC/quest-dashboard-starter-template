import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { generalFunction } from "../../assets/Config/GeneralFunction";
import { UserProfile } from "@questlabs/react-sdk";
import { ThemeContext } from "../Common/AppContext";
import { uploadSVG } from "../Common/SideBarSvg";

const EditProfile = () => {
    const { theme, bgColors, appConfig } = useContext(ThemeContext);
    const [name, setName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [about, setAbout] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [customImage, setCustomImage] = useState("");
    const [answer, setAnswer] = useState({});

    useEffect(() => {
        generalFunction.showLoader();
        const getuser = async () => {
            setTimeout(() => {
                generalFunction.hideLoader();
            }, 5000);
            let request = generalFunction.createUrl(`api/users/${generalFunction.getUserId()}`);
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
                let data = await generalFunction.uploadImageToBackend(event.target.files[0]);
                setImageUrl(data?.imageUrl);
                generalFunction.hideLoader();
            };
            uploadFile();
        }
    };

    const updateProfile = async () => {
        generalFunction.showLoader();
        let request = generalFunction.createUrl(`api/users/${generalFunction.getUserId()}`);
        const data = await axios.post(
            request.url,
            {
                imageUrl: imageUrl,
            },
            { headers: request.headers }
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
            <div className="p-8 flex flex-col items-center gap-8 rounded-[10px] border border-gray-200">
                <div className="w-28 h-28 flex items-center justify-center rounded-full bg-[#FFF3EC] relative">
                    {(imageUrl || customImage) && (
                        <img
                            className="object-cover h-full w-full rounded-full"
                            src={imageUrl || customImage}
                            alt=""
                        />
                    )}
                    <div className={`${imageUrl ? "opacity-0" : "opacity-100"}`}>
                        <label className="cursor-pointer" htmlFor="profile-img">
                            <div className="w-10 absolute top-9 left-9">
                                {
                                    uploadSVG(colorRetriver()[0], colorRetriver()[1])
                                }
                            </div>
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
                <UserProfile
                    questId={appConfig?.QUEST_ONBOARDING_QUIZ_CAMPAIGN_ID}
                    userId={generalFunction.getUserId()}
                    token={generalFunction.getUserToken()}
                    answer={answer}
                    setAnswer={setAnswer}
                    getAnswers={updateProfile}
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
                            border: "1px solid gray",
                        },
                        MultiChoice: {
                            selectedStyle: {
                                background: bgColors[`${theme}-primary-bg-color-0`],
                                color: "#E0E0E0",
                                border: "1px solid gray"
                            }
                        },
                        SingleChoice: {
                            style: {
                                border: "1px solid gray"
                            },
                            selectedStyle: {
                                border: "1px solid gray"
                            }
                        },
                        TextArea: {
                            border: "1px solid gray"
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default EditProfile;
