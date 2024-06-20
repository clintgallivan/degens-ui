
import { nodeCoreApi } from '@utils/api';
import { saveTokenInStorage } from '@utils/token';
import { AxiosResponse } from 'axios';
import { LocalStorageKey } from 'src/types/localStorage';

export interface LoginResponse {
  accessToken: string;
}

export type LoginParams = {
  username: string;
  password: string;
};



export const loginNodeCoreApi = async (params: LoginParams): Promise<AxiosResponse<LoginResponse>> => {
  try {
    const response = await nodeCoreApi.post<LoginResponse>('/login', params);
    return response;
  } catch (error) {
    throw new Error('Authentication failed');
  }
};

