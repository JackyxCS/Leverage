import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router';
// import { useParams } from 'react-router-dom';
import BuyStockForm from './BuyStockForm';
import WatchListStock from './WatchListStock';
import StockDetails from './StockDetails';
import StockPageGraph from './StockPageGraph';
import styles from './SingleStockPage.module.css'

const SingleStockPage = () => {


    return (
        <div className={styles.singlestockpage1}>
            <div className={styles.singlestockpage2}>
                <div className={styles.singlestockpage3}>
                    <div className={styles.singlestockpage4}>
                        <div className={styles.singlestockpage5}>
                            <div className={styles.column1}>
                                <StockPageGraph />
                                <StockDetails />
                            </div>
                            <div className={styles.column2}>
                                <div className={styles.subcolumn1}>
                                    <BuyStockForm />
                                    <WatchListStock />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleStockPage