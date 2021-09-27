import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { getKey } from '../store/key';
import { buyStock, fetchStockDetails, sellStock } from '../store/stocks';
import { fetchOneStockTransactions } from '../store/transactions';

const BuyStockForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state?.session.user)
    const key = useSelector(state => state?.key.key)
    const transactions = useSelector(state => Object.values(state?.transactions))
    const { stockticker } = useParams()
    const { id: userId } = user

    let ownedShares = 0
    for (let i = 0; i < transactions.length; i++) {
        ownedShares = ownedShares + parseFloat(transactions[i].trans_quantity)
    }

    const [transactionPrice, setTransactionPrice] = useState(0)
    const [activeForm, setActiveForm] = useState('BUY')
    const [shares, setShares] = useState(0)
    const [message, setMessage] = useState('')
    const [validationErrors, setValidationErrors] = useState([])

    // API (comment back in for testing)
    useEffect(() => { 
        dispatch(fetchStockDetails(key, stockticker))
            .then((res) => {
                setTransactionPrice(res.latestPrice)
            })
    })

    useEffect(() => {
        const errors = [];
        if (shares <= 0) errors.push("You must enter a valid number")
        if (activeForm === "BUY" && (shares * transactionPrice) > user.balance) errors.push("You do not have enough cash balance")
        if (activeForm === "SELL" && (shares > ownedShares)) errors.push("You do not have enough shares")
        setValidationErrors(errors)
    }, [shares, activeForm, transactionPrice, user, ownedShares])

    useEffect(() => {
        dispatch(fetchOneStockTransactions(stockticker))
    }, [dispatch, stockticker])

    const handleBuySubmit = async (e) => {
        e.preventDefault();

        if (validationErrors.length > 0) return;

        const payload = {
            userId,
            stockticker,
            transactionPrice,
            shares,
        }

        dispatch(buyStock(payload))
        setShares(0)
        setMessage(`You have purchased ${shares} shares of ${stockticker}!`)
    }

    const handleSellSubmit = async (e) => {
        e.preventDefault();

        if (validationErrors > 0) return;

        const payload = {
            userId,
            stockticker,
            transactionPrice,
            sell_shares: -shares,
        }

        dispatch(sellStock(payload))
        setShares(0)
        setMessage(`You have sold ${shares} shares of ${stockticker}`)
    }

    let formDisplay
    if (ownedShares > 0) {
        if (activeForm === "BUY") {
            formDisplay = (
                <>
                    <div onClick={(() => setActiveForm("BUY"))}>Buy</div>
                    <div onClick={(() => setActiveForm("SELL"))}>Sell</div>
                    <form onSubmit={handleBuySubmit}>
                        {/* <ul>
                            {validationErrors.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul> */}
                        <input
                            placeholder="0"
                            type="number"
                            step=".01"
                            name="shares"
                            value={shares}
                            onChange={(e) => setShares(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            disabled={validationErrors.length > 0}
                        >
                            Buy
                        </button>
                    </form>
                </>
            )
        } else if (activeForm === "SELL") {
            formDisplay = (
                <>
                    <div onClick={(() => setActiveForm("BUY"))}>Buy</div>
                    <div onClick={(() => setActiveForm("SELL"))}>Sell</div>
                    <form onSubmit={handleSellSubmit}>
                        {/* <ul>
                            {validationErrors.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul> */}
                        <input
                            placeholder="0"
                            type="number"
                            step=".01"
                            name="shares"
                            value={shares}
                            onChange={(e) => setShares(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            disabled={validationErrors.length > 0}
                        >
                            Sell
                        </button>
                    </form>
                </>
            )
        }
    } else {
        formDisplay = (
            <>
                <div>Buy</div>
                <form onSubmit={handleBuySubmit}>
                    {/* <ul>
                            {validationErrors.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul> */}
                    <input
                        placeholder="0"
                        type="number"
                        step=".01"
                        name="shares"
                        value={shares}
                        onChange={(e) => setShares(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={validationErrors.length > 0}
                    >
                        Buy
                    </button>
                </form>
            </>
        )
    }

    return (
        <div>
            {/* {transactionPrice} */}
            {formDisplay}
        </div>
    )
}

export default BuyStockForm