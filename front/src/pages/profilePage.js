import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import http from "../plugins/http";
import {useNavigate} from "react-router-dom";

function ProfilePage({socket}) {

    const nav = useNavigate();
    const ref = useRef();
    const [user, setUser] = useState();

    const addPost = async () => {

    }

    useEffect(() => {
        async function fetchData() {
            const res = await http.post("profile", {token: sessionStorage.getItem("token")});
            console.log(res);
            if (res.error) {
                sessionStorage.removeItem("token");
                nav('/login');
            } else {
                setUser(res.user);
            }
        }
        if (sessionStorage.getItem("token") !== null) {
            fetchData();
        } else {
            nav('/login');
        }
    }, [])

    return (
        <>
            {user &&
                <div>
                    <h3>{user.username}</h3>
                    <h3>{user.image}</h3>
                </div>}
        </>
    );
}

export default ProfilePage;