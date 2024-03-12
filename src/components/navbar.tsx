import { IoWalletSharp } from "react-icons/io5";
import {motion} from 'framer-motion';
import Image from "next/image";

import useDeviceType from "~/hooks/use-device-type";

const Navbar: React.FC = (): React.ReactNode => {
    const device = useDeviceType();

    return (
        <div className="fixed top-7 left-0 w-screen flex justify-center items-center z-[10] pointer-events-none ">
            <motion.header 
                className="p-2 pl-6 bg-[#303030] shadow-sm flex justify-between items-center rounded-[14px] w-auto md:min-w-[500px] gap-8 pointer-events-auto"
                whileHover={{ width: device!=="mobile" ? "600px" : "auto" }}
                initial={{ opacity: 0 }}
                animate={{opacity: 1 }}
            >
                <div className="flex gap-2.5 items-center">
                    <Image
                        src={"/assets/logo.svg"}
                        width={1000}
                        height={1000}
                        className="w-[20px] h-auto object-cover"
                        alt="logo"
                    />

                    <div className="font-inter text-sm md:text-base tracking-wide text-white font-medium">
                        Drepwatch
                    </div>
                </div>

                <div className="relative group">
                    <motion.button
                        whileHover={{scaleX: 1.025}}
                        whileTap={{scaleX: 0.995}}
                        className="flex gap-2.5 items-center px-4 md:px-6 py-2.5 bg-gradient-to-b from-[#FFC896] from-[-47.73%] to-[#FB652B] to-[78.41%]  text-white rounded-lg"
                    >
                        <IoWalletSharp className="text-[24px]" />
                        <div className="text-xs md:text-sm font-inter font-medium text-shadow ">
                            Connect wallet
                        </div>
                    </motion.button>


                    <div className="absolute top-full w-full min-w-max right-0 translate-y-2 bg-white/60 backdrop-blur text-primary max-h-0 group-hover:max-h-[180px] overflow-hidden transition-all duration-500 rounded-lg ">
                        <div className="flex flex-col gap-3 p-3">
                            {
                                Array(3).fill(0).map((_, i) => (
                                    <motion.button 
                                        key={i}
                                        className="w-full flex gap-2 items-center "
                                        whileHover={{scaleX: 1.025}}
                                        whileTap={{scaleX: 0.995}}
                                    >
                                        <div className="w-8 aspect-square bg-primary/50 rounded">
                                            {/* img */}
                                        </div>
                                        <div className="font-inter font-semibold tracking-wide text-primary/80 text-sm">
                                            Wallet {i+1} 
                                        </div>
                                    </motion.button>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </motion.header>
        </div>
    );
};

export default Navbar;