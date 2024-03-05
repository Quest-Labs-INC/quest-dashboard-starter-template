import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPopup = ({setSuccessPopup}) => {
    const navigate = useNavigate();
    const clickHadnler = (e) => {
        if (document.getElementById("clickboxsucc").contains(e.target)) {
        } else {
            setSuccessPopup(false);
        }
    };

    return (
        <div
            className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 bg-[rgba(0,0,0,.15)] backdrop-blur-sm z-10"
            onClick={clickHadnler}
        >
            <div
                id="clickboxsucc"
                className="w-full max-w-[376px] bg-white flex flex-col p-6 rounded-xl items-center"
            >
                <div className="w-[173px] text-center text-white text-6xl font-bold font-['Hanken Grotesk'] leading-9 mt-10">
                    🎉
                    <br />
                </div>
                <p className='text-center text-neutral-800 text-lg font-semibold font-["Figtree"] leading-7 mt-14'>
                    Congrats! Your Template is Live!
                </p>
                <p className="w-[336px] text-center text-zinc-400 text-sm font-normal font-['Figtree'] leading-tight">
                    Launching creativity into the digital realm! Your template
                    is now live, congrats!
                </p>
                <div className="flex gap-5 w-full mt-5">
                    <button className='border w-full border-[#D1ACFF] rounded-[10px] text-zinc-800 text-sm font-semibold font-["Figtree"] px-4 py-2.5' onClick={() => {window.location.href = "/preview/login"}}>
                        Preview
                    </button>
                    <button className='text-white w-full text-sm font-semibold font-["Figtree"] px-4 py-2.5 bg-[linear-gradient(84deg,_#9035FF_0.36%,_#0065FF_100.36%)] rounded-[10px]'>
                        Fork
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessPopup;
