import { useQuery } from "@tanstack/react-query";
import { getDefiToken } from "../apis/token";
import { notify } from "../utils/notification";
import { JUPITER_TOKEN, PUMP_TOKEN, RAYDIUM_TOKEN, SOL } from "../constant";

export const useDataToken = (address: string) => {
    const { data: defiToken, isLoading } = useQuery({
        queryKey: ['defi-token', address],
        queryFn: async () => {
            try {
                const response = await getDefiToken(address);
                if (response.data) {
                    // Lọc các giao dịch có token1 hoặc token2 là SOL
                    return response.data.filter(item => {
                        const { token1, token2 } = item.routers;
                        if (token1 === SOL) {
                            // token2 (nơi đến) phải thuộc một trong các địa chỉ
                            return item.routers.token2 === JUPITER_TOKEN.address ||
                                item.routers.token2 === RAYDIUM_TOKEN.address ||
                                item.routers.token2 === PUMP_TOKEN.address;
                        } else if (token2 === SOL) {
                            // token1 (nguồn đi) phải thuộc một trong các địa chỉ
                            return item.routers.token1 === JUPITER_TOKEN.address ||
                                item.routers.token1 === RAYDIUM_TOKEN.address ||
                                item.routers.token1 === PUMP_TOKEN.address;
                        }
                        return false
                    });
                }
                return [];
            } catch (error) {
                notify.error("Failed to fetch token data");
                return [];
            }
        },
        enabled: !!address
    });

    return {
        defiToken: defiToken || [],
        isLoading
    };
};