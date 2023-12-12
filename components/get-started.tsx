import { TextInput } from "@mantine/core";
import React from "react";
import { inputStyles } from "./input-styles";
import { UseFormReturnType } from "@mantine/form";
import { InfoCircle, TickCircle } from "iconsax-react";

export function GetStartedPage({
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
      <section className="pt-11 lg:pt-10 font-grotesk flex md:pt-5 flex-col gap-7 flex-1 mobile:pr-7 sm:pt-5">
        <article className="flex flex-col gap-14 lg:gap-2">
          <h2 className="text-4xl/144 font-bold text-base-900-dark font-grotesk">
            Get Started
          </h2>

          <h3 className="text-base-800-dark text-base font-normal">
            Start recruiting streetcred developers, Today!!
          </h3>
        </article>

        <form className="max-w-[clamp(300px,25vw,405px)] flex flex-col gap-7 sm:max-w-full">
          <article className="flex flex-col gap-14">
            <TextInput
              placeholder="First Name"
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
              placeholder="Last Name"
              styles={inputStyles}
              rightSection={
                UserDetailsForm.values.last_name.length > 4 ? (
                  <TickCircle size="24" color="#76F368" />
                ) : UserDetailsForm.values.last_name.length >= 1 &&
                  UserDetailsForm.values.last_name.length <= 4 ? (
                  <InfoCircle size="24" color="#F26663" />
                ) : null
              }
              {...UserDetailsForm.getInputProps("last_name")}
            />
          </article>

          <button className="action-button" onClick={nextStep}>
            Proceed
          </button>
        </form>

        <h3 className="text-base-700-dark-tertiary text-base flex flex-wrap">
          <span>Already have an account? &nbsp;</span>
          <span className="text-base-900-dark">Log in</span>
        </h3>
      </section>
      <footer className="sm:hidden">
        <ul className="flex gap-5 font-grotesk text-base text-base-700-dark-tertiary mobile:justify-center">
          <li>Privacy Policy</li>
          <li>Terms</li>
        </ul>
      </footer>
    </div>
  );
}
