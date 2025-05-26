const express = require("express");
const http = require("http");
const cors = require("cors");
const { signRoute } = require("./routes/signRoute");
const { initializeSocket } = require("./service/socket");
const userMessages = require("./models/userMessages");
const jwt = require('jsonwebtoken');
const { verifyToken } = require("./service/token");

const app = express();
const server = http.createServer(app);
app.use(express.urlencoded());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST"],
  })
);

initializeSocket(server);

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  verifyToken(token)
  next();
};

app.use("/", signRoute);

app.post("/chats", authMiddleware, async (req, res) => {
  const { currentUser, currentReceiver } = req.body;
  const messages = await userMessages
    .find({
      $or: [
        { senderId: currentUser, receiverId: currentReceiver },
        { senderId: currentReceiver, receiverId: currentUser },
      ],
    })
    .sort({ timestamp: 1 }); // Oldest to newest

  res.json(messages);
});

server.listen(5000, () => {
  console.log("server running at port 5000");
});
