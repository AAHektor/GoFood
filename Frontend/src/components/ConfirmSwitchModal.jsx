import React from 'react'

const ConfirmSwitchModal = ( {
    isOpen,
    currentRestaurant,
    newRestaurant,
    onConfirm,
    onCancel
}) => {
    if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
        <div className='bg-white rounded-lg p-6 max-w-sm mx-4 shadow-lg'>
            <h2 className='text-xl font-bold mb-4'>Byt restaurang?</h2>
            
            <p className='text-gray-700 mb-6'>
                Du har varor från <span className='font-semibold'>{currentRestaurant}</span>. 
                Vill du tömma din kundvagn och börja beställa från <span className='font-semibold'>{newRestaurant}</span>?
            </p>

            <div className='flex gap-3'>
                <button
                    onClick={onCancel}
                    className='flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50'
                >
                    Avbryt
                </button>
                <button
                    onClick={onConfirm}
                    className='flex-1 px-4 py-2 bg-red-400 text-white rounded-lg font-semibold hover:bg-red-500'
                >
                    Töm och fortsätt
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmSwitchModal