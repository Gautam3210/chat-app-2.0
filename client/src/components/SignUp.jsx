import Container from "./Container"; // Assuming this adds a Bootstrap-style container
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure Bootstrap CSS is loaded
import { useRef } from "react";
import axios from "axios";

function SignUp() {
  const userName = useRef();
  const userEmail = useRef();
  const userPassword = useRef();
  const handleSubmitButton = (e) => {
    e.preventDefault();
    const name = userName.current.value;
    const email = userEmail.current.value;
    const password = userPassword.current.value;

    axios.post("http://localhost:5000/", {
      name: name,
      email: email,
      password: password,
    });
    userName.current.value = "";
    userEmail.current.value = "";
    userPassword.current.value = "";
  };
  return (
    <Container>
      <h3 className="card-title text-center mb-4">Sign Up</h3>
      <form onSubmit={handleSubmitButton}>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">
            Name
          </label>
          <input
            ref={userName}
            type="text"
            className="form-control"
            id="exampleInputName"
            placeholder="Enter your name"
          />
        </div>
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
        Already have an account?{" "}
        <a href="/" className="text-decoration-none">
          Log In
        </a>
      </p>
    </Container>
  );
}

export default SignUp;
