import { usePrivy } from "@privy-io/react-auth";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Session } from "src/types/session";

type SessionContextProviderProps = {
    children: ReactNode;
};

type SessionContextType = {
    session?: Session | undefined;
    setSession: (session: Session | undefined) => void;
    isLoading: boolean; // Add isLoading to the context type
    logout: () => void;
    login: () => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<SessionContextProviderProps> = ({ children }) => {
    const { logout, login } = usePrivy();
    const [isLoading, setIsLoading] = useState(true); // Initialize isLoading to true
    const [session, setSession] = useState<Session | undefined>(() => {
        // Initially, don't try to load the session here; do it in an effect to ensure it runs client-side
        return undefined;
    });

    const clearSession = () => {
        logout();
        setSession(undefined);
    };

    const beginSession = () => {
        login();
    };

    useEffect(() => {
        // This effect runs once on mount and attempts to load the session from localStorage
        if (typeof window !== "undefined") {
            const storedSession = localStorage.getItem("session");
            setSession(storedSession ? JSON.parse(storedSession) : undefined);
            setIsLoading(false); // Once the attempt is made, set isLoading to false
        }
    }, []);

    useEffect(() => {
        // This effect saves or removes the session from localStorage whenever it changes
        if (typeof window !== "undefined") {
            if (session) {
                localStorage.setItem("session", JSON.stringify(session));
            } else {
                localStorage.removeItem("session");
            }
        }
    }, [session]);

    //* Optionally handle session expiry, if applicable. As of right now, were not really sure how long the privy session lasts so we will leave this out for now

    // useEffect(() => {
    //     let timer: NodeJS.Timeout | undefined = undefined;
    //     if (session && session.expiresAt) {
    //         const now = new Date();
    //         const expiresAt = new Date(session.expiresAt);
    //         if (expiresAt <= now) {
    //             setSession(undefined); // Session has expired, clear it
    //         } else {
    // const timeout = expiresAt.getTime() - now.getTime();
    //             timer = setTimeout(() => setSession(undefined), timeout); // Set a timeout to clear the session after it expires
    //         }
    //     }
    //     return () => {
    //         if (timer) clearTimeout(timer); // Clean up the timer
    //     };
    // }, [session]);

    return (
        <SessionContext.Provider
            value={{ session, setSession, isLoading, logout: clearSession, login: beginSession }}
        >
            {children}
        </SessionContext.Provider>
    );
};

export const useSessionContext = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error("useSessionContext must be used within a SessionProvider");
    }
    return context;
};
