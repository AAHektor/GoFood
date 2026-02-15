import React, { useState, useMemo } from 'react'

import { Link } from "react-router-dom";
import DeliveryIcon from '../components/icons/DeliveryIcon'

import HeartIcon from '../components/icons/HeartIcon'
import StarIcon from '../components/icons/StarIcon'


const RestaurantCard = ({ restaurant }) => {
    const [isLiked, setIsLiked ] = useState(false);
    const deliveryCost = restaurant.id % 2 === 0 ? 0 : 49;

    const stars = useMemo(() => {
        const seed = (restaurant.id * 1337) % 31; // Lite "matte-magi"
        return parseFloat((2 + (seed / 10)).toFixed(1));
    }, [restaurant.id]);


  return (
    <Link
        to={`/restaurant/${restaurant.id}`}
        key={restaurant.id}
        className="rounded-3xl overflow-hidden outline-1 outline-slate-200/50 shadow-2xs"
    >
        <div className="relative">
            <div className="w-10 h-10 absolute right-3 top-3 bg-gray-100 rounded-full flex justify-center items-center"
                onClick={ (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsLiked(!isLiked);
                }}
            >
                <HeartIcon 
                className={`h-5 w-5 ${isLiked ? "text-red-500 fill-current" : "text-gray-400"}`} />
            </div>
            <img
                src={
                    restaurant.imageUrl &&
                    restaurant.imageUrl.length > 10
                        ? restaurant.imageUrl
                        : "https://worldfoodtour.co.uk/wp-content/uploads/2013/06/neptune-placeholder-48.jpg"
                }
                alt="Restaurant Image"
                className="w-full h-40 object-cover"
            />
        </div>
        <div className="p-3 bg-white">
            <div className='flex justify-between'>
                <h3 className="font-bold text-lg">{restaurant.name}</h3>
                <span className={` flex flex-row gap-1 justify-center items-center px-1.5 h-5 rounded-md text-sm
                    ${stars >= 3.0 ? 'bg-green-300/60 text-green-600' : 'bg-gray-200/60 text-black'}
                    `}>

                    {stars}
                    <StarIcon className={`w-3.5 h-3.5 self-center font-light ${stars >= 3.0 ? 'text-green-600' : 'text-yellow-600'} `} /></span>
            </div>
        </div>
        <div className=" bg-white px-4">
            <div className="border-t border-dashed border-gray-300 py-2 flex gap-2">
                <DeliveryIcon className="w-4 h-4 text-green-900/60 self-center" />
                {deliveryCost === 0 ? (
                    <span className="text-green-500 text-sm">Gratis leverans</span>
                ) : (
                    <span className="text-slate-500 text-sm">49kr</span>
                )}
            </div>
        </div>
    </Link>
  )
}

export default RestaurantCard