import Cookies from 'universal-cookie';
import { appConfig, mainConfig } from '../assets/Config/appConfig';
import axios from 'axios';

// appConfig
function getUserId() {
    const cookies = new Cookies();
    return cookies.get('questUserId');
}
function getToken() {
    const cookies = new Cookies();
    return cookies.get('questUserToken');
}


function createUrl(apiString) {
    const url = `${mainConfig.BACKEND_URL}${apiString}`;
    // console.log(url)
    const headers = {
        apiKey: mainConfig.API_KEY,
        apisecret: appConfig.QUEST_PROTOCOL_API_SECRET,
        userId: getUserId(),
        token: getToken()
    };
    // console.log()

    return {
        url,
        headers,
    };
}

let count = 0
export async function uploadImageToBackend(file) {
    if (!file) {
        return null;
    }
    if (file.size > 1000000 && count <= 50) {
        try {
            // Resize the image to below 1MB
            const compressedImage = await imageCompression(file, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1024,
                useWebWorker: true,
                initialQuality: 1 - (count * 0.05),
            });
            count++

            // Call the uploadImageToBackend function recursively with the compressed image
            return await uploadImageToBackend(compressedImage);
        } catch (error) {
            // this.showErrorMessage("Error resizing image.");
            console.log("Error")
            return null;
        }
    }

    const { url, headers: baseHeaders } = createUrl(`api/upload-img`);
    
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
        // this.showErrorMessage("Error uploading image.");
        console.log("error")
        return null;
    }
}
