import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { fetchStocks } from '../store/watchliststocks';
import DeleteStockForm from './DeleteStockForm';
import WatchListDeleteModal from './WatchListDeleteModal';
import WatchListEditModal from './WatchListEditModal';

const WatchListDetail = ({ list }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const { id: userId } = user
    // console.log(list)
    const stocks = useSelector(state => Object.values(state.stocks))
    // console.log(stocks)
    const filtered_stocks = stocks.filter(stock => Number(stock.watchListId) === Number(list.id))
    // console.log(filtered_stocks, 'filtered_stocks')

    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const handleDeleteListClick = (e) => {
        e.preventDefault();
        setShowDeleteModal(true)
    }

    const handleEditListClick = (e) => {
        e.preventDefault();
        setShowEditModal(true)

    }

    useEffect(() => {
        dispatch(fetchStocks())
    }, [dispatch])

    return (
        <>
            <div>
                <div>{list.title}</div>
                {filtered_stocks.map((stock) => {
                    return <DeleteStockForm key={stock.id} stock={stock} />
                })}
                <button onClick={handleEditListClick}>
                    Edit
                </button>
                <button onClick={handleDeleteListClick}>
                    Delete
                </button>
            </div>
            {showDeleteModal && <WatchListDeleteModal listId={list.id} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />}
            {showEditModal && <WatchListEditModal listId={list.id} showEditModal={showEditModal} setShowEditModal={setShowEditModal} />}
        </>
    )
}

export default WatchListDetail