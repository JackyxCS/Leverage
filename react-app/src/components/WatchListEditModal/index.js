import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal'
import { createUpdate, fetchLists } from '../../store/watchlists';
import styles from './WatchListEditModal.module.css'

function WatchListEditModal({ listId, showEditModal, setShowEditModal }) {
    const dispatch = useDispatch()

    const [validationErrors, setValidationErrors] = useState([])
    const [watchListName, setWatchListName] = useState('')

    useEffect(() => {
        const errors = []
        if (watchListName.length === 0) errors.push('Enter a name')
        setValidationErrors(errors)
    }, [watchListName])

    const handleEditSubmit = async (e) => {
        e.preventDefault()

        if (validationErrors.length > 0) return;

        const payload = {
            listId,
            watchListName
        }

        let updatedList = await dispatch(createUpdate(payload))
        if (updatedList) {
            setWatchListName('')
            setShowEditModal(false)
            dispatch(fetchLists())
        }
    }

    return (
        <>
            {/* <button onClick={() => setShowEditModal(true)}>EDIT</button> */}
            {showEditModal && (
                <Modal onClose={() => setShowEditModal(false)}>
                    <div className={styles.editform}>
                        <form className={styles.form} onSubmit={handleEditSubmit}>
                            <input
                                className={styles.expandedinput}
                                placeholder="List Name"
                                name="watchlist"
                                value={watchListName}
                                onChange={(e) => setWatchListName(e.target.value)}
                            />
                            <button
                                className={styles.addlistbutton1}
                                type="submit"
                                disabled={validationErrors.length > 0}
                            >SAVE
                            </button>
                        </form>
                        <button
                            className={styles.addlistbutton2} onClick={() => setShowEditModal(false)}>
                            CANCEL
                        </button>
                    </div>
                </Modal>
            )}
        </>
    );
}

export default WatchListEditModal;
