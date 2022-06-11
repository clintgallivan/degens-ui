import { createContext, useContext, useState, useEffect } from 'react';

type LayoutContextProviderProps = {
  children: React.ReactNode;
};

const LayoutContext = createContext({});

export const LayoutProvider = ({ children }: LayoutContextProviderProps) => {
  const [navIsExpanded, setNavIsExpanded] = useState(false);

  return (
    <LayoutContext.Provider value={{ navIsExpanded, setNavIsExpanded }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = (): any => {
  return useContext(LayoutContext);
};
// export { LayoutContext, LayoutProvider };
