import { BsChatQuoteFill } from "react-icons/bs";
import { motion } from "framer-motion";
import Image from "next/image";

import QueAnsCard from "./cards/que-ans";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { BASE_API_URL } from "~/data/api";
import type { Answer, Question } from "~/types";
import axios, { AxiosError } from "axios";
import LetterAvatar from "./letter-avatar";
import Link from "next/link";
import { getData } from "~/server";
import Loader from "./loader";
import ErrorCard from "./cards/error";
import { useWallet } from "@meshsdk/react";
import { Transaction } from "@meshsdk/core";
import toast from "react-hot-toast";
import Masonry from "react-masonry-css";
import { useWalletStore } from "~/store/wallet";
import { BlockfrostProvider, MeshTxBuilder } from "@meshsdk/core";
import { ReactNode } from "react";

const protocolParams = {
  linearFee: {
    minFeeA: "44",
    minFeeB: "155381",
  },
  minUtxo: "1000000",
  poolDeposit: "500000000",
  keyDeposit: "2000000",
  maxValSize: 5000,
  maxTxSize: 16384,
  priceMem: 0.0577,
  priceStep: 0.0000721,
  coinsPerUTxOByte: "4310",
};

const Answer: React.FC = (): ReactNode => {
  const { query } = useRouter();

  const { connected, wallet, name } = useWallet();

  const { delegatedTo } = useWalletStore();

  // const [certBuilder, setCertBuilder] = useState<CertificatesBuilder | null>(
  //   null,
  // );

  const { data, error: err1 } = useQuery({
    queryKey: ["question-data", query.id],
    queryFn: async () => {
      try {
        const questionRes = await fetch(
          `${BASE_API_URL}/api/v1/questions/${query.id}`,
        );

        const question = (await questionRes.json()) as { question: Question };

        return {
          question: question.question,
        };
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  });

  const { data: answerData, error } = useQuery({
    queryKey: ["answer-data", query.id],
    queryFn: async () => {
      try {
        const answerRes = await fetch(
          `${BASE_API_URL}/api/v1/answers/${query.id}`,
        );

        const answer = (await answerRes.json()) as Answer;

        if (!answer.drep_id) throw new Error("No data found");

        return {
          answer,
        };
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  });

  const fetchData = async () => {
    try {
      if (!data?.question.drep_id) return;
      const response = await axios.post(
        `${BASE_API_URL}/api/v1/drep/drep-profile`,
        { drep_id: data?.question.drep_id },
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

  const { data: profileData, error: err2 } = useQuery({
    queryKey: ["drep-profile", data?.question.drep_id],
    queryFn: () => fetchData(),
  });

  const { isLoading, data: pageData } = useQuery({
    queryFn: () => getData(2, 1),
    queryKey: ["latest_questions"],
  });

  const onDelegate = async () => {
    try {
      if (!connected) {
        toast.error("Please connect your wallet to delegate.");
        return;
      }

      const address = (await wallet.getRewardAddresses())[0];

      if (!address) {
        return;
      }

      const poolId = answerData?.answer.drep_id;

      if (!poolId) {
        return;
      }

      const utxos = await wallet.getUtxos();
      const rewardAddresses = await wallet.getRewardAddresses();
      const rewardAddress = rewardAddresses[0];
      const changeAddress = await wallet.getChangeAddress();

      const response = await fetch("/api/delegate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          utxos,
          dRepId: poolId,
          rewardAddress,
          changeAddress,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delegate. Please try again.");
      }

      const { cbor: unsignedTx } = await response.json();

      const signedTx = await wallet.signTx(unsignedTx);
      const txHash = await wallet.submitTx(signedTx);

      if (txHash) {
        toast.success(
          `Successfully delegated to ${answerData?.answer.drep_id}. Transaction Hash: ${txHash}`,
        );
      } else {
        throw new Error("Failed to delegate. Please try again.");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      console.log(error);
    }
  };

  if (err1)
    return (
      <section className="flex w-full items-center justify-center pt-32">
        <ErrorCard />
      </section>
    );

  if (!data) {
    return (
      <section className="flex w-full flex-col gap-[40px] pb-20 pt-[150px] md:gap-[90px] md:pt-[190px]">
        <Loader />
      </section>
    );
  }

  return (
    <section className="flex w-full flex-col gap-[40px] pb-20 pt-[150px] md:gap-[90px] md:pt-[190px]">
      {profileData ? (
        <div className="">
          <div className="relative flex items-center justify-center">
            <div className="absolute top-0 -translate-y-1/2 rounded-[10px] bg-primary-light px-5 py-3 font-ibm-mono text-xs text-primary md:text-[13px]">
              {profileData?.questionsAnswers}/{profileData?.questionsAsked}{" "}
              Question answered
            </div>

            <div className="flex w-[90%] flex-col items-center gap-6 rounded-xl border border-primary-light bg-white px-5  pb-7  pt-9 shadow-color md:w-auto md:flex-row ">
              <div>
                <LetterAvatar
                  username={data?.question.drep_id}
                  dimension={130}
                />
              </div>
              <div className="flex flex-col items-center md:items-start">
                <div className="max-w-xs overflow-hidden text-ellipsis text-center font-ibm-mono text-xs tracking-wide text-tertiary md:max-w-max md:text-left md:text-sm">
                  {data?.question.drep_id.slice(0, 16)}...
                </div>
                <div className="font-neue-regrade text-[36px] font-semibold text-black ">
                  {data?.question.drep_id.slice(0, 16)}...
                </div>
                <div className="mt-5 flex items-center gap-2.5">
                  <Link
                    href={`/ask-question?to=${data?.question.drep_id}`}
                    className="flex items-center gap-2.5 rounded-lg bg-gradient-to-b from-[#FFC896] from-[-47.73%] to-[#FB652B] to-[78.41%] px-4 py-2.5 text-white"
                  >
                    <BsChatQuoteFill className="text-[24px]" />
                    <div className="text-shadow font-inter text-xs font-medium md:text-sm ">
                      Ask question
                    </div>
                  </Link>

                  <motion.button
                    onClick={() => onDelegate()}
                    className="flex items-center gap-2.5 rounded-lg bg-[#EAEAEA] px-4 py-2.5 text-secondary disabled:cursor-not-allowed disabled:opacity-65"
                    whileHover={{ scaleX: 1.025 }}
                    whileTap={{ scaleX: 0.995 }}
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
      ) : (
        <Loader />
      )}

      {data && (
        <div className="flex  w-full items-center justify-center bg-white px-[5%] py-7 pb-12 shadow-[-5px_0px_13px_0px_#0000001A]">
          <div className="flex w-full max-w-[1600px] flex-col gap-6 md:gap-10">
            <div>
              <QueAnsCard
                answer={answerData?.answer}
                asked_user={data?.question.wallet_address}
                question={data.question}
                large={true}
                id={query.id as string}
              />
            </div>

            <div className="flex w-full flex-col items-start justify-between gap-2 font-inter font-medium tracking-wide text-secondary-dark md:flex-row md:items-center ">
              <div className="text-base md:text-xl">
                Further question to this Drep
              </div>
            </div>

            <div
              className={`${pageData && pageData.questionAnswers ? "w-full" : "flex w-full items-center"}`}
            >
              {pageData && pageData.questionAnswers ? (
                <Masonry
                  breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
                  className="masonry-grid"
                  columnClassName="masonry-column"
                >
                  {pageData.questions.map((question, i) => (
                    <div key={i} className="masonry-item">
                      <QueAnsCard
                        asked_user={question.wallet_address}
                        question={question}
                        answer={pageData.answers[i]}
                        id={question.uuid}
                      />
                    </div>
                  ))}
                </Masonry>
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Answer;
