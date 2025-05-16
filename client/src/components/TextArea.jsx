import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

function TextArea() {
  const socket = io("http://localhost:5000");

  const user = useSelector((store) => store.user);
  const receiver = useSelector((store) => store.receiver);
  const [message, setMessages] = useState({});
  const userMessage = useRef();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to a server");
    });
    socket.emit("register", user.userData._id);

    socket.on("user-message", ({ from, message }) => {
      setMessages({ from, message });
      console.log("from: ", from);
      console.log("message: ", message);
    });
  }, [message]);

  const handleSubmitButton = (e) => {
    e.preventDefault();

    socket.emit("user-message", {
      userId: user.userData._id,
      toUserId: receiver._id,
      message: userMessage.current.value,
    });
    userMessage.current.value = "";
  };

  return (
    <>
      <h4 className="mb-4">
        {user.userData.name}, Send a Message to {receiver.name}
      </h4>
      <form
        className="w-75 d-flex align-items-center"
        onClick={handleSubmitButton}
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
    </>
  );
}

export default TextArea;

// import { connect, io } from "socket.io-client";
// const socket = io("http://localhost:5000");

// function App() {
//   let [messages, setMessages] = useState([]);

//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("connected to a server");
//     });

//     socket.on("userMessage", (data) => {
//       console.log(`data from ${data.from}: data message: ${data.message}`);

//       setMessages([...messages, data.message]);
//     });

//     return () => {
//       socket.off("connect");
//       socket.off("message");
//     };
//   }, [messages]);

//   const handleKeyDown = (e) => {
//     socket.emit("register", senderRef.current.value);

//     socket.emit("userMessage", {
//       toUserId: reciverRef.current.value,
//       message: messageRef.current.value,
//     });
//     messageRef.current.value = "";
//   };
