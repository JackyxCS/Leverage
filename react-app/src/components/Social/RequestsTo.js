import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteFriendRequest, fetchFriendRequests } from '../../store/friendrequests';
import styles from './Social.module.css'

const RequestsTo = ({ request }) => {
    const dispatch = useDispatch()

    const handleClick = async (e) => {
        await dispatch(deleteFriendRequest(request.id))
        await dispatch(fetchFriendRequests())
    }

    return (
        <div className={styles.expandedform}>
            <div className={styles.friendusername}>{request.username}</div>
            <button className={styles.expandedbuttonred} onClick={handleClick}>CANCEL</button>
        </div>
    )
}

export default RequestsTo