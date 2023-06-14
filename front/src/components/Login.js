import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import http from "../plugins/http";
import {updateCurrentUser} from "../features/userReducer";

function Login({socket}) {

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
            dispatch(updateCurrentUser(res.username));
            nav("/profile");
        } else {
            setError(res.message);
        }
    }

    return (
        <div className="background">
            <div className="d-flex f-direction form j-center">
                <input className="m10 p20" type="text" placeholder="Username" ref={inputs.username}/>
                <input className="m10 p20" type="text" placeholder="Password" ref={inputs.password}/>
                <button className="button-20 button-right" style={{marginTop: "20px"}} onClick={loginHandle}>Login</button>
                {error !== "" ? <h4 style={{textAlign: "center"}}>{error}</h4> : ""}
            </div>
        </div>
    );
}

export default Login;
