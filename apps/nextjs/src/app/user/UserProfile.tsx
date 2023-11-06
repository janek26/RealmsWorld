"use client";

import crypto from "crypto";
import Image from "next/image";
import L2_C1ERC20 from "@/abi/L2/C1ERC20.json";
import { ChainType, tokens as tokensConst } from "@/constants/tokens";
import { useStarkDisplayName } from "@/hooks/useStarkName";
import EthereumLogo from "@/icons/ethereum.svg";
import Starknet from "@/icons/starknet.svg";
import { shortenHex } from "@/utils/utils";
import {
  useContractRead,
  useAccount as useL2Account,
} from "@starknet-react/core";
import { useAccount as useL1Account } from "wagmi";

import { TokenBalance } from "../bridge/TokenBalance";

export const UserProfile = ({
  l1Address,
  l2Address,
}: {
  l1Address?: string;
  l2Address?: string;
}) => {
  const { address: l1Account } = useL1Account();
  const { address: l2Account } = useL2Account();

  const l1Shown = l1Address ?? l1Account;
  const l2Shown = l2Address ?? l2Account;

  const network =
    process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? "GOERLI" : "MAIN";

  function hexToNumber(hexString: string, minValue = 1, maxValue = 10) {
    const hash = crypto.createHash("sha256");
    hash.update(hexString);
    const hexDigest = hash.digest("hex");
    const intValue = BigInt(`0x${hexDigest}`);
    const scaledValue =
      minValue + Number(intValue % BigInt(maxValue - minValue + 1));
    return scaledValue;
  }
  const id = l1Shown
    ? hexToNumber(l1Shown, 1, 10)
    : hexToNumber(l2Shown, 1, 10);

  const {
    data: l2LordsBalance,
    isLoading: l2LordsIsLoading,
    //refetch: l2LordsRefetch,
  } = useContractRead({
    address: tokensConst.L2.LORDS.tokenAddress[ChainType.L2[network]]!,
    abi: L2_C1ERC20,
    functionName: "balance_of",
    enabled: !!l2Shown,
    args: [l2Shown],
    watch: true,
  });

  const starkName = useStarkDisplayName(l2Shown);
  return (
    <div className="from-theme-gray-light hidden w-1/4 flex-none rounded-t-2xl bg-gradient-to-b p-4 sm:block">
      <h5>
        {l2Shown && (
          <div className="flex justify-between">
            <div className="flex">
              <Starknet className="mr-2 w-6" /> <span>{starkName}</span>
            </div>
            <TokenBalance
              balance={l2LordsBalance}
              symbol="Lords"
              isLoading={l2LordsIsLoading}
            />
          </div>
        )}
        {l1Shown && (
          <div className="flex">
            <EthereumLogo className="ml-[2px] mr-2 w-[22px]" />
            {shortenHex(l1Shown)}
          </div>
        )}
      </h5>
      <Image
        src={`/users/${id}.png`}
        alt="An example image"
        width={2000}
        height={2000}
        className="mx-auto rounded"
      />
    </div>
  );
};
