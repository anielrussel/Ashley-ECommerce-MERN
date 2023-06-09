import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import CartProducts from "../components/CartProducts";
import emptyCart from "../assets/emptycart.gif"

const Cart: React.FC = () => {
  const productCartItem = useSelector(
    (state: RootState) => state.product.cartItem
  );
  console.log(productCartItem);

  const totalQuantity = productCartItem.reduce((acc, curr) => acc + curr.qty, 0)
  const totalPrice = productCartItem.reduce((acc, curr) => acc + curr.total, 0)

  return (
    <div className="lg:px-28 pt-10">
      {productCartItem[0] ?
        <div className="lg:flex justify-between">
          <div className="pt-8 max-w-2xl w-full">
            <h1 className="font-jost text-xl font-bold text-gray-700 pb-4">Your Cart Items</h1>
            <div className="flex flex-col gap-6 flex-wrap">
              {productCartItem.map((el) => {
                return (
                  <CartProducts
                    key={el._id}
                    _id={el._id}
                    image={el.image}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    description={el.description}
                    qty={el.qty}
                    total={el.total} />
                );
              })}
            </div>
          </div><div className="pt-8 max-w-md w-full font-jost">
            <h1 className="font-jost text-xl font-bold text-gray-700 pb-4">Summary</h1>
            <div className="bg-white p-4">
              <p className="flex justify-between"><span>Total Quantity:</span><span>{totalQuantity}</span></p>
              <p className="flex justify-between"><span>Total Price:</span><span>{totalPrice.toLocaleString()}</span></p>
              <button className="bg-pink-500 w-full text-white p-1">Payment Method</button>
            </div>
          </div>
        </div>
        :
        <div className="flex flex-col items-center mt-20 justify-center">
          <img src={emptyCart} alt="empty cart" className="w-[200px] rounded-full"/>
          <h1 className="font-jost text-2xl text-gray-700 font-bold">Your Cart is Empty</h1>
        </div>
      }
    </div>
  );
};

export default Cart;
