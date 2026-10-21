import type { Car } from '../types/car';

interface CarCardProps {
  car: Car;
  isFavorite: boolean;
  onToggleFavorite: (carId: string) => void;
  onViewDetails: (car: Car) => void;
  onSimulate: (car: Car) => void;
}

export const CarCard: React.FC<CarCardProps> = ({
  car,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
  onSimulate,
}) => {
  const primaryBadge = car.badges[0] || 'IPVA Pago';
  const badgeClass = car.badgeType === 'orange' ? 'orange' : 'green';

  return (
    <article className="car-card" aria-label={`${car.name} ${car.year}`}>
      <div className="card-image-box">
        <span className={`badge-tag ${badgeClass}`}>
          <img src="/icons/check.svg" alt="" aria-hidden="true" style={{ width: 12, height: 12, filter: 'brightness(0) invert(1)' }} />
          {primaryBadge}
        </span>

        <button
          type="button"
          className={`btn-favorite ${isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(car.id)}
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>

        <img src={car.image} alt={car.name} loading="lazy" />

        <div className="price-pill-tag">
          {car.priceFormatted}
        </div>
      </div>

      <div className="card-body">
        <h3 className="card-title">{car.name}</h3>
        <div className="card-price">{car.priceFormatted}</div>
        
        <div className="card-specs">
          <span>{car.kmFormatted}</span>
          <span className="card-specs-dot">•</span>
          <span>{car.year}</span>
          <span className="card-specs-dot">•</span>
          <span>{car.transmission}</span>
        </div>

        <div className="card-actions">
          <button
            type="button"
            className="btn-card-details"
            onClick={() => onViewDetails(car)}
          >
            Ver Detalhes
          </button>
          
          <button
            type="button"
            className="btn-card-simulate"
            onClick={() => onSimulate(car)}
          >
            Simular Parcelas
          </button>
        </div>
      </div>
    </article>
  );
};
