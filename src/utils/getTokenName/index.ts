import { JUPITER_TOKEN, PUMP_TOKEN, RAYDIUM_TOKEN, SOL } from "../../constant";

export const getTokenName = (tokenAddress: string) => {

    switch (tokenAddress) {
        case PUMP_TOKEN.address:
            return PUMP_TOKEN.name;
        case JUPITER_TOKEN.address:
            return JUPITER_TOKEN.name;
        case RAYDIUM_TOKEN.address:
            return RAYDIUM_TOKEN.name;
        case SOL:
            return "SOL";
    }
    return tokenAddress;
}
