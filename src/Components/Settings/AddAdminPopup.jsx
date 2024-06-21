import React, { useContext, useState } from "react";
import { ThemeContext } from "../Common/AppContext";
import { generalFunction } from "../../assets/Config/generalFunction";
import { Toast } from "@questlabs/react-sdk";
import axios from "axios";
import { mainConfig } from "../../assets/Config/appConfig";

const AddAdminPopup = ({ setAdminPopup, setFlag }) => {
  const { theme, bgColors, appConfig } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const ownerDetails = JSON.parse(localStorage.getItem("adminDetails"));
  const [isValidEmail, setIsValidEmail] = useState(true);
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(emailRegex.test(newEmail));
  };

  const handleSave = () => {
    setAdminPopup(false);
    let entityId = mainConfig.QUEST_ENTITY_ID;
    generalFunction.showLoader();
    let json = {
      ownerUserId: generalFunction.getUserId(),
      email: email.toLowerCase(),
      entityId,
      name,
      inviteLink: window.location.origin,
    };

    let request = generalFunction.createUrl(`api/entities/${ownerDetails?.ownerEntityId}/invite`);
    axios
      .post(request.url, json, { headers: {...request.headers, apiKey: ownerDetails?.apiKey} })
      .then((res) => {
        const data = res.data;
        if (data.success == false) {
          let errMsg = data.error ? data.error : "Unable to Invite Member";
          Toast.error({ text: "Error Occurred" + "\n" + errMsg });
          generalFunction.hideLoader();
        } else if (data.success == true) {
          Toast.success({
            text:
              "Congratulations!!!" +
              "\n" +
              "Member has been invited successfully.",
          });
          //////////////////////////
          // Role created successfully, update roles in supabase
          // let data = {
          //   role: "ADMIN",
          //   email: email.toLowerCase(),
          // }
          ////////////////////////

        const userPermission_ = {
          role: "Admin",
          user_id: "",
          assigned_by: ""
        }
        generalFunction.createUserPermission(userPermission_);

          setFlag((prev) => !prev);
          setTimeout(function () {
            generalFunction.hideLoader();
          }, 500);
        }
      })
      .catch((err) => {
        console.log(err);
        Toast.error({
          text: "Error Occurred" + "\n" + "Unable to Invite Member",
        });
        generalFunction.hideLoader();
      });
  };

  return (
    <div
      className="fixed w-[100%] h-[100vh] top-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-10"
      onClick={() => setAdminPopup(false)}
    >
      <div
        className="w-[376px] bg-white flex flex-col rounded-xl p-5 gap-5  modal"
        onClick={(e) => e.stopPropagation()}
        style={{ background: bgColors[`${theme}-primary-bg-color-1`] }}
      >
        <div
          className="text-[20px] font-semibold font-['Figtree']"
          style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}
        >
          Invite Team Member
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label
              className="text-[12px] font-normal text-[#939393]"
              htmlFor=""
            >
              Enter Name*
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              className="border bg-transparent border-[#ECECEC] h-10 rounded-[10px] px-4 outline-none"
              type="text"
              style={{
                color: bgColors[`${theme}-color-premitive-grey-5`],
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-[12px] font-normal text-[#939393]"
              htmlFor=""
            >
              Enter Email*
            </label>
            <input
              id="email"
              placeholder="Enter Email"
              className={`border ${
                isValidEmail ? "border-[#ECECEC]" : "border-red-500"
              } h-10 rounded-[10px] px-4 outline-none bg-transparent`}
              type="text"
              value={email}
              onChange={handleEmailChange}
              style={{
                color: bgColors[`${theme}-color-premitive-grey-5`],
              }}
            />
            {!isValidEmail && (
              <span className="text-[12px] text-red-500">
                Invalid email format
              </span>
            )}
          </div>
          <button
            className="text-sm px-8 py-2.5 rounded-[10px] pl-[40px] pr-[40px]"
            style={{
              background: bgColors[`${theme}-primary-bg-color-0`],
              color: "white",
              whiteSpace: "nowrap",
            }}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAdminPopup;