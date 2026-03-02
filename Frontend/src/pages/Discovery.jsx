import React, { useState, useRef, useEffect } from 'react'
import RestaurantList from '../components/RestaurantList'
import AddressModal from '../components/AddressModal'

import avatarIcon from '../assets/avatar.svg'
import SearchIcon from '../components/icons/SearchIcon'
import QuickFilter from '../components/QuickFilter'
import BottomNav from '../components/BottomNav'
import FilterIcon from '../components/icons/FilterIcon'
import GoIcon from '../components/icons/GoIcon'
import { useSearchParams } from 'react-router-dom'

const Discovery = () => {
    const [searchParams] = useSearchParams();
    const searchInputRef = useRef(null);

    const [activeCategory, setActiveCategory] = useState('popular');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (searchParams.get('focus') === 'search' && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchParams]);
    

    const handleCategoryChange = (category) => {
        setIsLoading(true);
        setActiveCategory(category);
        setTimeout(() => setIsLoading(false), 500);
    }

    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [address, setAddress] = useState(() => {
        return localStorage.getItem('deliveryAddress') || '4517 Washington Ave';
    });

    const handleSaveAddress = (newAddress) => {
        setAddress(newAddress);
        localStorage.setItem('deliveryAddress', newAddress);
    };

    const categoryTitles = {
        popular: 'Trendiga restauranger',
        pizza: 'Pizzor nära dig',
        sushi: 'Allt om sushi',
        burger: 'Burgare du älskar',
        healthy: 'Hälsosamma alternativ',
    }

  return (
    <div className='min-h-screen flex flex-col bg-gray-200/50'>

        <div className='bg-white p-4'>
            <div className='w-full flex justify-between pb-5'>
                <button className='flex flex-col items-start'
                    onClick={() => setIsAddressModalOpen(true)}
                >
                    <p className='text-sm font-semibold text-slate-500'>LEVERANS TILL</p>
                    <p className='text-md font-semibold text-slate-700'>{address}</p>
                </button>

                <div className='bg-gray-100 rounded-full w-11 h-11 justify-center items-center flex border border-slate-300'>
                    <img src={avatarIcon} alt="User Avatar" className='w-6 h-6'/>
                </div>
            </div>

            <div className='bg-gray-100 p-3 pl-5 rounded-full flex'>
                <div className='items-center w-6 h-6 mr-5'>
                    <SearchIcon className="w-full h-full text-green-700" />
                </div>
                <input ref={searchInputRef} type="text" placeholder='Vad vill du äta?'className='bg-transparent outline-none w-full text-gray-700 placeholder-green-900/60'/>
                <button className=''>
                    <FilterIcon className="w-6 h-6 relative right-2 text-gray-500" />
                </button>
            </div>
        </div>

        <QuickFilter activeCategory={activeCategory} setActiveCategory={handleCategoryChange} />

        <main className='flex-1 px-4 pt-4'>
            <h2 className='text-xl font-bold pb-2'>
                {categoryTitles[activeCategory] || 'Restauranger'}
            </h2>

            {isLoading ? (
                <div className='flex justify-center items-center py-12'> 
                    <div className='flex justify-center items-center py-12'>
                        <GoIcon className="w-20 h-auto animate-spin [animation-duration:1s]" />
                    </div>
                </div>
            ) : (
                <div className='animate-fadeIn'>
                    <RestaurantList selectedCategory={activeCategory} />
                </div>
            )}
        </main>

        <BottomNav />

        <AddressModal 
            isOpen={isAddressModalOpen}
            onClose={() => setIsAddressModalOpen(false)}
            currentAddress={address}
            onSave={handleSaveAddress}
        />
    </div>
  )
}

export default Discovery