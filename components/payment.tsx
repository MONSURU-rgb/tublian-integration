import { paymentPlansData } from "@/data";
import { clsx } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { TickCircle } from "iconsax-react";
import React, { Dispatch, SetStateAction } from "react";
import { PaymentTypePage } from "./modals/payment-type";

export function PaymentPage({
  paymentDuration,
  setPaymentDuration,
  activePlan,
  setActivePlan,
}: {
  paymentDuration: string;
  setPaymentDuration: Dispatch<SetStateAction<string>>;
  activePlan: string;
  setActivePlan: Dispatch<SetStateAction<string>>;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedModal, { open: openSuccessModal, close: closeSuccessModal }] =
    useDisclosure(false);

  return (
    <>
      {" "}
      <article className="flex flex-col gap-14 items-center lg:gap-2">
        <h2 className="text-4xl/144 font-bold text-base-900-dark font-grotesk mobile:text-lg/[30px]">
          Payment Plan
        </h2>

        <p className="text-base-800-dark font-grotesk text-base font-medium mobile:text-sm text-center">
          We will customize your experience based on your option.
        </p>
      </article>
      <section className="flex rounded-lg border border-[#888888] p-[2px] mobile:w-full">
        <span
          className={clsx(
            "rounded-[5px] py-2 px-12 mobile:w-1/2 mobile:text-center mobile:p-0 text-base-900-dark font-grotesk text-center flex justify-center items-center cursor-pointer",
            paymentDuration === "Monthly" ? "payment" : ""
          )}
          onClick={() => {
            setPaymentDuration("Monthly");
            open();
          }}>
          Monthly
        </span>

        <article
          className={clsx(
            "py-2 px-4 flex gap-1 font-grotesk text-base-800-dark items-center rounded-[5px] cursor-pointer",
            paymentDuration === "Annually" ? "payment" : ""
          )}
          onClick={() => setPaymentDuration("Annually")}>
          <p className="font-bold text-[20px]/[32px]">Annually</p>
          <span className="px-[6px] py-1 text-xs font-bold rounded-[33px] bg-[#445742] text-[#76F368] text-center sm:whitespace-nowrap">
            20% Off
          </span>
        </article>
      </section>
      <div className="flex gap-7 mobileSm:flex-col mobile:flex-wrap md:gap-5 mobileSm:w-full">
        {paymentPlansData.map((plan, index) => (
          <div
            key={plan.type}
            className={clsx(
              "p-5 rounded-[20px] flex flex-col gap-5 setUp cursor-pointer flex-1",
              plan.type === activePlan ? "active-plan" : ""
            )}
            onClick={() => setActivePlan(plan.type)}>
            <section className="flex flex-col gap-14">
              <span
                className={clsx(
                  "py-[3px] px-5 text-center w-fit text-lg font-bold",
                  plan.type === "Pro"
                    ? "proPlan"
                    : plan.type === "Business Plan"
                    ? "businessPlan"
                    : "enterprisePlan"
                )}>
                {plan.type}
              </span>
              <article>
                <span className="font-grotesk text-base-900-dark text-3xl/[150%] font-bold">
                  {plan.rate}
                </span>
                <span className="text-base-700-dark-tertiary font-grotesk text-[18px]/[30px] font-medium">
                  {plan.duration}
                </span>
              </article>
            </section>

            <div className="flex-1">
              <h3 className="text-base-700-dark-tertiary font-grotesk font-medium text-xl/[160%] pb-2">
                Features:
              </h3>

              <section className="flex flex-col gap-3">
                {plan.features.map((feature, idx) => (
                  <article key={idx} className="flex gap-2">
                    <TickCircle size="24" color="#76F368" variant="Bold" />
                    <p className="max-w-[229px] text-base-900-dark text-sm font-medium font-grotesk">
                      {feature}
                    </p>
                  </article>
                ))}
              </section>
            </div>

            <button
              className={clsx(
                plan.action === "Subscribe"
                  ? "action-button"
                  : "action-button payment"
              )}>
              {plan.action}
            </button>
          </div>
        ))}

        <PaymentTypePage
          opened={opened}
          openSuccessModal={open}
          close={close}
        />
      </div>
      <footer className="pt-5 pb-[90px] sm:hidden lg:pb-[87px] md:pb-[55px]">
        <ul className="flex gap-5 font-grotesk text-base text-base-700-dark-tertiary">
          <li>Privacy Policy</li>
          <li>Terms</li>
        </ul>
      </footer>
    </>
  );
}
