import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { deleteStock, fetchStocks } from '../../store/watchliststocks';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './WatchListDetail.module.css'

const DeleteStockForm = ({ stock }) => {
    const dispatch = useDispatch();
    // console.log(stock)
    const handleStockDelete = async () => {
        dispatch(deleteStock(stock.id)).then(() => {
            dispatch(fetchStocks())
        })
    }

    return (
        <div className={styles.deletediv}>
            {/* <div>{stock.ticker.toUpperCase()}</div> */}
            <button className={styles.deletebutton} onClick={handleStockDelete}>
                <FontAwesomeIcon
                    icon={faTimesCircle}
                />
            </button>
        </div>
    )
}

export default DeleteStockForm