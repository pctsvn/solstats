export interface Transaction {
    block_id: number; // ID của block
    trans_id: string; // Mã giao dịch
    block_time: number; // Thời gian block
    activity_type: string; // Loại hoạt động (ví dụ: chuyển token SPL)
    from_address: string; // Địa chỉ người gửi
    to_address: string; // Địa chỉ người nhận
    token_address: string; // Địa chỉ token
    token_decimals: number; // Số thập phân của token
    amount: number; // Số lượng token
    flow: string; // Dòng tiền (in hoặc out)
    value: number; // Giá trị giao dịch (đã quy đổi sang USD)
    time: string; // Thời gian giao dịch (ISO format)
}

export interface TokenMetadata {
    token_address: string; // Địa chỉ token
    token_name: string; // Tên token
    token_symbol: string; // Ký hiệu token
    token_icon: string; // URL biểu tượng token
}

export interface Metadata {
    tokens: {
        [key: string]: TokenMetadata; // Từ điển chứa thông tin các token, key là token_address
    };
}
export interface TransactionResponse {
    success: boolean; // Trạng thái thành công của API
    data: Transaction[]; // Danh sách giao dịch
    metadata: Metadata; // Thông tin metadata
}
