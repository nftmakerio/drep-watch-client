import { BsChatQuoteFill } from "react-icons/bs";
import { motion } from "framer-motion";
import Image from "next/image";

import QueAnsCard from "./cards/que-ans";

const Answer: React.FC = (): React.ReactNode => {

    return (
        <section className="pt-[150px] md:pt-[190px] pb-20 w-full flex flex-col gap-[40px] md:gap-[90px]">
            <div className="">
                <div className="relative flex justify-center items-center">
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
                </div>
            </div>

            <div className="w-full  bg-white px-[5%] py-7 pb-12 flex justify-center items-center shadow-[-5px_0px_13px_0px_#0000001A]">
                <div className="max-w-[1600px] flex flex-col gap-6 md:gap-10 w-full">
                    <div>
                        <QueAnsCard large={true} />
                    </div>

                    <div className="w-full flex justify-between items-start md:items-center text-secondary-dark font-inter font-medium tracking-wide flex-col md:flex-row gap-2 ">
                        <div className="text-base md:text-xl">
                            Further question to this Drep
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {
                            Array(2).fill(0).map((_, i) => (
                                <div key={i}>
                                    <QueAnsCard id={i+1} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Answer;