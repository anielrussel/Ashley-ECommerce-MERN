import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiMinus } from 'react-icons/bi';
import { BsTrashFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { deleteCartItem, increaseQty, decreaseQty, CartItem } from '../redux/productSlice';

const CartProducts: React.FC<CartItem> = ({ _id, name, image, category, price, description, qty, total }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    const product: CartItem = {
      _id,
      name,
      category,
      image,
      price,
      description,
      qty: 0,
      total: 0,
    };
    dispatch(deleteCartItem(product));
  };

  const handleQuantityChange = (action: 'increase' | 'decrease') => {
    if (action === 'increase') {
      const product: CartItem = {
        _id,
        name,
        category,
        image,
        price,
        description,
        qty,
        total,
      };
      dispatch(increaseQty(product));
    } else {
        const product: CartItem = {
          _id,
          name,
          category,
          image,
          price,
          description,
          qty,
          total,
        };
        dispatch(decreaseQty(product));
    }
  };


  return (
    <div className='font-jost'>
      <div className='flex justify-between bg-white rounded-md'>
        <div className='flex gap-4'>
          <img src={image} alt={name} className='w-[200px] rounded-md' />
          <div className='flex flex-col p-2'>
            <h1 className='font-bold text-lg text-gray-700'>{name}</h1>
            <p>{category}</p>
            <p className='text-pink-600 font-semibold'>₱{price.toLocaleString()}</p>
            <div className='flex items-center gap-6'>
              <button className='px-3 rounded-md text-pink-600 font-bold' onClick={() => handleQuantityChange('increase')}>
                <AiOutlinePlus />
              </button>
              <p className='text-xl'>{qty}</p>
              <button className='px-3 rounded-md text-pink-600 font-bold text-3xl' onClick={() => handleQuantityChange('decrease')}>
                <BiMinus />
              </button>
            </div>
            <div className='flex gap-3'>
              <p>Total:</p>
              <p className='text-pink-600 font-semibold'>₱{(total * qty).toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className='p-2 text-gray-700 hover:text-red-500 cursor-pointer' onClick={handleDelete}>
          <BsTrashFill />
        </div>
      </div>
    </div>
  );
};

export default CartProducts;
