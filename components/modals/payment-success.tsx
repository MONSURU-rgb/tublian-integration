import { Modal } from "@mantine/core";
import Image from "next/image";
import { useContext } from "react";
import { ActiveContext } from "..";

export function PaymentSuccessModal({
  openedModal,
  openSuccessModal,
  closeSuccessModal,
  isOpened,
}: {
  openedModal?: boolean;
  openSuccessModal?: () => void;
  closeSuccessModal: () => void;
  isOpened: boolean;
}) {
  const { active, setActive } = useContext(ActiveContext);
  return (
    <Modal
      opened={isOpened}
      onClose={closeSuccessModal}
      size={580}
      withCloseButton={false}
      centered
      classNames={{
        body: "p-0",
        content: "!rounded-[20px] no-scrollbar",
      }}
      overlayProps={{
        blur: "20px",
      }}>
      <div className="flex flex-col bg-[#121212] rounded-[20px] gap-7">
        <Image
          src="/payment-success-icon.png"
          alt="Payment success Logo"
          fill
          className="!relative w-full h-[314px]"
        />

        <article className="pt-3 flex flex-col gap-2">
          <h2 className="text-base-800-dark text-center font-grotesk text-3xl/[150%] font-bold">
            Payment Successful
          </h2>

          <span className="font-grotesk text-base forn-medium text-center text-base-800-dark">
            Your payment went through successfully.{" "}
          </span>
        </article>

        <button
          className="success-action-button mx-5 mb-5 !max-w-[540px]"
          type="button"
          onClick={() => {
            // closeSuccessModal();
            setActive(1);
          }}>
          Proceed
        </button>
      </div>
    </Modal>
  );
}
