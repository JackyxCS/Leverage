import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { deleteFriend, fetchFriends } from '../../store/friends';
import { fetchUsers } from '../../store/users';
import styles from './Social.module.css'

const Friends = ({ friend }) => {
    const dispatch = useDispatch()

    const handleDelete = async () => {
        await dispatch(deleteFriend(friend.id))
        await dispatch(fetchFriends())
    }

    return (
        <div className={styles.expandedform}>
            <div className={styles.friendusername}>{friend.username}</div>
            <button className={styles.expandedbuttonred} onClick={handleDelete}>REMOVE</button>
        </div>
    )
}

export default Friends