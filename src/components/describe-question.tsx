import { type ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import axios, { AxiosError } from "axios";
import User from "./user";
import { BASE_API_URL } from "~/data/api";
import { useRouter } from "next/router";
import { useWalletStore } from "~/store/wallet";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useWallet } from "@meshsdk/react";
import Loader from "./loader";
import ErrorCard from "./cards/error";

interface QuestionsProps {
  question: {
    theme: string;
    question_title: string;
    question_description: string;
  };
}

const Questions = (): React.ReactNode => {
  const { query, push, back } = useRouter();
  const [quesData, setQuesData] = useState({
    question_description: "",
    question_title: "",
    theme: "",
  });

  const [preview, setPreview] = useState<boolean>(false);

  const { stake_address } = useWalletStore();

  const { connected } = useWallet();

  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (fieldName: string, value: string) => {
    setQuesData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(query);
    setLoading(true);
    try {
      if (!stake_address || stake_address.length === 0) {
        toast.error(
          "Please try connecting wallet again and submit the question!",
        );
        return;
      }
      const response = await axios.post(
        `${BASE_API_URL}/api/v1/questions/ask-question`,
        { drep_id: query.to, ...quesData, wallet_address: stake_address },
      );
      console.log(response.data);
      toast.success("Submitted Successfully");
      void push("/my-questions");
    } catch (error: unknown) {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.data
      ) {
        toast.error("Failed to submit question");
        const responseData = error.response.data;
        console.log(responseData);
      }
      console.log(error);
    }
    setLoading(false);
  };

  const handleNextButtonClick = () => {
    if (!connected) {
      toast.error("Please connect your wallet to submit.");
    }
    const { theme, question_title, question_description } = quesData;
    if (theme && question_title && question_description && connected) {
      setPreview(true);
    }
  };

  const fetchData = async () => {
    try {
      if (!query.to) {
        return;
      }

      const response = await axios.post<{
        questionsAsked: number;
        questionsAnswers: number;
        image?: string;
        name?: string;
      }>(`${BASE_API_URL}/api/v1/drep/drep-profile`, { drep_id: query.to });
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

  const {
    data: profileData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["drep-profile", query.to],
    queryFn: () => fetchData(),
  });

  if (query.to && error)
    return (
      <section className="flex w-full items-center justify-center pt-32">
        <ErrorCard />
      </section>
    );

  if (isLoading)
    return (
      <section className="flex w-full flex-col gap-[40px] pb-20 pt-[150px] md:gap-[90px] md:pt-[190px]">
        <Loader />
      </section>
    );

  return (
    <div className="flex w-full max-w-[1318px] flex-col gap-4 rounded-xl bg-[#FAFAFA] shadow lg:flex-row lg:pr-12">
      <div className="flex-[2_2_0%] py-12 lg:border-r lg:border-brd-clr">
        <div className="flex items-center gap-4 pl-6 md:pl-12">
          <div>
            <motion.button
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-tertiary-light text-tertiary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={back}
            >
              <LeftArrow />
            </motion.button>
          </div>

          <h1 className="font-inter text-base font-semibold md:text-xl">
            {preview ? "Preview" : "Describe your question"}
          </h1>
        </div>

        <div className="flex flex-1 items-center justify-center pt-8 md:hidden lg:pb-0">
          <User
            user={{
              img: "/assets/ask-questions/user.png",
              name: "Drep of NMKR",
              questionsAnswers: 860,
              questionsAsked: 950,
              walletId: "uqwdbd8271gd98n13241",
            }}
          />
        </div>

        <div className="mt-12 flex flex-col gap-6 px-6 md:px-12">
          <TitleAndInput
            index={1}
            value={quesData.theme}
            title="Theme"
            inputPlaceholder=""
            onChange={(value: string) => handleInputChange("theme", value)}
            preview={preview}
          />
          <TitleAndInput
            index={2}
            value={quesData.question_title}
            title="Question Title"
            onChange={(value: string) =>
              handleInputChange("question_title", value)
            }
            inputPlaceholder=""
            preview={preview}
          />
          <TitleAndInput
            textArea={true}
            index={3}
            value={quesData.question_description}
            title="Question Description"
            inputPlaceholder=""
            onChange={(value: string) =>
              handleInputChange("question_description", value)
            }
            preview={preview}
          />
        </div>
        {preview ? (
          <div className="mt-3 flex justify-between border-brd-clr pl-6 pr-5 pt-6 font-inter font-medium tracking-wide md:mt-8 md:pl-12 lg:border-t">
            <motion.button
              className="flex h-11 items-center justify-center rounded-lg bg-tertiary-light px-8 text-sm text-secondary"
              whileHover={{ scaleX: 1.025 }}
              whileTap={{ scaleX: 0.995 }}
              onClick={() => setPreview(false)}
            >
              Back
            </motion.button>
            <motion.button
              className={`text-shadow flex h-11 items-center justify-center rounded-lg bg-gradient-to-b from-[#FFC896] from-[-47.73%] to-[#FB652B]  to-[78.41%] px-8 text-sm text-white ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
              whileHover={{ scaleX: 1.025 }}
              whileTap={{ scaleX: 0.995 }}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  Submitting <Loader colored={true} />
                </span>
              ) : (
                <>Submit &nbsp; &#10003;</>
              )}
            </motion.button>
          </div>
        ) : (
          <div className="mt-3 flex justify-between border-brd-clr pl-6 pr-5 pt-6 font-inter font-medium tracking-wide md:mt-8 md:pl-12 lg:border-t">
            <div>
              <motion.button
                className="flex h-11 items-center justify-center rounded-lg bg-tertiary-light px-8 text-sm text-secondary"
                whileHover={{ scaleX: 1.025 }}
                whileTap={{ scaleX: 0.995 }}
                onClick={() => push("/")} // change if u need another state
              >
                Cancel
              </motion.button>
            </div>
            <motion.button
              className="text-shadow flex h-11 items-center justify-center rounded-lg bg-gradient-to-b from-[#FFC896] from-[-47.73%] to-[#FB652B]  to-[78.41%] px-8 text-sm text-white"
              whileHover={{ scaleX: 1.025 }}
              whileTap={{ scaleX: 0.995 }}
              onClick={handleNextButtonClick}
            >
              {connected ? "Next" : "Connect wallet to submit"} &nbsp; &#10003;
            </motion.button>
          </div>
        )}
      </div>

      <div className="hidden flex-1 items-center justify-center pb-8 md:flex lg:pb-0">
        <User
          user={{
            img: profileData?.image,
            name: `${profileData?.name ?? `${(query.to ?? "").slice(0, 16)}...`}` as string,
            questionsAnswers: profileData?.questionsAnswers ?? 0,
            questionsAsked: profileData?.questionsAsked ?? 0,
            walletId: (query.to as string) ?? "",
          }}
        />
      </div>
    </div>
  );
};

export default Questions;

function LeftArrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M13.3584 4.55806C13.6025 4.80214 13.6025 5.19786 13.3584 5.44194L8.80039 10L13.3584 14.5581C13.6025 14.8021 13.6025 15.1979 13.3584 15.4419C13.1144 15.686 12.7186 15.686 12.4746 15.4419L7.47456 10.4419C7.23048 10.1979 7.23048 9.80214 7.47456 9.55806L12.4746 4.55806C12.7186 4.31398 13.1144 4.31398 13.3584 4.55806Z"
        fill="#8C8C8C"
      />
    </svg>
  );
}

interface InputProps {
  title?: string;
  inputPlaceholder?: string;
  textArea?: boolean;
  value: string | null;
  index: number;
  onChange: (value: string) => void;
  preview: boolean;
}

function TitleAndInput({
  title,
  inputPlaceholder,
  textArea,
  value,
  index,
  onChange,
  preview,
}: InputProps) {
  const [inpVal, setInpVal] = useState<string>(value ?? "");

  const handleOnChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    let newValue = e.target.value;
    if (e.target.name === "theme") {
      newValue = newValue.trim().replace(/\s/g, ",");
    }
    setInpVal(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex flex-col gap-1 font-inter tracking-wide">
      <h2 className="font-semibold text-secondary ">{title ?? "Lorem"}</h2>

      <div className="relative mt-2 font-medium">
        {textArea ? (
          <textarea
            className="w-full resize-none overflow-hidden rounded-lg bg-tertiary-light py-3 pl-5 pr-8 font-ibm-mono text-sm text-secondary outline-none"
            placeholder={inputPlaceholder}
            value={inpVal ?? ""}
            rows={6}
            onChange={handleOnChange}
            readOnly={preview}
          />
        ) : (
          <input
            type="text"
            className="w-full rounded-lg bg-tertiary-light px-5 py-3 pr-10 font-ibm-mono text-sm text-secondary outline-none"
            placeholder={inputPlaceholder ?? "Lorem ipsum dolor sit amet"}
            value={inpVal ?? ""}
            onChange={handleOnChange}
            readOnly={preview}
            name={title?.toLowerCase()}
          />
        )}

        {!preview && value && (
          <svg
            className="pointer-events-none absolute right-3 top-3 h-5 w-5 text-gray-400"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.7404 1.18391C14.9845 0.939835 15.3802 0.939835 15.6243 1.18391L19.1599 4.71944C19.2771 4.83665 19.3429 4.99562 19.3429 5.16138C19.3429 5.32714 19.2771 5.48611 19.1599 5.60332L6.19623 18.5669C6.07902 18.6842 5.92004 18.75 5.75427 18.75L2.21884 18.7499C1.87368 18.7499 1.59387 18.4701 1.59386 18.1249L1.59375 14.5895C1.59374 14.4237 1.65959 14.2647 1.77681 14.1475L14.7404 1.18391ZM15.1824 2.50974L2.84376 14.8483L2.84384 17.4999L5.49541 17.5L17.834 5.16138L15.1824 2.50974Z"
              fill="#8C8C8C"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.2047 4.71937C11.4488 4.4753 11.8445 4.4753 12.0886 4.71937L15.6241 8.25492C15.8682 8.49899 15.8682 8.89472 15.6241 9.1388C15.3801 9.38288 14.9843 9.38288 14.7402 9.1388L11.2047 5.60326C10.9606 5.35918 10.9606 4.96345 11.2047 4.71937Z"
              fill="#8C8C8C"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
