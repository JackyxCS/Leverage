import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments } from '../../store/comments';
import { createUpdate } from '../../store/comments';
import DeleteCommentModal from '../DeleteCommentModal/index';
import styles from './Social.module.css'

const CommentDetail = ({ comment }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const { id: userId } = user
    const transactionId = comment.transactionId
    const commentId = comment.id

    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [updatedComment, setUpdatedComment] = useState(comment?.comment)
    const [validationErrors, setValidationErrors] = useState([])

    const handleDeleteCommentClick = (e) => {
        e.preventDefault();
        setShowDeleteModal(true)
    }

    const handleEditCommentClick = (e) => {
        e.preventDefault();
        setShowEditModal(true)
    }

    useEffect(() => {
        dispatch(fetchComments())
    }, [dispatch])

    useEffect(() => {
        const errors = [];
        if (updatedComment.length === 0) errors.push("Please leave a comment")
        setValidationErrors(errors)
    }, [updatedComment])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            commentId,
            userId,
            transactionId,
            updatedComment,
        }

        let updated = await dispatch(createUpdate(payload))
        if (updated) {
            setShowEditModal(false)
            await dispatch(fetchComments())
        }
    }

    if (userId === comment.userId) {
        if (showEditModal) {
            return (
                <div className={styles.editform}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <textarea
                            className={styles.expandedinputcomment}
                            placeholder={comment.comment}
                            name="updatedComment"
                            value={updatedComment}
                            onChange={(e) => setUpdatedComment(e.target.value)}
                        />
                        <button
                            className={styles.addlistbutton1}
                            type="submit"
                            disabled={validationErrors.length > 0}
                        >
                            Submit Update
                        </button>
                    </form>
                    <form>
                        <button
                            className={styles.addlistbutton2}
                            onClick={() => setShowEditModal(false)}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )
        } else {
            return (
                <div className={styles.commentdivform}>
                    <div className={styles.friendusername}>{comment.comment}</div>
                    <div className={styles.commentuser}>{comment.user_details.username}</div>
                    <div className={styles.commentbuttondiv}>
                        <button
                            className={styles.commenteditbutton}
                            onClick={handleEditCommentClick}
                        >
                            Edit Comment
                        </button>
                        <button
                            className={styles.commenteditbuttonred}
                            onClick={handleDeleteCommentClick}
                        >
                            Delete Comment
                        </button>
                    </div>
                    {showDeleteModal && <DeleteCommentModal commentId={comment.id} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />}
                </div>
            )
        }
    } else {
        return (
            <div className={styles.commentdivform}>
                <div className={styles.friendusername}>{comment.comment}</div>
                <div className={styles.commentuser}>{comment?.user_details?.username}</div>
            </div>
        );

    }

}

export default CommentDetail