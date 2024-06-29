import React, { createContext, useState, useContext } from "react";

const DimmingContext = createContext();

export const DimmingProvider = ({ children }) => {
  const [isDimmed, setIsDimmed] = useState(false);

  const enableDimming = () => setIsDimmed(true);
  const disableDimming = () => setIsDimmed(false);

  return (
    <DimmingContext.Provider value={{ isDimmed, enableDimming, disableDimming }}>
      {children}
    </DimmingContext.Provider>
  );
};

export const useDimmingContext = () => useContext(DimmingContext);
