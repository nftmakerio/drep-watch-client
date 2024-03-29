import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Proposal } from "~/types";
import moment from "moment";
import { useRouter } from "next/router";
import { CgArrowsExpandRight } from "react-icons/cg";

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
  catalyst_link,
}: Proposal): React.ReactNode => {
  //   const [toggle, setToggle] = useState<boolean>(Math.random() < 0.5);
  const { query } = useRouter();

  const drep_id = query.id as string;

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-brd-clr">
      <div className="mx-[18px] my-4 flex flex-col gap-5 ">
        <div className="flex justify-between items-center">
          <div className="font-inter text-sm font-medium tracking-wide text-secondary md:text-base">
            {category}
          </div>

          <a
            href={catalyst_link}
            rel="noreferrer"
            target="_blank"
            className="grid h-10 w-10 place-items-center rounded-lg text-tertiary transition-all hover:bg-black hover:bg-opacity-20"
          >
            <CgArrowsExpandRight size={20} />
            {/* <svg
              width="10"
              height="17"
              viewBox="0 0 10 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.44479 4.96303C9.44583 3.87067 9.0861 2.80854 8.42149 1.94161C7.75688 1.07469 6.82459 0.451507 5.76942 0.168859C4.71426 -0.113789 3.59529 -0.0400783 2.58632 0.378541C1.57735 0.79716 0.734859 1.53725 0.189711 2.48387C0.0018498 2.80943 -0.0489884 3.19629 0.048382 3.55934C0.145752 3.92238 0.383355 4.23188 0.70892 4.41974C1.03448 4.6076 1.42134 4.65844 1.78439 4.56107C2.14744 4.4637 2.45693 4.2261 2.64479 3.90053C2.83175 3.57758 3.10029 3.30944 3.42352 3.12296C3.74674 2.93648 4.1133 2.83823 4.48646 2.83803C5.05005 2.83803 5.59055 3.06192 5.98906 3.46043C6.38758 3.85895 6.61146 4.39945 6.61146 4.96303C6.61146 5.52662 6.38758 6.06712 5.98906 6.46564C5.59055 6.86415 5.05005 7.08803 4.48646 7.08803H4.48221C4.39084 7.09722 4.30065 7.11573 4.21305 7.14328C4.11792 7.15295 4.02397 7.17194 3.93254 7.19995C3.85478 7.24244 3.78126 7.29224 3.71296 7.3487C3.63158 7.39307 3.55472 7.44526 3.48346 7.50453C3.41977 7.5807 3.36422 7.66331 3.31771 7.75103C3.26595 7.81483 3.21996 7.8831 3.18029 7.95503C3.14943 8.05271 3.12901 8.15339 3.11938 8.25537C3.095 8.33672 3.0784 8.42021 3.06979 8.5047V9.92137L3.07263 9.93695V10.6325C3.07338 11.0078 3.22296 11.3674 3.48856 11.6324C3.75416 11.8975 4.11406 12.0464 4.48929 12.0464H4.49355C4.67958 12.046 4.86373 12.009 5.03546 11.9374C5.2072 11.8659 5.36316 11.7612 5.49445 11.6294C5.62574 11.4976 5.72978 11.3412 5.80063 11.1692C5.87148 10.9972 5.90775 10.8129 5.90738 10.6269L5.90454 9.68903C6.92407 9.38617 7.81893 8.76297 8.45657 7.91176C9.09422 7.06054 9.44073 6.02659 9.44479 4.96303ZM3.49054 14.5822C3.29161 14.7795 3.15566 15.0314 3.09986 15.3059C3.04406 15.5805 3.07094 15.8654 3.17708 16.1247C3.28323 16.384 3.46387 16.606 3.69618 16.7627C3.92849 16.9193 4.20203 17.0035 4.48221 17.0047C4.8577 17.0015 5.21767 16.8544 5.48804 16.5939C5.75108 16.3251 5.89839 15.9641 5.89839 15.588C5.89839 15.212 5.75108 14.8509 5.48804 14.5822C5.21688 14.3295 4.85998 14.1889 4.48929 14.1889C4.11861 14.1889 3.76171 14.3295 3.49054 14.5822Z"
                fill="#8C8C8C"
              />
            </svg> */}
          </a>
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
                ? "Abstain"
                : "Not decided"}
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default Vote;
