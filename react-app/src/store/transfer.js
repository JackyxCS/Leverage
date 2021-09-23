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
export const updateUserBalance = (userPayload) => async () => {
    const res = await fetch(`/api/users/${userPayload["userId"]}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            balance: userPayload["balance"]
        })
    })

    if (res.ok) {
        const updatedUser = await res.json()
        return updatedUser
    }
}

export const fetchTransfers = () => async (dispatch) => {
    const res = await fetch('/api/transfers/');
    const transfers = await res.json()
    dispatch(setTransfers(transfers))
}

export const makeTransfer = (transfer) => async (dispatch) => {
    // console.log('in thunk')
    const res = await fetch('/api/transfers/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            transferType: transfer["transferType"],
            amount: transfer["amount"],
        })
    })

    if (res.ok) {
        const newTransfer = await res.json()
        dispatch(addTransfer(newTransfer))
        return newTransfer
    }
}

// Define an initial state
const initialState = {}

// Define a reducer
const transfersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TRANSFERS: {
            const newState = {}
            const arr = action.transfers
            arr.forEach(transfer => {
                newState[transfer.id] = transfer
            })
            return newState
        }
        case ADD_TRANSFER: {
            const newState = { ...state }
            newState[action.transfer.id] = action.transfer
            return newState
        }
        default:
            return state;
    }
}

// Export the reducer
export default transfersReducer