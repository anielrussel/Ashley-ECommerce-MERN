import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addCartItem } from '../redux/productSlice'

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

    const handleAddCartItem = () => {
        dispatch(addCartItem({
            _id: id,
            name: name,
            price: price,
            image: image,
            category: category,
            description: description
        }))
    }
    return (
        <div className='flex'>
            <div className='hover:shadow-lg bg-white rounded-md hover:scale-105 ease-in-out duration-300'>
                <Link to={`product/${id}`}><img src={image} alt={name} className='lg:w-[250px] lg:h-[200px]' /></Link>
                <div className='p-4'>
                    <h1 className='pb-2'>{name}</h1>
                    <h1 className='text-pink-700 font-bold'>₱{price}</h1>
                    <button className='bg-pink-300 py-1 px-4 rounded-md text-gray-800 text-sm' onClick={handleAddCartItem}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default CardFeatures