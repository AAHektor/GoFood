import React, { useEffect ,useState } from 'react'
import { useCart } from '../context/useCart';
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon';
import TrashIcon from '../components/icons/TrashIcon';
import OrderConfirmation from './OrderConfirmation';

const CartModal = ({ onClose }) => {
    const { items, totalPrice, setItemQuantity, removeItem, activeRestaurantName, activeRestaurantId, clearCart } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const [confirmedOrder, setConfirmedOrder] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => setIsOpen(true));

        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };

    }, []);

    useEffect(() => { 
        const savedAddress = localStorage.getItem('deliveryAddress');
        const savedName = localStorage.getItem('customerName');
        const savedNumber = localStorage.getItem('customerNumber');
        
        if (savedAddress) setDeliveryAddress(savedAddress);
        if (savedName) setName(savedName);
        if (savedNumber) setNumber(savedNumber);
    }, []);


    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => onClose(), 300);
    };

    const handleCloseAfterOrder = () => {
        clearCart();
        handleClose();
    }

    // mockdata för service fee & leveransavgift, kommer att ersättas med riktiga beräkningar senare
    const serviceFee = 10;
    const deliveryFee = 49;

    const handleConfirmOrder = async () => {
        if (!name || !number || !deliveryAddress) {
            alert('Vänligen fyll i alla fält innan du bekräftar din order.');
            return;
        }

        setIsLoading(true);
    
        try {
            const order = {
                userId: 1,
                restaurantId: activeRestaurantId,
                totalPrice: totalPrice + deliveryFee + serviceFee,
                orderStatus: "Pending",
                name: name,
                number: number,
                deliveryAddress: deliveryAddress,
                itemsJson: JSON.stringify(items)
            };
    
            const response = await fetch('http://localhost:5291/api/Orders', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(order)
            });
    
            if (response.ok) {
                localStorage.setItem('deliveryAddress', deliveryAddress);
                localStorage.setItem('customerName', name);
                localStorage.setItem('customerNumber', number);
                console.log('Order skapad!');
                const data = await response.json();
                setConfirmedOrder(data);
                setOrderConfirmed(true);
            } else {
                alert('Något gick fel vid skapandet av ordern. Försök igen senare.');
            }
        }
        catch (error) {
            console.error('Fel vid skapande av order:', error);
            alert('Fel vid beställning');
        }
        finally {
            setIsLoading(false);
        }
    }




  return (
    <div className='fixed inset-0 bg-black/50 flex items-end z-50'>
        <div className={`bg-white w-full h-full p-6 max-h-screen overflow-y-auto flex flex-col
            ${isOpen ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-300 ease-in-out
            `}>
            
            <div className='border-b mb-6 border-gray-300'>
                <div className='relative flex justify-between items-center py-6'>
                    <button 
                    onClick={handleClose} 
                    className='absolute w-10 h-10 text-gray-500 bg-gray-200 outline outline-gray-200 rounded-full text-3xl font-light justify-center items-center flex'
                    >
                    <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <h2 className='text-2xl font-bold flex w-full justify-center items-center'>{orderConfirmed ? 'Orderbekräftelse' : 'Din Order'}</h2>
                </div>
            </div>

            

            {items.length === 0 ? (
                <p className='text-gray-500 text-center py-8'>Din kundvagn är tom</p>
            ) : (
                <> 
                    <div className={`flex-1 overflow-y-auto space-y-4 ${!orderConfirmed ? 'pb-20' : ''}`}> 
                        

                        {orderConfirmed ? (
                            <OrderConfirmation order={confirmedOrder} onClose={handleCloseAfterOrder} />
                        ) : (
                            <>
                                <div className='pb-4'>
                                    <h2 className='text-xl font-semibold'>{activeRestaurantName}</h2>
                                    {/* hardcoded for now, will build a delivery time estimator later*/}
                                    <p className='text-gray-400 text-[14px]'>Estimerad leverans 20-30 min</p> 
                                </div>

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

                                <div className='pb-4'>
                                    <p className='font-semibold pb-4'>Översikt</p>
                                    <div className='flex flex-col gap-1 border border-gray-300 p-4 rounded-3xl shadow-sm'>
                                        <div className='flex justify-between'>
                                            <p className='text-sm text-slate-500'>Subtotal</p>
                                            <p>{totalPrice}kr</p>
                                        </div>
                                        <div className='flex justify-between'>
                                            <p className='text-sm text-slate-500'>Leverans Avgift</p>
                                            <p>{deliveryFee}kr</p>
                                        </div>
                                        <div className='flex justify-between'>
                                            <p className='text-sm text-slate-500'>Service Avgift</p>
                                            <p>{serviceFee}kr</p>
                                        </div>
                                        <div className='flex justify-between border-t border-gray-200 pt-2 mt-2'>
                                            <p className='font-semibold'>Total</p>
                                            <p>{totalPrice + (deliveryFee + serviceFee)}kr</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='pb-4 pt-4 border-t border-gray-300'>
                                    <p className='font-semibold pb-4'>Leveransuppgifter</p>
                                    <div className='space-y-3'>
                                        <div>
                                            <label className='text-sm text-slate-600'>Namn</label>
                                            <input 
                                                type='text'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder='Ditt namn'
                                                className='w-full border border-gray-300 rounded-lg p-3 text-sm'
                                            />
                                        </div>
                                        <div>
                                            <label className='text-sm text-slate-600'>Telefon</label>
                                            <input 
                                                type='tel'
                                                value={number}
                                                onChange={(e) => setNumber(e.target.value)}
                                                placeholder='070 123 45 67'
                                                className='w-full border border-gray-300 rounded-lg p-3 text-sm'
                                            />
                                        </div>
                                        <div>
                                            <label className='text-sm text-slate-600'>Adress</label>
                                            <input 
                                                type='text'
                                                value={deliveryAddress}
                                                onChange={(e) => setDeliveryAddress(e.target.value)}
                                                placeholder='Din adress'
                                                className='w-full border border-gray-300 rounded-lg p-3 text-sm'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        
                    </div>
                    {!orderConfirmed && (
                        <div className="fixed bottom-0 left-0 w-full px-6 z-20 bg-white py-4">

                        <button 
                        className='w-full bg-red-400 text-white h-12 rounded-full font-semibold hover:bg-red-500 transition
                            flex justify-between items-center px-6
                        '
                        onClick={handleConfirmOrder}
                        disabled={isLoading}
                        >
                            <span>Beställ</span>
                            <span className='border-l pl-4 text-xl font-bold text-white'>{totalPrice + (deliveryFee + serviceFee)}kr</span>
                        </button>
                    </div>    
                    )}

                </>
            )}
        </div>
    </div>
  )
}

export default CartModal