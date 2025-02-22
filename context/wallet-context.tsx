/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

declare global {
  interface Window {
    ethereum?: any;
  }
}

import type React from "react";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { ethers } from "ethers";
import type { Provider } from "ethers";

interface WalletContextType {
  address: string | null;
  balance: string;
  provider: Provider | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnected: boolean;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  balance: "0",
  provider: null,
  connect: async () => {},
  disconnect: () => {},
  isConnected: false,
});

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState("0");
  const [provider, setProvider] = useState<Provider | null>(null);

  const connect = useCallback(async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(accounts[0]);

        setAddress(accounts[0]);
        setBalance(ethers.formatEther(balance));
        setProvider(provider);
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
    setBalance("0");
    setProvider(null);
  }, []);

  useEffect(() => {
    // Check if already connected
    if (typeof window.ethereum !== "undefined") {
      const checkConnection = async () => {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          await connect();
        }
      };
      checkConnection();

      // Listen for account changes
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          connect();
        } else {
          disconnect();
        }
      });
    }
  }, [connect, disconnect]);

  return (
    <WalletContext.Provider
      value={{
        address,
        balance,
        provider,
        connect,
        disconnect,
        isConnected: !!address,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
