import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { fetchLists } from '../store/watchlists';
import { fetchStocks } from '../store/watchliststocks';
import WatchListStockModal from './WatchListStockModal';

const WatchListStock = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { stockticker } = useParams()
    const user = useSelector(state => state.session.user);
    const watchlists = useSelector(state => Object.values(state.lists));
    const stocks = useSelector(state => Object.values(state.stocks))
    // filtered for stock relevant to the stock page
    const filtered_stocks = stocks.filter(stock => stock.ticker === stockticker)
    const filtered_array = []
    for (let i = 0; i < filtered_stocks.length; i++) {
        filtered_array.push(filtered_stocks[i].watchListId)
    }
    // need to filter watchlists stocks are already on here (filtered lists)
    const filtered_lists = watchlists.filter(watchlist => !filtered_array.includes(+watchlist.id))
    const { id: userId } = user

    const [showAddStockModal, setShowAddStockModal] = useState(false)

    useEffect(() => {
        dispatch(fetchLists())
        dispatch(fetchStocks())
    }, [dispatch])

    const handleAddStockClick = (e) => {
        e.preventDefault();
        setShowAddStockModal(true)
    }

    if (filtered_lists.length > 0) {
        return (
            <>
                <div>
                    <button onClick={handleAddStockClick}>ADD TO WATCHLIST</button>
                </div>
                {showAddStockModal && <WatchListStockModal watchlists={filtered_lists} showAddStockModal={showAddStockModal} setShowAddStockModal={setShowAddStockModal} />}
            </>
        )
    } else {
        return (
            <div>Added to watchlists</div>
        )
    }
}

export default WatchListStock