import React, { useState, useEffect } from "react";
import homebg from "../assets/home-bg.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import HomeCard from "../components/HomeCard";
import CardFeatures from "../components/CardFeatures";
import { Product } from "../redux/productSlice";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  const productData = useSelector(
    (state: RootState) => state.product.productList
  );
  const homeProductCardList = productData.slice(0, 2);
  const bestSellers = productData.slice(0, 10);
  const realFlowers = productData.filter((el) => el.category === "real");
  const artificialFlowers = productData.filter(
    (el) => el.category === "artificial"
  );
  const preservedFlowers = productData.filter(
    (el) => el.category === "preserved"
  );
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [active, setActive] = useState<string>("all");

  const filteredProductsByCategory = (category: string) => {
    if (category === "all") {
      setFilteredProducts(productData);
    } else {
      const filtered = productData.filter((el) => el.category === category);
      setFilteredProducts(filtered);
    }
    setActive(category);
  };

  useEffect(() => {
    setFilteredProducts(productData);
  }, [productData]);

  return (
    <><div className="font-jost pb-32">
      <div className="h-[500px] relative z-10">
        <img
          src={homebg}
          alt="homebg"
          className="h-[550px] lg:h-[550px] w-full" />
      </div>
      <div className="absolute top-0 left-0 z-20 bg-white/40 lg:h-[550px] h-[550px] w-full">
        <div className="flex lg:flex-row flex-col-reverse lg:justify-around mt-8 gap-12 items-center lg:h-full">
          <div className="text-center">
            <h1 className="font-script lg:text-8xl text-5xl font-bold text-pink-800 lg:w-[600px]">
              Make Someone Smile Today!
            </h1>
            <Link to={"menu"}>
              <button className="bg-pink-800 py-2 px-5 hover:px-8 ease-in-out duration-500 hover:bg-pink-900 mt-4 lg:text-xl text-md text-white rounded-lg">
                Shop Now
              </button>
            </Link>
          </div>

          <div className="flex gap-2 rotate-6">
            {homeProductCardList[0] &&
              homeProductCardList.map((el) => {
                return (
                  <HomeCard key={el._id} name={el.name} image={el.image} />
                );
              })}
          </div>
        </div>
      </div>

      {/* best sellers */}
      <div className="mt-16">
        <div className="py-6 bg-pink-600"></div>
        <div className="lg:px-28 px-2 pt-8">
          <div className="flex justify-between border-b-2 border-gray-400">
            <h1 className="font-semibold text-2xl text-gray-700">
              Best Seller
            </h1>
            <Link to={"menu"}>
              <p className="cursor-pointer text-pink-500">Shop more</p>
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap lg:px-28 px-2 gap-4 my-4 justify-between lg:justify-center">
          {bestSellers.map((el) => {
            return (
              <CardFeatures
                key={el._id}
                id={el._id}
                image={el.image}
                name={el.name}
                price={el.price}
                category={el.category}
                description={el.description} />
            );
          })}
        </div>
      </div>

      {/* real flowers */}
      <div className="lg:px-28 px-2 pt-8 mt-8">
        <div className="flex justify-between border-b-2 border-gray-400">
          <h1 className="font-semibold text-2xl text-gray-700">Real Flowers</h1>
          <Link to={"menu"}>
            <p className="cursor-pointer text-pink-500">Shop more</p>
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap lg:px-28 px-2 gap-4 my-4 justify-center">
        {realFlowers[0] &&
          realFlowers.map((el) => {
            return (
              <CardFeatures
                key={el._id}
                id={el._id}
                image={el.image}
                name={el.name}
                price={el.price}
                category={el.category}
                description={el.description} />
            );
          })}
      </div>

      {/* artificial flowers */}
      <div className="lg:px-28 px-2 pt-8 mt-8">
        <div className="flex justify-between border-b-2 border-gray-400">
          <h1 className="font-semibold text-2xl text-gray-700">
            Artificial Flowers
          </h1>
          <Link to={"menu"}>
            <p className="cursor-pointer text-pink-500">Shop more</p>
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap lg:px-28 px-2 gap-4 my-4 justify-center">
        {artificialFlowers[0] &&
          artificialFlowers.map((el) => {
            return (
              <CardFeatures
                key={el._id}
                id={el._id}
                image={el.image}
                name={el.name}
                price={el.price}
                category={el.category}
                description={el.description} />
            );
          })}
      </div>

      {/* preserved flowers */}
      <div className="lg:px-28 px-2 pt-8 mt-8">
        <div className="flex justify-between border-b-2 border-gray-400">
          <h1 className="font-semibold text-2xl text-gray-700">
            Preserved Flowers
          </h1>
          <Link to={"menu"}>
            <p className="cursor-pointer text-pink-500">Shop more</p>
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap lg:px-28 px-2 gap-4 my-4 justify-center">
        {preservedFlowers[0] &&
          preservedFlowers.map((el) => {
            return (
              <CardFeatures
                key={el._id}
                id={el._id}
                image={el.image}
                name={el.name}
                price={el.price}
                category={el.category}
                description={el.description} />
            );
          })}
      </div>

      <div className="lg:lg:px-28 px-2 mt-16">
        <h1 className="text-2xl font-bold">All Products</h1>
        <div className="flex justify-center gap-2">
          <button
            className={`${active === "all"
                ? "bg-pink-500 text-white border-2 border-gray-600 py-1 px-3 lg:py-1 lg:px-6 rounded-md text-md"
                : "bg-gray-100 text-black border-2 border-gray-600 py-1 px-3 lg:py-1 lg:px-6 rounded-md text-md"}`}
            onClick={() => filteredProductsByCategory("all")}
          >
            All
          </button>
          <button
            className={`${active === "real"
                ? "bg-pink-500 text-white border-2 border-gray-600 py-1 px-3 lg:py-1 lg:px-6 rounded-md text-md"
                : "bg-gray-100 text-black border-2 border-gray-600 py-1 px-3 lg:py-1 lg:px-6 rounded-md text-md"}`}
            onClick={() => filteredProductsByCategory("real")}
          >
            Real
          </button>
          <button
            className={`${active === "preserved"
                ? "bg-pink-500 text-white border-2 border-gray-600 py-1 px-3 lg:py-1 lg:px-6 rounded-md text-md"
                : "bg-gray-100 text-black border-2 border-gray-600 py-1 px-3 lg:py-1 lg:px-6 rounded-md text-md"}`}
            onClick={() => filteredProductsByCategory("preserved")}
          >
            Preserved
          </button>
          <button
            className={`${active === "artificial"
                ? "bg-pink-500 text-white border-2 border-gray-600 py-1 px-3 lg:py-1 lg:px-6 rounded-md text-md"
                : "bg-gray-100 text-black border-2 border-gray-600 py-1 px-3 lg:py-1 lg:px-6 rounded-md text-md"}`}
            onClick={() => filteredProductsByCategory("artificial")}
          >
            Artificial
          </button>
        </div>
        <div className="flex flex-wrap w-full gap-2 justify-center mt-10">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white hover:border border-gray-500"
            >
              <Link to={`product/${product._id}`}>
                <img
                  key={product._id}
                  src={product.image}
                  alt={product.name}
                  className="w-[180px]" />
              </Link>
              <div className="p-1">
                <p className="pb-2 text-xs">{product.name}</p>
                <p className="text-pink-700 font-semibold text-xs">
                  ₱{product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div><Footer /></>
  );
};

export default Home;
