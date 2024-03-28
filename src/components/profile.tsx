import { useEffect, useState } from "react";
import { BsChatQuoteFill } from "react-icons/bs";
import { motion } from "framer-motion";
import Image from "next/image";
import { Transaction } from "@meshsdk/core";

import QueAnsCard from "./cards/que-ans";
import Vote from "./cards/vote";

import {
  P_FILTER_TYPES,
  P_FILTERS,
  P_SMALL_WIDTHS,
  P_WIDTHS,
} from "~/constants";
import useDeviceType from "~/hooks/use-device-type";
import useInView from "~/hooks/use-in-view";
import { useParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import { DrepType, UserType } from "~/types";
import Link from "next/link";
import { BASE_API_URL } from "~/data/api";
import { useQuery } from "@tanstack/react-query";
import { getDrepQuestions } from "~/server";
import { useRouter } from "next/router";
import LetterAvatar from "./letter-avatar";
import ErrorCard from "./cards/error";
import { useWallet } from "@meshsdk/react";
import toast from "react-hot-toast";
import Masonry from "react-masonry-css";
import { useWalletStore } from "~/store/wallet";

const Profile: React.FC = (): React.ReactNode => {
  const { query } = useRouter();
  const { connected, wallet } = useWallet();
  const { delegatedTo } = useWalletStore();

  const [active, setActive] = useState<number>(
    P_FILTER_TYPES.QUESTIONS_ANSWERS,
  );

  const deviceType = useDeviceType();
  const { initialLoad, ref } = useInView();

  const getLeftOffset = (): string => {
    const ACTIVE_WIDTHS = deviceType === "mobile" ? P_SMALL_WIDTHS : P_WIDTHS;

    const activeKeys = Object.keys(ACTIVE_WIDTHS).slice(0, active - 1);
    const sum = activeKeys.reduce(
      (acc, key) => acc + parseInt(ACTIVE_WIDTHS[parseInt(key)]!, 10),
      0,
    );

    return `${sum}px`;
  };

  const getWidth = () => {
    const ACTIVE_WIDTHS = deviceType === "mobile" ? P_SMALL_WIDTHS : P_WIDTHS;
    return ACTIVE_WIDTHS[active];
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/api/v1/drep/drep-profile`,
        { drep_id: query.id },
      );
      // setProfileData(response.data);

      return response.data;
      //   console.log(data);
    } catch (error: unknown) {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.data
      ) {
        const responseData = error.response.data;
        console.log(responseData);
      }
      console.log(error);
    }
  };

  const { data: profileData, error: err1 } = useQuery({
    queryKey: ["drep-profile", query?.id],
    queryFn: () => fetchData(),
  });

  const { data: questions, error: err2 } = useQuery({
    queryKey: ["drep-profile-questions", query?.id],
    queryFn: () => (query.id ? getDrepQuestions(query?.id as string) : null),
  });

  // useEffect(() => {
  //   console.log(questions, "|fdsafdsafas")
  // }, [questions])

  if (query?.id && err1)
    return (
      <section className="flex w-full items-center justify-center pt-32">
        <ErrorCard />
      </section>
    );

  const onDelegate = async () => {
    try {
      if (!connected) {
        toast.error("Please connect your wallet to delegate.")

        return;
      }

      const address = (await wallet.getRewardAddresses())[0];

      if (!address) {
        return;
      }

      const poolId = query.id as string;

      if (!poolId) {
        return;
      }

      const tx = new Transaction({ initiator: wallet });

      if (!delegatedTo.active) {
        tx.registerStake(address);
      }

      tx.delegateStake(address, poolId);

      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      const txHash = await wallet.submitTx(signedTx);

      toast.success(`Successfully delegated to ${query.id}`);
    } catch (error) {
      if(error instanceof Error){
        toast.error(error.message)
      }
      console.log(error);
    }
  };

  return (
    <section className="flex w-full flex-col gap-[40px] pb-20 pt-[150px] md:gap-[90px] md:pt-[190px]">
      <div className="">
        <div className="relative flex items-center justify-center">
          <div className="absolute top-0 -translate-y-1/2 rounded-[10px] bg-primary-light px-5 py-3 font-ibm-mono text-xs text-primary md:text-[13px]">
            {profileData?.questionsAnswers}/{profileData?.questionsAsked}{" "}
            Question answered
          </div>

          <div className="flex w-[90%] flex-col items-center gap-6 rounded-xl border border-primary-light bg-white px-5  pb-7  pt-9 shadow-color md:w-auto md:flex-row ">
            <div>
              <LetterAvatar
                rounded
                username={profileData?.name}
                dimension={130}
              />
            </div>
            <div className="flex flex-col">
              <div className="w-[300px] overflow-hidden text-ellipsis text-center font-ibm-mono text-xs tracking-wide text-tertiary md:text-left md:text-sm">
                {profileData?.drep_id}
              </div>
              <div className="text-center font-neue-regrade text-[36px] font-semibold text-black md:text-start">
                {profileData?.name}
              </div>
              <div className="mt-5 flex items-center gap-2.5">
                <Link
                  href={`/ask-question?to=${query?.id}`}
                  className="flex items-center gap-2.5 rounded-lg bg-gradient-to-b from-[#FFC896] from-[-47.73%] to-[#FB652B] to-[78.41%] px-4 py-2.5 text-white"
                >
                  <BsChatQuoteFill className="text-[24px]" />
                  <>
                    <div className="text-shadow font-inter text-xs font-medium md:text-sm ">
                      Ask question
                    </div>
                  </>
                </Link>

                <motion.button
                  className="flex items-center gap-2.5 rounded-lg bg-[#EAEAEA] px-4 py-2.5 text-secondary disabled:cursor-not-allowed disabled:opacity-65"
                  whileHover={{ scaleX: 1.025 }}
                  whileTap={{ scaleX: 0.995 }}
                  onClick={onDelegate}
                >
                  <div className="font-inter text-xs font-medium md:text-sm ">
                    Delegate
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex  w-full items-center justify-center bg-white px-[5%] py-7 pb-12 shadow-[-5px_0px_13px_0px_#0000001A]">
        <div
          ref={ref}
          className="flex w-full max-w-[1600px] flex-col gap-6 md:gap-10"
        >
          <div className="flex w-full flex-col items-start justify-between gap-2 font-inter font-medium tracking-wide text-secondary-dark md:flex-row md:items-center ">
            <div className="text-base md:text-xl">Questions and answers</div>
            <motion.div
              className="rounded-lg p-1.5 text-xs text-tertiary md:text-sm"
              initial={{ backgroundColor: "transparent", opacity: 0 }}
              whileInView={{ backgroundColor: "#EAEAEA", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.75, duration: 0.5 }}
            >
              <div className="relative flex  ">
                {P_FILTERS.map((filter, i) => (
                  <motion.div
                    key={filter.type}
                    className={`relative z-[1] px-2 py-1.5 ${active === filter.type ? "text-black " : "text-tertiary"} cursor-pointer hover:text-secondary `}
                    onClick={() => setActive(filter.type)}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                  >
                    {filter.label}
                  </motion.div>
                ))}

                <motion.div
                  className="absolute bottom-0 left-0 top-0 z-0 h-full rounded-md bg-white mix-blend-overlay shadow-md transition-[left_200ms,width_200ms]"
                  style={{ left: getLeftOffset(), width: getWidth() }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.25, duration: 0.5 }}
                />
              </div>
            </motion.div>
          </div>

          {active === P_FILTER_TYPES.QUESTIONS_ANSWERS && (
            <div className="w-full">
              {questions && questions.questions && (
                <Masonry
                  breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
                  className="masonry-grid"
                  columnClassName="masonry-column"
                >
                  {questions.questions.map((question, i) => (
                    <div key={i} className="masonry-item">
                      <QueAnsCard
                        asked_user={question.wallet_address}
                        question={question}
                        answer={questions.answers[i]}
                        id={question.uuid}
                      />
                    </div>
                  ))}
                </Masonry>
              )}
            </div>
          )}

          {active === P_FILTER_TYPES.VOTES && (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i}>
                    <Vote />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
