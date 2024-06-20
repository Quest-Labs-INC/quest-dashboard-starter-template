import { useContext } from "react";
import { importConfig } from "../../assets/Config/importConfig";
import { ThemeContext } from "../Common/AppContext";
import { Link } from "react-router-dom";
import { mainConfig } from "../../assets/Config/appConfig";
import { generalFunction } from "../../assets/Config/generalFunction";

export default function ComingSoon() {
    const { theme, bgColors, appConfig } = useContext(ThemeContext);

    return (
        // <div className="w-full h-full flex items-center justify-center min-h-[calc(100vh-100px)]">
        //     <div
        //         className="p-8 rounded-lg"
        //         style={{
        //             color: bgColors[`${theme}-color-premitive-grey-5`]
        //         }}
        //     >
        //         <p>Go to the github repo for this dashbaord and add your app code</p>
        //         <ul className="list-disc list-inside">
        //             <li className="text-sm cursor-pointer">Quest Entity Id: {generalFunction.getDataFromCookies("adminCommunityId")}</li>
        //             <li className="text-sm cursor-pointer">Quest Api Key: {generalFunction.getDataFromCookies("apiKey")}</li>
        //         </ul>
        //         <div className="flex gap-4 mt-5 w-full items-center justify-center">
        //             <button onClick={() => window.open(`${mainConfig.QUEST_LABS_URL}/admin`, "_blank")}
        //                 className="px-5 py-2 text-sm"
        //                 style={{
        //                     borderRadius: "10px",
        //                     background: bgColors[`${theme}-primary-bg-color-0`],
        //                     color: "white",
        //                 }}
        //             >
        //                 Admin Panel
        //             </button>
        //             <button
        //                 onClick={() => window.open("https://github.com/Quest-Labs-INC/quest-dashboard-starter-template", "_blank")}
        //                 className="px-5 py-2 text-sm"
        //                 style={{
        //                     borderRadius: "10px",
        //                     background: bgColors[`${theme}-primary-bg-color-0`],
        //                     color: "white",
        //                 }}
        //             >
        //                 Github Repo
        //             </button>
        //         </div>
        //     </div>
        // </div>
        <div className="w-full max-w-[520px] m-auto h-[800px] relative flex items-center justify-center">
            <div className="flex-col justify-start items-center gap-6 inline-flex">
                <div className="flex-col justify-start items-center gap-1.5 flex">
                    <div className="text-2xl font-semibold font-['Figtree'] leading-loose" style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}>
                        Next Steps
                    </div>
                    <div className=" text-center text-neutral-500 text-sm font-normal font-['Figtree'] leading-tight">
                        This entire dashbaord from login to here is generated
                        for you now. To get this code and get started with your
                        app, follow the steps below*
                    </div>
                </div>
                <div className="p-8 rounded-xl border flex-col justify-center items-start gap-6 flex" style={{borderColor: bgColors[`${theme}-primary-border-color`]}}>
                    <div className="justify-start items-center gap-3 inline-flex">
                        <div className="justify-center items-center gap-2 flex">
                            <div className="px-3 py-1 bg-zinc-100 rounded-[23px] flex-col justify-center items-center gap-2 inline-flex">
                                <div className="text-center text-stone-950 text-base font-normal font-['Figtree'] leading-normal">
                                    1
                                </div>
                            </div>
                        </div>
                        <div className=" text-sm font-normal font-['Figtree'] leading-tight" style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}>
                            Fork the Github Repo here and follow the readme.
                            After that, you will see this starter template in
                            your localhost.
                        </div>
                    </div>
                    <div className="justify-start items-start gap-3 inline-flex">
                        <div className="justify-center items-center gap-2 flex">
                            <div className="px-3 py-1 bg-zinc-100 rounded-[23px] flex-col justify-center items-center gap-2 inline-flex">
                                <div className="text-center text-stone-950 text-base font-normal font-['Figtree'] leading-normal">
                                    2
                                </div>
                            </div>
                        </div>
                        <div className=" text-sm font-normal font-['Figtree'] leading-tight" style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}>
                            Go to Quest Admin Panel, to make any changes and see
                            analytics that we collect for everything.
                        </div>
                    </div>
                    <div className="justify-start items-center gap-3 inline-flex">
                        <div className="justify-center items-center gap-2 flex">
                            <div className="px-3 py-1 bg-zinc-100 rounded-[23px] flex-col justify-center items-center gap-2 inline-flex">
                                <div className="text-center text-stone-950 text-base font-normal font-['Figtree'] leading-normal">
                                    3
                                </div>
                            </div>
                        </div>
                        <div className=" text-sm font-normal font-['Figtree'] leading-tight" style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}>
                            <span className=" text-sm font-normal font-['Figtree'] underline leading-tight cursor-pointer" onClick={() => window.open("https://www.loom.com/share/c286b044781c4307a3c26f89bb999af0", "_blank")} style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}>
                            Watch this video
                            </span>
                            {" "}and learn more if you are still
                            confused.
                        </div>
                    </div>
                    <div className="justify-start items-center gap-3 inline-flex">
                        <div className="justify-center items-center gap-2 flex">
                            <div className="px-3 py-1 bg-zinc-100 rounded-[23px] flex-col justify-center items-center gap-2 inline-flex">
                                <div className="text-center text-stone-950 text-base font-normal font-['Figtree'] leading-normal">
                                    4
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <span className=" text-sm font-normal font-['Figtree'] leading-tight" style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}>
                                Email{" "}
                            </span>
                            <span className=" text-sm font-normal font-['Figtree'] underline leading-tight cursor-pointer" onClick={() => window.location.href = "mailto:shubham@questlabs.ai"} style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}>
                                shubham@questlabs.ai
                            </span>
                            <span className="text-sm font-normal font-['Figtree'] leading-tight" style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}>
                                {" "}
                                if you are facing any challenges and we will
                                help you out.
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-[520px] justify-start items-start gap-6 inline-flex">
                    <div className="grow shrink basis-0 h-11 justify-end items-start gap-3 flex">
                        <div className="grow shrink basis-0 h-11 px-5 py-2.5 rounded-[10px] border  justify-center items-center gap-2 flex cursor-pointer" style={{borderColor: bgColors[`${theme}-primary-border-color`]}} onClick={() => window.open(`${mainConfig.QUEST_LABS_URL}/admin`, "_blank")}>
                            <div className=" text-sm font-normal font-['Figtree'] leading-tight" style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}>
                                Admin Panel
                            </div>
                        </div>
                    </div>
                    <div className="grow shrink basis-0 h-11 px-4 py-2.5 rounded-[10px] justify-center items-center gap-1 flex cursor-pointer" style={{background: bgColors[`${theme}-primary-bg-color-0`]}} onClick={() => window.open("https://github.com/Quest-Labs-INC/quest-dashboard-starter-template/tree/saas-gpt", "_blank")}>
                        <div className="text-white text-sm font-semibold font-['Figtree'] leading-tight">
                            Fork Repo
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
