import { axiosService } from "../service/axios.service";

interface TransactionParams {
    address?: string;
    before?: number;
}

export const getAccountTransactions = async ({
    address = "",
    before,
}: TransactionParams) => {
    const params: TransactionParams = {
        address,
    };

    if (before) {
        params.before = before;
    }

    const response = await axiosService.get<any>(
        "/account/transfer",
        {
            params,
        }
    );

    return response.data;
};
