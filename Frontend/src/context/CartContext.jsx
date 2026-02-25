import React, { useEffect } from 'react';
import { createContext, useState, useMemo } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext(null);


export const CartProvider = ({ children }) => {
    const [items, setItems] = useState(() => {
        try {
            const saved = localStorage.getItem("cart");
            return saved ? (JSON.parse(saved).items || []) : [];
        } catch {
            return [];
        }
    });

    const [activeRestaurantId, setActiveRestaurantId] = useState(() => {
        try {
            const saved = localStorage.getItem("cart");
            return saved ? (JSON.parse(saved).activeRestaurantId || null) : null;
        } catch {
            return null;
        }
    })

    const [activeRestaurantName, setActiveRestaurantName] = useState(() => {
        try {
            const saved = localStorage.getItem("cart");
            return saved ? (JSON.parse(saved).activeRestaurantName || null) : null;
        } catch {
            return null;
        }
    });

    const addItem = (item, restaurantId, restaurantName) => {
        if (activeRestaurantId && activeRestaurantId !== restaurantId) {
            return false;
        }

        if (!activeRestaurantId) {
            setActiveRestaurantId(restaurantId);
            setActiveRestaurantName(restaurantName);
        }

        const key = `${restaurantId}:${item.id}`;

        setItems((prev) => {
            const existing = prev.find((entry) => entry.key === key);
            if (existing) {
                return prev.map((entry) =>
                    entry.key === key
                        ? { ...entry, quantity: entry.quantity + 1 }
                        : entry,
                );
            }
            return [...prev, { ...item, restaurantId, key, quantity: 1 }];
        });
    };

    const removeItem = (key) => {
        setItems((prevItems) => {
            const newItems = prevItems.filter((item) => item.key !== key);
            if (newItems.length === 0) {
                setActiveRestaurantId(null);
                setActiveRestaurantName(null);
            }
            return newItems;
        });
    };

    const clearCart = () => {
        setItems([]);
        setActiveRestaurantId(null);
        setActiveRestaurantName(null);
    };

    const setItemQuantity = (key, quantity) => {
        setItems((prev) => {
            const newItems = quantity <= 0
                ? prev.filter((item) => item.key !== key)
                : prev.map((item) =>
                    item.key === key ? { ...item, quantity } : item,
                );
            
            if (newItems.length === 0) {
                setActiveRestaurantId(null);
                setActiveRestaurantName(null);
            }
            
            return newItems;
        });
    };

    const totals = useMemo(() => {
        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
        );
        return { totalItems, totalPrice };
    }, [items]);

    useEffect(() =>  {
        localStorage.setItem("cart", JSON.stringify({ items, activeRestaurantId, activeRestaurantName }));
    }, [items, activeRestaurantId, activeRestaurantName]);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                clearCart,
                setItemQuantity,
                ...totals,
                activeRestaurantId,
                activeRestaurantName,
            }}
        >
            {children}
        </CartContext.Provider>
    );

};

