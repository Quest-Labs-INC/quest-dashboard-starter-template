import React, { createContext, useEffect, useState } from "react";
import { generalFunction } from "../../assets/Config/GeneralFunction";
import axios from "axios";

export const ThemeContext = createContext();

const AppContext = ({ children }) => {
  const [appConfig, setAppConfig] = useState({
    QUEST_ENTITY_ID: "e-afeba161-2835-4b86-918d-141cce2aad09",
    QUEST_ENTITY_NAME: "",
    BRAND_LOGO: "",
    QUEST_API_KEY: "k-beb3cb24-48fb-410f-9c88-6c71373e0848",
    QUEST_ONBOARDING_QUIZ_CAMPAIGN_ID: "q-saas-onboarding-quiz",
    GOOGLE_REDIRECT_URI: "",
    GOOGLE_CLIENT_ID: "",
    QUEST_GET_STARTED_CAMPAIGN_ID: "q-saas-get-started",
    QUEST_SEARCH_BAR_CAMPAIGN_ID: "q-saas-search-bar",
    QUEST_REFERRAL_CAMPAIGN_ID: "q-saas-referral",
    QUEST_BASE_URL: "https://staging.questprotocol.xyz/",
  });
  const [contentConfig, setContentConfig] = useState({
    login: {
      heading: "",
      description: "",
    },
  });
  const [theme, setTheme] = useState("dark");

  const [bgColors, setBgColors] = useState({
    "dark-color-premitive-grey-0": "#afafaf",
    "dark-color-premitive-grey-5": "#ffffff",

    "dark-primary-bg-color-0": "#111018", // "#1c1a27"
    "dark-primary-bg-color-1": "#1c1a27", // "#fbfafe"
    "dark-primary-bg-color-2": "#111018",
    "dark-primary-bg-color-3": "#1c1a27",
    "dark-primary-bg-color-4": "#3e3a58",

    "dark-primary-tile-color-0": "#f0fcec",
    "dark-primary-border-color": "#455a64",

    "light-color-premitive-grey-0": "#afafaf",
    "light-color-premitive-grey-5": "#2e425c",

    "light-primary-bg-color-0": "#7B68EE", // login page left side
    "light-primary-bg-color-1": "#ffffff", // login page right side #edf3ff
    "light-primary-bg-color-2": "#e4e9f7", // navbar and components background color
    "light-primary-bg-color-3": "#ffffff", // dashboard background color
    "light-primary-bg-color-4": "#ffffff", // input background color

    "light-primary-tile-color-0": "#d7f1f",
    "light-primary-tile-color": "#9a7ada",
  });

  useEffect(() => {
    const getTheme = () => {
      let theme = localStorage.getItem("theme");

      if (theme && theme == "dark") {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    };

    getTheme();
  }, [theme]);

  useEffect(() => {
    const fetchEntityDetails = async () => {
      try {
        let request = `${appConfig.QUEST_BASE_URL}api/entities/${appConfig.QUEST_ENTITY_ID}`;
        await fetch(request, {
          headers: {
            apikey: appConfig.QUEST_API_KEY || data?.data?.key,
            entityId: appConfig.QUEST_ENTITY_ID,
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
            setAppConfig({
              ...appConfig,
              BRAND_LOGO:
                apiData?.saasDashboard?.dashboardConfig?.imageUrl ||
                apiData?.imageUrl,
              QUEST_ENTITY_NAME: apiData?.name,
            });

            setBgColors({
              ...bgColors,
              "light-primary-bg-color-0":
                apiData?.saasDashboard?.dashboardConfig?.colorConfig,
            });
          });
      } catch (error) {
        console.log(error);
      }
    };

    if (!contentConfig.login.heading) {
      fetchEntityDetails(appConfig.QUEST_ENTITY_ID);
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
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default AppContext;
