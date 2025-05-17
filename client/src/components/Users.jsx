import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiverAction } from "../store";

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.user);
  const userList = users.usersData;

  const onClickHandle = (user) => {
    dispatch(receiverAction.addreceiver(user));
  };

  return (
    <div className="col-md-3">
      <div className="card">
        <div className="card-header text-center">{users.userData.name}</div>
        <ul className="list-group list-group-flush">
          {userList.map((user) => (
            <li
              key={user._id}
              className="list-group-item"
              onClick={() => {
                onClickHandle(user);
              }}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Users;
