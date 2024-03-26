import { MdOutlineDeleteOutline, MdShare } from "react-icons/md";
import { motion } from "framer-motion";
import LetterAvatar from "../letter-avatar";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { FiEdit2 } from "react-icons/fi";
import axios from "axios";
import { BASE_API_URL } from "~/data/api";
import { useWalletStore } from "~/store/wallet";

interface Question {
  question_title: string;
  answer: string;
}

interface QueAnsCardProps {
  id?: string;
  question: Question;
  asked_user: string;
}

const AdminQueAnsCard = ({ id, question, asked_user }: QueAnsCardProps) => {
  const MAX_LIMIT = 6000;

  const [value, setValue] = useState<string>(question.answer);
  const [newValue, setNewValue] = useState<string>(question.answer);

  const [currentLimit, setCurrentLimit] = useState<number>(
    MAX_LIMIT - value.length,
  );
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { is_admin } = useWalletStore();

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
      setNewValue(inputValue);
      setCurrentLimit(MAX_LIMIT - inputValue.length);
    }
  };

  const toggleEditMode = () => {
    // if (!isEdit) {
    //   setOriginalValue(value); // Save the original value when entering edit mode
    // }
    setIsEdit(!isEdit);
  };

  const handleSave = async () => {
    try {
      setIsEdit(false); // Exit edit mode
      setValue(newValue);

      if (!is_admin?.drep_id || !id) {
        return;
      }

      const reqBody: {
        answer: string;
        uuid: string;
        drep_id: string;
        drep_name?: string | undefined;
      } = {
        answer: newValue,
        drep_id: is_admin.drep_id,
        uuid: id,
      };

      const { data } = await axios.post(
        `${BASE_API_URL}/api/v1/answers/reply`,
        reqBody,
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setNewValue(value); // Revert to original value
    setIsEdit(false); // Exit edit mode
  };

  const renderCharacterLimit = () => {
    const characterLimitText = `${currentLimit} Characters left`;
    const textColor = currentLimit < 10 ? "text-red-600" : "text-secondary/60";
    return isEdit ? (
      <div className={textColor + " text-sm"}>{characterLimitText}</div>
    ) : null;
  };

  const renderButtons = () => {
    return (
      <div className="flex w-full items-center justify-end gap-3">
        <button
          className="rounded-lg border border-brd-clr px-4 py-2.5 font-semibold text-secondary-dark"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="rounded-lg border border-primary bg-primary px-4 py-2.5 font-semibold text-white"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    );
  };

  return (
    <motion.div
      className="flex cursor-pointer flex-col overflow-hidden rounded-xl border border-brd-clr"
      whileHover={{ y: -6 }}
    >
      <div className="flex flex-col items-start justify-start gap-4 border-b border-brd-clr px-[18px] py-4">
        <div className="w-full font-inter text-xs font-medium tracking-wide md:text-sm">
          <div className="flex w-full flex-col items-start justify-start gap-4">
            <div className="text-secondary-dark">
              {question?.question_title}
            </div>

            <div className="flex w-full flex-col gap-1.5">
              <div className="flex w-full items-center justify-between">
                <div className="text-primary">Answer</div>

                <div className="flex items-center gap-5 text-base">
                  <div
                    onClick={toggleEditMode}
                    className="cursor-pointer text-[#006AB5]"
                  >
                    <FiEdit2 />
                  </div>
                </div>
              </div>

              <div
                onClick={() => setIsEdit(true)}
                className="cursor-pointer rounded-lg border border-brd-clr px-3.5 py-2.5 font-normal text-secondary"
              >
                <textarea
                  ref={textAreaRef}
                  className="w-full resize-y outline-none disabled:bg-transparent"
                  value={newValue}
                  onChange={handleChange}
                  placeholder="Type your answer"
                  rows={5}
                  //   disabled={!isEdit}
                />
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
