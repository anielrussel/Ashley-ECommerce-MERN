import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/index";
import CartProducts from "../components/CartProducts";
import emptyCart from "../assets/emptycart.gif";
import { toast } from "react-hot-toast";

const Cart: React.FC = () => {
  const productCartItem = useSelector((state: RootState) => state.product.cartItem);
  const isAuthenticated = useSelector((state: RootState) => state.user.isLoggedIn);
  const currentUserID = useSelector((state: RootState) => state.user._id);

  // Filter cart items based on the logged-in user
  const userCartItems = productCartItem.filter((item) => item.userId === currentUserID);
  const totalQuantity = userCartItems.reduce((acc, curr) => acc + curr.qty, 0);
  const totalPrice = userCartItems.reduce((acc, curr) => acc + curr.total, 0);


  const handlePayment = async () => {
    toast.success("Payment success!")
  };
  

  return (
    <div className="lg:px-28 px-2 py-10">
      {isAuthenticated ? (
        <>
          {userCartItems.length > 0 ? (
            <div className="lg:flex lg:justify-between">
              {/* Cart Items */}
              <div className="pt-8 max-w-2xl w-full">
                <h1 className="font-jost text-xl font-bold text-gray-700 pb-4">Your Cart Items</h1>
                <div className="flex flex-col gap-6 flex-wrap">
                  {userCartItems.map((el) => (
                    <CartProducts
                      key={el._id}
                      _id={el._id}
                      image={el.image}
                      name={el.name}
                      category={el.category}
                      price={el.price}
                      description={el.description}
                      qty={el.qty}
                      total={el.total}
                      userId={el.userId}
                    />
                  ))}
                </div>
              </div>
              {/* Summary */}
              <div className="pt-8 lg:max-w-md w-full font-jost">
                <h1 className="font-jost text-xl font-bold text-gray-700 pb-4">Summary</h1>
                <div className="bg-white p-4 rounded-md shadow-lg">
                  <p className="flex justify-between text-lg font-semibold text-gray-700">
                    <span>Total Quantity:</span>
                    <span className="text-pink-600">{totalQuantity}</span>
                  </p>
                  <p className="flex justify-between pt-2 text-lg font-semibold text-gray-700">
                    <span>Total Price:</span>
                    <span className="text-pink-600">₱ {totalPrice.toLocaleString()}</span>
                  </p>
                  <button className="bg-pink-500 w-full text-white p-1 mt-4 rounded-md" onClick={handlePayment}>Checkout</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center mt-20 justify-center">
              <img src={emptyCart} alt="empty cart" className="w-[200px] rounded-full" />
              <h1 className="font-jost text-2xl text-gray-700 font-bold">Your Cart is Empty</h1>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center mt-20 justify-center">
          <img src={emptyCart} alt="empty cart" className="w-[200px] rounded-full" />
          <h1 className="font-jost text-2xl text-gray-700 font-bold">
            Please log in to view your cart
          </h1>
        </div>
      )}
    </div>
  );
};

export default Cart;
