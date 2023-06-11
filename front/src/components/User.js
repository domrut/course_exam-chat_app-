import React from 'react';
import {Link} from "react-router-dom";

function User({data}) {
    return (
        <Link to={`/users/user/${data.username}`} className="a-items-center link-style p10 m10 dydis-vsm borderis d-flex j-btw f-direction">
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