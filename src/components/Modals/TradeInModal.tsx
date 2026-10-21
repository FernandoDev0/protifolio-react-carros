import React, { useState } from 'react';

interface TradeInModalProps {
  onClose: () => void;
}

export const TradeInModal: React.FC<TradeInModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    km: '',
    name: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Avalie seu Usado com a Melhor Proposta</h3>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            ✕
          </button>
        </div>

        <div className="modal-body">
          {submitted ? (
            <div className="modal-success-state">
              <div className="modal-success-icon">🚗</div>
              <h4 className="modal-success-title">
                Solicitação de Avaliação Recebida!
              </h4>
              <p className="modal-success-text">
                Excelente, <strong>{formData.name}</strong>! Nossos peritos avaliadores analisarão o seu <strong>{formData.brand} {formData.model} ({formData.year})</strong> e enviarão a proposta máxima pelo WhatsApp em <strong>{formData.phone}</strong>.
              </p>
              <button
                type="button"
                className="btn-modal-concluir"
                onClick={onClose}
              >
                Concluir
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.25rem' }}>
                Informe os dados do seu veículo atual para recebermos uma cotação justa com opção de Troca com Troco ou venda direta.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Marca:</label>
                  <input
                    type="text"
                    className="custom-select"
                    placeholder="Ex: Chevrolet"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Modelo e Versão:</label>
                  <input
                    type="text"
                    className="custom-select"
                    placeholder="Ex: Onix 1.0 Turbo LTZ"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Ano de Fabricação:</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="custom-select"
                    placeholder="Ex: 2021"
                    maxLength={4}
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Quilometragem (Km):</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="custom-select"
                    placeholder="Ex: 45000"
                    value={formData.km}
                    onChange={(e) => setFormData({ ...formData, km: e.target.value.replace(/\D/g, '') })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Seu Nome:</label>
                  <input
                    type="text"
                    className="custom-select"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>WhatsApp para Contato:</label>
                  <input
                    type="tel"
                    className="custom-select"
                    placeholder="(11) 98888-7777"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-banner-action"
                style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
              >
                SOLICITAR AVALIAÇÃO GRATUITA
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
