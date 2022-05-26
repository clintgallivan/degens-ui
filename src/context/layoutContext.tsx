import { createContext, useContext, useState, useEffect } from 'react';

const LayoutContext = createContext({});

export const LayoutProvider = ({ children }) => {
  const [navIsExpanded, setNavIsExpanded] = useState(false);

  return (
    <LayoutContext.Provider value={{ navIsExpanded, setNavIsExpanded }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => {
  return useContext(LayoutContext);
};
// export { LayoutContext, LayoutProvider };
