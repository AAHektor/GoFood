import React from 'react'
import RestaurantList from '../components/RestaurantList'

import avatarIcon from '../assets/avatar.svg'
import SearchIcon from '../components/icons/SearchIcon'
import QuickFilter from '../components/QuickFilter'

const Discovery = () => {
  return (
    <div className='min-h-screen flex flex-col bg-gray-100'>

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
            </div>
        </div>

        <QuickFilter />

        <main className='flex-1 px-4 pt-4'>
            <h2 className='text-lg font-bold'>Nearby Favorites</h2>
            <RestaurantList />
        </main>
    </div>
  )
}

export default Discovery