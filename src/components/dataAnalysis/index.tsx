import React from "react";
import styles from "./dataAnalysis.module.scss";
import { useLocation } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import NoDataIcon from '@mui/icons-material/InboxOutlined';
import TransactionTable from "../transactionTable";
import { useTransactions } from "../../hooks/useTransactions";
import TradingAnalysis from "../tradingAnalysis";

const DataAnalysis: React.FC = () => {
    const path = useLocation();
    const { transfers, isLoading, analysisData, isAnalyzing } = useTransactions(path.pathname.split("/")[2]);


    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <CircularProgress />
                <p>Loading transfers...</p>
            </div>
        );
    }

    if (!Array.isArray(transfers) || !transfers.length) {
        return (
            <div className={styles.noDataContainer}>
                <NoDataIcon className={styles.noDataIcon} />
                <p>No transactions found</p>
            </div>
        );
    }

    return (
        <>
            <TransactionTable transactions={transfers} />
            <TradingAnalysis analysisData={analysisData} isLoading={isAnalyzing} />
        </>
    );
};

export default React.memo(DataAnalysis);