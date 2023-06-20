import React from 'react'

interface Product {
    name: string,
    image: string,
}

const HomeCard: React.FC<Product> = ({name, image}) => {
  return (
    <div>
        <div>
            <img src={image} alt={name} className='lg:w-[290px] md:w-[200px] w-[150px] border border-gray-400 bg-gray-300 p-3'/>
        </div>
    </div>
  )
}

export default HomeCard