import Admin from "../../Components/Admin/Admin";
import DashboardWrapper from "../../Components/Common/DashboardWrapper";
import DashboardWrapper2 from "../../Components/Common/DashboardWrapper2";
import LoginWrapper from "../../Components/Common/LoginWrapper";
import { AdminSvg, GetStartedSvg, InsightsSvg, SettingsSvg, Switch, UsersSvg } from "../../Components/Common/SideBarSvg";
import Dashboard from "../../Components/Dashboard/Dashboard";
import Home from "../../Components/Home/Home";
import Login from "../../Components/Login/Login";
import Onboarding from "../../Components/Onboarding/Onboarding";
import Settings from "../../Components/Settings/Settings";
import User from "../../Components/User/User";
import { importConfig } from "./importConfig";





export const routesConfig = [
    {
        path: "/",
        name: "Home",
        logo: "",
        component: <Home/>,
        hidden: true,
    },
    {
        path: "/login",
        name: "Login",
        logo: "",
        component: <LoginWrapper><Login/></LoginWrapper>,
        hidden: true,
    },
    {
        path: "/onboarding",
        name: "Onboarding",
        logo: "",
        component: <LoginWrapper><Onboarding/></LoginWrapper>,
        hidden: true,
    },
    {
        path: "/dashboard",
        name: "Get Started",
        logo:
         GetStartedSvg() ,
        //  importConfig.routesIcons.dashboardIcon,
        component: <DashboardWrapper2 selectdRoute={"Dashboard"}><Dashboard></Dashboard></DashboardWrapper2>,
        hidden: false,
    },
    {
        path: "/insights",
        name: "Insights",
        logo: InsightsSvg(),
        component: <DashboardWrapper2 selectdRoute={"insights"}><User></User></DashboardWrapper2>,
        hidden: false,
    },
    {
        path: "/user",
        name: "User",
        logo: UsersSvg(),
        component: <DashboardWrapper2 selectdRoute={"User"}><User></User></DashboardWrapper2>,
        hidden: false,
    },
    {
        path: "/admin",
        name: "Admin",
        logo: AdminSvg(),
        component: <DashboardWrapper2 selectdRoute={"Admin"}><Admin></Admin></DashboardWrapper2>,
        hidden: false,
        adminPermission: true,
    },

    {
        path: "/settings",
        name: "Settings",
        logo: SettingsSvg(),
        component: <DashboardWrapper2 selectdRoute={"Settings"}><Settings></Settings></DashboardWrapper2>,
        hidden: false,
    },
]
