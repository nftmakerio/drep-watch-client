import { MdOutlineDeleteOutline, MdShare } from "react-icons/md";
import { motion } from "framer-motion";
import LetterAvatar from "../letter-avatar";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { FiEdit2 } from "react-icons/fi";

interface Question {
    theme: string;
    question_title: string;
    question_description: string;
    wallet_address: string;
    drep_id: string;
}

interface Answer {
    id: number;
    answer: string;
    uuid: string;
    drep_id: string;
    drep_name?: string | undefined;
}

interface QueAnsCardProps {
    large?: boolean;
    id?: number | string;
    question?: Question;
    answer?: Answer;
    asked_user?: string;
}

const QueAnsCard: React.FC<QueAnsCardProps> = ({
    large = false,
    id,
    question,
    answer,
    asked_user,
}: QueAnsCardProps): React.ReactNode => {
    console.log(answer, "answer");
    const [enlargeText, setEnlargeText] = useState(false);
    return (
        <motion.div
            className={`flex flex-col overflow-hidden rounded-xl border border-brd-clr ${!large && "cursor-pointer"}`}
            whileHover={{ y: large ? 0 : -6 }}
        >
            <div className="flex flex-col items-start justify-start gap-7 border-b border-brd-clr px-[18px] py-4">
                <div className="flex w-full items-center justify-between font-ibm-mono">
                    <div className="flex items-center gap-3 font-ibm-mono text-xs font-medium text-tertiary md:text-sm ">
                        <div>Question asked by</div>
                        <div className="w-[200px] overflow-hidden text-ellipsis text-black">
                            {asked_user}
                        </div>
                    </div>

                    <div className="grid h-10 w-10 place-items-center rounded-lg text-tertiary">
                        <svg
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
                        </svg>
                    </div>
                </div>

                <div className="font-inter text-sm font-medium tracking-wide text-secondary md:text-base">
                    {large ? (
                        <div className="text-xl">{question?.question_title}</div>
                    ) : (
                        <>
                            {question?.question_title}
                            {
                                (question?.question_title && question.question_title?.length > 60) && <span className="ml-2 text-[#cbcbcb]">read more...</span>
                            }
                        </>
                    )}
                </div>
                {large && (
                    <div className="font-inter text-xs font-light tracking-wide text-secondary md:text-base">
                        {question?.question_description}
                    </div>
                )}
            </div>
            {answer?.answer && (
                <div className="flex flex-col justify-start gap-11 bg-[#F5F5F5] px-[18px] py-5">
                    <div className="flex flex-col items-start justify-start gap-5">
                        <div className="flex items-center gap-3 rounded-[10px] bg-primary-light p-2 pl-3 text-primary">
                            <div className="flex items-center gap-2 font-ibm-mono text-[13px] text-xs font-medium md:text-sm ">
                                <div className="text-[#FF986F]">Answered by</div>
                                <div>{answer.drep_name ?? answer.drep_id}</div>
                            </div>

                            <div className="">
                                <LetterAvatar
                                    rounded
                                    username={answer.drep_name ?? ""}
                                    dimension={32}
                                />
                            </div>
                        </div>

                        <div className="font-inter text-sm font-medium tracking-wide text-secondary md:text-base">
                            {enlargeText ? (
                                <>
                                    {answer?.answer
                                        .split("\n\n")
                                        .map((text, i, a) => (
                                            <span className="py-4">
                                                {text}
                                                {i !== a.length - 1 &&
                                                    <>
                                                        <br /> <br />
                                                    </>
                                                }
                                            </span>
                                        ))}
                                    <span
                                        onClick={() => setEnlargeText((prev) => !prev)}
                                        className="ml-2 text-[#cbcbcb]"
                                    >
                                        Read less...
                                    </span>
                                </>
                            ) : (
                                <>
                                    {answer?.answer.slice(0, 60)}
                                    ...
                                    <span
                                        onClick={() => setEnlargeText((prev) => !prev)}
                                        className="ml-2 text-[#cbcbcb]"
                                    >
                                        Read more...
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-5">
                        <div className="flex items-center gap-2">
                            <div className="font-ibm-mono text-xs font-medium uppercase text-tertiary md:text-sm">
                                Tags
                            </div>
                            <div className="flex items-center gap-1 flex-wrap">
                                {[question?.theme].map((i) => (
                                    <div
                                        className="rounded-full bg-white px-3 py-1 font-inter text-xs font-medium text-[#444] md:text-[13px] max-w-[200px] truncate"
                                        title={i}
                                        key={i}
                                    >
                                        {i}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <motion.button
                            className="cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={async () => {
                                try {
                                    await navigator.clipboard.writeText("/answer/" + id);
                                    toast.success('Copied the sharing link');
                                } catch (err) {
                                    toast.error('Failed to copy to clipboard');
                                }
                            }}
                        >
                            <MdShare className="text-lg text-[#8c8c8c] md:text-xl" />
                        </motion.button>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default QueAnsCard;


const AdminQueAnsCard = () => {
    const initialValue = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a accumsan. Etiam commodo, massa ultrices elementum sagittis, nisl arcu lobortis eros, nec consectetur lacus diam eget massa. Suspendisse potenti. Donec sed finibus purus. Aliquam facilisis.";

    const MAX_LIMIT = 270;

    const [value, setValue] = useState<string>(initialValue);
    const [currentLimit, setCurrentLimit] = useState<number>(MAX_LIMIT - value.length);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [originalValue, setOriginalValue] = useState<string>(initialValue);

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isEdit && textAreaRef.current) {
            const textLength = value.length;
            textAreaRef.current.focus();
            textAreaRef.current.setSelectionRange(textLength, textLength);
        }
    }, [isEdit, value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputValue = e.target.value;
        if (inputValue.length <= MAX_LIMIT) {
            setValue(inputValue);
            setCurrentLimit(MAX_LIMIT - inputValue.length);
        }
    };

    const toggleEditMode = () => {
        if (!isEdit) {
            setOriginalValue(value); // Save the original value when entering edit mode
        }
        setIsEdit(!isEdit);
    };

    const handleSave = () => {
        setIsEdit(false); // Exit edit mode
    };

    const handleCancel = () => {
        setValue(originalValue); // Revert to original value
        setIsEdit(false); // Exit edit mode
    };

    const renderTextArea = () => {
        return (
            <textarea
                ref={textAreaRef}
                className="outline-none w-full resize-y"
                value={value}
                onChange={handleChange}
                rows={5}
            />
        );
    };

    const renderContent = () => {
        return (
            <div onClick={() => setIsEdit(true)}>
                {value}
            </div>
        );
    };

    const renderCharacterLimit = () => {
        const characterLimitText = `${currentLimit} Characters left`;
        const textColor = currentLimit < 10 ? "text-red-600" : "text-secondary/60";
        return isEdit ? <div className={textColor + " text-sm"}>{characterLimitText}</div> : null;
    };

    const renderButtons = () => {
        return (
            <div className="flex gap-3 items-center justify-end w-full">
                <button className="py-2.5 px-4 border border-brd-clr font-semibold rounded-lg text-secondary-dark" onClick={handleCancel}>
                    Cancel
                </button>
                <button className="py-2.5 px-4 border border-primary bg-primary font-semibold rounded-lg text-white" onClick={handleSave}>
                    Save
                </button>
            </div>
        );
    };

    return (
        <motion.div
            className="flex flex-col overflow-hidden rounded-xl border border-brd-clr cursor-pointer"
            whileHover={{ y: -6 }}
        >
            <div className="flex flex-col items-start justify-start gap-4 border-b border-brd-clr px-[18px] py-4">
                <div className="font-inter text-xs font-medium tracking-wide md:text-sm w-full">
                    <div className="flex flex-col w-full justify-start items-start gap-4">
                        <div className="text-secondary-dark">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit?
                        </div>

                        <div className="flex gap-1.5 flex-col w-full">
                            <div className="flex w-full justify-between items-center">
                                <div className="text-primary">
                                    Answer
                                </div>

                                <div className="flex gap-5 items-center text-base">
                                    <div onClick={toggleEditMode} className="text-[#006AB5] cursor-pointer">
                                        <FiEdit2 />
                                    </div>
                                    <div className="text-primary cursor-pointer">
                                        <MdOutlineDeleteOutline />
                                    </div>
                                </div>
                            </div>

                            <div className="border border-brd-clr px-3.5 py-2.5 rounded-lg text-secondary font-normal">
                                {isEdit ? renderTextArea() : renderContent()}
                            </div>

                            {renderCharacterLimit()}
                        </div>

                        {isEdit && renderButtons()}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export { AdminQueAnsCard };

