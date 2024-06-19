import React, { createContext, useEffect, useState } from "react";
import { generalFunction } from "../../assets/Config/generalFunction";
import axios from "axios";
import { mainConfig } from "../../assets/Config/appConfig";
import { Toast } from "@questlabs/react-sdk";

export const ThemeContext = createContext();

const AppContext = ({ children }) => {
  const [appConfig, setAppConfig] = useState({
    QUEST_ENTITY_ID:
      generalFunction.getDataFromCookies("adminCommunityId") ||
      generalFunction.getDataFromLocalStorage("adminCommunityId"),
    QUEST_API_KEY:
      generalFunction.getDataFromCookies("apiKey") ||
      generalFunction.getDataFromLocalStorage("apiKey"),
    QUEST_ENTITY_NAME: localStorage.getItem("entityName") || "",
    BRAND_LOGO: localStorage.getItem("brandlogo") || "",
    GOOGLE_REDIRECT_URI: "",
    GOOGLE_CLIENT_ID: "",
    QUEST_ONBOARDING_QUIZ_CAMPAIGN_ID: "q-saas-onboarding-quiz",
    QUEST_GET_STARTED_CAMPAIGN_ID: "q-saas-get-started",
    QUEST_REFERRAL_CAMPAIGN_ID: "q-saas-referral",
    QUEST_SEARCH_BAR_CAMPAIGN_ID: "q-saas-search-bar",
    QUEST_FEEDBACK_WORKFLOW_CAMPAIGN_ID: "q-saas-feedback-workflow",
    QUEST_HELPHUB_CAMPAIGN_ID: "q-saas-helphub",
    CALENDLY_LINK: "",
  });
  const [contentConfig, setContentConfig] = useState({
    login: {
      heading: localStorage.getItem("heading") || "",
      description: localStorage.getItem("description") || "",
    },
  });
  const [bgColors, setBgColors] = useState({
      "dark-color-premitive-grey-0": "#afafaf",
      "dark-color-premitive-grey-5": "#ffffff",
      "dark-primary-bg-color-0":
          localStorage.getItem("themeColor") || "#111018", // "#1c1a27"
      "dark-primary-bg-color-1": "#1c1a27", // "#fbfafe"
      "dark-primary-bg-color-2": "#0D0D0D", 
      "dark-primary-bg-color-3": "#121212", // "#1c1a27"
      "dark-primary-bg-color-4": "#3e3a58",
      "dark-primary-tile-color-0": "#f0fcec",
      "dark-primary-border-color": "rgba(255, 255, 255, 0.20)",

      "dark-color-premitive-grey-5": "var(--Neutral-Black-400, #ffffff)",
      "dark-color-premitive-grey-6": "var(--Neutral-Black-400, #ffffff)",
      "dark-color-premitive-grey-7": "var(--Neutral-Black-400, #ffffff)",
      "dark-color-premitive-grey-8": "var(--Neutral-Black-400, #ffffff)",
      "dark-color-premitive-grey-9": "var(--Neutral-Black-400, #ffffff)",
      "dark-primary-bg-color-7": "#1c1a27",
      "dark-primary-bg-color-8": "#1c1a27",
      "dark-primary-bg-color-9": "rgba(255, 255, 255, 0.08)",

      "light-color-premitive-grey-0": "#afafaf",
      "light-primary-bg-color-0":
          localStorage.getItem("themeColor") || "#7B68EE", // login page left side
      "light-primary-bg-color-1": "#ffffff", // login page right side #edf3ff
      "light-primary-bg-color-2": "#e4e9f7", // navbar and components background color
      "light-primary-bg-color-3": "#ffffff", // dashboard background color
      "light-primary-bg-color-4": "#ffffff", // input background color
      "light-primary-tile-color-0": "#d7f1f",
      "light-primary-tile-color": "#9a7ada",
      "light-primary-border-color": "rgba(13, 13, 13, 0.08)",

      "light-color-premitive-grey-5": "var(--Neutral-Black-400, #2C2C2C)",
      "light-color-premitive-grey-6": "var(--Neutral-Black-400, #4C4C4C)",
      "light-color-premitive-grey-7": "var(--Neutral-Black-400, #252525)",
      "light-color-premitive-grey-8": "var(--Neutral-Black-500, #0D0D0D)",
      "light-color-premitive-grey-9":
          "var(--Perks-Color-Palette-Secondary-Black-Black---900, #141414)",
      "light-primary-bg-color-7": "var(--Neutral-White-200, #FBFBFB)",
      "light-primary-bg-color-8": "var(--Neutral-White-200, #FCFCFD)",
      "light-primary-bg-color-9": "#EFEFEF",
  });
  const [theme, setTheme] = useState("dark");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const getTheme = () => {
      let theme = localStorage.getItem("theme");
      if (theme && theme == "dark") {
        setTheme("dark");
        localStorage.setItem("theme", "dark");
        document.getElementsByTagName("BODY")[0].classList.add("dark");
        setChecked(false);
      } else {
        setTheme("light");
        localStorage.setItem("theme", "light");
        setChecked(true);
      }
    };

    getTheme();
  }, [theme]);

  useEffect(() => {
    const fetchEntityDetails = async (paramEntityId) => {
      let entityId =
        generalFunction.getDataFromCookies("adminCommunityId") ||
        generalFunction.getDataFromLocalStorage("adminCommunityId");
      try {
        let apiKeyRequest = generalFunction.createUrl(
          `api/entities/${entityId}/keys?userId=${generalFunction.getDataFromCookies(
            "questUserId"
          )}`
        );
        let apiKeyResponse = await axios.get(apiKeyRequest.url, {
          headers: apiKeyRequest.headers,
        });
        const data = apiKeyResponse.data;
        if (data.success == false) {
          let errMsg = data.error
            ? data.error
            : "Unable to Get Developer Details";
          Toast.error({text: "Error Occurred" + "\n" + errMsg});
        }
        generalFunction.setDataInCookies("apiKey", data?.data?.key);

        let request = `${
          mainConfig.BACKEND_URL
        }api/entities/${paramEntityId}?userId=${generalFunction.getDataFromCookies(
          "questUserId"
        )}`;
        await fetch(request, {
          headers: {
            apikey:
              generalFunction.getDataFromCookies("apikey") || data?.data?.key,
            entityId: paramEntityId,
            userId: generalFunction.getDataFromCookies("questUserId"),
          },
        })
          .then((res) => res.json())
          .then((data) => {
            let apiData = data.data;
            setContentConfig({
              ...contentConfig,
              login: {
                heading: apiData?.saasDashboard?.dashboardConfig?.title,
                description:
                  apiData?.saasDashboard?.dashboardConfig?.description,
              },
            });
            
            setBgColors({
              ...bgColors,
              "light-primary-bg-color-0":
                apiData?.saasDashboard?.dashboardConfig?.colorConfig,
              "dark-primary-bg-color-0":
                apiData?.saasDashboard?.dashboardConfig?.colorConfig,
            });
            localStorage.setItem(
              "themeColor",
              apiData?.saasDashboard?.dashboardConfig?.colorConfig
            );
            localStorage.setItem(
              "brandlogo",
              apiData?.saasDashboard?.dashboardConfig?.imageUrl ||
                apiData?.imageUrl
            );
            localStorage.setItem(
              "entityName",
              apiData?.saasDashboard?.dashboardConfig?.name
            );
            localStorage.setItem(
              "heading",
              apiData?.saasDashboard?.dashboardConfig?.title
            );
            localStorage.setItem(
              "description",
              apiData?.saasDashboard?.dashboardConfig?.description
            );
            setAppConfig({
              ...appConfig,
              BRAND_LOGO:
                apiData?.saasDashboard?.dashboardConfig?.imageUrl ||
                apiData?.imageUrl,
              QUEST_ENTITY_NAME: apiData?.name,
              QUEST_ENTITY_ID: apiData?.id,
            });
          });
      } catch (error) {
        console.log(error);
      }
    };

    if (
      generalFunction.getDataFromCookies("questUserId") &&
      !contentConfig.login.heading
    ) {
      fetchEntityDetails(
        generalFunction.getDataFromCookies("adminCommunityId")
      );
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        bgColors,
        appConfig,
        setAppConfig,
        contentConfig,
        setContentConfig,
        checked,
        setChecked,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default AppContext;
