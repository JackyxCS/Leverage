import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { fetchFriendRequests, postFriendRequest } from '../store/friendrequests';
import { fetchUsers } from '../store/users';

const FriendRequestForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const users = useSelector(state => Object.values(state.users))
    const user = useSelector(state => state.session.user)
    const { id: userId } = user
    // const friends_id = useSelector(state => state.friends)
    const [message, setMessage] = useState('Enter username')
    const [search, setSearch] = useState('')
    const [validationErrors, setValidationErrors] = useState([])

    useEffect(() => {
        dispatch(fetchFriendRequests())
    }, [dispatch])

    useEffect(() => {
        const errors = [];
        if (search.length === 0) errors.push("Please enter a username")
        setValidationErrors(errors)
    }, [search])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (validationErrors.length > 0) return;

        const usernames = []
        for (let i = 0; i < users.length; i++) {
            usernames.push(users[i].username)
        }

        // console.log(usernames)

        if (!usernames.includes(search)) {
            console.log('here')
            setSearch('')
            setMessage('Username not found')
        }

        for (let i = 0; i < users.length; i++) {
            if (users[i].username == search) {
                let new_request = await dispatch(postFriendRequest(users[i]))
                if (new_request) {
                    setSearch('')
                    setMessage('Friend Request Sent')
                    dispatch(fetchFriendRequests())
                    history.push('/social')
                }
            }
        }
        return;
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder={message}
                type="text"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoComplete='off'
            />
            <button
                type="submit"
            // disabled={validationErrors.length > 0}
            >SEND
            </button>
        </form>
    )

}

export default FriendRequestForm