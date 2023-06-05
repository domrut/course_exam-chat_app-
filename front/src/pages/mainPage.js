import React from 'react';
import {useSelector} from "react-redux";
import User from "../components/User";
import {useParams} from "react-router-dom";
import Post from "../components/Post";

function MainPage({socket}) {

    const data = useSelector(store => store.users);
    const params = useParams();

    return (
        <>
            <h3 className="t-align-center">Users</h3>
            <div className="d-flex length" style={{margin: "0 auto"}}>
                {data.users && data.users.map((el, index) => {
                    return (<User key={index} data={el}/>)
                })}
            </div>
            {sessionStorage.getItem("username") &&
            <div>
                {data.posts && data.posts.filter(item => item.username === Object.values(params)[0].split("/")[1]).map((el, index) => {
                    return <Post socket={socket} data={el} key={index} />
                })}
            </div>
            }
        </>
    );
}

export default MainPage;