import { createContext, FC, ReactNode, useEffect, useState } from "react";

interface TogglePricesObject {
  showPrices: boolean;
  toggleShowPrices: () => void;
}

interface Props {
  children: ReactNode;
}

export const TogglePrices = createContext({} as TogglePricesObject);

const TogglePricesProvider: FC<Props> = ({ children }) => {
  const [showPrices, setShowPrices] = useState(true);

  useEffect(() => {
    const hidePrices = window.localStorage.getItem("hidePrices");

    if (hidePrices) {
      setShowPrices(JSON.parse(hidePrices));
    }
  }, []);

  const toggleShowPrices = () => {
    setShowPrices((state) => {
      window.localStorage.setItem("hidePrices", JSON.stringify(!state));
      return !state;
    });
  };

  return (
    <TogglePrices.Provider value={{ showPrices, toggleShowPrices }}>
      {children}
    </TogglePrices.Provider>
  );
};

export default TogglePricesProvider;
