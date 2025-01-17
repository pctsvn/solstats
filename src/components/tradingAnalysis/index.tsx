import React from 'react';
import styles from './tradingAnalysis.module.scss';

interface AnalysisData {
    tradingStyle: string | null;
    averageHoldDuration: number | null;
    winRate: number | null;
    suggestions: string | null;
    riskLevel: string | null;
}

interface TradingAnalysisProps {
    analysisData: AnalysisData | null | undefined;
    isLoading?: boolean;
}

const TradingAnalysis: React.FC<TradingAnalysisProps> = ({
    analysisData,
    isLoading = false
}) => {
    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <p>Analyzing trading data...</p>
            </div>
        );
    }

    if (!analysisData) {
        return null;
    }

    return (
        <div className={styles.analysisContainer}>
            <h3 className={styles.title}>Trading Analysis</h3>
            <div className={styles.content}>
                <div className={styles.analysisLine}>
                    <span className={styles.label}>Trading Style:</span>
                    <span>{analysisData.tradingStyle}</span>
                </div>
                <div className={styles.analysisLine}>
                    <span className={styles.label}>Average Hold Duration:</span>
                    <span>{analysisData.averageHoldDuration}</span>
                </div>
                <div className={styles.analysisLine}>
                    <span className={styles.label}>Win Rate:</span>
                    <span>{analysisData.winRate ? `${analysisData.winRate}` : '0'}</span>
                </div>
                <div className={styles.analysisLine}>
                    <span className={styles.label}>Risk Level:</span>
                    <span className={styles[analysisData.riskLevel?.toLowerCase() || '0']}>
                        {analysisData.riskLevel}
                    </span>
                </div>
                <div className={styles.suggestions}>
                    <span className={styles.label}>Suggestions:</span>
                    <p>{analysisData.suggestions}</p>
                </div>
            </div>
        </div>
    );
};

export default React.memo(TradingAnalysis); 