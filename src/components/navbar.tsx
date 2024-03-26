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
import { AiOutlineDisconnect } from "react-icons/ai";
import LetterAvatar from "./letter-avatar";
import { FaBell } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { Notification } from "~/types";
import moment from "moment";
import { useRouter } from "next/router";
import { LOCALSTORAGE_WALLET_KEY } from "~/constants/wallet";

const Navbar: React.FC = (): React.ReactNode => {
  const [active, setActive] = useState<number>(0);

  const device = useDeviceType();
  const supportedWallets = useWalletList();

  const { connect, disconnect, connected, name } = useWallet();

  const { saveWallet, stake_address, connecting, setConnecting } = useWalletStore();

  const handleClick = async (name: string) => {
    try {
      setConnecting(true);
      await connect(name);

      localStorage.setItem(LOCALSTORAGE_WALLET_KEY, name);

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

      const { data } = await axios.post<
        | {
            data: {
              wallet_address: string;
            };
          }
        | undefined
      >(`${BASE_API_URL}/api/v1/user/create`, requestData);

      if (data?.data) {
        const { data: wallet_data } = await axios.get<{
          name: string;
          email: string;
          pool_id: string;
          active: boolean;
          is_admin?: {
            drep_id: string
          }
        }>(`${BASE_API_URL}/api/v1/user/${data.data.wallet_address}`);

        saveWallet({
          connected: true,
          stake_address: address,
          delegatedTo: {
            active: wallet_data.active,
            pool_id: wallet_data.pool_id,
          },
          is_admin: wallet_data.is_admin ?? null
        });
      }

      setConnecting(false);

      // This is the address you should use bro
    } catch (error) {
      setConnecting(false);
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    }
  };

  const { data } = useQuery<{
    notifications: Notification[];
  } | null>({
    queryKey: ["notifications", stake_address],
    queryFn: () =>
      stake_address
        ? fetch(
            `${BASE_API_URL}/api/v1/notifications?userId=${stake_address}`,
          ).then((res) => res.json())
        : null,
  });

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

        <div className="flex items-center gap-4">
          <div className="group relative">
            <motion.button
              whileHover={{ scaleX: 1.025 }}
              whileTap={{ scaleX: 0.995 }}
              className="flex items-center gap-2.5 rounded-lg bg-gradient-to-b from-[#FFC896] from-[-47.73%] to-[#FB652B] to-[78.41%] px-4 py-2.5  text-white md:px-6"
            >
              {connecting ? (
                <Loader colored={true} />
              ) : connected ? (
                <Image
                  width={1000}
                  height={1000}
                  className="h-6 w-6 object-contain"
                  src={WALLETS[name.toLowerCase()]?.image ?? ""}
                  alt={WALLETS[name.toLowerCase()]?.title ?? ""}
                />
              ) : (
                <IoWalletSharp className="text-[24px]" />
              )}
              <div className="text-shadow font-inter text-xs font-medium md:text-sm ">
                {connecting ? (
                  "Connecting..."
                ) : connected ? (
                  <Link href="/my-questions">
                    {stake_address?.slice(0, 10)}...
                  </Link>
                ) : (
                  "Connect wallet"
                )}
              </div>
              {connected && (
                <div onClick={() => disconnect()} className="">
                  <AiOutlineDisconnect className="h-6 w-6" color="white" />
                </div>
              )}
            </motion.button>

            <div className="absolute right-0 top-full max-h-0 w-full min-w-max translate-y-2 overflow-hidden rounded-lg bg-white/60 text-primary backdrop-blur transition-all duration-500 group-hover:max-h-[500px] ">
              <div className="flex flex-col gap-3 p-3 ">
                {supportedWallets.length > 0 ? (
                  supportedWallets.map((w, i) => (
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
                  ))
                ) : (
                  <div
                    className={`flex w-full items-center gap-2 rounded p-1 px-2  `}
                  >
                    <div className="font-inter text-sm font-semibold capitalize tracking-wide text-primary/80">
                      {"No wallet found"}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="group relative">
            <motion.button
              whileHover={{ scaleX: 1.025 }}
              whileTap={{ scaleX: 0.995 }}
              className="relative mr-4 rounded-lg   py-2.5 text-white"
            >
              <FaBell className="text-2xl" />

              {data &&
                data?.notifications.filter((notify) => !notify.opened).length >
                  0 && (
                  <div className="absolute right-1 top-2 aspect-square w-1.5 rounded-full bg-primary "></div>
                )}
            </motion.button>

            <div className="absolute right-0 top-full max-h-0 w-full min-w-max translate-y-2 overflow-hidden rounded-lg bg-white/60 font-inter text-xs tracking-wide backdrop-blur  transition-all duration-500 group-hover:max-h-[500px] md:left-0 md:text-sm ">
              <div className="flex flex-col gap-1 ">
                <div className="flex max-w-min items-center gap-5 border-b border-brd-clr px-5">
                  <div
                    className={`px-2 py-3 ${active === 0 ? "border-b-2" : "border-b-0"} flex  cursor-pointer items-center justify-center gap-1 border-black`}
                    onClick={() => setActive(0)}
                  >
                    <div
                      className={`${active === 0 ? "font-semibold" : "font-normal"}`}
                    >
                      Inbox
                    </div>
                    <div className="rounded-sm bg-primary p-0.5 px-1 leading-[1] text-white">
                      {data
                        ? data?.notifications.filter((notify) => !notify.opened)
                            .length
                        : 0}
                    </div>
                  </div>
                </div>

                <div className="max-h-[400px] w-full  overflow-auto ">
                  <div className="flex w-full flex-col items-start gap-1.5 ">
                    {data &&
                      data?.notifications.map((notification) => (
                        <NotificationItem
                          answer={notification.answer}
                          created_at={notification.created_at}
                          question={notification.questions.question_title}
                          username={notification.drep}
                          isNew={!notification.opened}
                          uuid={notification.uuid}
                          notification_id={notification.id}
                        />
                      ))}
                    {/* <NotificationItem isNew={true} /> */}
                    {/* <NotificationItem />
                    <NotificationItem /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>
    </div>
  );
};

export default Navbar;

function NotificationItem({
  isNew = false,
  ...props
}: {
  isNew?: boolean;
  username: string;
  question: string;
  created_at: string;
  answer: string;
  uuid: string;
  notification_id: string;
}) {
  const { push } = useRouter();

  const onOpen = async () => {
    try {
      await push(`/answer/${props.uuid}`);
      await axios.post(
        `${BASE_API_URL}/api/v1/notifications/${props.notification_id}/opened`,
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex w-full max-w-[330px] items-start gap-3 border-b border-brd-clr px-4 py-5 md:max-w-[450px]">
      <div className="flex shrink-0 items-center justify-center gap-1.5">
        <div
          className={`aspect-square h-2 rounded-full ${isNew ? "bg-primary" : "bg-transparent"}`}
        ></div>
        <div>
          <LetterAvatar rounded username={props.username} dimension={32} />
        </div>
      </div>

      <div
        className={`flex flex-col items-start justify-start ${isNew ? "text-secondary-dark" : "text-secondary-dark/50"}`}
      >
        <div>
          <span className="mr-1 font-bold">
            {props.username.slice(0, 16)}...
          </span>
          <span>answered your question</span>
          <span className="ml-1 underline underline-offset-1">
            {props.question.slice(0, 32)}...
          </span>
        </div>

        <div className="mt-1.5 text-xs font-semibold text-[#979694]">
          {moment(new Date(props.created_at).getTime()).fromNow()}
        </div>

        <div
          className={`mt-1.5 ${isNew ? "text-[#00000099]" : "text-[#0000003e]"} line-clamp-2`}
        >
          {props.answer.slice(0, 180)}...
        </div>

        <div className="mt-3.5">
          {/* {isNew ? (
            <button className="rounded-lg border border-primary px-4 py-2 text-primary hover:bg-primary/5">
              Read more
            </button>
          ) : (
            <button className="rounded-lg border border-brd-clr px-4 py-2 text-secondary hover:bg-secondary/5">
              Reply
            </button>
          )} */}
          <button
            onClick={onOpen}
            className="rounded-lg border border-primary px-4 py-2 text-primary hover:bg-primary/5"
          >
            Read more
          </button>
        </div>
      </div>
    </div>
  );
}
