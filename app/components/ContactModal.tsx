import { useState } from 'react';
import emailjs from '@emailjs/browser';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    cnpj: '',
    message: '',
    projectType: '',
    budget: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const projectTypes = [
    { 
      value: 'institutional', 
      label: 'Site Institucional',
      description: 'Site completo para sua empresa com várias páginas, incluindo: página inicial, sobre, serviços/produtos, blog, contato e mais. Ideal para empresas que querem uma presença profissional na internet.'
    },
    { 
      value: 'ecommerce', 
      label: 'E-commerce',
      description: 'Loja virtual completa com sistema de pagamentos, controle de estoque, área do cliente, gestão de pedidos e integração com sistemas de entrega. Perfeito para quem quer vender produtos online.'
    },
    { 
      value: 'landing', 
      label: 'Landing Page',
      description: 'Página única focada em converter visitantes em clientes. Ideal para campanhas específicas, lançamentos de produtos ou serviços, e captação de leads. Design otimizado para conversão.'
    },
    { 
      value: 'other', 
      label: 'Outro',
      description: 'Projeto personalizado com funcionalidades específicas para sua necessidade. Entre em contato para discutirmos os detalhes do seu projeto.'
    }
  ];

  const budgetRanges = [
    { value: '2500-3000', label: 'R$ 2.500 - R$ 3.000' },
    { value: '3000-5000', label: 'R$ 3.000 - R$ 5.000' },
    { value: '5000-10000', label: 'R$ 5.000 - R$ 10.000' },
    { value: '10000-20000', label: 'R$ 10.000 - R$ 20.000' },
    { value: '20000+', label: 'Acima de R$ 20.000' }
  ];

  const formatCNPJ = (cnpj: string) => {
    return cnpj
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCNPJ = formatCNPJ(e.target.value);
    setFormData(prev => ({ ...prev, cnpj: formattedCNPJ }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Configuração do EmailJS
      const templateParams = {
        to_email: 'joel.melo171@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        cnpj: formData.cnpj,
        phone: formData.phone,
        project_type: projectTypes.find(type => type.value === formData.projectType)?.label || '',
        budget: budgetRanges.find(range => range.value === formData.budget)?.label || '',
        message: formData.message
      };

      await emailjs.send(
        'service_c9v1qdk', // Service ID fornecido
        'template_eo48wka', // Template ID fornecido
        templateParams,
        'yhRKW8GvzY0v33UTl' // Public Key fornecida
      );

      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          cnpj: '',
          message: '',
          projectType: '',
          budget: ''
        });
      }, 2000);
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getBudgetMessage = () => {
    if (formData.projectType === 'ecommerce') {
      return '* E-commerces têm valor mínimo de R$ 3.000';
    }
    if (formData.projectType === 'institutional') {
      return '* Sites institucionais têm valor mínimo de R$ 2.500';
    }
    return '* Sites complexos e e-commerces têm valor mínimo de R$ 3.000';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Solicite uma Proposta</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 transform"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cnpj" className="block text-sm font-medium text-gray-300 mb-1">
              CNPJ
            </label>
            <input
              type="text"
              id="cnpj"
              value={formData.cnpj}
              onChange={handleCNPJChange}
              placeholder="00.000.000/0000-00"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={18}
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
              Telefone
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
              Empresa
            </label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-1">
              Tipo de Projeto
            </label>
            <select
              id="projectType"
              value={formData.projectType}
              onChange={(e) => setFormData({...formData, projectType: e.target.value})}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Selecione o tipo de projeto</option>
              {projectTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {formData.projectType && (
              <p className="mt-2 text-sm text-gray-400">
                {projectTypes.find(type => type.value === formData.projectType)?.description}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-1">
              Orçamento Previsto
            </label>
            <select
              id="budget"
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Selecione o orçamento previsto</option>
              {budgetRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-yellow-400">
                {getBudgetMessage()}
              </p>
              <p className="text-sm text-green-400 italic">
                * Quanto maior o investimento, melhor será a qualidade e as funcionalidades do seu site
              </p>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
              Mensagem
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 transform ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Proposta'}
          </button>

          {submitStatus === 'success' && (
            <div className="flex flex-col items-center justify-center mt-4 p-4 bg-green-700/80 rounded-lg border border-green-400 shadow-lg animate-pulse">
              <svg className="w-10 h-10 text-green-200 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-lg font-semibold text-green-100 text-center">Proposta enviada com sucesso!</p>
              <p className="text-green-100 text-center text-sm mt-1">Obrigado pelo contato. Em breve entraremos em contato pelo email informado.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <p className="text-red-400 text-center mt-2">
              Erro ao enviar proposta. Por favor, tente novamente.
            </p>
          )}
        </form>
      </div>
    </div>
  );
} 