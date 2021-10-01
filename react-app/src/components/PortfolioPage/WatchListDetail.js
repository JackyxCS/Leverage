import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchStocks } from '../../store/watchliststocks';
import DeleteStockForm from './DeleteStockForm';
import WatchedTickers from './WatchedTickers';
import WatchListDeleteModal from '../WatchListDeleteModal';
import WatchListEditModal from '../WatchListEditModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './WatchListDetail.module.css'


const WatchListDetail = ({ list }) => {
    const dispatch = useDispatch();
    const stocks = useSelector(state => Object.values(state.stocks))
    const filtered_stocks = stocks.filter(stock => Number(stock.watchListId) === Number(list.id))

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
        <div>
            <div className={styles.eachlist}>
                <div className={styles.listtitle}>{list.title}
                </div>
                <div>
                    <button className={styles.pencilbutton} onClick={handleEditListClick}>
                        <FontAwesomeIcon
                            icon={faPencilAlt}
                        />
                    </button>
                    <button className={styles.trashbutton} onClick={handleDeleteListClick}>
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                        />
                    </button>
                </div>
            </div>
            <div className={styles.eachliststock}>
                <div>
                    {filtered_stocks.map((stock) => (
                        <div key={stock.id} className={styles.detaildiv}>
                            <NavLink className={styles.navlink} to={`/stocks/${stock.ticker}`}>
                                <WatchedTickers ticker={stock.ticker} />
                            </NavLink>
                            <DeleteStockForm key={stock.id} stock={stock} />
                        </div>
                    ))}
                </div>
                {/* <div>
                    {filtered_stocks.map((stock) => {
                        return <DeleteStockForm key={stock.id} stock={stock} />
                    })}
                </div> */}
            </div>
            {showDeleteModal && <WatchListDeleteModal listId={list.id} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />}
            {showEditModal && <WatchListEditModal list={list} listId={list.id} showEditModal={showEditModal} setShowEditModal={setShowEditModal} />}
        </div >
    )
}

export default WatchListDetail