import Image from "next/image";

export default function Loading() {
  return (
    <div className="loading-wrapper">
      <Image src="/avatar.png" alt="" width={100} height={100} />
      <h1>Loading</h1>
    </div>
  );
}
