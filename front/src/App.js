import './styles/App.css';
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import {updateUsers, updatePosts} from "./features/userReducer";
import {io} from "socket.io-client";
import {useEffect, useRef, useState} from "react";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/loginPage";
import MainPage from "./pages/mainPage";
import IndexPage from "./pages/indexPage";
import ProfilePage from "./pages/profilePage";
import Toolbar from "../src/components/Toolbar";

const socket = io("http://192.168.0.108:4000");

function App() {

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
            <Toolbar />
            <Routes>
                <Route path="/" element={<IndexPage/>}/>
                <Route path="/register" element={<RegisterPage socket={socket} />}/>
                <Route path="/login" element={<LoginPage socket={socket} />}/>
                <Route path="/users/*" element={<MainPage socket={socket} />}/>
                <Route path="/profile" element={<ProfilePage socket={socket} />}/>
            </Routes>
        </div>
    );
}

export default App;
