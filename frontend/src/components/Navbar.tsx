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

    return (
        <nav className='flex justify-between py-1 px-8 shadow-lg relative z-50'>
            <div>
                <Link to={""}><img src={flowerlogo} alt='logo' className='w-[150px] cursor-pointer' /></Link>
            </div>
            <div className='flex items-center gap-10'>
                <ul className='flex gap-4 lg:gap-8 font-semibold'>
                    <Link to={""}><li>Home</li></Link>
                    <Link to={"menu"}><li>Menu</li></Link>
                    <Link to={"about"}><li>About</li></Link>
                    <Link to={"contact"}><li>Contact</li></Link>
                </ul>
                <div className='flex gap-4 items-center lg:gap-8' onClick={handleShowMenu}>
                    <div className='text-gray-800 relative cursor-pointer'>
                        <FaShoppingCart size={25} />
                        <p className='absolute -top-1 -right-1 bg-red-600 p-0 text-sm text-white h-4 w-4 text-center rounded-full'>0</p>
                    </div>
                    <div className='text-gray-800 p-1 border border-gray-700 rounded-full cursor-pointer'>
                        {userData.image ? <img src={userData.image} className='w-10 h-10 rounded-full shadow-lg' /> : <FaUserAlt size={22} />}
                    </div>
                    {showMenu &&
                        <div className='absolute flex flex-col bg-white top-[70px] w-[200px] right-8 p-4 shadow-lg rounded-md'>
                            <h1 className='font-bold text-lg'>{`${userData.firstName} ${userData.lastName}`}</h1>
                            <p>{userData.email}</p>
                            {userData.email === import.meta.env.VITE_ADMIN_SERVER && <Link to={"newproduct"} className='whitespace-nowrap cursor-pointer'>New product</Link> }

                            {userData.image ? <p className='flex items-center gap-2 cursor-pointer mt-20' onClick={handleLogout}><FiLogOut size={30}/>Log Out</p> : <Link to={"login"} className='whitespace-nowrap cursor-pointer'>Login</Link>}
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar