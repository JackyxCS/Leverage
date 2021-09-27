import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { getKey } from '../store/key';
import { fetchLists, postList } from '../store/watchlists';

const WatchListForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
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
            <>
                <div>
                    <div>Lists</div>
                    <button
                        onClick={() => setWatchListToggle(true)}
                    >+
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="List Name"
                        name="watchlist"
                        value={watchList}
                        onChange={(e) => setWatchList(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={validationErrors.length > 0}
                    >
                        Create List
                    </button>
                </form>
                <button onClick={() => setWatchListToggle(false)}>
                    cancel
                </button>
            </>)
    } else {
        watchlist = (
            <div>
                <div>Lists</div>
                <button
                    onClick={() => setWatchListToggle(true)}
                >+
                </button>
            </div>
        )
    }

    return (
        <div>Watchlistform
            {watchlist}
        </div>
    )
}

export default WatchListForm