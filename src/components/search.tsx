import { useState } from "react";
import { BsChatQuoteFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import Image from "next/image";

import Loader from "./loader";
import { BASE_API_URL } from "~/data/api";
import Link from "next/link";
import LetterAvatar from "./letter-avatar";

interface SearchResult {
  drep_id: string;
  created_at: string;
  name: string;
  email: string;
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
    if (value === "") {
      setSearchResults([]);
      setSearchText("");
      return;
    }
    console.log("SEARCHING");
    setSearchText(value);
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_API_URL}/api/v1/drep/query?search_query=${value}`,
      );
      const queryResults = (await res.json()) as SearchResult[];
      console.log(queryResults);
      setSearchResults(queryResults);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, 300);

  return (
    <motion.div
      className="relative z-[2] mt-5 flex w-[90%] items-center gap-3 rounded-xl border border-primary-light bg-white p-4 shadow-color md:w-[680px] md:p-5 "
      initial={{ opacity: 0, y: 120 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.75, duration: 0.5 }}
    >
      <input
        type="text"
        className="w-full flex-1 bg-transparent font-ibm-mono text-[13px] font-medium text-secondary outline-none placeholder:text-secondary/60"
        placeholder="search dreps here"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        onChange={(e) => handleInputChange(e.target.value)}
      />

      {searchText && loading ? <Loader /> : <FiSearch />}
      {/* {
                loading && <Loader />
            } */}

      <div
        className={`absolute left-0 top-full w-full translate-y-4  overflow-hidden rounded-lg border-brd-clr bg-white ${searchText ? "max-h-[415px] border-b md:max-h-[350px] " : "max-h-0 border-0"} transition-all duration-300  `}
      >
        <div className="p-3 md:px-5 md:py-4">
          {searchResults.map((el, i) => (
            <div
              key={i}
              className={`flex flex-col items-center justify-between gap-2 border-b border-primary-light p-3 md:flex-row`}
            >
              <div className="flex items-center justify-center gap-3">
                <div>
                  <LetterAvatar rounded username={el.name} dimension={50} />
                </div>
                <div className="flex w-full max-w-none flex-col gap-1 md:max-w-[290px]">
                  <div className="font-inter text-xs font-medium tracking-wide text-secondary md:text-sm">
                    {el.name}
                  </div>
                  <div className="w-[200px] overflow-hidden text-ellipsis font-inter text-[10px] font-medium tracking-wide text-tertiary md:text-xs">
                    {el?.drep_id}
                  </div>
                </div>
              </div>
              <Link
                href={`/ask-question?to=${el.drep_id}`}
                className="flex w-full items-center justify-center  gap-2.5 rounded-[10px] border border-[#E6E6E6] bg-primary-light px-3 py-2 text-primary md:w-auto md:px-[18px] md:py-4 "
              >
                <BsChatQuoteFill className="text-lg md:text-xl" />
                <div className="font-inter text-xs font-semibold tracking-wide md:text-sm ">
                  Ask question
                </div>
              </Link>
            </div>
          ))}
        </div>
        <motion.div
          className="mx-auto mb-3 max-w-max cursor-pointer px-4 font-inter text-xs font-semibold tracking-wide text-primary md:mb-4 md:text-sm"
          whileHover={{ scaleX: 1.05 }}
          whileTap={{ scaleX: 0.95 }}
        >
          View More
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Search;
