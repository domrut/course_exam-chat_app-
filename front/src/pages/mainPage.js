import React, {useRef, useState} from 'react';
import {useSelector} from "react-redux";
import User from "../components/User";
import {useParams} from "react-router-dom";
import http from "../plugins/http";

function MainPage({socket}) {

    const data = useSelector(store => store.users);
    const params = useParams();
    const input = useRef();
    const sendMessage = async () => {
        const data = {
            users: [Object.values(params)[0].split("/")[1]],
            messages: [{message: input.current.value, likes: [], sender: "", timestamp: new Date()}],
            token: sessionStorage.getItem("token")
        }
        const res = await http.post("sendNewMessage", data);
        if (res.error) {
            alert(res.message);
        } else {
            input.current.value = "";
            console.log(res);
        }
    }

    return (
        <>
            <h3 className="t-align-center">Users</h3>
            <div className="d-flex">
                <div className="d-flex f-direction length">
                    {data.users && data.users.map((el, index) => {
                        return (<User key={index} data={el}/>)
                    })}
                </div>
                {Object.values(params)[0].split("/")[1] &&
                    <div className="d-flex" style={{margin: "0 auto"}}>
                        {data.users.filter(item => item.username === Object.values(params)[0].split("/")[1]).map((el, index) => {
                            return (
                                <div className="a-items-center" key={index}>
                                    <div className="imgas">
                                        <img src={el.image} alt="Profile picture"/>
                                    </div>
                                    <h3 style={{textAlign: "center"}}>{el.username}</h3>
                                    <div>
                                        <input type="text" placeholder="Send message" ref={input}/>
                                        <button onClick={sendMessage}>Send</button>
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