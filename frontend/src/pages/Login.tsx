import React, { useState } from "react";
import loginlogo from "../assets/loginlogo.png";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from 'react-redux'
import { loginRedux } from "../redux/userSlice";

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const { email, password } = formData;
    if (email && password) {
      fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          toast(data.message);
          if (data.message === "Login Successful!") {
            dispatch(loginRedux(data))
            navigate("/"); // Navigate to the home page ("/")
          }
        })
        .catch((error) => {
          console.log("Error logging in:", error);
          toast("Login failed!");
        });
    } else {
      toast("Incorrect password");
      return;
    }
  };

  return (
    <div className="flex justify-center px-4">
      <div className="bg-white max-w-[500px] flex flex-col py-8 px-4 rounded-md mt-16 shadow-lg">
        <div className="px-10 flex flex-col justify-center items-center text-center">
          <img
            src={loginlogo}
            alt="signupimage"
            className="w-20 animate-bounce"
          />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio
            numquam doloremque odio deleniti atque placeat.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            className="bg-gray-200 rounded-sm pl-2 py-1 outline-blue-400"
            required
          />

          <label htmlFor="password">Password</label>
          <div className="flex">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="bg-gray-200 rounded-sm pl-2 py-2 outline-blue-400 w-full"
            />
            <span
              className="flex items-center text-xl -ml-8 cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <RiEyeFill /> : <RiEyeCloseFill />}
            </span>
          </div>

          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 font-bold text-white mt-8 py-2 rounded-full"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4 lg:text-left">
          <p>
            Don't have an account?
            <span className="ml-2 underline text-blue-600 font-bold">
              <Link to={"/signup"}>Signup</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
