import { Suspense } from "react";
import { L2ERC721Table } from "@/app/collection/[id]/(list)/L2ERC721Table";
import { TokenCardSkeleton } from "@/app/collection/TokenCardSkeleton";
import { TradeFilters } from "@/app/collection/TradeFilters";
import { getTokenContractAddresses } from "@/utils/utils";

export default async function GoldenToken({
  params,
}: {
  params: { address: string };
}) {
  return (
    <>
      <div className="mb-3 flex w-full justify-between">
        <TradeFilters />
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-4 sm:pl-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <TokenCardSkeleton key={index} />
            ))}
          </div>
        }
      >
        <L2ERC721Table
          contractAddress={getTokenContractAddresses("beasts").L2!}
          ownerAddress={params.address}
        />
      </Suspense>
    </>
  );
}
