const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { 
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    io.emit("message", msg); 
  });

  socket.on("image", (imgData) => {
    io.emit("image", imgData); 
  });

 
});

server.listen(3001, () => console.log("Server running on port 3001"));
