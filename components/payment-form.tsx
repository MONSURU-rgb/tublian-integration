import { TextInput } from "@mantine/core";
import { inputStyles } from "./input-styles";
import { ArrowDown2, InfoCircle, Lock1, TickCircle } from "iconsax-react";
import { Express, Mastercard, Visa } from ".";
import { UseFormReturnType } from "@mantine/form";
import { useState } from "react";
import { PaymentSuccessModal } from "./modals/payment-success";

export function PaymentForm({
  PaymentDetailsForm,
  openSuccessModal,
  closeSuccessModal,
}: {
  PaymentDetailsForm: UseFormReturnType<
    Record<string, string>,
    (values: Record<string, string>) => Record<string, string>
  >;
  openSuccessModal: () => void;
  closeSuccessModal: () => void;
}) {
  const [isSuccessOpened, setIsSuccessOpened] = useState(false);
  return (
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
        and <span className="text-[#91C3FD]">Automatic Renewal</span>. Tublian
        will charge you $49.99 (plus Tax) each month until you cancel you
        subscription in account settings.
      </article>

      <button
        className="action-button !max-w-full"
        type="button"
        onClick={() => {
          setIsSuccessOpened(!isSuccessOpened);
        }}>
        Pay $49.99
      </button>

      <PaymentSuccessModal
        isOpened={isSuccessOpened}
        closeSuccessModal={closeSuccessModal}
      />
    </form>
  );
}
