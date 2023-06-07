import React from 'react';
import Register from "../components/Register";

function RegisterPage({socket}) {
    return (
        <Register socket={socket} />
    );
}

export default RegisterPage;