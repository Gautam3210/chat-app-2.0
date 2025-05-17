import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from "axios";

function TextArea() {
  const socket = io("http://localhost:5000");

  const user = useSelector((store) => store.user);
  const receiver = useSelector((store) => store.receiver);
  const userMessage = useRef();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to a server");
    });
    socket.emit("register", user.userData._id);

    socket.on("user-message", ({ userId, message }) => {
      console.log("from: ", userId);
      console.log("message: ", message);
    });
  }, [userMessage]);

  const handleSubmitButton = (e) => {
    e.preventDefault();

    socket.emit("user-message", {
      userId: user.userData._id,
      toUserId: receiver._id,
      message: userMessage.current.value,
    });
    userMessage.current.value = "";
  };

  if (Object.keys(receiver).length !== 0) {
    const usersList = async () => {
      console.log("first run ", receiver);
      let usersMessages = await axios.post("http://localhost:5000/chats", {
        currentUser: user.userData._id,
        currentReceiver: receiver._id,
      });
      console.log(usersMessages.data);
    };
    usersList()
  }

  return (
    <>
      <h4 className="headContainer">{receiver.name}</h4>
      <div className="messageArea">
        <li>hello</li>
        <li>hello</li>
        <li>hello</li>
        <li>hello</li>
      </div>
      <div className="chatContainer">
        <form
          className="w-75 d-flex align-items-center"
          onSubmit={handleSubmitButton}
        >
          <input
            type="text"
            className="form-control me-2"
            placeholder="Enter your message..."
            ref={userMessage}
          />
          <button className="btn btn-primary" type="submit">
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default TextArea;
