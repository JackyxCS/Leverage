import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLists, postList } from '../../store/watchlists';
import styles from './WatchListForm.module.css'

const WatchListForm = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state?.session.user)
    const { id: userId } = user

    const [watchListToggle, setWatchListToggle] = useState(false)
    const [watchList, setWatchList] = useState('')
    const [validationErrors, setValidationErrors] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validationErrors > 0) return;

        const payload = {
            userId,
            watchList
        }

        dispatch(postList(payload)).then(() => {
            dispatch(fetchLists())
        })
        setWatchListToggle(false)
        setWatchList('')
    }

    useEffect(() => {
        const errors = []
        if (watchList.length === 0) errors.push("You must enter a name")
        setValidationErrors(errors)
    }, [watchList])

    let watchlist
    if (watchListToggle) {
        watchlist = (
            <div className={styles.expandedaddlist}>
                <div>Lists</div>
                {/* <button
                    className={styles.addlistbutton}
                    onClick={() => setWatchListToggle(true)}
                >+
                </button> */}
                <form className={styles.expandedform} onSubmit={handleSubmit}>
                    <input
                        className={styles.expandedinput}
                        placeholder="List Name"
                        name="watchlist"
                        value={watchList}
                        onChange={(e) => setWatchList(e.target.value)}
                    />
                    <button
                        className={styles.expandedbutton}
                        type="submit"
                        disabled={validationErrors.length > 0}
                    >
                        Create List
                    </button>
                </form>
                <button className={styles.expandedbutton} onClick={() => setWatchListToggle(false)}>
                    Cancel
                </button>
            </div>
        )
    } else {
        watchlist = (
            <div className={styles.watchlistadd}>
                <div>Lists</div>
                <button className={styles.addlistbutton}
                    onClick={() => setWatchListToggle(true)}
                >+
                </button>
            </div>
        )
    }

    return (
        <div>
            {watchlist}
        </div>
    )
}

export default WatchListForm