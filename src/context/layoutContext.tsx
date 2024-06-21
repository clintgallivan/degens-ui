import { createContext, useContext, useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";

type LayoutContextProviderProps = {
    children: React.ReactNode;
};

const LayoutContext = createContext({});

export const LayoutProvider = ({ children }: LayoutContextProviderProps) => {
    const [navIsExpanded, setNavIsExpanded] = useState(false);
    const [headerSearchIsExpanded, setHeaderSearchIsExpanded] = useState(false);
    const [appIsLoading, setAppIsLoading] = useState(false);

    const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
        const className = appIsLoading ? "blur-sm" : "";
        return (
            <>
                {appIsLoading && (
                    <div className="fixed inset-0 z-50 flex justify-center items-center">
                        <Spinner animation="border" variant="light" />
                    </div>
                )}
                <div className={`${className}`}>{children}</div>
            </>
        );
    };

    return (
        <LayoutContext.Provider
            value={{
                navIsExpanded,
                setNavIsExpanded,
                headerSearchIsExpanded,
                setHeaderSearchIsExpanded,
                appIsLoading,
                setAppIsLoading,
            }}
        >
            <LoadingProvider>{children}</LoadingProvider>
        </LayoutContext.Provider>
    );
};

export const useLayoutContext = (): any => {
    return useContext(LayoutContext);
};
// export { LayoutContext, LayoutProvider };
