import { Modal, TextInput, clsx } from "@mantine/core";
import Image from "next/image";
import { CardCheckedState, CardUncheckedState, GooglePay, Stripe } from "..";
import { Card } from "iconsax-react";
import { useForm } from "@mantine/form";
import { PaymentForm } from "../payment-form";
import { useState } from "react";

export function PaymentTypePage({
  opened,
  openSuccessModal,
  close,
}: {
  opened: boolean;
  close: () => void;
  openSuccessModal: () => void;
}) {
  const PaymentDetailsForm = useForm<Record<string, string>>({
    initialValues: {
      email: "",
      password: "",
      userDetails: "",
      date: "",
      cvv: "",
    },
  });

  const [choosenPayment, setChoosenPayment] = useState("credit");
  return (
    <Modal.Root
      opened={opened}
      onClose={close}
      centered
      size={580}
      transitionProps={{ duration: 600, transition: "slide-left" }}
      radius={20}>
      <Modal.Overlay classNames={{ root: "backdrop-blur-[16px]" }}>
        <div className="bg-inherit flex gap-1 absolute bottom-0 right-[50%] mobileSm:right-[20%] self-center cursor-pointer items-center">
          <Stripe />
          <span className="w-[6px] h-[6px] bg-[#414141]" />

          <p className="text-base-800-dark font-grotesk text-base font-medium whitespace-nowrap">
            Powered by Stripe.com
          </p>
        </div>
      </Modal.Overlay>
      <Modal.Content className="!relative no-scrollbar">
        <Modal.Body className="p-0">
          <div className="p-5 pt-0 flex flex-col setUp gap-7">
            <article className="flex justify-between items-center sticky top-0 bg-inherit pt-5 backdrop-opacity-60 z-50">
              <Image
                src="/payment-plan-logo.svg"
                alt="Tublian Logo"
                width={123}
                height={25}
              />
              <Image
                src="/close-icon.svg"
                alt="TClose Icon"
                width={32}
                height={32}
                onClick={() => close()}
              />
            </article>

            <div className="py-14 rounded-[10px] bg-base-100-dark border border-[#414141] flex flex-col gap-14">
              <article className="flex justify-between items-center pb-14 border-b border-[#414141] px-5">
                <h3 className="text-base-900-dark font-grotesk text-xl/[160%] mobileSm:text-lg font-bold">
                  Monthly Plan
                </h3>

                <span className="text-primary-gold-300 font-grotesk text-base mobileSm:text-sm font-medium">
                  Change Plan
                </span>
              </article>

              <span className="businessPlan py-[3px] px-5 text-center w-fit mx-5">
                Business Plan
              </span>

              <section className="flex justify-between items-center px-5">
                <span className="font-grotesk text-[20px]/[30px] font-medium text-base-900-dark mobileSm:text-base">
                  Total:
                </span>

                <section className="flex items-center">
                  <span className="font-grotesk text-sm pr-2 text-base-700-dark-tertiary font-medium">
                    USD
                  </span>
                  <article>
                    <span className="font-grotesk text-base-900-dark text-3xl/[150%] font-bold mobileSm:text-xl/[160%]">
                      $49.99
                    </span>
                    <span className="text-base-700-dark-tertiary font-grotesk text-[18px]/[30px] font-medium mobileSm:text-sm">
                      /Month
                    </span>
                  </article>
                </section>
              </section>
            </div>

            <div className="flex flex-col gap-5">
              <article className="flex flex-col gap-2">
                <h4 className="font-grotesk text-xl/[160%] font-bold text-base-900-dark">
                  Payment Method
                </h4>

                <span className="text-base-800-dark font-grotesk text-base font-medium">
                  Choose how you’d like to pay.
                </span>
              </article>

              <div className="flex flex-col gap-3">
                <section
                  className={clsx(
                    "px-5 py-14 flex gap-5 items-center",
                    choosenPayment === "credit"
                      ? "signup !rounded-[10px]"
                      : "setUp"
                  )}
                  onClick={() => setChoosenPayment("credit")}>
                  {choosenPayment === "credit" ? (
                    <CardCheckedState />
                  ) : (
                    <CardUncheckedState />
                  )}
                  <article className="flex gap-14 items-center">
                    <Card size="24" color="#FEFEFE" />

                    <span className="text-base-900-dark text-xl/[160%] font-bold font-grotesk">
                      Credit Card
                    </span>
                  </article>
                </section>
                <section
                  className={clsx(
                    "px-5 py-14 flex gap-5 items-center",
                    choosenPayment === "google card"
                      ? "signup !rounded-[10px]"
                      : "setUp"
                  )}
                  onClick={() => setChoosenPayment("google card")}>
                  {choosenPayment === "google card" ? (
                    <CardCheckedState />
                  ) : (
                    <CardUncheckedState />
                  )}
                  <GooglePay />
                </section>
              </div>

              <PaymentForm
                PaymentDetailsForm={PaymentDetailsForm}
                openSuccessModal={openSuccessModal}
                closeSuccessModal={close}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
