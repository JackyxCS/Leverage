import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFriendRequest, fetchFriendRequests } from '../store/friendrequests';

const RequestsTo = ({ request }) => {
    const dispatch = useDispatch()
    // console.log(request.id)

    const handleClick = async (e) => {
        await dispatch(deleteFriendRequest(request.id))
        await dispatch(fetchFriendRequests())
        // console.log(request.id)
    }

    return (
        <div>{request.username}
            <button onClick={handleClick}>CANCEL</button>
        </div>
    )
}

export default RequestsTo