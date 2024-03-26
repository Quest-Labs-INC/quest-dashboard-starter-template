import Admin from "../../Components/Admin/Admin";
import DashboardWrapper from "../../Components/Common/DashboardWrapper";
import LoginWrapper from "../../Components/Common/LoginWrapper";
import { ProviderConfig } from "../../Components/Common/ProviderConfig";
import {
    AdminSvg,
    GetStartedSvg,
    InsightsSvg,
    SettingsSvg,
    Switch,
    UsersSvg,
    referal,
} from "../../Components/Common/SideBarSvg";
import Dashboard from "../../Components/Dashboard/Dashboard";
import Home from "../../Components/Home/Home";
import Login from "../../Components/Login/Login";
import Onboarding from "../../Components/Onboarding/Onboarding";
import ReferralPopup from "../../Components/Referral/ReferralPopup";
import Settings from "../../Components/Settings/Settings";
import User from "../../Components/User/User";
import { importConfig } from "./importConfig";

export const routesConfig = [
    {
        path: "/login",
        name: "Login",
        logo: "",
        component: (
            <ProviderConfig showTag={true}>
                <LoginWrapper>
                    <Login />
                </LoginWrapper>
            </ProviderConfig>
        ),
        hidden: true,
        isUpper: false,
    },
    {
        path: "*",
        name: "Login",
        logo: "",
        component: (
            <ProviderConfig showTag={true}>
                <LoginWrapper>
                    <Login />
                </LoginWrapper>
            </ProviderConfig>
        ),
        hidden: true,
        isUpper: false,
    },
    {
        path: "/onboarding",
        name: "Onboarding",
        logo: "",
        component: (
            <ProviderConfig showTag={true}>
                <LoginWrapper>
                    <Onboarding />
                </LoginWrapper>
            </ProviderConfig>
        ),
        hidden: true,
        isUpper: false,
    },
    {
        path: "/dashboard",
        name: "Get Started",
        logo: GetStartedSvg(),
        //  importConfig.routesIcons.dashboardIcon,
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
        name: "Insights",
        logo: InsightsSvg(),
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
];
