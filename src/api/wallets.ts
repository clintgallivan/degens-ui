import { nodeCoreApi } from "@utils/api"
import { AxiosResponse } from "axios"

export type AddWalletParams = {
    userId: string
    walletAddress?: string
}
export const addWalletRequest = async (addWalletParams: AddWalletParams): Promise<AxiosResponse> => {
    const response = await nodeCoreApi.post('/tasks/add-wallet', {}, {
      params: addWalletParams
    });
    return response;
}

export const deleteWalletRequest = async (deleteWalletParams: AddWalletParams): Promise<AxiosResponse> => {
    const response = await nodeCoreApi.delete('/tasks/delete-wallet', {
      params: deleteWalletParams
    });
    return response;
}