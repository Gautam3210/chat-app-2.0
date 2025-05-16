import Container from "./Container"; // Assuming this adds a Bootstrap-style container
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure Bootstrap CSS is loaded
import { useRef } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { userAction } from "../store";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userEmail = useRef();
  const userPassword = useRef();

  const handleSubmitButton = async (e) => {
    e.preventDefault();
    const email = userEmail.current.value;
    const password = userPassword.current.value;

    const res = await axios.post("http://localhost:5000/login", {
      email: email,
      password: password,
    });
   
    dispatch(userAction.addUser(res.data));

    userEmail.current.value = "";
    userPassword.current.value = "";

    navigate("/chats");
  };
  return (
    <Container>
      <h3 className="card-title text-center mb-4">Login</h3>

      <form onSubmit={handleSubmitButton}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            ref={userEmail}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter your email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            ref={userPassword}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
      <p className="mt-3 text-center">
        If already have an account{" "}
        <a href="/signUp" className="text-decoration-none">
          Sign up
        </a>
      </p>
    </Container>
  );
}

export default Login;
