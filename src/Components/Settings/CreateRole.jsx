import React, { useContext, useState } from "react";
import { ThemeContext } from "../Common/AppContext";
import { generalFunction } from "../../assets/Config/generalFunction";
import { Toast } from "@questlabs/react-sdk";
import axios from "axios";
import { mainConfig } from "../../assets/Config/appConfig";

const CreateRole = ({ setOpenRolePopup, setFlag, openRolePopup }) => {
  const { theme, bgColors, appConfig } = useContext(ThemeContext);
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("");
  const ownerDetails = JSON.parse(localStorage.getItem("adminDetails"));
  const handleSave = () => {
    setOpenRolePopup(false);
    let entityId = mainConfig.QUEST_ENTITY_ID;
    generalFunction.showLoader();
    let json = {
      role,
      description,
    };

    let request = generalFunction.createUrl(`api/entities/${ownerDetails?.ownerEntityId}/roles?userId=${generalFunction.getUserId()}`);
    axios
      .post(request.url, json, { headers: {...request.headers, apiKey: ownerDetails?.apiKey} })
      .then((res) => {
        const data = res.data;
        if (data.success == false) {
          Toast.error({ text: "Error Occurred" });
          generalFunction.hideLoader();
        } else if (data.success == true) {
          Toast.success({
            text:
              "Congratulations!!!" +
              "\n" +
              "Role has been created successfully.",
          });
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
      onClick={() => setOpenRolePopup(false)}
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
          Create A Roll
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label
              className="text-[12px] font-normal text-[#939393]"
              htmlFor=""
            >
              Enter Role*
            </label>
            <input
              onChange={(e) => setRole(e.target.value)}
              placeholder="eg. ADMIN"
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
              Enter description
            </label>
            <input
              id="email"
              placeholder="Enter description"
              className={`border border-[#ECECEC] h-10 rounded-[10px] px-4 outline-none bg-transparent`}
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              style={{
                color: bgColors[`${theme}-color-premitive-grey-5`],
              }}
            />
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

export default CreateRole;
