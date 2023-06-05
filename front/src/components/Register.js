import React, {useRef} from 'react';

function Register({socket}) {

    const inputs = {
        username: useRef(),
        password: useRef(),
        password1: useRef(),
        image: useRef()
    }

    const options = () => {
        return {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username: inputs.username.current.value,
                password: inputs.password.current.value,
                image: inputs.image.current.value
            })
        };
    }
    const registerHandle = () => {
        if ((inputs.password.current.value === inputs.password1.current.value) && inputs.username.current.value !== "") {
            fetch("http://192.168.0.108:3002/register", options())
                .then(res => res.json())
                .then(data => {
                    socket.emit("downloadDB");
                    console.log(data);
                })
        }
    }

    return (
        <div className="d-flex f-direction dydis-sm j-center" style={{margin: "0 auto"}}>
            <input className="m10 p20" type="text" placeholder="Image" ref={inputs.image}/>
            <input className="m10 p20" type="text" placeholder="Username" ref={inputs.username}/>
            <input className="m10 p20" type="text" placeholder="Password" ref={inputs.password}/>
            <input className="m10 p20" type="text" placeholder="Repeat password" ref={inputs.password1}/>
            <button className="m10" onClick={registerHandle}>Register</button>
        </div>
    );
}

export default Register;