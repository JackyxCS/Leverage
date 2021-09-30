import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { fetchLists } from '../../store/watchlists';
import WatchListDetail from './WatchListDetail';
import WatchListModal from '../WatchListEditModal';
import styles from './WatchListDetail.module.css';

const WatchListDisplay = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const watchlists = useSelector(state => Object.values(state.lists))
    const { id: userId } = user

    useEffect(() => {
        dispatch(fetchLists())
    }, [dispatch])

    if (watchlists.length === 0) {
        return (<div className={styles.nowatchlists}>No watchlists yet!</div>)
    } else {
        return (
            <div className={styles.watchlistscontainer}>
                {!!watchlists.length && watchlists?.map((list) => {
                    return <WatchListDetail key={list.id} list={list} />
                })}
            </div>
        )
    }
}

export default WatchListDisplay