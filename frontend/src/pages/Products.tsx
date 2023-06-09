import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../redux";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion";
import { AiOutlineRight, AiOutlineDown } from "react-icons/ai";
import { Product, addCartItem } from "../redux/productSlice";

// swiper js
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";



const Products: React.FC = () => {
  const { filterby } = useParams();
  const dispatch = useDispatch()
  const productData = useSelector(
    (state: RootState) => state.product.productList
  );
  const productDisplay = productData.filter((el) => el._id === filterby)[0];
  const relatedProducts = productData
    .filter((el) => el._id !== filterby)
    .slice(0, 4);
  console.log(productDisplay);

  const [accordion, setAccordion] = useState(false);
  const handleAccordion = () => {
    setAccordion((prev) => !prev);
  };

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

  const handleAddCartItem = () => {
    dispatch(addCartItem(productDisplay))
}
  return (
    <div className="lg:flex lg:px-28 px-10 py-12">
      <div className="lg:w-[50%]">
        <div className="lg:flex lg:items-center justify-center">
          <img
            src={productDisplay.image}
            alt={productDisplay.name}
            className="w-[450px]"
          />
        </div>
        <div className="mt-4 lg:mt-10 pr-10">
          <Accordion>
            <AccordionItem>
              <AccordionHeader
                className="w-full flex justify-between items-center text-gray-800 py-4 border-b border-gray-400"
                onClick={handleAccordion}
              >
                <h3 className="font-jost text-xl">DESCRIPTION</h3>
                <span className="text-black">
                  {accordion ? (
                    <AiOutlineDown size={20} />
                  ) : (
                    <AiOutlineRight size={20} />
                  )}{" "}
                </span>
              </AccordionHeader>

              <AccordionBody>
                <div className="accordion-body py-8 font-jost">
                  <p className="text-lg">{productDisplay.description}</p>
                </div>
              </AccordionBody>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="pr-10">
          <h3 className="font-jost w-full text-xl text-gray-800 py-4 border-b border-gray-400 ">
            RELATED PRODUCTS
          </h3>
          <div className="flex gap-2 font-jost">
            {relatedProducts[0] &&
              relatedProducts.map((el) => {
                return (
                  <div
                    key={el._id}
                    className="hover:shadow-md rounded-md p-2 hover:scale-105 ease-in-out duration-300"
                  >
                    <img src={el.image} alt={el.name} className="w-[200px]" />
                    <p className="text-gray-800 text-sm">{el.name}</p>
                    <p className="text-pink-600 text-sm">₱{el.price}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="lg:w-[50%] mt-10 lg:mt-0 font-jost">
        <h1 className="font-semibold text-gray-900 text-2xl border-dashed border-b-2 border-gray-600">
          {productDisplay.name}
        </h1>
        <p className="font-semibold text-pink-600 text-lg pt-4">
          ₱{productDisplay.price.toLocaleString()}
        </p>
        <div className="flex gap-6 pt-4">
          <button className="lg:text-xl text-normal border-2 border-pink-400 hover:bg-pink-200 lg:px-16 px-10 py-2" onClick={handleAddCartItem}>
            Add to cart
          </button>
          <button className="lg:text-xl text-normal border-2 border-pink-400 bg-pink-400 text-white hover:bg-pink-500 lg:px-16 px-10 py-2">
            Buy now
          </button>
        </div>
        <div className="mt-6">
          <p>More products:</p>
          <div className="flex gap-4 mt-2">
            <button
              className={`${
                active === "all"
                  ? "bg-pink-500 text-white border-2 border-gray-600 py-1 px-3 lg:py-1 lg:px-6 rounded-md text-xs"
                  : "bg-gray-100 text-black border-2 border-gray-600 py-1 px-3 lg:py-1 lg:px-6 rounded-md text-xs"
              }`}
              onClick={() => filteredProductsByCategory("all")}
            >
              All
            </button>
            <button
              className={`${
                active === "real"
                  ? "bg-pink-500 text-white border-2 border-gray-600 py-1 px-3 lg:py-1 lg:px-6 rounded-md text-xs"
                  : "bg-gray-100 text-black border-2 border-gray-600 py-1 px-3 lg:py-1 lg:px-6 rounded-md text-xs"
              }`}
              onClick={() => filteredProductsByCategory("real")}
            >
              Real
            </button>
            <button
              className={`${
                active === "preserved"
                  ? "bg-pink-500 text-white border-2 border-gray-600 py-1 px-3 lg:py-1 lg:px-6 rounded-md text-xs"
                  : "bg-gray-100 text-black border-2 border-gray-600 py-1 px-3 lg:py-1 lg:px-6 rounded-md text-xs"
              }`}
              onClick={() => filteredProductsByCategory("preserved")}
            >
              Preserved
            </button>
            <button
              className={`${
                active === "artificial"
                  ? "bg-pink-500 text-white border-2 border-gray-600 py-1 px-3 lg:py-1 lg:px-6 rounded-md text-xs"
                  : "bg-gray-100 text-black border-2 border-gray-600 py-1 px-3 lg:py-1 lg:px-6 rounded-md text-xs"
              }`}
              onClick={() => filteredProductsByCategory("artificial")}
            >
              Artificial
            </button>
          </div>
          <div className="mt-4">
            <Swiper
              modules={[Navigation]}
              spaceBetween={10}
              slidesPerView={5}
              navigation={true}
              className="relative"
            >
              {filteredProducts.map((product) => (
                <SwiperSlide key={product._id}>
                  <div
                    className="bg-white lg:w-[130px] w-[80px] hover:border border-gray-500"
                    key={product._id}
                  >
                    <Link to={`product/${product._id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full"
                      />
                    </Link>
                    <div className="p-1 flex flex-col flex-wrap">
                      <p className="pb-2 text-xs">{product.name}</p>
                      <p className="text-pink-700 font-semibold text-xs">
                        ₱{product.price}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
