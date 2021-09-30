import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { fetchFriendRequests } from '../store/friendrequests';
import RequestsTo from './RequestsTo';

const FriendRequestsTo = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const { id: userId } = user
    const users = useSelector(state => Object.values(state.users))
    // [{1: 3, 2: 3}] => {1: 3, 2: 3}
    const friend_requests = useSelector(state => Object.values(state.friendrequests)[0])
    const arr = []
    for (let key in friend_requests) {
        if (Number(key) === userId) {
            arr.push(friend_requests[key])
        }
    }
    let filtered_users = users.filter(user => arr.includes(+user.id))


    if (filtered_users?.length > 0) {
        return (
            <div>Requests To
                {filtered_users.map((request) => {
                    return <RequestsTo key={request.id} request={request} />
                })}
            </div>
        )
    } else {
        return (
            <div>You have not sent any friend requests.</div>
        )
    }
}

export default FriendRequestsTo