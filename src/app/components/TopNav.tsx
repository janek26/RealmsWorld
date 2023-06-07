"use client";

import Link from "next/link";
import EthereumLogin from "./wallet/EthereumLogin";
import StarkLogin from "./wallet/StarkLogin";
import { Compass, Menu, Wallet } from "lucide-react";
import { useUIContext } from "@/app/providers/UIProvider";
import { Button } from "./ui/button";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useAccount as useL2Account } from "@starknet-react/core";
import { useAccount as useL1Account } from "wagmi";
import { shortenHex } from "@/functions/utils";
import EthereumLogo from "@/icons/ethereum.svg";
import StarknetLogo from "@/icons/starknet.svg";

export const TopNav = () => {
  const { toggleSidebar } = useUIContext();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  const { address: l1Address, isConnected } = useL1Account();
  const { address: l2Address } = useL2Account();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 0);
  });

  return (
    <div
      id="topnav"
      className={`fixed w-full p-3 pl-4 sm:pl-8 lg:pl-32 z-[100] ${
        isScrolled ? "bg-opacity-30 backdrop-blur-sm bg-black" : ""
      }`}
    >
      <div className="flex justify-between ">
        <Button className="lg:hidden" onClick={toggleSidebar}>
          <Menu className="self-center" />
        </Button>

        <Link
          className="flex self-center text-xl font-semibold sm:mr-3 sm:text-2xl font-sans-serif"
          href="/"
        >
          <Compass className="self-center mr-3" />
          <span className="hidden sm:block">Atlas </span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="dark:bg-opacity-60">
              {!l1Address && !l2Address ? (
                "Connect"
              ) : (
                <div className="flex gap-x-2">
                  {l1Address && isConnected && (
                    <>
                      <EthereumLogo className="w-5 h-5 -mr-1" />
                      {shortenHex(l1Address)}
                    </>
                  )}
                  {l2Address && (
                    <>
                      <StarknetLogo className="ml-2 w-5 h-5" />
                      {shortenHex(l2Address)}
                    </>
                  )}
                </div>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle>Wallets</SheetTitle>
            <div className="flex-col gap-y-4 flex w-full">
              {(l1Address || l2Address) && (
                <div className="grid grid-cols-4 uppercase justify-items-center align-items-center space-x-3">
                  <div className="col-span-2"></div>
                  <div>Eth</div>
                  <div>Lords</div>
                </div>
              )}
              <EthereumLogin />
              <StarkLogin />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
