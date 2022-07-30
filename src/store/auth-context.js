import React from "react";

const AuthContext = React.createContext({
    token: "",
    isLoggedIn: false,
    storeToken: (token) => { },
    removeToken: () => { },
});

export default AuthContext;