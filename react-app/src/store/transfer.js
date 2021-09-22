// Define Action Types as Constants
const SET_TRANSFERS = 'transfers/setTransfers'
const ADD_TRANSFER = 'transfers/makeTransfers'

// Define Action Creators
const setTransfers = (transfers) => ({
    type: SET_TRANSFERS,
    transfers
})

const addTransfer = (transfer) => ({
    type: ADD_TRANSFER,
    transfer
})

// Define Thunks
export const fetchTransfers = () => async (dispatch) => {
    const res = await fetch('/api/transfers/');
    const transfers = await res.json()
    dispatch(setTransfers(transfers))
}

export const makeTransfer = (transfer) => async (dispatch) => {
    const res = await fetch('/api/transfers/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            transfer
        })
    })

    if (res.ok) {
        const newTransfer = res.json()
        dispatch(addTransfer(newTransfer))
        return newTransfer
    }
}

// Define an initial state
const initialState = {}

// Define a reducer
const 

// Export the reducer