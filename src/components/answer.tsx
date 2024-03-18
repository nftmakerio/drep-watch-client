import { BsChatQuoteFill } from "react-icons/bs";
import { motion } from "framer-motion";
import Image from "next/image";

import QueAnsCard from "./cards/que-ans";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { BASE_API_URL } from "~/data/api";
import { Answer, Question } from "~/types";
import axios, { AxiosError } from "axios";
import LetterAvatar from "./LetterAvartar";
import Link from "next/link";
import { getData } from "~/server";
import Loader from "./loader";
import ErrorCard from "./cards/Error";

const Answer: React.FC = (): React.ReactNode => {
  const { query } = useRouter();

  const { data, error: err1 } = useQuery({
    queryKey: ["question-data", query.id],
    queryFn: async () => {
      try {
        const questionRes = await fetch(
          `${BASE_API_URL}/api/v1/questions/${query.id}`,
        );

        const question = (await questionRes.json()) as { question: Question };

        console.log(question.question, "fasdfas");

        const answerRes = await fetch(
          `${BASE_API_URL}/api/v1/answers/${query.id}`,
        );

        const answer = (await answerRes.json()) as Answer;

        if (!question.question || !answer.drep_id) throw new Error("No data found");

        return {
          question: question.question,
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
      if (!data?.answer.drep_id) return;
      const response = await axios.post(
        `${BASE_API_URL}/api/v1/drep/drep-profile`,
        { drep_id: data?.answer.drep_id },
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
    queryKey: ["drep-profile", data?.answer.drep_id],
    queryFn: () => fetchData(),
  });

  const { isLoading, data: pageData } = useQuery({
    queryFn: () => getData(2),
    queryKey: ["latest_questions"],
  });

  if (err1 || err2) return (
    <section className="w-full pt-32 flex items-center justify-center">
      <ErrorCard />
    </section>
  );

  return (
    <section className="flex w-full flex-col gap-[40px] pb-20 pt-[150px] md:gap-[90px] md:pt-[190px]">
      <div className="">
        <div className="relative flex items-center justify-center">
          <div className="absolute top-0 -translate-y-1/F2 rounded-[10px] bg-primary-light px-5 py-3 font-ibm-mono text-xs text-primary md:text-[13px]">
            {profileData?.questionsAnswers}/{profileData?.questionsAsked}{" "}
            Question answered
          </div>

          <div className="flex w-[90%] flex-col items-center gap-6 rounded-xl border border-primary-light bg-white px-5  pb-7  pt-9 shadow-color md:w-auto md:flex-row ">
            <div>
              <LetterAvatar username={profileData?.name} dimension={130} />
            </div>
            <div className="flex flex-col">
              <div className="text-center font-ibm-mono text-xs tracking-wide text-tertiary md:text-left md:text-sm">
                {profileData?.drep_id}
              </div>
              <div className="font-neue-regrade text-[36px] font-semibold text-black ">
                {profileData?.name}
              </div>
              <div className="mt-5 flex items-center gap-2.5">
                <Link
                  href={`/ask-question?to=${profileData?.drep_id}`}
                  className="flex items-center gap-2.5 rounded-lg bg-gradient-to-b from-[#FFC896] from-[-47.73%] to-[#FB652B] to-[78.41%] px-4 py-2.5 text-white"
                >
                  <BsChatQuoteFill className="text-[24px]" />
                  <div className="text-shadow font-inter text-xs font-medium md:text-sm ">
                    Ask question
                  </div>
                </Link>

                <motion.button
                  className="flex items-center gap-2.5 rounded-lg bg-[#EAEAEA] px-4 py-2.5 text-secondary"
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

      {data && (
        <div className="flex  w-full items-center justify-center bg-white px-[5%] py-7 pb-12 shadow-[-5px_0px_13px_0px_#0000001A]">
          <div className="flex w-full max-w-[1600px] flex-col gap-6 md:gap-10">
            <div>
              <QueAnsCard
                answer={data.answer}
                asked_user={data?.question.wallet_address}
                question={data.question}
                large={true}
              />
            </div>

            <div className="flex w-full flex-col items-start justify-between gap-2 font-inter font-medium tracking-wide text-secondary-dark md:flex-row md:items-center ">
              <div className="text-base md:text-xl">
                Further question to this Drep
              </div>
            </div>

            <div
              className={`${pageData && pageData.questionAnswers ? "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" : "flex w-full items-center"}`}
            >
              {pageData && pageData.questionAnswers ? (
                pageData.questions.map((question, i) => (
                  <div key={i}>
                    <QueAnsCard
                      asked_user={question.wallet_address}
                      question={question}
                      answer={pageData.answers[i]}
                      id={i + 1}
                    />
                  </div>
                ))
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
