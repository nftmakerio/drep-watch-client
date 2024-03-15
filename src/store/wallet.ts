import { create } from "zustand";

interface WalletState {
  connected: boolean;
  stake_address: string | null;

  saveWallet: (props: { connected: boolean; stake_address: string }) => void;
}

export const useWalletStore = create<WalletState>()((set) => ({
  connected: false,
  stake_address: null,
  saveWallet: (props) =>
    set({
      connected: props.connected,
      stake_address: props.stake_address,
    }),
}));
