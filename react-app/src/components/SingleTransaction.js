import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchTransactions } from '../store/transactions';
import { fetchComments } from '../store/comments';
import CreateCommentForm from './CreateCommentForm';
import CommentDetail from './CommentDetail';

const SingleTransaction = () => {
    const dispatch = useDispatch()
    const { transactionId } = useParams()

    const user = useSelector(state => state.session.user)
    const transactions = useSelector(state => Object.values(state.transactions))
    const filtered_transaction = transactions.filter(transaction => Number(transaction.id) == Number(transactionId))
    const { id: userId } = user
    const comments = useSelector(state => Object.values(state.comments))
    const transactionComments = comments.filter(comment => Number(comment.transactionId) === Number(transactionId))

    useEffect(() => {
        dispatch(fetchTransactions())
        dispatch(fetchComments())
    }, [dispatch])

    return (
        <div>A single transaction
            <div>id: {transactionId}</div>
            <div>Iterate over all comments here</div>
            {/* <i class="far fa-angry"></i> */}
            {!!transactionComments && transactionComments.map((comment) => {
                return <CommentDetail key={comment?.id} comment={comment} />
            })}
            <CreateCommentForm />
        </div>
    )
}

export default SingleTransaction