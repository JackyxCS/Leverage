import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import WatchListDisplay from './WatchListDisplay';
import WatchListForm from './WatchListForm';
import PortfolioPage from './PortfolioPage';
import styles from './OwnedTickers.module.css'
import { fetchStockDetails } from '../../store/stocks';

const WatchedTickers = ({ ticker }) => {
    const ownedStocks = useSelector(state => state?.owned)
    const ownedtickers = Object.keys(ownedStocks)
    const key = useSelector(state => state?.key.key)
    const dispatch = useDispatch()

    const [stockDetails, setStockDetails] = useState({})
    let colorDetails = ''
    let ownedShares = ''
    if (stockDetails?.changePercent < 0) {
        colorDetails = 'redpercent'
    } else if (stockDetails?.changePercent >= 0) {
        colorDetails = 'greenpercent'
    }
    if (ownedStocks[ticker] > 1) {
        ownedShares = 'shares'
    } else {
        ownedShares = 'share'
    }

    useEffect(() => {
        dispatch(fetchStockDetails(key, ticker))
            .then((data) => {
                setStockDetails(data)
            })
    }, [dispatch])

    if (Object.values(stockDetails).length > 0) {
        return (
            <div className={styles.eachtickerdetail} key={ticker}>
                <div className={styles.eachtickerhalf}>
                    <div className={styles.ticker}>
                        <div>{ticker.toUpperCase()}</div>
                        {/* <div>{ownedStocks[ticker]} {ownedShares}</div> */}
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