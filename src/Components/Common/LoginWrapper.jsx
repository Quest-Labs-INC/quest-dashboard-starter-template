import { useContext } from "react";
// import { contentConfig } from "../../assets/Config/appConfig";
import { importConfig } from "../../assets/Config/importConfig";
import { ThemeContext } from "../../App";



export default function LoginWrapper({ children }) {
    const { theme, bgColors, contentConfig } = useContext(ThemeContext)


    return (
        <div className="flex h-screen">
            <div
                className={`hidden md:flex flex-col justify-center items-center text-center md:w-1/2 py-7 px-4`}
                style={{
                    backgroundColor: bgColors[`${theme}-primary-bg-color-0`]
                }}>
                <img src={importConfig.brandLogo} alt="" className="w-12 mb-3" />
                <p className="text-customShade-200 font-semibold text-xl">
                    {contentConfig?.login?.heading}
                </p>
                <p className="text-customShade-500">
                    {contentConfig?.login?.description}
                </p>
            </div>


            {/* right side */}
            <div className="w-full md:w-1/2 bg-customShade-2">
                {children}
            </div>
        </div>
    )
}