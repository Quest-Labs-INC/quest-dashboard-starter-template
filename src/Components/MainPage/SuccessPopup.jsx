import React from "react";
import { useNavigate } from "react-router-dom";
import QuestFooter from '../../assets/Images/QuestFooter.svg'

const SuccessPopup = ({ setSuccessPopup }) => {
    const navigate = useNavigate();
    const clickHadnler = (e) => {
        if (document.getElementById("clickboxsucc").contains(e.target)) {
        } else {
            setSuccessPopup(false);
        }
    };

    return (
        <div
            className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 bg-[rgba(0,0,0,.15)] backdrop-blur-sm z-10 "
            // onClick={clickHadnler}
        >
            <div className="rounded-xl overflow-hidden">
                {/* <div style={{
                    height: "60px",
                    width: "100%",
                    padding: '20px',
                    // background: 'var(--neutral-opacity-white-80, rgba(255, 255, 255, 0.80))'
                    background: 'white'
                }}>
                </div> */}

                {/* <div id="clickboxsucc" className="w-full max-w-[376px] bg-white flex flex-col p-6 rounded-xl items-center"> */}
                <div id="clickboxsucc" className="w-full max-w-[376px] bg-white flex flex-col p-[20px] pt-[32px]  items-center gap-[16px]">

                    {/* <div className="w-[173px] text-center text-white text-6xl font-bold font-['Hanken Grotesk'] leading-9 mt-10"> */}
                    <div className="flex items-center text-[35px] font-bold font-['Hanken Grotesk'] leading-9">
                        <div className='flex items-center justify-center w-[64px] h-[64px] text-center rounded-full bg-[#F4EBFF]'>
                            <div className=""
                                style={{
                                    color: 'var(--grey-5, #FFF)',
                                    fontStyle: "normal",
                                }}>
                                🎉
                            </div>
                        </div>

                    </div>


                    <div className="flex flex-col items-center justify-center w-full ">
                        {/* <p className='text-center text-neutral-800 text-lg font-semibold font-["Figtree"] leading-7 mt-14'> */}
                        <p className='' style={{
                            width: "100%",
                            // display: "-webkit-box",
                            // - webkit - box - orient: vertical;
                            // -webkit-line-clamp: 1;
                            // alignSelf: "stretch",
                            overflow: "hidden",
                            color: 'var(--Neutral-Grey-700, #252525)',
                            textAlign: "center",
                            textOverflow: 'ellipsis',

                            /* Title sm/600 */
                            fontFamily: 'Figtree',
                            fontSize: '24px',
                            fontStyle: 'normal',
                            fontWeight: '600',
                            lineHeight: '32px', /* 155.556% */
                            letterSpacing: '-0.18px',
                        }}>
                            Your App is Generated!
                        </p>

                        {/* <p className="w-[336px] text-center text-zinc-400 text-sm font-normal font-['Figtree'] leading-tight"> */}
                        <p className="w-[336px] text-center mt-[8px]  text-sm font-normal font-['Figtree'] "
                            style={{
                                alignSelf: 'stretch',
                                color: 'var(--Grey-0, var(--Neutral-Grey-200, #AFAFAF))',
                                fontStyle: 'normal',
                                fontWeight: '400',
                                lineHeight: '20px',
                            }}
                        >
                            Congratulations on saving months of development time to create your own saas dashboard application. Preview your app or directly fork the react starter repo and get started on your localhost.
                        </p>
                    </div>

                    <div className="flex gap-5 w-full ">
                        <button className='border w-full border-[#6200EE] rounded-[10px] text-zinc-800 text-sm font-semibold font-["Figtree"] px-4 py-2.5' onClick={() => { window.location.href = "/your-app-login" }}>
                            Preview
                        </button>
                        <button className='text-white w-full text-sm font-semibold font-["Figtree"] px-4 py-2.5 bg-[linear-gradient(84deg,_#9035FF_0.36%,_#0065FF_100.36%)] rounded-[10px]' onClick={() => window.open("https://github.com/Quest-Labs-INC/quest-dashboard-starter-template")}>
                            Fork Repo
                        </button>
                    </div>

                </div>
                <div className="flex py-[12px] px-[20px] justify-center items-center gap-[12px] " style={{
                    background: 'var(--Neutral-White-200, #FBFBFB)',
                }}
                    onClick={() => window.open("https://questlabs.ai/", "_blank")}
                >
                    <div style={{
                        flex: '1 0 0',
                        color: 'var(--Neutral-Black-100, #939393)',
                        fontFamily: 'Figtree',
                        fontSize: '10px',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        lineHeight: '12px', /* 120% */
                        letterSpacing: '-0.1px',

                    }}>
                        Powered by QuestLabs
                    </div>
                    <img src={QuestFooter} alt="" />
                </div>
            </div>
        </div>
    );
};

export default SuccessPopup;
