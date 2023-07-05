import React from "react";
import logo from "../assets/flowershop.png";
import { IoMdCall, IoMdMail } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-pink-400 py-5 px-10 font-jost">
      <div className="flex justify-center border-b-2 border-white">
        <img src={logo} alt="logo" className="w-[150px] pb-2" />
      </div>
      <div className="flex flex-wrap justify-between gap-6 mt-10">
        <div>
          <h1 className="text-2xl font-bold text-white">Reach us</h1>
          <span className="flex flex-col pt-5 lg:flex-row text-white text-sm">
            <IoMdCall size={25} color={"white"} />
            <p>+1014 3456 789</p>
          </span>
          <span className="flex flex-col pt-5 lg:flex-row text-white text-sm">
            <IoMdMail size={25} color={"white"} />
            <p>ajflowershop@example.com</p>
          </span>
          <span className="flex flex-col pt-5 lg:flex-row text-white text-sm">
            <FaMapMarkerAlt size={25} color={"white"} />
            <p>Quezon City</p>
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white">Company</h1>
          <ul className="flex flex-col gap-3 lg:gap-8 text-white mt-4">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/menu"}>Flowers</Link>
            </li>
            <li>
              <Link to={"/about"}>About</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white">Legal</h1>
          <ul className="flex flex-col gap-3 lg:gap-8 text-white mt-4">
            <li>
              <Link to={"/"}>Privacy Policy</Link>
            </li>
            <li>
              <Link to={"/"}>Terms & Services</Link>
            </li>
            <li>
              <Link to={"/"}>Terms of use</Link>
            </li>
            <li>
              <Link to={"/"}>Refund Policy</Link>
            </li>
          </ul>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white">Quick Links</h1>
          <ul className="flex flex-col gap-3 lg:gap-8 text-white mt-4">
            <li>
              <Link to={"/"}>Downloads</Link>
            </li>
            <li>
              <Link to={"/"}>Forum</Link>
            </li>
          </ul>
        </div>

        <div className="bg-white p-5 rounded-lg mt-10 lg:mt-0 max-w-[320px] mx-auto lg:mx-0">
          <h1 className="text-gray-800 font-bold text-xl pb-4">
            Join our Newsletter
          </h1>
          <div className="flex w-full mx-auto pb-4">
            <input
              type="text"
              placeholder="Your email address"
              className="bg-[#a5a4a4] p-2 rounded-tl-md rounded-bl-md text-white placeholder:text-gray-900 w-[200px]"
            />
            <button className="bg-pink-400 py-2 px-5 rounded-tr-md rounded-br-md text-white">
              Subscribe
            </button>
          </div>
          <p className="text-gray-800">
            * Will send you weekly updates for your better tool management.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
