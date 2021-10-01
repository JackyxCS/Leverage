import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransactions } from '../../store/transactions';
import { fetchTransfers } from '../../store/transfer';
import styles from './Profile.module.css'

const UserProfile = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state?.session.user)
    const transactions = useSelector(state => Object.values(state?.transactions))
    const transfers = useSelector(state => Object.values(state?.transfers))

    useEffect(() => {
        dispatch(fetchTransactions())
        dispatch(fetchTransfers())
    }, [dispatch])

    return (
        <div className={styles.profilediv}>
            <div className={styles.profilediv2}>
                <div className={styles.welcometext}>Welcome, {user.username}</div>
                <div className={styles.titletext}>Transfers</div>
                <div className={styles.transfercontainer}>
                    {transfers.map((transfer) => (
                        <div className={styles.text} key={transfer.id}>
                            {transfer.transfer_type} ${transfer.transfer_amount} on {transfer.datetime}
                        </div>
                    ))}
                </div>
                <div className={styles.titletext}>Transactions</div>
                <div className={styles.transactioncontainer}>
                    {transactions.map((transaction) => (
                        <div className={styles.text} key={transaction.id}>{transaction.trans_quantity[0] === "-" ? "Sold" : "Purchased"} {transaction.trans_quantity[0] === "-" ? transaction.trans_quantity.slice(1) : transaction.trans_quantity} {transaction.trans_quantity === "1.00" ? "share" : "shares"} of {transaction.ticker.toUpperCase()} at ${transaction.trade_price}</div>
                    ))}
                </div>
            </div>
        </div>
    )

}

export default UserProfile