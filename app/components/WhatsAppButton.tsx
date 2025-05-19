'use client';

import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
    const phoneNumber = '558498699449';
    const message = 'Olá! Gostaria de falar sobre orçamento.';

    const handleClick = () => {
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-110 z-50"
            aria-label="Contato via WhatsApp"
        >
            <FaWhatsapp className="text-2xl" />
            <span className="hidden md:inline-block font-medium">
                Problemas com o orçamento? Entre em contato!
            </span>
        </button>
    );
} 