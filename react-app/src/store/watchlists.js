// Define Action Types as Constants
const SET_LISTS = 'lists/setLists'
const ADD_LIST = 'lists/addList'
const UPDATE_LIST = 'lists/updateList'
const REMOVE_LIST = 'lists/removeList'

// Define Action Creators
const setLists = (lists) => ({
    type: SET_LISTS,
    lists
})

const addList = (list) => ({
    type: ADD_LIST,
    list
})

const updateList = (list) => ({
    type: UPDATE_LIST,
    list
})

const removeList = (listId) => ({
    type: REMOVE_LIST,
    listId
})

// Define Thunks
export const fetchLists = () => async (dispatch) => {
    const res = await fetch('/api/lists/')
    const watchlists = await res.json()
    dispatch(setLists(watchlists.watchlists))
}

export const postList = (watchlist) => async (dispatch) => {
    const res = await fetch('/api/lists/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            watchlist
        })
    })

    if (res.ok) {
        const newList = await res.json();
        // console.log(newList)
        dispatch(addList(newList));
        return newList
    }
}

export const createUpdate = (watchlist) => async (dispatch) => {
    const res = await fetch(`/api/lists/${watchlist.listId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            watchlist
        })
    })

    if (res.ok) {
        const updatedList = await res.json()
        dispatch(updateList(updatedList))
        return updatedList
    }
}

export const deleteList = (listId) => async (dispatch) => {
    const res = await fetch(`/api/lists/${listId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(removeList(listId))
    }
}

// Define an initial state
const initialState = {};

// Define a reducer
const watchlistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LISTS: {
            const newState = {}
            const arr = action.lists
            arr.forEach(list => {
                newState[list.id] = list
            })
            return newState
        }
        case ADD_LIST: {
            const newState = { ...state }
            newState[action.list.id] = action.list
            return newState
        }
        case UPDATE_LIST: {
            const newState = { ...state }
            newState[action.list.id] = action.list
            return newState
        }
        case REMOVE_LIST: {
            const newState = { ...state }
            delete newState[action.listId]
            return newState
        }
        default:
            return state;
    }
}

// Export the reducer
export default watchlistsReducer