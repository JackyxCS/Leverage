import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './OwnedTickers.module.css'
import { fetchStockDetails } from '../../store/stocks';

const WatchedTickers = ({ ticker }) => {
    const key = useSelector(state => state?.key.key)
    const dispatch = useDispatch()

    const [stockDetails, setStockDetails] = useState({})

    let colorDetails = ''
    
    // let ownedShares = ''//(ownedStocks[ticker] > 1 ? 'shares' : 'share')

    if (stockDetails?.changePercent < 0) {
        colorDetails = 'redpercent'
    } else if (stockDetails?.changePercent >= 0) {
        colorDetails = 'greenpercent'
    }

    // if (ownedStocks[ticker] > 1) {
    //     ownedShares = 'shares'
    // } else {
    //     ownedShares = 'share'
    // }

    useEffect(() => {
        dispatch(fetchStockDetails(key, ticker))
            .then((data) => {
                setStockDetails(data)
            })
    }, [dispatch, key, ticker])

    if (Object.values(stockDetails).length > 0) {
        return (
            <div className={styles.eachtickerdetail} key={ticker}>
                <div className={styles.eachtickerhalf}>
                    <div className={styles.ticker}>
                        <div>{ticker.toUpperCase()}</div>
                    </div>
                    <div className={styles.pricedetails}>
                        <div>${stockDetails.latestPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className={colorDetails}>{(stockDetails.changePercent * 100).toFixed(2)}%</div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (<div>No details found.</div>)
    }
}

export default WatchedTickers