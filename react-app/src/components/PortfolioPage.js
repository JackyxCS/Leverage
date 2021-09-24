import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { getKey } from '../store/key';
import { fetchStockGraph } from '../store/stocks';
import { fetchTransactions } from '../store/transactions';

const PortfolioPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state?.session.user)
    const key = useSelector(state => state?.key.key)
    // const transactions = useSelector(state => Object.values(state?.transactions))
    const { id: userId } = user

    const [ownedShares, setOwnedShares] = useState({})
    const [graphObject, setGraphObject] = useState([])
    const [stockPrice, setStockPrice] = useState(0)
    const [stockPriceChange, setStockPriceChange] = useState(0)
    const [stockPercentChange, setStockPercentChange] = useState(0)
    // const [reconstructedGraph, setReconstructedGraph] = useState([])

    //const obj = [{}]

    useEffect(() => {
        dispatch(fetchTransactions())
            .then(
                (data) => {
                    const ownedStock = {}
                    if (!data) return;
                    for (let i = 0; i < data.length; i++) {
                        let trans = data[i]
                        let ticker = trans["ticker"]
                        if (ownedStock[ticker] === undefined) {
                            ownedStock[ticker] = parseFloat(trans["trans_quantity"])
                        } else {
                            ownedStock[ticker] += parseFloat(trans["trans_quantity"])
                        }
                    }
                    setOwnedShares(ownedStock)
                    console.log(ownedShares)
                })
        // .then(
        //     () => {
        //         const graphArray = []
        //         // console.log(ownedShares)
        //         for (let stock in ownedShares) {
        //             // console.log(ownedShares[stock], 'stock')
        //             dispatch(fetchStockGraph(key, stock))
        //                 .then(
        //                     (data) => {
        //                         let obj = {}
        //                         console.log('gets here')
        //                         console.log(ownedShares)
        //                         // console.log('data', data)
        //                         // let obj = {}
        //                         obj[stock] = data
        //                         graphArray.push(obj)
        //                     }
        //                 )
        //         }
        //         // console.log(graphArray)
        //         setGraphObject(graphArray)
        //         console.log('graphobject', graphObject)
        //         console.log('graphobject', graphObject[0])
        //     })
        // .then(
        //     () => {
        //         const newArray = []
        //         console.log('modiy the object here', graphObject)
        //         for (let i = 0; i < graphObject.length; i++) {
        //             let stockObj = graphObject[i]
        //             for (let i = 0; i < stockObj.length; i++) {
        //                 stockObj[i]["value"] = stockObj[i].average * Object.values(ownedShares[i])
        //                 newArray.push(stockObj[i])
        //             }
        //         }
        //         console.log(newArray)
        //     }
        // )
    }, [dispatch])

    // useEffect(() => {
    //     // console.log(ownedShares)
    // })

    // console.log(ownedShares) {aapl: 2, tsla: 1}
    return (
        <div>A portfolio page
        </div>
    )
}

export default PortfolioPage