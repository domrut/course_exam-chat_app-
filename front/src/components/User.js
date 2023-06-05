import React from 'react';
import {Link} from "react-router-dom";

function User({data}) {
    return (
        <Link to={`posts/${data.username}`} className="link-style p20 m10 dydis-sm borderis d-flex j-btw f-direction">
            <div className="imgas">
                <img src={data.image} alt=""/>
            </div>
            <div>
                <h4>{data.username}</h4>
            </div>
        </Link>
    );
}

export default User;