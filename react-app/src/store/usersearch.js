const setSearch = 'users/setSearch'

const setSearch = (search) => ({
    type: SET_SEARCH,
    search
})

export const userSearch = (searchInput) => async (dispatch) => {
    const res = await fetch('/api/users/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            searchInput
        })
    })

    if (res.ok) {
        const results = await res.json()
        dispatch(setSearch(results))
        return results
    }
}

const initialState = {}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH: {
            const newState = {};
            action.search.forEach(result => {
                newState[result.id] = result;
            })
            return newState;
        }
        default:
            return state;
    }
}

export default searchReducer