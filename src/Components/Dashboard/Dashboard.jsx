import { GetStarted } from "@questlabs/react-sdk";
import DashboardWrapper from "../Common/DashboardWrapper";
import { appConfig } from "../../assets/Config/appConfig";
import { importConfig } from "../../assets/Config/importConfig";
import { generalFunction } from "../../assets/Config/GeneralFunction";



export default function Dashboard() {


    const completeAllStatus = () => {
        
    }

    return (
        <div className="w-full h-full flex items-center justify-center min-h-[calc(100vh-100px)]">
            <img src={importConfig.home.comingsoon} className="w-96" alt="" />
        </div>
    )
}