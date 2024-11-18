import { useState } from "react";
import { FaMinus, FaThumbsUp } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Proposal } from "~/types";

const Vote = ({ title, vote }: Proposal): React.ReactNode => {
  return (
    <div className="flex max-w-[400px] flex-col overflow-hidden rounded-xl border border-brd-clr">
      <div className="mx-[18px] my-4 flex flex-col gap-5 ">
        <div className="font-inter text-sm font-medium tracking-wide text-secondary md:text-base">
          {title}
        </div>
      </div>
      <div className="flex items-center justify-center border-t border-brd-clr bg-[#F5F5F5] p-3 text-secondary md:p-5">
        <motion.button
          className={`flex items-center justify-center gap-2.5 rounded-[10px] border  border-[#E6E6E6] px-3 py-2 ${vote === "Yes" ? "bg-primary-light text-primary" : "bg-[#EAEAEA] text-[#8C8C8C]"} transition-all duration-200`}
          whileHover={{ scaleX: 1.025 }}
          whileTap={{ scaleX: 0.995 }}
        >
          {vote === "Yes" || vote === "No" ? (
            <FaThumbsUp
              className={`text-lg md:text-xl ${vote === "Yes" ? "rotate-0" : "-rotate-180"} transition-all duration-200`}
            />
          ) : (
            <FaMinus
              className={`text-lg transition-all duration-200 md:text-xl`}
            />
          )}
          <div className="font-ibm-mono text-xs font-semibold tracking-wide md:text-sm ">
            {vote}
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default Vote;
