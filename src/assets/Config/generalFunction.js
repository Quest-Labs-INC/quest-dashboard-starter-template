import Cookies from "universal-cookie";

export const generalFunction = {
    getUserId : () => {
        const cookies = new Cookies();
        let userId = cookies.get("userId");
        return userId;
    },

    getUserToken: () => {
        const cookies = new Cookies();
        let token = cookies.get("userToken");
        return token;
    },

    logout: () => {
        const cookies = new Cookies();
        cookies.remove("userId");
        cookies.remove("userToken");
    }
}
