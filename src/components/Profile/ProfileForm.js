import { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const ctxobj = useContext(AuthContext);
  const newPassword = useRef();
  const history = useHistory();
  const changeHandler = (e) => {
    e.preventDefault();
    const enteredPasswordValue = newPassword.current.value;
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBxQo5V_mKKBnFFX2JX5-IYjxmnJgs37BE", {
      method: "POST",
      body: JSON.stringify({
        idToken: ctxobj.token,
        password: enteredPasswordValue,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      }
    }).then(res => {
      history.replace("/");
    });
  }
  return (
    <form className={classes.form} onSubmit={changeHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPassword} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
