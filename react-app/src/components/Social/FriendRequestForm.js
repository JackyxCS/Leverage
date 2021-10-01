import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchFriendRequests, postFriendRequest } from '../../store/friendrequests';
import styles from './Social.module.css'

const FriendRequestForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const users = useSelector(state => Object.values(state.users))
    const user = useSelector(state => state.session.user)
    const [message, setMessage] = useState('Enter username')
    const [search, setSearch] = useState('')
    // const [validationErrors, setValidationErrors] = useState([])

    // thunk that returns
    const friend_requests = useSelector(state => state?.friendrequests)

    let existing_requests = []
    for (let i = 0; i < friend_requests[0]?.length; i++) {
        for (let key in friend_requests[0][i]) {
            existing_requests.push(+friend_requests[0][i][key])
            existing_requests.push(+key)
        }
    }

    // grab all usernames that are 1) current user's name, 2) sent request names, 3) received request names
    // and make sure you cannot add a friend in any of these 3 categories
    const currentUsername = user?.username
    const existingUserRequests = users.filter((user) => existing_requests.includes(+user.id))
    let existingUserNames = []
    for (let i = 0; i < existingUserRequests.length; i++) {
        if (existingUserRequests[i].id !== user.id)
        existingUserNames.push(existingUserRequests[i].username)
    }

    useEffect(() => {
        dispatch(fetchFriendRequests())
    }, [dispatch])

    let errors = [];
    if (search.length === 0) errors=["Please enter a username"]
    if (currentUsername === search) errors=["You cannot add yourself"]
    if (existingUserNames.includes(search)) errors=["Request pending or you are already friends"]

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (errors.length > 0) return;

        const usernames = []
        for (let i = 0; i < users.length; i++) {
            usernames.push(users[i].username)
        }

        if (!usernames.includes(search)) {
            setSearch('')
            setMessage('Username not found')
        }

        for (let i = 0; i < users.length; i++) {
            if (users[i].username === search) {
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
        <div className={styles.formelements}>
            <div>Find Friends</div>
            <div>
                {errors.map(error => (
                    <div className={styles.errorsdiv} key={error}>{error}</div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    className={styles.expandedinput}
                    placeholder={message}
                    type="text"
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoComplete='off'
                />
                <button
                    className={styles.expandedbutton}
                    type="submit"
                    disabled={errors.length > 0}
                >SEND REQUEST
                </button>
            </form>
        </div>
    )

}

export default FriendRequestForm