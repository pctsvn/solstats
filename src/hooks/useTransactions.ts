import { useQuery } from '@tanstack/react-query';
import { getAccountTransactions, getAccountTransfer } from '../apis/account';
import { Transaction, Transfer } from '../model';
import React from 'react';
import { analyzeTradingData } from '../service/openai';
import { notify } from '../utils/notification';

export const useTransactions = (address: string) => {
    const transfersQuery = useQuery<{ data: Transfer[] }>({
        queryKey: ['transfers', address],
        queryFn: () => getAccountTransfer({ address }),
        enabled: !!address,
        staleTime: 10000,
    });

    const transactionsQuery = useQuery<{ data: Transaction[] }>({
        queryKey: ['transactions', address],
        queryFn: () => getAccountTransactions({ address }),
        enabled: !!address,
        staleTime: 10000,
    });

    const combinedData = React.useMemo(() => {
        if (!transfersQuery.data?.data || !transactionsQuery.data?.data) {
            return [];
        }

        const transfers = transfersQuery.data.data;
        const transactions = transactionsQuery.data.data;

        return transfers.map((transfer) => {
            const matchedTransaction = transactions.find(
                (tx) => tx.slot === transfer.block_id
            );

            return {
                ...transfer,
                fee: matchedTransaction?.fee,
                status: matchedTransaction?.status,
            };
        });
    }, [transfersQuery.data, transactionsQuery.data]);

    const analysisQuery = useQuery({
        queryKey: ['analysis', address, combinedData],
        queryFn: async () => {
            if (!combinedData.length) return null;
            return analyzeTradingData(combinedData);
        },
        enabled: combinedData.length > 0,
    });

    // Toast logic for Transactions
    React.useEffect(() => {
        if (!transactionsQuery.isFetching &&
            !transfersQuery.isFetching &&
            transactionsQuery.data &&
            transfersQuery.data) {
            notify.success('Transactions fetched successfully!');
        } else if (transactionsQuery.isError) {
            notify.errorMessage(transactionsQuery.error);
        }
    }, [
        transactionsQuery.isFetching,
        transactionsQuery.isError,
        transactionsQuery.data,
        transactionsQuery.error,
        transfersQuery.isFetching,
        transfersQuery.data
    ]);

    // Toast logic for Analysis
    React.useEffect(() => {
        if (!analysisQuery.isFetching && analysisQuery.data) {
            // notify.success('Analysis completed successfully!');
        } else if (analysisQuery.isError) {
            notify.errorMessage(analysisQuery.error);
        }
    }, [
        analysisQuery.isFetching,
        analysisQuery.isError,
        analysisQuery.data,
        analysisQuery.error
    ]);

    return {
        transfers: transfersQuery.data?.data || [],
        transactions: transactionsQuery.data?.data || [],
        combinedData,
        isLoading: transfersQuery.isLoading || transactionsQuery.isLoading,
        isError: transfersQuery.isError || transactionsQuery.isError,
        error: transfersQuery.error || transactionsQuery.error,
        refetch: () => {
            transfersQuery.refetch();
            transactionsQuery.refetch();
        },
        analysisData: analysisQuery.data,
        isAnalyzing: analysisQuery.isLoading,
    };
};
