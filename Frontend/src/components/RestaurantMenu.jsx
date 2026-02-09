import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

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
                throw new Error("Kunde itne hämta restaurang!")
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
         <Link to="/">
             Tillbaka till Restauranger
        </Link>

        <div>
            {restaurant ? (
                <>
                    <h1>{restaurant.name}</h1>
                    <p>{restaurant.address}</p>
                </>
            ) : (
                <h1>Laddar restaurang...</h1>
            )}
        </div>

        <h2>Meny</h2>

        <div>
            {menuItems.length === 0 ? (
                <p>Ingen meny hittades (eller laddar...)</p>
            ) : (
                menuItems.map((item) => (
                    <div key={item.id}>
                        <div>
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p>{item.price}</p>
                        </div>
                        <button>
                            lägg till i varukorgen
                        </button>
                    </div>
                ))
            )}

        </div>
    </div>
  );
};

export default RestaurantMenu