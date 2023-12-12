import Image from "next/image";
import {
  ActiveContext,
  CardCheckedState,
  CardUncheckedState,
  Express,
  GooglePay,
  Mastercard,
  Stripe,
  Visa,
} from "@/components";

const backgroundImages = [
  "bg-[url('/first-onboarding-bg.png')]",
  "bg-[url('/create-account-bg-1.png')]",
];
export function FirstOnboarding() {
  const { active, setActive } = useContext(ActiveContext);
  const [checkedChoice, setCheckedChoice] = useState(1);
  const [paymentDuration, setPaymentDuration] = useState("Monthly");
  const [opened, { open, close }] = useDisclosure(false);
  const [openedModal, { open: openSuccessModal, close: closeSuccessModal }] =
    useDisclosure(false);

  const [activePlan, setActivePlan] = useState("Business Plan");

  const UserDetailsForm = useForm<{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }>({
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
              ? `${backgroundImages.at(
                  active - 1
                )} lg:bg-[url('/first-onboarding-bg-1200.png')] md:bg-[url('/first-onboarding-bg-1024.png')]`
              : ""
          )}>
          {active === 2 ? (
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
                className="!relative !w-[553px] !h-[350px] self-center justify-self-center"
              />
              <Image
                src="/dddraw.png"
                alt="create account Logo"
                width={177}
                height={71}
                className=" justify-self-start self-end"
              />
            </>
          ) : (
            ""
          )}
        </figure>
      ) : null}

      <Flex
        className={clsx(
          "flex-col",
          active < 3
            ? "w-1/2 px-10 lg:pl-[52px] lg:pr-0 md:pl-7 mobile:w-full sm:pl-4"
            : "w-full pr-[103px] pl-[108px]"
        )}>
        <nav className="flex gap-5 items-center justify-between sticky top-0 bg-[#121212] pt-68 lg:pt-10 lg:flex-col lg:gap-3 lg:items-start lg:pr-[39px] sm:pr-4 flex-wrap">
          <Image
            src="Tublian-logo.svg"
            alt="Tublian Logo"
            width={122}
            height={25}
          />
          <ul className="flex gap-3 font-grotesk text-sm font-medium cursor-pointer whitespace-nowrap flex-wrap">
            <li
              className={`${active >= 1 ? "header-gradient" : ""}`}
              onClick={() => setActive(1)}>
              1: Get Started
            </li>
            <li
              className={`${
                active >= 2 ? "header-gradient" : "text-base-300-dark"
              }`}
              onClick={() => setActive(2)}>
              2: Create Account
            </li>
            <li
              className={`${
                active >= 3 ? "header-gradient" : "text-base-300-dark"
              }`}
              onClick={() => setActive(3)}>
              3: Account Setup
            </li>
            <li
              className={`${
                active >= 4 ? "header-gradient" : "text-base-300-dark"
              }`}
              onClick={() => setActive(4)}>
              4: Payment
            </li>
          </ul>
        </nav>
        {active === 1 ? (
          <GetStartedPage
            UserDetailsForm={UserDetailsForm}
            nextStep={nextStep}
          />
        ) : active === 2 ? (
          <div className="flex flex-col flex-1 pb-12">
            <div className="pt-11 font-grotesk flex flex-col gap-7 flex-1">
              <article className="flex flex-col gap-14">
                <h2 className="text-4xl/144 font-bold text-base-900-dark font-grotesk">
                  Create Account
                </h2>

                <h3 className="text-base-800-dark text-base font-medium">
                  Creating account for{" "}
                  <span className="text-[#4BA3FF]">@John Doe</span>
                </h3>
              </article>

              <section className="flex flex-col gap-14">
                <form className="max-w-[405px] flex flex-col gap-7">
                  <section className="flex flex-col gap-14">
                    <TextInput
                      type="email"
                      placeholder="Email"
                      styles={inputStyles}
                      rightSection={
                        UserDetailsForm.values.email.length > 4 ? (
                          <TickCircle size="24" color="#76F368" />
                        ) : UserDetailsForm.values.email.length >= 1 &&
                          UserDetailsForm.values.email.length <= 4 ? (
                          <InfoCircle size="24" color="#F26663" />
                        ) : null
                      }
                      {...UserDetailsForm.getInputProps("email")}
                    />

                    <div className=" flex flex-col gap-2">
                      <TextInput
                        placeholder="Password"
                        styles={inputStyles}
                        {...UserDetailsForm.getInputProps("password")}
                      />

                      <section className="flex gap-x-6 gap-y-2 flex-wrap">
                        <article className="flex gap-2 items-center">
                          <TickCircle
                            size="14"
                            color={
                              UserDetailsForm.values.password.length >= 8
                                ? "#76F368"
                                : "#414141"
                            }
                          />
                          <p className="text-base-500-dark text-[12px]/[16px] font-normal font-grotesk">
                            8 Characters minimum
                          </p>
                        </article>
                        <article className="flex gap-2 items-center">
                          <TickCircle
                            size="14"
                            color={
                              /[A-Z]/.test(UserDetailsForm.values.password)
                                ? "#76F368"
                                : "#414141"
                            }
                          />
                          <p className="text-base-500-dark text-[12px]/[16px] font-normal font-grotesk">
                            One uppercase character
                          </p>
                        </article>
                        <article className="flex gap-2 items-center">
                          <TickCircle
                            size="14"
                            color={
                              /[!@#$%^&*(),.?":{}|<>]/.test(
                                UserDetailsForm.values.password
                              )
                                ? "#76F368"
                                : "#414141"
                            }
                          />
                          <p className="text-base-500-dark text-[12px]/[16px] font-normal font-grotesk">
                            One symbol character
                          </p>
                        </article>
                      </section>
                    </div>
                  </section>

                  <button className="action-button" onClick={nextStep}>
                    Create Account
                  </button>
                </form>

                <article className="flex gap-2 items-center max-w-[405px]">
                  <span className="h-[1px] bg-[#414141] flex-1"></span>
                  <span className="text-base-700-dark-tertiary font-grotesk text-sm font-medium">
                    Or
                  </span>
                  <span className="h-[1px] bg-[#414141] flex-1"></span>
                </article>

                <button className="OAUth2-signup">
                  <Image
                    src="/google-logo.svg"
                    alt="Google Logo"
                    width={24}
                    height={24}
                  />

                  <p>Sign up with Google</p>
                </button>
              </section>

              <h3 className="text-base-700-dark-tertiary text-base">
                Already have an account?{" "}
                <span className="text-base-900-dark">Log in</span>
              </h3>
            </div>
            <footer>
              <ul className="flex gap-5 font-grotesk text-base text-base-700-dark-tertiary">
                <li>Privacy Policy</li>
                <li>Terms</li>
              </ul>
            </footer>
          </div>
        ) : active === 3 ? (
          <div className="pt-10 flex items-center justify-center gap-10 flex-col">
            <article className="flex flex-col gap-14 items-center">
              <h2 className="text-4xl/144 font-bold text-base-900-dark font-grotesk">
                How are you planning to use Tublian?
              </h2>

              <p className="text-base-800-dark font-grotesk text-base font-medium">
                We will customize your experience based on your option.
              </p>
            </article>
            <div className="flex gap-7">
              {checkoutPageData.map((choice) => (
                <section
                  key={choice.id}
                  className={clsx(
                    "pr-14 pt-14 pb-5 pl-5 flex flex-col gap-18 justify-between",
                    choice.id === checkedChoice ? "setUpWithGradient" : "setUp"
                  )}
                  onClick={() => setCheckedChoice(choice.id)}>
                  <figure className="flex flex-col gap-2">
                    {choice.id === checkedChoice ? (
                      <Image
                        src="/tick-circle.svg"
                        alt="Account Set up Checked Icon"
                        width={24}
                        height={24}
                        className="self-end"
                      />
                    ) : (
                      <span
                        className={clsx(
                          "rounded-full bg-[#1E1E1E] border border-[#292929] self-end",
                          choice.title === "Personal Projects"
                            ? "w-5 h-[22px]"
                            : "w-5 h-6"
                        )}></span>
                    )}
                    <Image
                      src={choice.image}
                      alt={`${choice.title}Image`}
                      fill
                      className="!relative object-cover"
                    />
                  </figure>

                  <article className="flex flex-col gap-[6px] items-center">
                    <h3 className="font-grotesk text-2xl text-base-900-dark">
                      {choice.title}
                    </h3>

                    <p className="text-base-800-dark text-center font-grotesk text-base max-w-[210px]">
                      {choice.description}
                    </p>
                  </article>
                </section>
              ))}
            </div>
            <button className="action-button" onClick={nextStep}>
              Next
            </button>
            d
            <footer className="pt-[62px] pb-[47px]">
              <ul className="flex gap-5 font-grotesk text-base text-base-700-dark-tertiary">
                <li>Privacy Policy</li>
                <li>Terms</li>
              </ul>
            </footer>
          </div>
        ) : (
          <div className="pt-10 flex flex-col justify-center items-center gap-10">
            <article className="flex flex-col gap-14 items-center">
              <h2 className="text-4xl/144 font-bold text-base-900-dark font-grotesk">
                Payment Plan
              </h2>

              <p className="text-base-800-dark font-grotesk text-base font-medium">
                We will customize your experience based on your option.
              </p>
            </article>

            <section className="flex rounded-lg border border-[#888888] p-[2px]">
              <span
                className={clsx(
                  "rounded-[5px] py-2 px-12 text-base-900-dark font-grotesk text-center flex justify-center items-center cursor-pointer",
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
                <span className="px-[6px] py-1 text-xs font-bold rounded-[33px] bg-[#445742] text-[#76F368]">
                  20% Off
                </span>
              </article>
            </section>

            <div className="flex gap-7">
              {paymentPlansData.map((plan, index) => (
                <div
                  key={plan.type}
                  className={clsx(
                    "p-5 rounded-[20px] flex flex-col gap-5 setUp cursor-pointer",
                    plan.type === activePlan ? "active-plan" : ""
                  )}
                  onClick={() => setActivePlan(plan.type)}>
                  <section className="flex flex-col gap-14">
                    <span
                      className={clsx(
                        "py-[3px] px-5 text-center w-fit",
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
                          <TickCircle
                            size="24"
                            color="#76F368"
                            variant="Bold"
                          />
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
            </div>

            <footer className="pt-5 pb-[90px]">
              <ul className="flex gap-5 font-grotesk text-base text-base-700-dark-tertiary">
                <li>Privacy Policy</li>
                <li>Terms</li>
              </ul>
            </footer>

            <Modal.Root
              opened={opened}
              onClose={close}
              centered
              size={580}
              transitionProps={{ duration: 600, transition: "slide-left" }}
              radius={20}>
              <Modal.Overlay classNames={{ root: "backdrop-blur-[16px]" }}>
                <div className="bg-inherit flex gap-1 absolute bottom-0 right-[50%] self-center cursor-pointer items-center">
                  <Stripe />
                  <span className="w-[6px] h-[6px] bg-[#414141]" />

                  <p className="text-base-800-dark font-grotesk text-base font-medium">
                    Powered by Stripe.com
                  </p>
                </div>
              </Modal.Overlay>
              <Modal.Content className="!relative no-scrollbar">
                <Modal.Body className="p-0">
                  <div className="p-5 pt-0 flex flex-col setUp gap-7">
                    <article className="flex justify-between items-center sticky top-0 bg-inherit pt-5">
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
                              ) : UserDetailsForm.values.first_name.length >=
                                  1 &&
                                UserDetailsForm.values.first_name.length <=
                                  4 ? (
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
                              ) : UserDetailsForm.values.first_name.length >=
                                  1 &&
                                UserDetailsForm.values.first_name.length <=
                                  4 ? (
                                <InfoCircle size="24" color="#F26663" />
                              ) : null
                            }
                            {...UserDetailsForm.getInputProps("first_name")}
                          />
                        </article>

                        <TextInput
                          placeholder="Country"
                          styles={inputStyles}
                          rightSection={
                            <ArrowDown2 size="20" color="#FEFEFE" />
                          }
                          {...UserDetailsForm.getInputProps("first_name")}
                        />

                        <article className="font-grotesk text-base font-bold text-[#CFCFCF] pt-2">
                          By clicking below, you agree to our{" "}
                          <span className="text-[#FDD649]">
                            Terms, Privacy Policy
                          </span>
                          and{" "}
                          <span className="text-[#91C3FD]">
                            Automatic Renewal
                          </span>
                          . Tublian will charge you $49.99 (plus Tax) each month
                          until you cancel you subscription in account settings.
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

            <Modal
              opened={openedModal}
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
                  className="action-button mx-5 mb-5 !max-w-[540px]"
                  type="submit"
                  onClick={() => {
                    closeSuccessModal();
                    setActive(1);
                  }}>
                  Proceed
                </button>
              </div>
            </Modal>

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

      {/* <section className="w-1/2 pl-10 pt-68">
        <Demo />
      </section> */}
    </div>
  );
}

import { useContext, useState } from "react";
import {
  Stepper,
  Button,
  Group,
  Flex,
  clsx,
  Divider,
  TextInput,
  Modal,
  Overlay,
} from "@mantine/core";
import {
  ArrowDown2,
  ArrowRight2,
  Card,
  InfoCircle,
  Lock1,
  TickCircle,
} from "iconsax-react";
import { inputStyles } from "./input-styles";
import { useForm } from "@mantine/form";
import { checkoutPageData, paymentPlansData } from "@/data";
import { useDisclosure } from "@mantine/hooks";
import { GetStartedPage } from "./get-started";

function Demo() {
  const [active, setActive] = useState(1);
  const [step, setStep] = useState(1);
  const nextStep = () => {
    setActive((current) => (current < 4 ? current + 1 : current));
    setStep((current) => (current < 4 ? current + 1 : current));
  };
  const prevStep = () =>
    setActive((current) => (current > 1 ? current - 1 : current));

  return (
    <>
      <Stepper
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
        classNames={{
          stepWrapper: "hidden",
          separator: "hidden",
          steps: "flex gap-3",
          root: "leading-0 h-full flex flex-col",
          stepLabel: "hidden",
          stepBody: "ml-0",
          content: "flex-1 flex flex-col",
          stepDescription: active ? "header-gradient" : "",
        }}>
        <Image
          src="Tublian-logo.svg"
          alt="Tublian Logo"
          width={111}
          height={25}
        />
        <Stepper.Step
          label="First step"
          description="Get Started"
          id="1"
          classNames={{
            stepDescription: active <= 1 ? "header-gradient" : "",
          }}>
          <div className="flex flex-col flex-1 pb-12">
            <section className="pt-11 font-grotesk flex flex-col gap-7 flex-1">
              <article className="flex flex-col gap-14">
                <h2 className="text-4xl/144 font-bold text-base-900-dark font-grotesk">
                  Get Started
                </h2>

                <h3 className="text-base-800-dark text-base font-normal">
                  Start recruiting streetcred developers, Today!!
                </h3>
              </article>

              <form className="max-w-[405px] flex flex-col gap-7">
                <article className="flex flex-col gap-14">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="pt-2 pb-4 pl-0 w-full placeholder:text-base-500-dark bg-inherit border-b border-b-base-500-dark focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="pt-2 pb-4 pl-0 w-full placeholder:text-base-500-dark bg-inherit border-b border-b-base-500-dark focus:outline-none"
                  />
                </article>

                <button className="action-button" onClick={nextStep}>
                  Proceed
                </button>
              </form>

              <h3 className="text-base-700-dark-tertiary text-base">
                Already have an account?{" "}
                <span className="text-base-900-dark">Log in</span>
              </h3>
            </section>
            <footer>
              <ul className="flex gap-5 font-grotesk text-base text-base-700-dark-tertiary">
                <li>Privacy Policy</li>
                <li>Terms</li>
              </ul>
            </footer>
          </div>
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Create Account" step={2}>
          <h2 className="text-4xl/144 font-bold text-base-900-dark font-grotesk">
            Get Started
          </h2>
        </Stepper.Step>
        <Stepper.Step label="Third step" description="Account Setup" step={3}>
          3: Account Setup
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Payment" step={4}>
          4: Payment
        </Stepper.Step>

        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>
    </>
  );
}
