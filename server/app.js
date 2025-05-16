const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { signRoute } = require("./routes/signRoute");
const { initializeSocket } = require("./service/socket");

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

initializeSocket(server)

app.use("/", signRoute);

server.listen(5000, () => {
  console.log("server running at port 5000");
});
