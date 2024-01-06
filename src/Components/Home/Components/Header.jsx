import React from 'react';
import { motion } from 'framer-motion';
import { importConfig } from '../../../assets/Config/importConfig';
import { animation1, animation10, animation2, animation3, animation4, animation5, animation6, animation7, animation8, animation9 } from './HeadersAnimation';


const Header = () => {





    return (
        <div>
            <motion.div className='pt-[57px] md:pt-[120px] px-5 md:px-[60px] w-full duration-200'>
                <motion.div className='text-[46px] md:text-[80px] text-home-2 w-full' variants={animation1}>
                    <p className='m-auto -mt-5'>Idea to MVP</p>
                    <p className='m-auto -mt-6'>in 2 weeks</p>
                </motion.div>
                <motion.div className='mt-[140px] md:mt-[160px] w-full md:w-[465px] m-auto flex gap-2 border-[1px] border-home-1 pl-[25px] pr-3 py-3 items-center rounded-full' variants={animation2}>
                    <input className='w-[calc(100%-145px)] bg-transparent outline-none border-none text-home-2' placeholder='email@questapp.xyz'/>
                    <button className='px-7 py-3 w-[145px] bg-home-btn1 rounded-full' style={{boxShadow: "0px 20px 35px rgba(221, 255, 0, 0.2)"}}>Let's Chat</button>
                </motion.div>
                <motion.div className='hidden md:flex w-full justify-between relative h-72 items-end'>
                    <motion.div className='absolute -top-32 left-80 z-10 flex items-center' variants={animation3}>
                        <p className='bg-[#75b78f] py-1 px-4 font-bold rounded-full rounded-se-none'>Sarah</p>
                    </motion.div>

                    <motion.div className='absolute -top-48 right-80 z-10 flex items-center' variants={animation4}>
                        <p className='bg-[#1e3b83] py-1 px-4 font-bold rounded-full rounded-ss-none'>Eliah</p>
                    </motion.div>

                    <motion.div variants={animation5}>
                        <img src={importConfig.home.img1} alt="" className='w-52 h-fit ' />
                    </motion.div>

                    <motion.div variants={animation6}>
                        <img src={importConfig.home.img2} alt="" className='w-60 h-fit' />
                    </motion.div>

                    <motion.div className='' variants={animation7}>
                        <img src={importConfig.home.img3} alt="" className='w-60 h-fit' />
                    </motion.div>

                    <motion.div variants={animation8}>
                        <img src={importConfig.home.img4} alt="" className='w-60 h-fit' />
                    </motion.div>

                    <motion.div variants={animation9}>
                        <img src={importConfig.home.img5} alt="" className='w-52 h-fit ' />
                    </motion.div>
                </motion.div>
                <motion.div className='q_slider flex md:hidden' variants={animation10}>
                    {
                        [
                            importConfig.home.img1,
                            importConfig.home.img2,
                            importConfig.home.img3,
                            importConfig.home.img4,
                            importConfig.home.img5,
                            importConfig.home.img1,
                            importConfig.home.img2,
                            importConfig.home.img3,
                        ].map((e, i) => (<div key={i} className='q_slider_card'>
                            <img src={e} alt=""  className='q_slider_img'/>
                        </div>))
                    }
                    {/* <div></div> */}
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Header;
