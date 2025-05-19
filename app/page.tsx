'use client';

import { useState } from 'react';
import ContactModal from './components/ContactModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Sua Plataforma Digital
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            Sites profissionais e modernos para impulsionar seu negócio
          </p>
          <button
            onClick={openModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 transform"
          >
            Solicite um Orçamento
          </button>
        </div>
      </section>

      {/* Serviços Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Nossos Serviços</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 transform" onClick={openModal}>
            <h3 className="text-xl font-bold mb-4">Sites Institucionais</h3>
            <p className="text-gray-300">Presença profissional online com design moderno e responsivo.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 transform" onClick={openModal}>
            <h3 className="text-xl font-bold mb-4">E-commerce</h3>
            <p className="text-gray-300">Lojas virtuais completas para vender seus produtos online.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 transform" onClick={openModal}>
            <h3 className="text-xl font-bold mb-4">Landing Pages</h3>
            <p className="text-gray-300">Páginas otimizadas para converter visitantes em clientes.</p>
          </div>
        </div>
      </section>

      {/* Por que nos escolher */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Por que nos escolher?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Design Moderno</h3>
              <p className="text-gray-300">Sites com visual atual e profissional</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Alta Performance</h3>
              <p className="text-gray-300">Sites rápidos e otimizados para SEO</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-blue-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para começar?</h2>
          <p className="text-xl mb-8">Vamos transformar sua presença digital hoje mesmo</p>
          <button
            onClick={openModal}
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 transform"
          >
            Fale Conosco
          </button>
        </div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  );
}
