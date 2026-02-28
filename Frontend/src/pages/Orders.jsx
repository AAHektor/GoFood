import React, { useState, useEffect } from 'react'
import BottomNav from '../components/BottomNav'

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5291/api/Orders')
            .then(res => res.json())
            .then(data => {
                setOrders(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [])

    const formatData = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('sv-SE', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const parseItems = (itemJson) => {
        try {
            return JSON.parse(itemJson)
        } catch {
            return [];
        }
    }


  return (
    <div className='min-h-screen flex flex-col bg-gray-200/50'>
        <div className='flex w-full items-center justify-center bg-white px-6 py-6'>
            <h1 className='font-semibold text-xl'>Dina Beställningar</h1>
        </div>

        <div className='p-4 space-y-3 pb-20'>
            {loading ? (
                <p>Laddar beställningar...</p>
            ) : orders.length === 0 ? (
                <p>Du har inga beställningar än.</p>
            ) : (
                orders.map(order => {
                    const items = parseItems(order.itemsJson);
                    return (
                        <div key={order.id} className='bg-white rounded-lg shadow p-4'>
                            <div className='flex justify-between items-center mb-2'>
                                <h2 className='font-semibold text-lg'>{order.restaurantName}</h2>
                                <span className='text-sm text-gray-500'>{formatData(order.orderDate)}</span>
                            </div>
                            <div className='space-y-1'>
                                {items.map((item, index) => (
                                    <div key={index} className='flex justify-between text-sm'>
                                        <span>{item.name} x{item.quantity}</span>
                                        <span>{item.price * item.quantity}kr</span>
                                    </div>
                                ))}
                            </div>
                            <div className='border-t mt-2 pt-2 flex justify-end'>
                                <span className='font-semibold'>{order.totalPrice}kr</span>
                            </div>
                        </div>
                    )
                })
            )}
        </div>
        <BottomNav />
    </div>
  )
}

export default Orders