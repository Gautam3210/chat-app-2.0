import React, { useState } from "react";
import { useSelector } from "react-redux";
import TextArea from "./TextArea";
import Users from "./Users";

function Chats() {

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Column: User List */}
        <Users></Users>

        {/* Center Column: Message Input */}
        <div className="col-md-9 d-flex flex-column justify-content-center align-items-center">
          <TextArea></TextArea>
        </div>
      </div>
    </div>
  );
}

export default Chats;
