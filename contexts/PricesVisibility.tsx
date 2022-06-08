import { createContext, FC, ReactNode, useEffect, useState } from "react";

interface PricesVisibilityObject {
  showPrices: boolean;
  toggleShowPrices: () => void;
}

interface Props {
  children: ReactNode;
}

export const PricesVisibility = createContext({} as PricesVisibilityObject);

const PricesVisibilityProvider: FC<Props> = ({ children }) => {
  const [showPrices, setShowPrices] = useState(true);

  useEffect(() => {
    const showPrices = window.localStorage.getItem("showPrices");

    if (showPrices) {
      setShowPrices(JSON.parse(showPrices));
    }
  }, []);

  const toggleShowPrices = () => {
    setShowPrices((state) => {
      window.localStorage.setItem("showPrices", JSON.stringify(!state));
      return !state;
    });
  };

  return (
    <PricesVisibility.Provider value={{ showPrices, toggleShowPrices }}>
      {children}
    </PricesVisibility.Provider>
  );
};

export default PricesVisibilityProvider;
