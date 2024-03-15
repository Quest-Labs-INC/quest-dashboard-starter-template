import { useContext } from "react";
import { importConfig } from "../../assets/Config/importConfig";
import { ThemeContext } from "./appContext";
import './LoginWrapper.css'

export default function LoginWrapper({ children }) {
    const { appConfig, theme, bgColors, contentConfig } = useContext(ThemeContext)
    console.log("login wrapper");
    console.log("app", appConfig)
    console.log("theme", theme)
    console.log("bgColors", bgColors)
    console.log("contentConfig", contentConfig)
    console.log(appConfig.BRAND_LOGO)
    return (
        <div className="login-wrapper flex h-screen">
            <div
                className={`hidden gap-[8px] md:flex flex-col justify-center items-center text-center md:w-1/2 py-[0px] px-[50px]`}
                style={{
                    background: bgColors[`${theme}-primary-bg-color-0`]
                }}>

                <img src={appConfig.BRAND_LOGO || ""} alt="" className="w-[100px] h-[100px] p-[12px] rounded-[56px]" />

                <p className="heading-para ">
                    {contentConfig?.login?.heading}
                </p>

                <p className="desc-para text-[#E0E0E0]">
                    {contentConfig?.login?.description}
                </p>

            </div>

            {/* right side */}
            <div
                className="w-full md:w-1/2"
                style={{
                    background: bgColors[`${theme}-primary-bg-color-1`],
                    height: '100vh'
                }}
            >
                {children}
            </div>
        </div>
    )
}