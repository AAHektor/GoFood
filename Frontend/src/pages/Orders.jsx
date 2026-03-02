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

    const getTotalItemCount = (items) => {
        return items.reduce((total, item) => total + item.quantity, 0);
    }


  return (
    <div className='min-h-screen flex flex-col bg-gray-200/50'>
        <div className='flex w-full items-center justify-center bg-white px-6 py-6'>
            <h1 className='font-semibold text-xl'>Dina Beställningar</h1>
        </div>

        <div className='p-4 space-y-4 pb-20'>
            {loading ? (
                <p>Laddar beställningar...</p>
            ) : orders.length === 0 ? (
                <p>Du har inga beställningar än.</p>
            ) : (
                orders.map(order => {
                    const items = parseItems(order.itemsJson);
                    const itemCount = getTotalItemCount(items);
                    return (
                        <div key={order.id} className='bg-white rounded-3xl shadow p-4'>
                            <div className='flex justify-start mb-2 gap-4'>
                                <div className=''>
                                    <img 
                                    className='h-15 w-15 object-cover rounded-2xl'
                                    src={order.restaurantImageUrl} alt="" />
                                </div>
                                <div className='flex flex-col'>
                                    <h2 className='font-semibold text-lg'>{order.restaurantName}</h2>
                                    <div className='flex gap-2 justify-center items-center text-gray-500'>
                                        <span className='text-sm text-gray-500'>{formatData(order.orderDate)}</span>
                                        <span className='text-sm text-gray-500'>• {itemCount} {itemCount === 1 ? 'vara' : 'varor'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='border-t border-gray-100 mt-2 pt-2 flex justify-between items-center'>
                                <div className='flex flex-col'>
                                    <span className='text-gray-500'>Total:</span>
                                    <span className='font-semibold'>{order.totalPrice}kr</span>
                                </div>
                                <button className='bg-red-600/70 text-lg text-white font-semibold rounded-2xl px-4 py-1 shadow shadow-red-300'>Beställ</button>
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