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

const Navbar: React.FC = (): React.ReactNode => {
    const [active, setActive] = useState<number>(0);

    const device = useDeviceType();
    const supportedWallets = useWalletList();
    // const supportedWallets: any[] = [];

    const [connecting, setConnecting] = useState(false);

    const { connect, disconnect, connected, name } = useWallet();
    // function connect() {}
    // function disconnect() {}
    // let connected=true, name="Nami"


    const { saveWallet, stake_address } = useWalletStore();

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
                }>(`${BASE_API_URL}/api/v1/user/${data.data.wallet_address}`);

                saveWallet({
                    connected: true,
                    stake_address: address,
                    delegatedTo: {
                        active: wallet_data.active,
                        pool_id: wallet_data.pool_id,
                    },
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

                <div className="flex gap-7 items-center">
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
                                {connecting
                                    ? "Connecting..."
                                    : connected
                                        ? <Link href="/my-questions">{(stake_address)?.slice(0, 10)}...</Link>
                                        : "Connect wallet"}

                            </div>
                            {connected && (
                                <div onClick={() => disconnect()} className="">
                                    <AiOutlineDisconnect className="h-6 w-6" color="white" />
                                </div>
                            )}
                        </motion.button>

                        <div className="absolute right-0 top-full max-h-0 w-full min-w-max translate-y-2 overflow-hidden rounded-lg bg-white/60 text-primary backdrop-blur transition-all duration-500 group-hover:max-h-[500px] ">
                            <div className="flex flex-col gap-3 p-3 ">
                                {supportedWallets.length > 0 ? supportedWallets.map((w, i) => (
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
                                )) : (
                                    <div className={`flex w-full items-center gap-2 rounded p-1 px-2  `}>
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
                            className="relative py-2.5 rounded-lg   text-white mr-4"
                        >
                            <FaBell className="text-2xl" />

                            <div className="absolute top-2 right-1 w-1.5 aspect-square rounded-full bg-primary "></div>
                        </motion.button>

                        <div className="absolute right-0 md:left-0 top-full max-h-0 w-full min-w-max translate-y-2 overflow-hidden rounded-lg bg-white/60 backdrop-blur transition-all duration-500  font-inter tracking-wide text-xs md:text-sm group-hover:max-h-[500px] ">
                            <div className="flex flex-col gap-1 ">
                                <div className="px-5 border-b border-brd-clr flex gap-5 items-center max-w-min">
                                    <div 
                                        className={`py-3 px-2 ${active===0 ? "border-b-2" : "border-b-0"} border-black  cursor-pointer flex justify-center gap-1 items-center`}
                                        onClick={() => setActive(0)}
                                    >
                                        <div className={`${active===0 ? "font-semibold" : "font-normal"}`}>
                                            Inbox
                                        </div>
                                        <div className="p-0.5 px-1 leading-[1] rounded-sm bg-primary text-white">
                                            2
                                        </div>
                                    </div>
                                    <div 
                                        className={`py-3 px-2 ${active===1 ? "border-b-2" : "border-b-0"} border-black  cursor-pointer flex justify-center gap-1 items-center`}
                                        onClick={() => setActive(1)}
                                    >
                                        <div className={`${active===1 ? "font-semibold" : "font-normal"}`}>
                                            All
                                        </div>
                                    </div>
                                </div>

                                <div className="overflow-auto max-h-[400px]  w-full ">
                                    <div className="flex flex-col gap-1.5 items-start w-full ">
                                        {
                                            active===0 ? <>
                                                <NotificationItem isNew={true} />
                                                <NotificationItem />
                                                <NotificationItem />
                                            </> : <>
                                                <NotificationItem />
                                                <NotificationItem />
                                                <NotificationItem />
                                            </>
                                        }
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



function NotificationItem({isNew=false}: {isNew?:boolean}) {
    return (
        <div className="py-5 border-b border-brd-clr px-4 flex gap-3 items-start w-full max-w-[330px] md:max-w-[450px]">
            <div className="flex gap-1.5 items-center justify-center shrink-0">
                <div className={`h-2 aspect-square rounded-full ${isNew ? "bg-primary" : "bg-transparent"}`}></div>
                <div>
                    <LetterAvatar
                        rounded
                        username={"Lorem Ipsum" ?? ""}
                        dimension={32}
                    />
                </div>
            </div>

            <div className={`flex flex-col items-start justify-start ${isNew ? "text-secondary-dark" : "text-secondary-dark/50"}`}>
                <div>
                    <span className="mr-1 font-bold">
                        Liqwid
                    </span> 
                    <span>
                        answered your question 
                    </span>
                    <span className="ml-1 underline underline-offset-1">
                        Lorem ipsum dolor sit amet ?
                    </span>
                </div>

                <div className="text-[#979694] text-xs mt-1.5 font-semibold">
                    11 hours ago 
                </div>

                <div className={`mt-1.5 ${isNew ? "text-[#00000099]" : "text-[#0000003e]"} line-clamp-2`}>
                    Lorem ipsum dolor sit amet, consectetur cumsan.Etiamommodo, massa ultrices Lists ago Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque, numquam?
                </div>
                
                <div className="mt-3.5">
                    {
                        isNew ? 
                            <button className="px-4 py-2 border border-primary rounded-lg text-primary hover:bg-primary/5">
                                Read more
                            </button> : 
                            <button className="px-4 py-2 border border-brd-clr rounded-lg text-secondary hover:bg-secondary/5">
                                Reply
                            </button>
                    }
                </div>
            </div>
        </div>
    )
}
