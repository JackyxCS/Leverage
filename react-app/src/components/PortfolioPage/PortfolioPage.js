import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { NavLink, useParams } from 'react-router-dom';
import { getKey } from '../../store/key';
import { fetchOwnedStocks } from '../../store/ownedstocks';
import { fetchPortfolioStocks, fetchStockGraph, fetchStockNews } from '../../store/stocks';
import { XAxis, YAxis, Tooltip, Line, LineChart, ReferenceLine } from 'recharts';
import { fetchTransactions } from '../../store/transactions';
import { fetchUsers } from '../../store/users';
import { fetchLists } from '../../store/watchlists';
import { fetchFriends } from '../../store/friends';
import { fetchFriendRequests } from '../../store/friendrequests';
import { fetchComments } from '../../store/comments';
import styles from './PortfolioContainer.module.css'

const PortfolioPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state?.session.user)
    const key = useSelector(state => state?.key.key)
    const ownedStocks = useSelector(state => state?.owned)
    const ownedtickers = Object.keys(ownedStocks)
    const { id: userId } = user

    const [ownedShares, setOwnedShares] = useState({})
    const [graphObject, setGraphObject] = useState([])
    const [graphColor, setGraphColor] = useState('')
    const [stockPrice, setStockPrice] = useState(0)
    const [stockPriceChange, setStockPriceChange] = useState(0)
    const [stockPercentChange, setStockPercentChange] = useState(0)
    const [homePageNews, setHomePageNews] = useState([])

    useEffect(() => {
        dispatch(fetchTransactions())
        dispatch(fetchLists())
        dispatch(fetchOwnedStocks())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchStockNews(key, 'aapl')).then((data) => {
            setHomePageNews(data)
        })
    }, [key, dispatch])

    useEffect(() => {
        dispatch(fetchPortfolioStocks(key, ownedStocks, user.balance))
            .then(
                (data) => {
                    const graphArray = []
                    let color = ''
                    if (!data) return;
                    for (let i = 0; i < data.length; i++) {
                        if ((data[i].minute[data[i].minute.length - 1] === "0" ||
                            data[i].minute[data[i].minute.length - 1] === "5") &&
                            (data[i].average !== null)
                            && (data[i].average !== 0)) {
                            graphArray.push(data[i])
                        }
                    }
                    if (!graphArray || graphArray.length === 0) return;
                    if (graphArray[graphArray.length - 1].average < graphArray[0].average) {
                        color = '#FF5000'
                    } else {
                        color = "#00C805"
                    }
                    setGraphObject(graphArray)
                    setGraphColor(color)
                    setStockPrice(graphArray[graphArray.length - 1].average)
                    setStockPriceChange(graphArray[graphArray.length - 1].average -
                        graphArray[0].average)
                    setStockPercentChange((graphArray[graphArray.length - 1].average /
                        graphArray[0].average - 1) * 100)
                    console.log(graphObject[0], 'object[0]')
                }
            )
    }, [dispatch, key, ownedStocks, user, graphObject])

    const updatePriceAction = (data) => {
        if (data === null || !data.activePayload || data.activePayload === undefined) return;
        setStockPrice(data.activePayload[0].value)
        setStockPriceChange(data.activePayload[0].value - graphObject[0].average)
        setStockPercentChange((data.activePayload[0].value / graphObject[0].average - 1) * 100)
    }

    const returnPriceAction = () => {
        if (!graphObject) return;
        setStockPrice(graphObject[graphObject.length - 1].average)
        setStockPriceChange(graphObject[graphObject.length - 1].average -
            graphObject[0].average)
        setStockPercentChange((graphObject[graphObject.length - 1].average /
            graphObject[0].average - 1) * 100)
    }

    function CustomTooltip({ payload }) {
        if (!payload || payload.length === 0) return (<></>)
        return (
            <div>
                {payload[0].payload.label}
            </div>
        )
    }

    if (Object.keys(ownedStocks).length === 0 || graphObject.length === 0) {
        return (<div>
            Make a <NavLink to={'/transfers'}>deposit</NavLink> and
            search for a stock to purchase to get started!
        </div>)
    } else {
        return (
            <div className={styles.leftcontainer}>
                <div>
                    <div className={styles.portfoliovalue}>${stockPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className={styles.portfoliochange}>${stockPriceChange.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({stockPercentChange.toFixed(2)}%) Today</div>
                    <LineChart
                        data={graphObject}
                        width={700}
                        height={400}
                        onMouseMove={(data) => updatePriceAction(data)}
                        onMouseLeave={() => returnPriceAction()}
                    >
                        <Tooltip
                            offset={0}
                            content={<CustomTooltip />}
                            position={{ y: -20 }}
                        />
                        <XAxis dataKey="label" hide={true} />
                        <YAxis hide={true} domain={['dataMin', 'dataMax']} />
                        <Line type="monotone"
                            dataKey="average"
                            stroke={graphColor}
                            dot={false}
                            strokeWidth={2}
                        />
                        <ReferenceLine
                            y={graphObject[0].average}
                            strokeWidth={1.5}
                            strokeHeight={1.5}
                            strokeDasharray="1 6"
                            stroke="lightslategray" />
                    </LineChart>
                </div>
                {/* <div>
                    {ownedtickers.map((ticker) => (
                        <div key={ticker}>
                            <div>{ticker.toUpperCase()}</div>
                            <div>{ownedStocks[ticker]} Shares</div>
                        </div>
                    ))}
                </div> */}
                <div className={styles.portfoliotime}>
                    1D
                </div>
                <div className={styles.buyingpower}>
                    <div>Buying Power</div>
                    <div>${parseFloat((user.balance)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
                <div className={styles.newstext}>News</div>
                <div className={styles.news}>
                    <div>
                        <a className={styles.eachnewsarticle} href={homePageNews[0].url} alt="" target="_blank" rel="noreferrer">
                            <div>
                                <div className={styles.newssource}>{homePageNews[0].source}</div>
                                <div className={styles.newsheadline}>{homePageNews[0].headline}</div>
                                <div className={styles.newssummary}>{homePageNews[0].summary}</div>
                            </div>
                            {/* <div>{Date((homePageNews[0].datetime))}</div> */}
                            {/* <div>{homePageNews[0].provider}</div> */}
                            <div>
                                <img className={styles.image} src={homePageNews[0].image} alt="" />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default PortfolioPage