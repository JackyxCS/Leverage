import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllTransactions } from '../../store/transactions';
import { fetchComments } from '../../store/comments';
import CreateCommentForm from './CreateCommentForm';
import CommentDetail from './CommentDetail';
import styles from './Social.module.css';

const SingleTransaction = () => {
    const dispatch = useDispatch()
    const { transactionId } = useParams()

    const transactions = useSelector(state => Object.values(state?.transactions))
    const transaction = transactions?.filter(transaction => Number(transaction.id) === Number(transactionId))[0]
    const comments = useSelector(state => Object.values(state.comments))
    const transactionComments = comments.filter(comment => Number(comment.transactionId) === Number(transactionId))
    // const transaction = transactions?.filter((transaction) => +transaction.id == transactionId)

    useEffect(() => {
        dispatch(fetchAllTransactions())
        dispatch(fetchComments())
    }, [dispatch])

    return (
        <div className={styles.transaction1}>
            <div className={styles.transaction2}>
                <div className={styles.transactiontext}>{transaction?.user_details.username} {(transaction?.trans_quantity[0] === '-') ? 'sold' : 'purchased'} shares of {transaction?.ticker.toUpperCase()} at ${transaction?.trade_price} per share</div>
                <div>
                    {!!transactionComments && transactionComments.map((comment) => {
                        return <CommentDetail key={comment?.id} comment={comment} />
                    })}
                </div>
                <div>
                    <CreateCommentForm />
                </div>
            </div>
        </div>
    )
}

export default SingleTransaction