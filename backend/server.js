const express = require("express");
const app = express();
const socket = require("socket.io");
const cors = require("cors");
const { get_Current_User, user_Disconnect, join_User } = require("./dummyuser.js");

app.use(express());

const port = process.env.PORT||8000;

app.use(cors({
  origin:"http://localhost:5173"
}));

var server = app.listen(port);

const io = socket(server,{cors:{origin:"http://localhost:5173"}});

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, roomname }) => {
    const p_user = join_User(socket.id, username, roomname);
    console.log(socket.id, "=id");
    socket.join(p_user.room);

    socket.emit("message", {
      userId: p_user.id,
      username: p_user.username,
      text: `Welcome ${p_user.username}`,
    });

    socket.broadcast.to(p_user.room).emit("message", {
      userId: p_user.id,
      username: p_user.username,
      text: `${p_user.username} has joined the chat`,
    });
  });

  socket.on("chat", (text) => {
    const p_user = get_Current_User(socket.id);

    io.to(p_user.room).emit("message", {
      userId: p_user.id,
      username: p_user.username,
      text: text,
    });
  });

  if(process.env.NODE_ENV=="production"){
  app.use(express.static("client/build"));
  const path = require('path');
  app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client',"build","index.html"));
  })
}

  socket.on("disconnect", () => {
  
    const p_user = user_Disconnect(socket.id);

    if (p_user) {
      io.to(p_user.room).emit("message", {
        userId: p_user.id,
        username: p_user.username,
        text: `${p_user.username} has left the room`,
      });
    }
  });
});