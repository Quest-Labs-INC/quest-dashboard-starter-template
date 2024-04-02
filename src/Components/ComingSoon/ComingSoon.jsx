import { useContext } from "react";
import { importConfig } from "../../assets/Config/importConfig";
import { Link } from "react-router-dom";
import { mainConfig } from "../../assets/Config/appConfig";
import { ThemeContext } from "../Common/AppContext";

export default function ComingSoon() {
  const { theme, bgColors, appConfig } = useContext(ThemeContext);

    return (
        <div className="w-full h-full flex items-center justify-center min-h-[calc(100vh-100px)]">
            <div 
                className="p-8 rounded-lg"
                style={{
                    color: bgColors[`${theme}-color-premitive-grey-5`]
                }}
            >
                <p>Go to the github repo for this dashbaord and add your app code</p>
                <ul className="list-disc list-inside">
                    <li onClick={() => window.open(`${mainConfig.QUEST_ENTITY_ID}/admin`, "_blank")} className="text-sm cursor-pointer">Admin Panel</li>
                    <li onClick={() => window.open("https://github.com/Quest-Labs-INC/quest-dashboard-starter-template", "_blank")} className="text-sm cursor-pointer">Github Repo</li>
                </ul>
            </div>
        </div>
    );
}