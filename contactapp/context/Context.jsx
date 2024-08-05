"use client";

import React, { createContext, useContext, useState } from "react";

const ContactContext = createContext();

const Context = ({ children }) => {
  const [update, setUpdate] = useState("");
  return (
    <ContactContext.Provider value={{ update, setUpdate }}>
      {children}
    </ContactContext.Provider>
  );
};

export default Context;

export const ContextValue = () => useContext(ContactContext);
