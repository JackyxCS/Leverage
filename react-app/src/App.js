import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/User';
import { authenticate } from './store/session';
import TransferForm from './components/Transfers/TransferForm';
import { getKey } from './store/key';
import FriendsDisplay from './components/FriendsDisplay';
import FriendRequestsTo from './components/FriendRequestsTo';
import FriendRequestsFrom from './components/FriendRequestsFrom';
import FriendRequestForm from './components/FriendRequestForm';
import FriendsFeed from './components/FriendsFeed';
import SingleTransaction from './components/SingleTransaction';
import Homepage from './components/Homepage/Homepage';
import HomepageNav from './components/Homepage/HomepageNav';
import LoginContainer from './components/auth/LoginContainer';
import SignupContainer from './components/auth/SignupContainer';
import PortfolioContainer from './components/PortfolioPage/PortfolioContainer';
import SingleStockPage from './components/StockDetails/SingleStockPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getKey())
      // await dispatch(fetchOwnedStocks())
      // await dispatch(fetchUsers())
      // await dispatch(fetchLists())
      // await dispatch(fetchFriends())
      // await dispatch(fetchFriendRequests())
      // await dispatch(fetchTransactions())
      // await dispatch(fetchComments())
      // else if (!user) {
      //   history.push('/')
      // }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true}>
          <HomepageNav />
          <Homepage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginContainer />
        </Route>
        <Route path='/signup' exact={true}>
          <SignupContainer />
        </Route>

        <ProtectedRoute path='/profile' exact={true} >
          <NavBar />
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/transfers'>
          <NavBar />
          <TransferForm />
        </ProtectedRoute>
        <ProtectedRoute path='/portfolio' exact={true} >
          <NavBar />
          <PortfolioContainer />
        </ProtectedRoute>
        <ProtectedRoute path='/stocks/:stockticker' exact={true} >
          <NavBar />
          <SingleStockPage />
        </ProtectedRoute>
        <ProtectedRoute path='/social' exact={true}>
          <NavBar />
          <div>This is the social path</div>
          <FriendRequestForm />
          <FriendsDisplay />
          <FriendRequestsTo />
          <FriendRequestsFrom />
          <FriendsFeed />
        </ProtectedRoute>
        <ProtectedRoute path='/social/:transactionId' exact={true}>
          <NavBar />
          <div>This is a transaction path where comments will be populated</div>
          <SingleTransaction />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
