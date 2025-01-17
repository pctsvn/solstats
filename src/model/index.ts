// meta token
export interface MetaToken {
    address: string;
    name: string;
    symbol: string;
    icon: string;
    decimals: number;
    holder: number;
    creator: string;
    create_tx: string;
    created_time: number;
    first_mint_tx: string;
    first_mint_time: number;
    mint_authority: string | null;
    freeze_authority: string | null;
    supply: string;
    price: number;
    market_cap: number;
    tokenName?: string;
}


export interface Router {
    token1: string; // Địa chỉ token đầu tiên
    token1_decimals: number; // Số chữ số thập phân của token đầu tiên
    amount1: number; // Số lượng token đầu tiên
    token2: string; // Địa chỉ token thứ hai
    token2_decimals: number; // Số chữ số thập phân của token thứ hai
    amount2: number; // Số lượng token thứ hai
    child_routers: Router[]; // Danh sách các child routers
}

export interface TokenDefiActivity {
    block_id: number; // ID của block
    trans_id: string; // ID giao dịch
    block_time: number; // Thời gian của block (UNIX timestamp)
    activity_type: string; // Loại hoạt động DeFi (ví dụ: "ACTIVITY_TOKEN_SWAP")
    from_address: string; // Địa chỉ ví nguồn
    sources: string[]; // Danh sách nguồn giao dịch
    platform: string[]; // Nền tảng thực hiện giao dịch
    value: number; // Giá trị giao dịch (USD)
    routers: Router; // Thông tin router
    time: string; // Thời gian giao dịch (ISO 8601 format)
    solPrice?: number;
}

export interface PriceToken {
    date: string;
    price: number;
}
