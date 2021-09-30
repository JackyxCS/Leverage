import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal'
import { useParams } from 'react-router-dom';
import { fetchLists } from '../../store/watchlists';
import { postStock } from '../../store/watchliststocks';
import styles from './WatchListStockModal.module.css'

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
        <div>
            {showAddStockModal && (
                <Modal onClose={() => setShowAddStockModal(false)}>
                    <div className={styles.editform}>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            {(watchlists).map((watchlist) => (
                                <div key={watchlist.id}>
                                    <div className={styles.watchlisttitle}>{watchlist.title}</div>
                                    <input
                                        className={styles.expandedinput}
                                        key={watchlist.id}
                                        type="radio"
                                        value={watchlist.id}
                                        checked={+watchlistId === +watchlist.id}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
                            <button
                                className={styles.addlistbutton1}
                                type="submit"
                                disabled={validationErrors.length > 0}
                            >SAVE
                            </button>
                        </form>
                        <button
                            className={styles.addlistbutton2}
                            onClick={() => setShowAddStockModal(false)}>
                            CANCEL
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default WatchListStockModal;