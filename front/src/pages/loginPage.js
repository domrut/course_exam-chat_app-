import React from 'react';
import Login from "../components/Login";

function LoginPage({socket}) {
    return (
        <Login socket={socket} />
    );
}

export default LoginPage;