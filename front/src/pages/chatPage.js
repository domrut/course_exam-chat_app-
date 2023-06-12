import React, {useEffect, useRef, useState} from 'react';
import http from "../plugins/http";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateConversation} from "../features/userReducer";

function ChatPage() {

    const dispatch = useDispatch();
    const [myUsername, setMyUsername] = useState();
    const params = useParams();
    const input = useRef();
    const data = useSelector(store => store.users);
    async function fetchData() {
        const res = await http.post("getChat", {token: sessionStorage.getItem("token"), id: params.id});
        if (res.error) {
            alert(res.message)
        } else {
            dispatch(updateConversation(res.conversation));
            setMyUsername(res.myUsername);
        }
    }

    useEffect(() => {
        fetchData();
    },[])

    const sendMessage = async () => {
        if (input.current.value === "") return;
        const res = await http.post("addMessage", {
            token: sessionStorage.getItem("token"),
            id: params.id,
            message: {message: input.current.value, likes: [], sender: myUsername, timestamp: new Date()}
        });
        if (res.error) {
            alert(res.message)
        } else {
            fetchData();
        }
    }

    return (
        <>
            <h4 style={{textAlign: "center"}}>Chat</h4>
            {data.conversation &&
                <div className="d-flex f-direction p20 m10 j-btw borderis dydis-md" style={{margin: "10px auto"}}>
                    <div>
                        {data.conversation.messages.map((el, index) => {
                            if (el.sender === myUsername) {
                                return (
                                    <div className="d-flex f-direction" key={index}>
                                        <span className="d-flex f-start pb-10">{el.sender}</span>
                                        <span className="d-flex f-start pb-10">{el.timestamp}</span>
                                        <span className="d-flex f-start">{el.message}</span>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="d-flex f-direction" key={index + "x"}>
                                        <span className="d-flex f-end pb-10">{el.sender}</span>
                                        <span className="d-flex f-end pb-10">{el.timestamp}</span>
                                        <span className="d-flex f-end">{el.message}</span>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <div className="d-flex j-btw">
                        <input className="w-200" type="text" ref={input}/>
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            }
        </>
    );
}

export default ChatPage;