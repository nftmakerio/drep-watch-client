import { useState } from "react";
import { BsChatQuoteFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import Image from "next/image";

import Loader from "./loader";
import { BASE_API_URL } from "~/data/api";

interface SearchResult {
    pool_id: string,
    created_at: string,
    name: string,
    email: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DebounceFunction = (...p: any[]) => any;

const Search: React.FC = (): React.ReactNode => {
    const [searchText, setSearchText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

    function debounce(fn: DebounceFunction, t: number): DebounceFunction {
        let timeout: ReturnType<typeof setTimeout>;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                fn(...args);
            }, t);
        };
    }

    const handleInputChange = debounce(async (value: string) => {
        if(value === "") {
            setSearchResults([]);
            setSearchText("")
            return;
        };
        console.log("SEARCHING")
        setSearchText(value);
        setLoading(true);
        try {
            const res = await fetch(`${BASE_API_URL}/api/v1/drep/query?search_query=${value}`);
            const queryResults = await res.json() as SearchResult[];
            console.log(queryResults);
            setSearchResults(queryResults);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }, 300);

    return (
        <motion.div 
            className="w-[90%] md:w-[680px] flex p-4 md:p-5 gap-3 items-center bg-white rounded-xl border border-primary-light shadow-color mt-5 relative z-[2] "
            initial={{ opacity: 0, y: 120 }}
            whileInView={{opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{delay: 0.75, duration: 0.5}}
        >
            <input 
                type="text" 
                className="flex-1 w-full bg-transparent outline-none placeholder:text-secondary/60 font-ibm-mono text-[13px] text-secondary font-medium"
                placeholder="search dreps here"
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                onChange={(e) => handleInputChange(e.target.value)}
            />

            {
                searchText && loading ? <Loader /> : <FiSearch />
            }
            {/* {
                loading && <Loader />
            } */}


            <div className={`absolute left-0 top-full translate-y-4 w-full  bg-white border-brd-clr rounded-lg overflow-hidden ${searchText ? "max-h-[415px] md:max-h-[350px] border-b " : "max-h-0 border-0"} transition-all duration-300  `}>
                <div className="p-3 md:px-5 md:py-4">
                    {
                        searchResults.map((el, i) => (
                            <div 
                                key={i}
                                className={`p-3 border-b border-primary-light flex flex-col md:flex-row justify-between items-center gap-2`}
                            >
                                <div className="flex gap-3 items-center justify-center">
                                    <div>
                                        <Image
                                            src={"/assets/home/card-img.png"}
                                            width={1000}
                                            height={1000}
                                            className="w-[44px] aspect-square object-cover rounded-full"
                                            alt={`card-img-${1}`}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 w-full max-w-none md:max-w-[290px]">
                                        <div className="text-secondary font-inter text-xs md:text-sm tracking-wide font-medium">
                                            {el.name}
                                        </div>
                                        <div className="text-tertiary font-inter text-[10px] md:text-xs tracking-wide font-medium">
                                            {el.email}
                                        </div>
                                    </div>
                                </div>
                                <motion.button 
                                    className="py-2 px-3 md:py-4 md:px-[18px]  flex justify-center items-center gap-2.5 bg-primary-light text-primary rounded-[10px] border border-[#E6E6E6] w-full md:w-auto "
                                    whileHover={{scaleX: 1.025}}
                                    whileTap={{scaleX: 0.995}}
                                >
                                    <BsChatQuoteFill className="text-lg md:text-xl" />
                                    <div className="font-inter font-semibold text-xs md:text-sm tracking-wide ">
                                        Ask question
                                    </div>
                                </motion.button>
                            </div>
                        ))
                    }
                </div>
                <motion.div 
                    className="text-xs md:text-sm font-inter font-semibold tracking-wide text-primary max-w-max px-4 mx-auto cursor-pointer mb-3 md:mb-4"
                    whileHover={{scaleX: 1.05}}
                    whileTap={{scaleX: 0.95}}
                >
                    View More
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Search;