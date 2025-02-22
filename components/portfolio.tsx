"use client";

import { useWallet } from "@/context/wallet-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function Portfolio() {
  const { isConnected, balance } = useWallet();
  const [ethPrice, setEthPrice] = useState<number>(0);

  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );
        const data = await response.json();
        setEthPrice(data.ethereum.usd);
      } catch (error) {
        console.error("Error fetching ETH price:", error);
      }
    };

    if (isConnected) {
      fetchEthPrice();
      const interval = setInterval(fetchEthPrice, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [isConnected]);

  if (!isConnected) {
    return (
      <div className="text-center text-muted-foreground">
        Please connect your wallet to view your portfolio
      </div>
    );
  }

  const ethBalance = Number.parseFloat(balance);
  const usdBalance = ethBalance * ethPrice;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>ETH Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{ethBalance.toFixed(4)} ETH</p>
          <p className="text-sm text-muted-foreground">
            ${usdBalance.toFixed(2)} USD
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
