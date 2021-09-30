import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
// import { getKey } from '../../store/key';
import { authenticate } from '../../store/session';
import { buyStock, fetchStockDetails, sellStock } from '../../store/stocks';
import { fetchOneStockTransactions, fetchTransactions } from '../../store/transactions';
import styles from './SingleStockPage.module.css'

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
        if (transactionPrice === 0) errors.push("Please wait until market hours")
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

        await dispatch(buyStock(payload))
        await dispatch(fetchTransactions())
        await dispatch(authenticate())
        setShares(0)
        setMessage(`You have purchased ${shares} shares of ${stockticker}!`)
        history.push('/portfolio')
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

        await dispatch(sellStock(payload))
        await dispatch(fetchTransactions())
        await dispatch(authenticate())
        setShares(0)
        setMessage(`You have sold ${shares} shares of ${stockticker}`)
        history.push('/portfolio')
    }

    let formDisplay
    if (ownedShares > 0) {
        if (activeForm === "BUY") {
            formDisplay = (
                <>
                    <div className={styles.activeform}>
                        <div
                            className={styles.buttondiv}
                            activeclassname='active'
                            activestyle={{ border: "1px solid black" }}
                            onClick={(() => setActiveForm("BUY"))}>Buy</div>
                        <div className={styles.buttondiv} onClick={(() => setActiveForm("SELL"))}>Sell</div>
                    </div>
                    <form className={styles.buysellform} onSubmit={handleBuySubmit}>
                        {/* <ul>
                            {validationErrors.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul> */}
                        <div className={styles.formelements}>
                            <div>Shares</div>
                            <input
                                className={styles.sharesinput}
                                placeholder="0"
                                type="number"
                                step=".01"
                                name="shares"
                                value={shares}
                                onChange={(e) => setShares(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formelements}>
                            <div>Market Price</div>
                            <div>${(transactionPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        </div>
                        <div className={styles.formelements}>
                            <div>Estimated Cost</div>
                            <div>${(transactionPrice * shares).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        </div>
                        <button
                            className={styles.purchasebutton}
                            type="submit"
                            disabled={validationErrors.length > 0}
                        >
                            Purchase
                        </button>
                        <div className={styles.successmessage}>{message}</div>
                    </form>
                </>
            )
        } else if (activeForm === "SELL") {
            formDisplay = (
                <>
                    <div className={styles.activeform}>
                        <div className={styles.buttondiv} onClick={(() => setActiveForm("BUY"))}>Buy</div>
                        <div className={styles.buttondiv} onClick={(() => setActiveForm("SELL"))}>Sell</div>
                    </div>
                    <form className={styles.buysellform} onSubmit={handleSellSubmit}>
                        {/* <ul>
                            {validationErrors.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul> */}
                        <div className={styles.formelements}>
                            <div>Shares</div>
                            <input
                                className={styles.sharesinput}
                                placeholder="0"
                                type="number"
                                step=".01"
                                name="shares"
                                value={shares}
                                onChange={(e) => setShares(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formelements}>
                            <div>Market Price</div>
                            <div>${(transactionPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        </div>
                        <div className={styles.formelements}>
                            <div>Estimated Credit</div>
                            <div>${(transactionPrice * shares).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        </div>
                        <button
                            className={styles.purchasebutton}
                            type="submit"
                            disabled={validationErrors.length > 0}
                        >
                            Sell
                        </button>
                        <div className={styles.successmessage}>{message}</div>
                    </form>
                </>
            )
        }
    } else {
        formDisplay = (
            <>
                <div className={styles.activeform}>
                    <div className={styles.buttondiv}>Buy</div>
                </div>
                <form className={styles.buysellform} onSubmit={handleBuySubmit}>
                    {/* <ul>
                            {validationErrors.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul> */}
                    <div className={styles.formelements}>
                        <div>Shares</div>
                        <input
                            className={styles.sharesinput}
                            placeholder="0"
                            type="number"
                            step=".01"
                            name="shares"
                            value={shares}
                            onChange={(e) => setShares(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formelements}>
                        <div>Market Price</div>
                        <div>${(transactionPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                    <div className={styles.formelements}>
                        <div>Estimated Cost</div>
                        <div>${(transactionPrice * shares).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                    <button
                        className={styles.purchasebutton}
                        type="submit"
                        disabled={validationErrors.length > 0}
                    >
                        Buy
                    </button>
                    <div className={styles.successmessage}>{message}</div>
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