import { useState, useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordRef = useRef();

  const ctxobj = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredInputValue = emailInputRef.current.value;
    const enteredPasswordValue = emailInputRef.current.value;

    setIsLoading(true);
    if (isLogin) {
      fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBxQo5V_mKKBnFFX2JX5-IYjxmnJgs37BE", {
        method: "POST",
        body: JSON.stringify({
          email: enteredInputValue,
          password: enteredPasswordValue,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        }
        else {
          return res.json().then((data) => {
            window.alert(data.error.message);
          })
        }
      }).then((data) => {
        // console.log(data.idToken);
        ctxobj.storeToken(data.idToken);
      })
        .catch((err) => {
          console.log(err);
        })
    }
    else {
      fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBxQo5V_mKKBnFFX2JX5-IYjxmnJgs37BE", {
        method: "POST",
        body: JSON.stringify({
          email: enteredInputValue,
          password: enteredPasswordValue,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        setIsLoading(false);
        if (res.ok) {
          //... 
          return res.json();
        }
        else {
          return res.json().then((data) => {
            if (data && data.error && data.error.message) {
              window.alert(data.error.message);
            }
          })
        }
      });
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordRef} required />
        </div>
        <div className={classes.actions}>
          {/* {isLoaded ? <button>{isLogin ? 'Login' : 'Create Account'}</button> : <p>Loading...</p>} */}
          {isLoading === false ? <button>{isLogin ? 'Login' : 'Create Account'}</button> : <p>Loading....</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
