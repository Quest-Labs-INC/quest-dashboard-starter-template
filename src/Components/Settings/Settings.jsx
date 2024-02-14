import { useState } from "react";
import InputComponent from "../Common/CommonComponents/InputComponent";
import { importConfig } from "../../assets/Config/importConfig";



export default function Settings() {
    const [userData, setUserData] = useState({
        name: "",
        subtitle: "",
        about: "",
        bannerUrl: "",
    })

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name] : event.target.value
        })
    }

    return (
        <div className="w-full">
            <div className="w-5/6 m-auto md:w-3/4">
                <div className="">
                    <div>
                        <label htmlFor="bannerUrl" className="relative">
                            {
                                userData.bannerUrl
                                ? <img src={userData.bannerUrl} alt="" className="w-full h-32"/>
                                : <div className="w-full h-32" style={{background: "linear-gradient(to right,#09080d,#190a21,#260d20)"}}></div>
                            }
                            <div className="absolute w-full h-32 flex items-center justify-center top-0 text-xs text-white cursor-pointer hover:underline opacity-0 hover:opacity-100 duration-300">Upload banner image</div>
                        </label>
                        <input type="file" className="hidden" name="bannerUrl" id="bannerUrl" />
                    </div>
                </div>
                <div className="">
                    <div className="w-20 h-20 m-auto -translate-y-10">
                        <label htmlFor="imageUrl" className="relative w-20 h-20">
                            <img src={userData.imageUrl ? userData.imageUrl : importConfig.settings.userImage} alt="" className="w-20 h-20"/>
                            <div className="absolute w-20 h-20 flex items-center justify-center top-0 text-xs cursor-pointer hover:underline opacity-0 hover:opacity-100 duration-300">
                                <img src={importConfig.settings.uploadIcon} className="w-10 h-10" alt="" />
                            </div>
                        </label>
                        <input type="file" className="hidden" name="imageUrl" id="imageUrl" />
                    </div>
                </div>
                <div className="grid w-100 gap-x-5 grid-cols-1 md:grid-cols-2">
                    <InputComponent
                        inputTitle={"Name"}
                        isMandatory={true}
                        name={"name"}
                        value={userData.name}
                        onChange={(e) => handleChange(e)}
                    />
                    <InputComponent
                        inputTitle={"Subtitle"}
                        isMandatory={false}
                        name={"subtitle"}
                        value={userData.subtitle}
                        onChange={(e) => handleChange(e)}
                    />
                    <InputComponent
                        inputTitle={"About"}
                        isMandatory={false}
                        name={"about"}
                        value={userData.about}
                        onChange={(e) => handleChange(e)}
                    />
                    <InputComponent
                        inputTitle={"Location"}
                        isMandatory={false}
                        name={"location"}
                        value={userData.location}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <button className="btn-gradient w-full mt-4">Save Details</button>
            </div>
        </div>
    )
}