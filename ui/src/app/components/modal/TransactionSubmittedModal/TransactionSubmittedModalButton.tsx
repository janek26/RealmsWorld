import { openInNewTab, evaluate } from "@starkware-industries/commons-js-utils";
import PropTypes from "prop-types";
import React from "react";

import {
  ETHERSCAN_TX_URL,
  VOYAGER_TX_URL,
  STARKSCAN_TX_URL,
  STARKSCAN_ETH_TX_URL,
} from "@/constants/env";

import { Button } from "../../ui/button";
import { ActionType } from "@/constants/transferSteps";
import Image from "next/image";
const TransactionSubmittedModalButton = ({
  transfer,
  buttonProps,
}: {
  transfer: any;
  buttonProps: any;
}) => {
  //const { colorIndigo, colorWhite, colorGainsboro } = useColors();
  const { type, l2hash, l1hash } = transfer;
  const isTransferCompleted = l1hash && l2hash;

  let explorers;

  if (type === ActionType.TRANSFER_TO_L2 || isTransferCompleted) {
    explorers = [
      {
        name: "Etherscan",
        url: ETHERSCAN_TX_URL(l1hash),
        logo: (
          <Image
            width={12}
            height={12}
            src="/icons/etherscan.svg"
            alt="Starkscan"
          />
        ),
      },
      {
        name: "StarkScan",
        url: STARKSCAN_ETH_TX_URL(l1hash),
        logo: (
          <Image
            width={12}
            height={12}
            src="/icons/starkscan.svg"
            alt="Starkscan"
          />
        ),
      },
    ];
  }

  if (type === ActionType.TRANSFER_TO_L1 && !isTransferCompleted) {
    explorers = [
      {
        name: "Voyager",
        url: VOYAGER_TX_URL(l2hash),
        logo: (
          <Image
            width={12}
            height={12}
            src="/icons/voyager.svg"
            alt="Starkscan"
          />
        ),
      },
      {
        name: "StarkScan",
        url: STARKSCAN_TX_URL(l2hash),
        logo: (
          <Image
            width={12}
            height={12}
            src="/icons/starkscan.svg"
            alt="Starkscan"
          />
        ),
      },
    ];
  }

  const onClick = (url: string) => {
    openInNewTab(url);
  };

  return explorers?.map((explorer) => (
    <Button
      key={explorer.name}
      height={48}
      className="w-full normal-case"
      variant={"outline"}
      size={"lg"}
      onClick={() => onClick(explorer.url)}
      {...buttonProps}
    >
      {evaluate("View on {{explorer}}", { explorer: explorer.name })}
    </Button>
  ));
};

TransactionSubmittedModalButton.propTypes = {
  transfer: PropTypes.object,
  buttonProps: PropTypes.object,
};

export default TransactionSubmittedModalButton;
