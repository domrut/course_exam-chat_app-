import React, {useRef, useState} from 'react';
import http from "../plugins/http";
import {useNavigate} from "react-router-dom";

function Register({socket}) {

    const inputs = {
        username: useRef(),
        password: useRef(),
        password1: useRef(),
        image: useRef()
    }

    const nav = useNavigate();
    const [error, setError] = useState("");

    const registerHandle = async () => {
        if (inputs.username.current.value === "") return setError("Enter username");
        if (inputs.image.current.value === "") return setError("Add image");
        if (inputs.password.current.value === "") return setError("Enter password");
        const user = {
            username: inputs.username.current.value,
            password: inputs.password.current.value,
            image: inputs.image.current.value
        };

        if ((inputs.password.current.value === inputs.password1.current.value) && inputs.username.current.value !== "") {
            const res = await http.post("register", user);
            if (!res.error) {
                socket.emit("downloadDB");
                nav("/login");
            } else {
                setError(res.message);
            }
        } else {
            setError("Passwords do not match")
        }
    }

    return (
        <div className="background">
            <div className="d-flex f-direction form dydis-md j-center">
                <input className="m10 p20" type="text" placeholder="Image" ref={inputs.image}/>
                <input className="m10 p20" type="text" placeholder="Username" ref={inputs.username}/>
                <input className="m10 p20" type="text" placeholder="Password" ref={inputs.password}/>
                <input className="m10 p20" type="text" placeholder="Repeat password" ref={inputs.password1}/>
                <button className="m10 button-20 button-right" style={{marginTop: "20px"}} onClick={registerHandle}>Register</button>
                {error !== "" ? <h4 style={{textAlign: "center"}}>{error}</h4> : ""}
            </div>
        </div>
    );
}

export default Register;