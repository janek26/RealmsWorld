import type { FC } from "react";
import React from "react";
import type { RouterOutputs } from "@/utils/api";
import { formatUnits } from "viem";

import ERC721MarketplaceItem from "./ERC721MarketplaceItem";

interface ERC721LineItemProps {
  tokenDetails?: RouterOutputs["erc721Tokens"]["byId"] /*NonNullable<
    NonNullable<ReturnType<typeof useTokens>>["data"]
  >[0];*/;
  collection?: any /*Pick<
    NonNullable<ReturnType<typeof useCollections>["data"]>[0],
    "name" | "royalties" | "image"
  >;*/;
  usdPrice?: string;
  isUnavailable?: boolean;
  warning?: string;
  price: bigint;
  priceSubtitle?: string;
  expires?: string;
  className?: string;
  showRoyalties?: boolean;
  quantity?: number;
}

const ERC721LineItem: FC<ERC721LineItemProps> = ({
  tokenDetails,
  collection,
  usdPrice,
  isUnavailable,
  price,
  priceSubtitle,
  warning,
  expires,
  showRoyalties,
  quantity,
}) => {
  if (!tokenDetails) {
    return null;
  }

  const name = tokenDetails?.name || `#${tokenDetails?.token_id}`;
  const collectionName =
    tokenDetails?.collection?.name || collection?.name || "";

  const img = tokenDetails?.image
    ? tokenDetails.image
    : (collection?.image as string);

  const royaltiesBps =
    showRoyalties && collection?.royalties ? collection.royalties.bps : 500;

  return (
    <div className="border-b p-2">
      <ERC721MarketplaceItem
        img={img}
        name={name}
        price={price}
        usdPrice={usdPrice}
        collection={collectionName}
        expires={expires}
        warning={warning}
        isUnavailable={isUnavailable}
        priceSubtitle={priceSubtitle}
        royaltiesBps={royaltiesBps}
        quantity={quantity}
      />
    </div>
  );
};

export default ERC721LineItem;