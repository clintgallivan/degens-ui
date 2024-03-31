import { clientApi } from "@utils/api";
import { ObjectId } from "mongodb";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SystemInfo } from "src/types/app";

type SystemInfoContextType = {
    info: SystemInfo;
};

const SystemInfoContext = createContext<SystemInfoContextType | undefined>(undefined);

type SystemInfoProviderProps = {
    children: ReactNode;
};

const initialState: SystemInfo = {
    _id: {} as ObjectId,
    maintenance_mode_enabled: false,
    sign_up_enabled: false,
    login_enabled: false,
};

export const SystemInfoProvider: React.FC<SystemInfoProviderProps> = ({ children }) => {
    // Assuming the default state for SystemInfo is an empty object
    // You might want to adjust this default state to match the expected structure of SystemInfo
    const [info, setInfo] = useState<SystemInfo>(initialState);

    useEffect(() => {
        // Fetch system info from your API route
        const getSystemInfo = async () => {
            try {
                const response = await clientApi.get<SystemInfo>("/api/system-info");
                setInfo(response.data);
            } catch (error) {
                console.error("Failed to fetch system info:", error);
            }
        };
        getSystemInfo();
    }, []);

    return <SystemInfoContext.Provider value={{ info }}>{children}</SystemInfoContext.Provider>;
};

export const useSystemInfoContext = (): SystemInfoContextType => {
    const context = useContext(SystemInfoContext);
    if (!context) {
        throw new Error("useSystemInfo must be used within a SystemInfoProvider");
    }
    return context;
};
