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

// const users = new Map();

// io.on("connection", (socket) => {
//   console.log("a user connected");

//   socket.on("register", (userId) => {
//     users.set(userId, socket.id); // Save the mapping
//     console.log(`User ${userId} registered with socket ID ${socket.id}
//   });

//   socket.on("userMessage", ({ toUserId, message }) => {
//     const targetSocketId = users.get(toUserId);
//     console.log(targetSocketId)
//     console.log(users)
//     if (targetSocketId) {
//       io.to(targetSocketId).emit("userMessage", {
//         from: socket.id,
//         message,
//       });
//     }
//   });
