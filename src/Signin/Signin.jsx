import React, { useState } from "react";
import "./Signin.css";
import axios from "axios";
import img1 from "../Assets/signin-image.png";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Signin = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // console.log(e.target.name,"value", e.target.value)
  };

  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/login", {
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    //send http request
    sendRequest().then(() => history("/joinmeet"));
  };

  return (
    <div className="signin">
      <Navbar />
      <div className="container">
        <div className="signin-left">
          <h2>Welcome</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="">Username</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />

            <button type="submit">Login</button>
          </form>
          <div className="new-account">
            <Link to="/signup">Create a New Account</Link>
          </div>
        </div>
        <div className="right">
          <img src={img1} alt="Signin" />
        </div>
      </div>
    </div>
  );
};

export default Signin;
