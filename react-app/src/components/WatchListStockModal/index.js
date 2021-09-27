import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal'
import { useParams } from 'react-router-dom';
import { fetchLists } from '../../store/watchlists';
import { postStock } from '../../store/watchliststocks';

function WatchListStockModal({ watchlists, showAddStockModal, setShowAddStockModal }) {
    const dispatch = useDispatch()
    const { stockticker } = useParams()

    const [validationErrors, setValidationErrors] = useState([])
    const [watchlistId, setWatchlistId] = useState(watchlists[0].id)

    useEffect(() => {
        dispatch(fetchLists())
    }, [dispatch])

    useEffect(() => {
        const errors = [];
        if (!watchlistId) errors.push("Select a watchlist")
        setValidationErrors(errors)
    }, [watchlistId])

    const handleChange = (e) => {
        setWatchlistId(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (validationErrors > 0) return

        const payload = {
            watchlistId,
            stockticker
        }

        await dispatch(postStock(payload))
        setShowAddStockModal(false)
    }

    return (
        <div>Modal is here
            {showAddStockModal && (
                <Modal onClose={() => setShowAddStockModal(false)}>
                    <form onSubmit={handleSubmit}>
                        {(watchlists).map((watchlist) => (
                            <div key={watchlist.id}>
                            <div>{watchlist.title}</div>
                            <input
                                key={watchlist.id}
                                type="radio"
                                value={watchlist.id}
                                checked={watchlistId == watchlist.id}
                                onChange={handleChange}
                            />
                            </div>
                        ))}
                        <button
                            type="submit"
                            disabled={validationErrors.length > 0}
                        >SAVE
                        </button>
                    </form>
                    <button onClick={() => setShowAddStockModal(false)}>
                        CANCEL
                    </button>
                </Modal>
            )}
        </div>
    )
}

export default WatchListStockModal;