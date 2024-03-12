import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import ProfileCard from "./cards/profile";
import QueAnsCard from "./cards/que-ans";
import Search from "./search";

import { FILTER_TYPES, FILTERS, SMALL_WIDTHS, WIDTHS } from "~/constants";
import useDeviceType from "~/hooks/use-device-type";
import useInView from "~/hooks/use-in-view";

const Home: React.FC = (): React.ReactNode => {
    const [active, setActive] = useState<number>(FILTER_TYPES.LATEST_ANSWERS);

    const deviceType = useDeviceType();
    const {initialLoad, ref} = useInView();


    const getLeftOffset = (): string => {
        const ACTIVE_WIDTHS = deviceType === "mobile" ? SMALL_WIDTHS : WIDTHS;

        const activeKeys = Object.keys(ACTIVE_WIDTHS).slice(0, active-1);
        const sum = activeKeys.reduce((acc, key) => acc + parseInt(ACTIVE_WIDTHS[parseInt(key)]!, 10), 0);

        return `${sum}px`;
    };

    const getWidth = () => {
        const ACTIVE_WIDTHS = deviceType === "mobile" ? SMALL_WIDTHS : WIDTHS;
        return ACTIVE_WIDTHS[active]
    }

    return (
        <section className="pt-[150px] md:pt-[190px] pb-20 w-full flex flex-col gap-[40px] md:gap-[90px]">
            <div className="flex flex-col w-full justify-center items-center">
                <motion.div 
                    className="p-2 bg-primary-light text-primary flex gap-2 items-center rounded-[10px]"
                    initial={{ opacity: 0, y: -60 }}
                    whileInView={{opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{delay: 0.5, duration: 0.5}}
                >
                    <div className="">
                        <Image 
                            src={"/assets/home/top.png"}
                            width={1000}
                            height={1000}
                            className="h-7 w-auto object-cover rounded"
                            alt="profile"
                        /> 
                    </div>
                    <div className="font-ibm-mono text-[13px] ">
                        over 100+ dreps available here
                    </div>
                </motion.div>

                <motion.div 
                    className="mt-5 text-[10vw] md:text-[5vw] flex gap-1 md:gap-5 items-center font-neue-regrade font-semibold flex-col md:flex-row leading-[1] md:leading-normal"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{delay: 0.5, duration: 0.5}}
                >
                    <span>
                        Governance with
                    </span>
                    <span className="stroke-text">
                        Transperancy
                    </span>
                </motion.div>

                <Search />
            </div>

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
                            transition={{delay: 1, duration: 0.5}}
                        >
                            <div className="flex relative  ">
                                {FILTERS.map((filter, i) => (
                                    <motion.div
                                        key={filter.type}
                                        className={`relative z-[1] px-2 py-1.5 ${active === filter.type ? "text-black " : "text-tertiary"} cursor-pointer hover:text-secondary `}
                                        onClick={() => setActive(filter.type)}
                                        initial={{ opacity: 0, x: 50 }}
                                        whileInView={{opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{delay: 1.25 + (i*0.1), duration: 0.5}}
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
                                    transition={{delay: 1.5, duration: 0.5}}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {
                        active === FILTER_TYPES.LATEST_ANSWERS &&
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {
                                    Array(4).fill(0).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -40 }}
                                            whileInView={{opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{delay: initialLoad ? 1.25 + (i*0.25) : i*0.25, duration: 0.5}}
                                        >
                                            <QueAnsCard id={i+1} />
                                        </motion.div>
                                    ))
                                }
                            </div>
                    }

                    {
                        active === FILTER_TYPES.LATEST_QUESTIONS &&
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {
                                    Array(4).fill(0).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -40 }}
                                            whileInView={{opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{delay: initialLoad ? 1.25 + (i*0.25) : i*0.25, duration: 0.5}}
                                        >
                                            <QueAnsCard id={i+1} />
                                        </motion.div>
                                    ))
                                }
                            </div>
                    }

                    {
                        active === FILTER_TYPES.EXPLORE_DREPS && 
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {
                                    Array(6).fill(0).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -40 }}
                                            whileInView={{opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{delay: i*0.25, duration: 0.5}}
                                        >
                                            <ProfileCard />
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

export default Home;