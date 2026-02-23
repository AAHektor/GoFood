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

    const addItem = (item, restaurantId) => {
        if (activeRestaurantId && activeRestaurantId !== restaurantId) {
            return false;
        }

        if (!activeRestaurantId) {
            setActiveRestaurantId(restaurantId);
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
        setItems((prevItems) => prevItems.filter((item) => item.key !== key));
    };

    const clearCart = () => {
        setItems([]);
        setActiveRestaurantId(null);
    };

    const setItemQuantity = (key, quantity) => {
        setItems((prev) =>
            quantity <= 0
                ? prev.filter((item) => item.key !== key)
                : prev.map((item) =>
                      item.key === key ? { ...item, quantity } : item,
                  ),
        );
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
        localStorage.setItem("cart", JSON.stringify({ items, activeRestaurantId }));
    }, [items, activeRestaurantId]);

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
            }}
        >
            {children}
        </CartContext.Provider>
    );

};

