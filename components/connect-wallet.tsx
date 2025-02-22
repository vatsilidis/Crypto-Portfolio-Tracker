"use client";

import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/wallet-context";
import { Wallet } from "lucide-react";

export function ConnectWallet() {
  const { connect, disconnect, isConnected, address } = useWallet();

  return (
    <div className="flex items-center justify-end mb-8">
      {isConnected ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
          <Button variant="outline" onClick={disconnect}>
            Disconnect
          </Button>
        </div>
      ) : (
        <Button onClick={connect}>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      )}
    </div>
  );
}
