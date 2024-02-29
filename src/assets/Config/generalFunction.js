import Cookies from "universal-cookie";

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
        let questUserCredentials = JSON.parse(localStorage.getItem("questUserCredentials"));
        return questUserCredentials;
    },

    logout: () => {
        localStorage.remove("questUserId");
        localStorage.remove("questUserToken");
        localStorage.remove("questUserCredentials");
    }
}
