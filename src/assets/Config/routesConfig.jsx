import Admin from "../../Components/Admin/Admin";
import DashboardWrapper from "../../Components/Common/DashboardWrapper";
import LoginWrapper from "../../Components/Common/LoginWrapper";
import { ProviderConfig } from "../../Components/Common/ProviderConfig";
import {
    GetStartedSvg,
    InsightsSvg,
    SettingsSvg,
    referFriends,
    IconDatabase,
    IconPaper_folded,
    IconTruck,
} from "../../Components/Common/SideBarSvg";
import Dashboard from "../../Components/Dashboard/Dashboard";
import Login from "../../Components/Login/Login";
import Onboarding from "../../Components/Onboarding/Onboarding";
import ReferralPage from "../../Components/Referral/ReferralPage";
import Settings from "../../Components/Settings/Settings";
import DataCollection from "../../Components/DataCollection/datacollection";
import Certification from "../../Components/DataCollection/certification";
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
        path: "/data_collection",
        name: "Data Collection",
        logo: IconDatabase(),
        component: (
            <ProviderConfig showTag={false}>
                <DashboardWrapper selectdRoute={"parameteroverview"}>
                    <Parameteroverview></Parameteroverview>
                </DashboardWrapper>
            </ProviderConfig>
        ),
        hidden: false,
        isUpper: true,
    },
    {
        path: "/data_collection/:data_sources",
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
        path: "/data_collection/admin",
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

        path: "/compliance",
        name: "Compliance",
        logo: IconPaper_folded(),
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
        path: "/suppliermanagement",
        name: "Supplier Management",
        logo: IconTruck(),
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