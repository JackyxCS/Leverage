import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router';
import WatchListDisplay from './WatchListDisplay';
import WatchListForm from './WatchListForm';
import PortfolioPage from './PortfolioPage';
import styles from './PortfolioContainer.module.css'
import OwnedTicker from './OwnedTickers';
import { fetchTransactions } from '../../store/transactions';

const PortfolioContainer = () => {
    const dispatch = useDispatch()
    const ownedStocks = useSelector(state => state?.owned)
    const ownedtickers = Object.keys(ownedStocks)

    useEffect(() => {
        (async () => {
            await dispatch(fetchTransactions());
        })();
    }, [dispatch])

    return (
        <div className={styles.portfoliopage}>
            <div className={styles.portfoliopage2}>
                <div className={styles.portfoliopage3}>
                    <div className={styles.portfoliopage4}>
                        <PortfolioPage />
                        <div className={styles.sidebar}>
                            <div className={styles.sidebar2}>
                                <div className={styles.stockstext}>Stocks</div>
                                <div className={styles.ownedtickers}>
                                    {ownedtickers.map((ticker) => (
                                        <OwnedTicker key={ticker} ticker={ticker} />
                                    ))}
                                </div>
                                <WatchListForm />
                                <WatchListDisplay />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PortfolioContainer