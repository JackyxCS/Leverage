import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteFriendRequest, fetchFriendRequests } from '../../store/friendrequests';
import { fetchFriends, postFriend } from '../../store/friends';
import styles from './Social.module.css'

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
        <div className={styles.expandedform}>
            <div className={styles.friendusername}>{request.username}</div>
            <button className={styles.expandedbutton} onClick={handleAccept}>ACCEPT</button>
            <button className={styles.expandedbuttonred} onClick={handleDelete}>DELETE</button>
        </div>
    )
}

export default RequestsFrom