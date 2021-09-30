const SET_OWNED = 'ownedstocks/setOwned'

const setOwnedStocks = (ownedStocks) => ({
    type: SET_OWNED,
    ownedStocks
})

// gets stocks a user owns by aggregating transactions
export const fetchOwnedStocks = () => async (dispatch) => {
    const res = await fetch('/api/transactions/')
    const json = await res.json()
    const data = json.transactions
    const ownedStock = {}
    for (let i = 0; i < data.length; i++) {
        let trans = data[i]
        let ticker = trans["ticker"]
        if (ownedStock[ticker] === undefined) {
            ownedStock[ticker] = parseFloat(trans["trans_quantity"])
        } else {
            ownedStock[ticker] += parseFloat(trans["trans_quantity"])
        }
    }
    dispatch(setOwnedStocks(ownedStock))
    return ownedStock
}

// Define an initial state
const initialState = {}

// Define a reducer
const ownedStockReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_OWNED: {
            return action.ownedStocks
        }
        default:
            return state;
    }
}

export default ownedStockReducer