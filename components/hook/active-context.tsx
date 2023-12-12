import { ReactNode, createContext, useContext, useState } from "react";

interface ActiveContextProps {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}
export const ActiveContext = createContext<ActiveContextProps>({
  active: 1,
  setActive: () => 1,
});

export const ActiveProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState<number>(1);

  return (
    <ActiveContext.Provider value={{ active, setActive }}>
      {children}
    </ActiveContext.Provider>
  );
};
