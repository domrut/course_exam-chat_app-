import React from 'react';
import {useNavigate} from "react-router-dom";
import "../styles/toolbar.css"

function Toolbar() {
    const token = sessionStorage.getItem("token")
    const nav = useNavigate()

    const logout = () => {
        sessionStorage.removeItem("token");
        nav("/login");
    }
    return (
        <>
            {token &&
                <nav className="toolbar">
                    <div onClick={() => nav("/profile")}>Profile</div>
                    <div onClick={() => nav("/users")}>Users</div>
                    <div onClick={() => nav("/conversation")}>Conversation</div>
                    <div onClick={logout}>Log out</div>
                </nav>
            }
        </>
    );
}

export default Toolbar;