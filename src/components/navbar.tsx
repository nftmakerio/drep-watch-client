import { IoWalletSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import Image from "next/image";
import axios, { AxiosError } from "axios";

import useDeviceType from "~/hooks/use-device-type";
import { useWallet, useWalletList } from "@meshsdk/react";
import Loader from "./loader";
import { BrowserWallet } from "@meshsdk/core";
import { WALLETS } from "~/constants";
import { BASE_API_URL } from "~/data/api";
import { useState } from "react";
import Link from "next/link";
import { useWalletStore } from "~/store/wallet";

const Navbar: React.FC = (): React.ReactNode => {
  const device = useDeviceType();
  const supportedWallets = useWalletList();

  const [connecting, setConnecting] = useState(false);

  const { connect, disconnect, connected, name } = useWallet();

  const { saveWallet } = useWalletStore();

  const handleClick = async (name: string) => {
    try {
      setConnecting(true);
      await connect(name);
      const wallet = await BrowserWallet.enable(name);
      const address = (await wallet.getRewardAddresses())[0];

      if (!address) {
        return;
      }

      const requestData = {
        name: null,
        email: null,
        wallet_address: address,
      };

      const { data } = await axios.post(
        `${BASE_API_URL}/api/v1/user/create`,
        requestData,
      );

      saveWallet({
        connected: true,
        stake_address: address,
      });

      setConnecting(false);

      // This is the address you should use bro
    } catch (error) {
      setConnecting(false);
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    }
  };

  return (
    <div className="pointer-events-none fixed left-0 top-7 z-[10] flex w-screen items-center justify-center ">
      <motion.header
        className="pointer-events-auto flex w-auto items-center justify-between gap-8 rounded-[14px] bg-[#303030] p-2 pl-6 shadow-sm md:min-w-[500px]"
        whileHover={{ width: device !== "mobile" ? "600px" : "auto" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Link href={"/"} className="flex items-center gap-2.5">
          <Image
            src={"/assets/logo.svg"}
            width={1000}
            height={1000}
            className="h-auto w-[20px] object-cover"
            alt="logo"
          />

          <div className="font-inter text-sm font-medium tracking-wide text-white md:text-base">
            Drepwatch
          </div>
        </Link>

        <div className="group relative">
          <motion.button
            whileHover={{ scaleX: 1.025 }}
            whileTap={{ scaleX: 0.995 }}
            className="flex items-center gap-2.5 rounded-lg bg-gradient-to-b from-[#FFC896] from-[-47.73%] to-[#FB652B] to-[78.41%] px-4 py-2.5  text-white md:px-6"
            onClick={() => connected && disconnect()}
          >
            {connecting ? (
              <Loader colored={true} />
            ) : connected ? (
              <Image
                width={1000}
                height={1000}
                className="h-6 w-6  object-contain"
                src={WALLETS[name.toLowerCase()]?.image ?? ""}
                alt={WALLETS[name.toLowerCase()]?.title ?? ""}
              />
            ) : (
              <IoWalletSharp className="text-[24px]" />
            )}
            <div className="text-shadow font-inter text-xs font-medium md:text-sm ">
              {connecting
                ? "Connecting..."
                : connected
                  ? "Disconnect"
                  : "Connect wallet"}
            </div>
          </motion.button>

          <div className="absolute right-0 top-full max-h-0 w-full min-w-max translate-y-2 overflow-hidden rounded-lg bg-white/60 text-primary backdrop-blur transition-all duration-500 group-hover:max-h-[500px] ">
            <div className="flex flex-col gap-3 p-3 ">
              {supportedWallets.map((w, i) => (
                <motion.button
                  key={i}
                  className={`flex w-full items-center gap-2 rounded p-1 px-2 ${name === w.name && "bg-primary-light"} `}
                  whileHover={{ scaleX: 1.025 }}
                  whileTap={{ scaleX: 0.995 }}
                  onClick={() => void handleClick(w.name)}
                >
                  <div className="aspect-square w-8 rounded">
                    <Image
                      width={1000}
                      height={1000}
                      className="h-8 w-8  object-contain"
                      src={WALLETS[w.name.toLowerCase()]?.image ?? ""}
                      alt={WALLETS[w.name.toLowerCase()]?.title ?? ""}
                    />
                  </div>
                  <div className="font-inter text-sm font-semibold capitalize tracking-wide text-primary/80">
                    {w.name}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.header>
    </div>
  );
};

export default Navbar;
