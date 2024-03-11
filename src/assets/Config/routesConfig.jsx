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
    explore,
    newHome,
    referFriends,
    referal,
} from "../../Components/Common/SideBarSvg";
import ReferralPage from "../../Components/Referral/ReferralPage";

const ProviderConfig = ({ children }) => {
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
        component: <MainPage />,
        hidden: true,
    },
    {
        path: "*",
        name: "Create Template",
        logo: "",
        component: <MainPage />,
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
    {
        path: "/settings",
        name: "Settings",
        logo: SettingsSvg(),
        component: <ProviderConfig><DashboardWrapper selectdRoute={"Settings"}><Settings></Settings></DashboardWrapper></ProviderConfig>,
        hidden: false,
    },
]


export const routesConfigUpper = [
    // {
    //   path: "/",
    //   name: "Home",
    //   logo: "",
    //   component: <Home />,
    //   hidden: true,
    // },
    {
        path: "/login",
        name: "Login",
        logo: "",
        component: (
            <LoginWrapper>
                <Login />
            </LoginWrapper>
        ),
        hidden: true,
    },
    {
        path: "*",
        name: "Login",
        logo: "",
        component: (
            <LoginWrapper>
                <Login />
            </LoginWrapper>
        ),
        hidden: true,
    },
    {
        path: "/onboarding",
        name: "Onboarding",
        logo: "",
        component: (
            <LoginWrapper>
                <Onboarding />
            </LoginWrapper>
        ),
        hidden: true,
    },
    {
        path: "/dashboard",
        name: "Getting Started",
        logo: newHome(),
        //  importConfig.routesIcons.dashboardIcon,
        component: (
            <DashboardWrapper selectdRoute={"Dashboard"}>
                <Dashboard></Dashboard>
            </DashboardWrapper>
        ),
        hidden: false,
    },
    {
        path: "/insights",
        name: "Explore",
        logo: explore(),
        component: (
            <DashboardWrapper selectdRoute={"insights"}>
                <User></User>
            </DashboardWrapper>
        ),
        hidden: false,
    },
    // {
    //   path: "/user",
    //   name: "User",
    //   logo: UsersSvg(),
    //   component: (
    //     <DashboardWrapper selectdRoute={"User"}>
    //       <User></User>
    //     </DashboardWrapper>
    //   ),
    //   hidden: false,
    // },
    // {
    //   path: "/admin",
    //   name: "Admin",
    //   logo: AdminSvg(),
    //   component: (
    //     <DashboardWrapper selectdRoute={"Admin"}>
    //       <Admin></Admin>
    //     </DashboardWrapper>
    //   ),
    //   hidden: false,
    //   adminPermission: true,
    // },

    {
        path: "/settings",
        name: "Settings",
        logo: SettingsSvg(),
        component: (
            <DashboardWrapper selectdRoute={"Settings"}>
                <Settings></Settings>
            </DashboardWrapper>
        ),
        hidden: false,
    },
    {
        path: "/referpage",
        name: "Refer Friends",
        logo: referFriends(),
        component: (
            <DashboardWrapper selectdRoute={"referpage"}>
                <ReferralPage></ReferralPage>
            </DashboardWrapper>
        ),
        hidden: false,
    },

];