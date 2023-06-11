import React, {useState} from 'react';
import {useSelector} from "react-redux";
import User from "../components/User";
import {useParams} from "react-router-dom";

function MainPage({socket}) {

    const data = useSelector(store => store.users);
    const params = useParams();

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
                        {data.users.filter(item => item.username === Object.values(params)[0].split("/")[1]).map(el => {
                            return (
                                <div className="a-items-center">
                                    <div className="imgas">
                                        <img src={el.image} alt="Profile picture"/>
                                    </div>
                                    <h3 style={{textAlign: "center"}}>{el.username}</h3>
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