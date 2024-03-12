import { useState } from "react";
import { BsChatQuoteFill } from "react-icons/bs";
import { motion } from "framer-motion";
import Image from "next/image";

import QueAnsCard from "./cards/que-ans";
import Vote from "./cards/vote";

import { P_FILTER_TYPES, P_FILTERS, P_SMALL_WIDTHS, P_WIDTHS } from "~/constants";
import useDeviceType from "~/hooks/use-device-type";
import useInView from "~/hooks/use-in-view";

const Profile: React.FC = (): React.ReactNode => {
    const [active, setActive] = useState<number>(P_FILTER_TYPES.QUESTIONS_ANSWERS);

    const deviceType = useDeviceType();
    const {initialLoad, ref} = useInView();


    const getLeftOffset = (): string => {
        const ACTIVE_WIDTHS = deviceType === "mobile" ? P_SMALL_WIDTHS : P_WIDTHS;

        const activeKeys = Object.keys(ACTIVE_WIDTHS).slice(0, active-1);
        const sum = activeKeys.reduce((acc, key) => acc + parseInt(ACTIVE_WIDTHS[parseInt(key)]!, 10), 0);

        return `${sum}px`;
    };

    const getWidth = () => {
        const ACTIVE_WIDTHS = deviceType === "mobile" ? P_SMALL_WIDTHS : P_WIDTHS;
        return ACTIVE_WIDTHS[active]
    }

    return (
        <section className="pt-[150px] md:pt-[190px] pb-20 w-full flex flex-col gap-[40px] md:gap-[90px]">
            <motion.div 
                className=""
                initial={{ opacity: 0, y: -60 }}
                whileInView={{opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{delay: 0.5, duration: 0.5}}
            >
                <motion.div 
                    className="relative flex justify-center items-center"
                    whileHover={{scale: 1.025}}
                >
                    <div className="absolute top-0 -translate-y-1/2 bg-primary-light text-primary font-ibm-mono text-xs md:text-[13px] px-5 py-3 rounded-[10px]">
                        730/770 Question answered
                    </div>

                    <div className="w-[90%] md:w-auto flex gap-6 items-center bg-white rounded-xl border border-primary-light shadow-color  pt-9  px-5 pb-7 flex-col md:flex-row ">
                        <div>
                            <Image 
                                src={"/assets/profile/img.png"}
                                width={1000}
                                height={1000}
                                className="w-[140px] aspect-square object-cover"
                                alt="img"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="text-tertiary font-ibm-mono text-xs md:text-sm tracking-wide text-center md:text-left">
                                uqwdbd8271gd98n13241
                            </div>
                            <div className="text-[36px] font-semibold text-black font-neue-regrade ">
                                Drep of NMKR
                            </div>
                            <div className="flex gap-2.5 items-center mt-5">
                                <motion.button 
                                    className="px-4 py-2.5 bg-gradient-to-b from-[#FFC896] from-[-47.73%] to-[#FB652B] to-[78.41%] flex gap-2.5 items-center text-white rounded-lg"
                                    whileHover={{scaleX: 1.025}}
                                    whileTap={{scaleX: 0.995}}
                                >
                                    <BsChatQuoteFill className="text-[24px]" />
                                    <div className="text-xs md:text-sm font-inter font-medium text-shadow ">
                                        Ask question
                                    </div>
                                </motion.button>

                                <motion.button 
                                    className="px-4 py-2.5 bg-[#EAEAEA] flex gap-2.5 items-center text-secondary rounded-lg"
                                    whileHover={{scaleX: 1.025}}
                                    whileTap={{scaleX: 0.995}}
                                >
                                    <div className="text-xs md:text-sm font-inter font-medium ">
                                        Delagate
                                    </div>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            <div className="w-full  bg-white px-[5%] py-7 pb-12 flex justify-center items-center shadow-[-5px_0px_13px_0px_#0000001A]">
                <div ref={ref} className="max-w-[1600px] flex flex-col gap-6 md:gap-10 w-full">
                    <div className="w-full flex justify-between items-start md:items-center text-secondary-dark font-inter font-medium tracking-wide flex-col md:flex-row gap-2 ">
                        <motion.div 
                            className="text-base md:text-xl"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{delay: 1.25, duration: 0.5}}
                        >
                            Questions and answers
                        </motion.div>
                        <motion.div 
                            className="p-1.5 rounded-lg text-xs md:text-sm text-tertiary"
                            initial={{ backgroundColor: "transparent", opacity: 0 }}
                            whileInView={{backgroundColor: "#EAEAEA", opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{delay: 0.75, duration: 0.5}}
                        >
                            <div className="flex relative  ">
                                {P_FILTERS.map((filter, i) => (
                                    <motion.div
                                        key={filter.type}
                                        className={`relative z-[1] px-2 py-1.5 ${active === filter.type ? "text-black " : "text-tertiary"} cursor-pointer hover:text-secondary `}
                                        onClick={() => setActive(filter.type)}
                                        initial={{ opacity: 0, x: 50 }}
                                        whileInView={{opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{delay: 1 + (i*0.1), duration: 0.5}}
                                    >
                                        {filter.label}
                                    </motion.div>
                                ))}

                                <motion.div 
                                    className="absolute bg-white mix-blend-overlay shadow-md top-0 left-0 bottom-0 h-full rounded-md transition-[left_200ms,width_200ms] z-0" 
                                    style={{left: getLeftOffset(), width: getWidth()}}
                                    initial={{ scale: 0, }}
                                    whileInView={{scale: 1, }}
                                    viewport={{ once: true }}
                                    transition={{delay: 1.25, duration: 0.5}}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {
                        active === P_FILTER_TYPES.QUESTIONS_ANSWERS  &&
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {
                                    Array(4).fill(0).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -40 }}
                                            whileInView={{opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{delay: initialLoad ? 1 + (i*0.25) : i*0.25, duration: 0.5}}
                                        >
                                            <QueAnsCard id={i+1} />
                                        </motion.div>
                                    ))
                                }
                            </div>
                    }

                    {
                        active === P_FILTER_TYPES.VOTES && 
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {
                                    Array(6).fill(0).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -40 }}
                                            whileInView={{opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{delay: i*0.25, duration: 0.5}}
                                        >
                                            <Vote />
                                        </motion.div>
                                    ))
                                }
                            </div>
                    }
                </div>
            </div>
        </section>
    );
};

export default Profile;