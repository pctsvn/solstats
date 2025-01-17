import React from "react";
import { TokenDefiActivity } from "../../model";
import clsx from "clsx";
import styles from "./transactionTable.module.scss";
import { getTokenName } from "../../utils/getTokenName";
import { SOL } from "../../constant";
// import { getMetaToken } from "../../apis/metaToken";

interface TokenDefiActivityProps {
    listTokenDefiActivity: TokenDefiActivity[];
}

interface TokenDefiActivityRowProps {
    tokenDefiActivity: TokenDefiActivity;
}

const TransactionRow: React.FC<TokenDefiActivityRowProps> = React.memo(({ tokenDefiActivity }) => {

    const token1 = tokenDefiActivity.routers.token1;
    const isBuy = token1 === SOL;

    return (
        <tr className={clsx(styles.row, {
            [styles.buy]: isBuy,
            [styles.sell]: !isBuy
        })}>
            {/* <td>
                <span className={styles.hash}>
                    {tokenDefiActivity.trans_id.slice(0, 20)}...
                </span>
            </td> */}
            <td>
                <span className={styles.hash}>
                    {isBuy ? getTokenName(tokenDefiActivity.routers.token2) : getTokenName(tokenDefiActivity.routers.token1)}
                </span>
            </td>
            <td>{new Date(tokenDefiActivity.time).toLocaleString()}</td>
            <td>
                <span className={styles.type}>
                    {isBuy ? "Buy" : "Sell"}
                </span>
            </td>
            <td>
                {(tokenDefiActivity.routers.amount1 / 10 ** tokenDefiActivity.routers.token1_decimals)}
            </td>
            <td>${tokenDefiActivity.value.toFixed(2)}</td>
        </tr>
    );
});

TransactionRow.displayName = 'TransactionRow';

const TransactionTable: React.FC<TokenDefiActivityProps> = ({ listTokenDefiActivity }) => {
    if (!listTokenDefiActivity || listTokenDefiActivity.length === 0) {
        return null;
    }

    return (
        <div className={styles.transactions}>
            <h2 className={styles.title}>Recent Transactions</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {/* <th>Transaction ID</th> */}
                        <th>Token Name</th>
                        <th>Time</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Value (USD)</th>
                    </tr>
                </thead>
                <tbody>
                    {listTokenDefiActivity.map((tx) => (
                        <TransactionRow
                            key={tx.trans_id}
                            tokenDefiActivity={tx}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

TransactionTable.displayName = 'TransactionTable';

export default React.memo(TransactionTable); 