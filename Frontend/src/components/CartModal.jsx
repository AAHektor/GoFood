import React, { useEffect ,useState } from 'react'
import { useCart } from '../context/useCart';
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon';
import TrashIcon from '../components/icons/TrashIcon';

const CartModal = ({ onClose }) => {
    const { items, totalPrice, setItemQuantity, removeItem, activeRestaurantName } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => setIsOpen(true));

        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };

    }, []);

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => onClose(), 300);
    };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-end z-50'>
        <div className={`bg-white w-full h-full p-6 max-h-screen overflow-y-auto flex flex-col
            ${isOpen ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-300 ease-in-out
            `}>
            
            <div className='border-b mb-6 border-gray-300'>
                <div className='relative flex justify-between items-center p-6'>
                    <button 
                    onClick={handleClose} 
                    className='absolute w-10 h-10 text-gray-500 bg-gray-200 outline outline-gray-200 rounded-full text-3xl font-light justify-center items-center flex'
                    >
                    <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <h2 className='text-2xl font-bold flex w-full justify-center items-center'>Din Order</h2>
                </div>
            </div>

            <div className='pb-4'>
                <h2 className='text-xl font-semibold'>{activeRestaurantName}</h2>
                {/* hardcoded for now, will build a delivery time estimator later*/}
                <p className='text-gray-400 text-[14px]'>Estimerad leverans 20-30 min</p> 
            </div>

            {items.length === 0 ? (
                <p className='text-gray-500 text-center py-8'>Din kundvagn är tom</p>
            ) : (
                <> 
                    <div className='flex-1 overflow-y-auto space-y-4 mb-6'> 
                        {items.map((item) => (
                            <div key={item.key} className="flex items-center justify-between pb-4">
                                {item.imageUrl && (
                                    <div className='h-20 w-20 rounded-3xl overflow-hidden border border-gray-200 mr-4'>
                                        <img src={item.imageUrl} alt={item.name} className='h-full w-full object-cover' />
                                    </div>
                                )}
                                <div className='flex flex-col flex-1 gap-4'>
                                    <h3 className='font-semibold text-[16px]'>{item.name}</h3>
                                    <div className='flex items-center gap-3'>
                                        <div className='flex items-center justify-center bg-gray-200 px-1 py-1 rounded-full'>
                                            <button 
                                            onClick={() => setItemQuantity(item.key, item.quantity - 1)}
                                            className='w-8 h-8 rounded-full bg-white hover:bg-gray-200 flex items-center justify-center font-semibold'
                                            >
                                            −
                                            </button>
                                            <span className="w-6 text-center font-semibold">{item.quantity}</span>
                                            <button 
                                            onClick={() => setItemQuantity(item.key, item.quantity + 1)}
                                            className='w-8 h-8 rounded-full bg-white hover:bg-gray-200 flex items-center justify-center font-semibold'
                                            >
                                            +
                                            </button>
                                        </div>
                                        <button 
                                        onClick={() => removeItem(item.key)} 
                                        className="ml-4 text-red-500 hover:text-red-700 font-semibold"
                                        >
                                        <TrashIcon className="w-6 h-6 text-slate-700" />
                                        </button>
                                    </div>
                                </div>
                                <p className='text-black font-semibold'>{item.price * item.quantity}kr</p>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-300 py-4">

                        <button className='w-full bg-red-400 text-white py-3 rounded-full font-semibold hover:bg-red-500 transition
                            flex justify-between items-center px-6
                        '>
                            <span>Gå till checkout</span>
                            <span className='border-l pl-4 text-xl font-bold text-white'>{totalPrice}kr</span>
                        </button>
                    </div>

                </>
            )}
        </div>
    </div>
  )
}

export default CartModal