import Image from "next/image";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <LoadingSkeleton />;
}

export const LoadingSkeleton = () => {
  return (
    <div className="w-full">
      <Image
        width={12}
        height={12}
        src="/icons/ouroboros.svg"
        alt="Follow us on Twitter"
      />
    </div>
  );
};
