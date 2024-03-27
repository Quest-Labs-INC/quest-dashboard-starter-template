import React, { useContext, useState } from "react";
import { ThemeContext } from "../Common/AppContext";
import { MessageSvg, ProfileSvg, StarSvg, deleteIcon } from "../Common/SideBarSvg";
import Referral from "./ReferralComp";
import ReferralComp from "./ReferralComp";

const ReferalPage2 = () => {
  const { theme, bgColors, appConfig } = useContext(ThemeContext);
  const [userData, setUserData] = useState([
    {
      Sr: 1,
      Name: "Rich Explorer",
      Contact: "jessica.hansonasdf@exmaple.com",
      CreatedAt: "10 May 2021",
      credits: 100,
    },
    {
      Sr: 2,
      Name: "Rich Explorer",
      Contact: "jessica.hansonasdf@exmaple.com",
      "CreatedAt": "22 May 2021",
      credits: 100,
    },
    {
      Sr: 3,
      Name: "Rich Explorer",
      Contact: "jessica.hansonasdf@exmaple.com",
      CreatedAt: "6 May 2021",
      credits: 100,
    },
    {
      Sr: 4,
      Name: "Rich Explorer",
      Contact: "jessica.hansonasdf@exmaple.com",
      CreatedAt: "22 May 2021",
      credits: 100,
    },
  ])

  return (
    <div>
      <div className="flex py-[20px] px-[40px] border text-[18px] text-[#2C2C2C]">
        Refer Friends
      </div>
      <div className="flex-col  my-[30px] ml-[30px] mr-[96px] gap-[24px]">
        <div className="flex-col">
          <div className="flex gap-[12px]">
            <div className="flex flex-col py-[28px] px-[20px] gap-[40px] w-[100%] border rounded-[10px]">
              <div className='referral-black text-[20px] font-[600]  leading-[30px]'>
                Invite your friends
                <div className="referral-grey text-[12px] font-[400] leading-[16px]">
                  Spread the word and share us with your friends, you both will
                  maybe earn some rewards!
                </div>
              </div>

              <div className="flex gap-[20px]">
                <div className="flex flex-col gap-[12px] w-full">
                  <div className="flex align-center justify-center">
                    <div className="w-[56px] h-[56px] flex items-center justify-center rounded-full border">
                      {/* <img /> */}
                      <MessageSvg gradientId={'paint0_linear'} />

                    </div>
                  </div>
                  <div className="flex flex-col gap-[4px] justify-center w-full">
                    <p className="referral-black font-[600] text-[16px] text-center leading-[24px] w-full">
                      Share Your Unique Link
                    </p>
                    <p className="referral-grey text-[12px] font-[500] text-center leading-[16px] w-full">
                      Access invite link and share via socials, email, or DMs.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-[12px] w-full">
                  <div className="flex align-center justify-center">
                    <div className="w-[56px] h-[56px] flex items-center justify-center rounded-full border">
                      {/* <img /> */}
                      {ProfileSvg()}
                    </div>
                  </div>
                  <div className="flex flex-col gap-[4px] justify-center w-full">
                    <p className="referral-black font-[600] text-[16px] text-center leading-[24px] w-full">
                      Your Friends Sign Up
                    </p>
                    <p className="referral-grey text-[12px] font-[500] text-center leading-[16px] w-full">
                      Encourage friends to sign up with your link for rewards.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-[12px] w-full">
                  <div className="flex align-center justify-center">
                    <div className="w-[56px] h-[56px] flex items-center justify-center rounded-full border">
                      {/* <img /> */}
                      {StarSvg()}
                    </div>
                  </div>
                  <div className="flex flex-col gap-[4px] justify-center w-full">
                    <p className="referral-black font-[600] text-[16px] text-center leading-[24px] w-full">
                      Earn Rewards Together
                    </p>
                    <p className="referral-grey text-[12px] font-[500] text-center leading-[16px] w-full">
                      Friends meet criteria, both receive rewards, enhancing experiences!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ReferralComp />
            </div>
          </div>
        </div>


        <div className="mt-[16px] rounded-xl border border-[#F0F0F0] overflow-y-auto ">
          <table className="min-w-[1100px] w-full " style={{
            color: bgColors[`${theme}-primary-bg-color-8`],
          }}>
            <thead style={{ background: theme == "dark" ? 'transparent' : '#F0F0F0' }}>
              <tr className="border-b border-[#F0F0F0] text-sm font-medium font-['Figtree']">
                <th className="w-[10%]  py-[18px]  rounded-tl-xl text-center"
                  style={{
                    color: bgColors[`${theme}-color-premitive-grey-9`]
                  }}>
                  Sr
                </th>
                <th className="w-[20%]   py-[18px] text-center " style={{
                  color: bgColors[`${theme}-color-premitive-grey-9`]
                }}>
                  Name
                </th>
                <th className="w-[30%]   py-[18px] text-center" style={{
                  color: bgColors[`${theme}-color-premitive-grey-9`]
                }}>
                  Contact
                </th>
                <th className="w-[20%]   py-[18px] text-center" style={{
                  color: bgColors[`${theme}-color-premitive-grey-9`]
                }}>
                  Created At
                </th>
                <th className="w-[15%]  py-[18px] text-center" style={{
                  color: bgColors[`${theme}-color-premitive-grey-9`]
                }}>
                  Credits
                </th>
              </tr>
            </thead>

            <tbody>
              {userData?.map((user, index) => (
                <tr className="border-b border-[#F0F0F0] text-[#4C4C4C]">
                  <td className="w-[10%] px-6 py-4 text-[#455A64] text-center">
                    {index + 1}
                  </td>
                  <td className="w-[20%] px-6 py-4 text-[#455A64] text-center">
                    {user.Name}
                  </td>
                  <td className="w-[30%] px-6 py-4 text-center">
                    {user.Contact}
                  </td>
                  <td className="w-[20%] px-6 py-4  text-center">
                    {user.CreatedAt}
                  </td>
                  <td className="w-[15%] px-6 py-4 text-center">
                    {user.credits}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReferalPage2;
