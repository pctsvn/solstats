import { Transaction, Transfer } from "../model";
import { axiosService } from "../service/axios";

interface TransactionParams {
    address?: string;
    before?: number;
}

export const getAccountTransfer = async ({
    address = "",
    before,
}: TransactionParams): Promise<{ data: Transfer[] }> => {
    const params: TransactionParams = {
        address,
    };

    if (before) {
        params.before = before;
    }

    const response = await axiosService.get<{ data: Transfer[] }>(
        "/account/transfer",
        {
            params,
        }
    );

    return response.data;
};

export const getAccountTransactions = async ({
    address = "",
}: TransactionParams): Promise<{ data: Transaction[] }> => {
    const response = await axiosService.get<{ data: Transaction[] }>(
        "account/transactions",
        {
            params: { address },
        }
    );
    return response.data;
};