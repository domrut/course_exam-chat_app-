import React, {useRef} from 'react';
import {useSelector} from "react-redux";

function Post({data, socket}) {

    const ref = useRef();
    const store = useSelector(store => store.users);
    const addComment = (id) => {
        const options = () => {
            return {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    username: store.currentUser,
                    comment: ref.current.value,
                })
            };
        }
        fetch("http://192.168.0.108:3002/addComment", options())
            .then(res => res.json())
            .then(data => {
                console.log(data);
                socket.emit("downloadDB");
            })
        ref.current.value = "";
    }

    const addLike = (id) => {
        const options = () => {
            return {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    username: store.currentUser
                })
            };
        }
        fetch("http://192.168.0.108:3002/addLike", options())
            .then(res => res.json())
            .then(data => {
                console.log(data);
                socket.emit("downloadDB");
            })
    }

    return (
        <div className="d-flex borderis j-even p20">
            <div className="imgas-big">
                <img src={data.image} alt=""/>
            </div>
            <div className="d-flex f-direction">
                <h3>{data.likes.length}</h3>
                {data.comments.map((el, index) => {
                    return <p key={index}>{el.user}: {el.comment}</p>
                })}
                <input type="text" ref={ref}/>
                <button onClick={() => addComment(data._id)}>Add comment</button>
                <button onClick={() => addLike(data._id)}>Like post</button>
            </div>
        </div>
    );
}

export default Post;