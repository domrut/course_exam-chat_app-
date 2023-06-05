import React, {useRef} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateCurrentUser} from "../features/userReducer";

function Login({socket, isLogged}) {

    const inputs = {
        username: useRef(),
        password: useRef(),
    }
    const nav = useNavigate();
    const dispatch = useDispatch();
    const options = () => {
        return {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username: inputs.username.current.value,
                password: inputs.password.current.value
            })
        };
    }
    const loginHandle = () => {
        if (inputs.username.current.value !== "") {
            fetch("http://192.168.0.108:3002/login", options())
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.error) return alert(data.message);
                    socket.emit("downloadDB");
                    sessionStorage.setItem("token", data.user);
                    sessionStorage.setItem("username", data.username);
                    dispatch(updateCurrentUser(sessionStorage.getItem("username")))
                    setTimeout(() => {nav("/mainPage")}, 500);
                })
        }
    }

    return (
        <div className="d-flex f-direction dydis-sm j-center" style={{margin: "0 auto"}}>
            <input className="m10 p20" type="text" placeholder="Username" ref={inputs.username}/>
            <input className="m10 p20" type="text" placeholder="Password" ref={inputs.password}/>
            <button className="m10" onClick={loginHandle}>Login</button>
        </div>
    );
}

export default Login;
