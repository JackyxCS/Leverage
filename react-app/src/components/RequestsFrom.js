import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFriendRequest, fetchFriendRequests } from '../store/friendrequests';
import { fetchFriends, postFriend } from '../store/friends';

const RequestsFrom = ({ request }) => {
    const dispatch = useDispatch()

    const handleAccept = async (e) => {
        await dispatch(deleteFriendRequest(request.id))
        await dispatch(postFriend(request))
        await dispatch(fetchFriends())
        await dispatch(fetchFriendRequests())
    }

    const handleDelete = async (e) => {
        await dispatch(deleteFriendRequest(request.id))
        await dispatch(fetchFriends())
        await dispatch(fetchFriendRequests())
    }

    return (
        <div>{request.username}
            <button onClick={handleAccept}>ACCEPT</button>
            <button onClick={handleDelete}>DELETE</button>
        </div>
    )
}

export default RequestsFrom