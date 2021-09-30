import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router';
// import { useParams } from 'react-router-dom';
import { fetchFriends } from '../../store/friends';
import { authenticate } from '../../store/session';
import { fetchUsers } from '../../store/users';
import Friends from './Friends';
import styles from './Social.module.css';

const FriendsDisplay = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            await dispatch(authenticate())
            await dispatch(fetchUsers())
            await dispatch(fetchFriends())
        })();
    }, [dispatch])

    const user = useSelector(state => state.session.user)
    const { id: userId } = user
    const users = useSelector(state => Object.values(state.users))
    const friends = useSelector(state => Object.values(state?.friends))
    let users_friends = users?.filter(user => friends.includes(user.id) && user.id !== userId)

    if (users_friends.length > 0) {
        return (
            <div className={styles.currentfriends}>
                <div>My Friends</div>
                <div className={styles.expandedform}>
                    {users_friends.map((friend) => {
                        return <Friends key={friend.id} friend={friend} />
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

export default FriendsDisplay