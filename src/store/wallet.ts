import { create } from "zustand";

interface WalletState {
  connected: boolean;
  stake_address: string | null;
  delegatedTo: {
    pool_id: string | null;
    active: boolean;
  };

  saveWallet: (props: {
    connected: boolean;
    stake_address: string | null;
    delegatedTo: {
      pool_id: string | null;
      active: boolean;
    };
  }) => void;
}

export const useWalletStore = create<WalletState>()((set) => ({
  connected: false,
  stake_address: null,
  delegatedTo: {
    pool_id: null,
    active: false,
  },
  saveWallet: (props) =>
    set({
      connected: props.connected,
      stake_address: props.stake_address,
      delegatedTo: {
        active: props.delegatedTo.active,
        pool_id: props.delegatedTo.pool_id,
      },
    }),
}));
