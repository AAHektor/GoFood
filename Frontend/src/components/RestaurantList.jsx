import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";

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

                return (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                )
        })}
        </div>
    );
};

export default RestaurantList;
