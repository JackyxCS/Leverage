import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFriendRequests } from '../../store/friendrequests';
import RequestsTo from './RequestsTo';
import styles from './Social.module.css';

const FriendRequestsTo = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const { id: userId } = user
    const users = useSelector(state => Object.values(state.users))
    const friend_requests = useSelector(state => state?.friendrequests)
    const arr = []
    for (let i = 0; i < friend_requests[0]?.length; i++) {
        for (let key in friend_requests[0][i]) {
            if (Number(key) === userId) {
                arr.push(friend_requests[0][i][key])
            }
        }
    }
    let filtered_users = users.filter(user => arr.includes(+user.id))

    useEffect(() => {
        dispatch(fetchFriendRequests())
    }, [dispatch])


    if (filtered_users?.length > 0) {
        return (
            <div className={styles.currentfriends}>
                <div>Requests To</div>
                <div className={styles.expandedform}>
                    {filtered_users.map((request) => {
                        return <RequestsTo key={request.id} request={request} />
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

export default FriendRequestsTo