import React, { useMemo } from 'react';
import type { Car, FilterState } from '../types/car';
import { CARS_DATA, getCarModelName } from '../data/carsData';

interface SearchBarProps {
  cars?: Car[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  cars = CARS_DATA,
  filters,
  onFilterChange,
  onSearch,
}) => {
  // 1. Marcas disponíveis no estoque (ordem alfabética)
  const availableBrands = useMemo(() => {
    const brands = Array.from(new Set(cars.map((c) => c.brand)));
    return brands.sort((a, b) => a.localeCompare(b));
  }, [cars]);

  // 2. Modelos disponíveis condicionados à marca selecionada
  const availableModels = useMemo(() => {
    const filteredByBrand = filters.brand
      ? cars.filter((c) => c.brand.toLowerCase() === filters.brand.toLowerCase())
      : cars;
    const models = Array.from(new Set(filteredByBrand.map(getCarModelName)));
    return models.sort((a, b) => a.localeCompare(b));
  }, [cars, filters.brand]);

  // 3. Anos disponíveis condicionados à marca e modelo selecionados (ordem decrescente)
  const availableYears = useMemo(() => {
    let filtered = cars;
    if (filters.brand) {
      filtered = filtered.filter((c) => c.brand.toLowerCase() === filters.brand.toLowerCase());
    }
    if (filters.model) {
      filtered = filtered.filter((c) => {
        const modelFamily = getCarModelName(c).toLowerCase();
        return (
          modelFamily === filters.model.toLowerCase() ||
          c.name.toLowerCase().includes(filters.model.toLowerCase()) ||
          c.model.toLowerCase().includes(filters.model.toLowerCase())
        );
      });
    }
    const years = Array.from(new Set(filtered.map((c) => c.year)));
    return years.sort((a, b) => b - a);
  }, [cars, filters.brand, filters.model]);

  const handleBrandChange = (newBrand: string) => {
    const validCarsForNewBrand = newBrand
      ? cars.filter((c) => c.brand.toLowerCase() === newBrand.toLowerCase())
      : cars;

    const validModels = new Set(validCarsForNewBrand.map(getCarModelName));
    const nextModel = validModels.has(filters.model) ? filters.model : '';

    const validCarsForYear = nextModel
      ? validCarsForNewBrand.filter(
          (c) => getCarModelName(c).toLowerCase() === nextModel.toLowerCase()
        )
      : validCarsForNewBrand;

    const validYears = new Set(validCarsForYear.map((c) => c.year.toString()));
    const nextYear = validYears.has(filters.year) ? filters.year : '';

    const shouldResetCategory =
      filters.category !== 'all' &&
      newBrand !== '' &&
      !validCarsForNewBrand.some((c) => c.category === filters.category);

    onFilterChange({
      ...filters,
      brand: newBrand,
      model: nextModel,
      year: nextYear,
      category: shouldResetCategory ? 'all' : filters.category,
    });
  };

  const handleModelChange = (newModel: string) => {
    let nextBrand = filters.brand;
    if (!nextBrand && newModel) {
      const matchingCars = cars.filter(
        (c) => getCarModelName(c).toLowerCase() === newModel.toLowerCase()
      );
      const brands = Array.from(new Set(matchingCars.map((c) => c.brand)));
      if (brands.length === 1) {
        nextBrand = brands[0];
      }
    }

    let validCars = nextBrand
      ? cars.filter((c) => c.brand.toLowerCase() === nextBrand.toLowerCase())
      : cars;

    if (newModel) {
      validCars = validCars.filter(
        (c) => getCarModelName(c).toLowerCase() === newModel.toLowerCase()
      );
    }

    const validYears = new Set(validCars.map((c) => c.year.toString()));
    const nextYear = validYears.has(filters.year) ? filters.year : '';

    const shouldResetCategory =
      filters.category !== 'all' &&
      !validCars.some((c) => c.category === filters.category);

    onFilterChange({
      ...filters,
      brand: nextBrand,
      model: newModel,
      year: nextYear,
      category: shouldResetCategory ? 'all' : filters.category,
    });
  };

  const handleYearChange = (newYear: string) => {
    onFilterChange({
      ...filters,
      year: newYear,
    });
  };

  const handlePriceRangeChange = (newPriceRange: string) => {
    onFilterChange({
      ...filters,
      priceRange: newPriceRange,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="search-bar-wrapper">
      <div className="container">
        <div className="search-bar-card">
          <form className="search-form" onSubmit={handleSubmit} role="search">
            {/* Marca */}
            <div className="select-group">
              <select
                className="custom-select"
                value={filters.brand}
                onChange={(e) => handleBrandChange(e.target.value)}
                aria-label="Filtrar por Marca"
              >
                <option value="">Marca</option>
                {availableBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              <img src="/icons/chevron-down.svg" className="select-arrow" alt="" />
            </div>

            {/* Modelo */}
            <div className="select-group">
              <select
                className="custom-select"
                value={filters.model}
                onChange={(e) => handleModelChange(e.target.value)}
                aria-label="Filtrar por Modelo"
              >
                <option value="">Modelo</option>
                {availableModels.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
              <img src="/icons/chevron-down.svg" className="select-arrow" alt="" />
            </div>

            {/* Ano */}
            <div className="select-group">
              <select
                className="custom-select"
                value={filters.year}
                onChange={(e) => handleYearChange(e.target.value)}
                aria-label="Filtrar por Ano"
              >
                <option value="">Ano</option>
                {availableYears.map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>
              <img src="/icons/chevron-down.svg" className="select-arrow" alt="" />
            </div>

            {/* Faixa de Preço */}
            <div className="select-group">
              <select
                className="custom-select"
                value={filters.priceRange}
                onChange={(e) => handlePriceRangeChange(e.target.value)}
                aria-label="Filtrar por Faixa de Preço"
              >
                <option value="">Faixa de Preço</option>
                <option value="130000">Até R$ 130.000</option>
                <option value="150000">Até R$ 150.000</option>
                <option value="200000">Até R$ 200.000</option>
              </select>
              <img src="/icons/chevron-down.svg" className="select-arrow" alt="" />
            </div>

            {/* Botão Buscar */}
            <button type="submit" className="btn-search">
              <img src="/icons/search.svg" alt="" aria-hidden="true" />
              <span>BUSCAR CARRO</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
