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
import { ThemeContext } from "../../Components/Common/appContext";
import MainPage from "../../Components/MainPage/MainPage";
import { QuestProvider } from "@questlabs/react-sdk";
import {
    AdminSvg,
    GetStartedSvg,
    InsightsSvg,
    SettingsSvg,
    Switch,
    UsersSvg,
    referal,
} from "../../Components/Common/SideBarSvg";

const ProviderConfig = ({children}) => {
    const { theme, bgColors, appConfig } = useContext(ThemeContext);
    return (
        <div>
            <QuestProvider
                apiKey={appConfig?.QUEST_API_KEY}
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
            <div className='fixed right-10 bottom-10 text-xs px-4 py-2 bg-gray-700 text-white rounded-md flex items-center gap-3 cursor-pointer' onClick={() => window.open("https://questlabs.ai/")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M12 0V4L8 8V4H4V6.64083C4 7.39167 4.60833 8 5.35917 8H8L4 12C1.79083 12 0 10.2092 0 8V0H12Z" fill="white"/>
                <path d="M12 8L8 8L8 12H12V8Z" fill="white"/>
              </svg>
              <p>Powered by Quest Labs</p>
            </div>
        </div>
    )
}

export const routesConfig = [
    // {
    //     path: "/",
    //     name: "Home",
    //     logo: "",
    //     component: <Home />,
    //     hidden: true,
    // },
    {
        path: "/create",
        name: "Create Template",
        logo: "",
        component: <MainPage/>,
        hidden: true,
    },
    {
        path: "*",
        name: "Create Template",
        logo: "",
        component: <MainPage/>,
        hidden: true,
    },
    {
        path: "/login",
        name: "Login",
        logo: "",
        component: <ProviderConfig><LoginWrapper><Login /></LoginWrapper></ProviderConfig>,
        hidden: true,
    },
    {
        path: "/onboarding",
        name: "Onboarding",
        logo: "",
        component: <ProviderConfig><LoginWrapper><Onboarding /></LoginWrapper></ProviderConfig>,
        hidden: true,
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        logo: GetStartedSvg(),
        component: <ProviderConfig><DashboardWrapper selectdRoute={"Dashboard"}><Dashboard></Dashboard></DashboardWrapper></ProviderConfig>,
        hidden: false,
    },
    {
        path: "/insights",
        name: "Insights",
        logo: InsightsSvg(),
        component: (
          <DashboardWrapper selectdRoute={"insights"}>
            <User></User>
          </DashboardWrapper>
        ),
        hidden: false,
    },
    {
        path: "/user",
        name: "User",
        logo: UsersSvg(),
        component: <ProviderConfig><DashboardWrapper selectdRoute={"User"}><User></User></DashboardWrapper></ProviderConfig>,
        hidden: false,
    },
    {
        path: "/admin",
        name: "Admin",
        logo: AdminSvg(),
        component: <ProviderConfig><DashboardWrapper selectdRoute={"Admin"}><Admin></Admin></DashboardWrapper></ProviderConfig>,
        hidden: false,
        adminPermission: true,
    },
    {
        path: "/settings",
        name: "Settings",
        logo: SettingsSvg(),
        component: <ProviderConfig><DashboardWrapper selectdRoute={"Settings"}><Settings></Settings></DashboardWrapper></ProviderConfig>,
        hidden: false,
    },
]
