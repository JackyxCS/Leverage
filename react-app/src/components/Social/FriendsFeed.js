import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllTransactions, fetchTransactions } from '../../store/transactions';
import FriendTransaction from './FriendTransaction';
import { fetchFriends } from '../../store/friends';
import styles from './Social.module.css';

const FriendsFeed = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const { id: userId } = user
    const transactions = useSelector(state => Object.values(state?.transactions))
    const friends = useSelector(state => state?.friends)
    const filtered_transactions = transactions?.filter((transaction) => (Number(transaction.userId) !== Number(userId)) && friends?.includes(+transaction.userId))

    useEffect(() => {
        dispatch(fetchFriends())
        dispatch(fetchAllTransactions())
    }, [dispatch])

    return (
        <div className={styles.friendsfeed}>
            <div className={styles.friendstext}>Friends Feed</div>
            <div className={styles.eachfriendlink}>
                {filtered_transactions.map(transaction => (
                    <NavLink className={styles.friendnavlink} key={transaction.id} to={`/social/${transaction.id}`}>
                        <FriendTransaction key={transaction.id} transaction={transaction} />
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default FriendsFeed