// components/AuthSuccessHandler.js or wherever you prefer to place your components
import { useEffect } from 'react';
import { useToast } from '@context/toastContext';
import { useSystemInfoContext } from '@context/SystemInfoContext';
import { clientApi } from '@utils/api';
import { log } from '@utils/console';
import { User } from '@privy-io/react-auth';
import getSession from '@utils/getSession';
import cookie from "cookie";
import { time } from 'console';
import { useSessionContext } from '@context/SessionContext';
import { Session, UserSession } from 'src/types/session';
import { AxiosError } from 'axios';

const AuthSuccessHandler = ({ privyUser }: { privyUser: User | null }) => {
    const { setSession } = useSessionContext();
    const { info } = useSystemInfoContext();
    const { showErrorToast, showSuccessToast } = useToast();

    const sessionInfo = async () => {
        const privyToken = cookie.parse(document.cookie)["privy-token"];
        const res = await clientApi.post('api/verify-session' , { privyToken })
        const isValid = res?.data?.sessionValid
        const expiresAt = res?.data?.expiresAt
        return { isValid, expiresAt }
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const handleAuthSuccess = async () => {
            if (!info.sign_up_enabled) {
                showErrorToast(
                    "Sign up disabled",
                    "Sign in is currently disabled for new users. Your account was not created at this time. Please try again later."
                );
                return;
            }
            try {
                const userReq = {
                    uid: privyUser?.id,
                    name: "Anon",
                };
                try {
                    const res = await clientApi.post("api/users", userReq);
                    const { isValid, expiresAt } = await sessionInfo()
                    if (isValid) {
                        const userSession: UserSession = res?.data?.userSession as UserSession
                        const session: Session = {
                            user: userSession,
                            expiresAt
                        }
                        setSession(session)
                        showSuccessToast("Success!", "Your account was successfully created");
                    } else {
                        setSession(undefined)
                    }
                } catch (e: AxiosError | any) {
                        if (e?.response?.status === 409) {
                        const { isValid, expiresAt } = await sessionInfo()
                        if (isValid) {
                        const userSession: UserSession = e?.response?.data?.body as UserSession
                        const session: Session = {
                            user: userSession,
                            expiresAt
                        }
                        setSession(session)
                        showSuccessToast("Success!", "You have been successfully logged in");
                    } else {
                        setSession(undefined)
                    }
                    }
                }
            } catch (e) {
                log(e);
            }
        };

        if (privyUser) {
            handleAuthSuccess();
        }
    }, [privyUser, info]);

    return null; // This component doesn't render anything
};

export default AuthSuccessHandler;