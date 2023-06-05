import React, {useRef} from 'react';
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

function ProfilePage({socket}) {

    const params = useParams();
    const users = useSelector(state => state.users);
    const user = users.users.filter(item => item.username === params.username);
    const ref = useRef();

    const addPost = () => {
        const options = () => {
            return {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    username: sessionStorage.getItem("username"),
                    image: ref.current.value,
                    comments: [],
                    likes: []
                })
            };
        }
        fetch("http://192.168.0.108:3002/addPost", options())
            .then(res => res.json())
            .then(data => {
                console.log(data);
                socket.emit("downloadDB");
            })
    }

    return (
        <>
            {sessionStorage.getItem("username") === params.username &&
                <div className="d-flex f-direction borderis p20">
                    <div className="d-flex j-even">
                        <div className="imgas">
                            <img src={user[0].image} alt=""/>
                        </div>
                        <h2>{user[0].username}</h2>
                    </div>
                    <div className="d-flex j-center dydis-sm f-direction" style={{margin: "0 auto"}}>
                        <h2>Add Post</h2>
                        <input type="text" ref={ref} placeholder="Add image URL"/>
                        <button onClick={addPost}>Add post</button>
                    </div>
                </div>
            }
            {sessionStorage.getItem("username") !== params.username && alert("not logged in")}
        </>
    );
}

export default ProfilePage;