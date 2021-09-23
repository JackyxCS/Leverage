// Define Action Types as Constants
const SET_SEARCH = 'search/setSearch'
const SET_DETAILS = 'details/setDetails'

// Define Action Creators
const setSearch = (results) => ({
    type: SET_SEARCH,
    results
})

const setStockDetails = (details) => ({
    type: SET_DETAILS,
    details
})

// Define Thunks

// fetches all stock tickers and company names that match search input
// sotring in redux store
export const fetchStockData = (key, searchInput) => async (dispatch) => {
    const res = await fetch(`https://cloud.iexapis.com/stable/ref-data/iex/symbols?token=${key}`)
    const json = await res.json()
    let filtered = json.filter(value => value["symbol"].includes(searchInput.toUpperCase()) ||
        value["name"].includes(searchInput.toUpperCase()))
    dispatch(setSearch(filtered))
}

// fetches a company's data
// not storing in redux store
export const fetchStockDetails = (key, ticker) => async () => {
    const res = await fetch(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${key}`)
    const json = await res.json()
    return json
}

// fetches a company's 1 day graph
// not storing in redux store
export const fetchStockGraph = (key, ticker) => async () => {
    const res = await fetch(`https://cloud.iexapis.com/stable/stock/${ticker}/intraday-prices?token=${key}`)
    const json = await res.json()
    return json
}

// fetch request to buy stock
export const buyStock = (payload) => async() => {
    const res = await fetch('/api/transactions/buy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            payload
        })
    })

    if (res.ok) {
        const result = await res.json()
        return result
    }
}

// fetch request to sell stock
export const sellStock = (payload) => async() => {
    const res = await fetch('/api/transactions/sell', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            payload
        })
    })

    if (res.ok) {
        const result = await res.json()
        return result
    }
}

// fetch request to sell stock

// Define an initial state
const initialState = {}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH: {
            const newState = {}
            const arr = action.results
            if (arr.length > 5) {
                for (let i = 0; i < 5; i++) {
                    newState[arr[i].symbol] = arr[i]
                }
                return newState
            } else {
                arr.forEach(result => {
                    newState[result.symbol] = result
                })
                return newState
            }
        }
        default:
            return state;
    }
}

// Export the reducer
export default searchReducer