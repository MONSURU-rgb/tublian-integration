import Image from "next/image";
export function CreateAccountOverlay() {
  return (
    <>
      <Image
        src="/dddraw-2.png"
        alt="create account Logo"
        width={177}
        height={71}
        className=" justify-self-end self-start"
      />

      <Image
        src="/user-image.png"
        alt="user image"
        fill
        className="!relative !w-[553px] !h-[350px] self-center justify-self-center lg:w-full"
      />
      <Image
        src="/dddraw.png"
        alt="create account Logo"
        width={177}
        height={71}
        className=" justify-self-start self-end"
      />
    </>
  );
}
