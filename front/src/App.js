import './styles/App.css';
import {useDispatch} from "react-redux";
import {Route, Routes} from "react-router-dom";
import {updateUsers, updateConversations, updateConversation} from "./features/userReducer";
import {io} from "socket.io-client";
import {useEffect} from "react";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/loginPage";
import MainPage from "./pages/mainPage";
import IndexPage from "./pages/indexPage";
import ProfilePage from "./pages/profilePage";
import Toolbar from "../src/components/Toolbar";
import ConversationPage from "./pages/ConversationPage";
import ChatPage from "./pages/chatPage";

const socket = io("http://192.168.0.105:4000");

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        socket.emit("downloadDB");
        socket.on("init", (data) => {
            dispatch(updateUsers(data.users))
            dispatch(updateConversations(data.conversations))
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
                <Route path="/conversation/*" element={<ConversationPage socket={socket} />}/>
                <Route path="/chat/:id" element={<ChatPage socket={socket} />}/>
                <Route path="/profile" element={<ProfilePage socket={socket} />}/>
            </Routes>
        </div>
    );
}

export default App;
