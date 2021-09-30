import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { fetchFriendRequestsFrom } from '../store/friendrequestsfrom';
import RequestsFrom from './RequestsFrom';
// import { fetchFriendRequestsFrom } from '../store/friendrequests';

const FriendRequestsFrom = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const { id: userId } = user
    const users = useSelector(state => Object.values(state.users))
    // const friend_requests_from = useSelector(state => state.friendrequestsfrom)
    const friend_requests = useSelector(state => Object.values(state.friendrequests)[0])
    const arr = []
    for (let key in friend_requests) {
        if (friend_requests[key] === userId) {
            arr.push(Number(key))
        }
    }
    let filtered_users = users.filter(user => arr.includes(Number(user.id)))
    // console.log(filtered_users, 'filtered_users')

    if (filtered_users?.length > 0) {
        return (
            <div>Requests From
                {filtered_users.map((request) => {
                    return <RequestsFrom key={request.id} request={request} />
                })}
            </div>
        )
    } else {
        return (
            <div>You have not received any friend requests.</div>
        )
    }
}

export default FriendRequestsFrom