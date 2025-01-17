import { MetaToken, PriceToken, TokenDefiActivity } from "../model";
import { axiosService } from "../service/axios";

export const getMetaToken = async (tokenAddress: string): Promise<{ data: MetaToken }> => {
    const response = await axiosService.get<{ data: MetaToken }>(`/token/meta?address=${tokenAddress}`);

    return response.data;
};

export const getPriceToken = async (tokenAddress: string, timeStart: string, timeEnd: string): Promise<{ data: PriceToken[] }> => {
    const response = await axiosService.get<{ data: PriceToken[] }>(
        `/token/price?address=${tokenAddress}&time[]=${timeStart}&time[]=${timeEnd}`
    );
    return response.data;
};

export const getDefiToken = async (address: string): Promise<{ data: TokenDefiActivity[] }> => {
    const response = await axiosService.get<{ data: TokenDefiActivity[] }>(`/token/defi/activities?address=${address}&activity_type[]=ACTIVITY_TOKEN_SWAP&activity_type[]=ACTIVITY_AGG_TOKEN_SWAP&page=1&page_size=100&sort_by=block_time&sort_order=desc`);

    return response.data;
};