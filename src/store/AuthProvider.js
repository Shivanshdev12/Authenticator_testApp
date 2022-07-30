import React, { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
    const [token, setToken] = useState(null);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const storeHandler = (id) => {
        setToken(id);
        setLoggedIn(true);
    }
    const removeHandler = () => {
        setToken(null);
        setLoggedIn(false);
    }
    const authContext = {
        token: token,
        isLoggedIn: isLoggedIn,
        storeToken: storeHandler,
        removeToken: removeHandler
    }
    return <AuthContext.Provider value={authContext}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthProvider;