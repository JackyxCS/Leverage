// import { fetchLists } from "./watchlists"

// Define Action Types as Constants
const SET_STOCKS = 'watchliststocks/setStocks'
const ADD_STOCK = 'watchliststocks/addStocks'
// const UPDATE_STOCKS = 'watchliststocks/updateStocks'
const REMOVE_STOCK = 'watchliststocks/removeStock'

// Define Action Creators
const setStocks = (stocks) => ({
    type: SET_STOCKS,
    stocks
})

const addStock = (stock) => ({
    type: ADD_STOCK,
    stock
})

const removeStock = (stockId) => ({
    type: REMOVE_STOCK,
    stockId
})

// Define Thunks
export const fetchStocks = () => async (dispatch) => {
    const res = await fetch('/api/watchliststocks/')
    const watchliststocks = await res.json()
    dispatch(setStocks(watchliststocks.watchliststocks))
}

export const postStock = (stock) => async (dispatch) => {
    const res = await fetch('/api/watchliststocks/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            stock
        })
    })

    if (res.ok) {
        const newStock = await res.json()
        dispatch(addStock(newStock.stock))
        return newStock
    }
}

export const deleteStock = (stockId) => async (dispatch) => {
    const res = await fetch(`/api/watchliststocks/${stockId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(removeStock(stockId))
    }
}

// Define an initial state
const initialState = {};

// Define a reducer
const watchliststocksReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STOCKS: {
            const newState = {}
            const arr = action.stocks
            arr.forEach(stock => {
                newState[stock.id] = stock
            })
            return newState
        }
        case ADD_STOCK: {
            const newState = { ...state }
            newState[action.stock.id] = action.stock
            return newState
        }
        case REMOVE_STOCK: {
            const newState = { ...state }
            delete newState[action.stockId]
            return newState
        }
        default:
            return state;
    }
}

// Export the reducer
export default watchliststocksReducer