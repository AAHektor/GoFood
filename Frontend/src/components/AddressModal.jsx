import React, { useEffect, useState } from "react";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";

const AddressModal = ({ isOpen, onClose, currentAddress, onSave }) => {
    const [address, setAddress] = useState(currentAddress);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => setIsAnimating(true));
            document.body.style.overflow = "hidden";

            return () => {
                document.body.style.overflow = "";
            };
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => onClose(), 300);
    };

    const handleSave = () => {
        onSave(address);
        handleClose();
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50"
            onClick={handleClose}
        >
            <div
                className={`w-full bg-white p-6 rounded-lg max-w-md mx-auto transition-transform duration-300 ease-in-out
                ${isAnimating ? "translate-y-0" : "translate-y-full"}
                `}
                onClick={(e) => e.stopPropagation()}
            >

                <button onClick={handleClose} className="bg-gray-200 flex w-10 h-10 justify-center items-center rounded-full mb-4">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <div className="pb-5">
                    <h4 className="font-semibold">Leverans adress:</h4>
                    <span>{currentAddress}</span>
                </div>
                <div className="flex gap-4">
                    <input
                    className="border border-gray-300 rounded-2xl px-2 py-2 flex-1 text-sm"
                    type="text" placeholder={currentAddress} value={address} onChange={(e) => setAddress(e.target.value)} />
                    <button 
                    className="bg-red-400 px-4 py-2 rounded-full text-md font-semibold text-white"
                    onClick={handleSave}>
                        Spara
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AddressModal;
