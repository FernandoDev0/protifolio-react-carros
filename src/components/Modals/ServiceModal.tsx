import React, { useState } from 'react';

interface ServiceModalProps {
  onClose: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    serviceType: 'Revisão Preventiva por Km',
    date: '',
    timeSlot: 'Manhã (08:00 às 12:00)',
    carInfo: '',
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
          <h3 className="modal-title">Agendamento de Revisão & Oficina</h3>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            ✕
          </button>
        </div>

        <div className="modal-body">
          {submitted ? (
            <div className="modal-success-state">
              <div className="modal-success-icon">🔧</div>
              <h4 className="modal-success-title">
                Agendamento Pré-Confirmado!
              </h4>
              <p className="modal-success-text">
                Obrigado, <strong>{formData.name}</strong>! Sua solicitação para <strong>{formData.serviceType}</strong> na data <strong>{formData.date} ({formData.timeSlot})</strong> foi registrada. Nossa equipe técnica enviará a confirmação formal via WhatsApp no número <strong>{formData.phone}</strong>.
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
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Tipo de Serviço:</label>
                <select
                  className="custom-select"
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  required
                >
                  <option value="Revisão Preventiva por Km">Revisão Preventiva por Km (10k, 20k, 30k...)</option>
                  <option value="Troca de Óleo e Filtros">Troca de Óleo e Filtros Sintéticos</option>
                  <option value="Pastilhas e Discos de Freio">Pastilhas e Discos de Freio</option>
                  <option value="Alinhamento 3D e Balanceamento">Alinhamento Computadorizado 3D e Balanceamento</option>
                  <option value="Higienização de Ar-Condicionado">Higienização e Carga de Gás do Ar-Condicionado</option>
                  <option value="Diagnóstico Eletrônico com Scanner">Diagnóstico Eletrônico com Scanner</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Data Preferida:</label>
                  <input
                    type="date"
                    className="custom-select"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Turno:</label>
                  <select
                    className="custom-select"
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  >
                    <option value="Manhã (08:00 às 12:00)">Manhã (08:00 às 12:00)</option>
                    <option value="Tarde (13:00 às 17:30)">Tarde (13:00 às 17:30)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Seu Veículo (Marca, Modelo e Ano):</label>
                <input
                  type="text"
                  className="custom-select"
                  placeholder="Ex: Jeep Compass 2021 ou Toyota Corolla 2020"
                  value={formData.carInfo}
                  onChange={(e) => setFormData({ ...formData, carInfo: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Seu Nome:</label>
                  <input
                    type="text"
                    className="custom-select"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>WhatsApp:</label>
                  <input
                    type="tel"
                    className="custom-select"
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-service-schedule"
                style={{ padding: '14px', fontSize: '1rem' }}
              >
                CONFIRMAR AGENDAMENTO
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
