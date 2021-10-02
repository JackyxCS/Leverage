import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLists } from '../../store/watchlists';
import WatchListDetail from './WatchListDetail';
import styles from './WatchListDetail.module.css';

const WatchListDisplay = () => {
    const dispatch = useDispatch()
    const watchlists = useSelector(state => Object.values(state.lists))

    useEffect(() => {
        dispatch(fetchLists())
    }, [dispatch])

    if (watchlists.length === 0) {
        return (<div className={styles.nowatchlists}>No watchlists yet!</div>)
    } else {
        return (
            <div className={styles.watchlistscontainer}>
                {!!watchlists.length && watchlists?.map((list, index) => (
                    <WatchListDetail key={index} list={list} />
                ))}
            </div>
        )
    }
}

export default WatchListDisplay