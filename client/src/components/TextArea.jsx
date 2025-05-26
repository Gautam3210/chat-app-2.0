import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");
function TextArea() {
  const [messageList, setMessageList] = useState([]);
  const user = useSelector((store) => store.user);
  const receiver = useSelector((store) => store.receiver);
  const userMessage = useRef();

  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messageList]); 

  useEffect(() => {
    const fetchMessages = async () => {
      if (!user?.userData?._id || !receiver?._id) return;
      const token = localStorage.getItem('token')

      const res = await axios.post("http://localhost:5000/chats", {
        currentUser: user.userData._id,
        currentReceiver: receiver._id,
      },{
        headers:{
          "Authorization": `Bearer ${token}`
        }
      });
      const data = res.data;
      setMessageList(data);
    };

    fetchMessages();
  }, [receiver]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to a server");
    });
    socket.emit("register", user.userData._id);

    socket.on("user-message", ({ userId, message }) => {
      console.log("from: ", userId);
      console.log("message: ", message);

      setMessageList((prev) => [
        ...prev,
        { senderId: userId, receiverId: user.userData._id, messages: message },
      ]);
    });
    return () => socket.off("user-message"); // cleanup
  }, []);

  const handleSubmitButton = (e) => {
    e.preventDefault();
    const currMessage = userMessage.current.value;
    socket.emit("user-message", {
      userId: user.userData._id,
      toUserId: receiver._id,
      message: userMessage.current.value,
    });
    setMessageList((prev) => [
      ...prev,
      {
        senderId: user.userData._id,
        receiverId: receiver._id,
        messages: currMessage,
      },
    ]);
    userMessage.current.value = "";
  };

  return (
    <>
      <h4 className="headContainer">{receiver.name}</h4>
      <div className="messageArea">
        <div className="chat-box">
          {messageList.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${
                msg.senderId === user.userData._id ? "sent" : "received"
              }`}
            >
              {msg.messages}
            </div>
          ))}
        </div>
        <div ref={scrollRef}></div>
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
