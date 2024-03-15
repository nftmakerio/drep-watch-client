import { GoArrowRight } from "react-icons/go";
import { motion } from "framer-motion";
import Image from "next/image";

import QueAnsCard from "./cards/que-ans";

import useInView from "~/hooks/use-in-view";

const MyQuestions: React.FC = (): React.ReactNode => {
  const { ref } = useInView();

  return (
    <section className="flex w-full flex-col gap-[40px] pb-20 pt-[120px] md:gap-[90px] md:pt-[190px]">
      <div className="relative flex items-center justify-center">
        <motion.div
          className="flex w-[90%] flex-col items-center gap-6 rounded-xl border border-primary-light bg-white shadow-color md:w-auto md:flex-row "
          whileHover={{ scale: 1.025 }}
        >
          <div className="flex flex-col divide-y divide-brd-clr md:flex-row md:divide-x ">
            <div className="flex flex-col items-center gap-3 p-8 pb-6 md:flex-row md:gap-6 md:pr-6 ">
              <Image
                src={"/assets/profile/user.png"}
                width={1000}
                height={1000}
                className="aspect-square w-[140px] object-cover"
                alt="img"
              />
              <div className="max-w-[290px] truncate font-neue-regrade text-[28px] font-medium text-black md:text-[36px]">
                aspinnqenfnqwiaklasdkjf
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 p-8 pt-6 md:py-4 md:pl-6 ">
              <div className="font-ibm-mono text-xs text-tertiary md:text-sm">
                Delegated to
              </div>
              <Image
                src={"/assets/profile/img.png"}
                width={1000}
                height={1000}
                className="aspect-square w-[60px] object-cover"
                alt="img"
              />

              <div className="rounded-lg bg-primary-light px-[18px] py-2  font-ibm-mono text-xs tracking-wide text-primary md:text-[13px]">
                uqwdbd8271gd98n13241
              </div>

              <motion.button
                className="group mt-2 flex items-center gap-1 font-inter text-sm font-medium tracking-wide text-primary"
                whileTap={{ scale: 0.995 }}
              >
                <div>View profile</div>

                <GoArrowRight className="text-lg transition-all duration-200 group-hover:translate-x-1 group-active:translate-x-0.5 md:text-xl" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex  w-full items-center justify-center bg-white px-[5%] py-7 pb-12 shadow-[-5px_0px_13px_0px_#0000001A]">
        <div
          ref={ref}
          className="flex w-full max-w-[1600px] flex-col gap-6 md:gap-10"
        >
          <div className="flex w-full flex-col items-start justify-between gap-2 font-inter font-medium tracking-wide text-secondary-dark md:flex-row md:items-center ">
            <div className="text-base md:text-xl">Your Question answers</div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {Array(1)
              .fill(0)
              .map((_, i) => (
                <QueAnsCard id={i + 1} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyQuestions;
