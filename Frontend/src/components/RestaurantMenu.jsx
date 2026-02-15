import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

import ArrowLeftIcon from '../components/icons/ArrowLeftIcon'

const RestaurantMenu = () => {
    const { id } = useParams();
    const [menuItems, setMenuItems] = useState([]);
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5291/api/MenuItems/${id}`)
        .then(res => res.json())
        .then(data => setMenuItems(data))
        .catch(err => console.error(err));

        fetch(`http://localhost:5291/api/Restaurants/${id}`)
        .then(res => {
            if (!res.ok) {
                throw new Error("Kunde inte hämta restaurang!")
            }
            return res.json();
        })
        .then(data => {
            console.log("Hittade restaurang:", data);
            setRestaurant(data);
        })
        .catch(err => console.error(err))
    }, [id]);

  return (
    <div>
        <div className="relative h-64 w-full overflow-hidden">
            <img
                src={
                    restaurant?.imageUrl && restaurant.imageUrl.length > 10
                        ? restaurant.imageUrl
                        : "https://worldfoodtour.co.uk/wp-content/uploads/2013/06/neptune-placeholder-48.jpg"
                }
                alt={restaurant?.name}
                className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute top-4 left-4">
                <Link 
                    className='bg-white/90 backdrop-blur-sm w-10 h-10 rounded-full flex justify-center items-center shadow-lg hover:bg-white transition-all active:scale-95' 
                    to="/"
                >
                    <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
                </Link>
            </div>
        </div>

        <div className="p-4 bg-white -mt-6 relative rounded-t-3xl shadow-sm">
            <h1 className="text-2xl font-bold">{restaurant?.name}</h1>
            <p className="text-gray-500">{restaurant?.address}</p>
        </div>

        <div className='px-4 py-4'>
            <div>
                {menuItems.length === 0 ? (
                    <p>Ingen meny hittades (eller laddar...)</p>
                ) : (
                    menuItems.map((item) => (
                        <div key={item.id}>
                            <div className='grid grid-cols-5 items-center gap-5'>
                                <div className='flex flex-col col-span-3'>
                                    <h3 className='font-semibold text-[16px] pb-1'>{item.name}</h3>
                                    <p className='text-[15px] font-light line-clamp-2 text-slate-500'>{item.description}</p>
                                    <p className='text-green-600/70 font-semibold'>{item.price}sek</p>
                                </div>
                                <div className='col-span-2 flex justify-end'>
                                    <div className='h-30 w-30 shadow-sm rounded-2xl overflow-hidden border border-gray-100'>
                                        <img src={item.imageUrl} alt="" className='h-full w-full object-cover' />
                                    </div>
                                </div>
                            </div>
                            <button>
                                varukorg
                            </button>
                        </div>
                    ))
                )}

            </div>

        </div>

    </div>
  );
};

export default RestaurantMenu