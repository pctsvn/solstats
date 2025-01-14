import React, { useEffect, useState, useCallback } from "react";
import styles from "./transaction.module.scss";
import { Transaction } from "../../model/transaction";
import { getAccountTransactions } from "../../apis/account";
import { useLocation } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import NoDataIcon from '@mui/icons-material/InboxOutlined';
import clsx from "clsx";
import { notify } from "../../utils/notification";
// import { analyzeTradingData } from "../../service/openai";

const RenderTransactions: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const path = useLocation();

    const handleGetTransactions = useCallback(async () => {
        const address = path.pathname.split("/")[2];
        if (!address) return;

        try {
            setIsLoading(true);
            const response = await getAccountTransactions({ address });
            console.log('Response:', response);

            if (response) {
                setTransactions(response.data);
                notify.success("Get transactions successfully");
            } else {
                setTransactions([]);
                notify.warning("No transactions found");
            }
        } catch (error) {
            console.error('Error:', error);
            setTransactions([]);
            notify.error("Get transactions failed");
        } finally {
            setIsLoading(false);
        }
    }, [path.pathname]);

    useEffect(() => {
        handleGetTransactions();
    }, [handleGetTransactions]);

    // useEffect(() => {
    //     if (!!transactions.length) {
    //         analyzeTradingData(transactions);
    //     }
    // }, [transactions]);

    const TransactionRow = React.memo(({ transaction }: { transaction: Transaction }) => (
        <tr key={transaction.trans_id} className={clsx(styles.row, {
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

    const TransactionTable = React.memo(() => (
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
                    <TransactionRow key={tx.trans_id} transaction={tx} />
                ))}
            </tbody>
        </table>
    ));

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <CircularProgress />
                <p>Loading transactions...</p>
            </div>
        );
    }

    if (!Array.isArray(transactions) || !transactions.length) {
        return (
            <div className={styles.noDataContainer}>
                <NoDataIcon className={styles.noDataIcon} />
                <p>No transactions found</p>
            </div>
        );
    }

    return (
        <div className={styles.transactions}>
            <h2 className={styles.title}>Recent Transactions</h2>
            <TransactionTable />
        </div>
    );
};

export default React.memo(RenderTransactions);