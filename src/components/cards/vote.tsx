import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa6";
import { motion } from "framer-motion";

interface VoteProps {
    test?: string;
};

const Vote: React.FC<VoteProps> = ({  }: VoteProps): React.ReactNode => {
    const [toggle, setToggle] = useState<boolean>(Math.random() < 0.5);

    return (
        <div
            className="border-brd-clr border rounded-xl flex flex-col overflow-hidden"
        >
            <div className="my-4 mx-[18px] flex flex-col gap-5 ">
                <div className="font-inter font-medium text-sm md:text-base tracking-wide text-secondary">
                    Would the AFD finally favor the pensioners vs. end the statutory pensioners (inflation compensation etc.) ?
                </div>
                <div className="font-ibm-mono text-xs md:text-base text-tertiary">
                    12 FEB 2024
                </div>
            </div>
            <div className="bg-[#F5F5F5] border-t border-brd-clr text-secondary p-3 md:p-5 flex justify-center items-center">
                <motion.button 
                    className={`py-2 px-3 flex justify-center items-center gap-2.5  rounded-[10px] border border-[#E6E6E6] ${toggle ? "bg-primary-light text-primary" : "bg-[#EAEAEA] text-[#8C8C8C]"} transition-all duration-200`}
                    onClick={() => setToggle(p => !p)}
                    whileHover={{scaleX: 1.025}}
                    whileTap={{scaleX: 0.995}}
                >
                    <FaThumbsUp  className={`text-lg md:text-xl ${toggle ? "rotate-0" : "-rotate-180"} transition-all duration-200`} />
                    <div className="font-ibm-mono font-semibold text-xs md:text-sm tracking-wide ">
                        {toggle ? "In favour" : "Adjusted Against"}
                    </div>
                </motion.button>
            </div>
        </div>
    );
};

export default Vote;