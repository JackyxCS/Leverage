import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { fetchCompanyDetails, fetchStockDetails, fetchStockNews } from '../../store/stocks';
import styles from './SingleStockPage.module.css'

const StockDetails = () => {
    const dispatch = useDispatch()
    // const history = useHistory()
    // const user = useSelector(state => state?.session.user)
    const key = useSelector(state => state?.key.key)
    const { stockticker } = useParams()

    const [companyDetails, setCompanyDetails] = useState({})
    const [companyFinancials, setCompanyFinancials] = useState({})
    const [companyNews, setCompanyNews] = useState([])

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
    useEffect(() => {
        dispatch(fetchStockNews(key, stockticker)).then(
            (data) => {
                setCompanyNews(data)
            }
        )
    }, [dispatch, key, stockticker])

    if (Object.values(companyDetails).length !== 0) {
        return (
            <>
                <div className={styles.headers}>About
                </div>
                <div>
                    <div className={styles.description}>
                        {companyDetails.description}
                    </div>
                    <div className={styles.companyinfo}>
                        <div className={styles.rowlabels}>
                            <div>
                                <div className={styles.labels}>CEO</div>
                                <div className={styles.details}>{companyDetails?.CEO}</div>
                            </div>
                            <div>
                                <div className={styles.labels}>Employees</div>
                                <div className={styles.details}>{parseInt(companyDetails?.employees).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
                            </div>
                            <div>
                                <div className={styles.labels}>Headquarters</div>
                                <div className={styles.details}>{companyDetails?.city}, {companyDetails?.state}</div>
                            </div>
                            <div>
                                <div className={styles.labels}>Industry</div>
                                <div className={styles.details}>{companyDetails?.industry}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.headers}>Key Statistics
                </div>
                <div className={styles.companyinfo}>
                    <div className={styles.rowlabels}>
                        <div>
                            <div className={styles.labels}>Market Cap</div>
                            <div className={styles.details}>{parseInt(companyFinancials?.marketCap).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
                        </div>
                        <div>
                            <div className={styles.labels}>Price-Earnings Ratio</div>
                            <div className={styles.details}>{companyFinancials?.peRatio}</div>
                        </div>
                        <div>
                            <div className={styles.labels}>52-Week High</div>
                            <div className={styles.details}>${companyFinancials?.week52High}</div>
                        </div>
                        <div>
                            <div className={styles.labels}>52-Week Low</div>
                            <div className={styles.details}>${companyFinancials?.week52Low}</div>
                        </div>
                    </div>
                </div>
                <div className={styles.headers}>News
                </div>
                <div className={styles.news}>
                    <div>
                        <a className={styles.eachnewsarticle} href={companyNews[0]?.url} alt="" target="_blank" rel="noreferrer">
                            <div>
                                <div className={styles.newssource}>{companyNews[0]?.source}</div>
                                <div className={styles.newsheadline}>{companyNews[0]?.headline}</div>
                                <div className={styles.newssummary}>{companyNews[0]?.summary}</div>
                            </div>
                            <div>
                                <img className={styles.image} src={companyNews[0]?.image} alt=''/>
                            </div>
                        </a>
                    </div>
                </div>
            </>
        )
    } else {
        return (<div>No details found</div>)
    }
}

export default StockDetails