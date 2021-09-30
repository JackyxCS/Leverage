import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { fetchComments } from '../../store/comments';
import { createUpdate } from '../../store/comments';
import DeleteCommentModal from '../DeleteCommentModal/index';
import styles from './Social.module.css'

const CommentDetail = ({ comment }) => {
    const dispatch = useDispatch();
    const history = useHistory();
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
                <div>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            placeholder={comment.comment}
                            name="updatedComment"
                            value={updatedComment}
                            onChange={(e) => setUpdatedComment(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={validationErrors.length > 0}
                        >
                            Submit Update
                        </button>
                    </form>
                    <form>
                        <button
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
                    <div className={styles.friendusername}>{comment.user_details.username}</div>
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
                <div className={styles.friendusername}>{comment?.user_details?.username}</div>
            </div>
        );

    }

}

export default CommentDetail