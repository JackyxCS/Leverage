import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchComments } from '../../store/comments';
import { fetchFriendRequests } from '../../store/friendrequests';
import { fetchFriends } from '../../store/friends';
import { fetchOwnedStocks } from '../../store/ownedstocks';
import { login } from '../../store/session';
import { fetchTransactions } from '../../store/transactions';
import { fetchUsers } from '../../store/users';
import { fetchLists } from '../../store/watchlists';
import styles from './LoginForm.module.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data === null) {
      await dispatch(fetchOwnedStocks())
      await dispatch(fetchUsers())
      await dispatch(fetchLists())
      await dispatch(fetchFriends())
      await dispatch(fetchFriendRequests())
      await dispatch(fetchTransactions())
      await dispatch(fetchComments())
    }
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault()
    const email = 'demo@aa.io'
    const password = 'password'
    const data = await dispatch(login(email, password));
    if (data === null) {
      await dispatch(fetchOwnedStocks())
      await dispatch(fetchUsers())
      await dispatch(fetchLists())
      await dispatch(fetchFriends())
      await dispatch(fetchFriendRequests())
      await dispatch(fetchTransactions())
      await dispatch(fetchComments())
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/portfolio' />;
  }

  return (
    <div className={styles.loginform2}>
      <form onSubmit={onLogin}>
        <header className={styles.loginformheader}>Welcome to Leverage</header>
        <div className={styles.loginform3}>
          <div className={styles.labels}>
            <label htmlFor='email'>Email</label>
          </div>
          <div>
            <input
              className={styles.inputs}
              name='email'
              type='text'
              placeholder=''
              value={email}
              onChange={updateEmail}
              required={true}
            />
          </div>
          <div className={styles.labels}>
            <label htmlFor='password'>Password</label>
          </div>
          <div>
            <input
              className={styles.inputs}
              name='password'
              type='password'
              placeholder=''
              value={password}
              onChange={updatePassword}
              required={true}
            />
          </div>
          <div className={styles.errorsdiv}>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
        </div>
        <footer className={styles.loginformfooter}>
          <button className={styles.loginbuttons1} type='submit'>Login</button>
          <button className={styles.loginbuttons2} onClick={demoLogin}>Demo</button>
        </footer>
      </form>
    </div>
  );
};

export default LoginForm;
