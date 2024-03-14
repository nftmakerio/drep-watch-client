import { IoWalletSharp } from "react-icons/io5";
import {motion} from 'framer-motion';
import Image from "next/image";
import axios, { AxiosError } from 'axios';

import useDeviceType from "~/hooks/use-device-type";
import { useWallet, useWalletList } from "@meshsdk/react";
import Loader from "./loader";
import { BrowserWallet } from "@meshsdk/core";
import { WALLETS } from "~/constants";

const Navbar: React.FC = (): React.ReactNode => {
    const device = useDeviceType();
    const supportedWallets = useWalletList();
    
    const { connect, disconnect, connected, name, connecting } = useWallet();

    const handleClick = async (name: string) => {
        try {
            await connect(name);
            const wallet = await BrowserWallet.enable(name);
            const address = (await wallet.getRewardAddresses())[0];

            const requestData = {
                name: null,
                email: null,
                wallet_address: address
            }

            const { data } = await axios.post("http://localhost:4000/api/v1/user/create", requestData)

            console.log(data);

            // This is the address you should use bro
        } catch (error) {
            if(error instanceof AxiosError) {
                console.log(error.response?.data);
            }
        }
    }

    return (
        <div className="fixed top-7 left-0 w-screen flex justify-center items-center z-[10] pointer-events-none ">
            <motion.header 
                className="p-2 pl-6 bg-[#303030] shadow-sm flex justify-between items-center rounded-[14px] w-auto md:min-w-[500px] gap-8 pointer-events-auto"
                whileHover={{ width: device!=="mobile" ? "600px" : "auto" }}
                initial={{ opacity: 0 }}
                animate={{opacity: 1 }}
            >
                <div className="flex gap-2.5 items-center">
                    <Image
                        src={"/assets/logo.svg"}
                        width={1000}
                        height={1000}
                        className="w-[20px] h-auto object-cover"
                        alt="logo"
                    />

                    <div className="font-inter text-sm md:text-base tracking-wide text-white font-medium">
                        Drepwatch
                    </div>
                </div>

                <div className="relative group">
                    <motion.button
                        whileHover={{scaleX: 1.025}}
                        whileTap={{scaleX: 0.995}}
                        className="flex gap-2.5 items-center px-4 md:px-6 py-2.5 bg-gradient-to-b from-[#FFC896] from-[-47.73%] to-[#FB652B] to-[78.41%]  text-white rounded-lg"
                        onClick={() => connected && disconnect()}
                    >
                        {
                            connecting ? <Loader colored={true}  /> : connected ? (
                                <Image
                                    width={1000}
                                    height={1000}
                                    className="w-6 h-6  object-contain"
                                    src={WALLETS[name.toLowerCase()]?.image ?? ""}
                                    alt={WALLETS[name.toLowerCase()]?.title ?? ""}
                                />
                            ) : <IoWalletSharp className="text-[24px]" />
                        }
                        <div className="text-xs md:text-sm font-inter font-medium text-shadow ">
                            {connecting ? "Connecting..." : connected ? "Disconnect" : "Connect wallet"}
                        </div>
                    </motion.button>


                    <div className="absolute top-full w-full min-w-max right-0 translate-y-2 bg-white/60 backdrop-blur text-primary max-h-0 group-hover:max-h-[500px] overflow-hidden transition-all duration-500 rounded-lg ">
                        <div className="flex flex-col gap-3 p-3 ">
                            {
                                supportedWallets.map((w, i) => (
                                    <motion.button 
                                        key={i}
                                        className={`w-full p-1 px-2 rounded flex gap-2 items-center ${name === w.name && "bg-primary-light"} `}
                                        whileHover={{scaleX: 1.025}}
                                        whileTap={{scaleX: 0.995}}
                                        onClick={() => void handleClick(w.name)}
                                    >
                                        <div className="w-8 aspect-square rounded">
                                            <Image
                                                width={1000}
                                                height={1000}
                                                className="w-8 h-8  object-contain"
                                                src={WALLETS[w.name.toLowerCase()]?.image ?? ""}
                                                alt={WALLETS[w.name.toLowerCase()]?.title ?? ""}
                                            />
                                        </div>
                                        <div className="font-inter font-semibold tracking-wide text-primary/80 text-sm">
                                            {w.name}
                                        </div>
                                    </motion.button>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </motion.header>
        </div>
    );
};

export default Navbar;