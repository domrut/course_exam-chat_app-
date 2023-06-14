import React, {useRef, useState} from 'react';
import {useSelector} from "react-redux";
import User from "../components/User";
import {useParams} from "react-router-dom";
import http from "../plugins/http";

function MainPage({socket}) {

    const data = useSelector(store => store.users);
    const [error, setError] = useState("");
    const params = useParams();
    const input = useRef();

    function getTimestamp () {
        const pad = (n,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
        const d = new Date();
        return `${pad(d.getFullYear(),4)}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    }
    const sendMessage = async () => {
        setTimeout(() => {
            setError("");
        }, 2000)
        if (input.current.value === "") return setError("Enter message");
        const data = {
            users: [Object.values(params)[0].split("/")[1]],
            messages: {id: 1, message: input.current.value, likes: [], sender: "", timestamp: getTimestamp()},
            token: sessionStorage.getItem("token")
        }
        const res = await http.post("sendNewMessage", data);
        if (res.error) {
            setError(res.message);
        } else {
            input.current.value = "";
        }
    }

    return (
        <>
            <h3 className="t-align-center">Users</h3>
            <div className="d-flex responsive">
                <div className="d-flex f-direction length">
                    {data.users && data.users.filter(item => item.username !== data.currentUser).map((el, index) => {
                        return (<User key={index} data={el}/>)
                    })}
                </div>
                {Object.values(params)[0].split("/")[1] &&
                    <div className="d-flex form form-inside j-center" style={{margin: "0 auto"}}>
                        {data.users.filter(item => item.username === Object.values(params)[0].split("/")[1]).map((el, index) => {
                            return (
                                <div className="a-items-center d-flex f-direction j-even" key={index}>
                                    <div>
                                        <div className="imgas">
                                            <img src={el.image} alt="Profile picture"/>
                                        </div>
                                        <h3 style={{textAlign: "center"}}>{el.username}</h3>
                                    </div>
                                    <div className="d-flex f-direction a-items-center" style={{position: "relative"}}>
                                        <input type="text" placeholder="Send message" ref={input}/>
                                        <button className="button-20 button-color" style={{marginTop: "20px"}} onClick={sendMessage}>Send</button>
                                        {error !== "" ? <h4 style={{textAlign: "center", position: "absolute", top: "120px"}}>{error}</h4> : ""}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        </>
    );
}

export default MainPage;