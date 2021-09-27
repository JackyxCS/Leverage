import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal'
import { deleteList, fetchLists } from '../../store/watchlists';

function WatchListDeleteModal({ listId, showDeleteModal, setShowDeleteModal }) {
    const dispatch = useDispatch()

    const handleDelete = async (e) => {
        e.preventDefault();
        setShowDeleteModal(false)
        dispatch(deleteList(listId)).then(() => {
            dispatch(fetchLists())
        })
    }

    return (
        <>
            {showDeleteModal && (
                <Modal onClose={() => setShowDeleteModal(false)}>
                    <>
                        <div>
                            <button onClick={handleDelete}>CONFIRM
                            </button>
                            <button onClick={() => setShowDeleteModal(false)}>CANCEL
                            </button>
                        </div>
                    </>
                </Modal>
            )}
        </>
    );
}

export default WatchListDeleteModal;