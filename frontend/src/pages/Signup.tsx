import React, { useState } from "react";
import profile from "../assets/profile.png";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { ImageBase64 } from "../utils/ImageBase64";
import { toast } from "react-hot-toast";

const Signup: React.FC = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleConfirmPassword = () => {
        setShowConfirmPassword((prevConfirmPassword) => !prevConfirmPassword);
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

    const handleFile = async (event:React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const data: string | ArrayBuffer | null = await ImageBase64(file)
            if (data) {
                setFormData((prevImage) => {
                    return {
                        ...prevImage,
                        image: data as string
                    }
                })
            } 
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      
        const { firstName, lastName, email, password, confirmPassword } = formData;
        if (firstName && lastName && email && password && confirmPassword) {
          if (password === confirmPassword) {
            fetch("http://localhost:4000/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                toast(data.message);
                if (data.message === "Successfully signed up!") {
                    navigate("/login")
                }
              })
              .catch((error) => {
                console.log("Error signing up:", error);
                toast("Signup failed!");
              });
          } else {
            toast("Password and Confirm Password do not match");
            return;
          }
        }
        console.log(formData);
      };      
      

    return (
        <div className="flex justify-center px-4">
            <div className="bg-white max-w-[500px] flex flex-col py-8 px-4 rounded-md mt-16 shadow-lg">
                <div className="px-10 flex flex-col justify-center items-center text-center">
                    <div className="relative w-20 h-20 overflow-hidden drop-shadow-md rounded-full border border-gray-500 text-center">
                        <img
                            src={formData.image ? formData.image : profile}
                            alt="signupimage"
                            className="w-full rounded-full"
                        />
                        <label htmlFor="profile">
                            <div className="absolute bg-gray-400/80 bottom-0 h-1/3 w-full text-center cursor-pointer">
                                <p className="text-white">Upload</p>
                            </div>
                            <input type="file" id="profile" className="hidden" accept="image/" onChange={handleFile}/>
                        </label>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio
                        numquam doloremque odio deleniti atque placeat.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-1">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        onChange={handleChange}
                        value={formData.firstName}
                        className="bg-gray-200 rounded-sm pl-2 py-1 outline-blue-400"
                        required
                    />

                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        onChange={handleChange}
                        value={formData.lastName}
                        className="bg-gray-200 rounded-sm pl-2 py-1 outline-blue-400"
                        required
                    />

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

                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <div className="flex">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            onChange={handleChange}
                            value={formData.confirmPassword}
                            className="bg-gray-200 rounded-sm pl-2 py-2 outline-blue-400 w-full"
                        />
                        <span
                            className="flex items-center text-xl -ml-8 cursor-pointer"
                            onClick={handleConfirmPassword}
                        >
                            {showConfirmPassword ? <RiEyeFill /> : <RiEyeCloseFill />}
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="bg-red-500 hover:bg-red-600 font-bold text-white mt-8 py-2 rounded-full"
                    >
                        Signup
                    </button>
                </form>
                <div className="text-center mt-4 lg:text-left">
                    <p>
                        Already have an account?
                        <span className="ml-2 underline text-blue-600 font-bold">
                            <Link to={"/login"}>Login</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
