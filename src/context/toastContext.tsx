import { createContext, useContext, useState, ReactNode } from 'react';
import Alert from '@components/common/Alert';

type ToastContextType = {
    showSuccessToast: (header: string, text: string) => void;
    showErrorToast: (header: string, text: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

type ToastProviderProps = {
    children: ReactNode;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toast, setToast] = useState({ show: false, variant: '', header: '', text: '' });

    const showSuccessToast = (header: string, text: string) => {
        setToast({ show: true, variant: 'success', header, text });
    };

    const showErrorToast = (header: string, text: string) => {
        setToast({ show: true, variant: 'danger', header, text });
    };

    const Toast = () => (
        <Alert
            show={toast.show}
            variant={
                toast.variant as
                    | 'primary'
                    | 'secondary'
                    | 'success'
                    | 'danger'
                    | 'warning'
                    | 'info'
                    | 'light'
                    | 'dark'
                    | undefined
            }
            header={toast.header}
            text={toast.text}
            setShow={() => setToast(prev => ({ ...prev, show: false }))}
        />
    );

    return (
        <ToastContext.Provider value={{ showSuccessToast, showErrorToast }}>
            {children}
            <Toast />
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
