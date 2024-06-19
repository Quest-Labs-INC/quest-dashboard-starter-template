import Content1 from "./Components/Content1";
import Content2 from "./Components/Content2";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import { motion } from 'framer-motion';


export default function Home() {

    const container = {
        hidden: { },
        visible: {
            transition: {
                // delayChildren: 0.3,
                // staggerChildren: 0.5
            }
        }
    };

    return (
        <motion.div className="bg-home-1 min-h-screen" variants={container} initial="hidden" animate="visible">
            <div className="h-[95px] md:h-[111px]">
                <Navbar/>
            </div>
            <Header/>
            <Content1/>
            <Content2/>
            <Footer/>
        </motion.div>
    )
}