// import { AuthenticateParams, authenticate } from './authenticate'; // Adjust the import path as necessary
// import { getToken, isTokenExpired, saveToken } from './tokenUtils';
// import { LocalStorageKey } from './localStorageKeys';

import { clientApi } from "@utils/api";
import { log, error } from "@utils/console";
import { getTokenFromStorage, isTokenExpired, saveTokenInStorage } from "@utils/token";
import { AxiosResponse } from "axios";
import { loginNodeCoreApi, LoginResponse, LoginParams } from "src/api/auth";
import { LocalStorageKey } from "src/types/localStorage";

export const authWithDegensCoreApiNode = async (): Promise<void> => {

  let token = getTokenFromStorage(LocalStorageKey.DEGENS_CORE_API_NODE_TOKEN);

  if (!token || isTokenExpired(token)) {
    try {
        const loginRes = await clientApi.post('/api/auth-with-degens-core-api-node');
        const accessToken = loginRes?.data?.body?.accessToken 

        if (accessToken) {
              saveTokenInStorage(accessToken, LocalStorageKey.DEGENS_CORE_API_NODE_TOKEN);
        }
        log('[authenticateClient] - Authentication successfull with Degens Core API Node')
    } catch (e) {
      error('[authenticateClient] - Authentication failed with Degens Core API Node');
    }
  } else {
    log('[authenticateClient] - Already authenticated with Degens Core API Node')
  }
};
