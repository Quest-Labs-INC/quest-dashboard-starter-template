import { useContext } from "react";
import Admin from "../../Components/Admin/Admin";
import DashboardWrapper from "../../Components/Common/DashboardWrapper";
import LoginWrapper from "../../Components/Common/LoginWrapper";
import Dashboard from "../../Components/Dashboard/Dashboard";
import Home from "../../Components/Home/Home";
import Login from "../../Components/Login/Login";
import Onboarding from "../../Components/Onboarding/Onboarding";
import Settings from "../../Components/Settings/Settings";
import User from "../../Components/User/User";
import { importConfig } from "./importConfig";
import { ThemeContext } from "../../Components/Common/AppContext";
import MainPage from "../../Components/MainPage/MainPage";
import { QuestProvider } from "@questlabs/react-sdk";
import {
    AdminSvg,
    GetStartedSvg,
    InsightsSvg,
    SettingsSvg,
    Switch,
    UsersSvg,
    explore,
    newHome,
    referFriends,
    referal,
} from "../../Components/Common/SideBarSvg";
import ReferralPage from "../../Components/Referral/ReferralPage";
import ReferalPage2 from "../../Components/Referral/ReferalPage2";

const ProviderConfig = ({ children, showTag }) => {
    const { theme, bgColors, appConfig } = useContext(ThemeContext);
    return (
        <div>
            <QuestProvider
                apiKey={appConfig?.QUEST_API_KEY }
                entityId={appConfig?.QUEST_ENTITY_ID}
                apiType='STAGING'
                themeConfig={{
                    buttonColor: bgColors[`${theme}-primary-bg-color-0`],
                    primaryColor: bgColors[`${theme}-color-premitive-grey-5`],
                    // backgroundColor: "transparent",
                }}
            >
                {children}
            </QuestProvider>
            {
                showTag &&
                <div className='fixed right-[calc(25%-80px)] bottom-14 text-xs px-4 py-2 text-[#939393] rounded-md flex items-center gap-3 cursor-pointer' onClick={() => window.open("https://questlabs.ai/")}>
                    <p>Powered by Quest Labs</p>
                </div>
            }
        </div>
    )
}

export const routesConfig = [
    {
        path: "/create",
        name: "Create Template",
        logo: "",
        component: <MainPage/>,
        hidden: true,
        isUpper: false,
    },
    {
        path: "*",
        name: "Create Template",
        logo: "",
        component: <MainPage/>,
        hidden: true,
        isUpper: false,
    },
    {
        path: "/login",
        name: "Login",
        logo: "",
        component: <ProviderConfig showTag={true}><LoginWrapper><Login/></LoginWrapper></ProviderConfig>,
        hidden: true,
        isUpper: false,
    },
    {
        path: "/onboarding",
        name: "Onboarding",
        logo: "",
        component: <ProviderConfig showTag={false}><LoginWrapper><Onboarding/></LoginWrapper></ProviderConfig>,
        hidden: true,
        isUpper: false,
    },
    {
        path: "/dashboard",
        name: "Getting Started",
        logo: GetStartedSvg(),
        component: (
            <ProviderConfig showTag={false}>
                <DashboardWrapper selectdRoute={"Dashboard"}>
                    <Dashboard></Dashboard>
                </DashboardWrapper>
            </ProviderConfig>
        ),
        hidden: false,
        isUpper: true,
    },
    {
        path: "/insights",
        name: "Explore",
        logo: explore(),
        component: (
            <ProviderConfig showTag={false}>
                <DashboardWrapper selectdRoute={"insights"}>
                    <User></User>
                </DashboardWrapper>
            </ProviderConfig>
        ),
        hidden: false,
        isUpper: true,
    },
    {
        path: "/settings",
        name: "Settings",
        logo: SettingsSvg(),
        component: (
            <ProviderConfig showTag={false}>
                <DashboardWrapper selectdRoute={"Settings"}>
                    <Settings></Settings>
                </DashboardWrapper>
            </ProviderConfig>
        ),
        hidden: false,
        isUpper: true,
    },
    {
        path: "/referal",
        name: "Refer Friends",
        logo: referFriends(),
        component: (
            <ProviderConfig showTag={false}>
                <DashboardWrapper selectdRoute={"referal"}>
                    <ReferalPage2></ReferalPage2>
                </DashboardWrapper>
            </ProviderConfig>
        ),
        hidden: false,
        isUpper: true,
    },
];
