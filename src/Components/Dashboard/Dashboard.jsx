import { GetStarted } from "@questlabs/react-sdk";
import DashboardWrapper from "../Common/DashboardWrapper";
import { appConfig } from "../../assets/Config/appConfig";
import { importConfig } from "../../assets/Config/importConfig";



export default function Dashboard() {


    const completeAllStatus = () => {
        
    }

    return (
        <>
            <GetStarted
                questId={appConfig.GET_STARTED_SCREEN_QUEST_ID}
                userId="u-1dd2f19b-5a1a-46e9-aa38-2e4318834421"
                token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTFkZDJmMTliLTVhMWEtNDZlOS1hYTM4LTJlNDMxODgzNDQyMSIsImlhdCI6MTcwNDMzNDgzOCwiZXhwIjoxNzA0NDIxMjM4fQ.eITOAIrG_VQjCSyUL3IalP8X-9t11KYKC9dniXKQAJ8"
                completeAllStatus={completeAllStatus}
                buttonBg='linear-gradient(90deg, rgba(105,92,254,1) 0%, rgba(0,210,234,1) 50%, rgba(105,92,254,1) 100%)'
                cardBG="var(--primary-bg-color-2)"
                cardHeadingColor="var(--color-premitive-grey-5,#FFF)"
                cardDescColor="var(--neutral-grey-200, #AFAFAF)"
                cardBorderColor="var(--primary-bg-color-2)"
                icons={[importConfig.routesIcons.userIcon, importConfig.routesIcons.adminIcon, importConfig.routesIcons.settingIcon]}
            />
        </>
    )
}