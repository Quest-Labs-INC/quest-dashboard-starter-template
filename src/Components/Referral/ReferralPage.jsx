import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../Common/AppContext";
import {
    MessageSvg,
    ProfileSvg,
    StarSvg,
    deleteIcon,
} from "../Common/SideBarSvg";
import Referral from "./ReferralComp";
import ReferralComp from "./ReferralComp";
import { mainConfig } from "../../assets/Config/appConfig";
import { generalFunction } from "../../assets/Config/generalFunction";
import axios from "axios";

const ReferralPage = () => {
    const { theme, bgColors, appConfig } = useContext(ThemeContext);
    const [userData, setUserData] = useState([]);

    const colorRetriver = () => {
        let mainColor = bgColors[`${theme}-primary-bg-color-0`];
        let diffColor = mainColor
            .split(" ")
            ?.filter((ele) => ele.charAt(0) == "#");
        let pickColor = !!diffColor?.length
            ? [diffColor[0], diffColor.length > 1 ? diffColor[1] : "#D1ACFF"]
            : ["#9035FF", "#D1ACFF"];
        return pickColor;
    };

    useEffect(() => {
        const getSubmission = async () => {
            let request = generalFunction.createUrl(
                `api/v2/entities/${mainConfig.QUEST_ENTITY_ID}/campaigns/${appConfig.QUEST_REFERRAL_CAMPAIGN_ID}/referral-summary?duration=all`
            );
            await axios(request.url, {
                headers: {
                    ...request.headers,
                    apikey: mainConfig.QUEST_API_KEY,
                    userId: generalFunction.getUserId(),
                    token: generalFunction.getUserToken(),
                },
            }).then((res) => {
                let totalData = res?.data?.data;
                let filterData = totalData?.filter(
                    (ele) =>
                        ele.referredBy ==
                        generalFunction.getUserCredentials()?.email
                );
                setUserData(filterData);
            });
        };

        getSubmission();
    }, []);

    return (
        <div className="h-full max-h-screen overflow-y-auto">
            {/* <div
                className="dashboard-page-header"
                style={{
                    color: bgColors[`${theme}-color-premitive-grey-5`],
                    borderBottom: `1.5px solid ${
                        bgColors[`${theme}-primary-border-color`]
                    }`,
                }}
            >
                Refer Friends
            </div> */}
            <div className="flex-col  my-[30px] mr-[96px] gap-[24px]">
                <div className="flex-col">
                    <div className="flex gap-[12px]">
                        <div
                            className="flex flex-col py-[28px] px-[20px] gap-[40px] w-[100%] rounded-[10px]"
                            style={{
                                border: `1px solid ${
                                    bgColors[`${theme}-primary-border-color`]
                                }`,
                            }}
                        >
                            <div
                                className="referral-black text-[20px] font-[600] leading-[30px]"
                                style={{
                                    color: bgColors[
                                        `${theme}-color-premitive-grey-5`
                                    ],
                                }}
                            >
                                Invite your friends
                                <div className="text-[#939393] text-[12px] font-[400] leading-[16px]">
                                    Spread the word and share us with your
                                    friends, you both will maybe earn some
                                    rewards!
                                </div>
                            </div>

                            <div className="flex gap-[20px]">
                                <div className="flex flex-col gap-[12px] w-full">
                                    <div className="flex align-center justify-center">
                                        <div
                                            className="w-[56px] h-[56px] flex items-center justify-center rounded-full"
                                            style={{
                                                border: `1px solid ${
                                                    bgColors[
                                                        `${theme}-primary-border-color`
                                                    ]
                                                }`,
                                            }}
                                        >
                                            {/* <img /> */}
                                            {MessageSvg(
                                                colorRetriver()[0],
                                                colorRetriver()[1]
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-[4px] justify-center w-full">
                                        <p
                                            className="referral-black font-[600] text-[16px] text-center leading-[24px] w-full"
                                            style={{
                                                color: bgColors[
                                                    `${theme}-color-premitive-grey-5`
                                                ],
                                            }}
                                        >
                                            Share Your Unique Link
                                        </p>
                                        <p className="text-[#939393] text-[12px] font-[500] text-center leading-[16px] w-full">
                                            Access invite link and share via
                                            socials, email, or DMs.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[12px] w-full">
                                    <div className="flex align-center justify-center">
                                        <div
                                            className="w-[56px] h-[56px] flex items-center justify-center rounded-full"
                                            style={{
                                                border: `1px solid ${
                                                    bgColors[
                                                        `${theme}-primary-border-color`
                                                    ]
                                                }`,
                                            }}
                                        >
                                            {ProfileSvg(
                                                colorRetriver()[0],
                                                colorRetriver()[1]
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-[4px] justify-center w-full">
                                        <p
                                            className="referral-black font-[600] text-[16px] text-center leading-[24px] w-full"
                                            style={{
                                                color: bgColors[
                                                    `${theme}-color-premitive-grey-5`
                                                ],
                                            }}
                                        >
                                            Your Friends Sign Up
                                        </p>
                                        <p className="text-[#939393] text-[12px] font-[500] text-center leading-[16px] w-full">
                                            Encourage friends to sign up with
                                            your link for rewards.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[12px] w-full">
                                    <div className="flex align-center justify-center">
                                        <div
                                            className="w-[56px] h-[56px] flex items-center justify-center rounded-full"
                                            style={{
                                                border: `1px solid ${
                                                    bgColors[
                                                        `${theme}-primary-border-color`
                                                    ]
                                                }`,
                                            }}
                                        >
                                            {StarSvg(
                                                colorRetriver()[0],
                                                colorRetriver()[1]
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-[4px] justify-center w-full">
                                        <p
                                            className="referral-black font-[600] text-[16px] text-center leading-[24px] w-full"
                                            style={{
                                                color: bgColors[
                                                    `${theme}-color-premitive-grey-5`
                                                ],
                                            }}
                                        >
                                            Earn Rewards Together
                                        </p>
                                        <p className="text-[#939393] text-[12px] font-[500] text-center leading-[16px] w-full">
                                            Friends meet criteria, both receive
                                            rewards, enhancing experiences!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <ReferralComp colorPicker={colorRetriver()[1]} />
                        </div>
                    </div>
                </div>

                <div
                    className="mt-[16px] rounded-xl overflow-y-auto "
                    style={{
                        border: `1.5px solid ${
                            bgColors[`${theme}-primary-border-color`]
                        }`,
                    }}
                >
                    <table
                        className="min-w-[1100px] w-full "
                        style={{
                            color: bgColors[`${theme}-primary-bg-color-8`],
                        }}
                    >
                        <thead
                            style={{
                                background:
                                    theme == "dark" ? "transparent" : "#F0F0F0",
                            }}
                        >
                            <tr
                                className="text-sm font-medium font-['Figtree']"
                                style={{
                                    borderBottom: `1px solid ${
                                        bgColors[
                                            `${theme}-primary-border-color`
                                        ]
                                    }`,
                                }}
                            >
                                <th
                                    className="w-[10%]  py-[18px]  rounded-tl-xl text-center"
                                    style={{
                                        color: bgColors[
                                            `${theme}-color-premitive-grey-9`
                                        ],
                                        background:
                                            bgColors[
                                                `${theme}-primary-bg-color-9`
                                            ],
                                    }}
                                >
                                    Sr
                                </th>
                                <th
                                    className="w-[20%]   py-[18px] text-center "
                                    style={{
                                        color: bgColors[
                                            `${theme}-color-premitive-grey-9`
                                        ],
                                        background:
                                            bgColors[
                                                `${theme}-primary-bg-color-9`
                                            ],
                                    }}
                                >
                                    Name
                                </th>
                                <th
                                    className="w-[30%]   py-[18px] text-center"
                                    style={{
                                        color: bgColors[
                                            `${theme}-color-premitive-grey-9`
                                        ],
                                        background:
                                            bgColors[
                                                `${theme}-primary-bg-color-9`
                                            ],
                                    }}
                                >
                                    Contact
                                </th>
                                <th
                                    className="w-[20%]   py-[18px] text-center"
                                    style={{
                                        color: bgColors[
                                            `${theme}-color-premitive-grey-9`
                                        ],
                                        background:
                                            bgColors[
                                                `${theme}-primary-bg-color-9`
                                            ],
                                    }}
                                >
                                    Created At
                                </th>
                                <th
                                    className="w-[15%]  py-[18px] text-center"
                                    style={{
                                        color: bgColors[
                                            `${theme}-color-premitive-grey-9`
                                        ],
                                        background:
                                            bgColors[
                                                `${theme}-primary-bg-color-9`
                                            ],
                                    }}
                                >
                                    Credits
                                </th>
                            </tr>
                        </thead>

                        {!!userData?.length && (
                            <tbody>
                                {userData?.map((user, index) => (
                                    <tr
                                        className="border-b border-[#F0F0F0] text-[#4C4C4C]"
                                        style={{
                                            borderBottom: `1px solid ${
                                                bgColors[
                                                    `${theme}-primary-border-color`
                                                ]
                                            }`,
                                        }}
                                    >
                                        <td
                                            className="w-[10%] px-6 py-4 text-[#455A64] text-center"
                                            style={{
                                                color: bgColors[
                                                    `${theme}-color-premitive-grey-9`
                                                ],
                                            }}
                                        >
                                            {index + 1}
                                        </td>
                                        <td
                                            className="w-[20%] px-6 py-4 text-[#455A64] text-center"
                                            style={{
                                                color: bgColors[
                                                    `${theme}-color-premitive-grey-9`
                                                ],
                                            }}
                                        >
                                            {user?.Name || `User ${index + 1}`}
                                        </td>
                                        <td
                                            className="w-[30%] px-6 py-4 text-center"
                                            style={{
                                                color: bgColors[
                                                    `${theme}-color-premitive-grey-9`
                                                ],
                                            }}
                                        >
                                            {user?.email}
                                        </td>
                                        <td
                                            className="w-[20%] px-6 py-4  text-center"
                                            style={{
                                                color: bgColors[
                                                    `${theme}-color-premitive-grey-9`
                                                ],
                                            }}
                                        >
                                            {new Date(
                                                user?.submittedAt
                                            ).getUTCDate() +
                                                "/" +
                                                new Date(
                                                    user?.submittedAt
                                                ).getUTCMonth() +
                                                "/" +
                                                new Date(
                                                    user?.submittedAt
                                                ).getUTCFullYear()}
                                        </td>
                                        <td
                                            className="w-[15%] px-6 py-4 text-center"
                                            style={{
                                                color: bgColors[
                                                    `${theme}-color-premitive-grey-9`
                                                ],
                                            }}
                                        >
                                            {user.credits || "$0"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                    {!userData?.length && (
                        <div
                            className="w-full text-center py-[18px]"
                            style={{
                                color: bgColors[
                                    `${theme}-color-premitive-grey-5`
                                ],
                            }}
                        >
                            No referral data found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReferralPage;
