"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { formatBigInt } from "../../utils/utils";

export const TokenBalance = ({
  balance,
  symbol,
  isLoading,
}: {
  balance: any;
  symbol: string;
  isLoading?: boolean;
}) => {
  const [balanceState, setBalanceState] = useState();
  useEffect(() => {
    setBalanceState(balance);
  }, [balance]);

  return (
    <div className="flex justify-end">
      <div className="flex text-sm">
        {isLoading || typeof balanceState != "bigint" ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : balanceState ? (
          formatBigInt(balanceState, 3)
            .toLocaleString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        ) : (
          "0"
        )}
        <div className="ml-2">{symbol}</div>
      </div>
    </div>
  );
};
