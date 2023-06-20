import React, { useState } from "react";
import menuImage1 from "../assets/menuImage1.jpg";
import menuImage2 from "../assets/menuImage2.jpg";
import menuImage3 from "../assets/menuImage3.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { Link, useNavigate } from "react-router-dom";
import CardFeatures from "../components/CardFeatures";

const Menu: React.FC = () => {
  const productData = useSelector(
    (state: RootState) => state.product.productList
  );
  const flashSaleIndex = Math.floor(Math.random() * productData.length);
  const flashSale = [productData[flashSaleIndex]];

  const navigate = useNavigate();

  const [filterFlower, setFilterFlower] = useState<String>("all");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setFilterFlower(value);
  };

  // filter products based the selected category
  const filteredProducts =
    filterFlower === "all"
      ? productData
      : productData.filter((product) => product.category === filterFlower);

  return (
    <div className="lg:px-28 px-2 pt-10">
      {/* header */}
      <div className="lg:flex lg:h-[280px] h-auto justify-between">
        <img src={menuImage1} alt="image1" className="w-full lg:w-[53%]" />
        <div className="hidden lg:flex flex-col justify-between">
          <img src={menuImage2} alt="image2" className="w-[360px] h-[135px]" />
          <img src={menuImage3} alt="image3" className="w-[360px] h-[135px]" />
        </div>
        {flashSale[0] &&
          flashSale.map((el) => (
            <div key={el._id} className="hidden lg:block bg-white">
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

      {/* text */}
      <div className="mt-10 font-jost">
        <h1 className="lg:text-3xl text-xl text-pink-600 font-bold">Flowers for you</h1>
        <p className="lg:text-lg text-md text-gray-700">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi
          distinctio est expedita aperiam earum quos enim, cumque aut, eligendi
          quas possimus, officia error repellendus fugit! Exercitationem
          adipisci asperiores quod possimus, iusto dolore harum vel id illum
          quia. Obcaecati labore quod esse quas non sunt quae doloribus vel
          suscipit, unde cumque sit repellat natus soluta dignissimos dolores
          expedita. Ad provident minima nemo temporibus amet ex quae id odit
          repellendus delectus.
        </p>
      </div>

      {/* products */}
      <div className="mt-12 lg:mt-16">
        <div>
          <select
            onChange={handleChange}
            className="w-[180px] p-1 border border-pink-500 rounded-md outline-none"
          >
            <option value="all">Choose a category</option>
            <option value="real">real</option>
            <option value="preserved">preserved</option>
            <option value="artificial">artificial</option>
          </select>
        </div>
        {/* render filtered products */}
        <div className="flex flex-wrap gap-6 my-4">
          {filteredProducts.map((el) => (
            <CardFeatures
              key={el._id}
              id={el._id}
              image={el.image}
              name={el.name}
              price={el.price}
              category={el.category}
              description={el.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
