import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {Link, Route, Routes} from "react-router-dom";
import {updateUsers, updatePosts} from "./features/userReducer";
import {io} from "socket.io-client";
import {useEffect, useRef, useState} from "react";
import AuthPage from "./pages/authPage";
import MainPage from "./pages/mainPage";
import ProfilePage from "./pages/profilePage";

const socket = io("http://192.168.0.108:4000");

function App() {

    const [auth, setAuth] = useState("");
    const dispatch = useDispatch();
    const store = useSelector(store => store.users);

    useEffect(() => {
        socket.emit("downloadDB");
        socket.on("init", (data) => {
            dispatch(updateUsers(data.users))
            dispatch(updatePosts(data.posts))
        })
    }, [])

    return (
        <div className="App">
            <nav>
                <ul className="d-flex j-center">
                    <Link to="/" className="link-style"><button onClick={() => setAuth("login")}>Login</button></Link>
                    <Link to="/" className="link-style"><button onClick={() => setAuth("register")}>Register</button></Link>
                    {store.currentUser && <Link to={`/profile/${store.currentUser}`}><button>Profile</button></Link>}
                    {store.currentUser && <Link to="/mainPage"><button>Main Page</button></Link>}
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<AuthPage socket={socket} auth={auth}/>}/>
                <Route path="/mainPage/*" element={<MainPage socket={socket} />}/>
                <Route path="/profile/:username" element={<ProfilePage socket={socket} />}/>
            </Routes>
        </div>
    );
}

export default App;
