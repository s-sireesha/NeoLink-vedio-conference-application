import React, { useState } from "react";
import "../Signup/Signup.css";
import axios from "axios";
import img2 from "../Assets/signin.png";

import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";


const SignUpForm = () => {
  const history = useNavigate()
  const [inputs, setInputs] = useState({
    first_name:"",
    last_name:"",
    email:"",
    password:""
  });
  const handleChange = (e) => {
    setInputs(prev => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
    // console.log(e.target.name,"value", e.target.value)
  };

  const sendRequest = async() => {
    const res = await axios.post("http://localhost:5000/api/signup",{
      first_name : inputs.first_name,
      last_name : inputs.last_name,
      email : inputs.email,
      password : inputs.password
    }).catch(err=>console.log(err));
    const data = await res.data;
    return data;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    //send http request
    sendRequest().then(()=>history("/signin"));
  };

  return (
    <div class="signup-container">
      <Navbar />
      <div className="signup-content">
        <div class="signup-image">
          <img src={img2} alt="" />
        </div>
        <div class="signup-form">
          <h2>Create An Account</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" 
            placeholder="First Name"
            name="first_name"
            value={inputs.first_name}
            onChange={handleChange} 
            />

            <input type="text" 
            placeholder="Last Name"
            name="last_name" 
            value={inputs.last_name}
            onChange={handleChange} 
            />

            <input type="email" 
            placeholder="Email"
            name="email" 
            value={inputs.email}
            onChange={handleChange} 
            />

            <input type="password" 
            placeholder="Password"
            name="password" 
            value={inputs.password}
            onChange={handleChange} 
            />

            <div className="check-box">
              <input type="checkbox" id="agree" />
              <label for="agree">
                I Agree to the above terms and conditions
              </label>
            </div>

            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
