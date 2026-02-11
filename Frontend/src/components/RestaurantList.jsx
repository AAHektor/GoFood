import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeliveryIcon from '../components/icons/DeliveryIcon'

const RestaurantList = ({ selectedCategory }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5291/api/Restaurants")
            // fetch("http://192.168.1.158:5291/api/Restaurants")
            .then((response) => response.json())
            .then((data) => {
                console.log("Hämtade restauranger:", data);
                setRestaurants(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Kunde inte hämta data:", error);
                setLoading(false);
            });
    }, []);

    const filterRestaurants = restaurants.filter((restaurant) => {
        if (selectedCategory === "popular")
            return restaurant.isPopular === true;

        return (
            restaurant.category?.toLowerCase() == selectedCategory.toLowerCase()
        );
    });

    if (loading) {
        return (
            <p className="text-center text-gray-500">Laddar restauranger...</p>
        );
    }


    return (
        <div className="flex flex-col gap-4 pb-20">
            {filterRestaurants.map((restaurant) => {

                const deliveryCost = restaurant.id % 2 === 0 ? 0 : 49;

                return (
                    <Link
                        to={`/restaurant/${restaurant.id}`}
                        key={restaurant.id}
                        className="rounded-3xl overflow-hidden outline-1 outline-slate-200/50"
                    >
                        <div>
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
                            <h3 className="font-bold text-lg">{restaurant.name}</h3>
                            <p>{restaurant.address}</p>
                        </div>
                        <div className=" bg-white px-4">
                            <div className="border-t border-dashed border-gray-300 py-2 flex gap-2">
                                <DeliveryIcon className="w-4 h-4 text-green-900/60 self-center" />
                                {deliveryCost === 0 ? (
                                    <span className="text-green-500 text-sm">Free Delivery</span>
                                ) : (
                                    <span className="text-slate-500 text-sm">49kr</span>
                                )}
                            </div>
                        </div>
                    </Link>
                )
        })}
        </div>
    );
};

export default RestaurantList;
