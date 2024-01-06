import React from 'react';
import { motion } from 'framer-motion';
import { animation1, animation2, animation3 } from './ContectAnimation';
import { importConfig } from '../../../assets/Config/importConfig';


let boxData = [
    {
        icon: importConfig.home.msg3,
        heading: "Cost-Effective Solution",
        text: "Get high-quality dev work at a fraction of the cost."
    },
    {
        icon: importConfig.home.msg2,
        heading: "Rapid Development",
        text: "From concept to launch, faster than ever."
    },
    {
        icon: importConfig.home.msg3,
        heading: "Scalable as you grow",
        text: "We’re ready to meet your evolving needs."
    },
]


const Content1 = () => {



    return (
        <div className='w-full'>
            <div className='py-[60px] px-5 md:pt-44 md:pb-24 md:px-12 w-full'>
                <motion.p className='text-lg text-home-3 m-auto' variants={animation1} initial="hidden" whileInView="visible" viewport={{ once: true }}>MEET PLG PIONEERS</motion.p>
                <motion.p className='text-home-2 text-center text-[30px] w-full md:w-[55%] m-auto md:text-[44px] mt-4 leading-[35px] md:leading-[48px]' variants={animation1} initial="hidden" whileInView="visible" viewport={{ once: true }}>We know what’s going on. <span className='text-home-1'>You need top-notch PLG MVP but no clue where to start?</span>Innovation, speed, and precision define us</motion.p>
            </div>

            <div className='pt-[60px] px-5 md:pt-24 md:pb-0 md:px-12 w-full'>
                <motion.p className='text-lg text-home-3 m-auto' variants={animation1} initial="hidden" whileInView="visible" viewport={{ once: true }}>What you’ll get</motion.p>
                <motion.p className='text-home-2 text-center text-[30px] w-full md:w-[55%] m-auto md:text-[44px] mt-4 leading-[35px] md:leading-[48px]' variants={animation1} initial="hidden" whileInView="visible" viewport={{ once: true }}>We resolve problems associated with development of your PLG App.</motion.p>
            </div>

            {/* BOX */}
            <div className='mt-8 md:mt-[60px] md:px-[60px] px-5'>
                <div className='grid gap-8 grid-cols-1 px-0 md:px-[60px] md:grid-cols-3'>
                    {
                        boxData.map((data, index) => (
                            <motion.div key={index} className='px-6 py-8 md:p-8 flex flex-col items-center rounded-3xl border-[1px] border-home-1' style={{background: "linear-gradient(180deg,#1e1e1e 0%,rgb(20,20,20) 100%)"}} variants={animation2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <img src={data.icon} alt="" />
                                <p className='text-home-2 mt-8 md:mt-10 w-full text-[26px]'>{data.heading}</p>
                                <p className='text-home-1 w-full text-[18px] mt-2'>{data.text}</p>
                            </motion.div>
                        ))
                    }
                </div>
            </div>

            {/* TASKS */}
            <div className='mt-8 md:mt-[60px] md:px-[60px] px-5 mb-[60px] md:mb-0'>
                <div className='grid gap-8 grid-cols-1 px-0 md:px-[60px] md:grid-cols-2'>
                    <motion.div className='flex flex-col-reverse gap-10 md:gap-0 md:flex-row items-center rounded-3xl border-[1px] border-home-1 p-8 md:p-10' style={{background: "linear-gradient(180deg,#1f1f1f 0%,rgb(20,20,20) 100%)"}} variants={animation2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <div className=''>
                            <p className='text-home-2 w-full text-[26px]'>Customized Development</p>
                            <p className='text-home-1 w-full text-[18px] mt-2'>Tailored solutions that fit your unique needs.</p>
                        </div>
                        <img src={importConfig.home.appLogos} alt="" className='translate-x-[73px] md:translate-x-10'/>
                    </motion.div>
                    <motion.div className='flex gap-10 md:gap-0 md:flex-row flex-col-reverse items-center rounded-3xl border-[1px] border-home-1 p-8 md:p-10' style={{background: "linear-gradient(180deg,#1f1f1f 0%,rgb(20,20,20) 100%)"}} variants={animation2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <div className=''>
                            <p className='text-home-2 w-full text-[26px]'>Ongoing Support</p>
                            <p className='text-home-1 w-full text-[18px] mt-2'>Continuous assistance beyond development.</p>
                        </div>
                        <div className='flex '>
                            {
                                [2,1,0].map((user, index) => (
                                    <div className={`p-2 rounded-full bg-[#434343]`} style={{transform: "translateX(" + (user * 50) + "px)"}} key={index}>
                                        <div className='bg-[#1c1c1c] rounded-full p-1'>
                                            <div className='w-[68px] h-[68px] rounded-full bg-[#434343]'></div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* TAGS */}
            <div className='mt-8 hidden md:flex flex-col items-center justify-center gap-6 mb-24'>
                <div className='flex gap-6'>
                    {
                        [
                            "Agile Development",
                            "AI Integration",
                            "Focus on Delightful UX",
                            "Rigorous Testing",
                        ].map((ele, ind) => (
                            <motion.div key={ind} className='px-5 py-4 bg-home-3 border-[1px] border-home-1 rounded-xl text-home-1 text-lg' variants={animation3} initial="hidden" whileInView="visible" viewport={{ once: true }}>{ele}</motion.div>
                        ))
                    }
                </div>
                <div className='flex gap-6'>
                    {
                        [
                            "Regular Updates",
                            "Data-Driven Approach",
                            "We Understand your Vision",
                        ].map((ele, ind) => (
                            <motion.div key={ind} className='px-5 py-4 bg-home-3 border-[1px] border-home-1 rounded-xl text-home-1 text-lg' variants={animation3} initial="hidden" whileInView="visible" viewport={{ once: true }}>{ele}</motion.div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Content1;
