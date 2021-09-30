import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FriendRequestForm from './FriendRequestForm';
import FriendRequestsFrom from './FriendRequestsFrom';
import FriendRequestsTo from './FriendRequestsTo';
import FriendsDisplay from './FriendsDisplay';
import FriendsFeed from './FriendsFeed';
import styles from './Social.module.css';

const SocialContainer = () => {
    return (
        <div className={styles.socialpage1}>
            <div className={styles.socialpage2}>
                <div className={styles.socialpage3}>
                    <div className={styles.socialpage4}>
                        <div className={styles.socialpage5}>
                            <div className={styles.column2}>
                                <div className={styles.subcolumn2}>
                                    <FriendRequestForm />
                                    <FriendsDisplay />
                                    <FriendRequestsTo />
                                    <FriendRequestsFrom />
                                </div>
                            </div>
                            <div className={styles.column1}>
                                <FriendsFeed />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SocialContainer