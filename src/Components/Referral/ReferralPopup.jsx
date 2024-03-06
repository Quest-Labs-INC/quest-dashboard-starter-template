import React, { useContext } from "react";
import { Referral } from "@questlabs/react-sdk";
import { generalFunction } from "../../assets/Config/GeneralFunction";
import { ThemeContext } from "../Common/AppContext";

const ReferralPopup = ({ setOpenPopup }) => {
  const { theme, bgColors, contentConfig } = useContext(ThemeContext);
  const clickHandler = (e) => {
    if (document.getElementById("clickbox_sreferral").contains(e.target)) {
    } else {
      setOpenPopup(false);
    }
  };

  return (
    <div
      className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 bg-[rgba(0,0,0,.15)] backdrop-blur-sm z-10"
      onClick={clickHandler}
    >
      <div className="" id="clickbox_sreferral">
        <Referral
          userId={generalFunction.getUserId()}
          token={generalFunction.getUserToken()}
          questId={"q-saas-referral"}
          bgColor="white"
          color=""
          heading={"Get Free Credits 🚀"}
          description={
            "Share your unique referral link with friends and receive up to 6,000 credits each time a friend signs up!"
          }
          referralLink={`${window.location.origin}?ref=`}
          showReferralCode={false}
          styleConfig={{
            PrimaryButton: {
              background: bgColors[`${theme}-primary-bg-color-0`],
            },
            Form: { background: bgColors[`${theme}-primary-bg-color-1`] },
            Heading: { color: bgColors[`${theme}-color-premitive-grey-5`] },
          }}
          gradientBackgroundColor={bgColors[`${theme}-primary-bg-color-0`]}
          gradientBackground={true}
          showFooter={false}
        />
      </div>
    </div>
  );
};

export default ReferralPopup;
