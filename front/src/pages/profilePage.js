import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import http from "../plugins/http";
import {useNavigate} from "react-router-dom";

function ProfilePage({socket}) {

    const nav = useNavigate();
    const [currentUser, setCurrentUser] = useState();
    const inputs = {
        image: useRef(),
        password: useRef(),
        username: useRef()
    };

    async function fetchData() {
        const res = await http.post("profile", {token: sessionStorage.getItem("token")});
        if (res.error) {
            sessionStorage.removeItem("token");
            nav('/login');
        } else {
            setCurrentUser(res.user);
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem("token") !== null) {
            fetchData();
        } else {
            nav('/login');
        }
    }, [])

    const updateUser = async () => {
        const user = {
            username: inputs.username.current.value,
            image: inputs.image.current.value,
            password: inputs.password.current.value,
            token: sessionStorage.getItem("token")
        }
        const res = await http.post("update", user);
        if (res.error) {
            alert(res.message);
        } else {
            setCurrentUser(res.user);
            inputs.username.current.value = "";
            inputs.image.current.value = "";
            inputs.password.current.value = "";
            if(res.token !== "") sessionStorage.setItem("token", res.token);
        }
    }

    return (
        <>
            {currentUser &&
                <div className="d-flex f-direction a-items-center">
                    <div className="d-flex f-direction p20 a-items-center">
                        <div className="imgas">
                            <img src={currentUser.image} alt="profile picture"/>
                        </div>
                        <h3>Username: {currentUser.username}</h3>
                    </div>
                    <div className="d-flex f-direction p20 a-items-center">
                        <h2>Change your user information:</h2>
                        <input className="p20 m10" type="text" ref={inputs.username} placeholder="Enter new username"/>
                        <input className="p20 m10" type="password" ref={inputs.password}
                               placeholder="Enter new password"/>
                        <input className="p20 m10" type="text" ref={inputs.image}
                               placeholder="Add new profile picture"/>
                        <button className="m10" onClick={updateUser}>Change information</button>
                    </div>
                </div>
            }
        </>
    );
}

export default ProfilePage;