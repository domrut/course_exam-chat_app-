import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import http from "../plugins/http";
import {updateCurrentUser} from "../features/userReducer";

function Login({socket, isLogged}) {

    const inputs = {
        username: useRef(),
        password: useRef(),
    }

    const [error, setError] = useState("");
    const nav = useNavigate();
    const dispatch = useDispatch();
    const loginHandle = async() => {
        if (inputs.username.current.value === "") return setError("Enter username");
        if (inputs.password.current.value === "") return setError("Enter password");

        const user = {
            username: inputs.username.current.value,
            password: inputs.password.current.value,
        };

        const res = await http.post("login", user);

        if (!res.error) {
            socket.emit("downloadDB");
            sessionStorage.setItem("token", res.user);
            sessionStorage.setItem("username",res.username);
            dispatch(updateCurrentUser(sessionStorage.getItem("username")));
            setTimeout(() => {nav("/profile")}, 500);
        } else {
            setError(res.message);
        }
    }

    return (
        <div className="d-flex f-direction dydis-sm j-center" style={{margin: "0 auto"}}>
            <input className="m10 p20" type="text" placeholder="Username" ref={inputs.username}/>
            <input className="m10 p20" type="text" placeholder="Password" ref={inputs.password}/>
            <button className="m10" onClick={loginHandle}>Login</button>
            {error !== "" ? <h4>{error}</h4> : ""}
        </div>
    );
}

export default Login;
