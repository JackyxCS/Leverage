import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal'
import { createUpdate, fetchLists } from '../../store/watchlists';

function WatchListEditModal({ listId, showEditModal, setShowEditModal }) {
    const dispatch = useDispatch()

    const [validationErrors, setValidationErrors] = useState([])
    const [watchListName, setWatchListName] = useState('')

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
                    <div>
                        <form onSubmit={handleEditSubmit}>
                            <input
                                placeholder="List Name"
                                name="watchlist"
                                value={watchListName}
                                onChange={(e) => setWatchListName(e.target.value)}
                            />
                            <button
                                type="submit"
                                disabled={validationErrors.length > 0}
                            >SAVE
                            </button>
                        </form>
                        <button onClick={() => setShowEditModal(false)}>
                            CANCEL
                        </button>
                    </div>
                </Modal>
            )}
        </>
    );
}

export default WatchListEditModal;
