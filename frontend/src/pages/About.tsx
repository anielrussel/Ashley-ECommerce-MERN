import React from "react";
import Footer from "../components/Footer";
import rocket from "../assets/rocket.svg";
import bulb from "../assets/bulb.svg";
import rotate from "../assets/360.svg";

const About: React.FC = () => {
  return (
    <>
      <div className="lg:px-28 px-2 py-20">
        <div className="font-jost lg:flex gap-6 items-center">
          <h1 className="lg:text-3xl text-xl text-pink-600 font-bold w-full">
            About us
          </h1>
          <p className="lg:text-lg text-md text-gray-700 pt-2">
            At Ashley Joy's flower shop, we believe that flowers hold a special
            power to uplift, inspire, and create unforgettable moments. With a
            passion for floral artistry and a commitment to exceptional customer
            service, we have become a cherished destination for flower lovers
            far and wide. Our commitment to quality extends beyond the flowers
            themselves. We prioritize sustainable and eco-friendly practices,
            partnering with local growers and suppliers who share our values. By
            supporting ethical sourcing and reducing our environmental
            footprint, we strive to make a positive impact on both our community
            and the planet. Whether you're celebrating a milestone, expressing
            love and gratitude, or simply adding a touch of beauty to your
            surroundings, we are here to help you find the perfect floral
            expression. Our knowledgeable team is dedicated to understanding
            your unique needs and desires, ensuring that each arrangement
            surpasses your expectations.
          </p>
        </div>

        <div className="lg:flex lg:flex-row justify-between lg:gap-6 flex flex-col gap-10 mt-32">
          <div>
            <img src={rocket} alt="rocket" className="lg:w-[50px] w-[30px] lg:mb-8" />
            <h1 className="lg:text-4xl text-2xl font-bold text-[#2BB79D] border-l-8 border-[#2BB79D] px-2">
              Lorem Ipsum is simply
            </h1>
            <p className="text-[#9F9E9E] font-bold lg:text-lg text-md mt-10 border-l-2 border-black px-4 py-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,
            </p>
          </div>

          <div>
            <img src={bulb} alt="rocket" className="lg:w-[50px] w-[30px] lg:mb-4" />
            <h1 className="lg:text-4xl text-2xl font-bold text-[#0132E0] border-l-8 border-[#0132E0] px-2">
              Lorem Ipsum is simply
            </h1>
            <p className="text-[#9F9E9E] font-bold lg:text-lg text-md mt-10 border-l-2 border-black px-4 py-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,
            </p>
          </div>

          <div>
            <img src={rotate} alt="rocket" className="lg:w-[50px] w-[30px] lg:mb-12" />
            <h1 className="lg:text-4xl text-2xl font-bold text-[#F00] border-l-8 border-[#F00] px-2">
              Lorem Ipsum is simply
            </h1>
            <p className="text-[#9F9E9E] font-bold lg:text-lg text-md mt-10 border-l-2 border-black px-4 py-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
