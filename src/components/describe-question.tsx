import { type ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import axios, { AxiosError } from "axios";
import User from "./user";

interface QuestionsProps {
  question: {
    theme: string;
    question_title: string;
    question_description: string;
  };
}

const Questions: React.FC<QuestionsProps> = ({
  question,
}: QuestionsProps): React.ReactNode => {
  const [quesData, setQuesData] = useState({
    theme: question.theme,
    question_title: question.question_title,
    question_description: question.question_description,
    user_id: 1,
    drep_id: "fd8907e6-8c0d-4814-bf71-6706ce506c7b",
  });

  const [preview, setPreview] = useState<boolean>(false);

  const handleInputChange = (fieldName: string, value: string) => {
    setQuesData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(quesData);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/questions/ask-question",
        quesData,
      );
      console.log(response.data);
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

  const handleNextButtonClick = () => {
    const { theme, question_title, question_description } = quesData;
    if (theme && question_title && question_description) {
      setPreview(true);
    }
  };

  return (
    <div className="flex w-full max-w-[1318px] flex-col gap-4 rounded-xl bg-[#FAFAFA] shadow lg:flex-row lg:pr-12">
      <div className="flex-[2_2_0%] py-12 lg:border-r lg:border-brd-clr">
        <div className="flex items-center gap-4 pl-6 md:pl-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.button
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-tertiary-light text-tertiary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LeftArrow />
            </motion.button>
          </motion.div>

          <motion.h1
            className="font-inter text-base font-semibold md:text-xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            {preview ? "Preview" : "Describe your question"}
          </motion.h1>
        </div>

        <div className="flex flex-1 items-center justify-center pt-8 md:hidden lg:pb-0">
          <User
            user={{
              img: "/assets/ask-questions/user.png",
              questionsAnswers: 860,
              questionsAsked: 950,
              name: "Drep of NMKR",
              walletId: "uqwdbd8271gd98n13241",
            }}
          />
        </div>

        <div className="mt-12 flex flex-col gap-6 px-6 md:px-12">
          <TitleAndInput
            index={1}
            value={question.theme ?? null}
            title="Theme"
            onChange={(value: string) => handleInputChange("theme", value)}
            preview={preview}
          />
          <TitleAndInput
            index={2}
            value={question.question_title ?? null}
            title="Question Title"
            onChange={(value: string) =>
              handleInputChange("question_title", value)
            }
            preview={preview}
          />
          <TitleAndInput
            textArea
            index={3}
            value={question.question_description ?? null}
            title="Question Description"
            inputPlaceholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, amet? Tempore soluta ipsam veniam quidem, quasi odit minus maxime porro, itaque nesciunt nam explicabo esse sunt, accusantium assumenda? Dicta, architecto."
            onChange={(value: string) =>
              handleInputChange("question_description", value)
            }
            preview={preview}
          />
        </div>
        {preview ? (
          <div className="mt-3 flex justify-between border-brd-clr pl-6 pr-5 pt-6 font-inter font-medium tracking-wide md:mt-8 md:pl-12 lg:border-t">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <motion.button
                className="flex h-11 items-center justify-center rounded-lg bg-tertiary-light px-8 text-sm text-secondary"
                whileHover={{ scaleX: 1.025 }}
                whileTap={{ scaleX: 0.995 }}
                onClick={() => setPreview(false)}
              >
                Back
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.button
                className="text-shadow flex h-11 items-center justify-center rounded-lg bg-gradient-to-b from-[#FFC896] from-[-47.73%] to-[#FB652B]  to-[78.41%] px-8 text-sm text-white"
                whileHover={{ scaleX: 1.025 }}
                whileTap={{ scaleX: 0.995 }}
                onClick={handleSubmit}
              >
                Submit &nbsp; &#10003;
              </motion.button>
            </motion.div>
          </div>
        ) : (
          <div className="mt-3 flex justify-between border-brd-clr pl-6 pr-5 pt-6 font-inter font-medium tracking-wide md:mt-8 md:pl-12 lg:border-t">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <motion.button
                className="flex h-11 items-center justify-center rounded-lg bg-tertiary-light px-8 text-sm text-secondary"
                whileHover={{ scaleX: 1.025 }}
                whileTap={{ scaleX: 0.995 }}
              >
                Cancel
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.button
                className="text-shadow flex h-11 items-center justify-center rounded-lg bg-gradient-to-b from-[#FFC896] from-[-47.73%] to-[#FB652B]  to-[78.41%] px-8 text-sm text-white"
                whileHover={{ scaleX: 1.025 }}
                whileTap={{ scaleX: 0.995 }}
                onClick={handleNextButtonClick}
              >
                Next &nbsp; &#10003;
              </motion.button>
            </motion.div>
          </div>
        )}
      </div>

      <div className="hidden flex-1 items-center justify-center pb-8 md:flex lg:pb-0">
        <User
          user={{
            img: "/assets/ask-questions/user.png",
            questionsAnswers: 860,
            questionsAsked: 950,
            name: "Drep of NMKR",
            walletId: "uqwdbd8271gd98n13241",
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
    setInpVal(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-1 font-inter tracking-wide">
      <motion.h2
        className="font-semibold text-secondary "
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.25, duration: 0.5 }}
      >
        {title ?? "Lorem"}
      </motion.h2>

      <div className="relative mt-2 font-medium">
        {textArea ? (
          <motion.textarea
            className="w-full resize-none overflow-hidden rounded-lg bg-tertiary-light py-3 pl-5 pr-8 font-ibm-mono text-sm text-secondary outline-none"
            placeholder={inputPlaceholder ?? "Lorem ipsum dolor sit amet"}
            value={inpVal ?? ""}
            rows={6}
            onChange={handleOnChange}
            readOnly={preview}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.35, duration: 0.5 }}
          />
        ) : (
          <motion.input
            type="text"
            className="w-full rounded-lg bg-tertiary-light px-5 py-3 pr-10 font-ibm-mono text-sm text-secondary outline-none"
            placeholder={inputPlaceholder ?? "Lorem ipsum dolor sit amet"}
            value={inpVal ?? ""}
            onChange={handleOnChange}
            readOnly={preview}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.35, duration: 0.5 }}
          />
        )}

        {value && (
          <motion.svg
            className="pointer-events-none absolute right-3 top-3 h-5 w-5 text-gray-400"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.4, duration: 0.5 }}
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
          </motion.svg>
        )}
      </div>
    </div>
  );
}
