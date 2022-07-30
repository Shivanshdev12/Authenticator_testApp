import AuthContext from './store/auth-context';
import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthProvider from './store/AuthProvider';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  const ctxobj = useContext(AuthContext);
  return (
    <AuthProvider>
      <Layout>
        <Switch>
          <Route path='/' exact>
            <HomePage />
          </Route>
          {!ctxobj.isLoggedIn && (<Route path='/auth'>
            <AuthPage />
          </Route>)}
          <Route path="/profile">
            {ctxobj.isLoggedIn && <UserProfile />}
            {!ctxobj.isLoggedIn && <Redirect to="/auth" />}
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Layout>
    </AuthProvider>
  );
}

export default App;
