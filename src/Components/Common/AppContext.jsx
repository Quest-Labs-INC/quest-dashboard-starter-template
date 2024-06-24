import React, { createContext, useEffect, useState } from "react";
import { generalFunction } from "../../assets/Config/generalFunction";
import axios from "axios";
import { mainConfig } from "../../assets/Config/appConfig";

export const ThemeContext = createContext();


const AppContext = ({ children }) => {
    const [appConfig, setAppConfig] = useState({
        QUEST_ENTITY_NAME: localStorage.getItem("entityName") || "",
        BRAND_LOGO: localStorage.getItem("brandlogo") || "",
        QUEST_ONBOARDING_QUIZ_CAMPAIGN_ID: "c-985380ca-9dcd-42ee-bc4e-225e9b5ebb69",
        QUEST_COMPANY_ONBOARDING_QUIZ_CAMPAIGN_ID: "c-2dcfd9c0-2553-47fe-a7b6-3e189fb73e9a",
        QUEST_GET_STARTED_CAMPAIGN_ID: "q-saas-get-started",
        QUEST_SEARCH_BAR_CAMPAIGN_ID: "q-saas-search-bar",
        QUEST_REFERRAL_CAMPAIGN_ID: "c-6efa05f5-a517-4509-959f-0ac4d7ffb967",
        QUEST_SEARCH_BAR_CAMPAIGN_ID: "q-saas-search-bar",
        QUEST_FEEDBACK_WORKFLOW_CAMPAIGN_ID: "c-54595371-a90f-41e6-8d28-5f84f6fcf925"
    });
    const [contentConfig, setContentConfig] = useState({
        login: {
            heading: localStorage.getItem("heading") || "",
            description: localStorage.getItem("description") || "",
        },
    });
    const [theme, setTheme] = useState("dark");

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
        const fetchEntityDetails = async () => {
            try {
                let request = `${mainConfig.QUEST_BASE_URL}api/entities/${mainConfig.QUEST_ENTITY_ID}`;
                await fetch(request, {
                    headers: {
                        apikey: mainConfig.QUEST_API_KEY || data?.data?.key,
                        entityId: mainConfig.QUEST_ENTITY_ID,
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        let apiData = data.data;
                        // console.log("99 data", data);
                        setContentConfig({
                            ...contentConfig,
                            login: {
                                heading:
                                    apiData?.saasDashboard?.dashboardConfig
                                        ?.title,
                                description:
                                    apiData?.saasDashboard?.dashboardConfig
                                        ?.description,
                            },
                        });
                        setBgColors({
                            ...bgColors,
                            "light-primary-bg-color-0":
                                apiData?.saasDashboard?.dashboardConfig
                                    ?.colorConfig,
                            "dark-primary-bg-color-0":
                                apiData?.saasDashboard?.dashboardConfig
                                    ?.colorConfig,
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
                            apiData?.saasDashboard?.dashboardConfig?.name || apiData?.name
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
                                apiData?.saasDashboard?.dashboardConfig
                                    ?.imageUrl || apiData?.imageUrl,
                            QUEST_ENTITY_NAME: apiData?.name,
                            QUEST_ENTITY_ID: apiData?.id,
                        });
                    });
            } catch (error) {
                console.log(error);
            }
        };

        if (!contentConfig.login.heading) {
            fetchEntityDetails(mainConfig.QUEST_ENTITY_ID);
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
