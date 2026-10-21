import type { Car } from '../../types/car';

interface CarDetailsModalProps {
  car: Car | null;
  onClose: () => void;
  onSimulate: (car: Car) => void;
}

export const CarDetailsModal: React.FC<CarDetailsModalProps> = ({
  car,
  onClose,
  onSimulate,
}) => {
  if (!car) return null;

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`Olá! Tenho interesse no veículo ${car.name} (${car.year}) anunciado por ${car.priceFormatted}. Poderia me passar mais informações?`);
    window.open(`https://wa.me/551155095010?text=${msg}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{car.name}</h3>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1.25rem', maxHeight: '300px', backgroundColor: '#f1f5f9' }}>
            <img src={car.image} alt={car.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{car.model}</span>
              <div className="modal-price" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-primary)' }}>{car.priceFormatted}</div>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              {car.badges.map((b, i) => (
                <span key={i} className={`badge-tag ${car.badgeType || 'green'}`} style={{ position: 'static' }}>
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', background: '#f8fafc', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
            <div><strong>Ano:</strong> {car.year}</div>
            <div><strong>Km:</strong> {car.kmFormatted}</div>
            <div><strong>Câmbio:</strong> {car.transmission}</div>
            <div><strong>Combustível:</strong> {car.fuel}</div>
            <div><strong>Cor:</strong> {car.color}</div>
            <div><strong>Garantia:</strong> 1 Ano Completa</div>
          </div>

          <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.5, marginBottom: '1.25rem' }}>
            {car.description}
          </p>

          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px' }}>Itens de Destaque:</h4>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#64748b', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            {car.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
            <button
              type="button"
              className="btn-whatsapp-pill"
              style={{ justifyContent: 'center', padding: '12px 20px', borderRadius: 'var(--radius-sm)' }}
              onClick={handleWhatsApp}
            >
              <img src="/icons/whatsapp.svg" alt="" style={{ filter: 'brightness(0) invert(1)', width: 20 }} />
              <span>Chamar no WhatsApp</span>
            </button>

            <button
              type="button"
              className="btn-card-simulate"
              style={{ padding: '12px', borderRadius: 'var(--radius-sm)' }}
              onClick={() => {
                onClose();
                onSimulate(car);
              }}
            >
              Simular Financiamento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
