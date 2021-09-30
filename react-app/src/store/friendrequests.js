// Define Action Types as Constants
const SET_FRIEND_REQUESTS = 'friendrequests/setFriendRequests'
// const SET_FRIEND_REQUESTS_FROM = 'friendsquests/setFriendRequestsFrom'
// const ADD_FRIEND_REQUEST = 'friendrequests/addFriendRequest'
const REMOVE_FRIEND_REQUEST = 'friendrequests/removeFriendRequest'

// Define Action Creators

// sets friend requests a user has sent
const setFriendRequests = (friendRequests) => ({
    type: SET_FRIEND_REQUESTS,
    friendRequests
})

// sets friend requests a user has received
// const setFriendRequestsFrom = (friendRequests) => ({
//     type: SET_FRIEND_REQUESTS_FROM,
//     friendRequests
// })

// const addFriendRequest = (friendRequest) => ({
//     type: ADD_FRIEND_REQUEST,
//     friendRequest
// })

const removeFriendRequest = (friendRequestId) => ({
    type: REMOVE_FRIEND_REQUEST,
    friendRequestId
})

// Define Thunks
export const fetchFriendRequests = () => async (dispatch) => {
    const res = await fetch('/api/friendrequests/')
    const friendRequests = await res.json()
    console.log(friendRequests.requests, "allfriendrequests")
    dispatch(setFriendRequests(friendRequests.requests))
}

export const postFriendRequest = (friendRequest) => async (dispatch) => {
    const res = await fetch('/api/friendrequests/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            friendRequest
        })
    })

    if (res.ok) {
        return 'posted'
    }
}

export const deleteFriendRequest = (friendRequestId) => async (dispatch) => {
    const res = await fetch(`/api/friendrequests/${friendRequestId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(removeFriendRequest(friendRequestId))
    }
}


// Define an initial state
const initialState = {};


// Define a reducer
const friendRequestReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FRIEND_REQUESTS: {
            const newState = []
            const arr = action.friendRequests
            // console.log(arr, "requestsarr")
            // const friend_arr = Object.values(arr)
            // // console.log(friend_arr, 'makes in thunk')
            // for (let i = 0; i < friend_arr.length; i++) {
            //     newState.push(friend_arr[i])
            // }
            newState.push(arr)
            return newState
        }
        // case SET_FRIEND_REQUESTS_FROM: {
        //     const newState = []
        //     const arr = action.friendRequests
        //     console.log(arr, "requestsarr")
        //     const friend_arr = Object.keys(arr)
        //     console.log(friend_arr, 'makes in thunk')
        //     for (let i = 0; i < friend_arr.length; i++) {
        //         newState.push(friend_arr[i])
        //     }
        //     return newState
        // }
        // case ADD_FRIEND_REQUEST: {
        //     const newState = { ...state }
        //     newState[action.friendRequest.id] = action.friendRequest
        //     return newState
        // }
        case REMOVE_FRIEND_REQUEST: {
            const newState = [...state]
            newState.splice(newState.indexOf(action.friendRequestId), 1)
            return newState
        }
        default:
            return state;
    }
}

// Export the reducer
export default friendRequestReducer