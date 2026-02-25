import React, { useState } from 'react'
import RestaurantList from '../components/RestaurantList'

import avatarIcon from '../assets/avatar.svg'
import SearchIcon from '../components/icons/SearchIcon'
import QuickFilter from '../components/QuickFilter'
import BottomNav from '../components/BottomNav'
import FilterIcon from '../components/icons/FilterIcon'
import GoIcon from '../components/icons/GoIcon'

const Discovery = () => {

    const [activeCategory, setActiveCategory] = useState('popular');
    const [isLoading, setIsLoading] = useState(false);

    const handleCategoryChange = (category) => {
        setIsLoading(true);
        setActiveCategory(category);
        setTimeout(() => setIsLoading(false), 500);
    }

  return (
    <div className='min-h-screen flex flex-col bg-gray-200/50'>

        <div className='bg-white p-4'>
            <div className='w-full flex justify-between pb-5'>
                <div>
                    <p className='text-sm font-semibold text-slate-500'>DELIVER TO</p>
                    <p className='text-md font-semibold text-slate-700'>4517 Washington Ave</p>
                </div>

                <div className='bg-gray-100 rounded-full w-11 h-11 justify-center items-center flex border border-slate-300'>
                    <img src={avatarIcon} alt="User Avatar" className='w-6 h-6'/>
                </div>
            </div>

            <div className='bg-gray-100 p-3 pl-5 rounded-full flex'>
                <div className='items-center w-6 h-6 mr-5'>
                    <SearchIcon className="w-full h-full text-green-700" />
                </div>
                <input type="text" placeholder='What are you craving?'className='bg-transparent outline-none w-full text-gray-700 placeholder-green-900/60'/>
                <button className=''>
                    <FilterIcon className="w-6 h-6 relative right-2 text-gray-500" />
                </button>
            </div>
        </div>

        <QuickFilter activeCategory={activeCategory} setActiveCategory={handleCategoryChange} />

        <main className='flex-1 px-4 pt-4'>
            <h2 className='text-xl font-bold pb-2'>Nearby Favorites</h2>

            {isLoading ? (
                <div className='flex justify-center items-center py-12'> 
                    <div className='flex justify-center items-center py-12'>
                        <GoIcon className="w-40 h-auto animate-ping" />
                    </div>
                </div>
            ) : (
                <div className='animate-fadeIn'>
                    <RestaurantList selectedCategory={activeCategory} />
                </div>
            )}
        </main>

        <BottomNav />
    </div>
  )
}

export default Discovery