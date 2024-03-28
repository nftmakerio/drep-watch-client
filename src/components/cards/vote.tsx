import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Proposal } from "~/types";
import moment from "moment";
import { useRouter } from "next/router";

interface VoteProps {
  test?: string;
}

const Vote = ({
  ada_amount,
  agreed,
  category,
  created_at,
  description,
  id,
  not_agreed,
  title,
}: Proposal): React.ReactNode => {
  //   const [toggle, setToggle] = useState<boolean>(Math.random() < 0.5);
  const { query } = useRouter();

  const drep_id = query.id as string;

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-brd-clr">
      <div className="mx-[18px] my-4 flex flex-col gap-5 ">
        <div className="font-inter text-sm font-medium tracking-wide text-secondary md:text-base">
          {category}
        </div>
        <div className="font-inter text-sm font-medium tracking-wide text-secondary md:text-base">
          {title}
        </div>
        <div className="font-inter text-sm font-medium tracking-wide text-secondary md:text-base">
          {ada_amount} ADA
        </div>
        <div className="font-ibm-mono text-xs text-tertiary md:text-base">
          {moment(created_at).format("LL")}
        </div>
      </div>
      <div className="flex items-center justify-center border-t border-brd-clr bg-[#F5F5F5] p-3 text-secondary md:p-5">
        <motion.button
          className={`flex items-center justify-center gap-2.5 rounded-[10px] border  border-[#E6E6E6] px-3 py-2 ${agreed.includes(drep_id) ? "bg-primary-light text-primary" : "bg-[#EAEAEA] text-[#8C8C8C]"} transition-all duration-200`}
          whileHover={{ scaleX: 1.025 }}
          whileTap={{ scaleX: 0.995 }}
        >
          {(agreed.includes(drep_id) || not_agreed.includes(drep_id)) && (
            <FaThumbsUp
              className={`text-lg md:text-xl ${agreed.includes(drep_id) ? "rotate-0" : "-rotate-180"} transition-all duration-200`}
            />
          )}
          <div className="font-ibm-mono text-xs font-semibold tracking-wide md:text-sm ">
            {agreed.includes(drep_id)
              ? "In favour"
              : not_agreed.includes(drep_id)
                ? "Adjusted Against"
                : "Not decided"}
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default Vote;
