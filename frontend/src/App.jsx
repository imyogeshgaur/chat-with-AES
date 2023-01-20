import Chat from "./chat/chat";
import Process from "./process/process";
import {useRoutes} from 'react-router';
import { Routes,Route} from "react-router-dom";
import "./app.scss";
import React, { Suspense } from "react";
import io from "socket.io-client";
import Homepage from "./home/home";
const socket = io.connect('http://localhost:8000');

function Appmain(props) {
  return (
    <>
      <div className="right">
        <Chat
          username={props.match.params.username}
          roomname={props.match.params.roomname}
          socket={socket}
        />
      </div>
      <div className="left">
        <Process />
      </div>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />}/>
      <Route exact path="/chat/:roomname/:username" element={<Appmain />}/>
    </Routes>
  );
}

export default App;