import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal'
import { deleteList, fetchLists } from '../../store/watchlists';
import styles from './WatchListDeleteModal.module.css'

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
                        <div className={styles.deleteform}>
                            <button className={styles.addlistbutton1} onClick={handleDelete}>CONFIRM
                            </button>
                            <button className={styles.addlistbutton2} onClick={() => setShowDeleteModal(false)}>CANCEL
                            </button>
                        </div>
                    </>
                </Modal>
            )}
        </>
    );
}

export default WatchListDeleteModal;