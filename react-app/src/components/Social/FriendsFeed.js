import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllTransactions } from '../../store/transactions';
import FriendTransaction from './FriendTransaction';
import { fetchFriends } from '../../store/friends';
import styles from './Social.module.css';

const FriendsFeed = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const { id: userId } = user

    useEffect(() => {
        (async () => {
            await dispatch(fetchFriends())
            await dispatch(fetchAllTransactions())
        })();
    }, [dispatch])

    const transactions = useSelector(state => Object.values(state?.transactions))
    const friends = useSelector(state => Object.values(state?.friends))
    const filtered_transactions = transactions?.filter((transaction) => (Number(transaction.userId) !== Number(userId)) && friends?.includes(+transaction.userId))


    if (friends) {
        return (
            <div className={styles.friendsfeed}>
                <div className={styles.friendstext}>Friends Feed</div>
                <div className={styles.eachfriendlink}>
                    {filtered_transactions && filtered_transactions?.map(transaction => (
                        <div key={transaction.id} className={styles.eachfeedtransaction}>
                            <NavLink className={styles.friendnavlink} key={transaction.id} to={`/social/${transaction.id}`}>
                                <div>
                                    <FriendTransaction key={transaction.id} transaction={transaction} />
                                </div>
                                <div className={styles.viewtext}>View</div>
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
        )
    } else {
        return (<></>)
    }
}

export default FriendsFeed