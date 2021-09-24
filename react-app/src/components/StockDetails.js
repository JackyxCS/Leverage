import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { fetchCompanyDetails, fetchStockDetails, fetchStockNews } from '../store/stocks';
import { fetchOneStockTransactions } from '../store/transactions';


const StockDetails = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state?.session.user)
    const key = useSelector(state => state?.key.key)
    const transactions = useSelector(state => Object.values(state?.transactions))
    const { stockticker } = useParams()

    const [companyDetails, setCompanyDetails] = useState({})
    const [companyFinancials, setCompanyFinancials] = useState({})
    const [companyNews, setCompanyNews] = useState({})

    useEffect(() => {
        dispatch(fetchCompanyDetails(key, stockticker)).then(
            (data) => {
                setCompanyDetails(data)
            }
        )
    }, [dispatch, key, stockticker])

    useEffect(() => {
        dispatch(fetchStockDetails(key, stockticker)).then(
            (data) => {
                setCompanyFinancials(data)
            }
        )
    }, [dispatch, key, stockticker])

    // bring back when needed (expensive fetch)
    // useEffect(() => {
    //     dispatch(fetchStockNews(key, stockticker)).then(
    //         (data) => {
    //             setCompanyNews(data)
    //         }
    //     )
    // }, [dispatch, key, stockticker])

    return (
        <div>
            <h1>About</h1>
            <div>{companyDetails.description}</div>
            <div>CEO {companyDetails.CEO}</div>
            <div>Employees {companyDetails.employees}</div>
            <div>Headquarters {companyDetails.city}, {companyDetails.state}</div>
            <div>Industry {companyDetails.industry}</div>
            <h1>Key Statistics</h1>
            <div>Market Cap {companyFinancials.marketCap}</div>
            <div>Price-Earnings Ratio {companyFinancials.peRatio}</div>
            <div>52-Week High {companyFinancials.week52High}</div>
            <div>52-Week Low {companyFinancials.week52Low}</div>
            {/* <h1>News</h1>
            <div>Headline {companyNews[0].headline}</div>
            <div>{companyNews[0].datetime}</div>
            <div>{companyNews[0].provider}</div>
            <div><img src={companyNews[0].image} /></div> */}
            <h1>History</h1>
            {transactions && transactions.map((transaction) =>
                <div key={transaction.id}>
                    <div>{transaction.datetime}</div>
                    <div>Transaction Quantity: {transaction.trans_quantity}</div>
                </div>
            )}
        </div>
    )
}

export default StockDetails