import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
// import { getKey } from '../../store/key';
import { XAxis, YAxis, Tooltip, Line, LineChart, ReferenceLine } from 'recharts';
import { fetchStockGraph } from '../../store/stocks';
import styles from './SingleStockPage.module.css';

const StockPageGraph = () => {
    // const user = useSelector(state => state?.session.user)
    const key = useSelector(state => state?.key.key)
    const { stockticker } = useParams()
    // const { id: userId } = user
    const dispatch = useDispatch()

    const [graphObject, setGraphObject] = useState([])
    const [graphColor, setGraphColor] = useState('')
    // const [stockDetails, setStockDetails] = useState({})
    const [stockPrice, setStockPrice] = useState(0)
    const [stockPriceChange, setStockPriceChange] = useState(0)
    const [stockPercentChange, setStockPercentChange] = useState(0)

    useEffect(() => {
        dispatch(fetchStockGraph(key, stockticker)).then(
            (data) => {
                const graphArray = []
                let color = ''
                if (!data) return;
                for (let i = 0; i < data.length; i++) {
                    if ((data[i].minute[data[i].minute.length - 1] === "0" ||
                        data[i].minute[data[i].minute.length - 1] === "5") && (data[i].average !== null) && (data[i].average !== 0)) {
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
            }
        )
    }, [dispatch, key, stockticker])

    const updatePriceAction = (data) => {
        if (data === null || data.activePayload === undefined) return;
        setStockPrice(data.activePayload[0].value)
        setStockPriceChange(data.activePayload[0].value - graphObject[0].average)
        setStockPercentChange((data.activePayload[0].value / graphObject[0].average - 1) * 100)
    }

    const returnPriceAction = () => {
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

    if (graphObject.length === 0) {
        return (<div>No information found.</div>)
    } else {
        return (
            <div>
                <div>
                    <div className={styles.portfoliovalue}>{stockticker.toUpperCase()}</div>
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
                            stroke="lightslategray"
                        />
                    </LineChart>
                </div>
                <div className={styles.portfoliotime}>
                    1D
                </div>
            </div>
        )
    }
}

export default StockPageGraph