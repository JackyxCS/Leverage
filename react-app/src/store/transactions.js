// Define Action Types as Constants
const SET_TRANSACTIONS = 'transactions/setTransactions'
const SET_ALL_TRANSACTIONS = 'transactions/setAllTransactions'
const SET_EVERY_TRANSACTION = 'transactions/setEveryTransaction'

// Define Action Creators
const setOneStockTransactions = (transactions) => ({
    type: SET_TRANSACTIONS,
    transactions
})

const setAllStockTransactions = (transactions) => ({
    type: SET_ALL_TRANSACTIONS,
    transactions
})

const setEveryStockTransaction = (transactions) => ({
    type: SET_EVERY_TRANSACTION,
    transactions
})

// Define Thunks 
export const fetchOneStockTransactions = (ticker) => async (dispatch) => {
    const res = await fetch('/api/transactions/stock', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ticker
        })
    })
    const transactions = await res.json()
    dispatch(setOneStockTransactions(transactions))
}

// gets all transactions for homepage to render owned stocks
export const fetchTransactions = () => async (dispatch) => {
    const res = await fetch('/api/transactions/')
    const transactions = await res.json()
    dispatch(setAllStockTransactions(transactions))
    return transactions.transactions
}

// gets ALL transactions for homepage to render owned stocks
export const fetchAllTransactions = () => async (dispatch) => {
    const res = await fetch('/api/transactions/all')
    const transactions = await res.json()
    dispatch(setEveryStockTransaction(transactions))
    return transactions.transactions
}

// Define an initial state
const initialState = {}

// Define a reducer
const transactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TRANSACTIONS: {
            const newState = {}
            const arr = action.transactions.transactions
            arr.forEach(transaction => {
                newState[transaction.id] = transaction
            })
            return newState
        }
        // this is for every transaction for a particular user
        case SET_ALL_TRANSACTIONS: {
            const newState = {}
            const arr = action.transactions.transactions
            arr.forEach(transaction => {
                newState[transaction.id] = transaction
            })
            return newState
        }
        // this is for every single transaction
        case SET_EVERY_TRANSACTION: {
            const newState = {}
            const arr = action.transactions.transactions
            arr.forEach(transaction => {
                newState[transaction.id] = transaction
            })
            return newState
        }
        default:
            return state;
    }
}

export default transactionsReducer