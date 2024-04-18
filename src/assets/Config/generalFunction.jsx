import Cookies from "universal-cookie";
import { mainConfig } from "./appConfig";
import { supabase } from "../../supabaseClient";

export const generalFunction = {
    getUserId : () => {
        let userId = localStorage.getItem("questUserId");
        return userId;
    },

    getUserToken: () => {
        let token = localStorage.getItem("questUserToken");
        return token;
    },

    showLoader: () => {
        let loader = document.querySelector("#loader");
        loader.style.display = "flex";
    },

    hideLoader: () => {
        let loader = document.querySelector("#loader");
        loader.style.display = "none";
    },

    getUserCredentials: () => {
        let questUserCredentials = JSON.parse(localStorage.getItem("questUserCredentials"));
        return questUserCredentials;
    },

    logout: () => {
        let cookies = new Cookies();
        cookies.remove("questUserId");
        cookies.remove("questUserToken");
        cookies.remove("questUserCredentials");
        localStorage.removeItem("questUserId");
        localStorage.removeItem("questUserToken");
        localStorage.removeItem("questUserCredentials");
    },

    createUrl: (apiString) => {
        const url = `${mainConfig.QUEST_BASE_URL}${apiString}`;
        const headers = {
            apiKey: mainConfig.QUEST_API_KEY,
            userId: generalFunction.getUserId(),
            token: generalFunction.getUserToken()
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
                    initialQuality: 1 - (generalFunction.count * 0.05),
                });
                generalFunction.count++

                // Call the uploadImageToBackend function recursively with the compressed image
                return await generalFunction.uploadImageToBackend(compressedImage);
            } catch (error) {
                return null;
            }
        }

        const { url, headers: baseHeaders } = generalFunction.createUrl(`api/upload-img`);
        const headers = {
            ...baseHeaders,
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
        let request = generalFunction.createUrl(`api/users/${userId}/admin-entities`);
        try {
            const response = await axios.get(request.url, { headers: { ...request.headers, apikey: mainConfig.API_KEY } });
            if (response.data.success === false) {
                return response.data
            }

            if (response.data.success === true) {
                if (response.data.data.length == 0) {
                    return response.data;
                }
                let comm = response?.data?.data.filter((ele) => ele.parentEntityId == undefined)
                return { success: true, data: comm };
            }
        } catch (error) {
            return { success: false, loginAgain: true };
        }
    },

    supabase_addData: async (table, rowData) => {
        const { data, error } = await supabase.from(table).select('*').eq("email", rowData.email).maybeSingle();
        if (error) {
            throw error;
        }
        
        if (!data || !data?.email) {
            const { data: newUserData, error: insertError } = await supabase
              .from(table)
              .insert([{
                email: rowData.email,
                ...(!!rowData?.name && { name: rowData?.name }),
              }])
              .select();
            if (insertError) {
              throw insertError;
            }
        }
    },

    supabase_updateData: async (table, email, rowData) => {
        const { data, error } = await supabase
        .from(table)
        .update(rowData)
        .eq("email", email)
        .select()

        if (error) {
            throw error;
        }
    }
}
