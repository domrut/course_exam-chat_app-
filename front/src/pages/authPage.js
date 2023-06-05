import React from 'react';
import Register from "../components/Register";
import Login from "../components/Login";

function AuthPage ({auth, socket}) {
    return (
        <>
            {auth === "login" && <Login socket={socket} />}
            {auth === "register" && <Register socket={socket} />}
        </>
    );
}

export default AuthPage;