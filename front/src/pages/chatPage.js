import React, {useEffect, useRef, useState} from 'react';
import http from "../plugins/http";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateConversation, updateConversations} from "../features/userReducer";

function ChatPage({socket}) {

    const dispatch = useDispatch();
    const [myUsername, setMyUsername] = useState();
    const params = useParams();
    const inputs = {
        message: useRef(),
        username: useRef()
    };
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

    const getTimestamp = () => {
        const pad = (n,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
        const d = new Date();
        return `${pad(d.getFullYear(),4)}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    }

    const likeMessage = async(index) => {
        console.log(index, params.id);
        const res = await http.post("addLike", {
            token: sessionStorage.getItem("token"),
            id: params.id,
            messageID: index
        });
    }

    useEffect(() => {
        fetchData();
    },[])

    const sendMessage = async () => {
        if (inputs.message.current.value === "") return;
        const res = await http.post("addMessage", {
            token: sessionStorage.getItem("token"),
            id: params.id,
            message: {id: data.conversation.messages.length, message: inputs.message.current.value, likes: [], sender: myUsername, timestamp: getTimestamp()}
        });
        if (res.error) {
            alert(res.message)
        } else {
            fetchData();
            inputs.message.current.value = "";
        }
    }

    const addUser = async () => {
        if (inputs.username.current.value === "") return;
        const res = await http.post("addUser", {
            token: sessionStorage.getItem("token"),
            username: inputs.username.current.value,
            id: params.id
        });
        if (res.error) {
            alert(res.message)
        } else {
            fetchData();
            inputs.username.current.value = "";
        }
    }

    return (
        <div className="background" style={{paddingTop: "50px"}}>
            <h4 style={{textAlign: "center"}}>Chat</h4>
            {data.conversation &&
                <div className="d-flex f-direction chatPage p20 m10 j-btw borderis dydis-md" style={{margin: "10px auto"}}>
                    <div style={{overflowX: "hidden", overflowY: "scroll", marginBottom: "20px"}}>
                        {data.conversation.messages.map((el, index) => {
                            if (el.sender === myUsername) {
                                return (
                                    <div className="d-flex f-direction pb-10" key={index}>
                                        <span className="d-flex sender f-start">{el.sender}</span>
                                        <span className="d-flex message f-start">{el.message}</span>
                                        <span className="d-flex timestamp f-start">{el.timestamp}</span>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="d-flex f-direction pb-10" key={index + "x"}>
                                        <span className="d-flex sender f-end">{el.sender}</span>
                                        <span onClick={() => likeMessage(index)} className="d-flex message f-end" style={{marginLeft: "auto"}}>{el.message}</span>
                                        <span className="d-flex timestamp f-end">{el.timestamp}</span>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <div className="d-flex j-btw f-direction">
                        <div style={{marginBottom: "20px"}} className={"d-flex j-btw"}>
                            <input className="w-200" type="text" placeholder="Enter username" ref={inputs.username}/>
                            <button className="button-color button-20" onClick={addUser}>Add user</button>
                        </div>
                        <div className={"d-flex j-btw"}>
                            <input className="w-200" type="text" placeholder="Type your message" ref={inputs.message}/>
                            <button className="button-color button-20" onClick={sendMessage}>Send</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default ChatPage;