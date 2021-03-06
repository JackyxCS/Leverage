// Define Action Types as Constants
const SET_FRIENDS = 'friends/setFriends'
// const ADD_FRIEND = 'friends/addFriend'
// const REMOVE_FRIEND = 'friends/removeFriend'

// Define Action Creators
const setFriends = (friends) => ({
    type: SET_FRIENDS,
    friends
})

// const addFriend = (friend) => ({
//     type: ADD_FRIEND,
//     friend
// })

// const removeFriend = (friendId) => ({
//     type: REMOVE_FRIEND,
//     friendId
// })

// Define Thunks
export const fetchFriends = () => async (dispatch) => {
    const res = await fetch('/api/friends/')
    const friends = await res.json()
    dispatch(setFriends(friends.friends))
}

export const postFriend = (friend) => async (dispatch) => {
    const res = await fetch('/api/friends/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            friend
        })
    })

    if (res.ok) {
        return 'posted'
    }
}

export const deleteFriend = (friendId) => async (dispatch) => {
    const res = await fetch(`/api/friends/${friendId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        return 'deleted'
    }
}

// Define an initial state
const initialState = {};

// Define a reducer
const friendsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FRIENDS: {
            const newState = []
            const arr = action.friends
            const friend_arr = Object.keys(arr)
            for (let i = 0; i < friend_arr.length; i++) {
                newState.push(parseInt(friend_arr[i]))
            }
            return newState
        }
        default:
            return state;
    }
}

// Export the reducer
export default friendsReducer