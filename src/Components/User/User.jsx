import { importConfig } from "../../assets/Config/importConfig";

export default function User() {
    return (
        <div className="w-full h-full flex items-center justify-center min-h-[calc(100vh-100px)]">
            <img src={importConfig.home.comingsoon} className="w-96" alt="" />
        </div>
    );
}
