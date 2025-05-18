const { Server } = require("socket.io");
const userMessages = require("../models/userMessages");

let io;

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // React frontend
      methods: ["GET", "POST"],
    },
  });

  const userMap = new Map();

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("register", (userId) => {
      console.log("user register");
      userMap.set(userId, socket.id);
    });

    socket.on("user-message", ({ userId, toUserId, message }) => {
   
      const textMessage = new userMessages({
        senderId: userId,
        receiverId: toUserId,
        messages: message,
      });
      textMessage.save();

      
      const targetSocketId = userMap.get(toUserId);
      if (targetSocketId) {
        io.to(targetSocketId).emit("user-message", {
          userId,
          message,
        });
      }
    }); 

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}

function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}

module.exports = { initializeSocket, getIO };

