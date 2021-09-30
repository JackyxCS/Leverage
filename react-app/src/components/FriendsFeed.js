import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchTransactions } from '../store/transactions';
import FriendTransaction from './FriendTransaction';

const FriendsFeed = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const { id: userId } = user
    const transactions = useSelector(state => Object.values(state.transactions))
    console.log(transactions)
    const filtered_transactions = transactions.filter((transaction) => Number(transaction.userId) !== Number(userId))
    console.log(filtered_transactions)

    useEffect(() => {
        dispatch(fetchTransactions())
    }, [dispatch])

    return (
        <div>FriendsFeed
            {filtered_transactions.map(transaction => (
                <NavLink to={`/social/${transaction.id}`}>
                    <FriendTransaction key={transaction.id} transaction={transaction} />
                </NavLink>
            ))}
        </div>
    )
}

export default FriendsFeed