// Import React and useState hook
import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import {  toast } from 'react-toastify';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let {setUser} = useContext(UserContext);



      let navigate =  useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
      
    axios.post("https://backend2-udns.onrender.com/user/login",{email,password})
    .then((res)=>{
      setUser(res.data.data);
      localStorage.setItem("token",res.data.token);
      toast.success("login successfull",{autoClose:500,position:"top-center"})
       navigate('/')
    })
    .catch((err)=>{
      toast.error(err.response.data.errmsg,{autoClose:500,position:"top-center"})
    })
    

  };

  return ( 
   <div>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-gray-600 text-sm text-center mt-4">
          Don’t have an account? <a href="/register" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
   </div>
  );
};

export default LoginPage;
