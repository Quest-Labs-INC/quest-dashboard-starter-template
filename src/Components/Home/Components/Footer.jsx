import React from 'react';
import { motion } from 'framer-motion';
import { animation1 } from './ContectAnimation';




const Footer = () => {



    return (
        <div className='py-[60px] px-5 md:py-20 md:px-14 w-full'>
            <div className='px-0 md:px-[200px]'>
                <div className='px-6 md:px-[110px] py-[60px] m-auto rounded-3xl' style={{background: "linear-gradient(140.06451559643327deg,#1a1a1a 0%,rgb(13,13,13) 100%)"}}>
                    <motion.p className='text-[36px] md:text-[54px] text-home-2 font-semibold text-center m-auto w-full md:w-4/5' variants={animation1} initial="hidden" whileInView="visible" viewport={{ once: true }}>Ready to Launch Your MVP?</motion.p>
                    <motion.p className='text-xl mt-8 text-home-1 w-full md:w-2/3 m-auto text-center' variants={animation1} initial="hidden" whileInView="visible" viewport={{ once: true }}>Transform your idea into reality. Enter your email & we will follow up with you!</motion.p>
                    <motion.div className='mt-8 w-full md:w-[465px] m-auto flex gap-2 border-[1px] border-home-1 p-6 md:pl-[25px] md:pr-3 md:py-3 items-center rounded-full' variants={animation1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <input className='w-[calc(100%-145px)] bg-transparent outline-none border-none text-home-2' placeholder='email@questapp.xyz'/>
                        <button className='px-7 py-3 w-[155px] bg-home-btn1 rounded-full hidden md:flex' style={{boxShadow: "0px 20px 35px rgba(221, 255, 0, 0.2)"}}>Get Notified</button>
                    </motion.div>
                    <motion.button className='px-6 py-6 bg-home-btn1 rounded-full w-full mt-4 block md:hidden' style={{boxShadow: "0px 20px 35px rgba(221, 255, 0, 0.2)"}} variants={animation1} initial="hidden" whileInView="visible" viewport={{ once: true }}>Get Notified</motion.button>
                </div>
            </div>
            <div className='mt-32 text-home-1 gap-2 md:gap-6 flex items-center justify-center flex-col md:flex-row'>
                <p>Contact</p>
                <p>Privacy & Cookie Policy</p>
                <p>Terms & Conditions</p>
            </div>
        </div>
    );
}

export default Footer;
