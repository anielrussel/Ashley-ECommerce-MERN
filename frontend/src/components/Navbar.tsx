import React, { useState } from 'react'
import flowerlogo from '../assets/flowershop.png'
import { FaShoppingCart, FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "../redux/index"
import { logoutRedux } from "../redux/userSlice"
import { toast } from 'react-hot-toast'
import { FiLogOut } from "react-icons/fi"

const Navbar: React.FC = () => {
    const [showMenu, setShowMenu] = useState(false)

    const userData = useSelector((state: RootState) => state.user)

    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logoutRedux(""))
        toast("Logout successful!")
    }

    const handleShowMenu = () => {
        setShowMenu(prevShowMenu => !prevShowMenu)
    }

    const cartNumberItem = useSelector((state: RootState) => state.product.cartItem)

    return (
        <div className='font-jost'>
            <div className='bg-pink-600 text-white text-center'><p>Shop now to get <span className='font-bold'>10% discount</span></p></div>
            <nav className='flex justify-between py-1 px-8 shadow-lg'>
                <div>
                    <Link to={""}><img src={flowerlogo} alt='logo' className='w-[150px] cursor-pointer' /></Link>
                </div>
                <div className='flex items-center gap-10'>
                    <ul className='flex gap-4 lg:gap-8'>
                        <Link to={""}><li>Home</li></Link>
                        <Link to={"menu"}><li>Flowers</li></Link>
                        <Link to={"about"}><li>About</li></Link>
                        <Link to={"contact"}><li>Contact</li></Link>
                    </ul>
                </div>
                <div className='flex gap-4 items-center lg:gap-8'>
                    <Link to={'cart'}><div className='text-gray-800 relative cursor-pointer'>
                        <FaShoppingCart size={25} color="gray" />
                        <p className='absolute -top-1 -right-1 bg-red-600 p-0 text-sm text-white h-4 w-4 text-center rounded-full'>{cartNumberItem.length}</p>
                    </div></Link>
                    <div className='text-gray-800 p-1 border border-gray-700 rounded-full cursor-pointer' onClick={handleShowMenu}>
                        {userData.image ? <img src={userData.image} className='w-10 h-10 rounded-full shadow-lg' /> : <FaUserAlt size={22} color="gray" />}
                    </div>
                    {showMenu &&
                        <div className='absolute flex flex-col bg-white top-[70px] w-auto right-8 py-4 px-6 shadow-allShadow rounded-md mt-6'>
                            {userData.firstName && <div className='p-2 shadow-allShadowLite rounded-md pr-20'>
                                <h1 className='font-bold text-lg'>{`${userData.firstName} ${userData.lastName}`}</h1>
                                <p>{userData.email}</p>
                            </div>}
                            {userData.email === import.meta.env.VITE_ADMIN_SERVER && <Link to={"newproduct"} className='whitespace-nowrap cursor-pointer mt-4 font-bold'>New product</Link>}

                            {userData.image ? <p className='flex items-center gap-2 cursor-pointer mt-20' onClick={handleLogout}><FiLogOut size={30} />Log Out</p> : <Link to={"login"} className='whitespace-nowrap cursor-pointer'>Login</Link>}
                        </div>
                    }
                </div>
            </nav>
        </div>
    )
}

export default Navbar