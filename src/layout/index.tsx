import { BrowserWallet } from "@meshsdk/core";
import { useWallet } from "@meshsdk/react";
import axios, { AxiosError } from "axios";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import { useEffect } from "react";
import Footer from "~/components/footer";

import Navbar from "~/components/navbar";
import { LOCALSTORAGE_WALLET_KEY } from "~/constants/wallet";
import { BASE_API_URL } from "~/data/api";
import { useWalletStore } from "~/store/wallet";
import toast from "react-hot-toast";

const inter_font = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
});
const mono_font = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-mono",
  weight: ["400", "500", "600"],
});

const neue_regrade_font = localFont({
  src: "../../public/fonts/Neue Regrade Variable.ttf",
  variable: "--font-neue-regrade",
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { connect } = useWallet();

  const { saveWallet, setConnecting, connected } =
    useWalletStore();

  const handleClick = async (name: string) => {
    try {
      setConnecting(true);
      await connect(name.toLowerCase(), [95]);

      localStorage.setItem(LOCALSTORAGE_WALLET_KEY, name);

      const wallet = await BrowserWallet.enable(name.toLowerCase(), [95]);
      if (wallet)
        toast.success(`Wallet connected successfully to ${name} !`);
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
        const drepID = await wallet.getPubDRepKey();
        const { data: wallet_data } = await axios.post<{
          name: string;
          email: string;
          pool_id: string;
          active: boolean;
          is_admin: boolean;
        }>(`${BASE_API_URL}/api/v1/user`, {
          wallet_address: data.data.wallet_address,
          drep_id: drepID?.dRepIDBech32,
        });

        console.log(wallet_data.is_admin);

        saveWallet({
          connected: true,
          stake_address: address,
          delegatedTo: {
            active: wallet_data.active,
            pool_id: wallet_data.pool_id,
          },
          is_admin: {
            active: wallet_data.is_admin,
            drep_id: drepID?.dRepIDBech32 ?? "",
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

  useEffect(() => {
    const is_prev_wallet = localStorage.getItem(LOCALSTORAGE_WALLET_KEY);

    if (is_prev_wallet && !connected) {
      void handleClick(is_prev_wallet);
    }
  }, []);

  return (
    <main
      className={`relative min-h-screen w-full bg-[#f5f5f5] ${inter_font.variable} ${mono_font.variable} ${neue_regrade_font.variable} grid-lines`}
    >
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
