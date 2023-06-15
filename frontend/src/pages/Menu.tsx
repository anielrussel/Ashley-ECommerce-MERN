import React from "react";
import menuImage1 from "../assets/menuImage1.jpg";
import menuImage2 from "../assets/menuImage2.jpg";
import menuImage3 from "../assets/menuImage3.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { Link, useNavigate } from "react-router-dom";

const Menu: React.FC = () => {
  const productData = useSelector(
    (state: RootState) => state.product.productList
  );
  const flashSaleIndex = Math.floor(Math.random() * productData.length);
  const flashSale = [productData[flashSaleIndex]];

  const navigate = useNavigate();
  return (
    <div className="lg:px-28 pt-10">
      <div className="flex h-[280px] justify-between">
        <img src={menuImage1} alt="image1" className="w-[53%]" />
        <div className="flex flex-col justify-between">
          <img src={menuImage2} alt="image2" className="w-[360px] h-[135px]" />
          <img src={menuImage3} alt="image3" className="w-[360px] h-[135px]" />
        </div>
        {flashSale[0] &&
          flashSale.map((el) => (
            <div className="bg-white">
              <Link to={`product/${el._id}`}>
                <img
                  src={el.image}
                  alt={el.name}
                  className="lg:w-[250px] lg:h-[200px]"
                  onClick={() => navigate(`product/${el._id}`)}
                />
              </Link>
              <div className="p-4">
                <h1 className="pb-2">{el.name}</h1>
                <h1 className="text-pink-700 font-bold">₱{el.price}</h1>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Menu;
