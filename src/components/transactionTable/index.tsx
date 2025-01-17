import React from "react";
import { Transfer } from "../../model";
import clsx from "clsx";
import styles from "./transactionTable.module.scss";

interface TransactionTableProps {
    transactions: Transfer[];
}

interface TransactionRowProps {
    transaction: Transfer;
}

const TransactionRow: React.FC<TransactionRowProps> = React.memo(({ transaction }) => (
    <tr className={clsx(styles.row, {
        [styles.in]: transaction.flow === "in",
        [styles.out]: transaction.flow === "out"
    })}>
        <td>
            <span className={styles.hash}>
                {transaction.trans_id.slice(0, 20)}...
            </span>
        </td>
        <td>{new Date(transaction.time).toLocaleString()}</td>
        <td>
            <span className={styles.type}>
                {transaction.flow === "in" ? "Buy" : "Sell"}
            </span>
        </td>
        <td>
            <span className={styles.hash}>
                {transaction.from_address.slice(0, 20)}...
            </span>
        </td>
        <td>
            <span className={styles.hash}>
                {transaction.to_address.slice(0, 20)}...
            </span>
        </td>
        <td>
            {transaction.amount} {transaction.token_decimals > 0 ? '(SPL)' : '(SOL)'}
        </td>
        <td>${transaction.value.toFixed(2)}</td>
    </tr>
));

TransactionRow.displayName = 'TransactionRow';

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
    if (!transactions || transactions.length === 0) {
        return null;
    }

    return (
        <div className={styles.transactions}>
            <h2 className={styles.title}>Recent Transactions</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Time</th>
                        <th>Type</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Amount</th>
                        <th>Value (USD)</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((tx) => (
                        <TransactionRow
                            key={tx.trans_id}
                            transaction={tx}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

TransactionTable.displayName = 'TransactionTable';

export default React.memo(TransactionTable); 