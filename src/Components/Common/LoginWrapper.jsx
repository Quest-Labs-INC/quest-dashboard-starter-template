import { useContext } from "react";
import { importConfig } from "../../assets/Config/importConfig";
import { ThemeContext } from "./appContext";

export default function LoginWrapper({ children }) {
    const { appConfig, theme, bgColors, contentConfig } = useContext(ThemeContext)

    return (
        <div className="flex h-screen">
            <div
                className={`hidden md:flex flex-col justify-center items-center text-center md:w-1/2 py-7 px-4`}
                style={{
                    background: bgColors[`${theme}-primary-bg-color-0`]
                }}>
                <img src={appConfig.BRAND_LOGO || ""} alt="" className="w-12 mb-3" />
                <p className="text-customShade-200 font-semibold text-xl">
                    {contentConfig?.login?.heading}
                </p>
                <p className="text-[#E0E0E0]">
                    {contentConfig?.login?.description}
                </p>
            </div>
            
            {/* right side */}
            <div 
                className="w-full md:w-1/2"
                style={{
                    background: bgColors[`${theme}-primary-bg-color-1`]
                }}
            >
                {children}
            </div>
        </div>
    )
}