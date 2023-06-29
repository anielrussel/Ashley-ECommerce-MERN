import React from "react";
import { IoMdCall, IoMdMail } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsFacebook, BsDiscord, BsTwitter } from "react-icons/bs";
import lettersend from "../assets/letter_send 1.svg"
import Footer from "../components/Footer";

const Contact: React.FC = () => {
  return (
    <><div className="font-jost lg:px-28 px-2 pt-10 pb-40">
      <div className="text-center">
        <h1 className="lg:text-3xl text-2xl text-pink-600 font-bold">
          Contact us
        </h1>
        <p className="lg:text-lg text-md text-gray-700 pt-2">
          Any question or remarks? Just write us a message!
        </p>
      </div>
      <div className="bg-white lg:p-4 rounded-md lg:flex mt-5 lg:max-w-[1196px] lg:h-[620px] mx-auto">
        <div className="lg:w-[800px] lg:justify-between text-center lg:text-start bg-pink-400 rounded-md flex flex-col justify-center items-center lg:items-start px-10 text-white py-4">
          <div>
            <h1 className="text-lg lg:text-xl font-bold">
              Contact Information
            </h1>
            <p>Say something to start a live chat!</p>
          </div>
          <div className="mt-5 lg:flex lg:flex-col lg:gap-4">
            <span className="flex flex-col pt-4 items-center lg:flex-row gap-4">
              <IoMdCall size={30} />
              <p>+1014 3456 789</p>
            </span>
            <span className="flex flex-col pt-4 items-center lg:flex-row gap-4">
              <IoMdMail size={30} />
              <p>ajflowershop@example.com</p>
            </span>
            <span className="flex flex-col pt-4 items-center lg:flex-row gap-4">
              <FaMapMarkerAlt size={30} />
              <p>Quezon City</p>
            </span>
          </div>
          <div className="mt-8 flex gap-5">
            <span className="p-2 bg-slate-100 rounded-full text-pink-500">
              <BsFacebook size={20} />
            </span>
            <span className="p-2 bg-slate-100 rounded-full text-pink-500">
              <BsDiscord size={20} />
            </span>
            <span className="p-2 bg-slate-100 rounded-full text-pink-500">
              <BsTwitter size={20} />
            </span>
          </div>
        </div>
        <div className="p-10 w-full">
          <form className="flex flex-col">
            <div className="lg:flex justify-between">
              <div className="flex flex-col">
                <label htmlFor="firstname" className="text-gray-600">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  className="outline-none border-b-2 border-gray-600 lg:w-[278px]" />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="lastname"
                  className="mt-8 lg:mt-0 text-gray-600"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  className="outline-none border-b-2 border-gray-600 lg:w-[278px]" />
              </div>
            </div>

            <div className="lg:flex justify-between">
              <div className="flex flex-col">
                <label htmlFor="email" className="mt-8 text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="outline-none border-b-2 border-gray-600 lg:w-[278px]" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="number" className="mt-8 text-gray-600">
                  Mobile no.
                </label>
                <input
                  type="number"
                  id="number"
                  className="outline-none border-b-2 border-gray-600 lg:w-[278px]" />
              </div>
            </div>

            <label htmlFor="message" className="mt-8 text-gray-600">
              Message
            </label>
            <textarea
              id="email"
              className="outline-none border-b-2 border-gray-600"
              placeholder="Write your message..." />
            <div className="lg:flex lg:justify-end">
              <button className="lg:w-[214px] w-full mt-10 bg-pink-400 text-white py-3 rounded-md">
                Send Message
              </button>
            </div>
            <img src={lettersend} alt="letterdesign" className="absolute lg:mt-[300px] hidden lg:block lg:ml-[200px]" />
          </form>
        </div>
      </div>
    </div><div>
        <Footer />
      </div></>
  );
};

export default Contact;
