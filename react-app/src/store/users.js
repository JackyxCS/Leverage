// Define Action Types as Constants
const SET_USERS = 'users/setUsers'

// Define Action Creators
const setUsers = (users) => ({
    type: SET_USERS,
    users
})

// Define Thunks
export const fetchUsers = () => async (dispatch) => {
    const res = await fetch('/api/users/')
    const users = await res.json()
    dispatch(setUsers(users.users))
}

// Define an initial state
const initialState = {};

// Define a reducer
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS: {
            const newState = {}
            const arr = action.users
            arr.forEach(user => {
                newState[user.id] = user
            })
            return newState
        }
        default:
            return state;
    }
}

// Export the reducer
export default usersReducer