import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { fetchFriendRequests } from '../../store/friendrequests';
import { fetchFriendRequestsFrom } from '../../store/friendrequestsfrom';
import RequestsFrom from './RequestsFrom';
import styles from './Social.module.css';
// import { fetchFriendRequestsFrom } from '../store/friendrequests';

const FriendRequestsFrom = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const { id: userId } = user
    const users = useSelector(state => Object.values(state.users))
    // const friend_requests_from = useSelector(state => state.friendrequestsfrom)
    const friend_requests = useSelector(state => (state?.friendrequests))
    const arr = []
    for (let i = 0; i < friend_requests[0]?.length; i++) {
        for (let key in friend_requests[0][i]) {
            if (+friend_requests[0][i][key] === +userId) {
                arr.push(Number(key))
            }
        }
    }
    let filtered_users = users.filter(user => arr.includes(Number(user.id)))

    useEffect(() => {
        dispatch(fetchFriendRequests())
    }, [dispatch])

    if (filtered_users?.length > 0) {
        return (
            <div className={styles.currentfriends}>
                <div>Requests From</div>
                <div className={styles.expandedform}>
                    {filtered_users.map((request) => {
                        return <RequestsFrom key={request.id} request={request} />
                    })}
                </div>
            </div>
        )
    } else {
        return (
            <></>
        )
    }
}

export default FriendRequestsFrom