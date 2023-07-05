import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { addCartItem } from "../redux/productSlice";
import { RootState } from "../redux/index";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Product {
  name: string;
  image: string;
  price: number;
  id: string;
  category: string;
  description: string;
}

const CardFeatures: React.FC<Product> = ({
  name,
  image,
  price,
  id,
  category,
  description,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state: RootState) => state.user._id);

  const location = useLocation();
  const isMenuPage = location.pathname.includes("/menu");

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isLoggedIn
  );

  const handleAddCartItem = () => {
    if (!isAuthenticated) {
      // User is not logged in, handle accordingly (e.g., show error message)
      toast.error("Please log in to add items to the cart.");
      navigate("/login");
      return;
    }

    dispatch(
      addCartItem({
        _id: id,
        name: name,
        price: price,
        image: image,
        category: category,
        description: description,
        userId: userId,
      })
    );
  };

  return (
    <div className="flex">
      <div className="hover:shadow-lg max-w-[160px] lg:max-w-[200px] bg-white hover:scale-105 ease-in-out duration-300">
        <Link to={isMenuPage ? `product/${id}` : `/product/${id}`} replace>
          <img
            src={image}
            alt={name}
            className="lg:w-[250px] w-[220px] lg:h-[200px] h-[180px]"
            onClick={() => navigate(`product/${id}`)}
          />
        </Link>
        <div className="p-4">
          <h1 className="pb-2 text-sm">{name}</h1>
          <h1 className="text-pink-700 font-semibold text-sm">₱{price}</h1>
          <button
            className="bg-pink-500 py-1 px-4 text-white text-sm w-full"
            onClick={handleAddCartItem}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardFeatures;
