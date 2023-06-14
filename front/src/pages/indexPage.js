import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import "../styles/indexPage.css"

const IndexPage = () => {

    useEffect(() => {
        sessionStorage.removeItem("token");
    }, [])

    return (
        <div className="index-container">
            <div className='index-header'>
                <h1 className='first-head'>Welcome to the app!</h1>
                <h1>Let's chat!</h1>
            </div>
            <div className='index-links'>
                <div className='button-20'><Link to="/login">Login</Link></div>
                <div className='button-20 button-right'><Link to="/register">Register</Link></div>
            </div>
        </div>
    );
};

export default IndexPage;