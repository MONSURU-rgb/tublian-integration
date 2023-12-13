import { checkoutPageData } from "@/data";
import { clsx } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

export function AccountSetUpPage({
  checkedChoice,
  setCheckedChoice,
  nextStep,
}: {
  checkedChoice: number;
  setCheckedChoice: Dispatch<SetStateAction<number>>;
  nextStep: () => void;
}) {
  return (
    <>
      <div className="pt-10 flex gap-10 flex-col  items-center lg:pb-4 md:pb-10 flex-1 z-20">
        <article className="flex flex-col gap-14 items-center">
          <h2 className="text-4xl/144 font-bold text-base-900-dark font-grotesk text-center mobile:text-lg">
            How are you planning to use Tublian?
          </h2>

          <p className="text-base-800-dark font-grotesk text-base font-medium lg:max-w-[379px] md:max-w-full text-center mobile:text-sm">
            We will customize your experience based on your option.
          </p>
        </article>
        <div className="flex gap-7 mobile:flex-col mobile:w-full">
          {checkoutPageData.map((choice) => (
            <section
              key={choice.id}
              className={clsx(
                "pr-14 pt-14 pb-5 pl-5 flex flex-col gap-18 justify-between mobile:flex-row",
                choice.id === checkedChoice ? "signup !rounded-[20px]" : "setUp"
              )}
              onClick={() => setCheckedChoice(choice.id)}>
              <figure className="flex flex-col gap-2  mobile:flex-row-reverse w-full mobile:justify-between">
                {choice.id === checkedChoice ? (
                  <Image
                    src="/tick-circle.svg"
                    alt="Account Set up Checked Icon"
                    width={24}
                    height={24}
                    className="self-end mobile:self-center"
                  />
                ) : (
                  <span
                    className={clsx(
                      "rounded-full bg-[#1E1E1E] border border-[#292929] self-end mobile:self-center",
                      choice.title === "Personal Projects"
                        ? "w-5 h-[22px]"
                        : "w-5 h-6 mobile:h-[22px]"
                    )}></span>
                )}

                <section className="flex">
                  <Image
                    src={choice.image}
                    alt={`${choice.title}Image`}
                    fill
                    className="!relative object-contain mobile:max-w-[71px] z-30"
                  />

                  <article className="mobile:flex flex-col gap-[6px] items-center hidden justify-start mobile:items-start">
                    <h3 className="font-grotesk text-2xl text-base-900-dark mobile:text-lg/[30px]">
                      {choice.title}
                    </h3>

                    <p className="text-base-800-dark text-start font-grotesk text-base max-w-[210px] mobile:text-sm">
                      {choice.description}
                    </p>
                  </article>
                </section>
              </figure>

              <article className="flex flex-col gap-[6px] items-center mobile:hidden">
                <h3 className="font-grotesk text-2xl text-base-900-dark">
                  {choice.title}
                </h3>

                <p className="text-base-800-dark text-start font-grotesk text-base max-w-[210px]">
                  {choice.description}
                </p>
              </article>
            </section>
          ))}
        </div>
        <button
          className="action-button !justify-self-center h-fit"
          onClick={nextStep}>
          Next
        </button>
      </div>
      <footer className="pt-[62px] pb-[47px] lg:pb-4 mx-auto md:pb-[40px] sm:hidden">
        <ul className="flex gap-5 font-grotesk text-base text-base-700-dark-tertiary">
          <li>Privacy Policy</li>
          <li>Terms</li>
        </ul>
      </footer>
    </>
  );
}
