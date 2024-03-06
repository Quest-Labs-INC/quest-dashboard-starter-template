import { GetStarted } from "@questlabs/react-sdk";
import DashboardWrapper from "../Common/DashboardWrapper";
import { importConfig } from "../../assets/Config/importConfig";
import { generalFunction } from "../../assets/Config/GeneralFunction";
import { useContext } from "react";
import { ThemeContext } from "../Common/AppContext";

export default function Dashboard() {
  const completeAllStatus = () => {};

  const { theme, bgColors, appConfig } = useContext(ThemeContext);

  return (
    <GetStarted
      questId={appConfig?.QUEST_GET_STARTED_CAMPAIGN_ID}
      userId={generalFunction.getUserId()}
      token={generalFunction.getUserToken()}
      completeAllStatus={completeAllStatus}
      buttonBg="linear-gradient(90deg, rgba(105,92,254,1) 0%, rgba(0,210,234,1) 50%, rgba(105,92,254,1) 100%)"
      // cardBG={}
      // cardHeadingColor={bgColors[`${theme}-color-premitive-grey-5`]}
      cardDescColor="var(--neutral-grey-200, #AFAFAF)"
      cardBorderColor="var(--primary-bg-color-2)"
      iconUrls={[
        importConfig.routesIcons.userIcon,
        importConfig.routesIcons.adminIcon,
        importConfig.routesIcons.settingIcon,
      ]}
      arrowColor="black"
      cardBackground={bgColors[`${theme}-primary-bg-color-2`]}
      styleConfig={{
        Form: {
          background: "transparent",
        },
        Heading: {
          fontSize: "22px",
        },
        Description: {
          fontSize: "14px",
        },
      }}
      showFooter={false}
    />
  );
}
