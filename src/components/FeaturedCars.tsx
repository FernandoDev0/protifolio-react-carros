import type { Car } from '../types/car';
import { CarCard } from './CarCard';

interface FeaturedCarsProps {
  cars: Car[];
  favorites: string[];
  onToggleFavorite: (carId: string) => void;
  onViewDetails: (car: Car) => void;
  onSimulate: (car: Car) => void;
  onResetFilters: () => void;
}

export const FeaturedCars: React.FC<FeaturedCarsProps> = ({
  cars,
  favorites,
  onToggleFavorite,
  onViewDetails,
  onSimulate,
  onResetFilters,
}) => {
  return (
    <section className="featured-section" id="estoque" aria-labelledby="ofertas-title">
      <div className="container">
        <h2 id="ofertas-title" className="section-title">
          Ofertas em Destaque
        </h2>

        {cars.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '1.25rem' }}>
              Nenhum veículo encontrado com os filtros selecionados.
            </p>
            <button
              type="button"
              className="btn-card-simulate"
              style={{ padding: '10px 24px', display: 'inline-block' }}
              onClick={onResetFilters}
            >
              Ver Todas as Ofertas
            </button>
          </div>
        ) : (
          <div className="cars-grid">
            {cars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                isFavorite={favorites.includes(car.id)}
                onToggleFavorite={onToggleFavorite}
                onViewDetails={onViewDetails}
                onSimulate={onSimulate}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
