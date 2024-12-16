import Link from "next/link";
import Image from "next/image";

import { FaXTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { HiMapPin } from "react-icons/hi2";
import { GoArrowUpRight } from "react-icons/go";

const Footer: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-start gap-10 bg-[#f5f5f5] p-6 font-inter shadow-inner md:flex-row md:justify-between md:gap-0 ">
      <div className="flex flex-col gap-4">
        <Link href={"/"} className="flex items-center gap-2.5">
          <Image
            src={"/assets/logo.svg"}
            width={1000}
            height={1000}
            className="h-auto w-[20px] object-cover"
            alt="logo"
          />

          <div className="font-inter text-sm font-medium tracking-wide text-[#6F6F6F] md:text-base">
            Drepwatch
          </div>
        </Link>
        <div className="max-w-[320px] text-sm font-normal text-tertiary">
          Drepwatch is a platform that enables direct communication between
          users and their representatives.{" "}
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-[#EFEFEF]">
            <FaLinkedinIn className="m-2 text-secondary " />
          </span>
          <span className="rounded-full bg-[#EFEFEF]">
            <FaXTwitter className="m-2 text-secondary " />
          </span>
          <span className="rounded-full bg-[#EFEFEF]">
            <FaFacebookF className="m-2 text-secondary " />
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sm font-normal text-secondary md:text-base">
          <HiMapPin className="text-primary" size={26} /> Address
        </div>
        <div className="max-w-[300px] text-sm font-normal text-tertiary">
          utxo AG (NMKR), Döttingerstrasse 21, 5303 Würenlingen, Switzerland{" "}
        </div>
        <div>
          <Link
            href={`/`}
            className="flex items-center gap-1 text-sm font-normal text-primary underline"
          >
            Get direction <GoArrowUpRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
