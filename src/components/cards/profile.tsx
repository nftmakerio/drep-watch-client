import { BsChatQuoteFill } from "react-icons/bs";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ProfileCardProps {
    test?: string;
    drep?: Drep;
};
interface Drep {
    drep_id: string;
    created_at: string;
    name: string;
    email: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ drep }: ProfileCardProps): React.ReactNode => {
    return (
        <motion.div
            className="border-brd-clr border rounded-xl flex flex-col"
            whileHover={{y: -6}}
        >
            <div className="my-4 mx-[18px] flex justify-between items-center">
                <Image
                    src={"/assets/home/card-img.png"}
                    width={1000}
                    height={1000}
                    className="w-[54px] aspect-square object-cover"
                    alt={`card-img-${1}`}
                />

                <div className="bg-tertiary-light text-tertiary py-3 px-4 w-[200px] overflow-hidden text-ellipsis rounded-[10px] font-ibm-mono font-medium text-sm tracking-wide">
                    {drep?.drep_id}
                </div>
            </div>
            <div className="bg-[#F5F5F5] border-y border-brd-clr text-secondary p-3 md:p-5 font-semibold font-inter tracking-wide text-center text-sm md:text-base">
                {drep?.name}
            </div>
            <Link
                href={`/ask-question?to=${drep?.drep_id}`} 
                className="my-3 py-3 md:py-4 mx-[18px]  flex justify-center items-center gap-2.5 bg-primary-light text-primary rounded-[10px] border border-[#E6E6E6] "
            >
                <BsChatQuoteFill className="text-lg md:text-xl" />
                <div className="font-inter font-semibold text-xs md:text-sm tracking-wide ">
                    Ask question
                </div>
            </Link>

            <div className="mb-3 py-3 md:py-4 mx-[18px]  flex justify-center items-center font-inter font-medium text-xs md:text-sm text-secondary tracking-wide">
                <motion.button 
                    className="w-full flex-1 flex justify-center items-center hover:text-primary "
                    whileHover={{scaleX: 1.05}}
                    whileTap={{scaleX: 0.95}}
                >
                    View profile
                </motion.button>
                <div className="h-full w-[1px] bg-[#0000002E]"></div>
                <motion.button 
                    className="w-full flex-1 flex justify-center items-center hover:text-primary "
                    whileHover={{scaleX: 1.05}}
                    whileTap={{scaleX: 0.95}}
                >
                    Delegate
                </motion.button>
            </div>
        </motion.div>
    );
};

export default ProfileCard;