import { CATEGORIES_DATA } from '../data/carsData';
import type { CategoryId } from '../types/car';

interface CategoriesProps {
  selectedCategory: CategoryId;
  onSelectCategory: (categoryId: CategoryId) => void;
}

export const Categories: React.FC<CategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section className="categories-section" id="categorias" aria-labelledby="cat-title">
      <div className="container">
        <h2 id="cat-title" className="section-title">
          Explore por Categoria
        </h2>

        <div className="categories-grid" role="tablist">
          {CATEGORIES_DATA.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`category-card ${isSelected ? 'active' : ''}`}
                onClick={() => onSelectCategory(isSelected ? 'all' : cat.id)}
              >
                <div className="category-avatar">
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                </div>
                <span className="category-name">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
