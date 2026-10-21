import { useState } from 'react';
import type { Car } from '../../types/car';

interface FinancingModalProps {
  car: Car | null;
  onClose: () => void;
}

export const FinancingModal: React.FC<FinancingModalProps> = ({ car, onClose }) => {
  const initialPrice = car ? car.price : 124900;
  const [vehicleValue, setVehicleValue] = useState<number>(initialPrice);
  const [downPayment, setDownPayment] = useState<number>(Math.round(initialPrice * 0.2));
  const [months, setMonths] = useState<number>(48);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Simple monthly interest rate (1.29% a.m.)
  const monthlyRate = 0.0129;
  const financedAmount = Math.max(0, vehicleValue - downPayment);
  const installmentValue = financedAmount > 0
    ? (financedAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Simulação de Financiamento Online</h3>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            ✕
          </button>
        </div>

        <div className="modal-body">
          {submitted ? (
            <div className="modal-success-state">
              <div className="modal-success-icon">🎉</div>
              <h4 className="modal-success-title">
                Simulação Enviada com Sucesso!
              </h4>
              <p className="modal-success-text">
                Obrigado, <strong>{name}</strong>! Um de nossos consultores especializados entrará em contato via WhatsApp no número <strong>{phone}</strong> em instantes com as melhores propostas bancárias.
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
              {car && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '10px 14px', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
                  <img src={car.image} alt={car.name} style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }} />
                  <div>
                    <strong>{car.name}</strong> ({car.year})
                    <div style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{car.priceFormatted}</div>
                  </div>
                </div>
              )}

              {/* Valor do Veículo */}
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '6px' }}>
                  Valor do Veículo:
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  className="custom-select"
                  placeholder="Ex: 124.900"
                  value={vehicleValue ? vehicleValue.toLocaleString('pt-BR') : ''}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, '');
                    setVehicleValue(raw ? Number(raw) : 0);
                  }}
                  required
                />
              </div>

              {/* Entrada */}
              <div style={{ marginBottom: '1.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Valor da Entrada:</label>
                  <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                    R$ {downPayment.toLocaleString('pt-BR')} ({Math.round((downPayment / vehicleValue) * 100 || 0)}%)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={vehicleValue}
                  step="1000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                />
              </div>

              {/* Prazo */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px' }}>
                  Número de Parcelas:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
                  {[12, 24, 36, 48, 60].map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={`custom-select ${months === p ? 'active' : ''}`}
                      style={{
                        padding: '10px 4px',
                        textAlign: 'center',
                        fontWeight: 700,
                        backgroundColor: months === p ? 'var(--color-primary)' : '#ffffff',
                        color: months === p ? '#ffffff' : '#334155',
                        borderColor: months === p ? 'var(--color-primary)' : '#e2e8f0',
                      }}
                      onClick={() => setMonths(p)}
                    >
                      {p}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Card de Resultado da Parcela */}
              <div style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', border: '1px solid #bfdbfe', borderRadius: 'var(--radius-md)', padding: '16px', textAlign: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#1e40af', fontWeight: 600 }}>PARCELA MENSAL ESTIMADA</span>
                <div className="simulation-price" style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-primary)', margin: '4px 0' }}>
                  {months}x de R$ {Math.round(installmentValue).toLocaleString('pt-BR')}
                </div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Taxa estimada de 1,29% a.m. Sujeito à análise de crédito bancário.</span>
              </div>

              {/* Dados do Cliente */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Seu Nome:</label>
                  <input
                    type="text"
                    className="custom-select"
                    placeholder="Ex: João da Silva"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>WhatsApp:</label>
                  <input
                    type="tel"
                    className="custom-select"
                    placeholder="(11) 99999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-banner-action"
                style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
              >
                ENVIAR PROPOSTA PARA APROVAÇÃO
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
