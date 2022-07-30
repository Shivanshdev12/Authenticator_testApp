import { useContext } from "react";
import { Link } from 'react-router-dom';
import AuthContext from "../../store/auth-context";
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const ctxobj = useContext(AuthContext);
  const logoutHandler = () => {
    ctxobj.removeToken();
    //optional : redirect
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!ctxobj.isLoggedIn && <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {ctxobj.isLoggedIn && <li>
            <Link to='/profile'>Profile</Link>
          </li>}
          {ctxobj.isLoggedIn && <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
