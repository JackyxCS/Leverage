import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import transactionsReducer from '../store/transactions';
// import { fetchTransactions } from '../store/transactions';

const FriendTransaction = ({ transaction }) => {
    // const dispatch = useDispatch()

    return (
        <div>
            {/* <NavLink to={`/social/${transaction.id}`}> */}
                <div>{transaction.user_details.username} {(transaction.trans_quantity[0] === '-') ? 'sold' : 'purchased'} shares of {transaction.ticker.toUpperCase()} at ${transaction.trade_price} per share</div>
                <div>{transaction.datetime}</div>
            {/* </NavLink> */}
        </div>
    )
}

export default FriendTransaction
