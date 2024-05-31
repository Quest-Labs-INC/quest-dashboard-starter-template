import Admin from "../../Components/Admin/Admin";
import DashboardWrapper from "../../Components/Common/DashboardWrapper";
import LoginWrapper from "../../Components/Common/LoginWrapper";
import { ProviderConfig } from "../../Components/Common/ProviderConfig";
import {
    GetStartedSvg,
    InsightsSvg,
    SettingsSvg,
    referFriends,
} from "../../Components/Common/SideBarSvg";
import Dashboard from "../../Components/Dashboard/Dashboard";
import Login from "../../Components/Login/Login";
import Onboarding from "../../Components/Onboarding/Onboarding";
import ReferralPage from "../../Components/Referral/ReferralPage";
import Settings from "../../Components/Settings/Settings";
import ComingSoon from "../../Components/ComingSoon/ComingSoon";
import Metrics from "../../Components/DataCollection/metrics";
import DataCollection from "../../Components/DataCollection/datacollection";
import Certification from "../../Components/DataCollection/certification";
import BuyerManagement from "../../Components/DataCollection/buyerManagement";
// add SupplierManagement Component
import SupplierManagement from "../../Components/DataCollection/supplierManagement";
// add SupplierAnalytics Component
import SupplierAnalytics from "../../Components/DataCollection/supplierAnalytics";
import DataSource from "../../Components/DataCollection/datasources";
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
            <ProviderConfig showTag={false}>
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
        hidden: true,
        isUpper: true,
    },
    {
        path: "/insights",
        name: "Insights",
        logo: InsightsSvg(),
        component: (
            <ProviderConfig showTag={false}>
                <DashboardWrapper selectdRoute={"insights"}>
                    <ComingSoon></ComingSoon>
                </DashboardWrapper>
            </ProviderConfig>
        ),
        hidden: false,
        isUpper: true,
    },
    {
        path: "/metrics",
        name: "Metrics",
        logo: InsightsSvg(),
        component: (
            <ProviderConfig showTag={false}>
                <DashboardWrapper selectdRoute={"metrics"}>
                    <Metrics></Metrics>
                </DashboardWrapper>
            </ProviderConfig>
        ),
        hidden: false,
        isUpper: true,
    },
    {
        path: "/certification",
        name: "Certifications",
        logo: InsightsSvg(),
        component: (
            <ProviderConfig showTag={false}>
                <DashboardWrapper selectdRoute={"certification"}>
                    <Certification></Certification>
                </DashboardWrapper>
            </ProviderConfig>
        ),
        hidden: false,
        isUpper: true,
    },
    {
        path: "/buyermanagement",
        name: "Buyer Management",
        logo: InsightsSvg(),
        component: (
            <ProviderConfig showTag={false}>
                <DashboardWrapper selectdRoute={"buyermanagement"}>
                    <BuyerManagement></BuyerManagement>
                </DashboardWrapper>
            </ProviderConfig>
        ),
        hidden: false,
        isUpper: true,
    },
    {
        path: "/suppliermanagement",
        name: "Supplier Management",
        logo: InsightsSvg(),
        component: (
            <ProviderConfig showTag={false}>
                <DashboardWrapper selectdRoute={"suppliermanagement"}>
                    <SupplierManagement></SupplierManagement>
                </DashboardWrapper>
            </ProviderConfig>
        ),
        hidden: false,
        isUpper: true,
    },
    /* have to make routes for each supplier */
        {
        path: "/suppliermanagement/:supplier_name",
        name: "Supplier Analytics",
        logo: InsightsSvg(),
        component: (
            <ProviderConfig showTag={false}>
                <DashboardWrapper selectdRoute={"suppliermanagement"}>
                    <SupplierAnalytics></SupplierAnalytics>
                </DashboardWrapper>
            </ProviderConfig>
        ),
        hidden: true,
        isUpper: true,
    },
    {
        path: "/metrics/:data_sources",
        name: "Datasource",
        logo: InsightsSvg(),
        component: (
            <ProviderConfig showTag={false}>
                <DashboardWrapper selectdRoute={"datasources"}>
                    <DataSource></DataSource>
                </DashboardWrapper>
            </ProviderConfig>
        ),
        hidden: true,
        isUpper: true,
    },
    {
        path: "/metrics/admin",
        name: "Datasource",
        logo: InsightsSvg(),
        component: (
            <ProviderConfig showTag={false}>
                <DashboardWrapper selectdRoute={"datasources"}>
                    <Admin></Admin>
                </DashboardWrapper>
            </ProviderConfig>
        ),
        hidden: true,
        isUpper: true,
    },
    {
        path: "/datacollection/:metric/:name/:assigned_to",
        name: "DataPoint",
        logo: InsightsSvg(),
        component: (
            <ProviderConfig showTag={false}>
                <DashboardWrapper selectdRoute={"datasources"}>
                    <DataCollection></DataCollection>
                </DashboardWrapper>
            </ProviderConfig>
        ),
        hidden: true,
        isUpper: true,
    },
    {
        path: "/datacollection/:admin/:admin/:admin",
        name: "DataPoint",
        logo: InsightsSvg(),
        component: (
            <ProviderConfig showTag={false}>
                <DashboardWrapper selectdRoute={"datasources"}>
                    <Admin></Admin>
                </DashboardWrapper>
            </ProviderConfig>
        ),
        hidden: true,
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
        hidden: true,
        isUpper: true,
    },
    {
        path: "/referral",
        name: "Refer Friends",
        logo: referFriends(),
        component: (
            <ProviderConfig showTag={false}>
                <DashboardWrapper selectdRoute={"referal"}>
                    <ReferralPage></ReferralPage>
                </DashboardWrapper>
            </ProviderConfig>
        ),
        hidden: true,
        isUpper: true,
    },
];