import React from "react";

const OrderConfirmation = ({ order, onClose }) => {

    

    return (
        <div className="flex flex-col items-center justify-center h-full gap-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                    className="w-12 h-12 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            </div>

            <h2 className="text-2xl font-bold">Order Mottagen!</h2>
            <p className="text-gray-500 text-center">
                Din order har bekräftats och är på väg till dig
            </p>

            <div className="w-full border border-gray-300 rounded-3xl p-6 space-y-4">
                <div className="flex justify-between">
                    <p className="text-gray-600">Ordernummer</p>
                    <p className="font-semibold">#{order.id}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-600">Totalt</p>
                    <p className="font-semibold">{order.totalPrice}kr</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-600">Leverans</p>
                    <p className="font-semibold">20-30 min</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-600">Status</p>
                    <p className="font-semibold text-green-600">
                        {order.orderStatus}
                    </p>
                </div>
            </div>

            <button
                onClick={onClose}
                className="w-full bg-red-400 text-white py-3 rounded-full font-semibold hover:bg-red-500 transition"
            >
                Tillbaka till restauranger
            </button>
        </div>
    );
};

export default OrderConfirmation;
