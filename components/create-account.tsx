import { TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React from "react";
import { inputStyles } from "./input-styles";
import { InfoCircle, TickCircle } from "iconsax-react";
import Image from "next/image";

export function CreateAccountPage({
  UserDetailsForm,
  nextStep,
}: {
  UserDetailsForm: UseFormReturnType<{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }>;

  nextStep: () => void;
}) {
  return (
    <div className="flex flex-col flex-1 pb-12 lg:pb-4 md:pb-10">
      <div className="pt-11 lg:pt-10 font-grotesk flex md:pt-5 flex-col gap-7 flex-1 mobile:pr-7 sm:pt-5">
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
          <form className="max-w-[clamp(300px,25vw,405px)] flex flex-col gap-7 sm:max-w-full">
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
      <footer className="sm:hidden">
        <ul className="flex gap-5 font-grotesk text-base text-base-700-dark-tertiary mobile:justify-center pt-7">
          <li>Privacy Policy</li>
          <li>Terms</li>
        </ul>
      </footer>
    </div>
  );
}
