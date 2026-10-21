import { useState, useMemo } from 'react';
import { CARS_DATA, getCarModelName } from './data/carsData';
import type { Car, CategoryId, FilterState } from './types/car';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SearchBar } from './components/SearchBar';
import { Categories } from './components/Categories';
import { FeaturedCars } from './components/FeaturedCars';
import { WhyChooseUs } from './components/WhyChooseUs';
import { PromoBanners } from './components/PromoBanners';
import { TestimonialsServices } from './components/TestimonialsServices';
import { Footer } from './components/Footer';

import { CarDetailsModal } from './components/Modals/CarDetailsModal';
import { FinancingModal } from './components/Modals/FinancingModal';
import { TradeInModal } from './components/Modals/TradeInModal';
import { ServiceModal } from './components/Modals/ServiceModal';

function App() {
  // State for search and category filters
  const [filters, setFilters] = useState<FilterState>({
    brand: '',
    model: '',
    year: '',
    priceRange: '',
    category: 'all',
  });

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(['car-1']);

  // Modals state
  const [detailsCar, setDetailsCar] = useState<Car | null>(null);
  const [simulateCar, setSimulateCar] = useState<Car | null>(null);
  const [isFinancingOpen, setIsFinancingOpen] = useState(false);
  const [isTradeInOpen, setIsTradeInOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);

  // Filter cars based on current state
  const filteredCars = useMemo(() => {
    return CARS_DATA.filter((car) => {
      // Category filter
      if (filters.category !== 'all' && car.category !== filters.category) {
        return false;
      }
      // Brand filter
      if (filters.brand && car.brand.toLowerCase() !== filters.brand.toLowerCase()) {
        return false;
      }
      // Model filter
      if (filters.model) {
        const modelFamily = getCarModelName(car).toLowerCase();
        const searchModel = filters.model.toLowerCase();
        if (
          modelFamily !== searchModel &&
          !car.name.toLowerCase().includes(searchModel) &&
          !car.model.toLowerCase().includes(searchModel)
        ) {
          return false;
        }
      }
      // Year filter
      if (filters.year && car.year.toString() !== filters.year) {
        return false;
      }
      // Price range filter
      if (filters.priceRange && car.price > Number(filters.priceRange)) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const handleToggleFavorite = (carId: string) => {
    setFavorites((prev) =>
      prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]
    );
  };

  const handleSelectCategory = (categoryId: CategoryId) => {
    setFilters((prev) => ({
      ...prev,
      category: categoryId,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      brand: '',
      model: '',
      year: '',
      priceRange: '',
      category: 'all',
    });
  };

  const handleSearch = () => {
    const el = document.getElementById('estoque');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSimulate = (car: Car) => {
    setSimulateCar(car);
    setIsFinancingOpen(true);
  };

  return (
    <div className="app-layout">
      {/* 1. Header / Navbar */}
      <Header />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Floating Search Bar */}
      <SearchBar
        cars={CARS_DATA}
        filters={filters}
        onFilterChange={setFilters}
        onSearch={handleSearch}
      />

      {/* 4. Explore por Categoria */}
      <Categories
        selectedCategory={filters.category}
        onSelectCategory={handleSelectCategory}
      />

      {/* 5. Ofertas em Destaque */}
      <FeaturedCars
        cars={filteredCars}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onViewDetails={(car) => setDetailsCar(car)}
        onSimulate={handleOpenSimulate}
        onResetFilters={handleResetFilters}
      />

      {/* 6. Por que Escolher a Gente? */}
      <WhyChooseUs />

      {/* 7. Banners Promocionais */}
      <PromoBanners
        onOpenFinancing={() => {
          setSimulateCar(null);
          setIsFinancingOpen(true);
        }}
        onOpenTradeIn={() => setIsTradeInOpen(true)}
      />

      {/* 8. Depoimentos & Serviços */}
      <TestimonialsServices
        onOpenServiceModal={() => setIsServiceOpen(true)}
      />

      {/* 9. Footer */}
      <Footer />

      {/* Interactive Modals */}
      <CarDetailsModal
        car={detailsCar}
        onClose={() => setDetailsCar(null)}
        onSimulate={handleOpenSimulate}
      />

      {isFinancingOpen && (
        <FinancingModal
          car={simulateCar}
          onClose={() => {
            setIsFinancingOpen(false);
            setSimulateCar(null);
          }}
        />
      )}

      {isTradeInOpen && (
        <TradeInModal onClose={() => setIsTradeInOpen(false)} />
      )}

      {isServiceOpen && (
        <ServiceModal onClose={() => setIsServiceOpen(false)} />
      )}
    </div>
  );
}

export default App;
