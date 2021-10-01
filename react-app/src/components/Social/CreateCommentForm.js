import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchComments, postComment } from '../../store/comments';
import styles from './Social.module.css'


const CreateCommentForm = () => {
    const dispatch = useDispatch();
    const { transactionId } = useParams()
    const user = useSelector(state => state.session.user)
    const { id: userId } = user

    const [comment, setComment] = useState('')
    const [validationErrors, setValidationErrors] = useState([])

    useEffect(() => {
        const errors = [];
        if (comment.length === 0) errors.push("Please leave a comment")
        setValidationErrors(errors)
    }, [comment])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            transactionId,
            userId,
            comment,
        }

        await dispatch(postComment(payload))
        setComment('')
        await dispatch(fetchComments());
    }

    return (
        <div className={styles.formelements}>
            <form className={styles.expandedform} onSubmit={handleSubmit}>
                <textarea
                    className={styles.expandedinputtextarea}
                    // placeholder="Comment"
                    name="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    className={styles.expandedbuttontextarea}
                    type="submit"
                    disabled={validationErrors.length > 0}
                >
                    COMMENT
                </button>
            </form>
        </div>
    )
}

export default CreateCommentForm