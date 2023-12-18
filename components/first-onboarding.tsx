import { ActiveContext } from "@/components";
import { useContext, useState } from "react";
import { Flex, clsx } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { GetStartedPage } from "./get-started";
import { CreateAccountPage } from "./create-account";
import { AccountSetUpPage } from "./account-setUp";
import { PaymentPage } from "./payment";
import { CreateAccountOverlay } from "./create-account-overlay";
import { NavBarMenu } from "./nav-bar-menu";
import { IUserDetailsForm } from "./types";

const backgroundImages = [
  "bg-[url('/first-onboarding-bg.png')]",
  "bg-[url('/create-account-bg-1.png')]",
];
export function FirstOnboarding() {
  const { active, setActive } = useContext(ActiveContext);
  const [checkedChoice, setCheckedChoice] = useState(1);
  const [paymentDuration, setPaymentDuration] = useState("Monthly");
  const [activePlan, setActivePlan] = useState("Business Plan");

  const UserDetailsForm = useForm<IUserDetailsForm>({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });

  const nextStep = () => {
    setActive((current) => (current < 4 ? current + 1 : current));
  };
  const prevStep = () =>
    setActive((current) => (current > 1 ? current - 1 : current));
  return (
    <div className="flex min-h-screen bg-[#121212]">
      {active < 3 ? (
        <figure
          className={clsx(
            "w-1/2 min-h-full bg-no-repeat bg-cover bg-bottom flex-1 grid py-18 mobile:hidden",
            active < 3
              ? `${backgroundImages.at(active - 1)}`
              : active === 1
              ? "lg:bg-[url('/first-onboarding-bg-1200.png')] md:bg-[url('/first-onboarding-bg-1024.png')]"
              : ""
          )}>
          {active === 2 ? <CreateAccountOverlay /> : ""}
        </figure>
      ) : null}

      <Flex
        className={clsx(
          "flex-col",
          active < 3
            ? "w-1/2 px-10 lg:pl-[52px] lg:pr-0 md:pl-7 mobile:w-full sm:pl-4"
            : "w-full pr-[103px] pl-[108px] lg:pl-[52px] lg:pr-[52px] mobile:px-4"
        )}>
        <NavBarMenu />
        {active === 1 ? (
          <GetStartedPage
            UserDetailsForm={UserDetailsForm}
            nextStep={nextStep}
          />
        ) : active === 2 ? (
          <CreateAccountPage
            UserDetailsForm={UserDetailsForm}
            nextStep={nextStep}
          />
        ) : active === 3 ? (
          <AccountSetUpPage
            checkedChoice={checkedChoice}
            setCheckedChoice={setCheckedChoice}
            nextStep={nextStep}
          />
        ) : (
          <div className="pt-10 mobile:pt-5 flex flex-col justify-center items-center gap-10 mobile:gap-7 mobile:pb-5">
            <PaymentPage
              paymentDuration={paymentDuration}
              setPaymentDuration={setPaymentDuration}
              activePlan={activePlan}
              setActivePlan={setActivePlan}
            />

            {/* <Modal
              opened={opened}
              onClose={close}
              centered
              overlayProps={{
                opacity: 0.2,
                blur: 10,
              }}
              withCloseButton={false}
              classNames={{
                body: "!p-0 rounded-[20px] no-scrollbar relative",
                root: "no-scrollbar",
              }}
              radius={20}
              size={580}>
              <div className="p-5 flex flex-col setUp gap-7">
                <article className="flex justify-between items-center">
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
                        UserDetailsForm.values.first_name.length > 4 ? (
                          <TickCircle size="24" color="#76F368" />
                        ) : UserDetailsForm.values.first_name.length >= 1 &&
                          UserDetailsForm.values.first_name.length <= 4 ? (
                          <InfoCircle size="24" color="#F26663" />
                        ) : null
                      }
                      {...UserDetailsForm.getInputProps("first_name")}
                    />
                    <TextInput
                      placeholder="Card Holder"
                      styles={inputStyles}
                      rightSection={
                        UserDetailsForm.values.first_name.length > 4 ? (
                          <TickCircle size="24" color="#76F368" />
                        ) : UserDetailsForm.values.first_name.length >= 1 &&
                          UserDetailsForm.values.first_name.length <= 4 ? (
                          <InfoCircle size="24" color="#F26663" />
                        ) : null
                      }
                      {...UserDetailsForm.getInputProps("first_name")}
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
                          UserDetailsForm.values.first_name.length > 4 ? (
                            <TickCircle size="24" color="#76F368" />
                          ) : UserDetailsForm.values.first_name.length >= 1 &&
                            UserDetailsForm.values.first_name.length <= 4 ? (
                            <InfoCircle size="24" color="#F26663" />
                          ) : null
                        }
                        {...UserDetailsForm.getInputProps("first_name")}
                      />
                      <TextInput
                        className="flex-1"
                        placeholder="CVV"
                        styles={inputStyles}
                        rightSection={
                          UserDetailsForm.values.first_name.length > 4 ? (
                            <TickCircle size="24" color="#76F368" />
                          ) : UserDetailsForm.values.first_name.length >= 1 &&
                            UserDetailsForm.values.first_name.length <= 4 ? (
                            <InfoCircle size="24" color="#F26663" />
                          ) : null
                        }
                        {...UserDetailsForm.getInputProps("first_name")}
                      />
                    </article>

                    <TextInput
                      placeholder="Country"
                      styles={inputStyles}
                      rightSection={<ArrowDown2 size="20" color="#FEFEFE" />}
                      {...UserDetailsForm.getInputProps("first_name")}
                    />

                    <article className="font-grotesk text-base font-bold text-[#CFCFCF] pt-2">
                      By clicking below, you agree to our{" "}
                      <span className="text-[#FDD649]">
                        Terms, Privacy Policy
                      </span>
                      and{" "}
                      <span className="text-[#91C3FD]">Automatic Renewal</span>.
                      Tublian will charge you $49.99 (plus Tax) each month until
                      you cancel you subscription in account settings.
                    </article>

                    <button className="action-button !max-w-full" type="submit">
                      Pay $49.99
                    </button>
                  </form>
                </div>
              </div>
            </Modal> */}
          </div>
        )}
      </Flex>
    </div>
  );
}
