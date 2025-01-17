export interface Transaction {
    slot: number;
    fee: number;
    status: string;
    signer: string[];
    block_time: number;
    tx_hash: string;
    parsed_instructions: ParsedInstruction[];
    program_ids: string[];
    time: string;
}

interface ParsedInstruction {
    type: string;
    program: string;
    program_id: string;
}

export interface Transfer {
    id?: string;
    block_id: number;
    block_timestamp: number;
    from_address: string;
    to_address: string;
    amount: number;
    token_decimals: number;
    value: number;
    flow: "in" | "out";
    trans_id: string;
    time: string;
    token_address: string;
}

export interface CombinedTransactionData extends Transfer {
    fee?: number;
    status?: string;
    signer?: string[];
    parsed_instructions?: ParsedInstruction[];
    program_ids?: string[];
}
