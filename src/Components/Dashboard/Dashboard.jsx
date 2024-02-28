import { GetStarted } from "@questlabs/react-sdk";
import DashboardWrapper from "../Common/DashboardWrapper";
// import { appConfig } from "../../assets/Config/appConfig";
import { importConfig } from "../../assets/Config/importConfig";
import { generalFunction } from "../../assets/Config/GeneralFunction";
import { useContext } from "react";
import { ThemeContext } from "../../App";



export default function Dashboard() {

    const completeAllStatus = () => {
    }

    const { theme, bgColors, appConfig } = useContext(ThemeContext);

    return (
        <GetStarted
            questId={appConfig?.QUEST_GET_STARTED_CAMPAIGN_ID}
            userId={generalFunction.getUserId()}
            token={generalFunction.getUserToken()}
            completeAllStatus={completeAllStatus}
            buttonBg='linear-gradient(90deg, rgba(105,92,254,1) 0%, rgba(0,210,234,1) 50%, rgba(105,92,254,1) 100%)'

            // cardBG="var(--primary-bg-color-2)"
            cardBG={bgColors[`${theme}-primary-bg-color-2`]}

            // cardHeadingColor="var(--color-premitive-grey-5,#FFF)"
            cardHeadingColor={bgColors[`${theme}-color-premitive-grey-5`]}

            cardDescColor="var(--neutral-grey-200, #AFAFAF)"
            cardBorderColor="var(--primary-bg-color-2)"
            icons={[importConfig.routesIcons.userIcon, importConfig.routesIcons.adminIcon, importConfig.routesIcons.settingIcon]}
            arrowColor="black"
        />
    )
}