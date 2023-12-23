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
        name: "Dashboard",
        logo: importConfig.routesIcons.dashboardIcon,
        component: <DashboardWrapper selectdRoute={"Dashboard"}><Dashboard></Dashboard></DashboardWrapper>,
        hidden: false,
    },
    {
        path: "/user",
        name: "User",
        logo: importConfig.routesIcons.userIcon,
        component: <DashboardWrapper selectdRoute={"User"}><User></User></DashboardWrapper>,
        hidden: false,
    },
    {
        path: "/admin",
        name: "Admin",
        logo: importConfig.routesIcons.adminIcon,
        component: <DashboardWrapper selectdRoute={"Admin"}><Admin></Admin></DashboardWrapper>,
        hidden: false,
        adminPermission: true,
    },
    {
        path: "/settings",
        name: "Settings",
        logo: importConfig.routesIcons.settingIcon,
        component: <DashboardWrapper selectdRoute={"Settings"}><Settings></Settings></DashboardWrapper>,
        hidden: false,
    },
]
