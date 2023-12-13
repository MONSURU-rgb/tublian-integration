import { Modal, TextInput } from "@mantine/core";
import Image from "next/image";
import {
  CardCheckedState,
  CardUncheckedState,
  Express,
  GooglePay,
  Mastercard,
  Stripe,
  Visa,
} from "..";
import { ArrowDown2, Card, InfoCircle, Lock1, TickCircle } from "iconsax-react";
import { inputStyles } from "../input-styles";
import { useForm } from "@mantine/form";

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
                <h3 className="text-base-900-dark font-grotesk text-xl/[160%] font-bold">
                  Monthly Plan
                </h3>

                <span className="text-primary-gold-300 font-grotesk text-base font-medium">
                  Change Plan
                </span>
              </article>

              <span className="businessPlan py-[3px] px-5 text-center w-fit mx-5">
                Business Plan
              </span>

              <section className="flex justify-between items-center px-5">
                <span className="font-grotesk text-[20px]/[30px] font-medium text-base-900-dark">
                  Total:
                </span>

                <section className="flex items-center">
                  <span className="font-grotesk text-sm pr-2 text-base-700-dark-tertiary font-medium">
                    USD
                  </span>
                  <article>
                    <span className="font-grotesk text-base-900-dark text-3xl/[150%] font-bold">
                      $49.99
                    </span>
                    <span className="text-base-700-dark-tertiary font-grotesk text-[18px]/[30px] font-medium">
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
                <section className="px-5 py-14 flex gap-5 items-center setUpWithGradient">
                  <CardCheckedState />
                  <article className="flex gap-14 items-center">
                    <Card size="24" color="#FEFEFE" />

                    <span className="text-base-900-dark text-xl/[160%] font-bold font-grotesk">
                      Credit Card
                    </span>
                  </article>
                </section>
                <section className="px-5 py-14 flex gap-5 setUp">
                  <CardUncheckedState />
                  <GooglePay />
                </section>
              </div>

              <form className="flex flex-col gap-5">
                <h3 className="font-grotesk text-lg font-bold text-base-900-dark">
                  Payment Details
                </h3>

                <TextInput
                  placeholder="Email"
                  styles={inputStyles}
                  rightSection={
                    PaymentDetailsForm.values.email.length > 4 ? (
                      <TickCircle size="24" color="#76F368" />
                    ) : PaymentDetailsForm.values.email.length >= 1 &&
                      PaymentDetailsForm.values.email.length <= 4 ? (
                      <InfoCircle size="24" color="#F26663" />
                    ) : null
                  }
                  {...PaymentDetailsForm.getInputProps("email")}
                />
                <TextInput
                  placeholder="Card Holder"
                  styles={inputStyles}
                  rightSection={
                    PaymentDetailsForm.values.userDetails.length > 4 ? (
                      <TickCircle size="24" color="#76F368" />
                    ) : PaymentDetailsForm.values.userDetails.length >= 1 &&
                      PaymentDetailsForm.values.userDetails.length <= 4 ? (
                      <InfoCircle size="24" color="#F26663" />
                    ) : null
                  }
                  {...PaymentDetailsForm.getInputProps("first_name")}
                />

                <TextInput
                  styles={inputStyles}
                  placeholder="Card Number"
                  icon={<Lock1 size="24" color="#B7B7B7" />}
                  classNames={{ rightSection: "w-fit" }}
                  rightSection={
                    <figure className="flex gap-3 items-center">
                      <Visa />
                      <Mastercard />
                      <Express />
                    </figure>
                  }
                />

                <article className="flex gap-5">
                  <TextInput
                    placeholder="MM/YY"
                    styles={inputStyles}
                    className="flex-1"
                    rightSection={
                      PaymentDetailsForm.values.date.length > 4 ? (
                        <TickCircle size="24" color="#76F368" />
                      ) : PaymentDetailsForm.values.date.length >= 1 &&
                        PaymentDetailsForm.values.date.length <= 4 ? (
                        <InfoCircle size="24" color="#F26663" />
                      ) : null
                    }
                    {...PaymentDetailsForm.getInputProps("first_name")}
                  />
                  <TextInput
                    className="flex-1"
                    placeholder="CVV"
                    styles={inputStyles}
                    rightSection={
                      PaymentDetailsForm.values.cvv.length > 2 ? (
                        <TickCircle size="24" color="#76F368" />
                      ) : PaymentDetailsForm.values.cvv.length >= 1 &&
                        PaymentDetailsForm.values.cvv.length <= 2 ? (
                        <InfoCircle size="24" color="#F26663" />
                      ) : null
                    }
                    {...PaymentDetailsForm.getInputProps("first_name")}
                  />
                </article>

                <TextInput
                  placeholder="Country"
                  styles={inputStyles}
                  rightSection={<ArrowDown2 size="20" color="#FEFEFE" />}
                  {...PaymentDetailsForm.getInputProps("first_name")}
                />

                <article className="font-grotesk text-base font-bold text-[#CFCFCF] pt-2">
                  By clicking below, you agree to our{" "}
                  <span className="text-[#FDD649]">Terms, Privacy Policy</span>
                  and <span className="text-[#91C3FD]">Automatic Renewal</span>.
                  Tublian will charge you $49.99 (plus Tax) each month until you
                  cancel you subscription in account settings.
                </article>

                <button
                  className="action-button !max-w-full"
                  type="submit"
                  onClick={() => {
                    close();
                    openSuccessModal();
                  }}>
                  Pay $49.99
                </button>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
