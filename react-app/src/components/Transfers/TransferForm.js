import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { authenticate } from '../../store/session';
import { makeTransfer } from '../../store/transfer';
import { fetchUsers } from '../../store/users';
import styles from './TransferForm.module.css'

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
        if (transferType === "initial") errors.push("Transfer type is required")
        if (amount <= 0) errors.push("You must enter an amount")
        if (transferType === 'WITHDRAW' && (+amount > parseInt(user?.balance))) errors.push("Insufficient funds")
        setValidationErrors(errors)
    }, [amount, transferType, user])

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
        await dispatch(fetchUsers())
        await dispatch(authenticate());
        reset()
        history.push(`/portfolio`)
    }

    return (
        <div className={styles.transferdiv}>
            <form className={styles.transferform} onSubmit={handleSubmit}>
                <div>
                    {validationErrors.map(error => (
                        <div className={styles.errorsdiv} key={error}>{error}</div>
                    ))}
                </div>
                <select
                    className={styles.selectelement}
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
                    className={styles.inputelement}
                    placeholder="Amount"
                    type="number"
                    step=".01"
                    name="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <button
                    className={styles.transferbutton}
                    type="submit"
                    disabled={validationErrors.length > 0}
                >
                    Transfer
                </button>
                <div className={styles.availablebalance}>
                    <div className={styles.balancetext}>Available Balance</div>
                    <div>${parseInt(user.balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
            </form>
        </div>
    )
}

export default TransferForm