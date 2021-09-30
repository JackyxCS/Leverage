import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { fetchComments } from '../../store/comments';
import { fetchFriendRequests } from '../../store/friendrequests';
import { fetchFriends } from '../../store/friends';
import { fetchOwnedStocks } from '../../store/ownedstocks';
import { login, signUp } from '../../store/session';
import { fetchTransactions } from '../../store/transactions';
import { fetchUsers } from '../../store/users';
import { fetchLists } from '../../store/watchlists';
import styles from './LoginForm.module.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();

    const data = await dispatch(signUp(username, email, password, repeatPassword));
    console.log(data, 'DATAAAA')
    if (data) {
      setErrors(data)
    }
    if (data === null) {
      await dispatch(fetchOwnedStocks())
      await dispatch(fetchUsers())
      await dispatch(fetchLists())
      await dispatch(fetchFriends())
      await dispatch(fetchFriendRequests())
      await dispatch(fetchTransactions())
      await dispatch(fetchComments())
      // history.push('/portfolio')
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

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/portfolio' />;
  }

  return (
    <div className={styles.loginform2}>
      <form onSubmit={onSignUp}>
        <header className={styles.loginformheader}>Make Your Money Move</header>
        <div className={styles.loginform3}>
          <div className={styles.labels}>
            <label>Username</label>
          </div>
          <div>
            <input
              className={styles.inputs}
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              required={true}
            >
            </input>
          </div>
          <div className={styles.labels}>
            <label>Email</label>
          </div>
          <div>
            <input
              className={styles.inputs}
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              required={true}
            >
            </input>
          </div>
          <div className={styles.labels}>
            <label>Password</label>
          </div>
          <div>
            <input
              className={styles.inputs}
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              required={true}
            ></input>
          </div>
          <div className={styles.labels}>
            <label>Confirm Password</label>
          </div>
          <div>
            <input
              className={styles.inputs}
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            >
            </input>
          </div>
          <div className={styles.errorsdiv}>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
        </div>
        <footer className={styles.loginformfooter}>
          <button className={styles.loginbuttons1} type='submit'>Sign Up</button>
          <button className={styles.loginbuttons2} onClick={demoLogin}>Demo</button>
        </footer>
      </form>
    </div>
  );
};

export default SignUpForm;
