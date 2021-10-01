import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteStock, fetchStocks } from '../../store/watchliststocks';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './WatchListDetail.module.css'

const DeleteStockForm = ({ stock }) => {
    const dispatch = useDispatch();
    const handleStockDelete = async () => {
        dispatch(deleteStock(stock.id)).then(() => {
            dispatch(fetchStocks())
        })
    }

    return (
        <div className={styles.deletediv}>
            <button className={styles.deletebutton} onClick={handleStockDelete}>
                <FontAwesomeIcon
                    icon={faTimesCircle}
                />
            </button>
        </div>
    )
}

export default DeleteStockForm