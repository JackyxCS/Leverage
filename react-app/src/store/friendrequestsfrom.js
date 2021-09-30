const SET_FRIEND_REQUESTS_FROM = 'friendsquests/setFriendRequestsFrom'

const setFriendRequestsFrom = (friendRequests) => ({
    type: SET_FRIEND_REQUESTS_FROM,
    friendRequests
})

export const fetchFriendRequestsFrom = () => async (dispatch) => {
    const res = await fetch('/api/friendrequests/')
    const friendRequests = await res.json()
    dispatch(setFriendRequestsFrom(friendRequests.requests))
}

// Define an initial state
const initialState = {};

const friendRequestFromReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FRIEND_REQUESTS_FROM: {
            const newState = []
            const arr = action.friendRequests
            const friend_arr = Object.values(arr)
            for (let i = 0; i < friend_arr.length; i++) {
                newState.push(Number(friend_arr[i]))
            }
            return newState
        }
        default:
            return state;
    }
}

export default friendRequestFromReducer