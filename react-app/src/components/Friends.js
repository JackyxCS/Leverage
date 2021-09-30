import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { deleteFriend, fetchFriends } from '../store/friends';
import { fetchUsers } from '../store/users';

const Friends = ({ friend }) => {
    const dispatch = useDispatch()

    const handleDelete = async () => {
        await dispatch(deleteFriend(friend.id))
        await dispatch(fetchFriends())
    }

    return (
        <div>{friend.username}
            <button onClick={handleDelete}>REMOVE</button>
        </div>
    )
}

export default Friends