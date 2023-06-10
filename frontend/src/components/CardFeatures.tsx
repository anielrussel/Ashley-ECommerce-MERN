import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addCartItem } from '../redux/productSlice'
import { RootState } from '../redux/index'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

interface Product {
    name: string,
    image: string,
    price: number,
    id: string,
    category: string,
    description: string
}

const CardFeatures: React.FC<Product> = ({ name, image, price, id, category, description }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const userId = useSelector((state: RootState) => state.user._id);

    const isAuthenticated = useSelector(
        (state: RootState) => state.user.isLoggedIn
      );

      const handleAddCartItem = () => {
        if (!isAuthenticated) {
          // User is not logged in, handle accordingly (e.g., show error message)
          toast("User is not logged in. Please log in to add items to the cart.");
          navigate("/login")
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
              userId: userId
          })
        );
      };
    
    return (
        <div className='flex'>
            <div className='hover:shadow-lg bg-white rounded-md hover:scale-105 ease-in-out duration-300'>
                <Link to={`product/${id}`}><img src={image} alt={name} className='lg:w-[250px] lg:h-[200px]' /></Link>
                <div className='p-4'>
                    <h1 className='pb-2'>{name}</h1>
                    <h1 className='text-pink-700 font-bold'>₱{price}</h1>
                    <button className='bg-pink-500 py-1 px-4 rounded-md text-white text-sm w-full' onClick={handleAddCartItem}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default CardFeatures