import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router';
// import { useParams } from 'react-router-dom';
import { fetchFriends } from '../store/friends';
import { authenticate } from '../store/session';
import { fetchUsers } from '../store/users';
import Friends from './Friends';

const FriendsDisplay = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            await dispatch(authenticate())
            await dispatch(fetchUsers())
            await dispatch(fetchFriends())
        })();
    }, [dispatch])

    // const history = useHistory()
    const user = useSelector(state => state.session.user)
    const { id: userId } = user
    const users = useSelector(state => Object.values(state.users))
    const friends = useSelector(state => Object.values(state?.friends))
    let users_friends = users?.filter(user => friends.includes(user.id) && user.id !== userId)
    console.log('users', users)
    console.log('usersfriends', users_friends)
    // const users_friends = users.filter(user => friends.includes(user.id) && user.id !== userId)
    // console.log(users_friends, 'usersfriends')

    // useEffect(() => {
    //     let users_friends = users.filter(user => friends.includes(user.id) && user.id !== userId)
    //     setUserFriends(users_friends)
    //     console.log(users_friends, 'usersfriends')
    // }, [friends])

    if (users_friends.length > 0) {
        return (
            <>
                <div>rendered friends
                    {users_friends.map((friend) => {
                        return <Friends key={friend.id} friend={friend} />
                    })}
                </div>
            </>
        )
    } else {
        return (
            <div>You have no friends.</div>
        )
    }

}

export default FriendsDisplay