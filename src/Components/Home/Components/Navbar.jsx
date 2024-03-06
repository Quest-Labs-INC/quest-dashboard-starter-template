import React, { useState } from "react";
import { importConfig } from "../../../assets/Config/importConfig";
import { motion } from 'framer-motion';
import { appConfig } from "../../../assets/Config/appConfig";


const Navbar = () => {
    const [openPopup, setOpenPopup] = useState(false);

    const animate1 = {
        hidden: { y: -100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 1
            }
        }
    };

    return (
        <div className="fixed w-full top-0 left-0 " style={{zIndex: 1}}>
            <motion.div className="px-5 pt-8 flex items-center justify-between md:px-[60px] md:pt-12 relative" variants={animate1}>
                <img src={appConfig.BRAND_LOGO || importConfig.brandLogo} alt="" className="w-12" variants={animate1}/>
                <div
                    className={`flex ${
                        openPopup ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    } top-[100px] w-[calc(100%-40px)] md:opacity-100 md:scale-100 rounded-[32px] items-center md:w-fit left- flex-col duration-200 ease-in gap-6 px-8 py-10 fixed bg-home-2 md:rounded-full md:flex-row md:gap-8 md:py-4 md:static border-[1px] border-home-1`}
                    style={{ backdropFilter: "blur(10px)" }}
                    
                >
                    <p className="text-home-1 hover:text-home-2 duration-500 font-semibold cursor-pointer text-xl md:text-base">
                        Features
                    </p>
                    <p className="text-home-1 hover:text-home-2 duration-500 font-semibold cursor-pointer text-xl md:text-base">
                        How it works
                    </p>
                    <p className="text-home-1 hover:text-home-2 duration-500 font-semibold cursor-pointer text-xl md:text-base">
                        Testimonials
                    </p>
                    <p className="text-home-1 hover:text-home-2 duration-500 font-semibold cursor-pointer text-xl md:text-base">
                        FAQs
                    </p>
                    <p className="flex md:hidden text-home-1 hover:text-home-2 duration-500 font-semibold cursor-pointer text-xl md:text-base">
                        Book Call
                    </p>
                </div>
                <button
                    className="hidden md:flex bg-home-2 rounded-full border-[1px] border-home-1 px-7 py-3 text-home-2 font-bold"
                    style={{ backdropFilter: "blur(10px)" }}
                    variants={animate1}
                >
                    Book Call
                </button>
                <button
                    className="flex md:hidden bg-home-2 rounded-full border-[1px] border-home-1 px-4 py-3 text-home-2 font-bold"
                    style={{ backdropFilter: "blur(10px)" }}
                    onClick={() => setOpenPopup(!openPopup)}
                >
                    <img
                        src={importConfig.home.menuBar}
                        alt=""
                        className="w-8"
                    />
                </button>
            </motion.div>
        </div>
    );
};

export default Navbar;
