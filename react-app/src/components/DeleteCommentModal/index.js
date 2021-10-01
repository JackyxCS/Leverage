import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import { deleteComment } from '../../store/comments';
import styles from './DeleteCommentModal.module.css'

function DeleteCommentModal({ commentId, showDeleteModal, setShowDeleteModal }) {

    const dispatch = useDispatch()

    const handleClick = async (e) => {
        e.preventDefault();
        setShowDeleteModal(false)
        await dispatch(deleteComment(commentId))
    }

    return (
        <>
            {showDeleteModal && (
                <Modal onClose={() => setShowDeleteModal(false)}>
                    <div className={styles.deleteform}>
                        <button className={styles.button1} onClick={handleClick}>DELETE?</button>
                        <button className={styles.button2} onClick={() => setShowDeleteModal(false)}>
                            CANCEL
                        </button>
                    </div>
                </Modal>
            )
            }
        </>
    );
}

export default DeleteCommentModal;