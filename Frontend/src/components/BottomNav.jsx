import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import HomeIcon from '../components/icons/HomeIcon'
import SearchIcon from '../components/icons/SearchIcon'
import OrdersIcon from '../components/icons/OrdersIcon'
import ProfileIcon from '../components/icons/ProfileIcon'

const BottomNav = () => {
    const location = useLocation()
    const isActive = (path) => location.pathname === path;

  return (
    <div className='px-6 fixed bottom-0 w-full bg-white py-3 border-t border-slate-300 '>

        <div className='flex justify-between items-center max-w-md mx-auto w-full'>
            <Link to="/" className={`text-xs flex flex-col gap-1.5 ${isActive('/') ? 'text-green-600' : 'text-gray-400' }`}>
                <span className='flex justify-center items-center'> <HomeIcon className="w-5 h-5" /> </span>
                <span>Home</span>
            </Link>
            <Link to="/" className={`text-xs flex flex-col gap-1.5 ${isActive('/browse') ? 'text-green-500' : 'text-gray-400' }`}>
                <span className='flex justify-center items-center'> <SearchIcon className="w-5 h-5" /> </span>
                <span>Browse</span>
            </Link>
            <Link to="/orders" className={`text-xs flex flex-col gap-1.5 ${isActive('/orders') ? 'text-green-500' : 'text-gray-400' }`}>
                <span className='flex justify-center items-center'> <OrdersIcon className="w-5 h-5" /> </span>
                <span>Orders</span>
            </Link>
            <Link to="/profile" className={`text-xs flex flex-col gap-1.5 ${isActive('/profile') ? 'text-green-500' : 'text-gray-400' }`}>
                <span className='flex justify-center items-center'> <ProfileIcon className="w-5 h-5" /> </span>
                <span>Profile</span>
            </Link>
        </div>


    </div>
  )
}

export default BottomNav