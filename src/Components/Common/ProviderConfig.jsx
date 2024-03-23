import { QuestProvider } from "@questlabs/react-sdk";
import { useContext } from "react";
import { ThemeContext } from "./AppContext";
import { mainConfig } from "../../assets/Config/appConfig";

export const ProviderConfig = ({ children }) => {
  const { theme, bgColors, appConfig } = useContext(ThemeContext);
  return (
    <div>
      <QuestProvider
        apiKey={mainConfig?.QUEST_API_KEY}
        entityId={mainConfig?.QUEST_ENTITY_ID}
        apiType="STAGING"
        themeConfig={{
          buttonColor: bgColors[`${theme}-primary-bg-color-0`],
          primaryColor: bgColors[`${theme}-color-premitive-grey-5`],
          // backgroundColor: "transparent",
        }}
      >
        {children}
      </QuestProvider>
      <div
        className="fixed right-10 bottom-10 text-xs px-4 py-2 bg-gray-700 text-white rounded-md flex items-center cursor-pointer gap-3"
        onClick={() => window.open("https://www.questlabs.ai/")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M12 0V4L8 8V4H4V6.64083C4 7.39167 4.60833 8 5.35917 8H8L4 12C1.79083 12 0 10.2092 0 8V0H12Z"
            fill="white"
          />
          <path d="M12 8L8 8L8 12H12V8Z" fill="white" />
        </svg>
        <p>Powered by Quest Labs</p>
      </div>
    </div>
  );
};
