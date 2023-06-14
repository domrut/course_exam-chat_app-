import React, {useEffect, useState} from 'react';
import http from "../plugins/http";
import {useDispatch, useSelector} from "react-redux";
import {updateConversations} from "../features/userReducer";
import {Link} from "react-router-dom";

function ConversationPage({socket}) {

    const [conversations, setConversations] = useState();
    async function fetchData() {
        const res = await http.post("getMessages", {token: sessionStorage.getItem("token")});
        if (res.error) {
            alert(res.message)
        } else {
            setConversations(res.conversations);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const deleteConversation = async(id) => {
        const res = await http.post("deleteConversation", {token: sessionStorage.getItem("token"), id: id});
        if (res.error) {
            alert(res.message)
        } else {
            fetchData();
        }
    }

    return (
        <div className="d-flex f-direction">
            <h3 style={{textAlign: "center"}}>Conversations</h3>
            <div className="d-flex f-direction">
                {conversations && conversations.map((el, index) => {
                    return (
                        <div className="p20 borderis chat m10 dydis-sm" key={index}>
                            <Link className={`${el._id} link-style`} key={index} to={`/chat/${el._id}`}>
                                <h4>Chat members: {el.users.join(", ")}</h4>
                                <p>Last message: {el.messages[el.messages.length - 1].message}</p>
                            </Link>
                            <button className="button-20 button-color" onClick={() => deleteConversation(el._id)}>Delete</button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default ConversationPage;