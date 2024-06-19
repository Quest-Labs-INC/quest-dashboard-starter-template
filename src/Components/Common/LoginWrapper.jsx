import { useContext } from "react";
import { importConfig } from "../../assets/Config/importConfig";
import { ThemeContext } from "./AppContext";

export default function LoginWrapper({ children }) {
    const { appConfig, theme, bgColors, contentConfig } =
        useContext(ThemeContext);

    return (
        <div className="flex h-screen">
            <div
                className={`hidden md:flex flex-col justify-center items-center text-center md:w-1/2 py-7 px-4`}
                style={{
                    background: bgColors[`${theme}-primary-bg-color-0`],
                }}
            >
                <div className="w-[100px] h-[100px] rounded-[56px] overflow-hidden">
                    <img
                        src={appConfig.BRAND_LOGO || ""}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>

                <p className="text-center text-3xl font-semibold font-['Figtree'] mt-6 text-white">
                    {contentConfig?.login?.heading}
                </p>
                <p className="text-center text-xl font-normal font-['Figtree'] leading-[30px] text-[#E0E0E0]">
                    {contentConfig?.login?.description}
                </p>
            </div>

            {/* right side */}
            <div
                className="w-full md:w-1/2"
                style={{
                    background: bgColors[`${theme}-primary-bg-color-2`],
                    height: "100vh",
                }}
            >
                {children}
            </div>
        </div>
    );
}
