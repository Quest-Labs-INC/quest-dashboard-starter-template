import Admin from "../../Components/Admin/Admin";
import DashboardWrapper from "../../Components/Common/DashboardWrapper";
import LoginWrapper from "../../Components/Common/LoginWrapper";
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
      <LoginWrapper>
        <Login />
      </LoginWrapper>
    ),
    hidden: true,
    isUpper: false,
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
    isUpper: false,
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
    isUpper: false,
  },
  {
    path: "/dashboard",
    name: "Get Started",
    logo: GetStartedSvg(),
    //  importConfig.routesIcons.dashboardIcon,
    component: (
      <DashboardWrapper selectdRoute={"Dashboard"}>
        <Dashboard></Dashboard>
      </DashboardWrapper>
    ),
    hidden: false,
    isUpper: true,
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
    isUpper: true,
  },
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
    isUpper: true,
  },
];
