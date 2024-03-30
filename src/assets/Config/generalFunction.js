import Cookies from "universal-cookie";
import { appConfig, mainConfig } from "./appConfig";
import axios from "axios";

export const generalFunction = {
  getUserId: () => {
    let userId = localStorage.getItem("questUserId");
    return userId;
  },

  getUserToken: () => {
    let token = localStorage.getItem("questUserToken");
    return token;
  },

  getUserCredentials: () => {
    let questUserCredentials = JSON.parse(
      localStorage.getItem("questUserCredentials")
    );
    return questUserCredentials;
  },
  
  getDataFromLocalStorage: (key) => {
    let id = localStorage.getItem(key);
    return id;
  },

  getDataFromCookies: (keyName) => {
    const cookies = new Cookies();
    let data = cookies.get(keyName);
    return data;
  },

  setDataInCookies: (keyName, data) => {
    const cookies = new Cookies();
    const date = new Date();
    date.setDate(date.getDate() + 6);
    cookies.set(keyName, data, { path: "/", expires: date });
  },

  logout: () => {
    localStorage.remove("questUserId");
    localStorage.remove("questUserToken");
    localStorage.remove("questUserCredentials");
  },

  mainLogout: () => {
    const cookies = new Cookies();
    cookies.remove("adminCommunityId");
    cookies.remove("allEntity");
    cookies.remove("apiKey");
    cookies.remove("communityImageUrl");
    cookies.remove("questUserCredentials");
    cookies.remove("questUserId");
    cookies.remove("questUserToken");
    cookies.remove("userImageUrl");
    cookies.remove("userName");
    window.location.reload();
  },

  showLoader: () => {
    let loader = document.querySelector("#loader");
    loader.style.display = "flex";
  },

  hideLoader: () => {
    let loader = document.querySelector("#loader");
    loader.style.display = "none";
  },

  createUrl: (apiString) => {
    const url = `${mainConfig.BACKEND_URL}${apiString}`;
    const headers = {
      apiKey:
        generalFunction.getDataFromCookies("apiKey") ||
        generalFunction.getDataFromLocalStorage("apiKey"),
      userId: generalFunction.getDataFromCookies("questUserId"),
      token: generalFunction.getDataFromCookies("questUserToken"),
    };

    return {
      url,
      headers,
    };
  },

  count: 0,

  uploadImageToBackend: async (file) => {
    if (!file) {
      return null;
    }
    if (file.size > 1000000 && generalFunction.count <= 50) {
      try {
        // Resize the image to below 1MB
        const compressedImage = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
          initialQuality: 1 - generalFunction.count * 0.05,
        });
        generalFunction.count++;

        // Call the uploadImageToBackend function recursively with the compressed image
        return await generalFunction.uploadImageToBackend(compressedImage);
      } catch (error) {
        return null;
      }
    }

    const { url, headers: baseHeaders } =
      generalFunction.createUrl(`api/upload-img`);
    const headers = {
      ...baseHeaders,
      apiKey: appConfig.QUEST_API_KEY,
      entityId: appConfig.QUEST_ENTITY_ID,
      "Content-Type": "form-data",
    };

    const formData = new FormData();
    formData.append("uploaded_file", file);

    try {
      const res = await axios.post(url, formData, { headers });
      return res;
    } catch (error) {
      return null;
    }
  },

  fetchCommunities: async (userId) => {
    let request = generalFunction.createUrl(
      `api/users/${userId}/admin-entities`
    );
    try {
      const response = await axios.get(request.url, {
        headers: { ...request.headers, apikey: mainConfig.API_KEY },
      });
      if (response.data.success === false) {
        return response.data;
      }

      if (response.data.success === true) {
        if (response.data.data.length == 0) {
          return response.data;
        }
        let comm = response?.data?.data.filter(
          (ele) => ele.parentEntityId == undefined
        );
        return { success: true, data: comm };
      }
    } catch (error) {
      return { success: false, loginAgain: true };
    }
  },
};
