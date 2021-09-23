import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { makeTransfer } from '../store/transfer';

const TransferForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const { id: userId } = user

    const [transferType, setTransferType] = useState('initial')
    const [amount, setAmount] = useState(0)
    const [validationErrors, setValidationErrors] = useState([])

    useEffect(() => {
        const errors = [];
        if (!transferType) errors.push("Transfer type is required")
        if (amount <= 0) errors.push("You must enter an amount")
        setValidationErrors(errors)
    }, [amount, transferType])

    const reset = () => {
        setTransferType('initial')
        setAmount(0)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validationErrors > 0) return;

        const transferPayload = {
            userId,
            transferType,
            amount,
        }

        await dispatch(makeTransfer(transferPayload))
        reset()
        history.push(`/transfers`)
    }

    return (

        <form onSubmit={handleSubmit}>
            <select
                value={transferType}
                onChange={(e) => setTransferType(e.target.value)}
                required
            >
                <option disabled value='initial'>
                    Transfer Type
                </option>
                <option value="DEPOSIT">
                    DEPOSIT
                </option>
                <option value="WITHDRAW">
                    WITHDRAW
                </option>
            </select>
            <input
                placeholder="Amount"
                type="number"
                step=".01"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            <button
                type="submit"
                disabled={validationErrors.length > 0}
            >
                Transfer
            </button>
        </form>
    )
}

export default TransferForm