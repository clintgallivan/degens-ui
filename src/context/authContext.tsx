// ! this file is not used in the project yet and may never be used
import React, { createContext, useContext, useState, ReactNode } from "react";
import User from "src/pages/users/[user]";
import { UserSession } from "src/types/user";

type AuthContextProviderProps = {
    children: React.ReactNode;
};

type AuthContextType = {
    userSession: UserSession;
    setUserSession: (userSession: UserSession) => void;
};

type AuthState = {
    userSession: UserSession;
};

const initialState: AuthState = {
    userSession: {} as UserSession,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
    const [userSession, setUserSession] = useState<UserSession>(initialState.userSession);

    return (
        <AuthContext.Provider value={{ userSession, setUserSession }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within a AuthProvider");
    }
    return context;
};
