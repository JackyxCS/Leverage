import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { deleteStock, fetchStocks } from '../store/watchliststocks';

const DeleteStockForm = ({ stock }) => {
    const dispatch = useDispatch();
    console.log(stock)
    const handleStockDelete = async() => {
        dispatch(deleteStock(stock.id)).then(() => {
            dispatch(fetchStocks())
        })
    }

    return (
        <div>
            <div>{stock.ticker.toUpperCase()}</div>
            <button onClick={handleStockDelete}>DELETE</button>
        </div>
    )
}

export default DeleteStockForm