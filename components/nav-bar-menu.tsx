import { useContext } from "react";
import { ActiveContext } from ".";
import Image from "next/image";

export function NavBarMenu() {
  const { active, setActive } = useContext(ActiveContext);
  return (
    <nav className="flex gap-5 items-center justify-between sticky top-0 bg-[#121212] pt-68 lg:pt-10 lg:gap-3 lg:items-start mobile:pt-5 flex-wrap backdrop-opacity-90 z-50">
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
  );
}
