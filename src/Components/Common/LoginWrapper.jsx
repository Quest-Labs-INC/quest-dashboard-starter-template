import { useContext } from "react";
import { importConfig } from "../../assets/Config/importConfig";
import { ThemeContext } from "./AppContext";
import "./LoginWrapper.css";

export default function LoginWrapper({ children }) {
    const { appConfig, theme, bgColors, contentConfig } =
        useContext(ThemeContext);

    return (
        <div className="login-wrapper flex h-screen">
            <div
                className={`hidden gap-[8px] md:flex flex-col justify-center items-center text-center md:w-1/2 py-[0px] px-[50px]`}
                style={{
                    background: bgColors[`${theme}-primary-bg-color-0`],
                }}
            >
                <img
                    src={appConfig.BRAND_LOGO || ""}
                    alt=""
                    className="w-[100px] h-[100px] rounded-[56px]"
                />

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
                    background: bgColors[`${theme}-primary-bg-color-3`],
                    height: "100vh",
                }}
            >
                {children}
            </div>
        </div>
    );
}
